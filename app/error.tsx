"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-white to-gray-50 flex items-center justify-center px-4">
      <div className=" w-full text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-6">
            <AlertTriangle className="w-12 h-12 text-red-600" />
          </div>
        </div>

        {/* Content */}
        <div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-navy-900 mb-4">
            Something Went Wrong
          </h1>

          <p className="text-lg text-gray-600 mb-2">
            We apologize for the inconvenience. An error occurred while loading
            this page.
          </p>

          {process.env.NODE_ENV === "development" && error.message && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
              <p className="text-sm font-mono text-red-800 break-all">
                {error.message}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Button
              size="lg"
              onClick={reset}
              className="bg-gold-500 hover:bg-gold-600 w-full sm:w-auto"
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Link href="/">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <Home className="w-4 h-4 mr-2" />
                Go to Homepage
              </Button>
            </Link>
          </div>

          {/* Help Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4">
              If this problem persists, please{" "}
              <Link
                href="/contact"
                className="text-gold-600 hover:text-gold-700 underline"
              >
                contact our support team
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
