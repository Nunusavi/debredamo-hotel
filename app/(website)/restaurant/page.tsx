"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/shared/page-header";
import { PageSection } from "@/components/shared/page-section";
import { Button } from "@/components/ui/button";
import {
  Utensils,
  Coffee,
  Clock,
  Award,
  UtensilsCrossed,
  Check,
  ArrowRight,
} from "lucide-react";

const restaurantData = {
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
};

export default function RestaurantPage() {
  return (
    <>
      <PageHeader
        subtitle={restaurantData.subtitle}
        title={restaurantData.title}
        description={restaurantData.description}
        backgroundImage={restaurantData.image}
      />

      <PageSection>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src={restaurantData.image}
                alt={restaurantData.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 rounded-xl mb-4">
                  <Utensils className="w-7 h-7 text-green-600" />
                </div>
                <h2 className="font-serif text-3xl font-bold text-gray-900 mb-4">
                  A Taste of Excellence
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {restaurantData.longDescription}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {restaurantData.features.map((feature, idx) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <motion.div
                      key={idx}
                      className="bg-gray-50 p-4 rounded-lg hover:bg-green-50 transition-colors duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <FeatureIcon className="w-6 h-6 text-green-600 mb-2" />
                      <h3 className="font-medium text-gray-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {feature.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">
                  Dining Highlights
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {restaurantData.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    Reserve a Table
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </PageSection>
    </>
  );
}
