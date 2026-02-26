"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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
  HeartIcon,
  Image as ImageIcon,
  Home,
  Scale,
  X,
  ChevronLeft,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatCurrency, getRoomTypeLabel } from "@/lib/utils";
import { ImageLightbox } from "@/components/shared/image-lightbox";
import type { Room } from "@/types";

interface RoomDetailClientProps {
  room: Room;
  relatedRooms: Room[];
}

type TabType = "overview" | "gallery" | "amenities" | "policies" | "compare";

export default function RoomDetailClient({
  room,
  relatedRooms,
}: RoomDetailClientProps) {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [compareRoom, setCompareRoom] = useState<Room | null>(null);

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
    service: [] as string[],
  };

  room.amenities.forEach((amenity) => {
    const lower = amenity.toLowerCase();
    if (
      lower.includes("wifi") ||
      lower.includes("tv") ||
      lower.includes("safe")
    ) {
      amenityCategories.technology.push(amenity);
    } else if (
      lower.includes("bath") ||
      lower.includes("toilet") ||
      lower.includes("shower") ||
      lower.includes("jacuzzi")
    ) {
      amenityCategories.bathroom.push(amenity);
    } else if (
      lower.includes("service") ||
      lower.includes("housekeeping") ||
      lower.includes("concierge")
    ) {
      amenityCategories.service.push(amenity);
    } else {
      amenityCategories.comfort.push(amenity);
    }
  });

  const mailtoLink = `mailto:reservation@debredamohotel.com?subject=${encodeURIComponent(
    `Room Booking Inquiry - ${roomName}`
  )}&body=${encodeURIComponent(
    `Hello,\n\nI would like to inquire about booking the ${roomName} at DEBREDAMO HOTEL.\n\nRoom Details:\n- Room: ${roomName}\n- Price: ${formatCurrency(room.base_price_etb)} per night\n- Maximum Guests: ${room.max_guests}\n\nPlease let me know about availability and booking process.\n\nThank you!`
  )}`;

  const tabs = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "gallery", label: "Gallery", icon: ImageIcon },
    { id: "amenities", label: "Amenities", icon: Sparkles },
    { id: "policies", label: "Policies", icon: Shield },
    { id: "compare", label: "Compare", icon: Scale },
  ] as const;

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-white via-white to-green-50/30 overflow-x-hidden">
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40"
      >
        <div className="container mx-auto px-4 sm:px-4 py-3 sm:py-4">
          <nav className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm overflow-x-auto scrollbar-hide">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap"
            >
              Home
            </Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
            <Link
              href="/accommodation"
              className="text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap"
            >
              Accommodation
            </Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
            <span className="text-gray-900 font-medium truncate">{roomName}</span>
          </nav>
        </div>
      </motion.div>

      {/* Hero Section */}
      <section className="py-4 sm:py-6 md:py-8 lg:py-12">
        <div className="container mx-auto px-4 sm:px-4">
          <div className="grid lg:grid-cols-[1fr_380px] gap-4 sm:gap-6 lg:gap-8">
            {/* Main Content */}
            <div>
              {/* Room Header with Hero Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative h-[300px] sm:h-[350px] md:h-[450px] lg:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden mb-6 sm:mb-8 group"
              >
                <Image
                  src={room.images[0]?.url || "/images/rooms/placeholder.jpg"}
                  alt={roomName}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 66vw"
                  priority
                  quality={85}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0fHRsdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDARUXFx0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* Floating Room Info */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white"
                >
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <Badge className="bg-green-600 text-white border-none px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">
                      {getRoomTypeLabel(room.room_type)}
                    </Badge>
                    {room.is_active && (
                      <Badge className="bg-gold-500 text-white border-none px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1 fill-current" />
                        Available
                      </Badge>
                    )}
                  </div>

                  <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-serif font-bold mb-3 leading-tight break-words">
                    {roomName}
                  </h1>

                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 text-sm sm:text-base">
                    {room.size_sqm && (
                      <div className="flex items-center gap-2">
                        <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="font-semibold">{room.size_sqm} m²</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="font-semibold">
                        Up to {room.max_guests} Guests
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="font-semibold">Addis Ababa</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Tabs Navigation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl shadow-lg p-1 sm:p-2 mb-6 sm:mb-8 sticky top-20 z-30"
              >
                <div className="flex overflow-x-auto gap-1 sm:gap-2 scrollbar-hide">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <motion.button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as TabType)}
                        className={`flex-shrink-0 min-w-[70px] sm:min-w-[120px] px-2 sm:px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm ${
                          activeTab === tab.id
                            ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-md"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="hidden sm:inline">{tab.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === "overview" && (
                    <OverviewTab room={room} />
                  )}
                  {activeTab === "gallery" && (
                    <GalleryTab
                      room={room}
                      onImageClick={openLightbox}
                    />
                  )}
                  {activeTab === "amenities" && (
                    <AmenitiesTab amenityCategories={amenityCategories} />
                  )}
                  {activeTab === "policies" && <PoliciesTab />}
                  {activeTab === "compare" && (
                    <CompareTab
                      room={room}
                      relatedRooms={relatedRooms}
                      compareRoom={compareRoom}
                      setCompareRoom={setCompareRoom}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Sticky Booking Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="lg:sticky lg:top-32 h-fit"
            >
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl border-2 border-green-100">
                <div className="text-center mb-6">
                  <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">
                    Starting from
                  </p>
                  <motion.p
                    className="text-4xl font-bold text-green-700"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, type: "spring" }}
                  >
                    {formatCurrency(room.base_price_etb)}
                  </motion.p>
                  <p className="text-sm text-gray-500 mt-1">per night</p>
                </div>

                <Separator className="my-6" />

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Room Size</span>
                    <span className="font-semibold text-gray-900">
                      {room.size_sqm ? `${room.size_sqm} m²` : "Spacious"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Max Guests</span>
                    <span className="font-semibold text-gray-900">
                      {room.max_guests}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Type</span>
                    <span className="font-semibold text-gray-900">
                      {getRoomTypeLabel(room.room_type)}
                    </span>
                  </div>
                </div>

                <motion.a
                  href={mailtoLink}
                  className="block"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Book This Room
                  </Button>
                </motion.a>

                <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                  <motion.div
                    className="flex items-center gap-2 text-sm text-gray-600"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span>Free cancellation (48h)</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-2 text-sm text-gray-600"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span>Best rate guarantee</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-2 text-sm text-gray-600"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span>Instant email confirmation</span>
                  </motion.div>
                </div>
              </div>

              {/* Quick Contact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-6 bg-gradient-to-br from-green-50 to-gold-50 rounded-2xl p-4 sm:p-6 border border-green-200"
              >
                <h3 className="font-semibold text-gray-900 mb-3">
                  Need assistance?
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Our team is ready to help you find the perfect room
                </p>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="w-full border-green-600 text-green-700 hover:bg-green-600 hover:text-white"
                  >
                    Contact Us
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Rooms */}
      {relatedRooms.length > 0 && (
        <section className="py-8 sm:py-12 md:py-16 bg-white border-t-2 border-gray-100">
          <div className="container mx-auto px-4 sm:px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-10 md:mb-12"
            >
              <p className="text-green-600 font-medium text-xs sm:text-sm tracking-wide uppercase mb-2">
                More Options
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-3 sm:mb-4">
                Explore Other Rooms
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600">
                Find the perfect match for your stay
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {relatedRooms.map((relatedRoom, index) => (
                <motion.div
                  key={relatedRoom.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`/accommodation/${relatedRoom.slug}`}
                    className="group block"
                  >
                    <div className="bg-white rounded-3xl overflow-hidden border-2 border-gray-100 hover:border-green-500 hover:shadow-2xl transition-all duration-300 h-full">
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={
                            relatedRoom.images[0]?.url ||
                            "/images/rooms/placeholder.jpg"
                          }
                          alt={relatedRoom.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                          loading="lazy"
                          quality={80}
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0fHRsdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDARUXFx0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                        />
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-white/90 backdrop-blur-sm text-gray-900 border-none">
                            {getRoomTypeLabel(relatedRoom.room_type)}
                          </Badge>
                        </div>
                      </div>

                      <div className="p-4 sm:p-6">
                        <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-gray-900 group-hover:text-gold-600 transition-colors mb-2 sm:mb-3 break-words">
                          {relatedRoom.name}
                        </h3>

                        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
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
                              <span className="text-sm text-gray-500 font-normal">
                                {" "}
                                / night
                              </span>
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gold-600 hover:text-gold-700 hover:bg-gold-50 font-semibold group-hover:translate-x-1 transition-transform"
                          >
                            View
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

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

// Tab Components
function OverviewTab({ room }: { room: Room }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-xl border-2 border-green-100"
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4 sm:mb-6">
        Room Overview
      </h2>
      <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 sm:mb-8">
        {room.description}
      </p>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <motion.div
          className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 border-2 border-green-100"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
              <Maximize2 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Space</h3>
          </div>
          <p className="text-gray-700">
            {room.size_sqm ? `${room.size_sqm} square meters` : "Spacious layout"} designed
            for comfort and relaxation
          </p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-gold-50 to-white rounded-2xl p-6 border-2 border-gold-100"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gold-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Capacity</h3>
          </div>
          <p className="text-gray-700">
            Accommodates up to {room.max_guests} guests comfortably with premium
            amenities
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

function GalleryTab({
  room,
  onImageClick,
}: {
  room: Room;
  onImageClick: (index: number) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-xl border-2 border-green-100"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-6 sm:mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900">
            Photo Gallery
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">Click any image to view full size</p>
        </div>
        <Badge className="bg-green-100 text-green-800 px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm self-start sm:self-auto">
          {room.images.length} Photos
        </Badge>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {room.images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`relative group overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer ${
              index === 0 ? "col-span-2 row-span-2" : ""
            }`}
            onClick={() => onImageClick(index)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative aspect-square">
              <Image
                src={image.url}
                alt={image.alt || `${room.name} - Photo ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                loading="lazy"
                quality={80}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0fHRsdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDARUXFx0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Maximize2 className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function AmenitiesTab({
  amenityCategories,
}: {
  amenityCategories: {
    comfort: string[];
    technology: string[];
    bathroom: string[];
    service: string[];
  };
}) {
  const categories = [
    {
      key: "comfort",
      title: "Comfort & Luxury",
      icon: HeartIcon,
      color: "green",
      items: amenityCategories.comfort,
    },
    {
      key: "technology",
      title: "Technology",
      icon: Wifi,
      color: "gold",
      items: amenityCategories.technology,
    },
    {
      key: "bathroom",
      title: "Bathroom",
      icon: Sparkles,
      color: "green",
      items: amenityCategories.bathroom,
    },
    {
      key: "service",
      title: "Services",
      icon: Clock,
      color: "gold",
      items: amenityCategories.service,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-xl border-2 border-green-100"
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6 sm:mb-8">
        Room Amenities
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {categories.map((category, index) => {
          if (category.items.length === 0) return null;
          const Icon = category.icon;
          const bgColor =
            category.color === "green" ? "bg-green-100" : "bg-gold-100";
          const textColor =
            category.color === "green" ? "text-green-700" : "text-gold-700";
          const checkColor =
            category.color === "green" ? "text-green-600" : "text-gold-600";

          return (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-gray-100 hover:border-green-200 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-10 h-10 ${bgColor} rounded-xl flex items-center justify-center`}
                >
                  <Icon className={`w-5 h-5 ${textColor}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {category.title}
                </h3>
              </div>
              <ul className="space-y-3">
                {category.items.map((amenity, idx) => (
                  <motion.li
                    key={amenity}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + idx * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <Check className={`w-5 h-5 ${checkColor} flex-shrink-0`} />
                    <span className="text-gray-700">{amenity}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

function PoliciesTab() {
  const policies = [
    {
      title: "Check-in / Check-out",
      icon: Clock,
      color: "green",
      details: [
        "Check-in from 14:00 (2:00 PM)",
        "Check-out until 12:00 (12:00 PM)",
        "Early check-in subject to availability",
        "Late check-out available (fees may apply)",
      ],
    },
    {
      title: "Cancellation Policy",
      icon: Shield,
      color: "gold",
      details: [
        "Free cancellation up to 48 hours before arrival",
        "Cancellations within 48 hours: 50% charge",
        "No-show: full charge",
        "Modifications allowed up to 24 hours before",
      ],
    },
    {
      title: "Payment Options",
      icon: Check,
      color: "green",
      details: [
        "Payment upon arrival",
        "Cash (ETB, USD, EUR accepted)",
        "Bank transfer available",
        "Credit cards not accepted",
      ],
    },
    {
      title: "House Rules",
      icon: Shield,
      color: "gold",
      details: [
        "Quiet hours: 10:00 PM - 7:00 AM",
        "No smoking in rooms",
        "Pets not allowed",
        "Valid ID required at check-in",
      ],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-xl border-2 border-green-100"
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6 sm:mb-8">
        Booking Policies
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {policies.map((policy, index) => {
          const Icon = policy.icon;
          const bgColor =
            policy.color === "green"
              ? "from-green-50 to-white"
              : "from-gold-50 to-white";
          const borderColor =
            policy.color === "green" ? "border-green-100" : "border-gold-100";
          const iconBg =
            policy.color === "green" ? "bg-green-600" : "bg-gold-600";

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className={`bg-gradient-to-br ${bgColor} rounded-2xl p-6 border-2 ${borderColor}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-12 h-12 ${iconBg} rounded-full flex items-center justify-center`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {policy.title}
                </h3>
              </div>
              <ul className="space-y-2">
                {policy.details.map((detail, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + idx * 0.05 }}
                    className="flex items-start gap-2 text-gray-700 text-sm"
                  >
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{detail}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

function CompareTab({
  room,
  relatedRooms,
  compareRoom,
  setCompareRoom,
}: {
  room: Room;
  relatedRooms: Room[];
  compareRoom: Room | null;
  setCompareRoom: (room: Room | null) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-xl border-2 border-green-100"
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4 sm:mb-6">
        Compare Rooms
      </h2>
      <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
        Select another room to compare features and pricing
      </p>

      {!compareRoom ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {relatedRooms.map((relatedRoom, index) => (
            <motion.button
              key={relatedRoom.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setCompareRoom(relatedRoom)}
              className="text-left group w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-green-500 transition-all">
                <div className="relative h-48">
                  <Image
                    src={
                      relatedRoom.images[0]?.url ||
                      "/images/rooms/placeholder.jpg"
                    }
                    alt={relatedRoom.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    quality={80}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0fHRsdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDARUXFx0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors mb-2 break-words">
                    {relatedRoom.name}
                  </h3>
                  <p className="text-lg font-bold text-green-700">
                    {formatCurrency(relatedRoom.base_price_etb)}
                    <span className="text-sm text-gray-500 font-normal">
                      {" "}
                      / night
                    </span>
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      ) : (
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 break-words">
              Comparing: {room.name} vs {compareRoom.name}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCompareRoom(null)}
              className="text-gray-600 hover:text-gray-900 self-start sm:self-auto"
            >
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Room */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 border-2 border-green-200"
            >
              <Badge className="bg-green-600 text-white mb-4">
                Current Room
              </Badge>
              <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                <Image
                  src={room.images[0]?.url || "/images/rooms/placeholder.jpg"}
                  alt={room.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                  quality={80}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0fHRsdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDARUXFx0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
              </div>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 mb-4 break-words">
                {room.name}
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Price</span>
                  <span className="font-bold text-green-700">
                    {formatCurrency(room.base_price_etb)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Size</span>
                  <span className="font-semibold">
                    {room.size_sqm ? `${room.size_sqm} m²` : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Guests</span>
                  <span className="font-semibold">{room.max_guests}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type</span>
                  <span className="font-semibold">
                    {getRoomTypeLabel(room.room_type)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amenities</span>
                  <span className="font-semibold">
                    {room.amenities.length}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Compare Room */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-gold-50 to-white rounded-2xl p-6 border-2 border-gold-200"
            >
              <Badge className="bg-gold-600 text-white mb-4">Compare With</Badge>
              <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                <Image
                  src={
                    compareRoom.images[0]?.url ||
                    "/images/rooms/placeholder.jpg"
                  }
                  alt={compareRoom.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                  quality={80}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0fHRsdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDARUXFx0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
              </div>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 mb-4 break-words">
                {compareRoom.name}
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Price</span>
                  <span className="font-bold text-gold-700">
                    {formatCurrency(compareRoom.base_price_etb)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Size</span>
                  <span className="font-semibold">
                    {compareRoom.size_sqm ? `${compareRoom.size_sqm} m²` : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Guests</span>
                  <span className="font-semibold">{compareRoom.max_guests}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type</span>
                  <span className="font-semibold">
                    {getRoomTypeLabel(compareRoom.room_type)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amenities</span>
                  <span className="font-semibold">
                    {compareRoom.amenities.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-6 flex gap-4">
            <Link href={`/accommodation/${compareRoom.slug}`} className="flex-1">
              <Button className="w-full bg-gold-600 hover:bg-gold-700">
                View {compareRoom.name}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </motion.div>
  );
}
