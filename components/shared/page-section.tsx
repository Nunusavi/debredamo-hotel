import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageSectionProps {
  children: ReactNode;
  className?: string;
  background?: 'white' | 'warm' | 'gray';
  padding?: 'sm' | 'md' | 'lg';
}

export function PageSection({
  children,
  className,
  background = 'white',
  padding = 'lg',
}: PageSectionProps) {
  const bgClasses = {
    white: 'bg-white',
    warm: 'bg-warm-white',
    gray: 'bg-gray-50',
  };

  const paddingClasses = {
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-16',
    lg: 'py-16 md:py-24',
  };

  return (
    <section
      className={cn(
        bgClasses[background],
        paddingClasses[padding],
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
