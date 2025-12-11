'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calendar as CalendarIcon, Users, ChevronRight } from 'lucide-react';
import { format, addDays, differenceInDays } from 'date-fns';
import type { ReservationData } from '@/app/(marketing)/reservation/page';

interface DateGuestTabProps {
  data: ReservationData;
  onUpdate: (data: Partial<ReservationData>) => void;
  onNext: () => void;
}

export default function DateGuestTab({ data, onUpdate, onNext }: DateGuestTabProps) {
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);

  // Get today's date at start of day for consistent comparisons
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleCheckInSelect = (date: Date | undefined) => {
    if (date) {
      const updates: Partial<ReservationData> = { checkIn: date };
      // Auto-set checkout to next day if not set
      if (!data.checkOut) {
        updates.checkOut = addDays(date, 1);
      }
      // Calculate nights
      const checkOut = updates.checkOut || data.checkOut;
      if (checkOut) {
        updates.nights = differenceInDays(checkOut, date);
      }
      onUpdate(updates);
      setCheckInOpen(false);
    }
  };

  const handleCheckOutSelect = (date: Date | undefined) => {
    if (date) {
      const updates: Partial<ReservationData> = { checkOut: date };
      if (data.checkIn) {
        updates.nights = differenceInDays(date, data.checkIn);
      }
      onUpdate(updates);
      setCheckOutOpen(false);
    }
  };

  const handleGuestsChange = (guests: number) => {
    onUpdate({ guests });
  };

  // Calculate nights for display only - don't update state here
  const nights = data.checkIn && data.checkOut
    ? differenceInDays(data.checkOut, data.checkIn)
    : 0;

  const canProceed = data.checkIn && data.checkOut && data.guests && nights > 0;

  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-lg font-bold text-navy-600 mb-0.5">Select Your Dates</h2>
        <p className="text-xs text-gray-600">Choose your check-in and check-out dates</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Check-in Date */}
        <div className="space-y-2">
          <Label htmlFor="check-in" className="text-base font-medium">
            Check-in Date
          </Label>
          <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
            <PopoverTrigger asChild>
              <Button
                id="check-in"
                variant="outline"
                className="w-full justify-start text-left font-normal h-10"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {data.checkIn ? format(data.checkIn, 'PPP') : 'Select date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={data.checkIn}
                onSelect={handleCheckInSelect}
                disabled={(date) => date < today}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check-out Date */}
        <div className="space-y-2">
          <Label htmlFor="check-out" className="text-base font-medium">
            Check-out Date
          </Label>
          <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
            <PopoverTrigger asChild>
              <Button
                id="check-out"
                variant="outline"
                className="w-full justify-start text-left font-normal h-10"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {data.checkOut ? format(data.checkOut, 'PPP') : 'Select date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={data.checkOut}
                onSelect={handleCheckOutSelect}
                disabled={(date) =>
                  date < today || (data.checkIn ? date <= data.checkIn : false)
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Nights Display */}
      {nights > 0 && (
        <div className="p-2 bg-blue-50 rounded border border-blue-100">
          <p className="text-xs text-blue-800">
            <strong>{nights}</strong> {nights === 1 ? 'night' : 'nights'} selected
          </p>
        </div>
      )}

      {/* Number of Guests */}
      <div className="space-y-2">
        <Label htmlFor="guests" className="text-base font-medium">
          Number of Guests
        </Label>
        <div className="flex items-center gap-4">
          <Users className="h-5 w-5 text-gray-400" />
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleGuestsChange(Math.max(1, (data.guests || 1) - 1))}
              disabled={!data.guests || data.guests <= 1}
            >
              -
            </Button>
            <span className="w-12 text-center text-lg font-semibold">
              {data.guests || 1}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleGuestsChange((data.guests || 1) + 1)}
              disabled={!!(data.guests && data.guests >= 10)}
            >
              +
            </Button>
          </div>
          <span className="text-sm text-gray-600">
            {data.guests === 1 ? 'guest' : 'guests'}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-2">Maximum 10 guests per room</p>
      </div>

      {/* Continue Button */}
      <div className="flex justify-end pt-3 border-t">
        <Button
          onClick={onNext}
          disabled={!canProceed}
          className="bg-gold-500 hover:bg-gold-600 text-white"
        >
          Continue to Room Selection
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
