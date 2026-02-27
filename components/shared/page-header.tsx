import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  children?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  description,
  backgroundImage,
  children,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "relative bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white py-20 md:py-32",
        backgroundImage && "bg-cover bg-center",
        className
      )}
      style={
        backgroundImage
          ? {
              backgroundImage: `linear-gradient(rgba(26, 35, 50, 0.85), rgba(26, 35, 50, 0.85)), url(${backgroundImage})`,
            }
          : undefined
      }
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center  mx-auto">
          {subtitle && (
            <p className="text-green-400 font-medium text-sm sm:text-base tracking-wide uppercase mb-2 sm:mb-4">
              {subtitle}
            </p>
          )}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
            {title}
          </h1>
          {description && (
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
              {description}
            </p>
          )}
          {children && <div className="mt-6 sm:mt-8">{children}</div>}
        </div>
      </div>
    </div>
  );
}
