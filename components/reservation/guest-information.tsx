'use client';

import { useState } from 'react';
import { ChevronRight, ChevronLeft, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { ReservationData } from '@/app/(marketing)/reservation/page';

interface GuestInformationProps {
  data: ReservationData;
  onUpdate: (data: Partial<ReservationData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function GuestInformation({
  data,
  onUpdate,
  onNext,
  onBack,
}: GuestInformationProps) {
  // Parse fullName into firstName and lastName if it exists
  const nameParts = data.fullName?.split(' ') || [];
  const [formData, setFormData] = useState({
    firstName: nameParts[0] || '',
    lastName: nameParts.slice(1).join(' ') || '',
    email: data.email || '',
    phone: data.phone || '',
    specialRequests: data.specialRequests || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^(\+251|0)?[0-9]{9,10}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleContinue = () => {
    if (!validateForm()) {
      return;
    }

    onUpdate({
      fullName: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      phone: formData.phone,
      specialRequests: formData.specialRequests,
    });
    onNext();
  };

  return (
    <Card className="p-6 md:p-8">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-navy-700 mb-2">
            Your Information
          </h2>
          <p className="text-navy-500">
            Please provide your contact details for the reservation
          </p>
        </div>

        {/* Form */}
        <div className="space-y-5">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-navy-700 font-semibold">
                First Name *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-400" />
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="pl-10 h-12"
                />
              </div>
              {errors.firstName && (
                <p className="text-sm text-red-500">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-navy-700 font-semibold">
                Last Name *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-400" />
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="pl-10 h-12"
                />
              </div>
              {errors.lastName && (
                <p className="text-sm text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-navy-700 font-semibold">
              Email Address *
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-400" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={handleChange}
                className="pl-10 h-12"
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
            <p className="text-xs text-navy-500">
              We&apos;ll send your confirmation to this email
            </p>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-navy-700 font-semibold">
              Phone Number *
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-400" />
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+251 911 123 456"
                value={formData.phone}
                onChange={handleChange}
                className="pl-10 h-12"
              />
            </div>
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          {/* Special Requests */}
          <div className="space-y-2">
            <Label htmlFor="specialRequests" className="text-navy-700 font-semibold">
              Special Requests (Optional)
            </Label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-navy-400" />
              <Textarea
                id="specialRequests"
                name="specialRequests"
                placeholder="Any special requirements or requests? (e.g., early check-in, late check-out, accessibility needs)"
                value={formData.specialRequests}
                onChange={handleChange}
                className="pl-10 min-h-[100px] resize-none"
              />
            </div>
            <p className="text-xs text-navy-500">
              We&apos;ll do our best to accommodate your requests
            </p>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="bg-navy-50 border border-navy-200 rounded-lg p-4">
          <p className="text-sm text-navy-600">
            <strong>Privacy Notice:</strong> Your information will be used solely for
            this reservation and will be handled in accordance with our privacy policy.
            We will not share your details with third parties.
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-4">
          <Button
            onClick={onBack}
            variant="outline"
            size="lg"
            className="border-navy-200"
          >
            <ChevronLeft className="mr-2 h-5 w-5" />
            Back
          </Button>
          <Button
            onClick={handleContinue}
            size="lg"
            className="bg-gold-500 hover:bg-gold-600 text-white"
          >
            Review Reservation
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
