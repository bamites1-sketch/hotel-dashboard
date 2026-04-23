import React from 'react';
import { cn } from '../../lib/utils';

interface SkeletonProps {
  className?: string;
  lines?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => (
  <div className={cn('animate-pulse bg-gray-200 dark:bg-gray-800 rounded-lg', className)} aria-hidden="true" />
);

export const SkeletonCard: React.FC = () => (
  <div className="card p-6 space-y-4" aria-busy="true" aria-label="Loading...">
    <div className="flex items-center gap-3">
      <Skeleton className="w-10 h-10 rounded-xl" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
    <Skeleton className="h-8 w-2/3" />
    <Skeleton className="h-3 w-full" />
    <Skeleton className="h-3 w-4/5" />
  </div>
);

export const SkeletonTable: React.FC = () => (
  <div className="space-y-3" aria-busy="true" aria-label="Loading table...">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="flex gap-4 items-center p-4 card">
        <Skeleton className="w-8 h-8 rounded-full" />
        <Skeleton className="h-4 flex-1" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    ))}
  </div>
);
