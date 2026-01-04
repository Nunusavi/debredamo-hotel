import 'dotenv/config';
import { prisma } from '../lib/db/prisma';

async function main() {
  console.log('🔍 Verifying rooms in database...\n');

  const rooms = await prisma.room.findMany({
    orderBy: { displayOrder: 'asc' },
  });

  console.log(`📊 Total rooms in database: ${rooms.length}\n`);

  rooms.forEach((room, index) => {
    console.log(`${index + 1}. ${room.name}`);
    console.log(`   - Slug: ${room.slug}`);
    console.log(`   - Type: ${room.roomType}`);
    console.log(`   - Max Guests: ${room.maxGuests}`);
    console.log(`   - Price: ${room.basePriceEtb} ETB`);
    console.log(`   - Images: ${Array.isArray(room.images) ? room.images.length : 0}`);
    console.log(`   - Active: ${room.isActive}`);
    console.log('');
  });

  console.log('✅ Verification complete!');
}

main()
  .catch((e) => {
    console.error('❌ Verification failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
