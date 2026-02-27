"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNavigation } from "@/config/navigation";
import { cn } from "@/lib/utils";

interface NavigationProps {
  isScrolled?: boolean;
}

export default function Navigation({ isScrolled = false }: NavigationProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="flex items-center space-x-8">
      {mainNavigation.map((link) => {
        const active = isActive(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "relative text-lg font-medium transition-colors duration-200",
              "hover:text-green-500",
              active
                ? "text-green-500"
                : isScrolled
                ? "text-gray-800"
                : "text-black",
              "after:absolute after:bottom-[-6px] after:left-0 after:h-[2px] after:w-0 after:bg-green-500 after:transition-all after:duration-300",
              active && "after:w-full",
              "hover:after:w-full"
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
