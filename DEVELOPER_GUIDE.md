# Developer Guide

Welcome to the DEBREDAMO HOTEL Developer Guide. This document provides comprehensive information for developers working on this project.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Architecture Overview](#architecture-overview)
3. [Development Workflow](#development-workflow)
4. [Database Management](#database-management)
5. [Working with Components](#working-with-components)
6. [Routing and Pages](#routing-and-pages)
7. [Internationalization (i18n)](#internationalization-i18n)
8. [Email System](#email-system)
9. [Booking System](#booking-system)
10. [Styling Guide](#styling-guide)
11. [Common Tasks](#common-tasks)
12. [Performance Optimization](#performance-optimization)
13. [Troubleshooting](#troubleshooting)
14. [Best Practices](#best-practices)

---

## Getting Started

### Development Environment Setup

1. **Install Prerequisites**
   ```bash
   node --version  # Should be 18+
   npm --version
   ```

2. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd debredamo-hotel
   npm install
   ```

3. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

4. **Initialize Database**
   ```bash
   npx prisma generate
   npx prisma migrate deploy
   npx prisma db seed
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   # Server runs on http://localhost:3000
   ```

### IDE Setup

**Recommended: VS Code**

Install these extensions:
- ESLint
- Prisma
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features
- Pretty TypeScript Errors

**VS Code Settings** (`.vscode/settings.json`):
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

---

## Architecture Overview

### Technology Stack

```
┌─────────────────────────────────────────────┐
│           Next.js 16 (App Router)           │
│              React 19 + TypeScript          │
└─────────────────────────────────────────────┘
                      │
        ┌─────────────┴─────────────┐
        │                           │
┌───────▼────────┐         ┌────────▼───────┐
│   Frontend      │         │    Backend     │
│   Components    │         │   API Routes   │
│   (RSC + Client)│         │   Server Actions│
└───────┬────────┘         └────────┬───────┘
        │                           │
        │         ┌─────────────────┘
        │         │
┌───────▼─────────▼────────┐
│   Database Layer          │
│   Prisma ORM → PostgreSQL │
│   (Neon Serverless)       │
└──────────────────────────┘
```

### Application Layers

#### 1. **Presentation Layer** (`components/`, `app/`)
- React Server Components (RSC) for static content
- Client Components for interactivity
- Tailwind CSS for styling
- Framer Motion for animations

#### 2. **Data Layer** (`lib/`, `config/`)
- **Static Data**: `config/site.ts` (rooms, amenities, site config)
- **Database Data**: Prisma Client for dynamic content
- **Data Helpers**: `lib/data.ts` for querying static data

#### 3. **Database Layer** (`prisma/`)
- PostgreSQL via Neon
- Prisma ORM for type-safe queries
- Migrations for schema versioning

#### 4. **Integration Layer** (`lib/email.ts`, `lib/mailto.ts`)
- Email notifications via Resend
- Mailto link generation for bookings

---

## Development Workflow

### Branch Strategy

```
main (production)
  ├── develop (development)
  │   ├── feature/new-feature
  │   ├── fix/bug-fix
  │   └── refactor/code-improvement
```

**Branch Naming**:
- `feature/description` - New features
- `fix/description` - Bug fixes
- `refactor/description` - Code refactoring
- `docs/description` - Documentation updates

### Commit Messages

Follow conventional commits:
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, missing semicolons
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

**Examples**:
```
feat(rooms): Add room filtering by amenities
fix(booking): Correct date validation in booking form
docs(api): Update API endpoint documentation
```

### Code Review Checklist

Before submitting a PR:
- [ ] Code follows TypeScript and ESLint guidelines
- [ ] All TypeScript errors resolved
- [ ] Components are properly typed
- [ ] No console.log statements (use proper logging)
- [ ] Responsive design tested (mobile, tablet, desktop)
- [ ] i18n strings added for both languages (en, am)
- [ ] Database migrations tested
- [ ] Build completes without errors (`npm run build`)
- [ ] Changes documented

---

## Database Management

### Prisma ORM

#### Schema Location
`prisma/schema.prisma` - Single source of truth for database structure

#### Core Models

```prisma
model Page {
  id          String   @id @default(cuid())
  title       String
  titleAm     String
  slug        String   @unique
  content     String   @db.Text
  contentAm   String   @db.Text
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model BlogPost {
  id          String   @id @default(cuid())
  title       String
  titleAm     String
  slug        String   @unique
  excerpt     String
  excerptAm   String
  content     String   @db.Text
  contentAm   String   @db.Text
  image       String?
  published   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model ContactSubmission {
  id          String   @id @default(cuid())
  name        String
  email       String
  subject     String?
  message     String   @db.Text
  createdAt   DateTime @default(now())
}

model SiteSetting {
  id          String   @id @default(cuid())
  key         String   @unique
  value       String   @db.Text
  updatedAt   DateTime @updatedAt
}
```

#### Creating Migrations

1. **Modify schema**
   ```prisma
   // prisma/schema.prisma
   model Room {
     id        String @id @default(cuid())
     name      String
     capacity  Int
     // ... new fields
   }
   ```

2. **Create migration**
   ```bash
   npx prisma migrate dev --name add_room_model
   ```

3. **Apply to production**
   ```bash
   npx prisma migrate deploy
   ```

#### Using Prisma Client

**Import the client**:
```typescript
import { prisma } from '@/lib/db/prisma'
```

**Query examples**:
```typescript
// Find all published blog posts
const posts = await prisma.blogPost.findMany({
  where: { published: true },
  orderBy: { createdAt: 'desc' }
})

// Create a contact submission
const submission = await prisma.contactSubmission.create({
  data: {
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Inquiry about booking'
  }
})

// Update a page
await prisma.page.update({
  where: { slug: 'about' },
  data: { content: 'Updated content' }
})

// Delete old submissions (example cleanup)
await prisma.contactSubmission.deleteMany({
  where: {
    createdAt: {
      lt: new Date('2024-01-01')
    }
  }
})
```

#### Database Client Singleton

**File**: `lib/db/prisma.ts`

```typescript
import { PrismaClient } from '@prisma/client'
import { neonAdapter } from '@prisma/adapter-neon'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: neonAdapter({
      connectionString: process.env.DATABASE_URL!
    }),
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

**Why singleton?** Prevents multiple Prisma Client instances in development (Next.js hot reload).

#### Seeding Data

**File**: `prisma/seed.ts`

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Seed pages
  await prisma.page.createMany({
    data: [
      {
        slug: 'about',
        title: 'About Us',
        titleAm: 'ስለ እኛ',
        content: '...',
        contentAm: '...'
      }
    ],
    skipDuplicates: true
  })

  // Seed blog posts
  await prisma.blogPost.createMany({
    data: [
      // ... blog posts
    ],
    skipDuplicates: true
  })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

**Run seeding**:
```bash
npx prisma db seed
```

#### Prisma Studio (Database GUI)

```bash
npx prisma studio
# Opens at http://localhost:5555
```

Use Prisma Studio to:
- View all data
- Edit records
- Test queries
- Debug data issues

---

## Working with Components

### Component Architecture

#### Server Components (Default)
Use for static content and data fetching:

```tsx
// app/(marketing)/rooms/page.tsx
import { getAllRooms } from '@/lib/data'

export default async function RoomsPage() {
  const rooms = getAllRooms()

  return (
    <div>
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  )
}
```

#### Client Components
Use when you need interactivity:

```tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function BookingForm() {
  const [dates, setDates] = useState<DateRange>()

  return (
    <form>
      <DatePicker value={dates} onChange={setDates} />
      <Button type="submit">Book Now</Button>
    </form>
  )
}
```

### Component Organization

```
components/
├── layout/              # Layout components
│   ├── header.tsx      # Site header
│   ├── footer.tsx      # Site footer
│   ├── mobile-menu.tsx # Mobile navigation
│   └── navigation.tsx  # Main navigation
├── rooms/              # Room-specific components
│   ├── room-card.tsx
│   ├── room-grid.tsx
│   ├── room-filters.tsx
│   └── featured-rooms.tsx
├── shared/             # Reusable components
│   ├── quick-booking-form.tsx
│   ├── whatsapp-button.tsx  # Actually email button
│   ├── sticky-header.tsx
│   └── section-heading.tsx
└── ui/                 # shadcn/ui primitives
    ├── button.tsx
    ├── dialog.tsx
    ├── input.tsx
    └── ...
```

### Creating a New Component

1. **Determine type** (Server vs Client)
2. **Choose location** based on purpose
3. **Create file** with proper naming

**Example - Room Filter Component**:

```tsx
// components/rooms/room-filters.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

interface RoomFiltersProps {
  onFilterChange: (filters: RoomFilter) => void
}

export function RoomFilters({ onFilterChange }: RoomFiltersProps) {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Filter by Amenities</h3>
      {/* Filter UI */}
    </div>
  )
}
```

### Component Best Practices

1. **Type Everything**
   ```tsx
   interface Props {
     title: string
     onClick?: () => void
   }

   export function Component({ title, onClick }: Props) {
     // ...
   }
   ```

2. **Extract Reusable Logic**
   ```tsx
   // hooks/use-booking.ts
   export function useBooking() {
     const [dates, setDates] = useState()
     const [guests, setGuests] = useState(2)

     return { dates, setDates, guests, setGuests }
   }
   ```

3. **Keep Components Small**
   - Single responsibility
   - Extract complex logic to hooks or utilities
   - Break large components into smaller ones

4. **Use Composition**
   ```tsx
   <Card>
     <CardHeader>
       <CardTitle>Room Name</CardTitle>
     </CardHeader>
     <CardContent>
       {/* Content */}
     </CardContent>
   </Card>
   ```

---

## Routing and Pages

### App Router Structure

```
app/
├── (marketing)/           # Route group (doesn't affect URL)
│   ├── layout.tsx        # Shared layout for marketing pages
│   ├── page.tsx          # Homepage (/)
│   ├── about/
│   │   └── page.tsx      # /about
│   ├── accommodation/
│   │   ├── page.tsx      # /accommodation
│   │   └── [slug]/       # Dynamic route
│   │       └── page.tsx  # /accommodation/deluxe-suite
│   ├── services/
│   │   └── page.tsx      # /services
│   ├── contact/
│   │   └── page.tsx      # /contact
│   └── blog/
│       ├── page.tsx      # /blog
│       └── [slug]/
│           └── page.tsx  # /blog/post-slug
└── api/                  # API routes
    └── contact/
        └── route.ts      # POST /api/contact
```

### Creating a New Page

**Static Page**:
```tsx
// app/(marketing)/gallery/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gallery - DEBREDAMO HOTEL',
  description: 'View our hotel gallery'
}

export default function GalleryPage() {
  return (
    <div>
      <h1>Gallery</h1>
      {/* Page content */}
    </div>
  )
}
```

**Dynamic Page**:
```tsx
// app/(marketing)/rooms/[slug]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getRoomBySlug, getAllRooms } from '@/lib/data'

interface Props {
  params: Promise<{ slug: string }>
}

// Generate static params for all rooms
export async function generateStaticParams() {
  const rooms = getAllRooms()
  return rooms.map((room) => ({
    slug: room.slug
  }))
}

// Generate metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const room = getRoomBySlug(slug)

  if (!room) {
    return { title: 'Room Not Found' }
  }

  return {
    title: `${room.name} - DEBREDAMO HOTEL`,
    description: room.description
  }
}

export default async function RoomPage({ params }: Props) {
  const { slug } = await params
  const room = getRoomBySlug(slug)

  if (!room) {
    notFound()
  }

  return (
    <div>
      <h1>{room.name}</h1>
      {/* Room details */}
    </div>
  )
}
```

### API Routes

**POST Route Example**:
```tsx
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'
import { sendContactEmail } from '@/lib/email'

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(10)
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = contactSchema.parse(body)

    // Save to database
    const submission = await prisma.contactSubmission.create({
      data
    })

    // Send email notification
    await sendContactEmail(data)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    )
  }
}
```

---

## Internationalization (i18n)

### Language System

**Supported Locales**: English (`en`), Amharic (`am`)

**Type Definition**:
```typescript
// types/index.ts
export type Locale = 'en' | 'am'
```

### Content Structure

All multilingual content has both English and Amharic versions:

**Database Fields**:
```prisma
model BlogPost {
  title       String   // English
  titleAm     String   // Amharic
  content     String   // English
  contentAm   String   // Amharic
}
```

**Static Content** (`config/site.ts`):
```typescript
export const rooms = [
  {
    id: '1',
    name: 'Deluxe Suite',
    name_am: 'ዴሉክስ ስዊት',
    description: 'Spacious luxury suite...',
    description_am: 'ሰፊ የቅንጦት ክፍል...'
  }
]
```

### Using Localized Content

**In Components**:
```tsx
interface Props {
  locale: Locale
}

export function RoomCard({ locale }: Props) {
  const room = getRoomBySlug('deluxe-suite')

  const name = locale === 'am' ? room.name_am : room.name
  const description = locale === 'am' ? room.description_am : room.description

  return (
    <div>
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  )
}
```

**Helper Function**:
```typescript
// lib/utils.ts
export function getLocalizedField<T>(
  obj: T,
  field: keyof T,
  locale: Locale
): any {
  const amField = `${String(field)}Am` as keyof T
  return locale === 'am' && amField in obj ? obj[amField] : obj[field]
}

// Usage
const title = getLocalizedField(post, 'title', locale)
```

### Navigation Labels

**File**: `config/navigation.ts`
```typescript
export const navigationItems = [
  {
    href: '/',
    label: 'Home',
    label_am: 'መነሻ'
  },
  {
    href: '/accommodation',
    label: 'Accommodation',
    label_am: 'መኖሪያ'
  }
]
```

### Adding New Translations

1. **Add to static content** (`config/site.ts`, `config/navigation.ts`)
2. **Add database fields** if needed (with `_am` suffix)
3. **Update components** to use localized content
4. **Test both languages** thoroughly

---

## Email System

### Resend API Integration

**Configuration** (`.env`):
```env
RESEND_API_KEY=re_xxxxxxxxxxxx
ADMIN_EMAIL=admin@debredamohotel.com
```

### Email Templates

**File**: `lib/email.ts`

```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactEmail(data: ContactFormData) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('No RESEND_API_KEY - Email would be sent:', data)
    return
  }

  const emailHtml = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Message:</strong></p>
    <p>${data.message}</p>
  `

  await resend.emails.send({
    from: 'DEBREDAMO HOTEL <noreply@debredamohotel.com>',
    to: process.env.ADMIN_EMAIL!,
    subject: `Contact Form: ${data.subject || 'General Inquiry'}`,
    html: emailHtml
  })
}
```

### Testing Email

**Script**: `scripts/test-email.ts`
```bash
tsx scripts/test-email.ts
```

---

## Booking System

### Mailto-Based Booking

The application uses **mailto links** instead of a traditional booking system. When users click "Book Now", their email client opens with pre-filled booking details.

### Mailto Helpers

**File**: `lib/mailto.ts`

```typescript
interface BookingDetails {
  checkIn: string
  checkOut: string
  adults: number
  children: number
  roomName?: string
  roomDetails?: string
}

export function generateGenericReservationEmail(details: BookingDetails): string {
  const subject = encodeURIComponent('Room Booking Inquiry')

  const body = encodeURIComponent(
    `Dear DEBREDAMO HOTEL Team,

I would like to inquire about room availability.

Booking Details:
- Check-in: ${details.checkIn}
- Check-out: ${details.checkOut}
- Adults: ${details.adults}
- Children: ${details.children}

${details.roomName ? `Preferred Room: ${details.roomName}\n` : ''}
Please let me know about availability and rates.

Best regards`
  )

  return `mailto:reservation@debredamohotel.com?subject=${subject}&body=${body}`
}

export function generateRoomSpecificEmail(params: BookingDetails): string {
  const subject = encodeURIComponent(`Room Booking Inquiry - ${params.roomName}`)

  const body = encodeURIComponent(
    `Dear DEBREDAMO HOTEL Team,

I am interested in booking the ${params.roomName}.

${params.roomDetails || ''}

Booking Details:
- Check-in: ${params.checkIn}
- Check-out: ${params.checkOut}
- Guests: ${params.adults} adults, ${params.children} children

Please confirm availability and provide pricing details.

Best regards`
  )

  return `mailto:reservation@debredamohotel.com?subject=${subject}&body=${body}`
}
```

### Booking Flow Implementation

**Quick Booking Form** (`components/shared/quick-booking-form.tsx`):

```tsx
'use client'

import { useState } from 'react'
import { generateGenericReservationEmail } from '@/lib/mailto'

export function QuickBookingForm() {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)

  const handleSubmit = () => {
    const mailtoUrl = generateGenericReservationEmail({
      checkIn,
      checkOut,
      adults,
      children
    })

    window.location.href = mailtoUrl
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <Button type="submit">Send Booking Inquiry</Button>
    </form>
  )
}
```

**Room Detail Booking**:

```tsx
// app/(marketing)/accommodation/[slug]/page.tsx
import { generateRoomSpecificEmail } from '@/lib/mailto'

export default function RoomPage({ room }) {
  const mailtoUrl = generateRoomSpecificEmail({
    roomName: room.name,
    roomDetails: room.description,
    checkIn: '2026-02-01',
    checkOut: '2026-02-05',
    adults: 2,
    children: 0
  })

  return (
    <div>
      <h1>{room.name}</h1>
      <a href={mailtoUrl}>
        <Button>Book This Room</Button>
      </a>
    </div>
  )
}
```

---

## Styling Guide

### Tailwind CSS 4

**Configuration**: `postcss.config.mjs`, `app/globals.css`

### Design Tokens

**Colors** (defined in `globals.css`):
```css
@theme {
  --color-primary: #b8925d;
  --color-primary-foreground: #ffffff;
  --color-secondary: #f5f5f0;
  --color-accent: #8b7355;
}
```

### Common Patterns

**Container**:
```tsx
<div className="container mx-auto px-4 py-8">
  {/* Content */}
</div>
```

**Card**:
```tsx
<div className="rounded-lg border bg-card p-6 shadow-sm">
  {/* Card content */}
</div>
```

**Button Variants**:
```tsx
<Button variant="default">Primary Action</Button>
<Button variant="outline">Secondary Action</Button>
<Button variant="ghost">Subtle Action</Button>
```

### Responsive Design

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Responsive grid */}
</div>

<h1 className="text-2xl md:text-4xl lg:text-5xl">
  Responsive Typography
</h1>
```

### Animations

**Framer Motion**:
```tsx
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

**Tailwind Animations** (via tw-animate-css):
```tsx
<div className="animate-fade-in">
  Fades in on load
</div>
```

---

## Common Tasks

### Adding a New Room

1. **Update static data** (`config/site.ts`):
   ```typescript
   export const rooms = [
     // ... existing rooms
     {
       id: '7',
       slug: 'presidential-suite',
       name: 'Presidential Suite',
       name_am: 'የፕሬዚዳንት ስዊት',
       description: 'Ultimate luxury...',
       description_am: 'ከፍተኛ ቅንጦት...',
       capacity: 4,
       beds: '1 King Bed',
       size: '100 sqm',
       price: 500,
       images: ['/rooms/presidential-1.jpg'],
       amenities: ['wifi', 'tv', 'minibar', 'balcony', 'workspace']
     }
   ]
   ```

2. **Add images** to `public/rooms/`

3. **Test** room page at `/accommodation/presidential-suite`

### Adding a Blog Post

**Via Prisma Studio**:
```bash
npx prisma studio
```
Navigate to BlogPost model and create new record.

**Via Script**:
```typescript
import { prisma } from '@/lib/db/prisma'

await prisma.blogPost.create({
  data: {
    slug: 'new-restaurant-opening',
    title: 'New Restaurant Opening',
    titleAm: 'አዲስ ምግብ ቤት መክፈት',
    excerpt: 'We are excited to announce...',
    excerptAm: 'እኛ ደስተኛ ነን...',
    content: 'Full content...',
    contentAm: 'ሙሉ ይዘት...',
    published: true,
    image: '/blog/restaurant.jpg'
  }
})
```

### Modifying Navigation

**File**: `config/navigation.ts`

```typescript
export const navigationItems = [
  // ... existing items
  {
    href: '/gallery',
    label: 'Gallery',
    label_am: 'ማዕከለ'
  }
]
```

Navigation automatically updates in Header component.

### Adding a New Page

1. **Create page file**:
   ```tsx
   // app/(marketing)/new-page/page.tsx
   export default function NewPage() {
     return <div>New Page Content</div>
   }
   ```

2. **Add metadata**:
   ```tsx
   export const metadata = {
     title: 'New Page - DEBREDAMO HOTEL',
     description: 'Page description'
   }
   ```

3. **Add to navigation** (if needed)

---

## Performance Optimization

### Image Optimization

**Next.js Image Component**:
```tsx
import Image from 'next/image'

<Image
  src="/rooms/deluxe.jpg"
  alt="Deluxe Suite"
  width={800}
  height={600}
  quality={85}
  priority={false}  // true for above-fold images
  placeholder="blur"
  blurDataURL="data:image/..."
/>
```

### Code Splitting

**Dynamic Imports**:
```tsx
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./heavy-component'), {
  loading: () => <LoadingSpinner />,
  ssr: false  // Client-side only if needed
})
```

### Database Query Optimization

```typescript
// Bad - N+1 queries
const posts = await prisma.blogPost.findMany()
for (const post of posts) {
  const author = await prisma.user.findUnique({ where: { id: post.authorId } })
}

// Good - Single query with relation
const posts = await prisma.blogPost.findMany({
  include: {
    author: true
  }
})
```

### Caching Strategies

**Revalidate pages**:
```tsx
export const revalidate = 3600  // Revalidate every hour

export default async function Page() {
  const data = await fetchData()
  return <div>{data}</div>
}
```

**Cache API responses**:
```tsx
export async function GET() {
  const data = await fetchData()

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200'
    }
  })
}
```

---

## Troubleshooting

### Common Issues

#### Database Connection Errors

**Error**: `Can't reach database server`

**Solutions**:
1. Check `DATABASE_URL` in `.env`
2. Verify Neon database is running
3. Check network connectivity
4. Test connection:
   ```bash
   tsx scripts/check-db.ts
   ```

#### Prisma Client Not Generated

**Error**: `Cannot find module '@prisma/client'`

**Solution**:
```bash
npx prisma generate
```

#### Type Errors After Schema Changes

**Solution**:
```bash
npx prisma generate
npm run build
```

#### Email Not Sending

**Check**:
1. `RESEND_API_KEY` is set in `.env`
2. API key is valid
3. Test email:
   ```bash
   tsx scripts/test-email.ts
   ```

#### Build Failures

**Common causes**:
- TypeScript errors
- Missing environment variables
- Prisma schema issues

**Debug**:
```bash
npm run lint
npx prisma validate
npm run build
```

### Debugging Tips

1. **Check logs**:
   - Development: Check terminal output
   - Production: Check hosting platform logs

2. **Use console strategically**:
   ```typescript
   console.log('Debug data:', { variable })
   ```

3. **TypeScript errors**:
   - Read error messages carefully
   - Check type definitions in `types/index.ts`

4. **Network issues**:
   - Check browser DevTools Network tab
   - Verify API endpoint paths

---

## Best Practices

### TypeScript

1. **Always type props**:
   ```tsx
   interface Props {
     title: string
     onClose: () => void
   }
   ```

2. **Use type inference**:
   ```typescript
   const rooms = getAllRooms()  // Type inferred
   ```

3. **Avoid `any`**:
   ```typescript
   // Bad
   const data: any = await fetch()

   // Good
   const data: ApiResponse = await fetch()
   ```

### React

1. **Keep components pure**
2. **Use proper state management**
3. **Memoize expensive calculations**:
   ```tsx
   const filtered = useMemo(
     () => rooms.filter(r => r.capacity >= minCapacity),
     [rooms, minCapacity]
   )
   ```

### Database

1. **Use transactions** for related operations
2. **Index frequently queried fields**
3. **Validate data** before database operations

### Security

1. **Validate all inputs** (use Zod)
2. **Sanitize user content**
3. **Never expose secrets** in client code
4. **Use environment variables** for sensitive data

### Git

1. **Commit frequently** with clear messages
2. **Keep commits focused** (one feature/fix per commit)
3. **Review your changes** before committing
4. **Never commit** `.env` files

---

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

**Happy coding!** If you have questions or suggestions for improving this guide, please reach out to the development team.
