# Deployment Guide

This guide covers deploying the DEBREDAMO HOTEL application to production environments.

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Environment Variables](#environment-variables)
3. [Database Setup](#database-setup)
4. [Deployment Platforms](#deployment-platforms)
5. [Post-Deployment](#post-deployment)
6. [Monitoring and Maintenance](#monitoring-and-maintenance)
7. [Troubleshooting](#troubleshooting)

---

## Pre-Deployment Checklist

Before deploying to production, ensure:

- [ ] All features are tested and working locally
- [ ] Build completes successfully (`npm run build`)
- [ ] No TypeScript errors
- [ ] No ESLint warnings/errors (`npm run lint`)
- [ ] Environment variables are documented
- [ ] Database migrations are tested
- [ ] Email configuration is verified
- [ ] Images are optimized
- [ ] Performance has been tested
- [ ] Security best practices followed
- [ ] Backup strategy in place

---

## Environment Variables

### Required Variables

```env
# Database (Required)
DATABASE_URL="postgresql://user:password@host:5432/database"

# Optional but Recommended
DATABASE_URL_POOLED="postgresql://user:password@host:5432/database?pgbouncer=true"
RESEND_API_KEY="re_xxxxxxxxxxxx"
ADMIN_EMAIL="admin@debredamohotel.com"

# Next.js (Auto-configured on most platforms)
NODE_ENV="production"
```

### Security Considerations

1. **Never commit `.env` files** to version control
2. **Use different credentials** for production
3. **Rotate credentials** regularly (see [SECURITY.md](./SECURITY.md))
4. **Use secret management** tools provided by hosting platform
5. **Validate required variables** on startup

---

## Database Setup

### Using Neon (Recommended)

1. **Create Neon Project**
   - Visit [neon.tech](https://neon.tech)
   - Create new project
   - Select region closest to your users
   - Note the connection string

2. **Configure Connection Pooling**
   - Enable connection pooling in Neon dashboard
   - Get pooled connection string
   - Set as `DATABASE_URL_POOLED`

3. **Run Migrations**
   ```bash
   # Set DATABASE_URL environment variable
   export DATABASE_URL="your-neon-connection-string"

   # Apply migrations
   npx prisma migrate deploy

   # Seed database
   npx prisma db seed
   ```

4. **Verify Connection**
   ```bash
   tsx scripts/check-db.ts
   ```

### Using Other PostgreSQL Providers

The application works with any PostgreSQL provider:

- **Supabase**: Use connection string from project settings
- **Railway**: Create PostgreSQL service, use provided URL
- **Render**: Create PostgreSQL database, use internal URL
- **AWS RDS**: Create PostgreSQL instance, configure security groups
- **Google Cloud SQL**: Create PostgreSQL instance, configure connections

**Connection String Format**:
```
postgresql://username:password@host:port/database?options
```

---

## Deployment Platforms

### Vercel (Recommended)

Vercel is the recommended platform for Next.js applications.

#### Initial Setup

1. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/yourusername/debredamo-hotel.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure project

3. **Configure Build Settings**
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

4. **Set Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add all required variables:
     ```
     DATABASE_URL
     DATABASE_URL_POOLED
     RESEND_API_KEY
     ADMIN_EMAIL
     ```

5. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically

#### Automatic Deployments

Vercel automatically deploys on:
- **Production**: Pushes to `main` branch
- **Preview**: Pull requests and other branches

#### Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. Wait for SSL certificate provisioning

#### Environment-Specific Variables

- **Production**: Used for `main` branch
- **Preview**: Used for pull requests
- **Development**: Used for local `vercel dev`

---

### Netlify

#### Setup

1. **Create `netlify.toml`**
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

2. **Connect Repository**
   - Visit [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Select your repository

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`

4. **Set Environment Variables**
   - Go to Site Settings → Build & deploy → Environment
   - Add all required variables

5. **Deploy**
   - Netlify will build and deploy automatically

---

### Railway

#### Setup

1. **Create New Project**
   - Visit [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"

2. **Add PostgreSQL Service**
   - Click "New" → "Database" → "PostgreSQL"
   - Railway will provision a database
   - Connection URL available in variables

3. **Configure Environment Variables**
   - Click your service → Variables
   - Add required variables:
     ```
     DATABASE_URL=${{Postgres.DATABASE_URL}}
     RESEND_API_KEY=your_key
     ADMIN_EMAIL=admin@debredamohotel.com
     ```

4. **Configure Build**
   - Build Command: `npm run build`
   - Start Command: `npm run start`

5. **Deploy**
   - Push to GitHub triggers automatic deployment

---

### Render

#### Setup

1. **Create Web Service**
   - Visit [render.com](https://render.com)
   - Click "New" → "Web Service"
   - Connect your repository

2. **Configure Service**
   - **Name**: debredamo-hotel
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`

3. **Create PostgreSQL Database**
   - Click "New" → "PostgreSQL"
   - Note the Internal Database URL

4. **Set Environment Variables**
   - In your web service settings
   - Add environment variables:
     ```
     DATABASE_URL=your_internal_database_url
     RESEND_API_KEY=your_key
     ADMIN_EMAIL=admin@debredamohotel.com
     ```

5. **Deploy**
   - Click "Create Web Service"
   - Render builds and deploys automatically

---

### Self-Hosted (Docker)

#### Create Dockerfile

```dockerfile
# Dockerfile
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED 1

# Generate Prisma Client
RUN npx prisma generate

# Build application
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

#### Create docker-compose.yml

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - RESEND_API_KEY=${RESEND_API_KEY}
      - ADMIN_EMAIL=${ADMIN_EMAIL}
    depends_on:
      - postgres

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=debredamo
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

#### Deploy

```bash
# Build and run
docker-compose up -d

# Run migrations
docker-compose exec app npx prisma migrate deploy

# Seed database
docker-compose exec app npx prisma db seed
```

---

## Post-Deployment

### Verify Deployment

1. **Check Build Logs**
   - Review build logs for errors
   - Ensure all migrations ran successfully

2. **Test Core Features**
   - [ ] Homepage loads correctly
   - [ ] Room pages display properly
   - [ ] Navigation works
   - [ ] Contact form submits successfully
   - [ ] Blog posts load
   - [ ] Images display correctly
   - [ ] Booking mailto links work
   - [ ] Both languages (en/am) work

3. **Performance Testing**
   - Run Lighthouse audit
   - Check Core Web Vitals
   - Test on slow connections
   - Verify image optimization

4. **Security Check**
   - SSL certificate is active (HTTPS)
   - Environment variables are secure
   - No sensitive data exposed
   - Headers are configured correctly

### Database Verification

```bash
# Connect to production database
DATABASE_URL="your-production-url" npx prisma studio

# Or via script
DATABASE_URL="your-production-url" tsx scripts/check-db.ts
```

### Email Verification

Test email functionality:
```bash
RESEND_API_KEY="your-key" ADMIN_EMAIL="admin@debredamohotel.com" tsx scripts/test-email.ts
```

Or submit the contact form on the live site.

---

## Monitoring and Maintenance

### Application Monitoring

#### Vercel Analytics (if using Vercel)

1. Enable in Project Settings → Analytics
2. Monitor:
   - Page views
   - Unique visitors
   - Top pages
   - Geographic distribution

#### Error Tracking

Consider adding error tracking:

**Sentry** (Recommended):
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

Configure in `next.config.ts`:
```typescript
const { withSentryConfig } = require('@sentry/nextjs')

module.exports = withSentryConfig(
  {
    // Your Next.js config
  },
  {
    // Sentry config
    silent: true,
    org: 'your-org',
    project: 'debredamo-hotel'
  }
)
```

### Database Monitoring

#### Monitor Connection Pool

If using Neon or another pooled connection:
- Monitor active connections
- Check for connection leaks
- Review slow queries

#### Backups

**Neon**: Automatic backups included

**Self-hosted**: Set up automated backups:
```bash
# Backup script
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql

# Automate with cron
0 2 * * * pg_dump $DATABASE_URL > /backups/db-$(date +\%Y\%m\%d).sql
```

### Log Monitoring

**Vercel**: View logs in dashboard under Deployments → Your deployment → Logs

**Other platforms**: Configure log aggregation (e.g., Papertrail, Logtail)

### Performance Monitoring

Monitor:
- **Response times**: API and page load times
- **Database query performance**: Slow queries
- **CDN performance**: Image and asset delivery
- **Error rates**: 4xx and 5xx errors

---

## Troubleshooting

### Build Failures

#### "Prisma Client not generated"

**Solution**:
```bash
npx prisma generate
npm run build
```

Ensure `postinstall` script in `package.json`:
```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

#### TypeScript Errors

**Solution**:
- Check `tsconfig.json` is correct
- Run `npm run build` locally first
- Fix all type errors before deploying

#### Out of Memory

**Solution**:
- Increase build memory (Vercel/Netlify settings)
- Optimize dependencies
- Use `npm ci` instead of `npm install`

### Runtime Errors

#### Database Connection Failed

**Check**:
1. `DATABASE_URL` is set correctly
2. Database is accessible from deployment platform
3. Connection string includes all required parameters
4. Firewall/security groups allow connections

**Solution**:
```bash
# Test connection
tsx scripts/check-db.ts
```

#### 500 Internal Server Error

**Check**:
1. Server logs for error details
2. Environment variables are set
3. Database migrations are applied
4. Prisma Client is generated

#### Email Not Sending

**Check**:
1. `RESEND_API_KEY` is set
2. API key is valid
3. `ADMIN_EMAIL` is set
4. Check Resend dashboard for errors

**Test**:
```bash
tsx scripts/test-email.ts
```

### Performance Issues

#### Slow Page Loads

**Solutions**:
- Enable caching headers
- Optimize images
- Use CDN for static assets
- Enable compression (gzip/brotli)

#### Database Slow Queries

**Solutions**:
- Add database indexes
- Optimize Prisma queries
- Use connection pooling
- Review N+1 query issues

---

## Rollback Procedure

If deployment has critical issues:

### Vercel

1. Go to Deployments
2. Find previous working deployment
3. Click "Promote to Production"

### Other Platforms

1. **Git revert**:
   ```bash
   git revert HEAD
   git push origin main
   ```

2. **Or redeploy previous commit**:
   ```bash
   git reset --hard <previous-commit-hash>
   git push --force origin main
   ```

### Database Rollback

If migration causes issues:

```bash
# Rollback last migration
npx prisma migrate resolve --rolled-back <migration-name>

# Apply previous schema
npx prisma db push
```

---

## Updates and Upgrades

### Regular Updates

**Dependencies**:
```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Test after updates
npm run build
npm run dev
```

**Next.js**:
```bash
npm install next@latest react@latest react-dom@latest
```

**Prisma**:
```bash
npm install @prisma/client@latest
npm install -D prisma@latest
npx prisma generate
```

### Deployment Strategy

1. **Test updates locally**
2. **Create new branch** for updates
3. **Deploy to preview** (if supported)
4. **Test preview deployment**
5. **Merge to production** if all tests pass

---

## Production Optimization

### Image Optimization

**Next.js Image Optimization**:
- Automatic with Next.js Image component
- Served via CDN on Vercel
- Consider using external image CDN (Cloudinary, imgix) for large image libraries

### Caching Strategy

**Static Pages**:
```typescript
export const revalidate = 3600 // Revalidate every hour
```

**API Routes**:
```typescript
export async function GET() {
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200'
    }
  })
}
```

### Security Headers

Add to `next.config.ts`:
```typescript
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
]

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}
```

---

## Support and Resources

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment)
- [Neon Documentation](https://neon.tech/docs)

For project-specific questions, consult:
- [Developer Guide](./DEVELOPER_GUIDE.md)
- [Security Guide](./SECURITY.md)
- [API Documentation](./API.md)

---

**Last Updated**: January 2026
