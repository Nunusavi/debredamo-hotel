'use client';

import { Button } from '@/components/ui/button';
import { CheckCircle2, Calendar, Mail, Phone, Home, Printer } from 'lucide-react';
import { format } from 'date-fns';
import type { ReservationData } from '@/app/(marketing)/reservation/page';

interface ConfirmationTabProps {
  data: ReservationData;
  requestNumber?: string;
}

export default function ConfirmationTab({ data, requestNumber }: ConfirmationTabProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 mx-auto">
      {/* Success Icon and Message */}
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-navy-600 mb-2">Reservation Request Received!</h2>
        <p className="text-gray-600">
          Thank you for choosing Debre Damo Hotel. We&apos;ve received your reservation request.
        </p>
      </div>

      {/* Request Number */}
      {requestNumber && (
        <div className="bg-linear-to-br from-gold-50 to-white rounded-lg border-2 border-gold-300 p-6 text-center">
          <p className="text-sm text-gray-600 mb-1">Your Reservation Request Number</p>
          <p className="text-3xl font-bold text-gold-600 tracking-wide">{requestNumber}</p>
          <p className="text-xs text-gray-500 mt-2">
            Please save this number for your records
          </p>
        </div>
      )}

      {/* Booking Summary */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <h3 className="font-semibold text-navy-600 text-lg mb-4">Booking Summary</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500 mb-1">Check-in</p>
            <p className="font-medium text-navy-600 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {data.checkIn ? format(data.checkIn, 'PPP') : '-'}
            </p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Check-out</p>
            <p className="font-medium text-navy-600 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {data.checkOut ? format(data.checkOut, 'PPP') : '-'}
            </p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Room</p>
            <p className="font-medium text-navy-600">{data.selectedRoom?.name}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Guests</p>
            <p className="font-medium text-navy-600">{data.guests} {data.guests === 1 ? 'guest' : 'guests'}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Duration</p>
            <p className="font-medium text-navy-600">
              {data.nights} {data.nights === 1 ? 'night' : 'nights'}
            </p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Total Amount</p>
            <p className="font-bold text-gold-600 text-lg">
              ETB {data.totalPrice?.toLocaleString() || 0}
            </p>
          </div>
        </div>
      </div>

      {/* What Happens Next */}
      <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
        <h3 className="font-semibold text-navy-600 mb-4">What Happens Next?</h3>
        <ol className="space-y-3 text-sm text-gray-700">
          <li className="flex gap-3">
            <span className="shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
              1
            </span>
            <div>
              <p className="font-medium">Email Confirmation</p>
              <p className="text-gray-600">
                You&apos;ll receive a confirmation email at <strong>{data.email}</strong> shortly
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
              2
            </span>
            <div>
              <p className="font-medium">Availability Verification</p>
              <p className="text-gray-600">
                Our team will verify room availability for your selected dates
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
              3
            </span>
            <div>
              <p className="font-medium">Confirmation Call</p>
              <p className="text-gray-600">
                We&apos;ll contact you within 24 hours at <strong>{data.phone}</strong> to confirm your booking
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
              4
            </span>
            <div>
              <p className="font-medium">Final Details</p>
              <p className="text-gray-600">
                Once confirmed, you&apos;ll receive payment instructions and check-in details
              </p>
            </div>
          </li>
        </ol>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-navy-600 mb-4">Need Help?</h3>
        <p className="text-sm text-gray-600 mb-4">
          If you have any questions about your reservation, feel free to contact us:
        </p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-3 text-gray-700">
            <Mail className="w-5 h-5 text-gold-500" />
            <a href="mailto:reservations@debredamohotel.com" className="hover:text-gold-600">
              reservations@debredamohotel.com
            </a>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Phone className="w-5 h-5 text-gold-500" />
            <a href="tel:+251911234567" className="hover:text-gold-600">
              +251 91 123 4567
            </a>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t print:hidden">
        <Button
          onClick={handlePrint}
          variant="outline"
          size="lg"
          className="flex-1"
        >
          <Printer className="mr-2 h-5 w-5" />
          Print Confirmation
        </Button>
        <Button
          onClick={() => window.location.href = '/'}
          size="lg"
          className="flex-1 bg-gold-500 hover:bg-gold-600 text-white"
        >
          <Home className="mr-2 h-5 w-5" />
          Return to Home
        </Button>
      </div>

      {/* Print-only Header */}
      <div className="hidden print:block">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-navy-600">Debre Damo Hotel</h1>
          <p className="text-sm text-gray-600">Reservation Request Confirmation</p>
        </div>
      </div>
    </div>
  );
}
