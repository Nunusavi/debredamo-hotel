"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RoomDetailError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to error reporting service
    console.error("Room detail page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Breadcrumb */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/accommodation"
            className="inline-flex items-center gap-2 text-navy-600 hover:text-gold-600 transition-colors"
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

            <h1 className="text-4xl font-serif font-bold text-navy-600 mb-4">
              Unable to Load Room Details
            </h1>

            <p className="text-lg text-navy-600 mb-8">
              We encountered an error while loading this room&apos;s information.
              This might be a temporary issue with our servers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={reset}
                size="lg"
                className="bg-gold-500 hover:bg-gold-600 text-white"
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

            {process.env.NODE_ENV === "development" && error.message && (
              <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
                <p className="text-sm font-mono text-red-800 break-all">
                  {error.message}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Helpful Links */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className=" mx-auto">
            <h2 className="text-2xl font-serif font-bold text-navy-600 mb-6 text-center">
              Can We Help?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/accommodation"
                className="p-6 bg-warm-white rounded-lg border hover:border-gold-500 transition-colors text-center"
              >
                <h3 className="font-semibold text-navy-600 mb-2">All Rooms</h3>
                <p className="text-sm text-navy-500">
                  Browse our complete accommodation collection
                </p>
              </Link>

              <Link
                href="/contact"
                className="p-6 bg-warm-white rounded-lg border hover:border-gold-500 transition-colors text-center"
              >
                <h3 className="font-semibold text-navy-600 mb-2">Contact Us</h3>
                <p className="text-sm text-navy-500">
                  Get in touch with our team for assistance
                </p>
              </Link>

              <Link
                href="/reservation"
                className="p-6 bg-warm-white rounded-lg border hover:border-gold-500 transition-colors text-center"
              >
                <h3 className="font-semibold text-navy-600 mb-2">
                  Make a Reservation
                </h3>
                <p className="text-sm text-navy-500">
                  Book your stay directly with our team
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
