"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { PageSection } from "@/components/shared/page-section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  WifiOff,
  Linkedin,
} from "lucide-react";
import { getUserError, logError } from "@/lib/errors";

import { siteConfig } from "@/config/site";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isNetworkError, setIsNetworkError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
        const error = getUserError(new Error(`HTTP ${response.status}`));
        setErrorMessage(error.message);
        setIsNetworkError(error.type === "network");
        logError("Contact form submission failed", response.status);
      }
    } catch (error) {
      setSubmitStatus("error");
      const userError = getUserError(error);
      setErrorMessage(userError.message);
      setIsNetworkError(userError.type === "network");
      logError("Contact form error", error);
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
              <h2 className="font-serif text-3xl font-bold text-gray-900 mb-3">
                Send Us a Message
              </h2>
              <p className="text-gray-600">
                Fill out the form below and we&apos;ll get back to you as soon
                as possible.
              </p>
            </div>

            {submitStatus === "success" && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-gray-800 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">
                    Message sent successfully!
                  </p>
                  <p className="text-sm text-gray-900">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                {isNetworkError ? (
                  <WifiOff className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <p className="font-medium text-red-900">
                    {isNetworkError
                      ? "Connection Error"
                      : "Failed to send message"}
                  </p>
                  <p className="text-sm text-red-700">{errorMessage}</p>
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
                className="w-full bg-green-600 hover:bg-green-700"
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
              <h2 className="font-serif text-3xl font-bold text-gray-900 mb-3">
                Contact Information
              </h2>
              <p className="text-gray-600">
                Reach out to us through any of these channels
              </p>
            </div>

            <div className="space-y-6 mb-8">
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 mb-1">
                      Address
                    </h4>
                    <p className="text-gray-600">
                      Haile Gebre Silase St
                      <br />
                      Addis Ababa, Ethiopia
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 mb-1">
                      Phone
                    </h4>
                    <p className="text-gray-600">{siteConfig.contact.phone}</p>
                    {siteConfig.contact.phone2 && (
                      <p className="text-gray-600">
                        {siteConfig.contact.phone2}
                      </p>
                    )}
                    <p className="text-sm text-gray-500 mt-1">Available 24/7</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 mb-1">
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
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 mb-1">
                      Reception Hours
                    </h4>
                    <p className="text-gray-600">
                      24/7 - We&apos;re always here
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Check-in: 2:00 PM | Check-out: 12:00 PM
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-semibold text-lg text-gray-900 mb-4">
                Follow Us
              </h4>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-100 hover:bg-green-100 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 text-gray-900" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-100 hover:bg-green-100 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-gray-900" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-100 hover:bg-green-100 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5 text-gray-900" />
                </a>
                <a
                  href={
                    siteConfig.links.whatsapp
                      ? `https://wa.me/${siteConfig.links.whatsapp}`
                      : "#"
                  }
                  className="w-10 h-10 bg-gray-100 hover:bg-green-100 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageSquare className="w-5 h-5 text-gray-900" />
                </a>
                {siteConfig.links.linkedin && (
                  <a
                    href={siteConfig.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-100 hover:bg-green-100 rounded-lg flex items-center justify-center transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5 text-gray-900" />
                  </a>
                )}
                {siteConfig.links.tripadvisor && (
                  <a
                    href={siteConfig.links.tripadvisor}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-100 hover:bg-green-100 rounded-lg flex items-center justify-center transition-colors"
                    aria-label="TripAdvisor"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 2304 1408"
                      width="24"
                      height="24"
                      fill="#000000"
                    >
                      <path d="M651 805q0 39-27.5 66.5T558 899q-39 0-66.5-27.5T464 805q0-38 27.5-65.5T558 712q38 0 65.5 27.5T651 805m1154-1q0 39-27.5 66.5T1711 898t-66.5-27.5T1617 804t27.5-66t66.5-27t66.5 27t27.5 66m-1040 1q0-79-56.5-136T572 612t-136.5 56.5T379 805t56.5 136.5T572 998t136.5-56.5T765 805m1153-1q0-80-56.5-136.5T1725 611q-79 0-136 56.5T1532 804t56.5 136.5T1725 997t136.5-56.5T1918 804m-1068 1q0 116-81.5 197.5T572 1084q-116 0-197.5-82T293 805t82-196.5T572 527t196.5 81.5T850 805m1154-1q0 115-81.5 196.5T1725 1082q-115 0-196.5-81.5T1447 804t81.5-196.5T1725 526q116 0 197.5 81.5T2004 804m-964 3q0-191-135.5-326.5T578 345q-125 0-231 62T179 575.5T117 807t62 231.5T347 1207t231 62q191 0 326.5-135.5T1040 807m668-573q-254-111-556-111q-319 0-573 110q117 0 223 45.5T984.5 401t122 183t45.5 223q0-115 43.5-219.5t118-180.5T1491 284t217-50m479 573q0-191-135-326.5T1726 345t-326.5 135.5T1264 807t135.5 326.5T1726 1269t326-135.5T2187 807m-266-566h383q-44 51-75 114.5T2189 470q110 151 110 337q0 156-77 288t-209 208.5t-287 76.5q-133 0-249-56t-196-155q-47 56-129 179q-11-22-53.5-82.5T1024 1168q-80 99-196.5 155.5T578 1380q-155 0-287-76.5T82 1095T5 807q0-186 110-337q-9-51-40-114.5T0 241h365Q514 141 720 84.5T1152 28q224 0 421 56t348 157" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </PageSection>

      {/* Map Section */}
      <PageSection background="gray">
        <div className="text-center mb-8">
          <h2 className="font-serif text-3xl font-bold text-gray-900 mb-3">
            Find Us
          </h2>
          <p className="text-gray-600">Located in the heart of Addis Ababa</p>
        </div>
        <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-green-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d246.28297909533703!2d38.78501793859526!3d9.01553472106364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b857377c86f7f%3A0xda307876aa0a9dca!2zRGVicmUgRGFtbyBIb3RlbCB8IGhheWEgaHVsZXQgfCDhi7DhiaXhiKgg4Yuz4YieIOGIhuGJtOGIjSB8IOGIgOGLqyDhiIHhiIjhibU!5e0!3m2!1sen!2sru!4v1765263083222!5m2!1sen!2sru"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="DEBREDAMO HOTEL Location"
          ></iframe>
        </div>
      </PageSection>
    </>
  );
}
