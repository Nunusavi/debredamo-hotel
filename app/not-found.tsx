import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-warm-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern/Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-green-50/30 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-green-50/30 via-transparent to-transparent" />
      </div>

      {/* Large Background 404 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-serif text-[30vw] font-bold text-gray-900/[0.03] leading-none tracking-tighter">
          404
        </span>
      </div>

      {/* Content Card */}
      <div className="relative  w-full bg-white/10 backdrop-blur-sm border border-green-100 rounded-2xl shadow-xl p-8 md:p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-8 ring-1 ring-green-100">
          <span className="font-serif text-3xl font-bold text-green-600">!</span>
        </div>

        <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>

        <p className="text-lg text-gray-600 mb-8 mx-auto leading-relaxed">
          We apologize, but the page you are looking for cannot be found. It may
          have been moved, deleted, or possibly never existed.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link href="/">
            <Button
              size="lg"
              className="bg-green-900 hover:bg-green-800 text-white min-w-[200px]"
            >
              <Home className="w-4 h-4 mr-2" />
              Return Home
            </Button>
          </Link>
          <Link href="/accommodation">
            <Button
              size="lg"
              variant="outline"
              className="border-green-200 hover:bg-green-50 text-gray-900 min-w-[200px]"
            >
              <Search className="w-4 h-4 mr-2" />
              Browse Rooms
            </Button>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="pt-8 border-t border-gray-100">
          <p className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wider">
            Popular Destinations
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm">
            <Link
              href="/about"
              className="text-gray-800 hover:text-green-600 transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/services"
              className="text-gray-800 hover:text-green-600 transition-colors"
            >
              Our Services
            </Link>
            <Link
              href="/contact"
              className="text-gray-800 hover:text-green-600 transition-colors"
            >
              Contact
            </Link>
            <a
              href="mailto:reservation@debredamohotel.com?subject=Room%20Booking%20Inquiry&body=Hello%2C%0A%0AI%20would%20like%20to%20inquire%20about%20booking%20a%20room%20at%20DEBREDAMO%20HOTEL.%0A%0APlease%20let%20me%20know%20about%20availability.%0A%0AThank%20you!"
              className="text-gray-800 hover:text-green-600 transition-colors"
            >
              Book a Stay
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
