import { useEffect } from 'react';
import { useUIStore } from '../store/useUIStore';

/** Applies the persisted theme class on mount */
export function useThemeInit() {
  const { theme } = useUIStore();
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
}
