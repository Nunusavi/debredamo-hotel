'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Users, Maximize2, Wifi, Coffee, Sparkles } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Room } from '@/types';
import { formatCurrency, getRoomTypeLabel, cn } from '@/lib/utils';

interface RoomCardProps {
  room: Room;
  locale?: 'en' | 'am';
  featured?: boolean;
}

export default function RoomCard({ room, locale = 'en', featured = false }: RoomCardProps) {
  const [imageError, setImageError] = useState(false);

  const roomName = locale === 'am' && room.name_am ? room.name_am : room.name;
  const description = locale === 'am' && room.description_am ? room.description_am : room.description;

  // Get primary image or use placeholder
  const primaryImage = room.images && room.images.length > 0
    ? room.images[0]
    : { url: '/images/rooms/placeholder.jpg', alt: room.name };

  // Get top amenities (first 4)
  const topAmenities = room.amenities?.slice(0, 4) || [];

  // Get amenity icon
  const getAmenityIcon = (amenity: string) => {
    if (amenity.toLowerCase().includes('wifi')) return Wifi;
    if (amenity.toLowerCase().includes('coffee') || amenity.toLowerCase().includes('nespresso')) return Coffee;
    return Sparkles;
  };

  return (
    <Card className={cn(
      "group overflow-hidden transition-all duration-300 hover:shadow-xl",
      featured && "ring-2 ring-gold-500"
    )}>
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden bg-navy-100">
        {!imageError ? (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-navy-100">
            <div className="text-center">
              <Maximize2 className="w-16 h-16 text-navy-300 mx-auto mb-2" />
              <p className="text-navy-400 text-sm">Image coming soon</p>
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
          <Badge variant="secondary" className="bg-white/90 text-navy-600">
            {getRoomTypeLabel(room.room_type, locale)}
          </Badge>
        </div>

        {/* Price Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="text-white">
            <p className="text-sm">Starting from</p>
            <p className="text-2xl font-bold">{formatCurrency(room.base_price_etb, locale)}</p>
            <p className="text-xs opacity-90">per night</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <CardHeader>
        <div className="space-y-2">
          <h3 className="text-xl font-serif font-bold text-navy-600 group-hover:text-gold-600 transition-colors">
            {roomName}
          </h3>

          {/* Room Stats */}
          <div className="flex items-center gap-4 text-sm text-navy-500">
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
          <p className="text-navy-600 text-sm line-clamp-2 mb-4">
            {description}
          </p>
        )}

        {/* Top Amenities */}
        {topAmenities.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-navy-500 uppercase tracking-wide">
              Amenities
            </p>
            <div className="grid grid-cols-2 gap-2">
              {topAmenities.map((amenity, index) => {
                const Icon = getAmenityIcon(amenity);
                return (
                  <div key={index} className="flex items-center gap-1 text-xs text-navy-600">
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
            className="w-full border-navy-300 text-navy-600 hover:bg-navy-50"
          >
            View Details
          </Button>
        </Link>
        <Link href={`/reservation?room=${room.slug}`} className="flex-1">
          <Button className="w-full bg-gold-500 hover:bg-gold-600 text-white">
            Book Now
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
