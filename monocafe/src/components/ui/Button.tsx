import React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-crimson-500 text-white hover:bg-crimson-600 shadow-md active:translate-y-0.5',
      secondary: 'bg-coffee-600 text-white hover:bg-coffee-800 shadow-md active:translate-y-0.5',
      outline: 'border-2 border-coffee-600 text-coffee-600 hover:bg-coffee-50 active:translate-y-0.5',
      ghost: 'hover:bg-coffee-500/10 text-coffee-800',
      danger: 'bg-red-500 text-white hover:bg-red-600 shadow-md',
    };

    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-12 px-6 text-base',
      lg: 'h-14 px-8 text-lg',
      icon: 'h-10 w-10 p-2',
    };

    return (
      <motion.button
        ref={ref} // Framer motion can handle refs, but for simple buttons we might not need full motion props on the ref
        whileTap={{ scale: 0.98 }}
        className={cn(
          'inline-flex items-center justify-center rounded-2xl font-hand font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coffee-500 disabled:pointer-events-none disabled:opacity-50',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          children
        )}
      </motion.button>
    );
  }
);
Button.displayName = 'Button';

export { Button };
