# ⚡ Quick Setup - Get Reservations Working

Follow these steps to get your reservation system working with Neon + Resend.

---

## 🚀 Fast Track (30 minutes total)

### Step 1: Set Up Neon Database (15 min)

1. **Create account:** https://console.neon.tech
2. **Create project:** Name it `debredamo-hotel`
3. **Copy connection string** from dashboard
4. **Update `.env.local`:**
   ```bash
   DATABASE_URL=postgresql://your-connection-string-here
   ```
5. **Run migration:**
   - Open Neon SQL Editor
   - Copy all content from: `lib/db/migrations/001_initial_schema.sql`
   - Paste and click "Run"

### Step 2: Verify Resend Email (5 min)

Your Resend API key is already configured. Just verify:

```bash
# Check .env.local has:
RESEND_API_KEY=re_ZyavaLZq_13Fke4Muse6AqtP4um1tBcTK  # ✅ Already set
ADMIN_EMAIL=admin@debredamohotel.com                 # ✅ Already set
RESERVATION_EMAIL=reservations@debredamohotel.com     # ✅ Already set
```

### Step 3: Test Everything (10 min)

```bash
# Start the server
npm run dev

# Open browser
http://localhost:3000

# Test reservation
1. Click "Book Now"
2. Fill in the form
3. Use YOUR email address
4. Submit reservation
5. Check your email inbox!
```

---

## ✅ What's Already Done

- ✅ All packages installed
- ✅ Resend API key configured
- ✅ Email templates created
- ✅ Database schema designed
- ✅ API endpoints ready
- ✅ Reservation flow complete

## ⏳ What You Need To Do

1. Get Neon connection string
2. Add to .env.local
3. Run SQL migration
4. Test!

---

## 📝 Quick Commands

```bash
# Start development
npm run dev

# Test email (optional)
npx tsx scripts/test-email.ts

# View logs
# Terminal will show all activity
```

---

## 🎯 Success Checklist

After setup, you should be able to:

- [ ] Visit http://localhost:3000
- [ ] Complete a test reservation
- [ ] Receive confirmation email
- [ ] See reservation in Neon database

---

## 📚 Detailed Guides

Need more details? See:
- **NEON_SETUP_GUIDE.md** - Step-by-step with screenshots
- **WORK_LOG.md** - All changes made to the project

---

## 🐛 Common Issues

**"DATABASE_URL is not set"**
→ Check .env.local has DATABASE_URL
→ Restart server: Ctrl+C then npm run dev

**"Failed to create reservation"**
→ Did you run the migration in Neon SQL Editor?
→ Check Neon dashboard shows "Active" connection

**No email received**
→ Check spam folder
→ Verify RESEND_API_KEY is correct
→ Go to Resend dashboard → Logs

---

That's it! You're ready to accept reservations. 🎉
