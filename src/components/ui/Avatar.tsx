import React from 'react';
import { cn } from '../../lib/utils';

interface AvatarProps {
  src?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizes = { sm: 'w-7 h-7 text-xs', md: 'w-9 h-9 text-sm', lg: 'w-12 h-12 text-base', xl: 'w-16 h-16 text-xl' };

function getInitials(name?: string) {
  if (!name) return '?';
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
}

function getColor(name?: string) {
  const colors = ['from-blue-400 to-blue-600', 'from-purple-400 to-purple-600', 'from-pink-400 to-pink-600',
                  'from-emerald-400 to-emerald-600', 'from-amber-400 to-amber-600', 'from-cyan-400 to-cyan-600'];
  const idx = (name?.charCodeAt(0) ?? 0) % colors.length;
  return colors[idx];
}

export const Avatar: React.FC<AvatarProps> = ({ src, name, size = 'md', className }) => (
  <div className={cn('rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center font-semibold text-white', sizes[size], !src && `bg-gradient-to-br ${getColor(name)}`, className)}>
    {src ? (
      <img src={src} alt={name || 'Avatar'} className="w-full h-full object-cover" />
    ) : (
      getInitials(name)
    )}
  </div>
);
