# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DEBREDAMO HOTEL is a hotel website built with Next.js 16 (App Router with Turbopack), React 19, TypeScript, Tailwind CSS, and PostgreSQL via Prisma ORM. The application supports bilingual content (English/Amharic) and allows guests to inquire about room bookings via email using mailto links with pre-filled templates.

## Common Commands

### Development
```bash
npm run dev          # Start development server (Next.js with Turbopack)
npm run build        # Build for production (runs prisma generate first)
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Database
```bash
npx prisma generate  # Generate Prisma Client (auto-runs on build and postinstall)
npx prisma migrate dev --name <name>  # Create and apply migration
npx prisma migrate deploy  # Apply migrations in production
npx prisma db seed   # Seed database with initial data
npx prisma studio    # Open Prisma Studio (database GUI)
tsx scripts/check-db.ts  # Test database connection
```

### Email Testing
```bash
tsx scripts/test-email.ts  # Test email configuration with Resend
```

## Architecture

### Database Layer

**Primary Database**: PostgreSQL hosted on Neon with Prisma ORM
- **Client**: `lib/db/prisma.ts` exports singleton `prisma` client with Neon adapter
- **Schema**: `prisma/schema.prisma` defines all models (Page, BlogPost, SiteSetting, ContactSubmission)
- **Migrations**: Located in `prisma/migrations/`
- **Seed**: `prisma/seed.ts` populates initial data

**Note**: The application previously used Supabase but has fully migrated to Prisma ORM. All new features should use Prisma (`lib/db/prisma.ts`).

### Data Access Patterns

**Static Data**: `config/site.ts` contains room definitions, amenity icons, and site configuration
- `lib/data.ts` provides helper functions to query this static data (`getAllRooms()`, `getRoomBySlug()`, etc.)
- **CRITICAL**: `getAmenityIcon()` in `lib/data.ts` must be exported as a named export, not a default export

**Dynamic Data**: Use Prisma client directly for database operations (contact submissions, blog posts, etc.)

### Booking Flow

**Email Integration via Mailto Links**: The application uses mailto links for booking inquiries instead of a traditional reservation system. When users click booking buttons, their default email client opens with pre-filled templates.

**How It Works**:
- Users fill out booking details (dates, guests, room selection)
- Click "Book Now" or "Send Booking Inquiry" button
- Their email client (Gmail, Outlook, etc.) opens automatically
- Email is pre-filled with:
  - Subject line (e.g., "Room Booking Inquiry - Deluxe Suite")
  - Body with booking details and room information
  - Recipient: `reservation@debredamohotel.com`
- User reviews and sends the email

**Components**:
- `components/shared/quick-booking-form.tsx` - Homepage booking form that opens email client with pre-filled check-in, check-out, and guest details
- `components/shared/whatsapp-button.tsx` - **Actually EmailButton** - Floating email button for general inquiries (renamed component but file name unchanged)
- `app/(marketing)/accommodation/[slug]/page.tsx` - Room detail pages with mailto booking buttons including room-specific information
- `lib/mailto.ts` - Helper functions to generate mailto URLs with pre-filled templates

**Mailto Helpers**:
- `generateGenericReservationEmail()` - Creates mailto link for general booking inquiries
- `generateRoomSpecificEmail(params)` - Creates mailto link with room details, dates, and guest info

### Email System

**Provider**: Resend API
- Contact form notifications sent to admin
- Email templates are inline HTML in `lib/email.ts`
- Configuration requires `RESEND_API_KEY` and `ADMIN_EMAIL` env vars
- Gracefully handles missing API key by logging instead of throwing errors

### Route Structure

```
app/
├── (marketing)/          # Public-facing pages
│   ├── page.tsx         # Homepage
│   ├── accommodation/   # Room listings and details
│   │   └── [slug]/     # Individual room detail pages
│   ├── about/
│   ├── services/
│   ├── contact/
│   └── blog/
│       └── [slug]/     # Individual blog post pages
└── api/                 # API routes
    └── contact/         # POST contact form submissions
```

### Component Organization

```
components/
├── layout/              # Header, Footer, MobileMenu, Navigation
├── rooms/               # Room cards, filters, grids
├── shared/              # Reusable components
│   ├── quick-booking-form.tsx    # Email booking form (mailto)
│   ├── whatsapp-button.tsx       # Floating email button (mailto)
│   ├── sticky-header.tsx         # Sticky "Book Now" header
│   └── ...
└── ui/                  # shadcn/ui components (Button, Dialog, etc.)
```

### Type System

- `types/index.ts` - Main application types
- Prisma generates types from schema automatically

### Styling

- **Tailwind CSS 4** with PostCSS
- Custom animations via `tw-animate-css`
- Global styles in `app/globals.css`
- Uses `clsx` and `tailwind-merge` via `lib/utils.ts`

### Internationalization (i18n)

Bilingual support (English/Amharic) via locale system:
- Type: `Locale = "en" | "am"`
- Configuration in `config/site.ts` and `config/navigation.ts`
- Content stored with `_am` suffixes in database (e.g., `nameAm`, `descriptionAm`)

## Environment Variables

Required variables (see `.env.example` for template):
```
DATABASE_URL=          # Neon PostgreSQL connection string (required)
DATABASE_URL_POOLED=   # Neon pooled connection (optional)
RESEND_API_KEY=        # Email sending for contact form notifications
ADMIN_EMAIL=           # Email recipient for contact form submissions
```

**Security**:
- Copy `.env.example` to `.env` and fill in your credentials
- Never commit `.env` to git (already in `.gitignore`)
- See `SECURITY.md` for credential rotation instructions

## Known Issues

None currently. All critical issues have been resolved.

## Development Notes

- **Turbopack**: Next.js 16 uses Turbopack by default (faster than Webpack)
- **React 19**: Uses latest React features
- **Prisma Best Practices**:
  - Run `prisma generate` after schema changes
  - Use transactions for operations that modify multiple records
  - Environment variable `DATABASE_URL` is validated at startup
- **Email in Development**: Set `RESEND_API_KEY` or emails will be logged to console instead of sent (for contact form)
- **Date Handling**: Uses `date-fns` for formatting, stores as ISO strings or Date objects
- **Mailto Links**: Booking system uses mailto links that open user's email client
  - No backend email sending for bookings
  - Templates are pre-filled with booking details
  - All booking emails go to `reservation@debredamohotel.com`
  - Users must have an email client configured on their device
