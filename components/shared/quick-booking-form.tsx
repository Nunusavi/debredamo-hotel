"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Users, CalendarIcon, Mail } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function QuickBookingForm() {
  const [checkIn, setCheckIn] = useState<Date | undefined>(new Date());
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create email with booking details
    const checkInStr = checkIn ? format(checkIn, "PPP") : "Not selected";
    const checkOutStr = checkOut ? format(checkOut, "PPP") : "Not selected";

    const subject = "Room Booking Inquiry - DEBREDAMO HOTEL";
    const body = `Hello,

I would like to inquire about booking a room at DEBREDAMO HOTEL.

Booking Details:
- Check-in Date: ${checkInStr}
- Check-out Date: ${checkOutStr}
- Number of Guests: ${guests}

Please let me know about availability and pricing.

Thank you!`;

    const mailtoUrl = `mailto:reservation@debredamohotel.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-2xl p-6 md:p-8 w-full  mx-auto"
    >
      <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6 text-center">
        Find Your Perfect Stay
      </h3>
      <div className="grid md:grid-cols-3 gap-4">
        {/* Check-in */}
        <div className="flex flex-col gap-2">
          <label className="block text-sm font-medium text-gray-700">
            <CalendarIcon className="w-4 h-4 inline mr-2" />
            Check-in
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal h-[50px] border-gray-300 hover:bg-transparent text-black",
                  !checkIn && "text-muted-foreground"
                )}
              >
                {checkIn ? format(checkIn, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                disabled={(date) => date < today}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check-out */}
        <div className="flex flex-col gap-2">
          <label className="block text-sm font-medium text-gray-700">
            <CalendarIcon className="w-4 h-4 inline mr-2" />
            Check-out
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal h-[50px] border-gray-300 hover:bg-transparent text-black",
                  !checkOut && "text-muted-foreground"
                )}
              >
                {checkOut ? format(checkOut, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                disabled={(date) => date < (checkIn || today)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests */}
        <div>
          <label
            htmlFor="guests"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            <Users className="w-4 h-4 inline mr-2" />
            Guests
          </label>
          <select
            id="guests"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 h-[50px] bg-white text-black"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? "Guest" : "Guests"}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold text-lg py-6"
      >
        <Mail className="w-5 h-5 mr-2" />
        Send Booking Inquiry
      </Button>
    </form>
  );
}
