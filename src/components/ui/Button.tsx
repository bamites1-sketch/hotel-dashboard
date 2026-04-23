import React from 'react';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium px-4 py-2 rounded-xl transition-all duration-200',
  danger: 'bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg shadow-red-500/25 transition-all duration-200 hover:-translate-y-0.5',
  outline: 'border-2 border-primary-500 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 font-semibold px-6 py-2.5 rounded-xl transition-all duration-200',
};

const sizes = {
  sm: 'text-xs px-3 py-1.5',
  md: 'text-sm',
  lg: 'text-base px-8 py-3.5',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary', size = 'md', loading, icon, children, className, disabled, ...props
}) => (
  <button
    className={cn(variants[variant], sizes[size], (disabled || loading) && 'opacity-60 cursor-not-allowed pointer-events-none', className)}
    disabled={disabled || loading}
    {...props}
  >
    <span className="flex items-center gap-2 justify-center">
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : icon}
      {children}
    </span>
  </button>
);
