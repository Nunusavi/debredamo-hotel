# DEBREDAMO HOTEL

A modern, bilingual hotel website built with Next.js 16, React 19, TypeScript, and PostgreSQL.

## Features

- **Modern Tech Stack**: Next.js 16 with App Router, React 19, TypeScript, Tailwind CSS 4
- **Bilingual Support**: Full English and Amharic language support
- **Email-Based Booking System**: Mailto links with pre-filled booking templates
- **Content Management**: Dynamic blog posts and pages managed through Prisma ORM
- **Contact Form**: Email notifications via Resend API
- **Image Optimization**: Next.js Image component with Sharp
- **Database**: PostgreSQL via Neon with Prisma ORM
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Performance**: Optimized with Turbopack and Next.js 16 features

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (recommended: Neon)
- Email API key (optional, for contact form notifications)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd debredamo-hotel
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your credentials:
   ```env
   DATABASE_URL="postgresql://user:password@host/database"
   DATABASE_URL_POOLED="postgresql://user:password@host/database?pgbouncer=true"
   RESEND_API_KEY="your-resend-api-key"
   ADMIN_EMAIL="admin@debredamohotel.com"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma migrate deploy
   npx prisma db seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

   Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
debredamo-hotel/
├── app/                    # Next.js App Router pages
│   ├── (marketing)/       # Public-facing pages
│   └── api/               # API routes
├── components/            # React components
│   ├── layout/           # Header, Footer, Navigation
│   ├── rooms/            # Room-related components
│   ├── shared/           # Reusable components
│   └── ui/               # shadcn/ui components
├── config/               # Configuration files
├── content/              # Static content
├── lib/                  # Utility functions and helpers
│   ├── db/              # Database client
│   ├── data.ts          # Static data helpers
│   ├── email.ts         # Email templates
│   └── mailto.ts        # Mailto URL generators
├── prisma/              # Database schema and migrations
├── public/              # Static assets
├── scripts/             # Utility scripts
└── types/               # TypeScript type definitions
```

## Available Scripts

### Development
- `npm run dev` - Start development server with Turbopack
- `npm run dev:webpack` - Start development server with Webpack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Database
- `npx prisma generate` - Generate Prisma Client
- `npx prisma migrate dev --name <name>` - Create migration
- `npx prisma migrate deploy` - Apply migrations
- `npx prisma db seed` - Seed database
- `npx prisma studio` - Open Prisma Studio GUI
- `tsx scripts/check-db.ts` - Test database connection

### Testing
- `tsx scripts/test-email.ts` - Test email configuration

## Documentation

- [Developer Guide](./DEVELOPER_GUIDE.md) - Comprehensive development guide
- [Contributing](./CONTRIBUTING.md) - How to contribute to this project
- [API Documentation](./API.md) - API endpoints and usage
- [Security](./SECURITY.md) - Security policies and credential management
- [Claude Code Instructions](./CLAUDE.md) - Instructions for Claude Code CLI

## Tech Stack

### Core
- **Framework**: Next.js 16.0.10 (App Router, Turbopack)
- **React**: 19.2.0
- **TypeScript**: 5.x
- **Node.js**: 18+ required

### Database & ORM
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma 7.1.0
- **Connection**: Neon serverless adapter

### Styling
- **CSS Framework**: Tailwind CSS 4
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion, tw-animate-css
- **Icons**: Lucide React

### Forms & Validation
- **Form Management**: React Hook Form
- **Validation**: Zod 4.x
- **Resolvers**: @hookform/resolvers

### Email
- **Provider**: Resend API
- **Booking**: Mailto links with templates

### Utilities
- **Date Handling**: date-fns 4.x
- **Styling Utils**: clsx, tailwind-merge, class-variance-authority
- **Notifications**: Sonner (toast notifications)

## Environment Variables

See `.env.example` for all available environment variables.

**Required:**
- `DATABASE_URL` - PostgreSQL connection string

**Optional:**
- `DATABASE_URL_POOLED` - Pooled connection for serverless
- `RESEND_API_KEY` - Email sending (contact form)
- `ADMIN_EMAIL` - Admin email for notifications

## Deployment

### Build the application
```bash
npm run build
```

### Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Other platforms
The application can be deployed to any platform that supports Next.js 16:
- Netlify
- AWS Amplify
- Railway
- Render
- Self-hosted with Docker

## License

Private - All rights reserved

## Support

For issues and feature requests, please contact the development team.
