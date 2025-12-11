// Debredamo Hotel - Constants

// =============================================
// GENERAL CONSTANTS
// =============================================

export const SITE_NAME = 'Debredamo Hotel';
export const SITE_NAME_AM = 'ደብረዳሞ ሆቴል';
export const DEFAULT_LOCALE = 'en';

// =============================================
// PAGINATION
// =============================================

export const ITEMS_PER_PAGE = {
  rooms: 9,
  blog: 12,
  reservations: 20,
  contacts: 20,
} as const;

// =============================================
// DATE & TIME
// =============================================

export const DATE_FORMAT = 'MMM dd, yyyy';
export const DATE_TIME_FORMAT = 'MMM dd, yyyy hh:mm a';
export const DATE_INPUT_FORMAT = 'yyyy-MM-dd';
export const CHECK_IN_TIME = '14:00';
export const CHECK_OUT_TIME = '12:00';

// =============================================
// BOOKING CONSTRAINTS
// =============================================

export const MIN_BOOKING_NIGHTS = 1;
export const MAX_BOOKING_NIGHTS = 30;
export const MAX_GUESTS_PER_ROOM = 10;
export const MIN_ADVANCE_BOOKING_DAYS = 0; // Same day booking allowed
export const MAX_ADVANCE_BOOKING_DAYS = 365; // 1 year in advance

// =============================================
// FILE UPLOAD
// =============================================

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
export const MAX_IMAGES_PER_ROOM = 8;

// =============================================
// FORM LIMITS
// =============================================

export const MAX_SPECIAL_REQUESTS_LENGTH = 500;
export const MAX_MESSAGE_LENGTH = 1000;
export const MAX_ADMIN_NOTES_LENGTH = 1000;
export const MAX_BLOG_TAGS = 10;

// =============================================
// API ENDPOINTS
// =============================================

export const API_ENDPOINTS = {
  rooms: '/api/rooms',
  room: (slug: string) => `/api/rooms/${slug}`,
  reservation: '/api/reservation',
  contact: '/api/contact',
  newsletter: '/api/newsletter',
  blog: '/api/blog',
  blogPost: (slug: string) => `/api/blog/${slug}`,
} as const;

// =============================================
// CACHE DURATIONS (seconds)
// =============================================

export const CACHE_DURATION = {
  rooms: 300, // 5 minutes
  blog: 600, // 10 minutes
  pages: 3600, // 1 hour
  settings: 3600, // 1 hour
} as const;

// =============================================
// AMENITIES
// =============================================

export const COMMON_AMENITIES = [
  'Free WiFi',
  'Air Conditioning',
  'Flat-screen TV',
  'Smart TV',
  'Mini Bar',
  'Mini Fridge',
  'Safe',
  'Work Desk',
  'Sitting Area',
  'Private Bathroom',
  'Bathtub',
  'Shower',
  'Complimentary Toiletries',
  'Premium Toiletries',
  'Bathrobes & Slippers',
  'Hair Dryer',
  'Daily Housekeeping',
  '24/7 Room Service',
  'City View',
  'Balcony',
  'Kitchen',
  'Kitchenette',
  'Nespresso Machine',
  'Coffee/Tea Maker',
  'Jacuzzi',
  'Steam Shower',
  'Complimentary Breakfast',
  'Butler Service',
] as const;

// =============================================
// CONTACT SUBJECTS
// =============================================

export const CONTACT_SUBJECTS = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'reservation', label: 'Reservation Question' },
  { value: 'event', label: 'Event & Conference' },
  { value: 'feedback', label: 'Feedback' },
  { value: 'other', label: 'Other' },
] as const;

// =============================================
// BLOG CATEGORIES
// =============================================

export const BLOG_CATEGORIES = [
  'Travel Guide',
  'Culture & Tradition',
  'Hotel News',
  'Food & Dining',
  'Local Attractions',
  'Events',
  'Tips & Advice',
] as const;

// =============================================
// ROOM FILTERS
// =============================================

export const PRICE_RANGES = [
  { min: 0, max: 3000, label: 'Under ETB 3,000' },
  { min: 3000, max: 5000, label: 'ETB 3,000 - 5,000' },
  { min: 5000, max: 8000, label: 'ETB 5,000 - 8,000' },
  { min: 8000, max: 999999, label: 'ETB 8,000+' },
] as const;

export const GUEST_COUNTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

// =============================================
// SORT OPTIONS
// =============================================

export const ROOM_SORT_OPTIONS = [
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'name_asc', label: 'Name: A to Z' },
  { value: 'name_desc', label: 'Name: Z to A' },
  { value: 'popularity', label: 'Most Popular' },
] as const;

// =============================================
// STATUS BADGES
// =============================================

export const STATUS_COLORS = {
  pending: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    border: 'border-yellow-200',
  },
  contacted: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-200',
  },
  confirmed: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-200',
  },
  declined: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-200',
  },
  cancelled: {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    border: 'border-gray-200',
  },
  new: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-200',
  },
  read: {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    border: 'border-gray-200',
  },
  replied: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-200',
  },
} as const;

// =============================================
// SOCIAL MEDIA
// =============================================

export const SOCIAL_LINKS = {
  facebook: '',
  instagram: '',
  twitter: '',
  whatsapp: '+251911123456',
} as const;

// =============================================
// SEO
// =============================================

export const DEFAULT_OG_IMAGE = '/images/og-image.jpg';
export const TWITTER_HANDLE = '@debredamohotel';

// =============================================
// GOOGLE MAPS
// =============================================

export const HOTEL_COORDINATES = {
  lat: 9.03,
  lng: 38.74,
} as const;

// =============================================
// ERROR MESSAGES
// =============================================

export const ERROR_MESSAGES = {
  generic: 'Something went wrong. Please try again.',
  network: 'Network error. Please check your connection.',
  unauthorized: 'You are not authorized to perform this action.',
  notFound: 'The requested resource was not found.',
  validation: 'Please check your input and try again.',
  serverError: 'Server error. Please try again later.',
} as const;

// =============================================
// SUCCESS MESSAGES
// =============================================

export const SUCCESS_MESSAGES = {
  reservationSubmitted: 'Your reservation request has been submitted successfully!',
  contactSubmitted: 'Your message has been sent successfully!',
  newsletterSubscribed: 'Thank you for subscribing to our newsletter!',
  updateSuccess: 'Updated successfully!',
  deleteSuccess: 'Deleted successfully!',
  createSuccess: 'Created successfully!',
} as const;
