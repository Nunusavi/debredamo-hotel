import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

// Room data (migrating from config/site.ts)
const rooms = [
  {
    id: "1",
    name: "Standard Room",
    nameAm: "መደበኛ ክፍል",
    slug: "standard-room",
    description:
      "Our Standard Rooms offer comfort and convenience for the modern traveler. Each room features a comfortable queen-size bed, modern amenities, and a cozy atmosphere perfect for both business and leisure stays. The room is designed with warm tones and elegant furnishings to create a welcoming environment. Large windows provide natural light and views of the city. The private bathroom includes a rainfall shower and complimentary premium toiletries.",
    descriptionAm:
      "መደበኛ ክፍሎቻችን ለዘመናዊው ተጓዥ ምቾትና ቀላልነት ይሰጣሉ። እያንዳንዱ ክፍል ምቹ የንግስት መጠን አልጋ፣ ዘመናዊ መገልገያዎች፣ እና ለንግድም ሆነ ለመዝናኛ ቆይታ ፍጹም የሆነ ምቹ ሁኔታ አለው።",
    roomType: "standard",
    sizeM2: 28,
    maxGuests: 2,
    basePriceEtb: 2500,
    images: [
      {
        url: "/images/rooms/standard-1.jpg",
        alt: "Standard room with queen bed",
      },
      { url: "/images/rooms/standard-2.jpg", alt: "Standard room bathroom" },
      { url: "/images/rooms/standard-3.jpg", alt: "Standard room workspace" },
    ],
    amenities: [
      "Free WiFi",
      "Air Conditioning",
      "Flat-screen TV",
      "Mini Fridge",
      "Safe",
      "Work Desk",
      "Private Bathroom",
      "Complimentary Toiletries",
      "Daily Housekeeping",
      "24/7 Room Service",
    ],
    isActive: true,
    displayOrder: 1,
  },
  {
    id: "2",
    name: "Deluxe Room",
    nameAm: "ልዩ ክፍል",
    slug: "deluxe-room",
    description:
      "Experience enhanced comfort in our Deluxe Rooms. Spacious and elegantly designed, these rooms feature premium bedding, a sitting area, and upgraded amenities for a luxurious stay. Perfect for guests who appreciate refined comfort and style. The room includes a separate seating area, ideal for relaxation or informal meetings. Floor-to-ceiling windows offer stunning city views. The spacious bathroom features a deep soaking tub and separate rain shower.",
    descriptionAm:
      "ልዩ ክፍሎቻችን ውስጥ የተሻሻለ ምቾት ይለማመዱ። ሰፊና በውበት የተቀየሰ፣ እነዚህ ክፍሎች ከፍተኛ የአልጋ ዝግጅት፣ መቀመጫ ቦታ፣ እና ለቅንጦት ቆይታ የተሻሻሉ መገልገያዎች አሏቸው።",
    roomType: "deluxe",
    sizeM2: 35,
    maxGuests: 2,
    basePriceEtb: 3500,
    images: [
      { url: "/images/rooms/deluxe-1.jpg", alt: "Deluxe room with king bed" },
      { url: "/images/rooms/deluxe-2.jpg", alt: "Deluxe room sitting area" },
      {
        url: "/images/rooms/deluxe-3.jpg",
        alt: "Deluxe room bathroom with bathtub",
      },
    ],
    amenities: [
      "Free WiFi",
      "Air Conditioning",
      "55-inch Smart TV",
      "Mini Bar",
      "Safe",
      "Work Desk",
      "Sitting Area",
      "Bathtub",
      "Premium Toiletries",
      "Bathrobes & Slippers",
      "Nespresso Machine",
      "Daily Housekeeping",
      "24/7 Room Service",
      "City View",
    ],
    isActive: true,
    displayOrder: 2,
  },
  {
    id: "3",
    name: "Executive Suite",
    nameAm: "ስራ አስፈፃሚ ስዊት",
    slug: "executive-suite",
    description:
      "Our Executive Suites combine elegance with functionality. Perfect for business travelers, these suites feature a separate living area, executive workspace, and premium amenities. The spacious layout includes a dedicated work area with ergonomic seating and high-speed connectivity. The living room is ideal for private meetings or relaxation. Enjoy access to our executive lounge with complimentary refreshments. The luxurious bathroom features a jacuzzi tub and premium bath products.",
    descriptionAm:
      "ስራ አስፈፃሚ ስዊቶቻችን ውበትን ከተግባራዊነት ጋር ያዋህዳሉ። ለንግድ ተጓዦች ፍጹም፣ እነዚህ ስዊቶች የተለየ የመኖሪያ ቦታ፣ የስራ አስፈፃሚ የስራ ቦታ እና ከፍተኛ መገልገያዎች አሏቸው።",
    roomType: "executive",
    sizeM2: 45,
    maxGuests: 3,
    basePriceEtb: 5000,
    images: [
      {
        url: "/images/rooms/executive-1.jpg",
        alt: "Executive suite living area",
      },
      { url: "/images/rooms/executive-2.jpg", alt: "Executive suite bedroom" },
      {
        url: "/images/rooms/executive-3.jpg",
        alt: "Executive suite workspace",
      },
      { url: "/images/rooms/executive-4.jpg", alt: "Executive suite bathroom" },
    ],
    amenities: [
      "Free WiFi",
      "Air Conditioning",
      "65-inch Smart TV",
      "Full Mini Bar",
      "Safe",
      "Executive Desk",
      "Separate Living Room",
      "Dining Table",
      "Jacuzzi",
      "Premium Toiletries",
      "Bathrobes & Slippers",
      "Nespresso Machine",
      "Complimentary Breakfast",
      "Daily Housekeeping",
      "24/7 Room Service",
      "City View",
      "Balcony",
    ],
    isActive: true,
    displayOrder: 3,
  },
  {
    id: "4",
    name: "Presidential Suite",
    nameAm: "የፕሬዚዳንት ስዊት",
    slug: "presidential-suite",
    description:
      "The ultimate in luxury and space. Our Presidential Suite offers unparalleled comfort with a master bedroom, spacious living area, dining room, and premium amenities throughout. This exceptional suite spans 80 square meters and features two bedrooms, a formal dining area that seats six, and a fully equipped kitchen. The master bedroom includes a king-size bed and luxurious en-suite bathroom with dual vanities, jacuzzi, and steam shower. Enjoy personalized butler service and exclusive access to our VIP lounge. Perfect for extended stays or entertaining guests in style.",
    descriptionAm:
      "በቅንጦትና በቦታ ውስጥ የመጨረሻው። የእኛ የፕሬዚዳንት ስዊት ዋና መኝታ ቤት፣ ሰፊ የመኖሪያ ቦታ፣ የመመገቢያ ክፍል እና በሙሉ ከፍተኛ መገልገያዎች ያለው ተመጣጣኝ ምቾት ይሰጣል።",
    roomType: "presidential",
    sizeM2: 80,
    maxGuests: 4,
    basePriceEtb: 8500,
    images: [
      {
        url: "/images/rooms/presidential-1.jpg",
        alt: "Presidential suite entrance",
      },
      {
        url: "/images/rooms/presidential-2.jpg",
        alt: "Presidential suite living room",
      },
      {
        url: "/images/rooms/presidential-3.jpg",
        alt: "Presidential suite master bedroom",
      },
      {
        url: "/images/rooms/presidential-4.jpg",
        alt: "Presidential suite dining area",
      },
      {
        url: "/images/rooms/presidential-5.jpg",
        alt: "Presidential suite bathroom",
      },
    ],
    amenities: [
      "Free WiFi",
      "Air Conditioning",
      "Multiple Smart TVs",
      "Full Bar",
      "Safe",
      "Executive Office",
      "Separate Living Room",
      "Formal Dining Area",
      "Master Bedroom",
      "Guest Bedroom",
      "Kitchen",
      "Jacuzzi & Steam Shower",
      "Premium Toiletries",
      "Bathrobes & Slippers",
      "Nespresso & Tea Station",
      "Complimentary Breakfast",
      "Butler Service",
      "Daily Housekeeping",
      "24/7 Room Service",
      "Panoramic City View",
      "Large Balcony",
      "Priority Check-in/out",
    ],
    isActive: true,
    displayOrder: 4,
  },
];

async function main() {
  console.log("🌱 Starting database seed...\n");

  // Clear existing data (development only!)
  console.log("🗑️  Clearing existing data...");
  await prisma.reservationRequest.deleteMany();
  await prisma.availability.deleteMany();
  await prisma.room.deleteMany();
  console.log("✅ Cleared existing data\n");

  // Seed rooms
  console.log("🏨 Seeding rooms...");
  for (const room of rooms) {
    await prisma.room.create({
      data: {
        id: room.id,
        slug: room.slug,
        name: room.name,
        nameAm: room.nameAm,
        description: room.description,
        descriptionAm: room.descriptionAm,
        roomType: room.roomType as
          | "standard"
          | "deluxe"
          | "executive"
          | "presidential",
        sizeM2: room.sizeM2,
        maxGuests: room.maxGuests,
        basePriceEtb: room.basePriceEtb,
        images: room.images,
        amenities: room.amenities,
        isActive: room.isActive,
        displayOrder: room.displayOrder,
      },
    });
    console.log(`  ✓ Created room: ${room.name}`);
  }
  console.log(`✅ Seeded ${rooms.length} rooms\n`);

  // Seed initial availability (90 days ahead, 1 room of each type per day)
  console.log("📅 Seeding availability (90 days)...");
  const startDate = new Date();
  let availabilityCount = 0;

  for (let i = 0; i < 90; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    for (const room of rooms) {
      await prisma.availability.create({
        data: {
          roomId: room.id,
          date,
          availableCount: 1, // 1 of each room type
          minStayNights: 1,
        },
      });
      availabilityCount++;
    }
  }
  console.log(`✅ Seeded ${availabilityCount} availability records\n`);

  console.log("🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error during seed:");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
