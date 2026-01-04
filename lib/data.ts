// Data access layer - provides access to room data from database
import { prisma } from '@/lib/db/prisma';
import { amenitiesIcons } from '@/config/site';
import type { Room } from '@/types';

/**
 * Get amenity icon name
 */
export function getAmenityIcon(amenity: string): string {
  return amenitiesIcons[amenity] || 'check';
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
    description: prismaRoom.description,
    description_am: prismaRoom.descriptionAm,
    room_type: prismaRoom.roomType,
    size_sqm: prismaRoom.sizeM2,
    max_guests: prismaRoom.maxGuests,
    base_price_etb: Number(prismaRoom.basePriceEtb),
    images: Array.isArray(prismaRoom.images)
      ? prismaRoom.images.map((img: any) =>
          typeof img === 'string' ? { url: img, alt: `${prismaRoom.name} - Room Photo` } : img
        )
      : [],
    amenities: Array.isArray(prismaRoom.amenities) ? prismaRoom.amenities : [],
    is_active: prismaRoom.isActive,
    display_order: prismaRoom.displayOrder,
    created_at: prismaRoom.createdAt.toISOString(),
    updated_at: prismaRoom.updatedAt.toISOString(),
  };
}

/**
 * Get all active rooms
 */
export async function getAllRooms(): Promise<Room[]> {
  const rooms = await prisma.room.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: 'asc' },
  });

  return rooms.map(transformRoom);
}

/**
 * Get a single room by slug
 */
export async function getRoomBySlug(slug: string): Promise<Room | null> {
  const room = await prisma.room.findUnique({
    where: { slug, isActive: true },
  });

  return room ? transformRoom(room) : null;
}

/**
 * Get a single room by ID
 */
export async function getRoomById(id: string): Promise<Room | null> {
  const room = await prisma.room.findUnique({
    where: { id, isActive: true },
  });

  return room ? transformRoom(room) : null;
}

/**
 * Get rooms by type
 */
export async function getRoomsByType(roomType: string): Promise<Room[]> {
  const rooms = await prisma.room.findMany({
    where: {
      roomType: roomType as any,
      isActive: true,
    },
    orderBy: { displayOrder: 'asc' },
  });

  return rooms.map(transformRoom);
}

/**
 * Get featured rooms (first 3 by display order)
 */
export async function getFeaturedRooms(): Promise<Room[]> {
  const rooms = await prisma.room.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: 'asc' },
    take: 3,
  });

  return rooms.map(transformRoom);
}

/**
 * Search rooms by name or description
 */
export async function searchRooms(query: string): Promise<Room[]> {
  const lowerQuery = query.toLowerCase();

  const rooms = await prisma.room.findMany({
    where: {
      isActive: true,
      OR: [
        { name: { contains: lowerQuery, mode: 'insensitive' } },
        { description: { contains: lowerQuery, mode: 'insensitive' } },
        { nameAm: { contains: query } },
        { descriptionAm: { contains: query } },
      ],
    },
    orderBy: { displayOrder: 'asc' },
  });

  return rooms.map(transformRoom);
}

/**
 * Get rooms within a price range
 */
export async function getRoomsByPriceRange(minPrice: number, maxPrice: number): Promise<Room[]> {
  const rooms = await prisma.room.findMany({
    where: {
      isActive: true,
      basePriceEtb: {
        gte: minPrice,
        lte: maxPrice,
      },
    },
    orderBy: { displayOrder: 'asc' },
  });

  return rooms.map(transformRoom);
}

/**
 * Get rooms that can accommodate a certain number of guests
 */
export async function getRoomsByGuestCount(guestCount: number): Promise<Room[]> {
  const rooms = await prisma.room.findMany({
    where: {
      isActive: true,
      maxGuests: {
        gte: guestCount,
      },
    },
    orderBy: { displayOrder: 'asc' },
  });

  return rooms.map(transformRoom);
}
