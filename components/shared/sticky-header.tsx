"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export function StickyHeader() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky header after scrolling 200px
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-lg z-40 animate-in slide-in-from-top duration-300">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif text-xl font-bold text-green-800">
              DEBREDAMO HOTEL
            </span>
            <span className="hidden md:inline text-gray-600">|</span>
            <a
              href="tel:+251111234567"
              className="hidden md:flex items-center gap-2 text-gray-600 hover:text-gold-600"
            >
              <Phone className="w-4 h-4" />
              +251116612630
            </a>
          </div>
          <a
            href="mailto:reservation@debredamohotel.com?subject=Room%20Booking%20Inquiry&body=Hello%2C%0A%0AI%20would%20like%20to%20inquire%20about%20booking%20a%20room%20at%20DEBREDAMO%20HOTEL.%0A%0APlease%20let%20me%20know%20about%20availability.%0A%0AThank%20you!"
          >
            <Button className="bg-gold-500 hover:bg-gold-600">Book Now</Button>
          </a>
        </div>
      </div>
    </div>
  );
}
