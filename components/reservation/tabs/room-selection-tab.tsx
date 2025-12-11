'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Users, Maximize, Check, Loader2 } from 'lucide-react';
import Image from 'next/image';
import type { ReservationData } from '@/app/(marketing)/reservation/page';
import type { Room } from '@/types';

interface RoomSelectionTabProps {
  data: ReservationData;
  onUpdate: (data: Partial<ReservationData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function RoomSelectionTab({
  data,
  onUpdate,
  onNext,
  onBack,
}: RoomSelectionTabProps) {
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvailableRooms = async () => {
      if (!data.checkIn || !data.checkOut) return;

      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          check_in: data.checkIn.toISOString(),
          check_out: data.checkOut.toISOString(),
          ...(data.guests && { guests: data.guests.toString() }),
        });

        const response = await fetch(`/api/availability?${params}`);
        if (!response.ok) throw new Error('Failed to fetch available rooms');

        const result = await response.json();
        setAvailableRooms(result.rooms || []);
      } catch (err) {
        console.error('Error fetching availability:', err);
        setError('Failed to load available rooms. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableRooms();
  }, [data.checkIn, data.checkOut, data.guests]);

  const handleSelectRoom = (room: Room) => {
    // Calculate total price based on nights and base price
    const nights = data.nights || 1;
    const totalPrice = room.base_price_etb * nights;

    onUpdate({
      selectedRoom: room,
      totalPrice,
    });
  };

  const canProceed = !!data.selectedRoom;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-12 w-12 animate-spin text-gold-500 mb-4" />
        <p className="text-gray-600">Checking room availability...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()} variant="outline">
          Retry
        </Button>
      </div>
    );
  }

  if (availableRooms.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">
          No rooms available for your selected dates and guest count.
        </p>
        <Button onClick={onBack} variant="outline">
          Change Dates
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-lg font-bold text-navy-600 mb-0.5">Choose Your Room</h2>
        <p className="text-xs text-gray-600">
          {availableRooms.length} {availableRooms.length === 1 ? 'room' : 'rooms'} available
          for your dates
        </p>
      </div>

      {/* Room Cards */}
      <div className="grid grid-cols-1 gap-3">
        {availableRooms.map((room) => (
          <div
            key={room.id}
            className={`border rounded-lg overflow-hidden transition-all cursor-pointer ${
              data.selectedRoom?.id === room.id
                ? 'border-gold-500 ring-2 ring-gold-200 shadow-lg'
                : 'border-gray-200 hover:border-gold-300 hover:shadow-md'
            }`}
            onClick={() => handleSelectRoom(room)}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3">
              {/* Room Image */}
              <div className="relative h-40 md:h-32 rounded overflow-hidden">
                {room.images && Array.isArray(room.images) && room.images[0]?.url ? (
                  <Image
                    src={room.images[0].url}
                    alt={room.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
                {data.selectedRoom?.id === room.id && (
                  <div className="absolute top-2 right-2 bg-gold-500 text-white rounded-full p-2">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </div>

              {/* Room Details */}
              <div className="md:col-span-2 space-y-3">
                <div>
                  <h3 className="text-xl font-bold text-navy-600">{room.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                    {room.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  {room.max_guests && (
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>Up to {room.max_guests} guests</span>
                    </div>
                  )}
                  {room.size_sqm && (
                    <div className="flex items-center gap-1">
                      <Maximize className="w-4 h-4" />
                      <span>{room.size_sqm} m²</span>
                    </div>
                  )}
                </div>

                {/* Amenities */}
                {room.amenities && Array.isArray(room.amenities) && (
                  <div className="flex flex-wrap gap-2">
                    {room.amenities.slice(0, 6).map((amenity: string, idx: number) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700"
                      >
                        {amenity}
                      </span>
                    ))}
                    {room.amenities.length > 6 && (
                      <span className="text-xs px-2 py-1 text-gray-500">
                        +{room.amenities.length - 6} more
                      </span>
                    )}
                  </div>
                )}

                {/* Price */}
                <div className="flex items-end justify-between pt-2 border-t">
                  <div>
                    <p className="text-sm text-gray-600">Total for {data.nights} nights</p>
                    <p className="text-2xl font-bold text-navy-600">
                      ETB {((room.base_price_etb || 0) * (data.nights || 1)).toLocaleString()}
                    </p>
                  </div>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectRoom(room);
                    }}
                    variant={data.selectedRoom?.id === room.id ? 'default' : 'outline'}
                    className={
                      data.selectedRoom?.id === room.id
                        ? 'bg-gold-500 hover:bg-gold-600'
                        : ''
                    }
                  >
                    {data.selectedRoom?.id === room.id ? 'Selected' : 'Select Room'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-3 border-t">
        <Button onClick={onBack} variant="outline">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!canProceed}
          className="bg-gold-500 hover:bg-gold-600 text-white"
        >
          Continue to Guest Details
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
