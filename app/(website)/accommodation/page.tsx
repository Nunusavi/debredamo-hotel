import { Button } from "@/components/ui/button";
import { Star, Sparkles } from "lucide-react";
import AccommodationClient from "./accommodation-client";
import { getAllRooms } from "@/lib/data";

// Revalidate this page every 60 seconds (ISR - Incremental Static Regeneration)
// This ensures data updates appear within 60 seconds even if revalidatePath fails
export const revalidate = 60;

export default async function AccommodationPage() {
  // Get rooms from database
  const rooms = await getAllRooms();

  return (
    <div className="min-h-screen bg-green-50">
      {/* Modern Hero Header */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-green-950 text-white py-10 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-6">
              <Sparkles className="w-5 h-5 text-green-400" />
              <span className="font-semibold">Luxury Accommodation</span>
              <div className="flex gap-1 ml-2">
                {[...Array(4)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
              Our Rooms & <span className="text-green-400">Apartments</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed mx-auto">
              Discover the perfect room for your stay. From elegant standard
              rooms to luxurious presidential Apartments, we offer comfort and
              sophistication for every guest.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content - Client Component */}
      <AccommodationClient rooms={rooms} />

      {/* Modern CTA Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-green-950 text-white py-16 md:py-20 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className=" mx-auto">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
              Need Help Choosing?
            </h2>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Our dedicated team is here to help you find the perfect room for
              your stay. Contact us for personalized recommendations and special
              requests.
            </p>
            <a href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-lg px-12 py-7 rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-105"
              >
                Contact Our Team
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
