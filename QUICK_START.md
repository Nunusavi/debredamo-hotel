# Quick Start Guide - Next Session

## 🚦 Start Here

### 1. Install Packages (5 minutes)

When you have stable internet, run these commands:

```bash
# Core dependencies
npm install @supabase/supabase-js @supabase/ssr resend

# Form and validation
npm install react-hook-form @hookform/resolvers zod

# UI and animations
npm install framer-motion lucide-react

# Date handling
npm install date-fns react-day-picker

# Utilities
npm install clsx tailwind-merge
```

### 2. Setup shadcn/ui (3 minutes)

```bash
# Initialize
npx shadcn-ui@latest init

# When prompted:
# - TypeScript: Yes
# - Style: Default
# - Base color: Slate
# - CSS variables: Yes

# Add components
npx shadcn-ui@latest add button card input label form select textarea calendar dialog dropdown-menu tabs accordion badge separator
```

### 3. Setup Supabase (10 minutes)

1. Go to https://supabase.com
2. Sign up / Log in
3. Click "New Project"
4. Fill in:
   - Name: debredamo-hotel
   - Database Password: (save this!)
   - Region: Choose closest to Ethiopia
5. Wait for project to be created
6. Go to Project Settings → API
7. Copy:
   - Project URL → `.env.local` as `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` `public` key → `.env.local` as `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` `secret` key → `.env.local` as `SUPABASE_SERVICE_ROLE_KEY`
8. Go to SQL Editor
9. Copy entire contents of `supabase/migrations/001_initial_schema.sql`
10. Paste in SQL Editor and click "Run"
11. (Optional) Run `supabase/seed.sql` for sample data

### 4. Setup Resend (5 minutes)

1. Go to https://resend.com
2. Sign up with your email
3. Verify your email
4. Go to API Keys
5. Click "Create API Key"
6. Name it "Debredamo Hotel"
7. Copy the key
8. Add to `.env.local` as `RESEND_API_KEY`

For testing, you can use their test domain. For production:
- Go to Domains
- Click "Add Domain"
- Follow verification instructions
- Update `RESERVATION_EMAIL` in `.env.local`

### 5. Test the Setup (2 minutes)

```bash
# Start dev server
npm run dev

# Open browser to http://localhost:3000
# You should see the default Next.js page with no errors
```

---

## 📝 Next: Build First Components

After setup is complete, start building in this order:

### Session 1: Layout Components (2-3 hours)
1. Header component
2. Navigation component
3. Mobile menu
4. Footer component

Files to create:
- `components/layout/header.tsx`
- `components/layout/navigation.tsx`
- `components/layout/mobile-menu.tsx`
- `components/layout/footer.tsx`

### Session 2: Homepage (3-4 hours)
1. Hero section
2. Quick reservation form
3. Featured rooms section
4. Services overview
5. Location section

Files to create:
- `app/(marketing)/page.tsx` (homepage)
- `components/shared/hero-section.tsx`
- `components/shared/quick-booking-form.tsx`
- Various other components

---

## 🔍 Verify Everything Works

### Checklist:
- [ ] `npm run dev` starts without errors
- [ ] No TypeScript errors in terminal
- [ ] No import errors
- [ ] Can open http://localhost:3000
- [ ] Fonts load correctly (check browser DevTools)
- [ ] TailwindCSS classes work (inspect elements)

### If you see errors:

**"Cannot find module 'clsx'"**
→ Run: `npm install clsx tailwind-merge`

**"Cannot find module 'zod'"**
→ Run: `npm install zod`

**"Cannot find module '@supabase/supabase-js'"**
→ Run: `npm install @supabase/supabase-js @supabase/ssr`

**TailwindCSS not working**
→ Restart dev server: `Ctrl+C` then `npm run dev`

---

## 📚 Helpful Commands

```bash
# Install single package
npm install <package-name>

# Check if packages are installed
npm list --depth=0

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check TypeScript
npx tsc --noEmit

# Format code (if prettier is set up)
npx prettier --write .
```

---

## 🎯 Goal for Today

**Minimum:** Get all packages installed and services configured
**Good:** Also set up shadcn/ui
**Great:** Start building layout components

---

## 📞 Quick Reference

### Project Structure
```
debredamo-hotel/
├── app/                  # Pages
├── components/           # Components
│   ├── ui/              # shadcn components
│   ├── layout/          # Header, footer, nav
│   └── shared/          # Reusable components
├── lib/                 # Utilities
├── types/               # TypeScript types
├── config/              # Config files
└── supabase/           # Database files
```

### Important Files
- `.env.local` - Your credentials (never commit!)
- `app/globals.css` - Theme
- `app/layout.tsx` - Root layout
- `lib/utils.ts` - Helper functions
- `config/site.ts` - Site settings

### Color Palette
- Gold: `#B8860B` or `bg-gold-500`
- Navy: `#1A2332` or `bg-navy-500`
- Background: `#FAF9F6` or `bg-warm-white`

### Fonts
- Headings: `font-serif` (Playfair Display)
- Body: `font-sans` (Inter)
- Amharic: `font-ethiopic` (Noto Sans Ethiopic)

---

Good luck! Everything is ready to go. Just need to install packages and set up external services! 🚀
