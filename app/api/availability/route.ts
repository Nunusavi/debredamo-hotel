import { NextRequest, NextResponse } from 'next/server';
import { getAvailableRooms } from '@/lib/availability';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const checkIn = searchParams.get('check_in');
    const checkOut = searchParams.get('check_out');
    const guests = searchParams.get('guests');

    if (!checkIn || !checkOut) {
      return NextResponse.json(
        { error: 'check_in and check_out are required' },
        { status: 400 }
      );
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Validate dates
    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
      return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
    }

    if (checkOutDate <= checkInDate) {
      return NextResponse.json(
        { error: 'check_out must be after check_in' },
        { status: 400 }
      );
    }

    const availableRooms = await getAvailableRooms(
      checkInDate,
      checkOutDate,
      guests ? parseInt(guests) : undefined
    );

    return NextResponse.json({ rooms: availableRooms });
  } catch (error) {
    console.error('Availability check error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
