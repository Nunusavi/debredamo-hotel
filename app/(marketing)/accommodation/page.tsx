'use client';

import { Button } from '@/components/ui/button';
import AccommodationClient from './accommodation-client';
import { getAllRooms } from '@/lib/data';

export default function AccommodationPage() {
  // Get rooms from config
  const rooms = getAllRooms();

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Page Header */}
      <section className="bg-navy-600 text-white py-8 md:py-20">
        <div className="container mx-auto px-4">
          <div className="">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Our Accommodation
            </h1>
            <p className="text-xl text-navy-200">
              Discover the perfect room for your stay. From cozy standard rooms to
              luxurious presidential suites, we have something for every traveler.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content - Client Component */}
      <AccommodationClient rooms={rooms} />

      {/* CTA Section */}
      <section className="bg-navy-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
            Need Help Choosing?
          </h2>
          <p className="text-navy-200 mb-6 mx-auto">
            Our team is here to help you find the perfect room for your stay.
            Contact us for personalized recommendations.
          </p>
          <Button
            size="lg"
            className="bg-gold-500 hover:bg-gold-600 text-white"
            onClick={() => (window.location.href = '/contact')}
          >
            Contact Our Team
          </Button>
        </div>
      </section>
    </div>
  );
}
