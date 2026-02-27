import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { PageSection } from "@/components/shared/page-section";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Award,
  Heart,
  Shield,
  Sparkles,
  Users,
  Star,
  Clock,
  MapPin,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | DEBREDAMO HOTEL",
  description:
    "Learn about DEBREDAMO HOTEL - A luxury hotel in the heart of Addis Ababa offering exceptional hospitality and authentic Ethiopian experiences.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        subtitle="About Us"
        title="Welcome to DEBREDAMO HOTEL"
        description="Experience the perfect blend of luxury, comfort, and authentic Ethiopian hospitality in the heart of Addis Ababa."
      />

      {/* Our Story */}
      <PageSection>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader
              subtitle="Our Story"
              title="A Legacy of Excellence"
              align="left"
              description="Founded with a vision to provide unparalleled hospitality, DEBREDAMO HOTEL has become a landmark of luxury in Addis Ababa."
            />
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Since our establishment, we have been dedicated to offering our
                guests an unforgettable experience that combines modern luxury
                with traditional Ethiopian warmth.
              </p>
              <p>
                Our commitment to excellence has made us a preferred choice for
                both business and leisure travelers seeking comfort,
                sophistication, and authentic cultural experiences.
              </p>
              <p>
                Every member of our team is passionate about ensuring your stay
                is nothing short of extraordinary, from the moment you arrive
                until your departure.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/accommodation">
                <Button size="lg" className="bg-green-500 hover:bg-green-600">
                  Explore Rooms
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/images/Outside_3.jpg"
              alt="DEBREDAMO HOTEL Exterior"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
              quality={80}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0fHRsdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDARUXFx0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
          </div>
        </div>
      </PageSection>

      {/* Mission & Vision */}
      <PageSection background="warm">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8 bg-white">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To provide exceptional hospitality experiences that exceed our
              guests&apos; expectations while celebrating Ethiopian culture and
              traditions. We strive to create lasting memories through
              personalized service, luxurious accommodations, and genuine care
              for every guest.
            </p>
          </Card>
          <Card className="p-8 bg-white">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">
              Our Vision
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To be recognized as the leading luxury hotel in Addis Ababa,
              setting the standard for excellence in hospitality. We envision a
              future where DEBREDAMO HOTEL is synonymous with world-class
              service, cultural authenticity, and unforgettable experiences.
            </p>
          </Card>
        </div>
      </PageSection>

      {/* Core Values */}
      <PageSection>
        <SectionHeader
          subtitle="Our Values"
          title="What We Stand For"
          description="The principles that guide everything we do"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="font-semibold text-lg text-gray-900 mb-2">
              Excellence
            </h4>
            <p className="text-gray-600 text-sm">
              Striving for perfection in every detail of your stay
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="font-semibold text-lg text-gray-900 mb-2">
              Hospitality
            </h4>
            <p className="text-gray-600 text-sm">
              Genuine warmth and care in every interaction
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="font-semibold text-lg text-gray-900 mb-2">
              Integrity
            </h4>
            <p className="text-gray-600 text-sm">
              Honest, transparent, and ethical in all we do
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="font-semibold text-lg text-gray-900 mb-2">
              Innovation
            </h4>
            <p className="text-gray-600 text-sm">
              Continuously improving to serve you better
            </p>
          </div>
        </div>
      </PageSection>

      {/* Stats */}
      <PageSection background="warm">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <div className="font-serif text-5xl md:text-6xl font-bold text-green-600 mb-2">
              50+
            </div>
            <p className="text-gray-600 font-medium">Luxury Rooms</p>
          </div>
          <div>
            <div className="font-serif text-5xl md:text-6xl font-bold text-green-600 mb-2">
              10K+
            </div>
            <p className="text-gray-600 font-medium">Happy Guests</p>
          </div>
          <div>
            <div className="font-serif text-5xl md:text-6xl font-bold text-green-600 mb-2">
              15+
            </div>
            <p className="text-gray-600 font-medium">Years Experience</p>
          </div>
          <div>
            <div className="font-serif text-5xl md:text-6xl font-bold text-green-600 mb-2">
              24/7
            </div>
            <p className="text-gray-600 font-medium">Concierge Service</p>
          </div>
        </div>
      </PageSection>

      {/* Why Choose Us */}
      <PageSection>
        <SectionHeader
          subtitle="Why Choose Us"
          title="The Debredamo Difference"
          description="What makes us stand out from other hotels in Addis Ababa"
        />
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6">
            <MapPin className="w-10 h-10 text-green-600 mb-4" />
            <h4 className="font-semibold text-xl text-gray-900 mb-3">
              Prime Location
            </h4>
            <p className="text-gray-600">
              Located in the heart of Addis Ababa, with easy access to business
              districts, cultural sites, and shopping areas.
            </p>
          </Card>
          <Card className="p-6">
            <Star className="w-10 h-10 text-green-600 mb-4" />
            <h4 className="font-semibold text-xl text-gray-900 mb-3">
              Four-Star Service
            </h4>
            <p className="text-gray-600">
              Our highly trained staff provides personalized attention and
              anticipates your needs before you even ask.
            </p>
          </Card>
          <Card className="p-6">
            <Users className="w-10 h-10 text-green-600 mb-4" />
            <h4 className="font-semibold text-xl text-gray-900 mb-3">
              Cultural Experience
            </h4>
            <p className="text-gray-600">
              Immerse yourself in authentic Ethiopian hospitality while enjoying
              world-class luxury and comfort.
            </p>
          </Card>
          <Card className="p-6">
            <Clock className="w-10 h-10 text-green-600 mb-4" />
            <h4 className="font-semibold text-xl text-gray-900 mb-3">
              24/7 Availability
            </h4>
            <p className="text-gray-600">
              Round-the-clock room service, concierge, and guest support to
              ensure your comfort at any time.
            </p>
          </Card>
          <Card className="p-6">
            <Sparkles className="w-10 h-10 text-green-600 mb-4" />
            <h4 className="font-semibold text-xl text-gray-900 mb-3">
              Luxury Amenities
            </h4>
            <p className="text-gray-600">
              From spa services to fine dining, we offer premium facilities and
              amenities for a complete experience.
            </p>
          </Card>
          <Card className="p-6">
            <Shield className="w-10 h-10 text-green-600 mb-4" />
            <h4 className="font-semibold text-xl text-gray-900 mb-3">
              Safety & Security
            </h4>
            <p className="text-gray-600">
              State-of-the-art security systems and trained personnel ensure
              your safety and peace of mind.
            </p>
          </Card>
        </div>
      </PageSection>

      {/* CTA Section */}
      <PageSection background="gray">
        <div className="text-center  mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Experience Luxury?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Book your stay at DEBREDAMO HOTEL and discover what makes us special
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:reservation@debredamohotel.com?subject=Room%20Booking%20Inquiry&body=Hello%2C%0A%0AI%20would%20like%20to%20inquire%20about%20booking%20a%20room%20at%20DEBREDAMO%20HOTEL.%0A%0APlease%20let%20me%20know%20about%20availability.%0A%0AThank%20you!"
            >
              <Button
                size="lg"
                className="bg-green-500 hover:bg-green-600 w-full sm:w-auto"
              >
                Book Now
              </Button>
            </a>
            <Link href="/accommodation">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                View Rooms
              </Button>
            </Link>
          </div>
        </div>
      </PageSection>
    </>
  );
}
