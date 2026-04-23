import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleSidebar: () => void;
  toggleSidebarCollapse: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: 'light',
      sidebarOpen: true,
      sidebarCollapsed: false,
      toggleTheme: () =>
        set(state => {
          const next = state.theme === 'light' ? 'dark' : 'light';
          document.documentElement.classList.toggle('dark', next === 'dark');
          return { theme: next };
        }),
      setTheme: (theme) => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        set({ theme });
      },
      toggleSidebar: () => set(state => ({ sidebarOpen: !state.sidebarOpen })),
      toggleSidebarCollapse: () => set(state => ({ sidebarCollapsed: !state.sidebarCollapsed })),
    }),
    { name: 'ui-storage', partialize: state => ({ theme: state.theme, sidebarCollapsed: state.sidebarCollapsed }) }
  )
);
