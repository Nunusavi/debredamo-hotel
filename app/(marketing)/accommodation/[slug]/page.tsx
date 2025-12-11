import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Users, Maximize2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import ImageGallery from '@/components/shared/image-gallery';
import AmenitiesList from '@/components/rooms/amenities-list';
import ReservationSidebar from '@/components/reservation/reservation-sidebar';
import { formatCurrency, getRoomTypeLabel } from '@/lib/utils';
import { getRoomBySlug, getAllRooms } from '@/lib/data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function RoomDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Get room from config
  const room = getRoomBySlug(slug);
  const allRooms = getAllRooms();

  if (!room) {
    notFound();
  }

  const roomName = room.name;

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Breadcrumb */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-navy-600 hover:text-gold-600">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-navy-400" />
            <Link href="/accommodation" className="text-navy-600 hover:text-gold-600">
              Accommodation
            </Link>
            <ChevronRight className="w-4 h-4 text-navy-400" />
            <span className="text-navy-400">{roomName}</span>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Badge variant="secondary" className="text-sm">
                    {getRoomTypeLabel(room.room_type)}
                  </Badge>
                  {room.is_active && (
                    <Badge className="bg-green-100 text-green-800">Available</Badge>
                  )}
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-navy-600 mb-2">
                  {roomName}
                </h1>
                {room.name_am && (
                  <p className="text-xl font-ethiopic text-navy-500">{room.name_am}</p>
                )}

                {/* Quick Stats */}
                <div className="flex items-center gap-6 mt-4 text-navy-600">
                  {room.size_sqm && (
                    <div className="flex items-center gap-2">
                      <Maximize2 className="w-5 h-5" />
                      <span>{room.size_sqm} m²</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>Up to {room.max_guests} guests</span>
                  </div>
                </div>
              </div>

              {/* Image Gallery */}
              <ImageGallery images={room.images} roomName={roomName} />

              {/* Description */}
              <div>
                <h2 className="text-2xl font-serif font-bold text-navy-600 mb-4">
                  About This Room
                </h2>
                <div className="prose prose-navy max-w-none">
                  <p className="text-navy-700 leading-relaxed">{room.description}</p>
                  {room.description_am && (
                    <p className="text-navy-600 font-ethiopic leading-relaxed mt-4">
                      {room.description_am}
                    </p>
                  )}
                </div>
              </div>

              <Separator />

              {/* Amenities */}
              <AmenitiesList amenities={room.amenities} />

              {/* Room Policies */}
              <div className="bg-white p-6 rounded-lg border">
                <h2 className="text-2xl font-serif font-bold text-navy-600 mb-4">
                  Room Policies
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-navy-700">Check-in / Check-out</h3>
                      <p className="text-navy-600">Check-in from 14:00 | Check-out until 12:00</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-navy-700">Cancellation</h3>
                      <p className="text-navy-600">
                        Free cancellation up to 48 hours before check-in
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-navy-700">Payment</h3>
                      <p className="text-navy-600">
                        Payment upon arrival. We accept cash and bank transfer.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Reservation Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <ReservationSidebar
                  roomId={room.id}
                  roomSlug={room.slug}
                  roomName={roomName}
                  pricePerNight={room.base_price_etb}
                  maxGuests={room.max_guests}
                />

                {/* Contact Card */}
                <div className="mt-4 bg-navy-50 p-4 rounded-lg">
                  <p className="text-sm text-navy-600 mb-2">Need help deciding?</p>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full" size="sm">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Rooms Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-navy-600 mb-8 text-center">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Show 3 other rooms */}
            {allRooms
              .filter((r) => r.slug !== slug)
              .slice(0, 3)
              .map((relatedRoom) => (
                <Link
                  key={relatedRoom.id}
                  href={`/accommodation/${relatedRoom.slug}`}
                  className="group"
                >
                  <div className="bg-warm-white rounded-lg overflow-hidden border hover:shadow-lg transition-shadow">
                    <div className="p-4">
                      <h3 className="font-serif font-bold text-navy-600 group-hover:text-gold-600 transition-colors mb-2">
                        {relatedRoom.name}
                      </h3>
                      <p className="text-sm text-navy-600 mb-3 line-clamp-2">
                        {relatedRoom.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-gold-600 font-bold">
                          {formatCurrency(relatedRoom.base_price_etb)}
                          <span className="text-sm text-navy-500 font-normal"> / night</span>
                        </span>
                        <Button variant="ghost" size="sm" className="text-gold-600">
                          View →
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
