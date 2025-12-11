import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db/prisma';
import { updateReservationStatus, cancelReservation } from '@/lib/reservation-service';

const updateReservationSchema = z.object({
  status: z.enum(['pending', 'contacted', 'confirmed', 'declined', 'cancelled']).optional(),
  adminNotes: z.string().optional(),
});

// GET single reservation
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const reservation = await prisma.reservationRequest.findUnique({
      where: { id: params.id },
      include: { room: true },
    });

    if (!reservation) {
      return NextResponse.json({ error: 'Reservation not found' }, { status: 404 });
    }

    return NextResponse.json(reservation);
  } catch (error) {
    console.error('Error fetching reservation:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// PATCH update reservation status
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validatedData = updateReservationSchema.parse(body);

    if (!validatedData.status && !validatedData.adminNotes) {
      return NextResponse.json(
        { error: 'At least one field (status or adminNotes) is required' },
        { status: 400 }
      );
    }

    if (validatedData.status) {
      await updateReservationStatus(
        params.id,
        validatedData.status,
        validatedData.adminNotes
      );
    } else if (validatedData.adminNotes) {
      // Just update admin notes
      await prisma.reservationRequest.update({
        where: { id: params.id },
        data: { adminNotes: validatedData.adminNotes },
      });
    }

    const updatedReservation = await prisma.reservationRequest.findUnique({
      where: { id: params.id },
      include: { room: true },
    });

    return NextResponse.json({
      success: true,
      data: updatedReservation,
      message: 'Reservation updated successfully',
    });
  } catch (error) {
    console.error('Error updating reservation:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation error',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}

// DELETE cancel reservation
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await cancelReservation(params.id);

    return NextResponse.json({
      success: true,
      message: 'Reservation cancelled successfully',
    });
  } catch (error) {
    console.error('Error cancelling reservation:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
