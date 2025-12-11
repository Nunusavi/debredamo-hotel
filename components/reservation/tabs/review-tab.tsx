'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ChevronLeft, Calendar, Users, Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import Image from 'next/image';
import type { ReservationData } from '@/app/(marketing)/reservation/page';

interface ReviewTabProps {
  data: ReservationData;
  onBack: () => void;
  onSubmit: () => Promise<void>;
}

export default function ReviewTab({ data, onBack, onSubmit }: ReviewTabProps) {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!acceptedTerms) return;

    setIsSubmitting(true);
    try {
      await onSubmit();
    } catch (error) {
      console.error('Error submitting reservation:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-lg font-bold text-navy-600 mb-0.5">Review Your Booking</h2>
        <p className="text-xs text-gray-600">Please review all details before confirming</p>
      </div>

      {/* Reservation Details */}
      <div className="space-y-2">
        {/* Dates Section */}
        <div className="bg-white rounded border border-gray-200 p-2">
          <h3 className="font-semibold text-sm text-navy-600 mb-2 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Stay Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Check-in</p>
              <p className="font-medium text-navy-600">
                {data.checkIn ? format(data.checkIn, 'PPP') : '-'}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Check-out</p>
              <p className="font-medium text-navy-600">
                {data.checkOut ? format(data.checkOut, 'PPP') : '-'}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Duration</p>
              <p className="font-medium text-navy-600">
                {data.nights} {data.nights === 1 ? 'night' : 'nights'}
              </p>
            </div>
          </div>
        </div>

        {/* Room Section */}
        {data.selectedRoom && (
          <div className="bg-white rounded border border-gray-200 p-2">
            <h3 className="font-semibold text-sm text-navy-600 mb-2 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Room Selection
            </h3>
            <div className="flex gap-4">
              {/* Room Image */}
              <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                {data.selectedRoom.images &&
                 Array.isArray(data.selectedRoom.images) &&
                 data.selectedRoom.images[0] ? (
                  <Image
                    src={data.selectedRoom.images[0].url || data.selectedRoom.images[0]}
                    alt={data.selectedRoom.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-xs">No image</span>
                  </div>
                )}
              </div>
              {/* Room Info */}
              <div className="flex-1">
                <h4 className="font-semibold text-navy-600">{data.selectedRoom.name}</h4>
                <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{data.guests} {data.guests === 1 ? 'guest' : 'guests'}</span>
                  </div>
                  {data.selectedRoom.sizeM2 && (
                    <span>{data.selectedRoom.sizeM2} m²</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Guest Information */}
        <div className="bg-white rounded border border-gray-200 p-2">
          <h3 className="font-semibold text-sm text-navy-600 mb-2 flex items-center gap-2">
            <Users className="h-4 w-4" />
            Guest Information
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Name:</span>
              <span className="font-medium text-navy-600">{data.fullName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Email:</span>
              <span className="font-medium text-navy-600 flex items-center gap-1">
                <Mail className="w-3 h-3" />
                {data.email}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Phone:</span>
              <span className="font-medium text-navy-600 flex items-center gap-1">
                <Phone className="w-3 h-3" />
                {data.phone}
              </span>
            </div>
            {data.specialRequests && (
              <div className="pt-2 border-t">
                <p className="text-gray-500 mb-1">Special Requests:</p>
                <p className="font-medium text-navy-600 text-xs bg-gray-50 p-2 rounded">
                  {data.specialRequests}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-gradient-to-br from-gold-50 to-white rounded border border-gold-200 p-2">
          <h3 className="font-semibold text-sm text-navy-600 mb-2">Price Breakdown</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">
                {data.selectedRoom?.name} × {data.nights} {data.nights === 1 ? 'night' : 'nights'}
              </span>
              <span className="font-medium text-navy-600">
                ETB {data.totalPrice?.toLocaleString() || 0}
              </span>
            </div>
            <div className="pt-2 border-t border-gold-200 flex justify-between items-center">
              <span className="font-semibold text-navy-600">Total Amount</span>
              <span className="text-2xl font-bold text-gold-600">
                ETB {data.totalPrice?.toLocaleString() || 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="bg-blue-50 rounded border border-blue-200 p-2">
        <div className="flex items-start gap-3">
          <Checkbox
            id="terms"
            checked={acceptedTerms}
            onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
            className="mt-1"
          />
          <div className="flex-1">
            <Label htmlFor="terms" className="text-sm font-medium cursor-pointer">
              I agree to the terms and conditions
            </Label>
            <p className="text-xs text-gray-600 mt-1">
              By confirming this booking, you agree to our cancellation policy and terms of service.
              Your reservation is subject to availability confirmation from our team.
            </p>
          </div>
        </div>
      </div>

      {/* Important Notice */}
      <div className="bg-yellow-50 rounded border border-yellow-200 p-2">
        <p className="text-sm text-yellow-800">
          <strong>Please Note:</strong> This is a reservation request. Our team will confirm
          availability and contact you within 24 hours via email or phone to finalize your booking.
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-3 border-t">
        <Button onClick={onBack} variant="outline" disabled={isSubmitting}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!acceptedTerms || isSubmitting}
          className="bg-gold-500 hover:bg-gold-600 text-white min-w-[160px]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            'Confirm Booking'
          )}
        </Button>
      </div>
    </div>
  );
}
