import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { PageSection } from "@/components/shared/page-section";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Utensils,
  Wine,
  Briefcase,
  Dumbbell,
  Wifi,
  Car,
  Sparkles,
  Coffee,
  UtensilsCrossed,
  Users,
  CalendarDays,
  Plane,
  ShowerHead,
  Shirt,
  Clock,
  HeadphonesIcon,
  ChefHat,
  PartyPopper,
  Cake,
} from "lucide-react";
import { generateGenericReservationEmail } from "@/lib/mailto";

export const metadata: Metadata = {
  title: "Services & Amenities | DEBREDAMO HOTEL",
  description:
    "Discover our premium services including restaurant, bar, business center, catering, fitness center, spa, and more at DEBREDAMO HOTEL.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        subtitle="Our Services"
        title="Premium Amenities & Services"
        description="Everything you need for a comfortable and memorable stay"
      />

      {/* Main Services */}
      <PageSection>
        <div className="grid gap-12">
          {/* Restaurant & Dining */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gold-100 rounded-lg mb-4">
                <Utensils className="w-7 h-7 text-gold-600" />
              </div>
              <h3 className="font-serif text-3xl font-bold text-gray-900 mb-4">
                Restaurant & Dining
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Experience culinary excellence at our on-site restaurant. Our
                skilled chefs prepare a diverse menu featuring authentic
                Ethiopian dishes and international cuisine, using the finest
                local and imported ingredients.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <Coffee className="w-5 h-5 text-gold-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">
                      Breakfast Buffet
                    </p>
                    <p className="text-sm text-gray-600">
                      Daily 6:00 AM - 10:30 AM
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <UtensilsCrossed className="w-5 h-5 text-gold-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Lunch & Dinner</p>
                    <p className="text-sm text-gray-600">
                      12:00 PM - 3:00 PM | 6:00 PM - 10:00 PM
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gold-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Room Service</p>
                    <p className="text-sm text-gray-600">Available 24/7</p>
                  </div>
                </div>
              </div>
              <Button className="bg-green-600 hover:bg-green-700">
                View Menu
              </Button>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl order-1 md:order-2">
              <Image
                src="/images/612A0493.JPG"
                alt="Restaurant"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Bar & Lounge */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/Bar_1.jpg"
                alt="Bar & Lounge"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gold-100 rounded-lg mb-4">
                <Wine className="w-7 h-7 text-gold-600" />
              </div>
              <h3 className="font-serif text-3xl font-bold text-gray-900 mb-4">
                Bar & Lounge
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Unwind in our sophisticated bar and lounge. Enjoy premium
                spirits, fine wines, craft cocktails, and light snacks in an
                elegant atmosphere perfect for business meetings or relaxation.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gold-500 rounded-full" />
                  Premium local and international spirits
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gold-500 rounded-full" />
                  Signature cocktails and mocktails
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gold-500 rounded-full" />
                  Extensive wine selection
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gold-500 rounded-full" />
                  Live music on weekends
                </li>
              </ul>
            </div>
          </div>

          {/* Business Center */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gold-100 rounded-lg mb-4">
                <Briefcase className="w-7 h-7 text-gold-600" />
              </div>
              <h3 className="font-serif text-3xl font-bold text-gray-900 mb-4">
                Business Center
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                State-of-the-art business facilities for the modern
                professional. Our business center and meeting rooms are equipped
                with the latest technology to support your business needs.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Users className="w-6 h-6 text-gold-600 mb-2" />
                  <p className="font-medium text-gray-900">Meeting Rooms</p>
                  <p className="text-sm text-gray-600">
                    Capacity: 10-100 people
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Wifi className="w-6 h-6 text-gold-600 mb-2" />
                  <p className="font-medium text-gray-900">High-Speed WiFi</p>
                  <p className="text-sm text-gray-600">Free throughout hotel</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <CalendarDays className="w-6 h-6 text-gold-600 mb-2" />
                  <p className="font-medium text-gray-900">Event Planning</p>
                  <p className="text-sm text-gray-600">
                    Full support available
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <HeadphonesIcon className="w-6 h-6 text-gold-600 mb-2" />
                  <p className="font-medium text-gray-900">AV Equipment</p>
                  <p className="text-sm text-gray-600">Latest technology</p>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl order-1 md:order-2">
              <Image
                src="/images/Bussines/612A7373.JPG"
                alt="Business Center"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Catering Services */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[600px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/Resturant/612A0600.JPG"
                alt="Catering Services"
                fill
                className="object-cover"
                sizes="(max-width: 968px) 100vw, 50vw"
              />
            </div>
            <div>
              <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 rounded-lg mb-4">
                <ChefHat className="w-7 h-7 text-gray-800" />
              </div>
              <h3 className="font-serif text-3xl font-bold text-dark-900 mb-4">
                Catering Services
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Make your special occasions unforgettable with our professional
                catering services. Whether it&apos;s a corporate event, wedding,
                birthday celebration, or private gathering, our experienced team
                delivers exceptional cuisine and impeccable service.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <PartyPopper className="w-5 h-5 text-gray-800 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-dark-900">
                      Corporate Events
                    </p>
                    <p className="text-sm text-gray-600">
                      Business meetings, conferences, and corporate celebrations
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-gray-800 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-dark-900">Social Events</p>
                    <p className="text-sm text-gray-600">
                      Weddings, birthdays, anniversaries, and family gatherings
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Cake className="w-5 h-5 text-gray-800 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-dark-900">Custom Menus</p>
                    <p className="text-sm text-gray-600">
                      Tailored menus to suit your preferences and dietary needs
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <UtensilsCrossed className="w-5 h-5 text-gray-800 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-dark-900">Full Service</p>
                    <p className="text-sm text-gray-600">
                      Setup, service staff, and cleanup included
                    </p>
                  </div>
                </div>
              </div>
              <Link href="/contact">
                <Button className="bg-green-600 hover:bg-green-700">
                  Request Catering Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </PageSection>

      {/* Additional Amenities */}
      <PageSection background="warm">
        <SectionHeader
          subtitle="Additional Amenities"
          title="Everything You Need"
          description="Comprehensive facilities and services for your comfort"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <Dumbbell className="w-12 h-12 text-gold-600 mx-auto mb-4" />
            <h4 className="font-semibold text-lg text-gray-900 mb-2">
              Fitness Center
            </h4>
            <p className="text-sm text-gray-600">
              Modern gym with cardio and weight equipment, open 24/7
            </p>
          </Card>
          <Card className="p-6 text-center">
            <Sparkles className="w-12 h-12 text-gold-600 mx-auto mb-4" />
            <h4 className="font-semibold text-lg text-gray-900 mb-2">
              Spa & Wellness
            </h4>
            <p className="text-sm text-gray-600">
              Rejuvenating treatments and massages by expert therapists
            </p>
          </Card>
          <Card className="p-6 text-center">
            <Car className="w-12 h-12 text-gold-600 mx-auto mb-4" />
            <h4 className="font-semibold text-lg text-gray-900 mb-2">
              Airport Transfer
            </h4>
            <p className="text-sm text-gray-600">
              Complimentary shuttle service to and from the airport
            </p>
          </Card>
          <Card className="p-6 text-center">
            <Shirt className="w-12 h-12 text-gold-600 mx-auto mb-4" />
            <h4 className="font-semibold text-lg text-gray-900 mb-2">
              Laundry Service
            </h4>
            <p className="text-sm text-gray-600">
              Same-day laundry and dry cleaning services available
            </p>
          </Card>
          <Card className="p-6 text-center">
            <ShowerHead className="w-12 h-12 text-gold-600 mx-auto mb-4" />
            <h4 className="font-semibold text-lg text-gray-900 mb-2">
              Daily Housekeeping
            </h4>
            <p className="text-sm text-gray-600">
              Professional cleaning service to keep your room pristine
            </p>
          </Card>
          <Card className="p-6 text-center">
            <Plane className="w-12 h-12 text-gold-600 mx-auto mb-4" />
            <h4 className="font-semibold text-lg text-gray-900 mb-2">
              Concierge Service
            </h4>
            <p className="text-sm text-gray-600">
              Expert assistance with tours, reservations, and arrangements
            </p>
          </Card>
          <Card className="p-6 text-center">
            <Wifi className="w-12 h-12 text-gold-600 mx-auto mb-4" />
            <h4 className="font-semibold text-lg text-gray-900 mb-2">
              Free WiFi
            </h4>
            <p className="text-sm text-gray-600">
              High-speed internet access throughout the property
            </p>
          </Card>
          <Card className="p-6 text-center">
            <Clock className="w-12 h-12 text-gold-600 mx-auto mb-4" />
            <h4 className="font-semibold text-lg text-gray-900 mb-2">
              24/7 Reception
            </h4>
            <p className="text-sm text-gray-600">
              Round-the-clock front desk for your convenience
            </p>
          </Card>
        </div>
      </PageSection>

      {/* CTA Section */}
      <PageSection>
        <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Experience Our Premium Services
          </h2>
          <p className="text-lg text-gray-300 mb-8  mx-auto">
            Book your stay today and enjoy access to all our world-class
            facilities and services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={generateGenericReservationEmail()}>
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
              >
                Reserve Now
              </Button>
            </a>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-black hover:bg-white/10 w-full sm:w-auto"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </PageSection>
    </>
  );
}
