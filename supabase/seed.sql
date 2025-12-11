-- Seed Data for Debredamo Hotel
-- This file contains sample data for development and testing

-- =============================================
-- SEED ROOMS
-- =============================================

INSERT INTO rooms (name, name_am, slug, description, description_am, room_type, size_sqm, max_guests, base_price_etb, images, amenities, is_active, display_order) VALUES

-- Standard Rooms
('Standard Room', 'መደበኛ ክፍል', 'standard-room',
'Our Standard Rooms offer comfort and convenience for the modern traveler. Each room features a comfortable queen-size bed, modern amenities, and a cozy atmosphere perfect for both business and leisure stays.',
'መደበኛ ክፍሎቻችን ለዘመናዊው ተጓዥ ምቾትና ቀላልነት ይሰጣሉ። እያንዳንዱ ክፍል ምቹ የንግስት መጠን አልጋ፣ ዘመናዊ መገልገያዎች፣ እና ለንግድም ሆነ ለመዝናኛ ቆይታ ፍጹም የሆነ ምቹ ሁኔታ አለው።',
'standard', 28, 2, 2500.00,
'[{"url": "/images/rooms/standard-1.jpg", "alt": "Standard room with queen bed"}, {"url": "/images/rooms/standard-2.jpg", "alt": "Standard room bathroom"}]'::jsonb,
'["Free WiFi", "Air Conditioning", "Flat-screen TV", "Mini Fridge", "Safe", "Work Desk", "Private Bathroom", "Complimentary Toiletries", "Daily Housekeeping", "24/7 Room Service"]'::jsonb,
true, 1),

-- Deluxe Rooms
('Deluxe Room', 'ልዩ ክፍል', 'deluxe-room',
'Experience enhanced comfort in our Deluxe Rooms. Spacious and elegantly designed, these rooms feature premium bedding, a sitting area, and upgraded amenities for a luxurious stay.',
'ልዩ ክፍሎቻችን ውስጥ የተሻሻለ ምቾት ይለማመዱ። ሰፊና በውበት የተቀየሰ፣ እነዚህ ክፍሎች ከፍተኛ የአልጋ ዝግጅት፣ መቀመጫ ቦታ፣ እና ለቅንጦት ቆይታ የተሻሻሉ መገልገያዎች አሏቸው።',
'deluxe', 35, 2, 3500.00,
'[{"url": "/images/rooms/deluxe-1.jpg", "alt": "Deluxe room with king bed"}, {"url": "/images/rooms/deluxe-2.jpg", "alt": "Deluxe room sitting area"}, {"url": "/images/rooms/deluxe-3.jpg", "alt": "Deluxe room bathroom with bathtub"}]'::jsonb,
'["Free WiFi", "Air Conditioning", "55-inch Smart TV", "Mini Bar", "Safe", "Work Desk", "Sitting Area", "Bathtub", "Premium Toiletries", "Bathrobes & Slippers", "Nespresso Machine", "Daily Housekeeping", "24/7 Room Service", "City View"]'::jsonb,
true, 2),

-- Executive Suite
('Executive Suite', 'ስራ አስፈፃሚ ስዊት', 'executive-suite',
'Our Executive Suites combine elegance with functionality. Perfect for business travelers, these suites feature a separate living area, executive workspace, and premium amenities.',
'ስራ አስፈፃሚ ስዊቶቻችን ውበትን ከተግባራዊነት ጋር ያዋህዳሉ። ለንግድ ተጓዦች ፍጹም፣ እነዚህ ስዊቶች የተለየ የመኖሪያ ቦታ፣ የስራ አስፈፃሚ የስራ ቦታ እና ከፍተኛ መገልገያዎች አሏቸው።',
'executive', 45, 3, 5000.00,
'[{"url": "/images/rooms/executive-1.jpg", "alt": "Executive suite living area"}, {"url": "/images/rooms/executive-2.jpg", "alt": "Executive suite bedroom"}, {"url": "/images/rooms/executive-3.jpg", "alt": "Executive suite workspace"}, {"url": "/images/rooms/executive-4.jpg", "alt": "Executive suite bathroom"}]'::jsonb,
'["Free WiFi", "Air Conditioning", "65-inch Smart TV", "Full Mini Bar", "Safe", "Executive Desk", "Separate Living Room", "Dining Table", "Jacuzzi", "Premium Toiletries", "Bathrobes & Slippers", "Nespresso Machine", "Complimentary Breakfast", "Daily Housekeeping", "24/7 Room Service", "City View", "Balcony"]'::jsonb,
true, 3),

-- Presidential Suite
('Presidential Suite', 'የፕሬዚዳንት ስዊት', 'presidential-suite',
'The ultimate in luxury and space. Our Presidential Suite offers unparalleled comfort with a master bedroom, spacious living area, dining room, and premium amenities throughout.',
'በቅንጦትና በቦታ ውስጥ የመጨረሻው። የእኛ የፕሬዚዳንት ስዊት ዋና መኝታ ቤት፣ ሰፊ የመኖሪያ ቦታ፣ የመመገቢያ ክፍል እና በሙሉ ከፍተኛ መገልገያዎች ያለው ተመጣጣኝ ምቾት ይሰጣል።',
'presidential', 80, 4, 8500.00,
'[{"url": "/images/rooms/presidential-1.jpg", "alt": "Presidential suite entrance"}, {"url": "/images/rooms/presidential-2.jpg", "alt": "Presidential suite living room"}, {"url": "/images/rooms/presidential-3.jpg", "alt": "Presidential suite master bedroom"}, {"url": "/images/rooms/presidential-4.jpg", "alt": "Presidential suite dining area"}, {"url": "/images/rooms/presidential-5.jpg", "alt": "Presidential suite bathroom"}]'::jsonb,
'["Free WiFi", "Air Conditioning", "Multiple Smart TVs", "Full Bar", "Safe", "Executive Office", "Separate Living Room", "Formal Dining Area", "Master Bedroom", "Guest Bedroom", "Kitchen", "Jacuzzi & Steam Shower", "Premium Toiletries", "Bathrobes & Slippers", "Nespresso & Tea Station", "Complimentary Breakfast", "Butler Service", "Daily Housekeeping", "24/7 Room Service", "Panoramic City View", "Large Balcony", "Priority Check-in/out"]'::jsonb,
true, 4);

-- =============================================
-- SEED BLOG POSTS
-- =============================================

INSERT INTO blog_posts (slug, title, title_am, excerpt, content, featured_image, author, category, tags, is_published, published_at) VALUES

('exploring-addis-ababa-top-attractions',
'Exploring Addis Ababa: Top Attractions Near Our Hotel',
'አዲስ አበባን ማሰስ፡ ከሆቴላችን አቅራቢያ ያሉ ዋና መስህቦች',
'Discover the vibrant culture and rich history of Addis Ababa with our guide to must-visit attractions within easy reach of Debredamo Hotel.',
'# Exploring Addis Ababa: Top Attractions Near Our Hotel

Addis Ababa, the capital of Ethiopia, is a city rich in history, culture, and vibrant energy. Located in the heart of the city, Debredamo Hotel offers convenient access to many of the city''s top attractions.

## National Museum of Ethiopia

Just 2 kilometers from our hotel, the National Museum houses the famous fossil "Lucy" and offers fascinating insights into Ethiopia''s prehistoric past.

**Distance:** 2 km | **Time:** 10 minutes by car

## Holy Trinity Cathedral

This beautiful cathedral is the final resting place of Emperor Haile Selassie and showcases stunning Ethiopian Orthodox architecture.

**Distance:** 1.5 km | **Time:** 7 minutes by car

## Merkato

Experience one of Africa''s largest open-air markets. From traditional crafts to spices and textiles, Merkato is a sensory adventure.

**Distance:** 3 km | **Time:** 15 minutes by car

## Ethnological Museum

Located in Haile Selassie''s former palace, this museum provides excellent insight into Ethiopian culture and traditions.

**Distance:** 2.5 km | **Time:** 12 minutes by car

Our concierge team is always available to arrange transportation and provide recommendations for your Addis Ababa adventure. Contact us to plan your perfect day of exploration!',
'/images/blog/addis-attractions.jpg',
'Debredamo Hotel Team',
'Travel Guide',
'["Addis Ababa", "Attractions", "Travel Tips", "Culture", "Ethiopia"]'::jsonb,
true,
NOW() - INTERVAL '5 days'),

('ethiopian-coffee-ceremony-experience',
'The Ethiopian Coffee Ceremony: A Cultural Experience',
'የኢትዮጵያ ቡና ስነ ስርዓት፡ የባህል ተሞክሮ',
'Learn about Ethiopia''s ancient coffee ceremony tradition and experience it at our hotel''s restaurant.',
'# The Ethiopian Coffee Ceremony: A Cultural Experience

Ethiopia is the birthplace of coffee, and the traditional coffee ceremony is an integral part of Ethiopian culture. At Debredamo Hotel, we invite you to experience this beautiful tradition.

## What is the Coffee Ceremony?

The Ethiopian coffee ceremony is a ritualized form of making and drinking coffee. It''s a social event, typically lasting 2-3 hours, where coffee is ceremoniously prepared, served, and enjoyed.

## The Process

### 1. Roasting
Fresh coffee beans are roasted in a pan over an open flame. The aromatic smoke is wafted around for guests to enjoy.

### 2. Grinding
The roasted beans are ground by hand using a mortar and pestle called a "mukecha."

### 3. Brewing
The ground coffee is brewed in a traditional clay pot called a "jebena."

### 4. Serving
The coffee is served in small cups without handles, often accompanied by popcorn or traditional bread.

## Experience it at Debredamo

Our restaurant offers authentic Ethiopian coffee ceremonies daily. Reserve your experience at our front desk.

**Available:** Daily 3:00 PM - 6:00 PM
**Duration:** 1 hour
**Cost:** Complimentary for hotel guests

Immerse yourself in this cherished Ethiopian tradition during your stay with us!',
'/images/blog/coffee-ceremony.jpg',
'Chef Bekele',
'Culture & Tradition',
'["Coffee", "Ethiopian Culture", "Tradition", "Hotel Experience"]'::jsonb,
true,
NOW() - INTERVAL '10 days');

-- =============================================
-- SEED PAGES
-- =============================================

INSERT INTO pages (slug, title, title_am, content, hero_image, meta_title, meta_description, is_published) VALUES

('about',
'About Debredamo Hotel',
'ስለ ደብረዳሞ ሆቴል',
'{"sections": [{"type": "hero", "content": "Welcome to Debredamo Hotel"}, {"type": "story", "heading": "Our Story", "content": "Debredamo Hotel has been a landmark of hospitality in Addis Ababa since our founding. Located in the heart of the city, we combine Ethiopian warmth with modern luxury."}]}'::jsonb,
'/images/hero/hotel-exterior.jpg',
'About Us - Debredamo Hotel | Luxury Accommodation in Addis Ababa',
'Learn about Debredamo Hotel, a premier luxury hotel in the heart of Addis Ababa, Ethiopia. Discover our story, values, and commitment to exceptional hospitality.',
true);

-- Note: Additional seed data can be added as needed during development
