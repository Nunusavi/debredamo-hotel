'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { mainNavigation } from '@/config/navigation';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-navy-900/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-20 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-40 lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col h-full">
              {/* Navigation Links */}
              <nav className="flex-1 px-6 py-8">
                <ul className="space-y-6">
                  {mainNavigation.map((link, index) => {
                    const active = isActive(link.href);

                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className={cn(
                            'block text-lg font-medium transition-colors duration-200 py-2',
                            active
                              ? 'text-gold-500'
                              : 'text-navy-600 hover:text-gold-500'
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <span>{link.label}</span>
                            {link.label_am && (
                              <span className="text-sm font-ethiopic text-navy-400">
                                {link.label_am}
                              </span>
                            )}
                          </div>
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* CTA Section */}
              <div className="px-6 py-6 border-t border-navy-100 bg-warm-white">
                <Link href="/reservation" onClick={onClose} className="block">
                  <Button
                    size="lg"
                    className="w-full bg-gold-500 hover:bg-gold-600 text-white font-semibold"
                  >
                    Book Now
                  </Button>
                </Link>

                <Link
                  href="/contact"
                  onClick={onClose}
                  className="block mt-3"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-navy-300 text-navy-600 hover:bg-navy-50"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
