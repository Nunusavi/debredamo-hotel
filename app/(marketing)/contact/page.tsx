'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { PageSection } from '@/components/shared/page-section';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader
        subtitle="Get in Touch"
        title="Contact Us"
        description="We're here to help and answer any questions you might have"
      />

      <PageSection>
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <div className="mb-8">
              <h2 className="font-serif text-3xl font-bold text-navy-900 mb-3">
                Send Us a Message
              </h2>
              <p className="text-gray-600">
                Fill out the form below and we&apos;ll get back to you as soon as
                possible.
              </p>
            </div>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-green-900">
                    Message sent successfully!
                  </p>
                  <p className="text-sm text-green-700">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-red-900">
                    Failed to send message
                  </p>
                  <p className="text-sm text-red-700">
                    Please try again or contact us directly via phone or email.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="John Doe"
                  className="mt-1.5"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="john@example.com"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+251 911 234 567"
                    className="mt-1.5"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="subject">
                  Subject <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  placeholder="What is this regarding?"
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="message">
                  Message <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="How can we help you?"
                  rows={6}
                  className="mt-1.5 resize-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-gold-500 hover:bg-gold-600"
              >
                {isSubmitting ? (
                  <>Sending...</>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <div className="mb-8">
              <h2 className="font-serif text-3xl font-bold text-navy-900 mb-3">
                Contact Information
              </h2>
              <p className="text-gray-600">
                Reach out to us through any of these channels
              </p>
            </div>

            <div className="space-y-6 mb-8">
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-navy-900 mb-1">
                      Address
                    </h4>
                    <p className="text-gray-600">
                      123 Main Street
                      <br />
                      Addis Ababa, Ethiopia
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-navy-900 mb-1">
                      Phone
                    </h4>
                    <p className="text-gray-600">+251-11-123-4567</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Available 24/7
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-navy-900 mb-1">
                      Email
                    </h4>
                    <p className="text-gray-600 break-all">
                      reservations@debredamohotel.com
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Response within 24 hours
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-navy-900 mb-1">
                      Reception Hours
                    </h4>
                    <p className="text-gray-600">24/7 - We&apos;re always here</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Check-in: 2:00 PM | Check-out: 12:00 PM
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-semibold text-lg text-navy-900 mb-4">
                Follow Us
              </h4>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-100 hover:bg-gold-100 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 text-navy-900" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-100 hover:bg-gold-100 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-navy-900" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-100 hover:bg-gold-100 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5 text-navy-900" />
                </a>
                <a
                  href="https://wa.me/251911123456"
                  className="w-10 h-10 bg-gray-100 hover:bg-gold-100 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageSquare className="w-5 h-5 text-navy-900" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </PageSection>

      {/* Map Section */}
      <PageSection background="gray">
        <div className="text-center mb-8">
          <h2 className="font-serif text-3xl font-bold text-navy-900 mb-3">
            Find Us
          </h2>
          <p className="text-gray-600">
            Located in the heart of Addis Ababa
          </p>
        </div>
        <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl">
          {/* Placeholder for map - replace with actual map integration */}
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-gold-600 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">
                Map Integration Placeholder
              </p>
              <p className="text-sm text-gray-500">
                Integrate Google Maps or similar service here
              </p>
            </div>
          </div>
        </div>
      </PageSection>
    </>
  );
}
