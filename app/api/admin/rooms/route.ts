import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth/session';
import { getAllRooms, createRoom, type Room } from '@/lib/cms/rooms';
import { roomSchema } from '@/lib/validations';
import { logError } from '@/lib/errors';

// GET /api/admin/rooms - Get all rooms
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const rooms = await getAllRooms();
    return NextResponse.json({ success: true, data: rooms });
  } catch (error) {
    logError('Error fetching rooms', error);
    return NextResponse.json(
      { error: 'Failed to fetch rooms' },
      { status: 500 }
    );
  }
}

// POST /api/admin/rooms - Create a new room
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Validate the request body
    const validationResult = roomSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    // Normalize images to RoomImage format
    const normalizedData: Omit<Room, 'id' | 'created_at' | 'updated_at'> = {
      ...validationResult.data,
      images: validationResult.data.images.map((img) =>
        typeof img === 'string' ? { url: img, alt: '' } : img
      ),
    } as any;

    const newRoom = await createRoom(normalizedData);

    // Revalidate all room-related pages so changes appear immediately
    revalidatePath('/accommodation', 'page');
    revalidatePath('/accommodation/[slug]', 'page');
    revalidatePath('/', 'page'); // Homepage might show featured rooms

    return NextResponse.json(
      {
        success: true,
        data: newRoom,
        message: 'Room created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    logError('Error creating room', error);
    return NextResponse.json(
      { error: 'Failed to create room' },
      { status: 500 }
    );
  }
}
