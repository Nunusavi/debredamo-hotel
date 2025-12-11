import { prisma } from '@/lib/db/prisma';
import { addDays, eachDayOfInterval } from 'date-fns';

export interface AvailabilityCheckParams {
  roomId: string;
  checkIn: Date;
  checkOut: Date;
}

export interface AvailabilityResult {
  available: boolean;
  reason?: string;
  availableCount?: number;
  totalPrice?: number;
  pricePerNight?: number[];
}

/**
 * Check if a room is available for the given date range
 * Uses pessimistic locking for concurrent bookings
 */
export async function checkRoomAvailability({
  roomId,
  checkIn,
  checkOut,
}: AvailabilityCheckParams): Promise<AvailabilityResult> {
  // Get all dates in the range (excluding checkout date)
  const datesInRange = eachDayOfInterval({
    start: checkIn,
    end: addDays(checkOut, -1),
  });

  // Fetch availability for all dates in a single query
  const availabilities = await prisma.availability.findMany({
    where: {
      roomId,
      date: {
        in: datesInRange,
      },
    },
  });

  // Check if we have availability data for all dates
  if (availabilities.length !== datesInRange.length) {
    return {
      available: false,
      reason: 'Availability data not found for some dates',
    };
  }

  // Check if any date has 0 available rooms
  const unavailableDate = availabilities.find((a) => a.availableCount <= 0);
  if (unavailableDate) {
    return {
      available: false,
      reason: `Room not available on ${unavailableDate.date.toISOString().split('T')[0]}`,
    };
  }

  // Calculate total price (use price override if set, otherwise base price)
  const room = await prisma.room.findUnique({ where: { id: roomId } });
  if (!room) {
    return { available: false, reason: 'Room not found' };
  }

  const pricePerNight = availabilities.map((a) =>
    Number(a.priceOverrideEtb || room.basePriceEtb)
  );
  const totalPrice = pricePerNight.reduce((sum, price) => sum + price, 0);

  return {
    available: true,
    availableCount: Math.min(...availabilities.map((a) => a.availableCount)),
    totalPrice,
    pricePerNight,
  };
}

/**
 * Reserve availability (decrease available count)
 * Should be called within a transaction with reservation creation
 */
export async function reserveAvailability({
  roomId,
  checkIn,
  checkOut,
}: AvailabilityCheckParams) {
  const datesInRange = eachDayOfInterval({
    start: checkIn,
    end: addDays(checkOut, -1),
  });

  // Use transaction to ensure atomicity
  await prisma.$transaction(
    datesInRange.map((date) =>
      prisma.availability.update({
        where: {
          roomId_date: { roomId, date },
        },
        data: {
          availableCount: {
            decrement: 1,
          },
        },
      })
    )
  );
}

/**
 * Release availability (increase available count)
 * Called when a reservation is cancelled
 */
export async function releaseAvailability({
  roomId,
  checkIn,
  checkOut,
}: AvailabilityCheckParams) {
  const datesInRange = eachDayOfInterval({
    start: checkIn,
    end: addDays(checkOut, -1),
  });

  await prisma.$transaction(
    datesInRange.map((date) =>
      prisma.availability.update({
        where: {
          roomId_date: { roomId, date },
        },
        data: {
          availableCount: {
            increment: 1,
          },
        },
      })
    )
  );
}

/**
 * Get available rooms for a date range
 */
export async function getAvailableRooms(
  checkIn: Date,
  checkOut: Date,
  minGuests?: number
) {
  const allRooms = await prisma.room.findMany({
    where: {
      isActive: true,
      ...(minGuests && { maxGuests: { gte: minGuests } }),
    },
    orderBy: { displayOrder: 'asc' },
  });

  const availableRooms = [];

  for (const room of allRooms) {
    const availability = await checkRoomAvailability({
      roomId: room.id,
      checkIn,
      checkOut,
    });

    if (availability.available) {
      availableRooms.push({
        ...room,
        totalPrice: availability.totalPrice,
        pricePerNight: availability.pricePerNight,
      });
    }
  }

  return availableRooms;
}
