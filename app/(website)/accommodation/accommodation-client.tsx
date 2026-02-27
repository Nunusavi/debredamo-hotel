"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  X,
  Eye,
  Users,
  Maximize2,
  Star,
  ArrowRight,
  SlidersHorizontal,
  Mail,
  Sparkles,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { formatCurrency, getRoomTypeLabel } from "@/lib/utils";
import type { Room } from "@/types";

interface AccommodationClientProps {
  rooms: Room[];
}

export default function AccommodationClient({
  rooms,
}: AccommodationClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedGuests, setSelectedGuests] = useState<number>(0);
  const [quickViewRoom, setQuickViewRoom] = useState<Room | null>(null);
  const [sortBy, setSortBy] = useState<string>("popularity");

  // Get featured room (first active room or first room)
  const featuredRoom = rooms.find((room) => room.is_active) || rooms[0];

  // Filter and sort rooms
  const filteredRooms = useMemo(() => {
    let filtered = rooms.filter((room) => room.id !== featuredRoom?.id);

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (room) =>
          room.name.toLowerCase().includes(query) ||
          (room.description ?? "").toLowerCase().includes(query) ||
          room.room_type.toLowerCase().includes(query)
      );
    }

    // Type filter
    if (selectedType !== "all") {
      filtered = filtered.filter((room) => room.room_type === selectedType);
    }

    // Guests filter
    if (selectedGuests > 0) {
      filtered = filtered.filter((room) => room.max_guests >= selectedGuests);
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.base_price_etb - b.base_price_etb);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.base_price_etb - a.base_price_etb);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        filtered.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
    }

    return filtered;
  }, [rooms, searchQuery, selectedType, selectedGuests, sortBy, featuredRoom]);

  // Get unique room types
  const roomTypes = useMemo(() => {
    const types = new Set(rooms.map((room) => room.room_type));
    return Array.from(types);
  }, [rooms]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedType("all");
    setSelectedGuests(0);
  };

  const hasActiveFilters =
    searchQuery.trim() || selectedType !== "all" || selectedGuests > 0;

  return (
    <>
      {/* Featured Hero Room */}
      {featuredRoom && (
        <section className="relative py-12 md:py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative h-[600px] md:h-[700px] rounded-3xl overflow-hidden group"
            >
              {/* Background Image */}
              <Image
                src={
                  featuredRoom.images[0]?.url || "/images/rooms/placeholder.jpg"
                }
                alt={featuredRoom.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="100vw"
                priority
                quality={85}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0fHRsdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDARUXFx0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

              {/* Featured Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute top-8 left-8"
              >
                <Badge className="bg-green-600 text-white border-none px-6 py-3 text-sm font-semibold">
                  <Star className="w-4 h-4 mr-2 fill-current" />
                  Featured Room
                </Badge>
              </motion.div>

              {/* Floating Info Card */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute left-8 bottom-8 right-8 md:left-12 md:bottom-12 md:right-auto "
              >
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl max-w-[40vw]">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-green-600 text-white">
                      {getRoomTypeLabel(featuredRoom.room_type)}
                    </Badge>
                    {featuredRoom.is_active && (
                      <Badge className="bg-green-100 text-green-800">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Available
                      </Badge>
                    )}
                  </div>

                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-green-700 mb-3">
                    {featuredRoom.name}
                  </h2>

                  <p className="text-gray-700 leading-relaxed mb-6 line-clamp-2">
                    {featuredRoom.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-6 mb-6 text-sm text-gray-600">
                    {featuredRoom.size_sqm && (
                      <div className="flex items-center gap-2">
                        <Maximize2 className="w-4 h-4 text-green-600" />
                        <span className="font-semibold">
                          {featuredRoom.size_sqm} m²
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-green-600" />
                      <span className="font-semibold">
                        Up to {featuredRoom.max_guests} Guests
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Starting from</p>
                      <p className="text-3xl font-bold text-green-700">
                        {formatCurrency(featuredRoom.base_price_etb)}
                        <span className="text-sm text-gray-500 font-normal">
                          {" "}
                          / night
                        </span>
                      </p>
                    </div>

                    <Link href={`/accommodation/${featuredRoom.slug}`}>
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold group"
                      >
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Search & Filter Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {/* Search Bar */}
            <div className=" mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search rooms by name, type, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-12 py-6 text-lg rounded-2xl border-2 border-gray-200 focus:border-green-500 shadow-lg"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2 text-gray-700 font-semibold">
                <SlidersHorizontal className="w-5 h-5" />
                <span>Filter by:</span>
              </div>

              {/* Room Type Filter */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedType === "all" ? "default" : "outline"}
                  onClick={() => setSelectedType("all")}
                  className={
                    selectedType === "all"
                      ? "bg-green-600 hover:bg-green-700"
                      : "hover:bg-green-50"
                  }
                >
                  All Rooms
                </Button>
                {roomTypes.map((type) => (
                  <Button
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    onClick={() => setSelectedType(type)}
                    className={
                      selectedType === type
                        ? "bg-green-600 hover:bg-green-700"
                        : "hover:bg-green-50"
                    }
                  >
                    {getRoomTypeLabel(type)}
                  </Button>
                ))}
              </div>

              {/* Guests Filter */}
              <Separator orientation="vertical" className="h-8" />
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((guests) => (
                  <Button
                    key={guests}
                    variant={selectedGuests === guests ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                      setSelectedGuests(selectedGuests === guests ? 0 : guests)
                    }
                    className={
                      selectedGuests === guests
                        ? "bg-green-600 hover:bg-green-700"
                        : "hover:bg-green-50"
                    }
                  >
                    <Users className="w-4 h-4 mr-1" />
                    {guests}+
                  </Button>
                ))}
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear All
                </Button>
              )}
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between">
              <p className="text-gray-600">
                <span className="font-bold text-gray-900">
                  {filteredRooms.length}
                </span>{" "}
                {filteredRooms.length === 1 ? "room" : "rooms"} available
              </p>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-500"
                >
                  <option value="popularity">Popularity</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Magazine Grid */}
      <section className="py-12 bg-gradient-to-b from-white to-green-50/30">
        <div className="container mx-auto px-4">
          {filteredRooms.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 bg-white rounded-3xl shadow-lg"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No rooms found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or search query
              </p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRooms.map((room, index) => (
                <MagazineRoomCard
                  key={room.id}
                  room={room}
                  index={index}
                  onQuickView={() => setQuickViewRoom(room)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        room={quickViewRoom}
        onClose={() => setQuickViewRoom(null)}
      />
    </>
  );
}

// Magazine Room Card Component
function MagazineRoomCard({
  room,
  index,
  onQuickView,
}: {
  room: Room;
  index: number;
  onQuickView: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
        {/* Image */}
        <div className="relative h-80 overflow-hidden">
          <Image
            src={room.images[0]?.url || "/images/rooms/placeholder.jpg"}
            alt={room.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
            quality={80}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0fHRsdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDARUXFx0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
            <Badge className="bg-white/90 backdrop-blur-sm text-gray-900">
              {getRoomTypeLabel(room.room_type)}
            </Badge>
            {room.is_active && (
              <Badge className="bg-green-600 text-white">Available</Badge>
            )}
          </div>

          {/* Quick View Button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ scale: 1.05 }}
            onClick={(e) => {
              e.preventDefault();
              onQuickView();
            }}
            className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-green-500 hover:text-white"
          >
            <Eye className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-6">
          <Link href={`/accommodation/${room.slug}`}>
            <h3 className="font-serif text-2xl font-bold text-green-700 mb-2 group-hover:text-green-600 transition-colors line-clamp-1">
              {room.name}
            </h3>
          </Link>

          <p className="text-gray-600 leading-relaxed mb-4 line-clamp-2">
            {room.description}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
            {room.size_sqm && (
              <div className="flex items-center gap-1">
                <Maximize2 className="w-4 h-4" />
                <span>{room.size_sqm} m²</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{room.max_guests} guests</span>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Price & CTA */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">From</p>
              <p className="text-2xl font-bold text-green-700">
                {formatCurrency(room.base_price_etb)}
                <span className="text-xs text-gray-500 font-normal"> / night</span>
              </p>
            </div>

            <Link href={`/accommodation/${room.slug}`}>
              <Button
                variant="ghost"
                size="sm"
                className="text-green-600 hover:text-green-700 hover:bg-green-50 font-semibold group"
              >
                Details
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Quick View Modal Component
function QuickViewModal({
  room,
  onClose,
}: {
  room: Room | null;
  onClose: () => void;
}) {
  if (!room) return null;

  const mailtoLink = `mailto:reservation@debredamohotel.com?subject=${encodeURIComponent(
    `Room Booking Inquiry - ${room.name}`
  )}&body=${encodeURIComponent(
    `Hello,\n\nI would like to inquire about booking the ${room.name} at DEBREDAMO HOTEL.\n\nPlease let me know about availability.\n\nThank you!`
  )}`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b flex items-center justify-between rounded-t-3xl">
            <h3 className="font-serif text-2xl font-bold text-gray-900">
              Quick View
            </h3>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Image */}
              <div className="relative h-80 md:h-full rounded-2xl overflow-hidden">
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

              {/* Info */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-green-600 text-white">
                    {getRoomTypeLabel(room.room_type)}
                  </Badge>
                  {room.is_active && (
                    <Badge className="bg-green-100 text-green-800">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Available
                    </Badge>
                  )}
                </div>

                <h2 className="font-serif text-3xl font-bold text-green-700 mb-2">
                  {room.name}
                </h2>

                <p className="text-gray-700 leading-relaxed mb-6">
                  {room.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {room.size_sqm && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <Maximize2 className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-xs text-gray-500">Room Size</p>
                        <p className="font-semibold">{room.size_sqm} m²</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-700">
                    <Users className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-xs text-gray-500">Max Guests</p>
                      <p className="font-semibold">{room.max_guests}</p>
                    </div>
                  </div>
                </div>

                {/* Amenities Preview */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Key Amenities
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {room.amenities.slice(0, 6).map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="line-clamp-1">{amenity}</span>
                      </div>
                    ))}
                  </div>
                  {room.amenities.length > 6 && (
                    <p className="text-sm text-gray-500 mt-2">
                      +{room.amenities.length - 6} more amenities
                    </p>
                  )}
                </div>

                <Separator className="my-6" />

                {/* Price & Actions */}
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Starting from</p>
                    <p className="text-4xl font-bold text-green-700">
                      {formatCurrency(room.base_price_etb)}
                      <span className="text-sm text-gray-500 font-normal">
                        {" "}
                        / night
                      </span>
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Link href={`/accommodation/${room.slug}`} className="flex-1">
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        View Full Details
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                    <a href={mailtoLink} className="flex-1">
                      <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                        <Mail className="w-4 h-4 mr-2" />
                        Book Now
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
