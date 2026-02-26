// DEBREDAMO HOTEL - Navigation Configuration

import type { NavLink } from "@/types";

export const mainNavigation: NavLink[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Accommodation",
    href: "/accommodation",
  },
  {
    label: "Restaurant",
    href: "/restaurant",
  },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export const footerNavigation = {
  about: {
    title: { en: "About Us" },
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Location", href: "/about#location" },
      { label: "Contact", href: "/contact" },
    ],
  },
  rooms: {
    title: { en: "Accommodation" },
    links: [
      { label: "All Rooms", href: "/accommodation" },
      {
        label: "Standard Room",
        href: "/accommodation/standard-room",
      },
      {
        label: "Deluxe Room",
        href: "/accommodation/deluxe-room",
      },
      {
        label: "Damo Suite",
        href: "/accommodation/damo-suite",
      },
    ],
  },
  services: {
    title: { en: "Services" },
    links: [
      { label: "Restaurant", href: "/restaurant" },
      { label: "Bar & Lounge", href: "/services#bar" },
      {
        label: "Business Center",
        href: "/services#business",
      },
      { label: "Concierge", href: "/services#concierge" },
    ],
  },
  legal: {
    title: { en: "Connect" },
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Book Now", href: "mailto:reservation@debredamohotel.com" },
    ],
  },
};

export const adminNavigation = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: "layout-dashboard",
  },
  {
    label: "Rooms",
    href: "/admin/rooms",
    icon: "bed",
  },
  {
    label: "Content",
    href: "/admin/content",
    icon: "file-text",
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: "settings",
  },
];
