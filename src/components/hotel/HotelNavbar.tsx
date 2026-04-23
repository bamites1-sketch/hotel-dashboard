import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Heart, User, LogOut, ChevronDown, Menu, X, Search } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useHotelStore } from '../../store/useHotelStore';
import { useCurrencyStore } from '../../store/currencyStore';
import { Avatar } from '../ui/Avatar';
import { cn } from '../../lib/utils';

export const HotelNavbar: React.FC = () => {
  const { theme, toggleTheme } = useUIStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { favorites } = useHotelStore();
  const { selectedCurrency, setCurrency } = useCurrencyStore();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
        {/* Logo */}
        <Link to="/hotels" className="flex items-center gap-2 font-black text-xl flex-shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
            <span className="text-white text-sm">🏨</span>
          </div>
          <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent hidden sm:block">StayEthiopia</span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1 ml-4">
          {[
            { label: 'Hotels', to: '/hotels' },
            { label: 'Deals', to: '/hotels?deals=true' },
            { label: 'Experiences', to: '/hotels' },
          ].map(item => (
            <Link key={item.to} to={item.to}
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {/* Currency */}
          <div className="hidden sm:flex items-center rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden text-xs font-semibold">
            {(['ETB', 'USD'] as const).map(c => (
              <button key={c} onClick={() => setCurrency(c)}
                className={cn('px-2.5 py-1.5 transition-colors', selectedCurrency === c ? 'bg-amber-500 text-white' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800')}
                aria-pressed={selectedCurrency === c}>
                {c}
              </button>
            ))}
          </div>

          {/* Theme */}
          <button onClick={toggleTheme} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Toggle theme">
            <AnimatePresence mode="wait">
              <motion.div key={theme} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                {theme === 'light' ? <Moon className="w-4 h-4 text-gray-600" /> : <Sun className="w-4 h-4 text-amber-400" />}
              </motion.div>
            </AnimatePresence>
          </button>

          {isAuthenticated ? (
            <>
              {/* Favorites */}
              <Link to="/hotels/wishlist" className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Wishlist">
                <Heart className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                {favorites.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Link>

              {/* Profile */}
              <div className="relative">
                <button onClick={() => setProfileOpen(v => !v)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <Avatar src={user?.avatar} name={user?.name} size="sm" />
                  <ChevronDown className={cn('w-3.5 h-3.5 text-gray-500 transition-transform hidden sm:block', profileOpen && 'rotate-180')} />
                </button>
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.95 }} transition={{ duration: 0.15 }}
                      className="absolute right-0 top-12 w-52 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-2xl p-2 z-50">
                      <div className="px-3 py-2 mb-1 border-b border-gray-100 dark:border-gray-800">
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                      {[
                        { icon: User, label: 'My Bookings', to: '/hotels/bookings' },
                        { icon: Heart, label: 'Wishlist', to: '/hotels/wishlist' },
                        { icon: User, label: 'Profile', to: '/hotels/profile' },
                      ].map(item => (
                        <Link key={item.to} to={item.to} onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                          <item.icon className="w-4 h-4" />{item.label}
                        </Link>
                      ))}
                      <button onClick={() => { logout(); navigate('/hotels'); setProfileOpen(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors mt-1">
                        <LogOut className="w-4 h-4" />Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">Sign in</Link>
              <Link to="/register" className="text-sm font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all hover:-translate-y-0.5">Get started</Link>
            </div>
          )}

          {/* Mobile menu */}
          <button onClick={() => setMenuOpen(v => !v)} className="md:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Menu">
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-3 space-y-1 overflow-hidden">
            {[{ label: 'Hotels', to: '/hotels' }, { label: 'My Bookings', to: '/hotels/bookings' }, { label: 'Wishlist', to: '/hotels/wishlist' }].map(item => (
              <Link key={item.to} to={item.to} onClick={() => setMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
