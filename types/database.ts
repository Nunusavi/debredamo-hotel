// Debredamo Hotel - Database Types
// Auto-generated from Supabase schema
// Run: npx supabase gen types typescript --project-id YOUR_PROJECT_ID > types/database.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      rooms: {
        Row: {
          id: string;
          name: string;
          name_am: string | null;
          slug: string;
          description: string | null;
          description_am: string | null;
          room_type: 'standard' | 'deluxe' | 'executive' | 'presidential';
          size_sqm: number | null;
          max_guests: number;
          base_price_etb: number;
          images: Json;
          amenities: Json;
          is_active: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          name_am?: string | null;
          slug: string;
          description?: string | null;
          description_am?: string | null;
          room_type: 'standard' | 'deluxe' | 'executive' | 'presidential';
          size_sqm?: number | null;
          max_guests: number;
          base_price_etb: number;
          images?: Json;
          amenities?: Json;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          name_am?: string | null;
          slug?: string;
          description?: string | null;
          description_am?: string | null;
          room_type?: 'standard' | 'deluxe' | 'executive' | 'presidential';
          size_sqm?: number | null;
          max_guests?: number;
          base_price_etb?: number;
          images?: Json;
          amenities?: Json;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      availability: {
        Row: {
          id: string;
          room_id: string;
          date: string;
          available_count: number;
          price_override_etb: number | null;
          min_stay_nights: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          room_id: string;
          date: string;
          available_count: number;
          price_override_etb?: number | null;
          min_stay_nights?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          room_id?: string;
          date?: string;
          available_count?: number;
          price_override_etb?: number | null;
          min_stay_nights?: number;
          created_at?: string;
        };
      };
      reservation_requests: {
        Row: {
          id: string;
          request_number: string;
          room_id: string | null;
          room_name: string;
          guest_name: string;
          guest_email: string;
          guest_phone: string;
          check_in: string;
          check_out: string;
          num_guests: number;
          num_nights: number;
          estimated_price_etb: number | null;
          special_requests: string | null;
          status: 'pending' | 'contacted' | 'confirmed' | 'declined' | 'cancelled';
          admin_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          request_number: string;
          room_id?: string | null;
          room_name: string;
          guest_name: string;
          guest_email: string;
          guest_phone: string;
          check_in: string;
          check_out: string;
          num_guests: number;
          num_nights: number;
          estimated_price_etb?: number | null;
          special_requests?: string | null;
          status?: 'pending' | 'contacted' | 'confirmed' | 'declined' | 'cancelled';
          admin_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          request_number?: string;
          room_id?: string | null;
          room_name?: string;
          guest_name?: string;
          guest_email?: string;
          guest_phone?: string;
          check_in?: string;
          check_out?: string;
          num_guests?: number;
          num_nights?: number;
          estimated_price_etb?: number | null;
          special_requests?: string | null;
          status?: 'pending' | 'contacted' | 'confirmed' | 'declined' | 'cancelled';
          admin_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      pages: {
        Row: {
          id: string;
          slug: string;
          title: string;
          title_am: string | null;
          content: Json | null;
          hero_image: string | null;
          meta_title: string | null;
          meta_description: string | null;
          og_image: string | null;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          title_am?: string | null;
          content?: Json | null;
          hero_image?: string | null;
          meta_title?: string | null;
          meta_description?: string | null;
          og_image?: string | null;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          title_am?: string | null;
          content?: Json | null;
          hero_image?: string | null;
          meta_title?: string | null;
          meta_description?: string | null;
          og_image?: string | null;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      blog_posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          title_am: string | null;
          excerpt: string | null;
          content: string | null;
          featured_image: string | null;
          author: string | null;
          category: string | null;
          tags: Json;
          meta_title: string | null;
          meta_description: string | null;
          is_published: boolean;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          title_am?: string | null;
          excerpt?: string | null;
          content?: string | null;
          featured_image?: string | null;
          author?: string | null;
          category?: string | null;
          tags?: Json;
          meta_title?: string | null;
          meta_description?: string | null;
          is_published?: boolean;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          title_am?: string | null;
          excerpt?: string | null;
          content?: string | null;
          featured_image?: string | null;
          author?: string | null;
          category?: string | null;
          tags?: Json;
          meta_title?: string | null;
          meta_description?: string | null;
          is_published?: boolean;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      site_settings: {
        Row: {
          key: string;
          value: Json;
          description: string | null;
          updated_at: string;
        };
        Insert: {
          key: string;
          value: Json;
          description?: string | null;
          updated_at?: string;
        };
        Update: {
          key?: string;
          value?: Json;
          description?: string | null;
          updated_at?: string;
        };
      };
      contact_submissions: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          subject: string | null;
          message: string;
          status: 'new' | 'read' | 'replied';
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          subject?: string | null;
          message: string;
          status?: 'new' | 'read' | 'replied';
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          subject?: string | null;
          message?: string;
          status?: 'new' | 'read' | 'replied';
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
