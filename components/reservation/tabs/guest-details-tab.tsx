'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, ChevronRight, User, Mail, Phone, MessageSquare } from 'lucide-react';
import type { ReservationData } from '@/app/(marketing)/reservation/page';

interface GuestDetailsTabProps {
  data: ReservationData;
  onUpdate: (data: Partial<ReservationData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function GuestDetailsTab({
  data,
  onUpdate,
  onNext,
  onBack,
}: GuestDetailsTabProps) {
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    phone?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};

    // Full name validation
    if (!data.fullName || data.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!data.phone || !phoneRegex.test(data.phone) || data.phone.replace(/\D/g, '').length < 9) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const handleInputChange = (field: keyof ReservationData, value: string) => {
    onUpdate({ [field]: value });
    // Clear error for this field when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-lg font-bold text-navy-600 mb-0.5">Guest Information</h2>
        <p className="text-xs text-gray-600">Please provide your contact details</p>
      </div>

      {/* Full Name */}
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-base font-medium">
          Full Name <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            id="fullName"
            type="text"
            placeholder="John Doe"
            value={data.fullName || ''}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            className={`pl-10 h-10 ${errors.fullName ? 'border-red-500' : ''}`}
          />
        </div>
        {errors.fullName && (
          <p className="text-sm text-red-600">{errors.fullName}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-base font-medium">
          Email Address <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            id="email"
            type="email"
            placeholder="john.doe@example.com"
            value={data.email || ''}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`pl-10 h-10 ${errors.email ? 'border-red-500' : ''}`}
          />
        </div>
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email}</p>
        )}
        <p className="text-xs text-gray-500">
          We&apos;ll send your booking confirmation to this email
        </p>
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-base font-medium">
          Phone Number <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            id="phone"
            type="tel"
            placeholder="+251 91 234 5678"
            value={data.phone || ''}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className={`pl-10 h-10 ${errors.phone ? 'border-red-500' : ''}`}
          />
        </div>
        {errors.phone && (
          <p className="text-sm text-red-600">{errors.phone}</p>
        )}
      </div>

      {/* Special Requests */}
      <div className="space-y-2">
        <Label htmlFor="specialRequests" className="text-base font-medium">
          Special Requests <span className="text-gray-400 text-sm font-normal">(Optional)</span>
        </Label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Textarea
            id="specialRequests"
            placeholder="Do you have any special requests? (e.g., early check-in, extra pillows, dietary requirements)"
            value={data.specialRequests || ''}
            onChange={(e) => handleInputChange('specialRequests', e.target.value)}
            className="pl-10 min-h-[80px] resize-none text-sm"
            maxLength={500}
          />
        </div>
        <p className="text-xs text-gray-500">
          {(data.specialRequests || '').length}/500 characters
        </p>
      </div>

      {/* Privacy Notice */}
      <div className="p-2 bg-blue-50 rounded border border-blue-100">
        <p className="text-xs text-blue-800">
          Your information is secure and will only be used to process your reservation and
          communicate with you about your stay.
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-3 border-t">
        <Button onClick={onBack} variant="outline">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button
          onClick={handleContinue}
          className="bg-gold-500 hover:bg-gold-600 text-white"
        >
          Continue to Review
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
