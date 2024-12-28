import { cn } from '@/lib/utils';
import { InputHTMLAttributes, forwardRef } from 'react';

export const CustomInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      className={cn(
        'w-full px-4 py-3 rounded-2xl bg-[#1a3b4f] border-0 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#2ecc71] transition-shadow',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});