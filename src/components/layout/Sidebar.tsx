import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, BarChart3, Settings, User,
  ChevronLeft, ChevronRight, X, Zap
} from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';
import { cn } from '../../lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
  { icon: BarChart3, label: 'Analytics', to: '/analytics' },
  { icon: Users, label: 'Users', to: '/users' },
  { icon: User, label: 'Profile', to: '/profile' },
  { icon: Settings, label: 'Settings', to: '/settings' },
];

export const Sidebar: React.FC = () => {
  const { sidebarOpen, sidebarCollapsed, toggleSidebar, toggleSidebarCollapse } = useUIStore();
  const location = useLocation();

  const sidebarContent = (
    <div className={cn('flex flex-col h-full', sidebarCollapsed ? 'w-16' : 'w-64')}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
        {!sidebarCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm text-gray-900 dark:text-gray-100">Navigation</span>
          </div>
        )}
        <button
          onClick={toggleSidebarCollapse}
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hidden lg:flex"
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? <ChevronRight className="w-4 h-4 text-gray-500" /> : <ChevronLeft className="w-4 h-4 text-gray-500" />}
        </button>
        <button onClick={toggleSidebar} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors lg:hidden" aria-label="Close sidebar">
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 p-3 space-y-1" aria-label="Main navigation">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => cn('sidebar-item', isActive && 'active')}
            title={sidebarCollapsed ? item.label : undefined}
            aria-label={item.label}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Upgrade banner */}
      {!sidebarCollapsed && (
        <div className="p-3">
          <div className="bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl p-4 text-white">
            <p className="text-xs font-semibold mb-1">Upgrade to Pro</p>
            <p className="text-xs opacity-80 mb-3">Unlock all features and remove limits.</p>
            <button className="w-full bg-white/20 hover:bg-white/30 text-white text-xs font-semibold py-1.5 rounded-lg transition-colors">
              Upgrade now
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full z-40 glass-card border-r border-gray-200/50 dark:border-gray-700/50 lg:hidden"
          >
            {sidebarContent}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside className={cn(
        'hidden lg:flex flex-col glass-card border-r border-gray-200/50 dark:border-gray-700/50 h-full transition-all duration-300',
        sidebarCollapsed ? 'w-16' : 'w-64'
      )}>
        {sidebarContent}
      </aside>
    </>
  );
};
