import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const CustomButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    return (
      <button
        className={cn(
          'px-4 py-2 rounded-2xl font-medium transition-colors',
          variant === 'primary' 
            ? 'bg-[#2ecc71] hover:bg-[#27ae60] text-white' 
            : 'bg-[#1a3b4f] hover:bg-[#234b63] text-white',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);