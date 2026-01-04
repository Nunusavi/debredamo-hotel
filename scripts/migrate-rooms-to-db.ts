import 'dotenv/config';
import { readFileSync } from 'fs';
import { join } from 'path';
import { prisma } from '../lib/db/prisma';

async function main() {
  console.log('🚀 Starting rooms migration from JSON to database...\n');

  // Read rooms from JSON file
  const filePath = join(process.cwd(), 'content', 'rooms.json');
  const content = readFileSync(filePath, 'utf-8');
  const data = JSON.parse(content);

  console.log(`📦 Found ${data.rooms.length} rooms in JSON file\n`);

  // Clear existing rooms in database (optional - comment out if you want to keep existing)
  console.log('🗑️  Clearing existing rooms...');
  await prisma.room.deleteMany({});
  console.log('✅ Cleared\n');

  // Insert each room
  let successCount = 0;
  let errorCount = 0;

  for (const room of data.rooms) {
    try {
      await prisma.room.create({
        data: {
          id: room.id,
          slug: room.slug,
          name: room.name,
          nameAm: room.name_am || null,
          description: room.description || null,
          descriptionAm: room.description_am || null,
          roomType: room.room_type,
          sizeM2: room.size_m2 || null,
          maxGuests: room.max_guests,
          basePriceEtb: room.base_price_etb,
          images: room.images || [],
          amenities: room.amenities || [],
          isActive: room.is_active ?? true,
          displayOrder: room.display_order || 0,
        },
      });

      console.log(`✅ Migrated: ${room.name}`);
      successCount++;
    } catch (error: any) {
      console.error(`❌ Failed to migrate ${room.name}:`, error.message);
      errorCount++;
    }
  }

  console.log(`\n📊 Migration Summary:`);
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Failed: ${errorCount}`);
  console.log(`   📦 Total: ${data.rooms.length}\n`);

  console.log('🎉 Migration completed!');
}

main()
  .catch((e) => {
    console.error('\n❌ Migration failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
