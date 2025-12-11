import {
  Wifi,
  Wind,
  Tv,
  Coffee,
  Lock,
  Laptop,
  Armchair,
  Bath,
  Sparkles,
  BedDouble,
  Car,
  Utensils,
  ShowerHead,
  Shirt,
  Building,
  DoorOpen,
  ChefHat,
  Waves,
  Monitor,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AmenitiesListProps {
  amenities: string[];
  className?: string;
}

// Map amenity names to icons
const getAmenityIcon = (amenity: string) => {
  const lowerAmenity = amenity.toLowerCase();

  if (lowerAmenity.includes('wifi')) return Wifi;
  if (lowerAmenity.includes('air') || lowerAmenity.includes('conditioning')) return Wind;
  if (lowerAmenity.includes('tv') && lowerAmenity.includes('smart')) return Monitor;
  if (lowerAmenity.includes('tv')) return Tv;
  if (lowerAmenity.includes('coffee') || lowerAmenity.includes('nespresso')) return Coffee;
  if (lowerAmenity.includes('bar')) return Coffee;
  if (lowerAmenity.includes('safe')) return Lock;
  if (lowerAmenity.includes('desk') || lowerAmenity.includes('laptop')) return Laptop;
  if (lowerAmenity.includes('sitting') || lowerAmenity.includes('armchair')) return Armchair;
  if (lowerAmenity.includes('bathtub') || lowerAmenity.includes('jacuzzi')) return Bath;
  if (lowerAmenity.includes('shower')) return ShowerHead;
  if (lowerAmenity.includes('toiletries')) return Sparkles;
  if (lowerAmenity.includes('bed')) return BedDouble;
  if (lowerAmenity.includes('parking') || lowerAmenity.includes('car')) return Car;
  if (lowerAmenity.includes('restaurant') || lowerAmenity.includes('dining')) return Utensils;
  if (lowerAmenity.includes('robe') || lowerAmenity.includes('slipper')) return Shirt;
  if (lowerAmenity.includes('view') || lowerAmenity.includes('city')) return Building;
  if (lowerAmenity.includes('balcony') || lowerAmenity.includes('door')) return DoorOpen;
  if (lowerAmenity.includes('kitchen') || lowerAmenity.includes('chef')) return ChefHat;
  if (lowerAmenity.includes('steam') || lowerAmenity.includes('waves')) return Waves;

  // Default icon
  return Sparkles;
};

// Group amenities by category
const categorizeAmenities = (amenities: string[]) => {
  const categories: Record<string, string[]> = {
    'Room Features': [],
    'Bathroom': [],
    'Entertainment': [],
    'Dining & Beverages': [],
    'Services': [],
    'Other': [],
  };

  amenities.forEach((amenity) => {
    const lower = amenity.toLowerCase();

    if (
      lower.includes('bed') ||
      lower.includes('desk') ||
      lower.includes('sitting') ||
      lower.includes('view') ||
      lower.includes('balcony') ||
      lower.includes('conditioning') ||
      lower.includes('safe')
    ) {
      categories['Room Features'].push(amenity);
    } else if (
      lower.includes('bath') ||
      lower.includes('shower') ||
      lower.includes('toiletries') ||
      lower.includes('robe') ||
      lower.includes('jacuzzi') ||
      lower.includes('steam')
    ) {
      categories['Bathroom'].push(amenity);
    } else if (lower.includes('tv') || lower.includes('wifi')) {
      categories['Entertainment'].push(amenity);
    } else if (
      lower.includes('bar') ||
      lower.includes('coffee') ||
      lower.includes('nespresso') ||
      lower.includes('fridge') ||
      lower.includes('kitchen') ||
      lower.includes('dining') ||
      lower.includes('breakfast')
    ) {
      categories['Dining & Beverages'].push(amenity);
    } else if (
      lower.includes('service') ||
      lower.includes('housekeeping') ||
      lower.includes('butler') ||
      lower.includes('concierge') ||
      lower.includes('parking')
    ) {
      categories['Services'].push(amenity);
    } else {
      categories['Other'].push(amenity);
    }
  });

  // Remove empty categories
  return Object.entries(categories).filter(([, items]) => items.length > 0);
};

export default function AmenitiesList({ amenities, className }: AmenitiesListProps) {
  if (!amenities || amenities.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Amenities</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-navy-500">No amenities listed</p>
        </CardContent>
      </Card>
    );
  }

  const categorizedAmenities = categorizeAmenities(amenities);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-2xl font-serif">Room Amenities</CardTitle>
        <p className="text-navy-500">Everything you need for a comfortable stay</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {categorizedAmenities.map(([category, items]) => (
          <div key={category}>
            <h3 className="text-lg font-semibold text-navy-600 mb-3">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {items.map((amenity, index) => {
                const Icon = getAmenityIcon(amenity);
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-warm-white transition-colors"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-gold-600" />
                    </div>
                    <span className="text-navy-700">{amenity}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
