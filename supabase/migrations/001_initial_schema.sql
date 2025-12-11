-- Debredamo Hotel Database Schema
-- Version: 1.0
-- Created: 2025-12-08

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- ROOMS TABLE
-- =============================================
CREATE TABLE rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  name_am TEXT,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  description_am TEXT,
  room_type TEXT NOT NULL CHECK (room_type IN ('standard', 'deluxe', 'executive', 'presidential')),
  size_sqm INTEGER,
  max_guests INTEGER NOT NULL,
  base_price_etb DECIMAL(10,2) NOT NULL,
  images JSONB DEFAULT '[]'::jsonb,
  amenities JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for rooms table
CREATE INDEX idx_rooms_slug ON rooms(slug);
CREATE INDEX idx_rooms_active ON rooms(is_active);
CREATE INDEX idx_rooms_type ON rooms(room_type);
CREATE INDEX idx_rooms_display_order ON rooms(display_order);

-- =============================================
-- AVAILABILITY TABLE
-- =============================================
CREATE TABLE availability (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  available_count INTEGER NOT NULL DEFAULT 0,
  price_override_etb DECIMAL(10,2),
  min_stay_nights INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(room_id, date)
);

-- Indexes for availability table
CREATE INDEX idx_availability_date ON availability(date);
CREATE INDEX idx_availability_room_date ON availability(room_id, date);

-- =============================================
-- RESERVATION REQUESTS TABLE
-- =============================================
CREATE TABLE reservation_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_number TEXT UNIQUE NOT NULL,
  room_id UUID REFERENCES rooms(id),
  room_name TEXT NOT NULL,
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  num_guests INTEGER NOT NULL,
  num_nights INTEGER NOT NULL,
  estimated_price_etb DECIMAL(10,2),
  special_requests TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'confirmed', 'declined', 'cancelled')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for reservation_requests table
CREATE INDEX idx_reservation_requests_dates ON reservation_requests(check_in, check_out);
CREATE INDEX idx_reservation_requests_status ON reservation_requests(status);
CREATE INDEX idx_reservation_requests_email ON reservation_requests(guest_email);
CREATE INDEX idx_reservation_requests_created ON reservation_requests(created_at DESC);
CREATE INDEX idx_reservation_requests_number ON reservation_requests(request_number);

-- =============================================
-- PAGES TABLE
-- =============================================
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  title_am TEXT,
  content JSONB,
  hero_image TEXT,
  meta_title TEXT,
  meta_description TEXT,
  og_image TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for pages table
CREATE INDEX idx_pages_slug ON pages(slug);
CREATE INDEX idx_pages_published ON pages(is_published);

-- =============================================
-- BLOG POSTS TABLE
-- =============================================
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  title_am TEXT,
  excerpt TEXT,
  content TEXT,
  featured_image TEXT,
  author TEXT,
  category TEXT,
  tags JSONB DEFAULT '[]'::jsonb,
  meta_title TEXT,
  meta_description TEXT,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for blog_posts table
CREATE INDEX idx_blog_published ON blog_posts(is_published, published_at DESC);
CREATE INDEX idx_blog_category ON blog_posts(category);
CREATE INDEX idx_blog_slug ON blog_posts(slug);

-- =============================================
-- SITE SETTINGS TABLE
-- =============================================
CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed initial site settings
INSERT INTO site_settings (key, value, description) VALUES
  ('site_name', '{"en": "Debredamo Hotel", "am": "ደብረዳሞ ሆቴል"}'::jsonb, 'Hotel name'),
  ('contact_email', '"reservations@debredamohotel.com"'::jsonb, 'Contact email'),
  ('contact_phone', '"+251-11-123-4567"'::jsonb, 'Contact phone'),
  ('address', '{"street": "123 Main Street", "city": "Addis Ababa", "country": "Ethiopia"}'::jsonb, 'Physical address'),
  ('social_media', '{"facebook": "", "instagram": "", "twitter": "", "whatsapp": "+251911123456"}'::jsonb, 'Social media links'),
  ('business_hours', '{"weekday": "24/7", "weekend": "24/7"}'::jsonb, 'Business hours');

-- =============================================
-- CONTACT SUBMISSIONS TABLE
-- =============================================
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for contact_submissions table
CREATE INDEX idx_contact_status ON contact_submissions(status);
CREATE INDEX idx_contact_created ON contact_submissions(created_at DESC);

-- =============================================
-- TRIGGERS FOR UPDATED_AT
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to tables
CREATE TRIGGER update_rooms_updated_at BEFORE UPDATE ON rooms
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reservation_requests_updated_at BEFORE UPDATE ON reservation_requests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS on all tables
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Public read access for active rooms
CREATE POLICY "Public can view active rooms"
  ON rooms FOR SELECT
  USING (is_active = true);

-- Public read access for availability
CREATE POLICY "Public can view availability"
  ON availability FOR SELECT
  USING (true);

-- Public can insert reservation requests
CREATE POLICY "Public can create reservation requests"
  ON reservation_requests FOR INSERT
  WITH CHECK (true);

-- Public read access for published pages
CREATE POLICY "Public can view published pages"
  ON pages FOR SELECT
  USING (is_published = true);

-- Public read access for published blog posts
CREATE POLICY "Public can view published blog posts"
  ON blog_posts FOR SELECT
  USING (is_published = true);

-- Public read access for site settings
CREATE POLICY "Public can view site settings"
  ON site_settings FOR SELECT
  USING (true);

-- Public can insert contact submissions
CREATE POLICY "Public can create contact submissions"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

-- Note: Admin policies will be added after auth is set up

-- =============================================
-- COMMENTS
-- =============================================

COMMENT ON TABLE rooms IS 'Hotel room types and configurations';
COMMENT ON TABLE availability IS 'Room availability and pricing by date';
COMMENT ON TABLE reservation_requests IS 'Guest reservation requests (not confirmed bookings)';
COMMENT ON TABLE pages IS 'CMS pages (About, Services, etc.)';
COMMENT ON TABLE blog_posts IS 'Blog articles and posts';
COMMENT ON TABLE site_settings IS 'Site-wide configuration settings';
COMMENT ON TABLE contact_submissions IS 'Contact form submissions';
