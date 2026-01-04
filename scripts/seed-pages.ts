import 'dotenv/config';
import { prisma } from '../lib/db/prisma';

async function main() {
  console.log('🌱 Seeding pages...');

  // About Page
  const aboutPage = await prisma.page.upsert({
    where: { slug: 'about' },
    update: {},
    create: {
      slug: 'about',
      title: 'About Us',
      titleAm: 'ስለ እኛ',
      metaTitle: 'About Debredamo Hotel | Our Story',
      metaDescription: 'Learn about Debredamo Hotel, our history, values, and commitment to exceptional hospitality in Addis Ababa.',
      isPublished: true,
      content: {
        sections: [
          {
            id: 'section-1',
            type: 'text',
            title: 'Welcome to Debredamo Hotel',
            titleAm: 'ወደ ደብረዳሞ ሆቴል እንኳን በደህና መጡ',
            content: 'Located in the heart of Addis Ababa, Debredamo Hotel offers a perfect blend of comfort, elegance, and Ethiopian hospitality. Our hotel is designed to provide guests with an unforgettable experience, whether you\'re here for business or leisure.',
            contentAm: 'በአዲስ አበባ መሃል የሚገኘው ደብረዳሞ ሆቴል ምቾት፣ የውበት እና የኢትዮጵያ እንግዳ መቀበልን ጥምረት ይሰጣል። ሆቴላችን እንግዶች በንግድ ሥራ ወይም በመዝናኛ ሲመጡ የማይረሱ ልምድ እንዲኖራቸው የተነደፈ ነው።'
          },
          {
            id: 'section-2',
            type: 'text',
            title: 'Our Mission',
            titleAm: 'ተልዕኮአችን',
            content: 'To provide exceptional hospitality services that exceed our guests\' expectations through attention to detail, personalized service, and authentic Ethiopian warmth.',
            contentAm: 'በዝርዝር ትኩረት፣ በግል አገልግሎት እና በትክክለኛ የኢትዮጵያ ሙቀት የእንግዶቻችንን የሚጠበቁትን የሚበልጡ ልዩ የእንግዳ መስተንግዶ አገልግሎቶችን መስጠት።'
          },
          {
            id: 'section-3',
            type: 'features',
            title: 'Why Choose Us',
            titleAm: 'ለምን እኛን መምረጥ አለብዎት',
            items: [
              {
                title: 'Prime Location',
                titleAm: 'ዋና ቦታ',
                description: 'Conveniently located in the heart of Addis Ababa',
                descriptionAm: 'በአዲስ አበባ መሃል በምቹ ሁኔታ የሚገኝ'
              },
              {
                title: 'Luxury Rooms',
                titleAm: 'ቅንጦተኛ ክፍሎች',
                description: 'Elegantly designed rooms with modern amenities',
                descriptionAm: 'በዘመናዊ መገልገያዎች በሚያምር ሁኔታ የተዘጋጁ ክፍሎች'
              },
              {
                title: '24/7 Service',
                titleAm: '24/7 አገልግሎት',
                description: 'Round-the-clock assistance for all your needs',
                descriptionAm: 'ለሁሉም ፍላጎቶችዎ በሁሉም ጊዜ እገዛ'
              }
            ]
          }
        ]
      },
    },
  });

  console.log('✅ Created/Updated About page:', aboutPage.slug);

  // Services Page
  const servicesPage = await prisma.page.upsert({
    where: { slug: 'services' },
    update: {},
    create: {
      slug: 'services',
      title: 'Our Services',
      titleAm: 'አገልግሎቶቻችን',
      metaTitle: 'Hotel Services | Debredamo Hotel Addis Ababa',
      metaDescription: 'Explore our comprehensive hotel services including restaurant, bar, conference facilities, and more.',
      isPublished: true,
      content: {
        sections: [
          {
            id: 'section-1',
            type: 'text',
            title: 'Premium Services for Your Comfort',
            titleAm: 'ለእርስዎ ምቾት የሚውሉ ፕሪሚየም አገልግሎቶች',
            content: 'At Debredamo Hotel, we offer a wide range of services designed to make your stay comfortable and memorable. From fine dining to business facilities, we have everything you need.',
            contentAm: 'በደብረዳሞ ሆቴል ቆይታዎን ምቹ እና የማይረሳ ለማድረግ የተቀመጡ ብዙ አገልግሎቶችን እንሰጣለን። ከጥሩ መመገቢያ እስከ የንግድ መገልገያዎች ሁሉም የሚያስፈልግዎ ነገር አለን።'
          },
          {
            id: 'section-2',
            type: 'features',
            title: 'Our Facilities',
            titleAm: 'መገልገያዎቻችን',
            items: [
              {
                title: 'Restaurant & Bar',
                titleAm: 'ሬስቶራንት እና ባር',
                description: 'Enjoy delicious Ethiopian and international cuisine',
                descriptionAm: 'ጣፋጭ የኢትዮጵያ እና ዓለም አቀፍ ምግቦችን ይምቱ'
              },
              {
                title: 'Conference Rooms',
                titleAm: 'የስብሰባ ክፍሎች',
                description: 'Modern meeting spaces for business events',
                descriptionAm: 'ለንግድ ዝግጅቶች ዘመናዊ የስብሰባ ቦታዎች'
              },
              {
                title: 'Free WiFi',
                titleAm: 'ነጻ ዋይፋይ',
                description: 'High-speed internet throughout the hotel',
                descriptionAm: 'በሆቴሉ ሁሉ የፍጥነት በይነመረብ'
              },
              {
                title: '24/7 Room Service',
                titleAm: '24/7 የክፍል አገልግሎት',
                description: 'Round-the-clock service for your convenience',
                descriptionAm: 'ለእርስዎ ምቾት በሁሉም ጊዜ አገልግሎት'
              }
            ]
          }
        ]
      },
    },
  });

  console.log('✅ Created/Updated Services page:', servicesPage.slug);

  console.log('\n🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding pages:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
