"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { mainNavigation } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { Separator } from "@/components/ui/separator";
import { generateGenericReservationEmail } from "@/lib/mailto";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 bg-white">
        <div className="flex flex-col h-full">
          {/* Header with Logo */}
          <div className="p-6 pb-4">
            <div className="flex items-center space-x-3 mb-2">
              <Image
                src="/images/Debredamo.webp"
                alt="DEBREDAMO HOTEL logo"
                width={45}
                height={45}
              />
              <div>
                <h2 className="text-2xl font-serif font-bold text-gray-900">
                  {siteConfig.name.en}
                </h2>
              </div>
            </div>
            <Separator className="mt-4" />
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-6 overflow-y-auto">
            <ul className="space-y-1">
              {mainNavigation.map((link) => {
                const active = isActive(link.href);

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={cn(
                        "block px-4 py-4 rounded-lg font-medium text-lg transition-all duration-200",
                        active
                          ? "bg-gold-50 text-gold-600 border-l-4 border-gold-500"
                          : "text-gray-800 hover:bg-warm-white hover:text-gold-500 border-l-4 border-transparent"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <Separator />

          {/* CTA Section */}
          <div className="p-6 bg-warm-white">
            <a
              href={generateGenericReservationEmail()}
              onClick={onClose}
              className="block mb-3"
            >
              <Button
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold h-14 text-base"
              >
                Book Now
              </Button>
            </a>
            <Link href="/contact" onClick={onClose} className="block">
              <Button
                size="lg"
                variant="outline"
                className="w-full border-2 border-green-200 text-gray-800 hover:bg-green-50 hover:border-green-300 h-12"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
