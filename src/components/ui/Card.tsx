import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className, glass, hover, onClick }) => (
  <div
    className={cn(
      glass ? 'glass-card' : 'card',
      hover && 'hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer',
      'rounded-2xl p-6',
      className
    )}
    onClick={onClick}
    role={onClick ? 'button' : undefined}
    tabIndex={onClick ? 0 : undefined}
  >
    {children}
  </div>
);

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn('mb-4', className)}>{children}</div>
);

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <h3 className={cn('text-lg font-semibold text-gray-900 dark:text-gray-100', className)}>{children}</h3>
);
