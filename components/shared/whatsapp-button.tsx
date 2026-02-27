"use client";

import { Mail } from "lucide-react";

export function EmailButton() {
  const subject = encodeURIComponent("Inquiry - DEBREDAMO HOTEL");
  const body = encodeURIComponent(
    "Hello,\n\nI would like to inquire about booking a room at DEBREDAMO HOTEL.\n\nPlease let me know about availability.\n\nThank you!"
  );
  const mailtoUrl = `mailto:reservation@debredamohotel.com?subject=${subject}&body=${body}`;

  return (
    <a
      href={mailtoUrl}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 group"
      aria-label="Email us for reservations"
    >
      <Mail className="w-6 h-6" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Send us an email
      </span>
    </a>
  );
}
