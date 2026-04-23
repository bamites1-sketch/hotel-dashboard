import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Shield, Palette, Globe, Key, CreditCard, Moon, Sun, Monitor } from 'lucide-react';
import toast from 'react-hot-toast';
import { Card, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useUIStore } from '../store/useUIStore';
import { cn } from '../lib/utils';

interface ToggleProps { checked: boolean; onChange: (v: boolean) => void; label: string }
const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label }) => (
  <button
    role="switch" aria-checked={checked} aria-label={label}
    onClick={() => onChange(!checked)}
    className={cn('relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50', checked ? 'bg-primary-500' : 'bg-gray-200 dark:bg-gray-700')}
  >
    <span className={cn('absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200', checked && 'translate-x-5')} />
  </button>
);

export const Settings: React.FC = () => {
  const { theme, setTheme } = useUIStore();
  const [notifs, setNotifs] = useState({ email: true, push: false, weekly: true, security: true });
  const [privacy, setPrivacy] = useState({ publicProfile: false, analytics: true, marketing: false });

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ] as const;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage your preferences and account settings</p>
      </div>

      {/* Appearance */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-primary-500" />
              <CardTitle>Appearance</CardTitle>
            </div>
          </CardHeader>
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Theme</p>
            <div className="grid grid-cols-3 gap-3">
              {themeOptions.map(opt => (
                <button key={opt.value}
                  onClick={() => { if (opt.value !== 'system') setTheme(opt.value); }}
                  className={cn('flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all', theme === opt.value ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600')}
                  aria-pressed={theme === opt.value}
                >
                  <opt.icon className={cn('w-5 h-5', theme === opt.value ? 'text-primary-500' : 'text-gray-500')} />
                  <span className={cn('text-sm font-medium', theme === opt.value ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400')}>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Notifications */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary-500" />
              <CardTitle>Notifications</CardTitle>
            </div>
          </CardHeader>
          <div className="space-y-4">
            {[
              { key: 'email' as const, label: 'Email notifications', desc: 'Receive updates via email' },
              { key: 'push' as const, label: 'Push notifications', desc: 'Browser push notifications' },
              { key: 'weekly' as const, label: 'Weekly digest', desc: 'Summary of your weekly activity' },
              { key: 'security' as const, label: 'Security alerts', desc: 'Important security notifications' },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </div>
                <Toggle checked={notifs[item.key]} onChange={v => setNotifs(n => ({ ...n, [item.key]: v }))} label={item.label} />
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Privacy */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary-500" />
              <CardTitle>Privacy</CardTitle>
            </div>
          </CardHeader>
          <div className="space-y-4">
            {[
              { key: 'publicProfile' as const, label: 'Public profile', desc: 'Make your profile visible to everyone' },
              { key: 'analytics' as const, label: 'Usage analytics', desc: 'Help us improve by sharing usage data' },
              { key: 'marketing' as const, label: 'Marketing emails', desc: 'Receive product updates and offers' },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </div>
                <Toggle checked={privacy[item.key]} onChange={v => setPrivacy(p => ({ ...p, [item.key]: v }))} label={item.label} />
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Security */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Key className="w-5 h-5 text-primary-500" />
              <CardTitle>Security</CardTitle>
            </div>
          </CardHeader>
          <div className="space-y-3">
            {[
              { label: 'Change password', desc: 'Update your account password' },
              { label: 'Two-factor authentication', desc: 'Add an extra layer of security' },
              { label: 'Active sessions', desc: 'Manage devices signed into your account' },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => toast.success('Coming soon!')}>Manage</Button>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Billing */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary-500" />
              <CardTitle>Billing</CardTitle>
            </div>
          </CardHeader>
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-xl">
            <div>
              <p className="font-semibold text-gray-900 dark:text-gray-100">Free Plan</p>
              <p className="text-sm text-gray-500 mt-0.5">Upgrade to unlock all features</p>
            </div>
            <Button onClick={() => toast.success('Redirecting to billing...')}>Upgrade to Pro</Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
