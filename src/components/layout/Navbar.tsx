import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Bell, Search, Menu, X, ChevronDown, LogOut, User, Settings } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useCurrencyStore } from '../../store/currencyStore';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { cn } from '../../lib/utils';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme, toggleSidebar } = useUIStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { selectedCurrency, setCurrency } = useCurrencyStore();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <header className="sticky top-0 z-40 w-full glass-card border-b border-gray-200/50 dark:border-gray-700/50 px-4 lg:px-6 h-16 flex items-center gap-4">
      {/* Sidebar toggle */}
      {isAuthenticated && (
        <button onClick={toggleSidebar} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors lg:hidden" aria-label="Toggle sidebar">
          <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      )}

      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 font-bold text-xl mr-4">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
          <span className="text-white text-sm font-black">N</span>
        </div>
        <span className="gradient-text hidden sm:block">Nexus</span>
      </Link>

      {/* Search */}
      {isAuthenticated && (
        <div className="hidden md:flex flex-1 max-w-md relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="search"
            placeholder="Search anything..."
            className="input-field pl-10 py-2 text-sm"
            aria-label="Search"
          />
        </div>
      )}

      <div className="ml-auto flex items-center gap-2">
        {/* Currency switcher */}
        <div className="flex items-center rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden text-xs font-semibold">
          {(['ETB', 'USD'] as const).map(c => (
            <button
              key={c}
              onClick={() => setCurrency(c)}
              className={cn(
                'px-2.5 py-1.5 transition-colors',
                selectedCurrency === c
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
              aria-pressed={selectedCurrency === c}
              aria-label={`Switch to ${c}`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          <AnimatePresence mode="wait">
            <motion.div key={theme} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              {theme === 'light' ? <Moon className="w-5 h-5 text-gray-600" /> : <Sun className="w-5 h-5 text-amber-400" />}
            </motion.div>
          </AnimatePresence>
        </button>

        {isAuthenticated ? (
          <>
            {/* Notifications */}
            <div className="relative">
              <button onClick={() => setNotifOpen(v => !v)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative" aria-label="Notifications">
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <AnimatePresence>
                {notifOpen && (
                  <motion.div initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.95 }} transition={{ duration: 0.15 }}
                    className="absolute right-0 top-12 w-80 glass-card rounded-2xl p-4 shadow-2xl z-50">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-sm">Notifications</h3>
                      <Badge variant="info">3 new</Badge>
                    </div>
                    {[
                      { title: 'New user signed up', time: '2m ago', type: 'success' as const },
                      { title: 'Monthly report ready', time: '1h ago', type: 'info' as const },
                      { title: 'Server usage at 85%', time: '3h ago', type: 'warning' as const },
                    ].map((n, i) => (
                      <div key={i} className="flex items-start gap-3 py-2.5 border-b border-gray-100 dark:border-gray-800 last:border-0">
                        <div className={cn('w-2 h-2 rounded-full mt-1.5 flex-shrink-0', n.type === 'success' ? 'bg-emerald-500' : n.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500')} />
                        <div>
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{n.title}</p>
                          <p className="text-xs text-gray-500">{n.time}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile dropdown */}
            <div className="relative">
              <button onClick={() => setProfileOpen(v => !v)} className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Profile menu" aria-expanded={profileOpen}>
                <Avatar src={user?.avatar} name={user?.name} size="sm" />
                <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">{user?.name?.split(' ')[0]}</span>
                <ChevronDown className={cn('w-4 h-4 text-gray-500 transition-transform', profileOpen && 'rotate-180')} />
              </button>
              <AnimatePresence>
                {profileOpen && (
                  <motion.div initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.95 }} transition={{ duration: 0.15 }}
                    className="absolute right-0 top-12 w-56 glass-card rounded-2xl p-2 shadow-2xl z-50">
                    <div className="px-3 py-2 mb-1 border-b border-gray-100 dark:border-gray-800">
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    {[
                      { icon: User, label: 'Profile', to: '/profile' },
                      { icon: Settings, label: 'Settings', to: '/settings' },
                    ].map(item => (
                      <Link key={item.to} to={item.to} onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <item.icon className="w-4 h-4" />
                        {item.label}
                      </Link>
                    ))}
                    <button onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors mt-1">
                      <LogOut className="w-4 h-4" />
                      Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login" className="btn-secondary text-sm px-4 py-2">Sign in</Link>
            <Link to="/register" className="btn-primary text-sm px-4 py-2">Get started</Link>
          </div>
        )}
      </div>
    </header>
  );
};
