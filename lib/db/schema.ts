import { pgTable, uuid, text, date, integer, numeric, timestamp } from 'drizzle-orm/pg-core';

export const rooms = pgTable('rooms', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  nameAm: text('name_am'),
  type: text('type').notNull(),
  description: text('description').notNull(),
  descriptionAm: text('description_am'),
  basePriceEtb: numeric('base_price_etb', { precision: 10, scale: 2 }).notNull(),
  maxGuests: integer('max_guests').notNull(),
  sizeM2: integer('size_m2'),
  amenities: text('amenities').array(),
  images: text('images').array(),
  featuredImage: text('featured_image'),
  isFeatured: text('is_featured').default('false'),
  isActive: text('is_active').default('true'),
  displayOrder: integer('display_order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const reservationRequests = pgTable('reservation_requests', {
  id: uuid('id').primaryKey().defaultRandom(),
  roomId: uuid('room_id').notNull(),
  checkInDate: date('check_in_date').notNull(),
  checkOutDate: date('check_out_date').notNull(),
  numGuests: integer('num_guests').notNull(),
  guestFirstName: text('guest_first_name').notNull(),
  guestLastName: text('guest_last_name').notNull(),
  guestEmail: text('guest_email').notNull(),
  guestPhone: text('guest_phone').notNull(),
  specialRequests: text('special_requests'),
  totalPriceEtb: numeric('total_price_etb', { precision: 10, scale: 2 }).notNull(),
  status: text('status').notNull().default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const availability = pgTable('availability', {
  id: uuid('id').primaryKey().defaultRandom(),
  roomId: uuid('room_id').notNull(),
  date: date('date').notNull(),
  isAvailable: text('is_available').default('true'),
  priceEtb: numeric('price_etb', { precision: 10, scale: 2 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const contactSubmissions = pgTable('contact_submissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  status: text('status').notNull().default('new'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const blogPosts = pgTable('blog_posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  titleAm: text('title_am'),
  excerpt: text('excerpt'),
  excerptAm: text('excerpt_am'),
  content: text('content').notNull(),
  contentAm: text('content_am'),
  featuredImage: text('featured_image'),
  author: text('author').notNull(),
  category: text('category'),
  tags: text('tags').array(),
  isPublished: text('is_published').default('false'),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const pages = pgTable('pages', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  titleAm: text('title_am'),
  content: text('content').notNull(),
  contentAm: text('content_am'),
  isPublished: text('is_published').default('true'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const siteSettings = pgTable('site_settings', {
  id: uuid('id').primaryKey().defaultRandom(),
  key: text('key').notNull().unique(),
  value: text('value').notNull(),
  description: text('description'),
  updatedAt: timestamp('updated_at').defaultNow(),
});
