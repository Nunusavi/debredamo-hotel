// Debredamo Hotel - Navigation Configuration

import type { NavLink } from '@/types';

export const mainNavigation: NavLink[] = [
  {
    label: 'Home',
    label_am: 'መነሻ',
    href: '/',
  },
  {
    label: 'Accommodation',
    label_am: 'መኖሪያ',
    href: '/accommodation',
  },
  {
    label: 'Services',
    label_am: 'አገልግሎቶች',
    href: '/services',
  },
  {
    label: 'About',
    label_am: 'ስለኛ',
    href: '/about',
  },
  {
    label: 'Blog',
    label_am: 'ብሎግ',
    href: '/blog',
  },
  {
    label: 'Contact',
    label_am: 'አግኙን',
    href: '/contact',
  },
];

export const footerNavigation = {
  about: {
    title: { en: 'About Us', am: 'ስለኛ' },
    links: [
      { label: 'Our Story', label_am: 'ታሪካችን', href: '/about' },
      { label: 'Location', label_am: 'አድራሻ', href: '/about#location' },
      { label: 'Contact', label_am: 'አግኙን', href: '/contact' },
    ],
  },
  rooms: {
    title: { en: 'Accommodation', am: 'መኖሪያ' },
    links: [
      { label: 'All Rooms', label_am: 'ሁሉም ክፍሎች', href: '/accommodation' },
      { label: 'Standard Room', label_am: 'መደበኛ ክፍል', href: '/accommodation/standard-room' },
      { label: 'Deluxe Room', label_am: 'ልዩ ክፍል', href: '/accommodation/deluxe-room' },
      { label: 'Executive Suite', label_am: 'ስራ አስፈፃሚ ስዊት', href: '/accommodation/executive-suite' },
    ],
  },
  services: {
    title: { en: 'Services', am: 'አገልግሎቶች' },
    links: [
      { label: 'Restaurant', label_am: 'ምግብ ቤት', href: '/services#restaurant' },
      { label: 'Bar & Lounge', label_am: 'ባር', href: '/services#bar' },
      { label: 'Business Center', label_am: 'የንግድ ማእከል', href: '/services#business' },
      { label: 'Concierge', label_am: 'ኮንሲየርጅ', href: '/services#concierge' },
    ],
  },
  legal: {
    title: { en: 'Legal', am: 'ህጋዊ' },
    links: [
      { label: 'Privacy Policy', label_am: 'የግላዊነት ፖሊሲ', href: '/privacy' },
      { label: 'Terms of Service', label_am: 'የአገልግሎት ውሎች', href: '/terms' },
      { label: 'Cookie Policy', label_am: 'የኩኪ ፖሊሲ', href: '/cookies' },
    ],
  },
};

export const adminNavigation = [
  {
    label: 'Dashboard',
    href: '/admin',
    icon: 'layout-dashboard',
  },
  {
    label: 'Rooms',
    href: '/admin/rooms',
    icon: 'bed',
  },
  {
    label: 'Reservations',
    href: '/admin/reservations',
    icon: 'calendar-check',
  },
  {
    label: 'Availability',
    href: '/admin/availability',
    icon: 'calendar',
  },
  {
    label: 'Content',
    href: '/admin/content',
    icon: 'file-text',
  },
  {
    label: 'Settings',
    href: '/admin/settings',
    icon: 'settings',
  },
];
