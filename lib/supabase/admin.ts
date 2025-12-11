// Debredamo Hotel - Supabase Admin Client
// This client uses the service role key for admin operations
// IMPORTANT: Only use this in secure server-side contexts

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

// This client bypasses Row Level Security (RLS)
// Use with caution and only in secure server-side code
export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Helper functions for common admin operations

/**
 * Get all rooms (including inactive)
 */
export async function getAllRoomsAdmin() {
  const { data, error } = await supabaseAdmin
    .from('rooms')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) throw error;
  return data;
}

/**
 * Get all reservation requests
 */
export async function getAllReservationsAdmin(filters?: {
  status?: string;
  startDate?: string;
  endDate?: string;
}) {
  let query = supabaseAdmin
    .from('reservation_requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }

  if (filters?.startDate) {
    query = query.gte('check_in', filters.startDate);
  }

  if (filters?.endDate) {
    query = query.lte('check_out', filters.endDate);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
}

/**
 * Update reservation status
 */
export async function updateReservationStatus(
  id: string,
  status: string,
  adminNotes?: string
) {
  const { data, error } = await supabaseAdmin
    .from('reservation_requests')
    // @ts-expect-error - Supabase types not fully configured
    .update({
      status,
      admin_notes: adminNotes,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get all contact submissions
 */
export async function getAllContactSubmissionsAdmin() {
  const { data, error } = await supabaseAdmin
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * Get site settings
 */
export async function getSiteSettings() {
  const { data, error } = await supabaseAdmin
    .from('site_settings')
    .select('*');

  if (error) throw error;

  // Convert array to key-value object
  const settings: Record<string, unknown> = {};
  data?.forEach((setting: { key: string; value: unknown }) => {
    settings[setting.key] = setting.value;
  });

  return settings;
}

/**
 * Update site setting
 */
export async function updateSiteSetting(key: string, value: unknown) {
  const { data, error } = await supabaseAdmin
    .from('site_settings')
    // @ts-expect-error - Supabase types not fully configured
    .update({
      value,
      updated_at: new Date().toISOString(),
    })
    .eq('key', key)
    .select()
    .single();

  if (error) throw error;
  return data;
}
