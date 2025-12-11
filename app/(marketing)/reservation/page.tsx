'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DateGuestTab from '@/components/reservation/tabs/date-guest-tab';
import RoomSelectionTab from '@/components/reservation/tabs/room-selection-tab';
import GuestDetailsTab from '@/components/reservation/tabs/guest-details-tab';
import ReviewTab from '@/components/reservation/tabs/review-tab';
import ConfirmationTab from '@/components/reservation/tabs/confirmation-tab';
import ReservationSummaryCard from '@/components/reservation/reservation-summary-card';

import type { Room } from '@/types';

export interface ReservationData {
  checkIn?: Date;
  checkOut?: Date;
  guests?: number;
  nights?: number;
  selectedRoom?: Room;
  fullName?: string;
  email?: string;
  phone?: string;
  specialRequests?: string;
  totalPrice?: number;
}

type TabValue = 'dates' | 'room' | 'details' | 'review' | 'confirmation';

export default function ReservationPage() {
  const [currentTab, setCurrentTab] = useState<TabValue>('dates');
  const [reservationData, setReservationData] = useState<ReservationData>({
    guests: 1,
  });
  const [requestNumber, setRequestNumber] = useState<string>();

  const updateReservationData = (data: Partial<ReservationData>) => {
    setReservationData({ ...reservationData, ...data });
  };

  const handleSubmit = async () => {
    const toastId = toast.loading('Submitting your reservation...');

    try {
      // Split name
      const nameParts = reservationData.fullName?.trim().split(/\s+/) || [];
      const firstName = nameParts[0] || '';
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

      // Validate required fields
      if (!firstName) {
        toast.error('Please provide your full name', { id: toastId });
        return;
      }

      if (!reservationData.selectedRoom) {
        toast.error('Please select a room', { id: toastId });
        return;
      }

      const payload = {
        check_in: reservationData.checkIn?.toISOString(),
        check_out: reservationData.checkOut?.toISOString(),
        num_guests: reservationData.guests,
        room_name: reservationData.selectedRoom?.name,
        guest_first_name: firstName,
        guest_last_name: lastName,
        guest_email: reservationData.email,
        guest_phone: reservationData.phone,
        special_requests: reservationData.specialRequests || undefined,
        total_price: reservationData.totalPrice,
      };

      // Submit reservation to API
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit reservation');
      }

      // Success!
      setRequestNumber(result.confirmationId);
      setCurrentTab('confirmation');
      toast.success('Reservation submitted successfully!', {
        id: toastId,
        description: 'You will receive a confirmation email shortly.',
      });
    } catch (error) {
      console.error('Error submitting reservation:', error);
      toast.error('Failed to submit reservation', {
        id: toastId,
        description: error instanceof Error ? error.message : 'Please try again or contact support.',
      });
    }
  };

  // Determine which tabs are accessible
  const canAccessRoom = !!reservationData.checkIn && !!reservationData.checkOut && !!reservationData.guests;
  const canAccessDetails = canAccessRoom && !!reservationData.selectedRoom;
  const canAccessReview = canAccessDetails && !!reservationData.fullName && !!reservationData.email && !!reservationData.phone;

  // Handle tab changes - only allow if conditions met
  const handleTabChange = (value: string) => {
    const tab = value as TabValue;

    if (tab === 'dates') {
      setCurrentTab(tab);
    } else if (tab === 'room' && canAccessRoom) {
      setCurrentTab(tab);
    } else if (tab === 'details' && canAccessDetails) {
      setCurrentTab(tab);
    } else if (tab === 'review' && canAccessReview) {
      setCurrentTab(tab);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-warm-white overflow-hidden">
      {/* Compact Header */}
      <header className="bg-navy-600 text-white py-3 px-4 flex-shrink-0">
        <div className="container mx-auto">
          <h1 className="text-lg md:text-xl font-serif font-bold text-center">
            Book Your Stay at Debre Damo Hotel
          </h1>
        </div>
      </header>

      {/* Main Content - calc height */}
      <div className="flex-1 min-h-0">
        <div className="container mx-auto px-4 h-full py-3">
          <div className="h-full flex gap-4">
            {/* Form Section */}
            <div className="flex-1 flex flex-col min-h-0">
              <Tabs value={currentTab} onValueChange={handleTabChange} className="h-full flex flex-col">
                {/* Compact Tab Navigation */}
                {currentTab !== 'confirmation' && (
                  <TabsList className="grid w-full grid-cols-4 mb-3 flex-shrink-0 h-9">
                    <TabsTrigger value="dates" className="text-xs py-1">
                      Dates
                    </TabsTrigger>
                    <TabsTrigger value="room" disabled={!canAccessRoom} className="text-xs py-1">
                      Room
                    </TabsTrigger>
                    <TabsTrigger value="details" disabled={!canAccessDetails} className="text-xs py-1">
                      Details
                    </TabsTrigger>
                    <TabsTrigger value="review" disabled={!canAccessReview} className="text-xs py-1">
                      Review
                    </TabsTrigger>
                  </TabsList>
                )}

                {/* Scrollable Content */}
                <div className="flex-1 min-h-0 overflow-y-auto">
                  <TabsContent value="dates" className="mt-0 h-auto">
                    <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
                      <DateGuestTab
                        data={reservationData}
                        onUpdate={updateReservationData}
                        onNext={() => setCurrentTab('room')}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="room" className="mt-0 h-auto">
                    <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
                      <RoomSelectionTab
                        data={reservationData}
                        onUpdate={updateReservationData}
                        onNext={() => setCurrentTab('details')}
                        onBack={() => setCurrentTab('dates')}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="details" className="mt-0 h-auto">
                    <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
                      <GuestDetailsTab
                        data={reservationData}
                        onUpdate={updateReservationData}
                        onNext={() => setCurrentTab('review')}
                        onBack={() => setCurrentTab('room')}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="review" className="mt-0 h-auto">
                    <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
                      <ReviewTab
                        data={reservationData}
                        onBack={() => setCurrentTab('details')}
                        onSubmit={handleSubmit}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="confirmation" className="mt-0 h-auto">
                    <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
                      <ConfirmationTab
                        data={reservationData}
                        requestNumber={requestNumber}
                      />
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>

            {/* Compact Summary Card - Desktop Only */}
            {currentTab !== 'confirmation' && (
              <div className="hidden lg:block w-72 flex-shrink-0">
                <ReservationSummaryCard data={reservationData} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
