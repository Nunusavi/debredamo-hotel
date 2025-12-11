import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  subtitle,
  title,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-8 md:mb-12",
        align === "center" ? "text-center  mx-auto" : "text-left",
        className
      )}
    >
      {subtitle && (
        <p className="text-gold-500 font-medium text-sm tracking-wide uppercase mb-2">
          {subtitle}
        </p>
      )}
      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-navy-900 mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
      )}
    </div>
  );
}
