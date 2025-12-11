'use client';

import { useState } from 'react';
import { Calendar, Users, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format, addDays, differenceInDays } from 'date-fns';
import type { ReservationData } from '@/app/(marketing)/reservation/page';

interface DateGuestSelectionProps {
  data: ReservationData;
  onUpdate: (data: Partial<ReservationData>) => void;
  onNext: () => void;
}

export default function DateGuestSelection({
  data,
  onUpdate,
  onNext,
}: DateGuestSelectionProps) {
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(data.checkIn);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(data.checkOut);
  const [guests, setGuests] = useState<number>(data.guests || 1);

  const handleCheckInSelect = (date: Date | undefined) => {
    setCheckInDate(date);
    // If check-out is before new check-in, reset it
    if (date && checkOutDate && checkOutDate <= date) {
      setCheckOutDate(addDays(date, 1));
    }
  };

  const handleCheckOutSelect = (date: Date | undefined) => {
    setCheckOutDate(date);
  };

  const handleContinue = () => {
    if (!checkInDate || !checkOutDate) {
      alert('Please select both check-in and check-out dates');
      return;
    }

    if (checkOutDate <= checkInDate) {
      alert('Check-out date must be after check-in date');
      return;
    }

    const nights = differenceInDays(checkOutDate, checkInDate);

    onUpdate({
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests,
      nights,
    });
    onNext();
  };

  const nights =
    checkInDate && checkOutDate ? differenceInDays(checkOutDate, checkInDate) : 0;

  return (
    <Card className="p-6 md:p-8">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-navy-700 mb-2">
            Select Your Dates
          </h2>
          <p className="text-navy-500">
            Choose your check-in and check-out dates, and number of guests
          </p>
        </div>

        {/* Date Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Check-in Date */}
          <div className="space-y-2">
            <Label htmlFor="check-in" className="text-navy-700 font-semibold">
              Check-in Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="check-in"
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal h-12',
                    !checkInDate && 'text-muted-foreground'
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {checkInDate ? format(checkInDate, 'PPP') : 'Select date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={checkInDate}
                  onSelect={handleCheckInSelect}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Check-out Date */}
          <div className="space-y-2">
            <Label htmlFor="check-out" className="text-navy-700 font-semibold">
              Check-out Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="check-out"
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal h-12',
                    !checkOutDate && 'text-muted-foreground'
                  )}
                  disabled={!checkInDate}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {checkOutDate ? format(checkOutDate, 'PPP') : 'Select date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={checkOutDate}
                  onSelect={handleCheckOutSelect}
                  disabled={(date) =>
                    !checkInDate || date <= checkInDate || date < new Date()
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Number of Guests */}
        <div className="space-y-2">
          <Label htmlFor="guests" className="text-navy-700 font-semibold">
            Number of Guests
          </Label>
          <Select
            value={guests.toString()}
            onValueChange={(value) => setGuests(parseInt(value))}
          >
            <SelectTrigger id="guests" className="h-12">
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4 text-navy-500" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? 'Guest' : 'Guests'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Summary */}
        {checkInDate && checkOutDate && nights > 0 && (
          <div className="bg-gold-50 border border-gold-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-navy-600 mb-1">Your Stay</p>
                <p className="text-lg font-semibold text-navy-700">
                  {nights} {nights === 1 ? 'Night' : 'Nights'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-navy-600 mb-1">Dates</p>
                <p className="text-sm font-medium text-navy-700">
                  {format(checkInDate, 'MMM dd')} - {format(checkOutDate, 'MMM dd, yyyy')}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end pt-4">
          <Button
            onClick={handleContinue}
            size="lg"
            className="bg-gold-500 hover:bg-gold-600 text-white"
            disabled={!checkInDate || !checkOutDate || nights < 1}
          >
            Continue to Room Selection
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
