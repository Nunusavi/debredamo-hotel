// Debredamo Hotel - Validation Schemas using Zod

import { z } from 'zod';
import { isValidEthiopianPhone } from './utils';

// =============================================
// RESERVATION VALIDATION
// =============================================

export const reservationSchema = z.object({
  roomId: z.string().uuid('Invalid room ID').optional(),
  guestName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  guestEmail: z
    .string()
    .email('Invalid email address')
    .toLowerCase(),
  guestPhone: z
    .string()
    .refine((phone) => isValidEthiopianPhone(phone), {
      message: 'Invalid Ethiopian phone number. Format: +251911234567 or 0911234567',
    }),
  checkIn: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format. Use YYYY-MM-DD')
    .refine((date) => {
      const checkInDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return checkInDate >= today;
    }, 'Check-in date must be today or in the future'),
  checkOut: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format. Use YYYY-MM-DD'),
  numGuests: z
    .number()
    .int('Number of guests must be a whole number')
    .min(1, 'At least 1 guest is required')
    .max(10, 'Maximum 10 guests per room'),
  specialRequests: z
    .string()
    .max(500, 'Special requests must not exceed 500 characters')
    .optional(),
}).refine((data) => {
  const checkIn = new Date(data.checkIn);
  const checkOut = new Date(data.checkOut);
  return checkOut > checkIn;
}, {
  message: 'Check-out date must be after check-in date',
  path: ['checkOut'],
});

export type ReservationFormData = z.infer<typeof reservationSchema>;

// =============================================
// CONTACT FORM VALIDATION
// =============================================

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters'),
  email: z
    .string()
    .email('Invalid email address')
    .toLowerCase(),
  phone: z
    .string()
    .refine((phone) => !phone || isValidEthiopianPhone(phone), {
      message: 'Invalid Ethiopian phone number',
    })
    .optional(),
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject must not exceed 200 characters'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must not exceed 1000 characters'),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// =============================================
// ROOM VALIDATION (ADMIN)
// =============================================

export const roomSchema = z.object({
  name: z
    .string()
    .min(3, 'Room name must be at least 3 characters')
    .max(100, 'Room name must not exceed 100 characters'),
  name_am: z
    .string()
    .max(100, 'Amharic name must not exceed 100 characters')
    .optional(),
  slug: z
    .string()
    .min(3, 'Slug must be at least 3 characters')
    .max(100, 'Slug must not exceed 100 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  description: z
    .string()
    .max(1000, 'Description must not exceed 1000 characters')
    .optional(),
  description_am: z
    .string()
    .max(1000, 'Amharic description must not exceed 1000 characters')
    .optional(),
  room_type: z.enum(['standard', 'deluxe', 'executive', 'presidential'], {
    message: 'Please select a valid room type',
  }),
  size_sqm: z
    .number()
    .int('Size must be a whole number')
    .min(15, 'Room size must be at least 15 sqm')
    .max(200, 'Room size must not exceed 200 sqm')
    .optional(),
  max_guests: z
    .number()
    .int('Max guests must be a whole number')
    .min(1, 'At least 1 guest capacity required')
    .max(10, 'Maximum 10 guests per room'),
  base_price_etb: z
    .number()
    .min(500, 'Price must be at least 500 ETB')
    .max(100000, 'Price must not exceed 100,000 ETB'),
  amenities: z
    .array(z.string())
    .min(1, 'At least one amenity is required'),
  is_active: z.boolean().default(true),
  display_order: z.number().int().default(0),
});

export type RoomFormData = z.infer<typeof roomSchema>;

// =============================================
// BLOG POST VALIDATION (ADMIN)
// =============================================

export const blogPostSchema = z.object({
  title: z
    .string()
    .min(10, 'Title must be at least 10 characters')
    .max(200, 'Title must not exceed 200 characters'),
  title_am: z
    .string()
    .max(200, 'Amharic title must not exceed 200 characters')
    .optional(),
  slug: z
    .string()
    .min(5, 'Slug must be at least 5 characters')
    .max(200, 'Slug must not exceed 200 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  excerpt: z
    .string()
    .max(300, 'Excerpt must not exceed 300 characters')
    .optional(),
  content: z
    .string()
    .min(100, 'Content must be at least 100 characters'),
  featured_image: z
    .string()
    .url('Invalid image URL')
    .optional(),
  author: z
    .string()
    .max(100, 'Author name must not exceed 100 characters')
    .optional(),
  category: z
    .string()
    .max(50, 'Category must not exceed 50 characters')
    .optional(),
  tags: z
    .array(z.string().max(30, 'Each tag must not exceed 30 characters'))
    .max(10, 'Maximum 10 tags allowed')
    .default([]),
  meta_title: z
    .string()
    .max(60, 'Meta title must not exceed 60 characters')
    .optional(),
  meta_description: z
    .string()
    .max(160, 'Meta description must not exceed 160 characters')
    .optional(),
  is_published: z.boolean().default(false),
});

export type BlogPostFormData = z.infer<typeof blogPostSchema>;

// =============================================
// AVAILABILITY VALIDATION (ADMIN)
// =============================================

export const availabilitySchema = z.object({
  room_id: z.string().uuid('Invalid room ID'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  available_count: z
    .number()
    .int('Available count must be a whole number')
    .min(0, 'Available count cannot be negative')
    .max(100, 'Available count must not exceed 100'),
  price_override_etb: z
    .number()
    .min(0, 'Price cannot be negative')
    .max(100000, 'Price must not exceed 100,000 ETB')
    .optional(),
  min_stay_nights: z
    .number()
    .int('Min stay must be a whole number')
    .min(1, 'Minimum stay must be at least 1 night')
    .max(30, 'Minimum stay must not exceed 30 nights')
    .default(1),
});

export type AvailabilityFormData = z.infer<typeof availabilitySchema>;

// =============================================
// ADMIN UPDATE STATUS VALIDATION
// =============================================

export const updateReservationStatusSchema = z.object({
  status: z.enum(['pending', 'contacted', 'confirmed', 'declined', 'cancelled']),
  admin_notes: z
    .string()
    .max(1000, 'Admin notes must not exceed 1000 characters')
    .optional(),
});

export type UpdateReservationStatusData = z.infer<typeof updateReservationStatusSchema>;

// =============================================
// NEWSLETTER VALIDATION
// =============================================

export const newsletterSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .toLowerCase(),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;

// =============================================
// LOGIN VALIDATION
// =============================================

export const loginSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .toLowerCase(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// =============================================
// SEARCH VALIDATION
// =============================================

export const searchSchema = z.object({
  query: z
    .string()
    .min(2, 'Search query must be at least 2 characters')
    .max(100, 'Search query must not exceed 100 characters'),
  type: z.enum(['rooms', 'blog', 'all']).default('all'),
});

export type SearchFormData = z.infer<typeof searchSchema>;
