import { prisma } from '@/lib/db/prisma';

export interface Room {
  id: string;
  name: string;
  name_am?: string;
  slug: string;
  description: string;
  description_am?: string;
  room_type: 'standard' | 'deluxe' | 'executive' | 'presidential';
  size_sqm?: number | null;
  max_guests: number;
  base_price_etb: number;
  images: string[];
  amenities: string[];
  is_active: boolean;
  display_order: number;
}

/**
 * Transform Prisma Room to app Room format
 */
function transformRoom(prismaRoom: any): Room {
  return {
    id: prismaRoom.id,
    name: prismaRoom.name,
    name_am: prismaRoom.nameAm,
    slug: prismaRoom.slug,
    description: prismaRoom.description || '',
    description_am: prismaRoom.descriptionAm,
    room_type: prismaRoom.roomType,
    size_sqm: prismaRoom.sizeM2,
    max_guests: prismaRoom.maxGuests,
    base_price_etb: Number(prismaRoom.basePriceEtb),
    images: Array.isArray(prismaRoom.images) ? prismaRoom.images : [],
    amenities: Array.isArray(prismaRoom.amenities) ? prismaRoom.amenities : [],
    is_active: prismaRoom.isActive,
    display_order: prismaRoom.displayOrder,
  };
}

/**
 * Get all rooms
 */
export async function getAllRooms(): Promise<Room[]> {
  const rooms = await prisma.room.findMany({
    orderBy: { displayOrder: 'asc' },
  });

  return rooms.map(transformRoom);
}

/**
 * Get a single room by ID
 */
export async function getRoomById(id: string): Promise<Room | null> {
  const room = await prisma.room.findUnique({
    where: { id },
  });

  return room ? transformRoom(room) : null;
}

/**
 * Get a single room by slug
 */
export async function getRoomBySlug(slug: string): Promise<Room | null> {
  const room = await prisma.room.findUnique({
    where: { slug },
  });

  return room ? transformRoom(room) : null;
}

/**
 * Create a new room
 */
export async function createRoom(roomData: Omit<Room, 'id'>): Promise<Room> {
  const room = await prisma.room.create({
    data: {
      slug: roomData.slug,
      name: roomData.name,
      nameAm: roomData.name_am,
      description: roomData.description,
      descriptionAm: roomData.description_am,
      roomType: roomData.room_type,
      sizeM2: roomData.size_sqm,
      maxGuests: roomData.max_guests,
      basePriceEtb: roomData.base_price_etb,
      images: roomData.images,
      amenities: roomData.amenities,
      isActive: roomData.is_active,
      displayOrder: roomData.display_order,
    },
  });

  return transformRoom(room);
}

/**
 * Update an existing room
 */
export async function updateRoom(
  id: string,
  roomData: Partial<Omit<Room, 'id'>>
): Promise<Room | null> {
  try {
    const room = await prisma.room.update({
      where: { id },
      data: {
        ...(roomData.slug && { slug: roomData.slug }),
        ...(roomData.name && { name: roomData.name }),
        ...(roomData.name_am !== undefined && { nameAm: roomData.name_am }),
        ...(roomData.description !== undefined && { description: roomData.description }),
        ...(roomData.description_am !== undefined && { descriptionAm: roomData.description_am }),
        ...(roomData.room_type && { roomType: roomData.room_type }),
        ...(roomData.size_sqm !== undefined && { sizeM2: roomData.size_sqm }),
        ...(roomData.max_guests && { maxGuests: roomData.max_guests }),
        ...(roomData.base_price_etb && { basePriceEtb: roomData.base_price_etb }),
        ...(roomData.images && { images: roomData.images }),
        ...(roomData.amenities && { amenities: roomData.amenities }),
        ...(roomData.is_active !== undefined && { isActive: roomData.is_active }),
        ...(roomData.display_order !== undefined && { displayOrder: roomData.display_order }),
      },
    });

    return transformRoom(room);
  } catch (error: any) {
    if (error.code === 'P2025') {
      // Record not found
      return null;
    }
    throw error;
  }
}

/**
 * Delete a room
 */
export async function deleteRoom(id: string): Promise<boolean> {
  try {
    await prisma.room.delete({
      where: { id },
    });
    return true;
  } catch (error: any) {
    if (error.code === 'P2025') {
      // Record not found
      return false;
    }
    throw error;
  }
}
