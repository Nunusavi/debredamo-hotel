"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "./navigation";
import MobileMenu from "./mobile-menu";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { generateGenericReservationEmail } from "@/lib/mailto";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    // This is intentional - we want to close the menu when navigating to a new page
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isHomePage = pathname === "/";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all text-black duration-300",
          isScrolled || !isHomePage
            ? "bg-white/95 backdrop-blur-md shadow-md"
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <Image
                src="/images/Debredamo_new.webp"
                alt="DEBREDAMO HOTEL logo"
                width={100}
                height={70}
              />
              <div className="flex flex-col">
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <Navigation isScrolled={isScrolled || !isHomePage} />
            </div>

            {/* CTA Button - Desktop */}
            <div className="hidden lg:block">
              <a href={generateGenericReservationEmail()}>
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold"
                >
                  Book Now
                </Button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "lg:hidden p-2 rounded-md transition-colors",
                isScrolled || !isHomePage
                  ? "text-gray-800 hover:bg-green-50"
                  : "text-black hover:bg-white/10"
              )}
              aria-label="Toggle menu"
              type="button"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Spacer to prevent content from being hidden under fixed header */}
      <div className="h-20" />
    </>
  );
}
