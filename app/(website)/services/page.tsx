"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/shared/page-header";
import { PageSection } from "@/components/shared/page-section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import {
  Utensils,
  Wine,
  Dumbbell,
  Sparkles,
  Presentation,
  ChefHat,
  Coffee,
  Clock,
  Users,
  Wifi,
  Car,
  Shirt,
  ShowerHead,
  Plane,
  Award,
  Heart,
  Trophy,
  Droplets,
  Wind,
  Mic,
  CalendarDays,
  UtensilsCrossed,
  PartyPopper,
  Cake,
  ArrowRight,
  Check,
} from "lucide-react";
import { generateGenericReservationEmail } from "@/lib/mailto";

interface ServiceFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  image: string;
  description: string;
  longDescription: string;
  features: ServiceFeature[];
  highlights: string[];
}

interface AmenityItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const services: ServiceItem[] = [
  {
    id: "restaurant",
    title: "Fine Dining Restaurant",
    subtitle: "Culinary Excellence",
    icon: Utensils,
    image: "/images/Resturant/612A0493.JPG",
    description:
      "Indulge in a gastronomic journey at our award-winning restaurant, where traditional Ethiopian flavors meet international culinary artistry.",
    longDescription:
      "Our executive chefs curate an exquisite dining experience featuring authentic Ethiopian cuisine and international dishes. Using locally-sourced ingredients and time-honored recipes, every meal becomes a celebration of flavor and culture. From the aromatic spices of doro wat to contemporary fusion creations, our menu caters to discerning palates.",
    features: [
      {
        icon: Coffee,
        title: "Breakfast Buffet",
        description: "Continental and Ethiopian breakfast, Daily 6:00 AM - 10:30 AM",
      },
      {
        icon: UtensilsCrossed,
        title: "Lunch and Dinner buffets",
        description: "Lunch & Dinner service, 12:00 PM - 10:00 PM",
      },
      {
        icon: Clock,
        title: "24/7 Room Service",
        description: "Gourmet meals delivered to your room anytime",
      },
      {
        icon: Award,
        title: "Expert Chefs",
        description: "Award-winning culinary team with international experience",
      },
    ],
    highlights: [
      "Traditional Ethiopian injera and wot dishes",
      "International cuisine from Italian to Asian fusion",
      "Vegetarian and vegan options available",
      "Wine pairing recommendations",
      "Private dining rooms for special occasions",
      "Halal and kosher meals upon request",
    ],
  },
  {
    id: "bar",
    title: "Premium Bar & Lounge",
    subtitle: "Sophisticated Ambiance",
    icon: Wine,
    image: "/images/Bar_5.JPG",
    description:
      "Relax and socialize in our elegant bar featuring premium spirits, craft cocktails, and an extensive wine collection in a refined atmosphere.",
    longDescription:
      "Our sophisticated lounge offers the perfect setting for business meetings or evening relaxation. Expert mixologists craft signature cocktails while our sommeliers guide you through an impressive selection of local and international wines. Live music performances on weekends create an unforgettable ambiance.",
    features: [
      {
        icon: Wine,
        title: "Premium Spirits",
        description: "Curated selection of whiskeys, cognacs, and fine liquors",
      },
      {
        icon: Sparkles,
        title: "Craft Cocktails",
        description: "Signature drinks and classic favorites expertly mixed",
      },
      {
        icon: Users,
        title: "Social Space",
        description: "Comfortable seating for groups and intimate gatherings",
      },
      {
        icon: Award,
        title: "Live Entertainment",
        description: "Weekend performances featuring local and international artists",
      },
    ],
    highlights: [
      "Over 100 premium wines from around the world",
      "Signature Ethiopian coffee cocktails",
      "Tapas and light bites menu",
      "Happy hour specials daily 5-7 PM",
      "Private bar area for events",
      "Expert sommelier recommendations",
    ],
  },
  {
    id: "fitness",
    title: "State-of-the-Art Fitness Center",
    subtitle: "Wellness & Vitality",
    icon: Dumbbell,
    image: "/images/Gym and spa/612A0711.JPG",
    description:
      "Maintain your fitness routine with our fully-equipped gym featuring the latest cardio and strength training equipment, available 24/7.",
    longDescription:
      "Our modern fitness center is designed for guests who prioritize wellness. Featuring top-of-the-line equipment from leading brands, climate-controlled environment, and motivating ambiance, your workout experience matches international standards. Personal training sessions can be arranged upon request.",
    features: [
      {
        icon: Dumbbell,
        title: "Modern Equipment",
        description: "Treadmills, ellipticals, bikes, rowing machines, and more",
      },
      {
        icon: Trophy,
        title: "Strength Training",
        description: "Free weights, resistance machines, and functional training area",
      },
      {
        icon: Heart,
        title: "Yoga & Stretching",
        description: "Dedicated space with mats and accessories",
      },
      {
        icon: Clock,
        title: "24/7 Access",
        description: "Work out on your schedule, any time day or night",
      },
    ],
    highlights: [
      "Air-conditioned training environment",
      "Personal training available by appointment",
      "Complimentary towels and water",
      "Separate changing rooms with lockers",
      "Fitness assessment consultations",
      "Virtual training classes available",
    ],
  },
  {
    id: "spa",
    title: "Luxury Spa & Wellness Center",
    subtitle: "Rejuvenation & Relaxation",
    icon: Sparkles,
    image: "/images/Gym and spa/IMG_7096.JPG",
    description:
      "Escape to tranquility at our luxurious spa offering traditional Ethiopian treatments, therapeutic massages, and holistic wellness experiences.",
    longDescription:
      "Our spa sanctuary combines ancient Ethiopian wellness traditions with modern therapeutic techniques. Expert therapists provide personalized treatments designed to restore balance, relieve stress, and rejuvenate your body and mind. Every treatment uses premium natural products and essential oils.",
    features: [
      {
        icon: Sparkles,
        title: "Massage Therapies",
        description: "Traditional Ethiopian, Swedish, deep tissue, and aromatherapy",
      },
      {
        icon: Droplets,
        title: "Facial Treatments",
        description: "Professional skincare using organic Ethiopian ingredients",
      },
      {
        icon: Wind,
        title: "Sauna & Steam",
        description: "Authentic Finnish sauna and herbal steam room",
      },
      {
        icon: Heart,
        title: "Wellness Packages",
        description: "Full-day spa experiences and couple treatments",
      },
    ],
    highlights: [
      "Traditional Ethiopian coffee body scrub",
      "Hot stone massage therapy",
      "Manicure and pedicure services",
      "Meditation and relaxation room",
      "Customized treatment packages",
      "Private treatment rooms available",
    ],
  },
  {
    id: "conference",
    title: "Conference & Event Venues",
    subtitle: "Professional Excellence",
    icon: Presentation,
    image: "/images/Bussines/612A7409.JPG",
    description:
      "Host successful corporate events, conferences, and celebrations in our versatile venues equipped with cutting-edge technology and professional support.",
    longDescription:
      "From boardroom meetings to grand galas, our flexible event spaces accommodate gatherings of any size. Each venue features state-of-the-art audio-visual equipment, high-speed internet, and customizable layouts. Our dedicated events team ensures flawless execution from planning to completion.",
    features: [
      {
        icon: Presentation,
        title: "Multiple Venues",
        description: "Conference rooms, boardrooms, and grand ballroom",
      },
      {
        icon: Users,
        title: "Flexible Capacity",
        description: "Intimate meetings of 10 to grand events of 300+ guests",
      },
      {
        icon: Mic,
        title: "AV Technology",
        description: "HD projectors, sound systems, video conferencing, lighting",
      },
      {
        icon: CalendarDays,
        title: "Event Coordination",
        description: "Professional planning team and on-site support",
      },
    ],
    highlights: [
      "High-speed fiber internet throughout",
      "Customizable room configurations",
      "Professional catering services",
      "Technical support staff on-site",
      "Breakout rooms for workshops",
      "Complimentary parking for attendees",
    ],
  },
  {
    id: "catering",
    title: "Premium Catering Services",
    subtitle: "Culinary Events",
    icon: ChefHat,
    image: "/images/Resturant/612A0600.JPG",
    description:
      "Elevate your special occasions with our bespoke catering services, offering customized menus and impeccable service for any event.",
    longDescription:
      "Our catering division brings the same culinary excellence of our restaurant to your special events. Whether it is a corporate luncheon, wedding reception, or private celebration, our chefs create customized menus that reflect your preferences and cultural traditions. Full-service includes setup, service staff, and cleanup.",
    features: [
      {
        icon: PartyPopper,
        title: "Event Catering",
        description: "Weddings, birthdays, corporate events, and celebrations",
      },
      {
        icon: Users,
        title: "Flexible Menus",
        description: "Ethiopian, international, fusion, and custom cuisines",
      },
      {
        icon: Cake,
        title: "Special Occasions",
        description: "Wedding cakes, dessert bars, and themed presentations",
      },
      {
        icon: UtensilsCrossed,
        title: "Full Service",
        description: "Professional waitstaff, bartenders, and event coordination",
      },
    ],
    highlights: [
      "Customized menu planning consultations",
      "Dietary accommodations (vegan, gluten-free, halal)",
      "Elegant presentation and plating",
      "Beverage packages and bar service",
      "Rental equipment coordination",
      "Tasting sessions for large events",
    ],
  },
];

const amenities: AmenityItem[] = [
  {
    icon: Car,
    title: "Airport Transfer",
    description: "Complimentary shuttle to Bole International Airport",
  },
  {
    icon: Shirt,
    title: "Laundry Service",
    description: "Same-day service and dry cleaning available",
  },
  {
    icon: ShowerHead,
    title: "Daily Housekeeping",
    description: "Professional room cleaning twice daily",
  },
  {
    icon: Plane,
    title: "Concierge Service",
    description: "Local tours, reservations, and travel assistance",
  },
  {
    icon: Wifi,
    title: "Free High-Speed WiFi",
    description: "Complimentary fiber internet throughout property",
  },
  {
    icon: Clock,
    title: "24/7 Reception",
    description: "Round-the-clock front desk and guest services",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        subtitle="World-Class Amenities"
        title="Premium Services & Facilities"
        description="A redesigned service experience built for every screen size, with clear details and effortless navigation."
      />

      <section className="bg-white">
        <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 md:mb-14"
          >
            <p className="text-green-600 font-medium text-center mb-3">
              Explore Our Signature Experiences
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {services.map((service) => (
                <a
                  key={service.id}
                  href={`#${service.id}`}
                  className="rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-800 hover:bg-green-100 transition-colors"
                >
                  {service.title}
                </a>
              ))}
            </div>
          </motion.div>

          <div className="space-y-10 md:space-y-14">
            {services.map((service, index) => (
              <ServiceShowcase key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      <PageSection background="warm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-green-600 font-medium mb-2">Always Included</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Essential Guest Amenities
          </h2>
          <p className="text-gray-600 mx-auto ">
            The details that make every stay smooth, comfortable, and worry-free.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
          {amenities.map((amenity, index) => {
            const AmenityIcon = amenity.icon;
            return (
              <motion.div
                key={amenity.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <Card className="h-full p-5 border-green-100 hover:border-green-200 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-green-100 p-3 shrink-0">
                      <AmenityIcon className="w-5 h-5 text-green-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{amenity.title}</h3>
                      <p className="text-sm text-gray-600">{amenity.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </PageSection>

      <PageSection>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-green-900 to-green-800 rounded-2xl p-8 md:p-12 text-white text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Ready to Experience DEBREDAMO HOTEL?
            </h2>
            <p className="text-lg text-gray-200 mb-8 mx-auto ">
              Book your stay and enjoy our full collection of premium services, dining,
              wellness, and event support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={generateGenericReservationEmail()}>
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
                >
                  Reserve Your Stay
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </a>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-black hover:bg-white/10 w-full sm:w-auto"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </PageSection>
    </>
  );
}

function ServiceShowcase({
  service,
  index,
}: {
  service: ServiceItem;
  index: number;
}) {
  const ServiceIcon = service.icon;
  const imageOrderClass = index % 2 === 0 ? "md:order-1" : "md:order-2";
  const contentOrderClass = index % 2 === 0 ? "md:order-2" : "md:order-1";

  return (
    <motion.article
      id={service.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="scroll-mt-24 rounded-3xl border border-green-100 bg-white shadow-sm overflow-hidden"
    >
      <div className="grid md:grid-cols-2">
        <div className={`relative min-h-[280px] md:min-h-[420px] ${imageOrderClass}`}>
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <p className="text-sm font-medium text-green-300 mb-1">{service.subtitle}</p>
            <h3 className="font-serif text-2xl lg:text-3xl font-bold">{service.title}</h3>
          </div>
        </div>

        <div className={`p-6 md:p-8 lg:p-10 ${contentOrderClass}`}>
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-100 mb-4">
            <ServiceIcon className="w-6 h-6 text-green-700" />
          </div>
          <p className="text-gray-700 mb-4">{service.description}</p>
          <p className="text-gray-600 leading-relaxed mb-6">{service.longDescription}</p>

          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {service.features.map((feature) => {
              const FeatureIcon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-xl border border-gray-100 bg-gray-50 p-3"
                >
                  <FeatureIcon className="w-5 h-5 text-green-700 mb-2" />
                  <p className="font-medium text-gray-900 text-sm">{feature.title}</p>
                  <p className="text-xs text-gray-600 mt-1">{feature.description}</p>
                </div>
              );
            })}
          </div>

          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 mb-6">
            {service.highlights.map((highlight) => (
              <div key={highlight} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-700 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-700">{highlight}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/contact">
              <Button className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
                Speak With Our Team
              </Button>
            </Link>
            <a href={generateGenericReservationEmail()}>
              <Button
                variant="outline"
                className="border-green-600 text-green-700 hover:bg-green-50 w-full sm:w-auto"
              >
                Send Booking Inquiry
              </Button>
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
