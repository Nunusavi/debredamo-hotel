"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logError } from "@/lib/errors";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RoomDetailError({ error, reset }: ErrorProps) {
  useEffect(() => {
    logError("Room detail page error", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Breadcrumb */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/accommodation"
            className="inline-flex items-center gap-2 text-gray-800 hover:text-green-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Accommodation</span>
          </Link>
        </div>
      </section>

      {/* Error Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className=" mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
              <AlertTriangle className="w-10 h-10 text-red-600" />
            </div>

            <h1 className="text-4xl font-serif font-bold text-gray-800 mb-4">
              Unable to Load Room Details
            </h1>

            <p className="text-lg text-gray-800 mb-8">
              We encountered an error while loading this room&apos;s
              information. This might be a temporary issue with our servers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={reset}
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                Try Again
              </Button>

              <Link href="/accommodation">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  View All Rooms
                </Button>
              </Link>

              <Link href="/">
                <Button variant="ghost" size="lg" className="w-full sm:w-auto">
                  Return Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Helpful Links */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className=" mx-auto">
            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6 text-center">
              Can We Help?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/accommodation"
                className="p-6 bg-warm-white rounded-lg border hover:border-green-500 transition-colors text-center"
              >
                <h3 className="font-semibold text-gray-800 mb-2">All Rooms</h3>
                <p className="text-sm text-gray-600">
                  Browse our complete accommodation collection
                </p>
              </Link>

              <Link
                href="/contact"
                className="p-6 bg-warm-white rounded-lg border hover:border-green-500 transition-colors text-center"
              >
                <h3 className="font-semibold text-gray-800 mb-2">
                  Contact Us
                </h3>
                <p className="text-sm text-gray-600">
                  Get in touch with our team for assistance
                </p>
              </Link>

              <a
                href="mailto:reservation@debredamohotel.com?subject=Room%20Booking%20Inquiry&body=Hello%2C%0A%0AI%20would%20like%20to%20inquire%20about%20booking%20a%20room%20at%20DEBREDAMO%20HOTEL.%0A%0APlease%20let%20me%20know%20about%20availability.%0A%0AThank%20you!"
                className="p-6 bg-warm-white rounded-lg border hover:border-green-500 transition-colors text-center"
              >
                <h3 className="font-semibold text-gray-800 mb-2">
                  Make a Reservation
                </h3>
                <p className="text-sm text-gray-600">
                  Send us an email inquiry
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
