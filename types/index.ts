// DEBREDAMO HOTEL - Type Definitions

// =============================================
// ROOM TYPES
// =============================================

export type RoomType = "standard" | "deluxe" | "executive" | "presidential";

export interface RoomImage {
  url: string;
  alt: string;
}

export interface Room {
  id: string;
  name: string;
  name_am?: string;
  slug: string;
  description?: string;
  description_am?: string;
  room_type: RoomType;
  size_sqm?: number;
  max_guests: number;
  base_price_etb: number;
  images: RoomImage[];
  amenities: string[];
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

// =============================================
// PAGE TYPES
// =============================================

export interface Page {
  id: string;
  slug: string;
  title: string;
  title_am?: string;
  content?: Record<string, unknown>; // JSONB content
  hero_image?: string;
  meta_title?: string;
  meta_description?: string;
  og_image?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

// =============================================
// BLOG TYPES
// =============================================

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  title_am?: string;
  excerpt?: string;
  content?: string;
  featured_image?: string;
  author?: string;
  category?: string;
  tags: string[];
  meta_title?: string;
  meta_description?: string;
  is_published: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

// =============================================
// CONTACT TYPES
// =============================================

export type ContactStatus = "new" | "read" | "replied";

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: ContactStatus;
  created_at: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

// =============================================
// SITE SETTINGS TYPES
// =============================================

export interface SiteName {
  en: string;
  am: string;
}

export interface Address {
  street: string;
  city: string;
  country: string;
}

export interface SocialMedia {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  whatsapp?: string;
}

export interface BusinessHours {
  weekday: string;
  weekend: string;
}

export interface SiteSettings {
  site_name: SiteName;
  contact_email: string;
  contact_phone: string;
  address: Address;
  social_media: SocialMedia;
  business_hours: BusinessHours;
}

// =============================================
// UI TYPES
// =============================================

export interface NavLink {
  label: string;
  label_am: string;
  href: string;
  children?: NavLink[];
}

export interface Breadcrumb {
  label: string;
  href?: string;
}

// =============================================
// API RESPONSE TYPES
// =============================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// =============================================
// LANGUAGE TYPES
// =============================================

export type Locale = "en" | "am";

export interface LocaleContent {
  en: string;
  am?: string;
}
