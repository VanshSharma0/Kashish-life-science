import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils'; 

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800',
      secondary: 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 active:bg-emerald-300',
      outline: 'border-2 border-green-600 text-green-600 hover:bg-green-50 active:bg-green-100',
      ghost: 'bg-transparent hover:bg-black/5 text-gray-800',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg font-semibold',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
