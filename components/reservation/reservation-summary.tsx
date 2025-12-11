'use client';

import { ChevronLeft, Calendar, Users, Mail, Phone, Home, Check } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { format } from 'date-fns';
import type { ReservationData } from '@/app/(marketing)/reservation/page';

interface ReservationSummaryProps {
  data: ReservationData;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export default function ReservationSummary({
  data,
  onSubmit,
  onBack,
  isSubmitting,
}: ReservationSummaryProps) {
  const { checkIn, checkOut, guests, selectedRoom, guestInfo, totalPrice, nights } =
    data;

  if (!checkIn || !checkOut || !selectedRoom || !guestInfo || !totalPrice) {
    return (
      <Card className="p-6 md:p-8">
        <p className="text-center text-navy-600">
          Missing reservation information. Please go back and complete all steps.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6 md:p-8">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-navy-700 mb-2">
            Review Your Reservation
          </h2>
          <p className="text-navy-500">
            Please review your details before confirming
          </p>
        </div>

        {/* Summary Sections */}
        <div className="space-y-6">
          {/* Dates & Guests */}
          <div>
            <h3 className="text-lg font-semibold text-navy-700 mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gold-500" />
              Stay Details
            </h3>
            <Card className="bg-navy-50 border-navy-200">
              <div className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-navy-600">Check-in</span>
                  <span className="font-semibold text-navy-700">
                    {format(checkIn, 'EEEE, MMMM dd, yyyy')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-navy-600">Check-out</span>
                  <span className="font-semibold text-navy-700">
                    {format(checkOut, 'EEEE, MMMM dd, yyyy')}
                  </span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-navy-600">Duration</span>
                  <span className="font-semibold text-navy-700">
                    {nights} {nights === 1 ? 'Night' : 'Nights'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-navy-600 flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    Guests
                  </span>
                  <span className="font-semibold text-navy-700">
                    {guests} {guests === 1 ? 'Guest' : 'Guests'}
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* Selected Room */}
          <div>
            <h3 className="text-lg font-semibold text-navy-700 mb-3 flex items-center gap-2">
              <Home className="w-5 h-5 text-gold-500" />
              Selected Room
            </h3>
            <Card className="border-navy-200">
              <div className="p-4">
                <div className="flex gap-4">
                  {/* Room Image */}
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-navy-100 flex-shrink-0">
                    {selectedRoom.images && selectedRoom.images.length > 0 ? (
                      <Image
                        src={selectedRoom.images[0].url}
                        alt={selectedRoom.images[0].alt}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-navy-400 text-xs">
                        No image
                      </div>
                    )}
                  </div>

                  {/* Room Details */}
                  <div className="flex-1">
                    <h4 className="font-serif font-bold text-navy-700 text-lg mb-1">
                      {selectedRoom.name}
                    </h4>
                    <Badge variant="secondary" className="mb-2">
                      {selectedRoom.room_type}
                    </Badge>
                    <div className="text-sm text-navy-600 space-y-1">
                      {selectedRoom.size_sqm && (
                        <p>Size: {selectedRoom.size_sqm} m²</p>
                      )}
                      <p>Max Guests: {selectedRoom.max_guests}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="text-sm text-navy-500">Per night</p>
                    <p className="text-lg font-bold text-gold-600">
                      {formatCurrency(selectedRoom.base_price_etb)}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Guest Information */}
          <div>
            <h3 className="text-lg font-semibold text-navy-700 mb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-gold-500" />
              Guest Information
            </h3>
            <Card className="bg-navy-50 border-navy-200">
              <div className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-navy-600">Name</span>
                  <span className="font-semibold text-navy-700">
                    {guestInfo.firstName} {guestInfo.lastName}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-navy-600 flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    Email
                  </span>
                  <span className="font-medium text-navy-700">
                    {guestInfo.email}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-navy-600 flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    Phone
                  </span>
                  <span className="font-medium text-navy-700">
                    {guestInfo.phone}
                  </span>
                </div>
                {guestInfo.specialRequests && (
                  <>
                    <Separator className="my-2" />
                    <div>
                      <span className="text-navy-600 block mb-1">
                        Special Requests
                      </span>
                      <p className="text-sm text-navy-700 bg-white p-3 rounded border border-navy-200">
                        {guestInfo.specialRequests}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </Card>
          </div>

          {/* Price Breakdown */}
          <div>
            <h3 className="text-lg font-semibold text-navy-700 mb-3">
              Price Breakdown
            </h3>
            <Card className="border-gold-200 bg-gold-50">
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-navy-600">
                    {formatCurrency(selectedRoom.base_price_etb)} × {nights}{' '}
                    {nights === 1 ? 'night' : 'nights'}
                  </span>
                  <span className="font-medium text-navy-700">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-navy-700">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-gold-600">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900 mb-2">
            <strong>Important:</strong>
          </p>
          <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
            <li>This is a reservation request, not a confirmed booking</li>
            <li>We will contact you within 24 hours to confirm availability</li>
            <li>Payment will be arranged upon confirmation</li>
            <li>A confirmation email will be sent to {guestInfo.email}</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-4">
          <Button
            onClick={onBack}
            variant="outline"
            size="lg"
            className="border-navy-200"
            disabled={isSubmitting}
          >
            <ChevronLeft className="mr-2 h-5 w-5" />
            Back
          </Button>
          <Button
            onClick={onSubmit}
            size="lg"
            className="bg-gold-500 hover:bg-gold-600 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                Submitting...
              </>
            ) : (
              <>
                <Check className="mr-2 h-5 w-5" />
                Confirm Reservation
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}
