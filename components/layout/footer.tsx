"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { footerNavigation } from "@/config/navigation";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-green-800 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Hotel Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-serif font-bold text-gold-400">
                {siteConfig.name.en}
              </h3>
              <p className="text-sm font-ethiopic text-gold-300 mt-1">
                {siteConfig.name.am}
              </p>
            </div>
            <p className="text-green-200 text-sm leading-relaxed">
              Experience luxury and comfort in the heart of Addis Ababa. Your
              home away from home.
            </p>

            {/* Social Media */}
            <div className="flex items-center space-x-4 pt-2">
              {siteConfig.links.facebook && (
                <a
                  href={siteConfig.links.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-green-500 hover:bg-gold-500 flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {siteConfig.links.instagram && (
                <a
                  href={siteConfig.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-green-500 hover:bg-gold-500 flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {siteConfig.links.tripadvisor && (
                <a
                  href={siteConfig.links.tripadvisor}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-green-500 hover:bg-gold-500 flex items-center justify-center transition-colors"
                  aria-label="TripAdvisor"
                >
                  <svg
                    viewBox="0 0 1024 1024"
                    fill="currentColor"
                    className="w-5 h-5 text-white"
                  >
                    <path d="M627 348c-39.2 0-70.9 31.8-70.9 70.9s31.8 70.9 70.9 70.9 70.9-31.8 70.9-70.9-31.7-70.9-70.9-70.9z m-230 0c-39.2 0-70.9 31.8-70.9 70.9s31.8 70.9 70.9 70.9 70.9-31.8 70.9-70.9-31.7-70.9-70.9-70.9zM920.8 459c0-10.7-3.7-21.5-11.2-31-31.5-39.8-74.8-63.1-125.7-63.1-39.7 0-76.8 14-108.6 40.5-38.3-24.8-87.3-41-163.3-41-76 0-125 16.2-163.3 41-31.8-26.4-68.9-40.5-108.6-40.5-50.8 0-94.1 23.3-125.7 63.1-7.5 9.5-11.2 20.3-11.2 31 0 52.8 9.9 101.9 34.3 145.7l-48.5 48.5c-8.8 8.8-8.8 23 0 31.8 4.4 4.4 10.1 6.6 15.9 6.6s11.5-2.2 15.9-6.6l49.9-49.9C103.7 671.3 162 701.2 240.2 701.2c84.1 0 159.9-42.3 206.2-106.6 22 28.2 55.4 46.2 92.8 46.2 11.5 0 22.7-1.7 33.3-4.9-1.3-6.5-2-13.2-2-20.1 0-54.3 44-98.3 98.3-98.3 20 0 38.6 6 54.4 16.3 32.7-27.5 53.6-69 53.6-115zM240.2 626.8c-76.3 0-138.4-62.1-138.4-138.4 0-76.3 62.1-138.4 138.4-138.4 76.3 0 138.4 62.1 138.4 138.4 0 76.3-62.1 138.4-138.4 138.4z m528 20.2c-29.4 0-53.3-23.9-53.3-53.3 0-29.4 23.9-53.3 53.3-53.3 29.4 0 53.3 23.9 53.3 53.3 0 29.4-23.9 53.3-53.3 53.3z m117.4-40.9l49.9 49.9c4.4 4.4 10.1 6.6 15.9 6.6s11.5-2.2 15.9-6.6c8.8-8.8 8.8-23 0-31.8l-48.5-48.5c24.4-43.8 34.3-92.8 34.3-145.7 0-10.7-3.7-21.5-11.2-31-31.5-39.8-74.8-63.1-125.7-63.1-39.7 0-76.8 14-108.6 40.5-38.3-24.8-87.3-41-163.3-41-4.9 0-9.8.1-14.7.2 3.8 4.6 7.3 9.4 10.4 14.5 98.7 6.4 179.9 76.2 203.4 171.2 13 4 26.8 6.1 41.1 6.1 37.4 0 70.8-18 92.8-46.2 46.2 64.3 122.1 106.6 206.2 106.6 78.2 0 136.5-29.9 170.6-65.4z m-156.1-81.8c15.8-10.3 34.4-16.3 54.4-16.3 54.3 0 98.3 44 98.3 98.3 0 6.9-.7 13.6-2 20.1 10.6 3.2 21.8 4.9 33.3 4.9 37.4 0 70.8-18 92.8-46.2 0-46-20.9-87.5-53.6-115-31.8-26.4-68.9-40.5-108.6-40.5-50.8 0-94.1 23.3-125.7 63.1-7.5 9.5-11.2 20.3-11.2 31 0 .2.1.4.1.6 7.2.1 14.5.1 21.8.1.1-.4.2-.8.4-1.1z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links - About */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gold-400">
              {footerNavigation.about.title.en}
            </h4>
            <ul className="space-y-2">
              {footerNavigation.about.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-green-200 hover:text-gold-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links - Rooms */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gold-400">
              {footerNavigation.rooms.title.en}
            </h4>
            <ul className="space-y-2">
              {footerNavigation.rooms.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-green-200 hover:text-gold-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info & Newsletter */}
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gold-400">
                Contact Us
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3 text-sm">
                  <MapPin className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                  <span className="text-green-200">
                    {siteConfig.contact.address.street},{" "}
                    {siteConfig.contact.address.city}
                  </span>
                </li>
                <li className="flex items-center space-x-3 text-sm">
                  <Phone className="w-5 h-5 text-gold-400 flex-shrink-0" />
                  <div className="flex flex-col">
                    <a
                      href={`tel:${siteConfig.contact.phone}`}
                      className="text-green-200 hover:text-gold-400 transition-colors"
                    >
                      {siteConfig.contact.phone}
                    </a>
                    {siteConfig.contact.phone2 && (
                      <a
                        href={`tel:${siteConfig.contact.phone2}`}
                        className="text-green-200 hover:text-gold-400 transition-colors"
                      >
                        {siteConfig.contact.phone2}
                      </a>
                    )}
                  </div>
                </li>
                <li className="flex items-center space-x-3 text-sm">
                  <Mail className="w-5 h-5 text-gold-400 flex-shrink-0" />
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-green-200 hover:text-gold-400 transition-colors"
                  >
                    {siteConfig.contact.email}
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-500">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <p className="text-green-300 text-sm text-center md:text-left">
              © {currentYear} {siteConfig.name.en}. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex items-center space-x-6">
              {footerNavigation.legal.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-green-300 hover:text-gold-400 transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
