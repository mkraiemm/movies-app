import React from 'react';
import { ChevronDown } from 'lucide-react';
import { CustomInput } from './input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface YearPickerProps {
  value: number;
  onChange: (year: number) => void;
  min?: number;
  required?: boolean;
  className?: string;
}

export function YearPicker({ 
  value, 
  onChange, 
  min = 1888, // First movie ever made
  required = false,
  className
}: YearPickerProps) {
  const [open, setOpen] = React.useState(false);
  const currentYear = new Date().getFullYear();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue)) {
      const clampedValue = Math.min(Math.max(newValue, min), currentYear);
      onChange(clampedValue);
    }
  };

  const generateYearRange = () => {
    const years = [];
    for (let year = currentYear; year >= min; year--) {
      years.push(year);
    }
    return years;
  };

  const handleYearSelect = (year: number) => {
    onChange(year);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          <CustomInput
            type="number"
            min={min}
            max={currentYear}
            value={value}
            onChange={handleInputChange}
            onWheel={(e) => e.currentTarget.blur()}
            placeholder="Publishing year"
            required={required}
            className={cn(
              "pr-8 border border-slate-600 hover:border-slate-500 focus:border-[#2ecc71] transition-colors",
              className
            )}
          />
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        </div>
      </PopoverTrigger>
      <PopoverContent 
        className="p-0 bg-[#1a3b4f] border border-slate-600 shadow-lg" 
        style={{ width: 'var(--radix-popover-trigger-width)' }}
      >
        <div className="max-h-[200px] overflow-y-auto custom-scrollbar">
          {generateYearRange().map((year) => (
            <button
              key={year}
              onClick={() => handleYearSelect(year)}
              className={cn(
                "w-full px-4 py-2 text-left text-white hover:bg-[#234b63] transition-colors",
                year === value && "bg-[#2ecc71] hover:bg-[#2ecc71]/90"
              )}
            >
              {year}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}