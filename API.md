# API Documentation

This document describes all API endpoints available in the DEBREDAMO HOTEL application.

## Table of Contents

1. [Base URL](#base-url)
2. [Authentication](#authentication)
3. [Contact API](#contact-api)
4. [Data Access](#data-access)
5. [Error Handling](#error-handling)
6. [Rate Limiting](#rate-limiting)

---

## Base URL

**Development**: `http://localhost:3000`
**Production**: `https://debredamohotel.com`

---

## Authentication

Currently, the application does not require authentication for public endpoints. All endpoints are publicly accessible.

---

## Contact API

### Submit Contact Form

Submit a contact form inquiry.

**Endpoint**: `POST /api/contact`

**Request Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "subject": "General Inquiry",
  "message": "I would like to know more about your rooms."
}
```

**Request Schema**:
```typescript
interface ContactFormData {
  name: string          // Required, min 1 character
  email: string         // Required, valid email format
  subject?: string      // Optional
  message: string       // Required, min 10 characters
}
```

**Success Response**:
```json
{
  "success": true,
  "message": "Contact form submitted successfully"
}
```

**Status Code**: `200 OK`

**Error Responses**:

*Validation Error* - Invalid input data
```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```
**Status Code**: `400 Bad Request`

*Server Error* - Internal server error
```json
{
  "success": false,
  "error": "Failed to submit contact form"
}
```
**Status Code**: `500 Internal Server Error`

**Example Usage**:

JavaScript/TypeScript:
```typescript
async function submitContactForm(data: ContactFormData) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    throw new Error('Failed to submit form')
  }

  return await response.json()
}

// Usage
try {
  const result = await submitContactForm({
    name: 'John Doe',
    email: 'john@example.com',
    message: 'I would like to book a room.'
  })
  console.log('Success:', result)
} catch (error) {
  console.error('Error:', error)
}
```

React Hook Form:
```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters')
})

type ContactFormData = z.infer<typeof contactSchema>

function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = async (data: ContactFormData) => {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (response.ok) {
      // Handle success
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}

      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}

      <textarea {...register('message')} />
      {errors.message && <span>{errors.message.message}</span>}

      <button type="submit">Submit</button>
    </form>
  )
}
```

**What Happens After Submission**:
1. Form data is validated using Zod schema
2. If valid, data is saved to the database (`ContactSubmission` model)
3. Email notification sent to admin via Resend API (if configured)
4. Success response returned to client

**Email Notification**:
When `RESEND_API_KEY` and `ADMIN_EMAIL` are configured, an email is sent to the admin with the contact form details.

**Database Record**:
```prisma
model ContactSubmission {
  id          String   @id @default(cuid())
  name        String
  email       String
  subject     String?
  message     String   @db.Text
  createdAt   DateTime @default(now())
}
```

---

## Data Access

The application primarily uses static data and Server-Side Rendering (SSR). The following data access patterns are available:

### Static Room Data

Room data is statically defined in `config/site.ts` and accessed via helper functions in `lib/data.ts`.

**Available Functions**:

```typescript
import { getAllRooms, getRoomBySlug, getFeaturedRooms } from '@/lib/data'

// Get all rooms
const rooms = getAllRooms()

// Get room by slug
const room = getRoomBySlug('deluxe-suite')

// Get featured rooms
const featured = getFeaturedRooms()
```

**Room Type**:
```typescript
interface Room {
  id: string
  slug: string
  name: string
  name_am: string
  description: string
  description_am: string
  capacity: number
  beds: string
  size: string
  price: number
  images: string[]
  amenities: string[]
  featured?: boolean
}
```

### Blog Posts (Database)

Blog posts are stored in PostgreSQL and accessed via Prisma ORM.

**Server Component Example**:
```typescript
import { prisma } from '@/lib/db/prisma'

// Get all published posts
const posts = await prisma.blogPost.findMany({
  where: { published: true },
  orderBy: { createdAt: 'desc' }
})

// Get post by slug
const post = await prisma.blogPost.findUnique({
  where: { slug: 'post-slug' }
})
```

**BlogPost Type** (auto-generated by Prisma):
```typescript
interface BlogPost {
  id: string
  slug: string
  title: string
  titleAm: string
  excerpt: string
  excerptAm: string
  content: string
  contentAm: string
  image: string | null
  published: boolean
  createdAt: Date
  updatedAt: Date
}
```

### Pages (Database)

Dynamic pages are stored in PostgreSQL and accessed via Prisma ORM.

**Server Component Example**:
```typescript
import { prisma } from '@/lib/db/prisma'

// Get page by slug
const page = await prisma.page.findUnique({
  where: { slug: 'about' }
})
```

**Page Type**:
```typescript
interface Page {
  id: string
  slug: string
  title: string
  titleAm: string
  content: string
  contentAm: string
  createdAt: Date
  updatedAt: Date
}
```

### Site Settings (Database)

Site-wide settings stored as key-value pairs.

**Example**:
```typescript
import { prisma } from '@/lib/db/prisma'

// Get setting by key
const setting = await prisma.siteSetting.findUnique({
  where: { key: 'maintenance_mode' }
})

const isMaintenanceMode = setting?.value === 'true'
```

---

## Error Handling

### Error Response Format

All API errors follow a consistent format:

```typescript
interface ErrorResponse {
  success: false
  error: string           // Human-readable error message
  details?: Array<{       // Optional validation details
    field: string
    message: string
  }>
  code?: string          // Optional error code
}
```

### HTTP Status Codes

| Status Code | Meaning | Usage |
|-------------|---------|-------|
| 200 | OK | Successful request |
| 400 | Bad Request | Invalid request data (validation errors) |
| 404 | Not Found | Resource not found |
| 405 | Method Not Allowed | HTTP method not supported for endpoint |
| 500 | Internal Server Error | Unexpected server error |

### Validation Errors

Validation errors include field-specific details:

```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    },
    {
      "field": "message",
      "message": "Message must be at least 10 characters"
    }
  ]
}
```

### Client-Side Error Handling

**Example with try-catch**:
```typescript
try {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })

  const data = await response.json()

  if (!response.ok) {
    // Handle error response
    if (data.details) {
      // Show field-specific errors
      data.details.forEach(({ field, message }) => {
        console.error(`${field}: ${message}`)
      })
    } else {
      // Show general error
      console.error(data.error)
    }
    return
  }

  // Handle success
  console.log('Success:', data)
} catch (error) {
  // Handle network or parsing errors
  console.error('Network error:', error)
}
```

---

## Rate Limiting

Currently, the application does not implement rate limiting. In production, consider adding rate limiting to prevent abuse:

**Recommended Approach**:
- Use middleware or edge functions (Vercel Edge Config)
- Implement per-IP rate limiting
- Set reasonable limits (e.g., 10 requests per minute for contact form)

**Example with Vercel Edge Config** (future implementation):
```typescript
import { ratelimit } from '@/lib/ratelimit'

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'

  const { success } = await ratelimit.limit(ip)

  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    )
  }

  // Process request...
}
```

---

## Booking System

### Mailto-Based Booking

The application uses **mailto links** for booking inquiries instead of API endpoints. When users click "Book Now", their email client opens with pre-filled booking details.

**Mailto URL Generation**:

Located in `lib/mailto.ts`:

```typescript
interface BookingDetails {
  checkIn: string       // ISO date string (e.g., "2026-02-01")
  checkOut: string      // ISO date string
  adults: number
  children: number
  roomName?: string
  roomDetails?: string
}

// Generate generic booking email
function generateGenericReservationEmail(details: BookingDetails): string

// Generate room-specific booking email
function generateRoomSpecificEmail(details: BookingDetails): string
```

**Usage Example**:
```typescript
import { generateRoomSpecificEmail } from '@/lib/mailto'

const mailtoUrl = generateRoomSpecificEmail({
  roomName: 'Deluxe Suite',
  roomDetails: 'Spacious room with king bed',
  checkIn: '2026-02-01',
  checkOut: '2026-02-05',
  adults: 2,
  children: 0
})

// Use in link or button
<a href={mailtoUrl}>
  <Button>Book Now</Button>
</a>
```

**Email Recipient**: `reservation@debredamohotel.com`

**Why Mailto?**
- No backend booking system needed
- Direct communication with hotel staff
- Flexible for custom inquiries
- User's email client handles sending

---

## Future API Endpoints

The following endpoints may be added in future versions:

### Room Availability (Planned)

```
GET /api/rooms/availability?checkIn=2026-02-01&checkOut=2026-02-05
```

Check room availability for given dates.

### Newsletter Subscription (Planned)

```
POST /api/newsletter/subscribe
```

Subscribe to hotel newsletter.

### Review Submission (Planned)

```
POST /api/reviews
```

Submit a hotel review.

---

## Development and Testing

### Testing API Endpoints Locally

**Using cURL**:
```bash
# Test contact form endpoint
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message."
  }'
```

**Using Postman**:
1. Create new POST request
2. URL: `http://localhost:3000/api/contact`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
   ```json
   {
     "name": "Test User",
     "email": "test@example.com",
     "message": "This is a test message."
   }
   ```
5. Send request

**Using VS Code REST Client**:
```http
### Submit Contact Form
POST http://localhost:3000/api/contact
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "subject": "Testing",
  "message": "This is a test message from REST client."
}
```

### Database Inspection

Use Prisma Studio to inspect database records:
```bash
npx prisma studio
```

Navigate to:
- `ContactSubmission` - View submitted contact forms
- `BlogPost` - View blog posts
- `Page` - View pages
- `SiteSetting` - View site settings

---

## Support

For API questions or issues:
- Check the [Developer Guide](./DEVELOPER_GUIDE.md)
- Review the [Contributing Guide](./CONTRIBUTING.md)
- Contact the development team

---

**Last Updated**: January 2026
