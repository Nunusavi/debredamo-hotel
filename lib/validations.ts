// DEBREDAMO HOTEL - Validation Schemas using Zod

import { z } from "zod";
import { isValidEthiopianPhone } from "./utils";

// =============================================
// CONTACT FORM VALIDATION
// =============================================

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  email: z.string().email("Invalid email address").toLowerCase(),
  phone: z
    .string()
    .refine((phone) => !phone || isValidEthiopianPhone(phone), {
      message: "Invalid Ethiopian phone number",
    })
    .optional(),
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(200, "Subject must not exceed 200 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must not exceed 1000 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// =============================================
// ROOM VALIDATION (ADMIN)
// =============================================

export const roomSchema = z.object({
  name: z
    .string()
    .min(3, "Room name must be at least 3 characters")
    .max(100, "Room name must not exceed 100 characters"),
  name_am: z
    .string()
    .max(100, "Amharic name must not exceed 100 characters")
    .optional(),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .max(100, "Slug must not exceed 100 characters")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers, and hyphens"
    ),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must not exceed 1000 characters"),
  description_am: z
    .string()
    .max(1000, "Amharic description must not exceed 1000 characters")
    .optional(),
  room_type: z.enum(["standard", "deluxe", "executive", "presidential"], {
    message: "Please select a valid room type",
  }),
  size_sqm: z
    .number()
    .int("Size must be a whole number")
    .min(15, "Room size must be at least 15 sqm")
    .max(200, "Room size must not exceed 200 sqm")
    .nullable()
    .optional(),
  max_guests: z
    .number()
    .int("Max guests must be a whole number")
    .min(1, "At least 1 guest capacity required")
    .max(10, "Maximum 10 guests per room"),
  base_price_etb: z
    .number()
    .min(500, "Price must be at least 500 ETB")
    .max(100000, "Price must not exceed 100,000 ETB"),
  images: z.array(z.string().min(1, "Image path cannot be empty")).min(1, "At least one image is required"),
  amenities: z.array(z.string()).min(1, "At least one amenity is required"),
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
    .min(10, "Title must be at least 10 characters")
    .max(200, "Title must not exceed 200 characters"),
  title_am: z
    .string()
    .max(200, "Amharic title must not exceed 200 characters")
    .optional(),
  slug: z
    .string()
    .min(5, "Slug must be at least 5 characters")
    .max(200, "Slug must not exceed 200 characters")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers, and hyphens"
    ),
  excerpt: z
    .string()
    .max(300, "Excerpt must not exceed 300 characters")
    .optional(),
  content: z.string().min(100, "Content must be at least 100 characters"),
  featured_image: z.string().url("Invalid image URL").optional(),
  author: z
    .string()
    .max(100, "Author name must not exceed 100 characters")
    .optional(),
  category: z
    .string()
    .max(50, "Category must not exceed 50 characters")
    .optional(),
  tags: z
    .array(z.string().max(30, "Each tag must not exceed 30 characters"))
    .max(10, "Maximum 10 tags allowed")
    .default([]),
  meta_title: z
    .string()
    .max(60, "Meta title must not exceed 60 characters")
    .optional(),
  meta_description: z
    .string()
    .max(160, "Meta description must not exceed 160 characters")
    .optional(),
  is_published: z.boolean().default(false),
});

export type BlogPostFormData = z.infer<typeof blogPostSchema>;

// =============================================
// NEWSLETTER VALIDATION
// =============================================

export const newsletterSchema = z.object({
  email: z.string().email("Invalid email address").toLowerCase(),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;

// =============================================
// LOGIN VALIDATION
// =============================================

export const loginSchema = z.object({
  email: z.string().email("Invalid email address").toLowerCase(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// =============================================
// SEARCH VALIDATION
// =============================================

export const searchSchema = z.object({
  query: z
    .string()
    .min(2, "Search query must be at least 2 characters")
    .max(100, "Search query must not exceed 100 characters"),
  type: z.enum(["rooms", "blog", "all"]).default("all"),
});

export type SearchFormData = z.infer<typeof searchSchema>;
