'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Users } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formatCurrency, calculateNights, calculateTotalPrice } from '@/lib/utils';
import { GUEST_COUNTS } from '@/lib/constants';

interface ReservationSidebarProps {
  roomId: string;
  roomSlug: string;
  roomName: string;
  pricePerNight: number;
  maxGuests: number;
  locale?: 'en' | 'am';
  className?: string;
}

export default function ReservationSidebar({
  roomSlug,
  pricePerNight,
  maxGuests,
  locale = 'en',
  className,
}: ReservationSidebarProps) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numGuests, setNumGuests] = useState(1);

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  // Calculate nights and total price
  const nights = checkIn && checkOut ? calculateNights(checkIn, checkOut) : 0;
  const totalPrice = nights > 0 ? calculateTotalPrice(pricePerNight, nights) : 0;

  // Validate dates
  const isValidDateRange = checkIn && checkOut && new Date(checkOut) > new Date(checkIn);

  // Build reservation URL with query params
  const buildReservationUrl = () => {
    const params = new URLSearchParams({
      room: roomSlug,
      ...(checkIn && { checkIn }),
      ...(checkOut && { checkOut }),
      guests: numGuests.toString(),
    });
    return `/reservation?${params.toString()}`;
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-xl font-serif">Check Availability</CardTitle>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gold-600">
            {formatCurrency(pricePerNight, locale)}
          </span>
          <span className="text-navy-500">/ night</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Check-in Date */}
        <div className="space-y-2">
          <Label htmlFor="checkIn" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Check-in
          </Label>
          <Input
            id="checkIn"
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            min={today}
            required
          />
        </div>

        {/* Check-out Date */}
        <div className="space-y-2">
          <Label htmlFor="checkOut" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Check-out
          </Label>
          <Input
            id="checkOut"
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            min={checkIn || today}
            required
          />
        </div>

        {/* Number of Guests */}
        <div className="space-y-2">
          <Label htmlFor="guests" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Guests
          </Label>
          <Select
            value={numGuests.toString()}
            onValueChange={(value) => setNumGuests(parseInt(value))}
          >
            <SelectTrigger id="guests">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {GUEST_COUNTS.filter((count) => count <= maxGuests).map((count) => (
                <SelectItem key={count} value={count.toString()}>
                  {count} {count === 1 ? 'guest' : 'guests'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Breakdown */}
        {isValidDateRange && (
          <div className="pt-4 border-t space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-navy-600">
                {formatCurrency(pricePerNight, locale)} × {nights} {nights === 1 ? 'night' : 'nights'}
              </span>
              <span className="font-medium text-navy-700">
                {formatCurrency(pricePerNight * nights, locale)}
              </span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t">
              <span className="text-navy-700">Total</span>
              <span className="text-gold-600">{formatCurrency(totalPrice, locale)}</span>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        <Link href={buildReservationUrl()} className="w-full">
          <Button
            className="w-full bg-gold-500 hover:bg-gold-600 text-white font-semibold"
            size="lg"
            disabled={!isValidDateRange}
          >
            Request Reservation
          </Button>
        </Link>
        <p className="text-xs text-center text-navy-500">
          You won&apos;t be charged yet. This is a reservation request.
        </p>
      </CardFooter>
    </Card>
  );
}
