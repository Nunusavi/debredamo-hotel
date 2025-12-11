"use client";

import { CheckCircle, Mail, Phone, Home, Calendar } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import type { ReservationData } from "@/app/(marketing)/reservation/page";

interface ConfirmationProps {
  reservationData: ReservationData;
  confirmationId: string;
}

export default function Confirmation({
  reservationData,
  confirmationId,
}: ConfirmationProps) {
  const { checkIn, checkOut, selectedRoom, guestInfo, totalPrice, nights } =
    reservationData;

  return (
    <div className=" mx-auto">
      {/* Success Message */}
      <Card className="p-8 text-center mb-6 bg-gradient-to-br from-gold-50 to-white border-gold-200">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-gold-500 p-4">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-serif font-bold text-navy-700 mb-2">
          Reservation Request Received!
        </h1>
        <p className="text-lg text-navy-600 mb-4">
          Thank you for choosing Debredamo Hotel
        </p>
        <div className="inline-block bg-white border-2 border-gold-500 rounded-lg px-6 py-3">
          <p className="text-sm text-navy-600 mb-1">Confirmation ID</p>
          <p className="text-2xl font-bold text-gold-600 font-mono">
            {confirmationId}
          </p>
        </div>
      </Card>

      {/* What's Next */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-serif font-bold text-navy-700 mb-4">
          What Happens Next?
        </h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold-100 text-gold-600 flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <h3 className="font-semibold text-navy-700 mb-1">
                Confirmation Email Sent
              </h3>
              <p className="text-sm text-navy-600">
                We&apos;ve sent a confirmation email to{" "}
                <strong>{guestInfo?.email}</strong> with your reservation
                details.
              </p>
            </div>
          </div>
          <Separator />
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold-100 text-gold-600 flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <h3 className="font-semibold text-navy-700 mb-1">
                We&apos;ll Review Your Request
              </h3>
              <p className="text-sm text-navy-600">
                Our team will check availability and contact you within 24 hours
                to confirm your reservation.
              </p>
            </div>
          </div>
          <Separator />
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold-100 text-gold-600 flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <h3 className="font-semibold text-navy-700 mb-1">
                Payment & Final Confirmation
              </h3>
              <p className="text-sm text-navy-600">
                Once confirmed, we&apos;ll send you payment instructions and your
                final booking confirmation.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Reservation Summary */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-serif font-bold text-navy-700 mb-4">
          Reservation Summary
        </h2>
        <div className="space-y-4">
          {/* Dates */}
          {checkIn && checkOut && (
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-gold-500 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-navy-700">Stay Dates</p>
                <p className="text-sm text-navy-600">
                  {format(checkIn, "MMMM dd, yyyy")} →{" "}
                  {format(checkOut, "MMMM dd, yyyy")}
                </p>
                <p className="text-sm text-navy-500">
                  {nights} {nights === 1 ? "night" : "nights"}
                </p>
              </div>
            </div>
          )}

          <Separator />

          {/* Room */}
          {selectedRoom && (
            <div className="flex items-start gap-3">
              <Home className="w-5 h-5 text-gold-500 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-navy-700">Room</p>
                <p className="text-sm text-navy-600">{selectedRoom.name}</p>
                <p className="text-sm text-navy-500">
                  {selectedRoom.room_type}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gold-600">
                  {formatCurrency(totalPrice || 0)}
                </p>
              </div>
            </div>
          )}

          <Separator />

          {/* Contact */}
          {guestInfo && (
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-gold-500 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-navy-700">
                  Contact Information
                </p>
                <p className="text-sm text-navy-600">
                  {guestInfo.firstName} {guestInfo.lastName}
                </p>
                <p className="text-sm text-navy-500">{guestInfo.email}</p>
                <p className="text-sm text-navy-500">{guestInfo.phone}</p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Contact Information */}
      <Card className="p-6 mb-6 bg-navy-600 text-white">
        <h2 className="text-xl font-serif font-bold mb-4">Need Help?</h2>
        <p className="mb-4 text-navy-200">
          If you have any questions about your reservation, please don&apos;t
          hesitate to contact us:
        </p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>+251-11-123-4567</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>reservations@debredamohotel.com</span>
          </div>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/" className="flex-1">
          <Button variant="outline" className="w-full h-12 border-navy-300">
            Return to Home
          </Button>
        </Link>
        <Link href="/accommodation" className="flex-1">
          <Button className="w-full h-12 bg-gold-500 hover:bg-gold-600 text-white">
            Browse More Rooms
          </Button>
        </Link>
      </div>

      {/* Print Button */}
      <div className="mt-4 text-center">
        <Button
          variant="ghost"
          onClick={() => window.print()}
          className="text-navy-600 hover:text-navy-700"
        >
          Print Confirmation
        </Button>
      </div>
    </div>
  );
}
