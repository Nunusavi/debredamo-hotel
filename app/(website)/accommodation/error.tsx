"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logError } from "@/lib/errors";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AccommodationError({ error, reset }: ErrorProps) {
  useEffect(() => {
    logError("Accommodation page error", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Page Header */}
      <section className="bg-green-600 text-white py-8 md:py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Our Accommodation
          </h1>
          <p className="text-xl text-green-200">
            Discover the perfect room for your stay
          </p>
        </div>
      </section>

      {/* Error Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className=" mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
              <AlertTriangle className="w-10 h-10 text-red-600" />
            </div>

            <h2 className="text-3xl font-serif font-bold text-gray-800 mb-4">
              Something went wrong
            </h2>

            <p className="text-lg text-gray-800 mb-8">
              We encountered an error while loading the room information. This
              might be a temporary issue.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={reset}
                size="lg"
                className="bg-gold-500 hover:bg-gold-600 text-white"
              >
                Try Again
              </Button>

              <Link href="/">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Return Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
