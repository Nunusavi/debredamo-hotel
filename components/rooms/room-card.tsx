"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Users, Maximize2, Wifi, Coffee, Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Room } from "@/types";
import { formatCurrency, getRoomTypeLabel, cn } from "@/lib/utils";
import { generateRoomSpecificEmail } from "@/lib/mailto";

interface RoomCardProps {
  room: Room;
  featured?: boolean;
}

export default function RoomCard({
  room,
  featured = false,
}: RoomCardProps) {
  const [imageError, setImageError] = useState(false);

  const roomName = room.name;
  const description = room.description;

  // Get primary image or use placeholder
  const primaryImage =
    room.images && room.images.length > 0
      ? room.images[0]
      : { url: "/images/rooms/placeholder.jpg", alt: room.name };

  // Get top amenities (first 4)
  const topAmenities = room.amenities?.slice(0, 4) || [];

  // Get amenity icon
  const getAmenityIcon = (amenity: string) => {
    if (amenity.toLowerCase().includes("wifi")) return Wifi;
    if (
      amenity.toLowerCase().includes("coffee") ||
      amenity.toLowerCase().includes("nespresso")
    )
      return Coffee;
    return Sparkles;
  };

  return (
    <Card
      className={cn(
        "group overflow-hidden transition-all duration-300 hover:shadow-xl",
        featured && "ring-2 ring-gold-500"
      )}
    >
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden bg-green-100">
        {!imageError ? (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-green-100">
            <div className="text-center">
              <Maximize2 className="w-16 h-16 text-green-300 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">Image coming soon</p>
            </div>
          </div>
        )}

        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-gold-500 text-white">Featured</Badge>
          </div>
        )}

        {/* Room Type Badge */}
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-white/90 text-gray-800">
            {getRoomTypeLabel(room.room_type)}
          </Badge>
        </div>

        {/* Price Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="text-white">
            <p className="text-sm">Starting from</p>
            <p className="text-2xl font-bold">
              {formatCurrency(room.base_price_etb)}
            </p>
            <p className="text-xs opacity-90">per night</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <CardHeader>
        <div className="space-y-2">
          <h3 className="text-xl font-serif font-bold text-gray-800 group-hover:text-gold-600 transition-colors">
            {roomName}
          </h3>

          {/* Room Stats */}
          <div className="flex items-center gap-4 text-sm text-gray-600">
            {room.size_sqm && (
              <div className="flex items-center gap-1">
                <Maximize2 className="w-4 h-4" />
                <span>{room.size_sqm} m²</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>Up to {room.max_guests} guests</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Description */}
        {description && (
          <p className="text-gray-800 text-sm line-clamp-2 mb-4">
            {description}
          </p>
        )}

        {/* Top Amenities */}
        {topAmenities.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              Amenities
            </p>
            <div className="grid grid-cols-2 gap-2">
              {topAmenities.map((amenity, index) => {
                const Icon = getAmenityIcon(amenity);
                return (
                  <div
                    key={index}
                    className="flex items-center gap-1 text-xs text-gray-800"
                  >
                    <Icon className="w-3 h-3 text-gold-500 flex-shrink-0" />
                    <span className="truncate">{amenity}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex gap-2">
        <Link href={`/accommodation/${room.slug}`} className="flex-1">
          <Button
            variant="outline"
            className="w-full border-green-300 text-gray-800 hover:bg-green-50"
          >
            View Details
          </Button>
        </Link>
        <a href={generateRoomSpecificEmail({ roomName: room.name })} className="flex-1">
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
            Book Now
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
}
