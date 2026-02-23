import Link from "next/link";
import { Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RoomNotFound() {
  return (
    <div className="min-h-screen bg-warm-white">
      {/* Breadcrumb */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/accommodation"
            className="inline-flex items-center gap-2 text-gray-800 hover:text-gold-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Accommodation</span>
          </Link>
        </div>
      </section>

      {/* Not Found Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className=" mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <Search className="w-10 h-10 text-gray-800" />
            </div>

            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
              Room Not Found
            </h1>

            <p className="text-lg text-gray-800 mb-8">
              We couldn&apos;t find the room you&apos;re looking for. It may
              have been removed or the link you followed might be incorrect.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/accommodation">
                <Button
                  size="lg"
                  className="bg-gold-500 hover:bg-gold-600 text-white w-full sm:w-auto"
                >
                  View All Rooms
                </Button>
              </Link>

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

      {/* Popular Rooms */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className=" mx-auto">
            <h2 className="text-3xl font-serif font-bold text-gray-800 mb-8 text-center">
              Popular Room Types
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                href="/accommodation"
                className="group p-6 bg-warm-white rounded-lg border hover:border-gold-500 transition-all hover:shadow-lg"
              >
                <h3 className="text-xl font-serif font-bold text-gray-800 group-hover:text-gold-600 transition-colors mb-2">
                  Standard Rooms
                </h3>
                <p className="text-gray-800 mb-4">
                  Comfortable rooms with modern amenities perfect for both
                  business and leisure travelers.
                </p>
                <span className="text-gold-600 font-semibold group-hover:underline">
                  View Rooms →
                </span>
              </Link>

              <Link
                href="/accommodation"
                className="group p-6 bg-warm-white rounded-lg border hover:border-gold-500 transition-all hover:shadow-lg"
              >
                <h3 className="text-xl font-serif font-bold text-gray-800 group-hover:text-gold-600 transition-colors mb-2">
                  Deluxe Rooms
                </h3>
                <p className="text-gray-800 mb-4">
                  Spacious and elegantly designed rooms with premium bedding and
                  upgraded amenities.
                </p>
                <span className="text-gold-600 font-semibold group-hover:underline">
                  View Rooms →
                </span>
              </Link>

              <Link
                href="/accommodation"
                className="group p-6 bg-warm-white rounded-lg border hover:border-gold-500 transition-all hover:shadow-lg"
              >
                <h3 className="text-xl font-serif font-bold text-gray-800 group-hover:text-gold-600 transition-colors mb-2">
                  Executive Apartments
                </h3>
                <p className="text-gray-800 mb-4">
                  Perfect for business travelers with separate living areas and
                  executive workspaces.
                </p>
                <span className="text-gold-600 font-semibold group-hover:underline">
                  View Rooms →
                </span>
              </Link>

              <Link
                href="/accommodation"
                className="group p-6 bg-warm-white rounded-lg border hover:border-gold-500 transition-all hover:shadow-lg"
              >
                <h3 className="text-xl font-serif font-bold text-gray-800 group-hover:text-gold-600 transition-colors mb-2">
                  Presidential Suite
                </h3>
                <p className="text-gray-800 mb-4">
                  The ultimate in luxury with multiple bedrooms, dining area,
                  and butler service.
                </p>
                <span className="text-gold-600 font-semibold group-hover:underline">
                  View Rooms →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
