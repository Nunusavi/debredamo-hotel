"use client";

import { useState } from "react";
import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  Users,
  Maximize2,
  Check,
  Mail,
  Wifi,
  Sparkles,
  Shield,
  Clock,
  MapPin,
  ArrowRight,
  HeartIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatCurrency, getRoomTypeLabel } from "@/lib/utils";
import { getRoomBySlug, getAllRooms } from "@/lib/data";
import { ImageLightbox } from "@/components/shared/image-lightbox";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function RoomDetailPage({ params }: PageProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Unwrap params using React.use() pattern for async params
  const unwrappedParams = React.use(params);
  const { slug } = unwrappedParams;

  const room = getRoomBySlug(slug);
  const allRooms = getAllRooms();

  if (!room) {
    notFound();
  }

  const roomName = room.name;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Group amenities by category
  const amenityCategories = {
    comfort: [] as string[],
    technology: [] as string[],
    bathroom: [] as string[],
    service: [] as string[]
  };

  room.amenities.forEach(amenity => {
    const lower = amenity.toLowerCase();
    if (lower.includes('wifi') || lower.includes('tv') || lower.includes('safe')) {
      amenityCategories.technology.push(amenity);
    } else if (lower.includes('bath') || lower.includes('toilet') || lower.includes('shower') || lower.includes('jacuzzi')) {
      amenityCategories.bathroom.push(amenity);
    } else if (lower.includes('service') || lower.includes('housekeeping') || lower.includes('concierge')) {
      amenityCategories.service.push(amenity);
    } else {
      amenityCategories.comfort.push(amenity);
    }
  });

  // Get related rooms for comparison
  const relatedRooms = allRooms
    .filter((r) => r.slug !== slug)
    .slice(0, 3);

  const mailtoLink = `mailto:reservation@debredamohotel.com?subject=${encodeURIComponent(
    `Room Booking Inquiry - ${roomName}`
  )}&body=${encodeURIComponent(
    `Hello,\n\nI would like to inquire about booking the ${roomName} at DEBREDAMO HOTEL.\n\nRoom Details:\n- Room: ${roomName}\n- Price: ${formatCurrency(room.base_price_etb)} per night\n- Maximum Guests: ${room.max_guests}\n\nPlease let me know about availability and booking process.\n\nThank you!`
  )}`;

  return (
    <div className="min-h-screen bg-green-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/accommodation" className="text-gray-600 hover:text-gray-900 transition-colors">
              Accommodation
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">{roomName}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[1fr_380px] gap-12">
            {/* Left Column - Main Content */}
            <div className="space-y-12">

              {/* Room Header */}
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border-2 border-green-100">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <Badge className="bg-gradient-to-r from-green-600 to-green-700 text-white border-none px-4 py-2">
                    {getRoomTypeLabel(room.room_type)}
                  </Badge>
                  {room.is_active && (
                    <Badge className="bg-gold-500 text-white border-none px-4 py-2">
                      <Sparkles className="w-4 h-4 mr-1" />
                      Available
                    </Badge>
                  )}
                </div>

                <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-4 leading-tight">
                  {roomName}
                </h1>

                {room.name_am && (
                  <p className="text-2xl md:text-3xl font-ethiopic text-gold-600 font-semibold mb-6">
                    {room.name_am}
                  </p>
                )}

                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  {room.description}
                </p>

                <div className="flex flex-wrap items-center gap-6 text-gray-700">
                  {room.size_sqm && (
                    <div className="flex items-center gap-2">
                      <Maximize2 className="w-5 h-5 text-green-600" />
                      <span className="font-semibold">{room.size_sqm} m²</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-green-600" />
                    <span className="font-semibold">Up to {room.max_guests} Guests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-green-600" />
                    <span className="font-semibold">Addis Ababa</span>
                  </div>
                </div>
              </div>

              {/* Interactive Image Gallery Grid */}
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border-2 border-green-100">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-4xl font-serif font-bold text-gray-900">Room Gallery</h2>
                    <p className="text-gray-600 mt-2">Explore every corner</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 px-4 py-2 text-sm">
                    {room.images.length} Photos
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {room.images.map((image, index) => (
                    <div
                      key={index}
                      className={`relative group overflow-hidden rounded-2xl cursor-pointer ${
                        index === 0 ? 'col-span-2 row-span-2' : ''
                      }`}
                      onClick={() => openLightbox(index)}
                    >
                      <div className="relative aspect-square">
                        <Image
                          src={image.url}
                          alt={image.alt || `${roomName} - Photo ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="font-semibold">{image.alt || `View ${index + 1}`}</p>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <Maximize2 className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities Grouped by Category */}
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border-2 border-green-100">
                <h2 className="text-4xl font-serif font-bold text-gray-900 mb-8">Room Features</h2>

                <div className="grid md:grid-cols-2 gap-8">
                  {amenityCategories.comfort.length > 0 && (
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                          <HeartIcon className="w-5 h-5 text-green-700" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Comfort</h3>
                      </div>
                      <ul className="space-y-3">
                        {amenityCategories.comfort.map((amenity) => (
                          <li key={amenity} className="flex items-center gap-3">
                            <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                            <span className="text-gray-700">{amenity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {amenityCategories.technology.length > 0 && (
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gold-100 rounded-xl flex items-center justify-center">
                          <Wifi className="w-5 h-5 text-gold-700" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Technology</h3>
                      </div>
                      <ul className="space-y-3">
                        {amenityCategories.technology.map((amenity) => (
                          <li key={amenity} className="flex items-center gap-3">
                            <Check className="w-5 h-5 text-gold-600 flex-shrink-0" />
                            <span className="text-gray-700">{amenity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {amenityCategories.bathroom.length > 0 && (
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                          <Sparkles className="w-5 h-5 text-green-700" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Bathroom</h3>
                      </div>
                      <ul className="space-y-3">
                        {amenityCategories.bathroom.map((amenity) => (
                          <li key={amenity} className="flex items-center gap-3">
                            <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                            <span className="text-gray-700">{amenity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {amenityCategories.service.length > 0 && (
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gold-100 rounded-xl flex items-center justify-center">
                          <Clock className="w-5 h-5 text-gold-700" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Service</h3>
                      </div>
                      <ul className="space-y-3">
                        {amenityCategories.service.map((amenity) => (
                          <li key={amenity} className="flex items-center gap-3">
                            <Check className="w-5 h-5 text-gold-600 flex-shrink-0" />
                            <span className="text-gray-700">{amenity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Room Policies */}
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border-2 border-green-100">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-4xl font-serif font-bold text-gray-900">Stay Policies</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 border-2 border-green-100">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-4">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Check-in / Check-out</h3>
                    <p className="text-gray-700">Check-in from 14:00<br />Check-out until 12:00</p>
                  </div>

                  <div className="bg-gradient-to-br from-gold-50 to-white rounded-2xl p-6 border-2 border-gold-100">
                    <div className="w-12 h-12 bg-gold-600 rounded-full flex items-center justify-center mb-4">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Cancellation</h3>
                    <p className="text-gray-700">Free cancellation up to 48 hours before check-in</p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 border-2 border-green-100">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-4">
                      <Check className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Payment</h3>
                    <p className="text-gray-700">Payment upon arrival. Cash and bank transfer accepted</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Booking Sidebar */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-200">
                <div className="text-center mb-4">
                  <p className="text-xs text-gray-500 mb-1">Price per night</p>
                  <p className="text-3xl font-bold text-green-700">
                    {formatCurrency(room.base_price_etb)}
                  </p>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Room Size</span>
                    <span className="font-semibold text-gray-900">
                      {room.size_sqm ? `${room.size_sqm} m²` : 'Spacious'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Max Guests</span>
                    <span className="font-semibold text-gray-900">{room.max_guests}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Type</span>
                    <span className="font-semibold text-gray-900">{getRoomTypeLabel(room.room_type)}</span>
                  </div>
                </div>

                <a href={mailtoLink} className="block">
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Book This Room
                  </Button>
                </a>

                <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Free cancellation (48h)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Best rate guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Room Comparison / Related Rooms */}
      <section className="py-16 md:py-20 bg-white border-t-2 border-green-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-green-600 font-medium text-sm tracking-wide uppercase mb-2">
              Compare Options
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              Explore Other <span className="text-gold-600">Rooms</span>
            </h2>
            <p className="text-xl text-gray-600">
              Find the perfect match for your stay
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {relatedRooms.map((relatedRoom) => (
              <Link
                key={relatedRoom.id}
                href={`/accommodation/${relatedRoom.slug}`}
                className="group"
              >
                <div className="bg-white rounded-3xl overflow-hidden border-2 border-green-100 hover:border-green-500 hover:shadow-2xl transition-all duration-300 h-full">
                  {/* Room Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={relatedRoom.images[0]?.url || "/images/rooms/placeholder.jpg"}
                      alt={relatedRoom.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 backdrop-blur-sm text-gray-900 border-none">
                        {getRoomTypeLabel(relatedRoom.room_type)}
                      </Badge>
                    </div>
                  </div>

                  {/* Room Info */}
                  <div className="p-6">
                    <h3 className="font-serif text-2xl font-bold text-gray-900 group-hover:text-gold-600 transition-colors mb-3">
                      {relatedRoom.name}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                      {relatedRoom.description}
                    </p>

                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{relatedRoom.max_guests} guests</span>
                      </div>
                      {relatedRoom.size_sqm && (
                        <div className="flex items-center gap-1">
                          <Maximize2 className="w-4 h-4" />
                          <span>{relatedRoom.size_sqm} m²</span>
                        </div>
                      )}
                    </div>

                    <Separator className="my-4" />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">From</p>
                        <p className="text-2xl font-bold text-green-700">
                          {formatCurrency(relatedRoom.base_price_etb)}
                          <span className="text-sm text-gray-500 font-normal"> / night</span>
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gold-600 hover:text-gold-700 hover:bg-gold-50 font-semibold group-hover:translate-x-1 transition-transform"
                      >
                        View Details
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Image Lightbox */}
      {lightboxOpen && (
        <ImageLightbox
          images={room.images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
