"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { PageHeader } from "@/components/shared/page-header";
import { PageSection } from "@/components/shared/page-section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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

const services = [
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
        title: "À la Carte Dining",
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
    image: "/images/Bar_1.jpg",
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
        description: "Full-day spa experiences and couple's treatments",
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
      "Our catering division brings the same culinary excellence of our restaurant to your special events. Whether it's a corporate luncheon, wedding reception, or private celebration, our chefs create customized menus that reflect your preferences and cultural traditions. Full-service includes setup, service staff, and cleanup.",
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

const amenities = [
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
  const [activeService, setActiveService] = useState(0);
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = serviceRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveService(index);
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer, index) => {
        if (observer && serviceRefs.current[index]) {
          observer.unobserve(serviceRefs.current[index]!);
        }
      });
    };
  }, []);

  return (
    <>
      <PageHeader
        subtitle="World-Class Amenities"
        title="Premium Services & Facilities"
        description="Experience luxury hospitality with our comprehensive range of services designed for your comfort and convenience"
      />

      {/* Split Screen Services Section */}
      <section className="relative bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Sticky Image Side */}
            <div className="lg:sticky lg:top-24 h-fit">
              <motion.div
                className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                {services.map((service, index) => (
                  <motion.div
                    key={service.id}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: activeService === index ? 1 : 0,
                      scale: activeService === index ? 1 : 1.1,
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8 text-white">
                      <motion.p
                        className="text-sm font-medium text-gold-400 mb-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {service.subtitle}
                      </motion.p>
                      <motion.h3
                        className="font-serif text-3xl font-bold"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        {service.title}
                      </motion.h3>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Scrollable Content Side */}
            <div className="space-y-16">
              {services.map((service, index) => {
                const ServiceIcon = service.icon;
                return (
                  <ServiceSection
                    key={service.id}
                    ref={(el: HTMLDivElement | null) => (serviceRefs.current[index] = el)}
                    service={service}
                    icon={ServiceIcon}
                    index={index}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Essential Amenities Grid */}
      <PageSection background="warm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-gold-600 font-medium mb-2">Additional Services</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Essential Guest Amenities
          </h2>
          <p className="text-gray-600 mx-auto">
            Thoughtful services and facilities designed for your comfort and
            convenience throughout your stay
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map((amenity, index) => {
            const AmenityIcon = amenity.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <Card className="p-6 text-center h-full hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-gold-200">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <AmenityIcon className="w-12 h-12 text-gold-600 mx-auto mb-4" />
                  </motion.div>
                  <h4 className="font-semibold text-lg text-gray-900 mb-2">
                    {amenity.title}
                  </h4>
                  <p className="text-sm text-gray-600">{amenity.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </PageSection>

      {/* CTA Section */}
      <PageSection>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-green-900 to-green-800 rounded-2xl p-8 md:p-12 text-white text-center relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <motion.h2
              className="font-serif text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Experience Luxury & Comfort
            </motion.h2>
            <motion.p
              className="text-lg text-gray-300 mb-8 mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Book your stay at DEBREDAMO HOTEL and enjoy access to all our
              world-class facilities and premium services
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <motion.a
                href={generateGenericReservationEmail()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-gold-600 hover:bg-gold-700 text-white w-full sm:w-auto group"
                >
                  Reserve Your Stay
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.a>
              <Link href="/contact">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-black hover:bg-white/10 w-full sm:w-auto"
                  >
                    Contact Us
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </PageSection>
    </>
  );
}

// Service Section Component
const ServiceSection = ({
  service,
  icon: Icon,
  index,
  ref,
}: {
  service: (typeof services)[0];
  icon: any;
  index: number;
  ref: any;
}) => {
  const sectionRef = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="scroll-mt-24"
    >
      <div className="mb-6">
        <motion.div
          className="inline-flex items-center justify-center w-14 h-14 bg-gold-100 rounded-xl mb-4"
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
        >
          <Icon className="w-7 h-7 text-gold-600" />
        </motion.div>
        <p className="text-sm font-medium text-gold-600 mb-2">
          {service.subtitle}
        </p>
        <h3 className="font-serif text-3xl font-bold text-gray-900 mb-4">
          {service.title}
        </h3>
        <p className="text-lg text-gray-700 mb-4">{service.description}</p>
        <p className="text-gray-600 leading-relaxed">{service.longDescription}</p>
      </div>

      {/* Features Grid */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {service.features.map((feature, idx) => {
          const FeatureIcon = feature.icon;
          return (
            <motion.div
              key={idx}
              className="bg-gray-50 p-4 rounded-lg group hover:bg-gold-50 transition-colors duration-300"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ x: 4 }}
            >
              <FeatureIcon className="w-6 h-6 text-gold-600 mb-2 group-hover:scale-110 transition-transform" />
              <p className="font-medium text-gray-900 mb-1">{feature.title}</p>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Highlights List */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">Key Highlights:</h4>
        <div className="grid sm:grid-cols-2 gap-2">
          {service.highlights.map((highlight, idx) => (
            <motion.div
              key={idx}
              className="flex items-start gap-2"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
              <span className="text-sm text-gray-700">{highlight}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <Link href="/contact">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button className="bg-green-600 hover:bg-green-700 group">
            Learn More
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </Link>

      {/* Divider */}
      {index < services.length - 1 && (
        <div className="mt-16 pt-16 border-t border-gray-200" />
      )}
    </motion.div>
  );
};
