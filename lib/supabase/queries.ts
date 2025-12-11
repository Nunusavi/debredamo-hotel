// Supabase Query Functions
// Server-side data fetching for rooms and other data

import { createClient } from './server';
import type { Room } from '@/types';

/**
 * Get all active rooms
 * @returns Array of active rooms sorted by display order
 */
export async function getAllRooms(): Promise<Room[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching rooms:', error);
    throw new Error('Failed to fetch rooms');
  }

  return data as Room[];
}

/**
 * Get a single room by slug
 * @param slug - Room slug
 * @returns Room object or null if not found
 */
export async function getRoomBySlug(slug: string): Promise<Room | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // No rows returned
      return null;
    }
    console.error('Error fetching room:', error);
    throw new Error('Failed to fetch room');
  }

  return data as Room;
}

/**
 * Get a single room by ID
 * @param id - Room ID
 * @returns Room object or null if not found
 */
export async function getRoomById(id: string): Promise<Room | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('id', id)
    .eq('is_active', true)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Error fetching room:', error);
    throw new Error('Failed to fetch room');
  }

  return data as Room;
}

/**
 * Get rooms by type
 * @param roomType - Type of room (standard, deluxe, executive, presidential)
 * @returns Array of rooms matching the type
 */
export async function getRoomsByType(roomType: string): Promise<Room[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('room_type', roomType)
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching rooms by type:', error);
    throw new Error('Failed to fetch rooms');
  }

  return data as Room[];
}

/**
 * Get featured rooms (first 3 by display order)
 * @returns Array of featured rooms
 */
export async function getFeaturedRooms(): Promise<Room[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })
    .limit(3);

  if (error) {
    console.error('Error fetching featured rooms:', error);
    throw new Error('Failed to fetch featured rooms');
  }

  return data as Room[];
}

/**
 * Search rooms by name or description
 * @param query - Search query
 * @returns Array of matching rooms
 */
export async function searchRooms(query: string): Promise<Room[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('is_active', true)
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error searching rooms:', error);
    throw new Error('Failed to search rooms');
  }

  return data as Room[];
}

/**
 * Get rooms within a price range
 * @param minPrice - Minimum price
 * @param maxPrice - Maximum price
 * @returns Array of rooms within the price range
 */
export async function getRoomsByPriceRange(
  minPrice: number,
  maxPrice: number
): Promise<Room[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('is_active', true)
    .gte('base_price_etb', minPrice)
    .lte('base_price_etb', maxPrice)
    .order('base_price_etb', { ascending: true });

  if (error) {
    console.error('Error fetching rooms by price:', error);
    throw new Error('Failed to fetch rooms');
  }

  return data as Room[];
}

/**
 * Get rooms that can accommodate a certain number of guests
 * @param guestCount - Number of guests
 * @returns Array of suitable rooms
 */
export async function getRoomsByGuestCount(guestCount: number): Promise<Room[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('is_active', true)
    .gte('max_guests', guestCount)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching rooms by guest count:', error);
    throw new Error('Failed to fetch rooms');
  }

  return data as Room[];
}

/**
 * Check if database connection is working
 * @returns true if connection is successful
 */
export async function testDatabaseConnection(): Promise<boolean> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from('rooms').select('id').limit(1);

    if (error) {
      console.error('Database connection test failed:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Database connection test error:', error);
    return false;
  }
}
