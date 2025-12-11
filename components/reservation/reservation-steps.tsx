'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReservationStepsProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
}

const steps = [
  { number: 1, title: 'Dates & Guests', description: 'When will you stay?' },
  { number: 2, title: 'Select Room', description: 'Choose your room' },
  { number: 3, title: 'Your Details', description: 'Guest information' },
  { number: 4, title: 'Confirm', description: 'Review & submit' },
];

export default function ReservationSteps({
  currentStep,
  totalSteps,
  onStepClick,
}: ReservationStepsProps) {
  return (
    <div className="w-full">
      {/* Mobile: Simple Progress Bar */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-navy-600">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-navy-500">
            {steps[currentStep - 1].title}
          </span>
        </div>
        <div className="w-full bg-navy-100 rounded-full h-2">
          <div
            className="bg-gold-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop: Detailed Steps */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;
            const isClickable = step.number <= currentStep;

            return (
              <div key={step.number} className="flex items-center flex-1">
                {/* Step Circle */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => isClickable && onStepClick(step.number)}
                    disabled={!isClickable}
                    className={cn(
                      'relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-200',
                      isCompleted &&
                        'bg-gold-500 border-gold-500 text-white hover:bg-gold-600',
                      isCurrent &&
                        'bg-white border-gold-500 text-gold-500 ring-4 ring-gold-100',
                      !isCompleted &&
                        !isCurrent &&
                        'bg-white border-navy-200 text-navy-400',
                      isClickable && !isCompleted && 'cursor-pointer hover:border-gold-400',
                      !isClickable && 'cursor-not-allowed'
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <span className="text-lg font-semibold">{step.number}</span>
                    )}
                  </button>

                  {/* Step Text */}
                  <div className="mt-3 text-center">
                    <div
                      className={cn(
                        'text-sm font-semibold transition-colors',
                        (isCompleted || isCurrent) && 'text-navy-700',
                        !isCompleted && !isCurrent && 'text-navy-400'
                      )}
                    >
                      {step.title}
                    </div>
                    <div className="text-xs text-navy-500 mt-1 hidden lg:block">
                      {step.description}
                    </div>
                  </div>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 h-0.5 mx-4 -mt-8">
                    <div
                      className={cn(
                        'h-full transition-colors duration-300',
                        currentStep > step.number ? 'bg-gold-500' : 'bg-navy-200'
                      )}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
