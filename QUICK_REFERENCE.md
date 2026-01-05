# Quick Reference Guide

A quick reference for common tasks and commands in the DEBREDAMO HOTEL project.

## Essential Commands

### Development
```bash
npm run dev              # Start dev server (localhost:3000)
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
```

### Database
```bash
npx prisma generate      # Generate Prisma Client
npx prisma migrate dev   # Create & apply migration
npx prisma migrate deploy # Apply migrations (production)
npx prisma db seed       # Seed database
npx prisma studio        # Open database GUI (localhost:5555)
```

### Testing
```bash
tsx scripts/check-db.ts  # Test database connection
tsx scripts/test-email.ts # Test email configuration
```

---

## Project Structure

```
debredamo-hotel/
├── app/                    # Next.js pages & API routes
│   ├── (marketing)/       # Public pages (/, /about, /rooms, etc.)
│   └── api/               # API endpoints
├── components/            # React components
│   ├── layout/           # Header, Footer, Navigation
│   ├── rooms/            # Room components
│   ├── shared/           # Reusable components
│   └── ui/               # shadcn/ui components
├── config/               # Configuration files
│   ├── site.ts          # Static data (rooms, amenities)
│   └── navigation.ts    # Navigation items
├── lib/                  # Utilities and helpers
│   ├── db/prisma.ts     # Database client
│   ├── data.ts          # Static data helpers
│   ├── email.ts         # Email templates
│   └── mailto.ts        # Mailto URL generators
├── prisma/              # Database schema & migrations
├── public/              # Static assets
└── types/               # TypeScript types
```

---

## Common File Locations

| What | Where |
|------|-------|
| Room data | `config/site.ts` |
| Navigation items | `config/navigation.ts` |
| Database client | `lib/db/prisma.ts` |
| Database schema | `prisma/schema.prisma` |
| Email templates | `lib/email.ts` |
| Booking mailto helpers | `lib/mailto.ts` |
| Type definitions | `types/index.ts` |
| Global styles | `app/globals.css` |
| Environment variables | `.env` (copy from `.env.example`) |

---

## Database Models

```prisma
Page              # Dynamic pages (about, services, etc.)
BlogPost          # Blog posts
ContactSubmission # Contact form submissions
SiteSetting       # Site-wide settings (key-value pairs)
```

---

## Data Access Patterns

### Static Room Data
```typescript
import { getAllRooms, getRoomBySlug } from '@/lib/data'

const rooms = getAllRooms()
const room = getRoomBySlug('deluxe-suite')
```

### Database (Prisma)
```typescript
import { prisma } from '@/lib/db/prisma'

// Get all published blog posts
const posts = await prisma.blogPost.findMany({
  where: { published: true }
})

// Get page by slug
const page = await prisma.page.findUnique({
  where: { slug: 'about' }
})
```

---

## Component Types

### Server Component (Default)
```tsx
// No 'use client' directive
export default async function Page() {
  const data = await fetchData()
  return <div>{data}</div>
}
```

### Client Component
```tsx
'use client'

import { useState } from 'react'

export function Component() {
  const [state, setState] = useState()
  return <div>...</div>
}
```

---

## i18n (Internationalization)

### Supported Locales
- `en` - English
- `am` - Amharic

### Content Structure
All content has English and Amharic versions:

**Database fields**:
- `title` / `titleAm`
- `description` / `descriptionAm`
- `content` / `contentAm`

**Static data**:
- `name` / `name_am`
- `description` / `description_am`

### Usage
```tsx
const title = locale === 'am' ? titleAm : title
```

---

## Styling

### Tailwind Utility Classes
```tsx
<div className="rounded-lg bg-white p-6 shadow-md">
  Content
</div>
```

### Responsive
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  Responsive grid
</div>
```

### Design Tokens (CSS Variables)
```css
--color-primary
--color-primary-foreground
--color-secondary
--color-accent
```

---

## Common Tasks Cheatsheet

### Add a New Room
1. Edit `config/site.ts` → Add room object to `rooms` array
2. Add images to `public/rooms/`
3. Test at `/accommodation/room-slug`

### Add a Blog Post
```bash
npx prisma studio
# Navigate to BlogPost → Add Record
```

Or via Prisma:
```typescript
await prisma.blogPost.create({
  data: {
    slug: 'post-slug',
    title: 'Post Title',
    titleAm: 'አማርኛ ርዕስ',
    // ... other fields
  }
})
```

### Add Navigation Item
Edit `config/navigation.ts`:
```typescript
{
  href: '/new-page',
  label: 'New Page',
  label_am: 'አዲስ ገጽ'
}
```

### Create New Page
```tsx
// app/(marketing)/new-page/page.tsx
export const metadata = {
  title: 'New Page - DEBREDAMO HOTEL'
}

export default function NewPage() {
  return <div>Page content</div>
}
```

### Create API Endpoint
```tsx
// app/api/endpoint/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return NextResponse.json({ data: 'response' })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  // Process request
  return NextResponse.json({ success: true })
}
```

---

## Environment Variables

### Required
```env
DATABASE_URL="postgresql://..."
```

### Optional
```env
DATABASE_URL_POOLED="postgresql://..."  # Pooled connection
RESEND_API_KEY="re_..."                 # Email API key
ADMIN_EMAIL="admin@debredamohotel.com"  # Admin email
```

---

## Git Workflow

### Branch Naming
```
feature/description  # New features
fix/description      # Bug fixes
refactor/description # Code refactoring
docs/description     # Documentation
```

### Commit Messages
```
feat(scope): description
fix(scope): description
docs(scope): description
```

Examples:
```
feat(rooms): Add room filtering
fix(booking): Correct date validation
docs(api): Update API documentation
```

---

## API Endpoints

### POST /api/contact
Submit contact form

**Request**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Inquiry message"
}
```

**Response**:
```json
{
  "success": true
}
```

---

## Booking System (Mailto)

### Generate Booking Email
```typescript
import { generateRoomSpecificEmail } from '@/lib/mailto'

const mailtoUrl = generateRoomSpecificEmail({
  roomName: 'Deluxe Suite',
  checkIn: '2026-02-01',
  checkOut: '2026-02-05',
  adults: 2,
  children: 0
})

// Use in link
<a href={mailtoUrl}>Book Now</a>
```

---

## Deployment Quick Steps

### Vercel (Recommended)
1. Push to GitHub
2. Import to Vercel
3. Set environment variables
4. Deploy

### Other Platforms
See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed guides.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Build fails | `npx prisma generate && npm run build` |
| Type errors | Check `types/index.ts`, fix type issues |
| Database connection error | Check `DATABASE_URL` in `.env` |
| Prisma Client not found | `npx prisma generate` |
| Email not sending | Check `RESEND_API_KEY` and `ADMIN_EMAIL` |
| Images not loading | Check paths start with `/` (e.g., `/rooms/image.jpg`) |

### Quick Fixes
```bash
# Reset node_modules
rm -rf node_modules package-lock.json
npm install

# Reset build
rm -rf .next
npm run build

# Reset Prisma
npx prisma generate
npx prisma migrate deploy
```

---

## Useful TypeScript Types

```typescript
// Room type
interface Room {
  id: string
  slug: string
  name: string
  name_am: string
  capacity: number
  price: number
  images: string[]
  amenities: string[]
}

// Locale
type Locale = 'en' | 'am'

// Contact form
interface ContactFormData {
  name: string
  email: string
  subject?: string
  message: string
}
```

---

## Performance Tips

### Image Optimization
```tsx
import Image from 'next/image'

<Image
  src="/rooms/deluxe.jpg"
  alt="Deluxe Suite"
  width={800}
  height={600}
  priority={true}  // For above-fold images
/>
```

### Dynamic Imports
```tsx
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./heavy'), {
  loading: () => <LoadingSpinner />
})
```

### Database Query Optimization
```typescript
// Include relations in single query
const posts = await prisma.blogPost.findMany({
  include: { author: true }
})
```

---

## Key Files to Review

- **README.md** - Project overview
- **DEVELOPER_GUIDE.md** - Comprehensive dev guide
- **CONTRIBUTING.md** - Contribution guidelines
- **API.md** - API documentation
- **DEPLOYMENT.md** - Deployment guide
- **SECURITY.md** - Security policies
- **CLAUDE.md** - Claude Code instructions

---

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://prisma.io/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://typescriptlang.org/docs)
- [React Docs](https://react.dev)

---

**Need more details?** Check the [Developer Guide](./DEVELOPER_GUIDE.md) for comprehensive documentation.
