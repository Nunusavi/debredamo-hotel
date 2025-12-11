"use client";

import { useState } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Users,
  Maximize,
  Wifi,
  Wind,
  Tv,
  Wine,
  Lock,
  Laptop,
  Armchair,
  Bath,
  ShowerHead,
  Sparkles,
  Building,
  DoorOpen,
  ChefHat,
  Coffee,
  Shirt,
  Waves,
  Monitor,
  Check,
  Clock,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, formatCurrency } from "@/lib/utils";
import type { Room } from "@/types";
import type { ReservationData } from "@/app/(marketing)/reservation/page";

const iconMap: Record<string, LucideIcon> = {
  wifi: Wifi,
  wind: Wind,
  tv: Tv,
  wine: Wine,
  refrigerator: Wind,
  lock: Lock,
  laptop: Laptop,
  armchair: Armchair,
  bath: Bath,
  shower: ShowerHead,
  sparkles: Sparkles,
  broom: Sparkles,
  "room-service": Clock,
  building: Building,
  "door-open": DoorOpen,
  "chef-hat": ChefHat,
  coffee: Coffee,
  shirt: Shirt,
  waves: Waves,
  monitor: Monitor,
  check: Check,
};

// Local function to get amenity icon
const getAmenityIcon = (amenity: string): string => {
  const amenityLower = amenity.toLowerCase();
  if (amenityLower.includes('wifi') || amenityLower.includes('internet')) return 'wifi';
  if (amenityLower.includes('air') || amenityLower.includes('conditioning') || amenityLower.includes('ac')) return 'wind';
  if (amenityLower.includes('tv') || amenityLower.includes('television')) return 'tv';
  if (amenityLower.includes('minibar') || amenityLower.includes('mini-bar')) return 'wine';
  if (amenityLower.includes('refrigerator') || amenityLower.includes('fridge')) return 'refrigerator';
  if (amenityLower.includes('safe')) return 'lock';
  if (amenityLower.includes('desk') || amenityLower.includes('workspace')) return 'laptop';
  if (amenityLower.includes('seating') || amenityLower.includes('sofa')) return 'armchair';
  if (amenityLower.includes('bathtub') || amenityLower.includes('bath')) return 'bath';
  if (amenityLower.includes('shower')) return 'shower';
  if (amenityLower.includes('housekeeping') || amenityLower.includes('cleaning')) return 'broom';
  if (amenityLower.includes('room service')) return 'room-service';
  if (amenityLower.includes('balcony') || amenityLower.includes('terrace')) return 'building';
  if (amenityLower.includes('closet') || amenityLower.includes('wardrobe')) return 'door-open';
  if (amenityLower.includes('coffee') || amenityLower.includes('tea')) return 'coffee';
  if (amenityLower.includes('ironing') || amenityLower.includes('iron')) return 'shirt';
  if (amenityLower.includes('pool') || amenityLower.includes('swimming')) return 'waves';
  if (amenityLower.includes('monitor') || amenityLower.includes('screen')) return 'monitor';
  return 'check';
};

interface RoomSelectionProps {
  data: ReservationData;
  rooms: Room[];
  onUpdate: (data: Partial<ReservationData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function RoomSelection({
  data,
  rooms,
  onUpdate,
  onNext,
  onBack,
}: RoomSelectionProps) {
  const [selectedRoom, setSelectedRoom] = useState<Room | undefined>(
    data.selectedRoom
  );

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
  };

  const handleContinue = () => {
    if (!selectedRoom) {
      alert("Please select a room");
      return;
    }

    const nights = data.nights || 1;
    const totalPrice = selectedRoom.base_price_etb * nights;

    onUpdate({
      selectedRoom,
      totalPrice,
    });
    onNext();
  };

  // Filter rooms based on guest count
  const availableRooms = rooms.filter(
    (room) => room.is_active && room.max_guests >= (data.guests || 1)
  );

  const nights = data.nights || 1;

  return (
    <Card className="p-6 md:p-8">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-navy-700 mb-2">
            Choose Your Room
          </h2>
          <p className="text-navy-500">
            Select a room that suits your needs for {data.guests}{" "}
            {data.guests === 1 ? "guest" : "guests"}
          </p>
        </div>

        {/* Room List */}
        <div className="space-y-4">
          {availableRooms.length === 0 ? (
            <div className="text-center py-12 bg-navy-50 rounded-lg">
              <p className="text-navy-600 text-lg font-semibold mb-2">
                No rooms available for {data.guests}{" "}
                {data.guests === 1 ? "guest" : "guests"}
              </p>
              <p className="text-navy-500">
                Please go back and adjust your search criteria.
              </p>
            </div>
          ) : (
            availableRooms.map((room) => {
              const isSelected = selectedRoom?.id === room.id;
              const roomTotalPrice = room.base_price_etb * nights;

              return (
                <Card
                  key={room.id}
                  className={cn(
                    "cursor-pointer transition-all duration-200 hover:shadow-lg",
                    isSelected &&
                      "ring-2 ring-gold-500 border-gold-500 shadow-lg"
                  )}
                  onClick={() => handleRoomSelect(room)}
                >
                  <div className="p-4 md:p-6">
                    <div className="grid md:grid-cols-[200px_1fr] gap-4">
                      {/* Room Image */}
                      <div className="relative aspect-[4/3] md:aspect-square rounded-lg overflow-hidden bg-navy-100">
                        {room.images && room.images.length > 0 ? (
                          <Image
                            src={room.images[0].url}
                            alt={room.images[0].alt}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-navy-400">
                            No image
                          </div>
                        )}
                        {isSelected && (
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-gold-500 text-white">
                              Selected
                            </Badge>
                          </div>
                        )}
                      </div>

                      {/* Room Details */}
                      <div className="flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-xl font-serif font-bold text-navy-700">
                                {room.name}
                              </h3>
                              <Badge variant="secondary" className="mt-1">
                                {room.room_type}
                              </Badge>
                            </div>
                          </div>

                          <p className="text-navy-600 mb-3 line-clamp-2">
                            {room.description}
                          </p>

                          {/* Room Stats */}
                          <div className="flex flex-wrap gap-4 text-sm text-navy-600 mb-3">
                            {room.size_sqm && (
                              <div className="flex items-center gap-1">
                                <Maximize className="w-4 h-4" />
                                <span>{room.size_sqm} m²</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>Up to {room.max_guests} guests</span>
                            </div>
                          </div>

                          {/* Amenities */}
                          <div className="flex flex-wrap gap-2">
                            {room.amenities.slice(0, 4).map((amenity, idx) => {
                              const iconName = getAmenityIcon(amenity);
                              const Icon = iconMap[iconName] || Check;
                              return (
                                <div
                                  key={idx}
                                  className="flex items-center gap-1 text-xs text-navy-500 bg-navy-50 px-2 py-1 rounded"
                                >
                                  <Icon className="w-3 h-3" />
                                  <span>{amenity}</span>
                                </div>
                              );
                            })}
                            {room.amenities.length > 4 && (
                              <div className="text-xs text-navy-500 bg-navy-50 px-2 py-1 rounded">
                                +{room.amenities.length - 4} more
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Pricing */}
                        <div className="flex items-end justify-between mt-4 pt-4 border-t border-navy-100">
                          <div>
                            <p className="text-sm text-navy-500">
                              {formatCurrency(room.base_price_etb)} × {nights}{" "}
                              {nights === 1 ? "night" : "nights"}
                            </p>
                            <p className="text-2xl font-bold text-gold-600">
                              {formatCurrency(roomTotalPrice)}
                            </p>
                          </div>
                          <Button
                            variant={isSelected ? "default" : "outline"}
                            className={cn(
                              isSelected &&
                                "bg-gold-500 hover:bg-gold-600 text-white"
                            )}
                          >
                            {isSelected ? "Selected" : "Select Room"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-4">
          <Button
            onClick={onBack}
            variant="outline"
            size="lg"
            className="border-navy-200"
          >
            <ChevronLeft className="mr-2 h-5 w-5" />
            Back
          </Button>
          <Button
            onClick={handleContinue}
            size="lg"
            className="bg-gold-500 hover:bg-gold-600 text-white"
            disabled={!selectedRoom}
          >
            Continue to Guest Details
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
