// Data access layer - reads from config/site.ts
import { rooms, amenitiesIcons } from "@/config/site";
import type { Room } from "@/types";

/**
 * Get amenity icon name
 */
export function getAmenityIcon(amenity: string): string {
  return amenitiesIcons[amenity] || "check";
}

/**
 * Get all active rooms
 */
export function getAllRooms(): Room[] {
  return rooms.filter((room) => room.is_active) as unknown as Room[];
}

/**
 * Get a single room by slug
 */
export function getRoomBySlug(slug: string): Room | null {
  const room = rooms.find((r) => r.slug === slug && r.is_active);
  return room ? (room as unknown as Room) : null;
}

/**
 * Get a single room by ID
 */
export function getRoomById(id: string): Room | null {
  const room = rooms.find((r) => r.id === id && r.is_active);
  return room ? (room as unknown as Room) : null;
}

/**
 * Get rooms by type
 */
export function getRoomsByType(roomType: string): Room[] {
  return rooms.filter(
    (room) => room.room_type === roomType && room.is_active
  ) as unknown as Room[];
}

/**
 * Get featured rooms (first 3 by display order)
 */
export function getFeaturedRooms(): Room[] {
  return rooms
    .filter((room) => room.is_active)
    .slice(0, 3) as unknown as Room[];
}

/**
 * Search rooms by name or description
 */
export function searchRooms(query: string): Room[] {
  const lowerQuery = query.toLowerCase();
  return rooms.filter(
    (room) =>
      room.is_active &&
      (room.name.toLowerCase().includes(lowerQuery) ||
        room.description.toLowerCase().includes(lowerQuery) ||
        room.name_am?.includes(query) ||
        room.description_am?.includes(query))
  ) as unknown as Room[];
}

/**
 * Get rooms within a price range
 */
export function getRoomsByPriceRange(
  minPrice: number,
  maxPrice: number
): Room[] {
  return rooms.filter(
    (room) =>
      room.is_active &&
      room.base_price_etb >= minPrice &&
      room.base_price_etb <= maxPrice
  ) as unknown as Room[];
}

/**
 * Get rooms that can accommodate a certain number of guests
 */
export function getRoomsByGuestCount(guestCount: number): Room[] {
  return rooms.filter(
    (room) => room.is_active && room.max_guests >= guestCount
  ) as unknown as Room[];
}
