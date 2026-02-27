"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, RefreshCcw } from "lucide-react";
import { logError } from "@/lib/errors";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logError("Application error", error);
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
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Something Went Wrong
          </h1>

          <p className="text-lg text-gray-600 mb-2">
            We apologize for the inconvenience. An error occurred while loading
            this page.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Button
              size="lg"
              onClick={reset}
              className="bg-green-500 hover:bg-green-600 w-full sm:w-auto"
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
                className="text-green-600 hover:text-green-700 underline"
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
