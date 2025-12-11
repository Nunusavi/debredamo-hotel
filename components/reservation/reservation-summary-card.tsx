'use client';

import { format } from 'date-fns';
import { Calendar, Users, Bed, CreditCard } from 'lucide-react';
import type { ReservationData } from '@/app/(marketing)/reservation/page';

interface ReservationSummaryCardProps {
  data: ReservationData;
}

export default function ReservationSummaryCard({ data }: ReservationSummaryCardProps) {
  const { checkIn, checkOut, guests, selectedRoom, nights, totalPrice } = data;

  return (
    <div className="sticky top-0 bg-white rounded-lg shadow border border-gray-200 p-4 h-fit">
      <h3 className="text-base font-semibold text-navy-600 mb-3 border-b pb-2">
        Reservation Summary
      </h3>

      <div className="space-y-3">
        {/* Dates */}
        {checkIn && checkOut && (
          <div className="flex items-start gap-2">
            <Calendar className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700">Dates</p>
              <p className="text-sm text-gray-600">
                {format(checkIn, 'MMM dd, yyyy')} - {format(checkOut, 'MMM dd, yyyy')}
              </p>
              {nights && (
                <p className="text-xs text-gray-500 mt-1">
                  {nights} {nights === 1 ? 'night' : 'nights'}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Guests */}
        {guests && (
          <div className="flex items-start gap-2">
            <Users className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700">Guests</p>
              <p className="text-sm text-gray-600">
                {guests} {guests === 1 ? 'guest' : 'guests'}
              </p>
            </div>
          </div>
        )}

        {/* Room */}
        {selectedRoom && (
          <div className="flex items-start gap-2">
            <Bed className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700">Room</p>
              <p className="text-sm text-gray-600">{selectedRoom.name}</p>
              <p className="text-xs text-gray-500 mt-1">
                Up to {selectedRoom.max_guests} guests
              </p>
            </div>
          </div>
        )}

        {/* Price Breakdown */}
        {totalPrice !== undefined && nights && (
          <div className="pt-3 border-t">
            <div className="flex items-start gap-2 mb-2">
              <CreditCard className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700 mb-2">Price Breakdown</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>
                      ETB {(totalPrice / nights).toLocaleString()} x {nights}{' '}
                      {nights === 1 ? 'night' : 'nights'}
                    </span>
                    <span>ETB {totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-gray-300">
              <span className="font-semibold text-sm text-gray-900">Total</span>
              <span className="font-bold text-lg text-navy-600">
                ETB {totalPrice.toLocaleString()}
              </span>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!checkIn && !checkOut && !selectedRoom && (
          <div className="text-center py-8 text-gray-400">
            <p className="text-sm">Your reservation summary will appear here</p>
          </div>
        )}
      </div>

      {/* Important notice */}
      {checkIn && checkOut && selectedRoom && (
        <div className="mt-4 p-2 bg-blue-50 rounded border border-blue-100">
          <p className="text-xs text-blue-800">
            <strong>Note:</strong> This is a reservation request. Our team will contact you
            within 24 hours to confirm availability and finalize your booking.
          </p>
        </div>
      )}
    </div>
  );
}
