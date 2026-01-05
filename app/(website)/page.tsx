import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/config/site";
import { QuickBookingForm } from "@/components/shared/quick-booking-form";
import { StickyHeader } from "@/components/shared/sticky-header";
import { EmailButton } from "@/components/shared/whatsapp-button";
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
  MapPin,
  Phone,
  Clock,
  CheckCircle,
} from "lucide-react";
import { generateGenericReservationEmail } from "@/lib/mailto";
import { HeroCarousel } from "@/components/shared/hero-carousel";

export const metadata: Metadata = {
  title: "DEBREDAMO HOTEL - Luxury Hotel in Addis Ababa, Ethiopia",
  description:
    "Experience luxury and comfort at DEBREDAMO HOTEL in the heart of Addis Ababa. Book your stay at our 4-Star hotel featuring premium rooms, restaurant, bar, and business facilities. Best rates guaranteed.",
  keywords: [
    "DEBREDAMO HOTEL",
    "Addis Ababa hotel",
    "luxury hotel Ethiopia",
    "hotel in Addis Ababa",
    "4-Star hotel",
    "business hotel Ethiopia",
    "accommodation Addis Ababa",
    "Ethiopian hospitality",
  ],
  openGraph: {
    title: "DEBREDAMO HOTEL - Luxury Hotel in Addis Ababa",
    description:
      "Experience authentic Ethiopian hospitality at our luxury hotel. Premium rooms, fine dining, and exceptional service in the heart of Addis Ababa.",
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name.en,
  },
  twitter: {
    card: "summary_large_image",
    title: "DEBREDAMO HOTEL - Luxury Hotel in Addis Ababa",
    description:
      "Experience authentic Ethiopian hospitality at our luxury hotel in Addis Ababa.",
  },
};

export default async function HomePage() {
  const featuredRooms = (await getFeaturedRooms()).slice(0, 4);

  return (
    <>
      <StickyHeader />
      <EmailButton />

      <div className="flex flex-col">
        {/* Hero Section - Centered with Carousel */}
        <section className="relative min-h-screen overflow-hidden">
          {/* Background Carousel */}
          <HeroCarousel />

          {/* Decorative Background Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Animated Gradient Orbs */}
            <div className="absolute top-10 -right-10 sm:top-20 sm:right-20 w-64 h-64 sm:w-96 sm:h-96 bg-gold-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-10 -left-10 sm:bottom-20 sm:left-20 w-64 h-64 sm:w-96 sm:h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          {/* Main Hero Content */}
          <div className="relative z-10 min-h-screen flex items-center">
            <div className="container mx-auto">
              <div className="mx-auto">
                {/* Top Badge and Stars */}
                <div className="flex flex-col items-center text-center mb-1 animate-in fade-in slide-in-from-top duration-1000">
                    <div>
                      <div className="flex gap-2">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="w-10 h-10 fill-gold-500 text-gold-500" />
                      ))}
                    </div>
                    </div>
                </div>

                {/* Main Heading - Centered and Large */}
                <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
                  <h1 className="text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold text-white mb-2 leading-tight">
                    <span className="block">DEBREDAMO</span>
                    <span className="block text-gold-400">HOTEL</span>
                  </h1>
                  <p className="text-3xl md:text-4xl lg:text-5xl font-ethiopic font-bold text-gold-300 mb-8">
                    ደብረዳሞ ሆቴል
                  </p>
                  <div className="mx-auto">
                    <p className="text-xl md:text-2xl text-gray-100 leading-relaxed mb-4">
                      Where Ethiopian Hospitality Meets Modern Luxury
                    </p>
                    <p className="text-lg text-gray-300">
                      In the Heart of Addis Ababa
                    </p>
                  </div>
                </div>
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-in fade-in slide-in-from-bottom duration-1000 delay-700">
                  <a href={generateGenericReservationEmail()} className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-bold text-lg px-12 py-7 rounded-full shadow-2xl hover:shadow-gold-500/50 transition-all duration-300 hover:scale-105"
                    >
                      Book Your Stay Now
                    </Button>
                  </a>
                  <Link href="/accommodation" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto border-2 border-white text-black hover:bg-white hover:text-green-900 font-semibold text-lg px-12 py-7 rounded-full transition-all duration-300 hover:scale-105"
                    >
                      Explore Rooms
                    </Button>
                  </Link>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mx-auto animate-in fade-in slide-in-from-bottom duration-1000 delay-1000">
                  <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                    <div className="text-4xl font-bold text-gold-400 mb-1">100+</div>
                    <div className="text-gray-300 text-sm font-medium">Luxury Rooms</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                    <div className="text-4xl font-bold text-gold-400 mb-1">10K+</div>
                    <div className="text-gray-300 text-sm font-medium">Happy Guests</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                    <div className="text-4xl font-bold text-gold-400 mb-1">24/7</div>
                    <div className="text-gray-300 text-sm font-medium">Room Service</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                    <div className="text-4xl font-bold text-gold-400 mb-1">4★</div>
                    <div className="text-gray-300 text-sm font-medium">Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Welcome Section with Stats */}
        <section className="py-16 md:py-24 bg-green-50">
          <div className="container mx-auto px-4">
            <div className=" mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
                Your Home Away From Home
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {siteConfig.description.en}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm border-2 border-green-100 hover:border-green-500 transition-colors">
                <div className="text-5xl font-bold text-green-600 mb-2">50+</div>
                <div className="text-gray-900 font-medium">Luxury Rooms</div>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm border-2 border-green-100 hover:border-green-500 transition-colors">
                <div className="text-5xl font-bold text-green-600 mb-2">
                  10K+
                </div>
                <div className="text-gray-900 font-medium">Happy Guests</div>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm border-2 border-green-100 hover:border-green-500 transition-colors">
                <div className="text-5xl font-bold text-green-600 mb-2">
                  24/7
                </div>
                <div className="text-gray-900 font-medium">Room Service</div>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm border-2 border-gold-100 hover:border-gold-500 transition-colors">
                <div className="text-5xl font-bold text-gold-600 mb-2">4★</div>
                <div className="text-gray-900 font-medium">Experience</div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Rooms */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-green-600 font-medium text-sm tracking-wide uppercase mb-2">
                Accommodation
              </p>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
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
                  className="overflow-hidden group hover:shadow-xl transition-all border border-gray-100 hover:border-green-500"
                >
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={
                        room.images[0]?.url || "/images/rooms/placeholder.jpg"
                      }
                      alt={room.name}
                      fill
                      className="object-fill group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                      quality={80}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0fHRsdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDARUXFx0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2">
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
                        <div className="text-2xl font-bold text-green-600">
                          ETB {room.base_price_etb.toLocaleString()}
                          <span className="text-sm font-normal text-gray-500">
                            /night
                          </span>
                        </div>
                      </div>
                      <Link href={`/accommodation/${room.slug}`}>
                        <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">View Details</Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Link href="/accommodation">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                  View All Rooms
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-16 md:py-24 bg-green-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-green-600 font-medium text-sm tracking-wide uppercase mb-2">
                Our Services
              </p>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
                World-Class Amenities
              </h2>
              <p className="text-lg text-gray-600  mx-auto">
                Everything you need for a comfortable and memorable stay
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <Card className="p-6 text-center hover:shadow-lg transition-all border-2 border-green-100 hover:border-green-500">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Utensils className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-xl text-gray-900 mb-2">
                  Restaurant & Dining
                </h3>
                <p className="text-gray-600">
                  Authentic Ethiopian and international cuisine prepared by
                  expert chefs
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-all border-2 border-gold-100 hover:border-gold-500">
                <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wine className="w-8 h-8 text-gold-600" />
                </div>
                <h3 className="font-semibold text-xl text-gray-900 mb-2">
                  Bar & Lounge
                </h3>
                <p className="text-gray-600">
                  Premium spirits, fine wines, and craft cocktails in elegant
                  atmosphere
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-all border-2 border-green-100 hover:border-green-500">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-xl text-gray-900 mb-2">
                  Business Center
                </h3>
                <p className="text-gray-600">
                  Fully equipped meeting rooms and state-of-the-art facilities
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-all border-2 border-green-100 hover:border-green-500">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HeadphonesIcon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-xl text-gray-900 mb-2">
                  24/7 Concierge
                </h3>
                <p className="text-gray-600">
                  Expert assistance with tours, reservations, and arrangements
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-all border-2 border-green-100 hover:border-green-500">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wifi className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-xl text-gray-900 mb-2">
                  Free High-Speed WiFi
                </h3>
                <p className="text-gray-600">
                  Complimentary internet access throughout the property
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-all border-2 border-green-100 hover:border-green-500">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Car className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-xl text-gray-900 mb-2">
                  Airport Transfer
                </h3>
                <p className="text-gray-600">
                  Complimentary shuttle service to and from the airport
                </p>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Link href="/services">
                <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                  View All Services
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-green-600 font-medium text-sm tracking-wide uppercase mb-2">
                Testimonials
              </p>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
                What Our Guests Say
              </h2>
              <p className="text-lg text-gray-600  mx-auto">
                Don&apos;t just take our word for it - hear from our satisfied
                guests
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
                <Card key={index} className="p-6 border-2 border-green-100 hover:border-green-500 transition-colors">
                  <Quote className="w-10 h-10 text-green-500 mb-4" />
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
                  <div className="border-t border-green-100 pt-4">
                    <p className="font-semibold text-gray-900">
                      {review.name}
                    </p>
                    <p className="text-sm text-gray-500">{review.country}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="py-16 md:py-24 bg-green-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-green-600 font-medium text-sm tracking-wide uppercase mb-2">
                  Location
                </p>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
                  In the Heart of Addis Ababa
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Strategically located in the heart of Ethiopia&apos;s capital,
                  DEBREDAMO HOTEL offers easy access to major business
                  districts, cultural attractions, and shopping areas.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-green-600 mt-1 shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Address</p>
                      <p className="text-gray-600">
                        Haile Gebre Silase St, Addis Ababa, Ethiopia
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-green-600 mt-1 shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <a
                        href="tel:+251111234567"
                        className="text-gray-600 hover:text-green-600"
                      >
                        +251116612630
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-green-600 mt-1 shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Reception</p>
                      <p className="text-gray-600">
                        24/7 - We&apos;re always here
                      </p>
                    </div>
                  </div>
                </div>

                <a
                  href="https://maps.google.com/?q=Debre+Damo+Hotel,Haile+Gebre+Silase+St,Addis+Ababa,Ethiopia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-6"
                >
                  <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">Get Directions</Button>
                </a>
              </div>

              {/* Map Placeholder */}
              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-green-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d246.28297909533703!2d38.78501793859526!3d9.01553472106364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b857377c86f7f%3A0xda307876aa0a9dca!2zRGVicmUgRGFtbyBIb3RlbCB8IGhheWEgaHVsZXQgfCDhi7DhiaXhiKgg4Yuz4YieIOGIhuGJtOGIjSB8IOGIgOGLqyDhiIHhiIjhibU!5e0!3m2!1sen!2sru!4v1765263083222!5m2!1sen!2sru"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="DEBREDAMO HOTEL Location"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
        {/* Final CTA */}
        <section className="py-16 md:py-24 bg-green-600">
          <div className="container mx-auto px-4 text-center">
            <div className=" mx-auto">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
                Ready to Experience Luxury?
              </h2>
              <p className="text-xl text-green-50 mb-8">
                Book your stay today and discover authentic Ethiopian
                hospitality
              </p>

              <div className="flex items-center justify-center gap-2 mb-8">
                <CheckCircle className="w-5 h-5 text-gold-300" />
                <span className="text-white">Best Rate Guarantee</span>
                <span className="text-green-300">•</span>
                <CheckCircle className="w-5 h-5 text-gold-300" />
                <span className="text-white">Free Cancellation</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={generateGenericReservationEmail()}>
                  <Button
                    size="lg"
                    className="bg-white hover:bg-green-50 text-green-600 font-semibold text-lg px-10 py-6"
                  >
                    Book Your Stay Now
                  </Button>
                </a>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="font-semibold text-lg px-10 py-6 border-white text-green-500 hover:bg-white hover:text-green-600"
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
