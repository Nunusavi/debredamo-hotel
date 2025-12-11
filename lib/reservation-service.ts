import { prisma } from '@/lib/db/prisma';
import { checkRoomAvailability, reserveAvailability, releaseAvailability } from '@/lib/availability';
import type { Prisma, ReservationRequest } from '@prisma/client';

const MAX_RETRIES = 3;

export interface CreateReservationInput {
  roomId: string;
  roomName: string;
  checkIn: Date;
  checkOut: Date;
  numGuests: number;
  numNights: number;
  guestFirstName: string;
  guestLastName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests?: string;
}

/**
 * Create reservation with availability check and concurrency handling
 * Uses retry logic to handle race conditions
 */
export async function createReservationWithAvailability(
  data: CreateReservationInput,
  retryCount = 0
): Promise<ReservationRequest> {
  try {
    // Pre-check availability
    const availability = await checkRoomAvailability({
      roomId: data.roomId,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
    });

    if (!availability.available) {
      throw new Error(availability.reason || 'Room not available');
    }

    // Create reservation and update availability in transaction
    const result = await prisma.$transaction(
      async (tx) => {
        // Re-check within transaction for race condition protection
        const currentAvailability = await checkRoomAvailability({
          roomId: data.roomId,
          checkIn: data.checkIn,
          checkOut: data.checkOut,
        });

        if (!currentAvailability.available) {
          throw new Error('Room was just booked by another user');
        }

        // Generate request number
        const requestNumber = await generateRequestNumber();

        // Create reservation
        const reservation = await tx.reservationRequest.create({
          data: {
            requestNumber,
            roomId: data.roomId,
            roomName: data.roomName,
            guestName: `${data.guestFirstName} ${data.guestLastName}`,
            guestEmail: data.guestEmail,
            guestPhone: data.guestPhone,
            checkIn: data.checkIn,
            checkOut: data.checkOut,
            numGuests: data.numGuests,
            numNights: data.numNights,
            estimatedPriceEtb: currentAvailability.totalPrice,
            specialRequests: data.specialRequests,
            status: 'pending',
          },
        });

        // Decrease availability
        await reserveAvailability({
          roomId: data.roomId,
          checkIn: data.checkIn,
          checkOut: data.checkOut,
        });

        return reservation;
      },
      {
        timeout: 10000, // 10 second timeout
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable, // Strongest isolation
      }
    );

    return result;
  } catch (error: unknown) {
    // Retry on deadlock or serialization failure
    if (retryCount < MAX_RETRIES && isRetryableError(error)) {
      await new Promise((resolve) => setTimeout(resolve, 100 * (retryCount + 1)));
      return createReservationWithAvailability(data, retryCount + 1);
    }
    throw error;
  }
}

/**
 * Cancel a reservation and release availability
 */
export async function cancelReservation(reservationId: string) {
  const reservation = await prisma.reservationRequest.findUnique({
    where: { id: reservationId },
  });

  if (!reservation) {
    throw new Error('Reservation not found');
  }

  if (reservation.status === 'cancelled') {
    throw new Error('Reservation already cancelled');
  }

  await prisma.$transaction(async (tx) => {
    // Update reservation status
    await tx.reservationRequest.update({
      where: { id: reservationId },
      data: { status: 'cancelled' },
    });

    // Release availability if reservation had a room assigned
    if (reservation.roomId) {
      await releaseAvailability({
        roomId: reservation.roomId,
        checkIn: reservation.checkIn,
        checkOut: reservation.checkOut,
      });
    }
  });

  return reservation;
}

/**
 * Update reservation status
 */
export async function updateReservationStatus(
  reservationId: string,
  status: 'pending' | 'contacted' | 'confirmed' | 'declined' | 'cancelled',
  adminNotes?: string
) {
  const reservation = await prisma.reservationRequest.findUnique({
    where: { id: reservationId },
  });

  if (!reservation) {
    throw new Error('Reservation not found');
  }

  // If changing to cancelled, release availability
  if (status === 'cancelled' && reservation.status !== 'cancelled' && reservation.roomId) {
    await prisma.$transaction(async (tx) => {
      // Update status
      await tx.reservationRequest.update({
        where: { id: reservationId },
        data: {
          status,
          adminNotes: adminNotes || reservation.adminNotes,
        },
      });

      // Release availability
      await releaseAvailability({
        roomId: reservation.roomId,
        checkIn: reservation.checkIn,
        checkOut: reservation.checkOut,
      });
    });
  } else {
    // Just update status
    await prisma.reservationRequest.update({
      where: { id: reservationId },
      data: {
        status,
        adminNotes: adminNotes || reservation.adminNotes,
      },
    });
  }

  return reservation;
}

/**
 * Check if error is retryable (deadlock, serialization failure)
 */
function isRetryableError(error: unknown): boolean {
  if (typeof error !== 'object' || error === null) return false;
  const err = error as { code?: string; message?: string };
  return (
    err.code === 'P2034' || // Transaction conflict
    err.message?.includes('deadlock') ||
    err.message?.includes('serialization')
  );
}

/**
 * Generate unique request number (DBD-YYYY-NNNNNN)
 */
async function generateRequestNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const count = await prisma.reservationRequest.count();
  return `DBD-${year}-${String(count + 1).padStart(6, '0')}`;
}
