import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/config/site";
import { QuickBookingForm } from "@/components/shared/quick-booking-form";
import { StickyHeader } from "@/components/shared/sticky-header";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { getFeaturedRooms } from "@/lib/data";
import {
  Utensils,
  Wine,
  Briefcase,
  Wifi,
  Car,
  HeadphonesIcon,
  Star,
  Quote,
  Mail,
  MapPin,
  Phone,
  Clock,
  CheckCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Debredamo Hotel - Luxury Hotel in Addis Ababa, Ethiopia",
  description:
    "Experience luxury and comfort at Debredamo Hotel in the heart of Addis Ababa. Book your stay at our 4-Star hotel featuring premium rooms, restaurant, bar, and business facilities. Best rates guaranteed.",
  keywords: [
    "Debredamo Hotel",
    "Addis Ababa hotel",
    "luxury hotel Ethiopia",
    "hotel in Addis Ababa",
    "4-Star hotel",
    "business hotel Ethiopia",
    "accommodation Addis Ababa",
    "Ethiopian hospitality",
  ],
  openGraph: {
    title: "Debredamo Hotel - Luxury Hotel in Addis Ababa",
    description:
      "Experience authentic Ethiopian hospitality at our luxury hotel. Premium rooms, fine dining, and exceptional service in the heart of Addis Ababa.",
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name.en,
  },
  twitter: {
    card: "summary_large_image",
    title: "Debredamo Hotel - Luxury Hotel in Addis Ababa",
    description:
      "Experience authentic Ethiopian hospitality at our luxury hotel in Addis Ababa.",
  },
};

export default function HomePage() {
  const featuredRooms = getFeaturedRooms().slice(0, 3);

  return (
    <>
      <StickyHeader />
      <WhatsAppButton />

      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/hero/hotel-hero.jpg"
              alt="Debredamo Hotel Luxury Accommodation"
              fill
              className="object-cover"
              priority
              quality={90}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <Badge className="bg-gold-500 hover:bg-gold-600 text-white mb-6 px-6 py-2 border-none shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex flex-col items-center gap-2">
              <span className="font-medium tracking-wide">
                <span className="font-bold text-[1rem]">4-Star</span> Luxury Hotel in Addis Ababa
              </span>
              <div className="flex gap-0.5">
                {[...Array(4)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-white text-white" />
                ))}
              </div>
              </div>
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
              Welcome to {siteConfig.name.en}
            </h1>
            <p className="text-2xl md:text-4xl lg:text-5xl font-ethiopic font-bold text-gold-300 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
              {siteConfig.name.am}
            </p>
            <p className="text-xl md:text-2xl mb-12  mx-auto text-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              Experience luxury and comfort in the heart of Addis Ababa
            </p>

            {/* Quick Booking Form */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
              <QuickBookingForm />
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-white rounded-full animate-pulse" />
            </div>
          </div>
        </section>

        {/* Welcome Section with Stats */}
        <section className="py-16 md:py-24 bg-warm-white">
          <div className="container mx-auto px-4">
            <div className=" mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-navy-900 mb-6">
                Your Home Away From Home
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {siteConfig.description.en}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="text-5xl font-bold text-gold-500 mb-2">50+</div>
                <div className="text-navy-900 font-medium">Luxury Rooms</div>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="text-5xl font-bold text-gold-500 mb-2">
                  10K+
                </div>
                <div className="text-navy-900 font-medium">Happy Guests</div>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="text-5xl font-bold text-gold-500 mb-2">
                  24/7
                </div>
                <div className="text-navy-900 font-medium">Room Service</div>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="text-5xl font-bold text-gold-500 mb-2">4★</div>
                <div className="text-navy-900 font-medium">Experience</div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Rooms */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-gold-500 font-medium text-sm tracking-wide uppercase mb-2">
                Accommodation
              </p>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-navy-900 mb-4">
                Featured Rooms & Suites
              </h2>
              <p className="text-lg text-gray-600  mx-auto">
                Discover our collection of elegantly designed rooms and suites,
                each offering comfort and luxury
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {featuredRooms.map((room) => (
                <Card
                  key={room.id}
                  className="overflow-hidden group hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={
                        room.images[0]?.url || "/images/rooms/placeholder.jpg"
                      }
                      alt={room.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-2xl font-bold text-navy-900 mb-2">
                      {room.name}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {room.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm text-gray-500">
                          Starting from
                        </span>
                        <div className="text-2xl font-bold text-gold-600">
                          ETB {room.base_price_etb.toLocaleString()}
                          <span className="text-sm font-normal text-gray-500">
                            /night
                          </span>
                        </div>
                      </div>
                      <Link href={`/accommodation/${room.slug}`}>
                        <Button variant="outline">View Details</Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Link href="/accommodation">
                <Button size="lg" className="bg-gold-500 hover:bg-gold-600">
                  View All Rooms
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-gold-500 font-medium text-sm tracking-wide uppercase mb-2">
                Our Services
              </p>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-navy-900 mb-4">
                World-Class Amenities
              </h2>
              <p className="text-lg text-gray-600  mx-auto">
                Everything you need for a comfortable and memorable stay
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Utensils className="w-8 h-8 text-gold-600" />
                </div>
                <h3 className="font-semibold text-xl text-navy-900 mb-2">
                  Restaurant & Dining
                </h3>
                <p className="text-gray-600">
                  Authentic Ethiopian and international cuisine prepared by
                  expert chefs
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wine className="w-8 h-8 text-gold-600" />
                </div>
                <h3 className="font-semibold text-xl text-navy-900 mb-2">
                  Bar & Lounge
                </h3>
                <p className="text-gray-600">
                  Premium spirits, fine wines, and craft cocktails in elegant
                  atmosphere
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-gold-600" />
                </div>
                <h3 className="font-semibold text-xl text-navy-900 mb-2">
                  Business Center
                </h3>
                <p className="text-gray-600">
                  Fully equipped meeting rooms and state-of-the-art facilities
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HeadphonesIcon className="w-8 h-8 text-gold-600" />
                </div>
                <h3 className="font-semibold text-xl text-navy-900 mb-2">
                  24/7 Concierge
                </h3>
                <p className="text-gray-600">
                  Expert assistance with tours, reservations, and arrangements
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wifi className="w-8 h-8 text-gold-600" />
                </div>
                <h3 className="font-semibold text-xl text-navy-900 mb-2">
                  Free High-Speed WiFi
                </h3>
                <p className="text-gray-600">
                  Complimentary internet access throughout the property
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Car className="w-8 h-8 text-gold-600" />
                </div>
                <h3 className="font-semibold text-xl text-navy-900 mb-2">
                  Airport Transfer
                </h3>
                <p className="text-gray-600">
                  Complimentary shuttle service to and from the airport
                </p>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Link href="/services">
                <Button size="lg" variant="outline">
                  View All Services
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24 bg-warm-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-gold-500 font-medium text-sm tracking-wide uppercase mb-2">
                Testimonials
              </p>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-navy-900 mb-4">
                What Our Guests Say
              </h2>
              <p className="text-lg text-gray-600  mx-auto">
                Don&apos;t just take our word for it - hear from our satisfied guests
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  country: "United States",
                  rating: 5,
                  text: "Absolutely wonderful experience! The staff was incredibly welcoming, the room was immaculate, and the location was perfect. The restaurant served the best Ethiopian food I've ever tasted.",
                },
                {
                  name: "Michael Chen",
                  country: "Singapore",
                  rating: 5,
                  text: "Perfect for business travelers. The meeting facilities are top-notch, WiFi is fast, and the business center has everything you need. Will definitely stay here again on my next visit to Addis.",
                },
                {
                  name: "Emma Williams",
                  country: "United Kingdom",
                  rating: 5,
                  text: "The attention to detail and genuine hospitality made our stay unforgettable. From the moment we arrived until checkout, every interaction was warm and professional. Highly recommended!",
                },
              ].map((review, index) => (
                <Card key={index} className="p-6">
                  <Quote className="w-10 h-10 text-gold-400 mb-4" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-gold-500 text-gold-500"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    &quot;{review.text}&quot;
                  </p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-navy-900">{review.name}</p>
                    <p className="text-sm text-gray-500">{review.country}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-gold-500 font-medium text-sm tracking-wide uppercase mb-2">
                  Location
                </p>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 mb-6">
                  In the Heart of Addis Ababa
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Strategically located in the heart of Ethiopia&apos;s capital,
                  Debredamo Hotel offers easy access to major business
                  districts, cultural attractions, and shopping areas.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gold-600 mt-1 shrink-0" />
                    <div>
                      <p className="font-medium text-navy-900">Address</p>
                      <p className="text-gray-600">
                        123 Main Street, Addis Ababa, Ethiopia
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gold-600 mt-1 shrink-0" />
                    <div>
                      <p className="font-medium text-navy-900">Phone</p>
                      <a
                        href="tel:+251111234567"
                        className="text-gray-600 hover:text-gold-600"
                      >
                        +251-11-123-4567
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gold-600 mt-1 shrink-0" />
                    <div>
                      <p className="font-medium text-navy-900">Reception</p>
                      <p className="text-gray-600">24/7 - We&apos;re always here</p>
                    </div>
                  </div>
                </div>

                <Link href="/contact" className="inline-block mt-6">
                  <Button variant="outline">Get Directions</Button>
                </Link>
              </div>

              {/* Map Placeholder */}
              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d246.28297909533703!2d38.78501793859526!3d9.01553472106364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b857377c86f7f%3A0xda307876aa0a9dca!2zRGVicmUgRGFtbyBIb3RlbCB8IGhheWEgaHVsZXQgfCDhi7DhiaXhiKgg4Yuz4YieIOGIhuGJtOGIjSB8IOGIgOGLqyDhiIHhiIjhibU!5e0!3m2!1sen!2sru!4v1765263083222!5m2!1sen!2sru"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Debredamo Hotel Location"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-navy-900 to-navy-800 text-white">
          <div className="container mx-auto px-4">
            <div className=" mx-auto text-center">
              <Mail className="w-16 h-16 text-gold-400 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Stay Updated with Our Newsletter
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Subscribe to receive exclusive offers, travel tips, and news
                about special events
              </p>

              <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="bg-gold-500 hover:bg-gold-600 px-8"
                >
                  Subscribe
                </Button>
              </form>

              <p className="text-sm text-gray-400 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-24 bg-warm-white">
          <div className="container mx-auto px-4 text-center">
            <div className=" mx-auto">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-navy-900 mb-6">
                Ready to Experience Luxury?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Book your stay today and discover authentic Ethiopian
                hospitality
              </p>

              <div className="flex items-center justify-center gap-2 mb-8">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-gray-600">Best Rate Guarantee</span>
                <span className="text-gray-400">•</span>
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-gray-600">Free Cancellation</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/reservation">
                  <Button
                    size="lg"
                    className="bg-gold-500 hover:bg-gold-600 text-white font-semibold text-lg px-10 py-6"
                  >
                    Book Your Stay Now
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="font-semibold text-lg px-10 py-6"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
