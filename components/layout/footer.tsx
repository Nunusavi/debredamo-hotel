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
              <h3 className="text-2xl font-serif font-bold text-green-400">
                {siteConfig.name.en}
              </h3>
            </div>
            <p className="text-green-200 text-sm leading-relaxed">
              Experience luxury and comfort in the heart of Addis Ababa. Your
              home away from home.
            </p>
          </div>
          {/* Quick Links - About */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-green-400">
              {footerNavigation.about.title.en}
            </h4>
            <ul className="space-y-2">
              {footerNavigation.about.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-green-200 hover:text-green-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Quick Links - Rooms */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-green-400">
              {footerNavigation.rooms.title.en}
            </h4>
            <ul className="space-y-2">
              {footerNavigation.rooms.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-green-200 hover:text-green-400 transition-colors text-sm"
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
              <h4 className="text-lg font-semibold mb-4 text-green-400">
                Contact Us
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3 text-sm">
                  <MapPin className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-green-200">
                    {siteConfig.contact.address.street},{" "}
                    {siteConfig.contact.address.city}
                  </span>
                </li>
                <li className="flex items-center space-x-3 text-sm">
                  <Phone className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <div className="flex flex-col">
                    <a
                      href={`tel:${siteConfig.contact.phone}`}
                      className="text-green-200 hover:text-green-400 transition-colors"
                    >
                      {siteConfig.contact.phone}
                    </a>
                    {siteConfig.contact.phone2 && (
                      <a
                        href={`tel:${siteConfig.contact.phone2}`}
                        className="text-green-200 hover:text-green-400 transition-colors"
                      >
                        {siteConfig.contact.phone2}
                      </a>
                    )}
                  </div>
                </li>
                <li className="flex items-center space-x-3 text-sm">
                  <Mail className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-green-200 hover:text-green-400 transition-colors"
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
                  className="text-green-300 hover:text-green-400 transition-colors text-sm"
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
