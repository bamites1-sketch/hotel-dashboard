import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Camera, Mail, User, Globe, FileText, Shield, Bell } from 'lucide-react';
import toast from 'react-hot-toast';
import { profileSchema, type ProfileInput } from '../lib/validators';
import { useAuthStore } from '../store/useAuthStore';
import { Avatar } from '../components/ui/Avatar';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { sleep } from '../lib/utils';

export const Profile: React.FC = () => {
  const { user, updateUser } = useAuthStore();
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, formState: { errors, isDirty } } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user?.name || '', email: user?.email || '', bio: '', website: '' },
  });

  const onSubmit = async (data: ProfileInput) => {
    setSaving(true);
    await sleep(800);
    updateUser({ name: data.name, email: data.email });
    toast.success('Profile updated successfully');
    setSaving(false);
  };

  const planColors = { free: 'default', pro: 'info', enterprise: 'success' } as const;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Profile</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage your personal information</p>
      </div>

      {/* Avatar card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative">
              <Avatar src={user?.avatar} name={user?.name} size="xl" />
              <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary-500 hover:bg-primary-600 rounded-full flex items-center justify-center shadow-lg transition-colors" aria-label="Change avatar">
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{user?.name}</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{user?.email}</p>
              <div className="flex items-center gap-2 justify-center sm:justify-start flex-wrap">
                <Badge variant={planColors[user?.plan || 'free']}>{user?.plan?.toUpperCase()} plan</Badge>
                <Badge variant="success">{user?.role}</Badge>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Edit form */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <p className="text-sm text-gray-500 mt-0.5">Update your profile details</p>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <Input label="Full name" icon={<User className="w-4 h-4" />} error={errors.name?.message} {...register('name')} />
              <Input label="Email address" type="email" icon={<Mail className="w-4 h-4" />} error={errors.email?.message} {...register('email')} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                <span className="flex items-center gap-1.5"><FileText className="w-4 h-4" />Bio</span>
              </label>
              <textarea
                rows={3}
                placeholder="Tell us a bit about yourself..."
                className="input-field resize-none"
                {...register('bio')}
              />
              {errors.bio && <p className="mt-1 text-xs text-red-500">{errors.bio.message}</p>}
            </div>
            <Input label="Website" type="url" placeholder="https://yoursite.com" icon={<Globe className="w-4 h-4" />} error={errors.website?.message} {...register('website')} />
            <div className="flex justify-end">
              <Button type="submit" loading={saving} disabled={!isDirty}>Save changes</Button>
            </div>
          </form>
        </Card>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardHeader><CardTitle>Account Stats</CardTitle></CardHeader>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Projects', value: '12' },
              { label: 'Team members', value: '8' },
              { label: 'API calls', value: '48.2K' },
            ].map(s => (
              <div key={s.label} className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{s.value}</p>
                <p className="text-xs text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Danger zone */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card className="border-red-200 dark:border-red-900/50">
          <CardHeader><CardTitle className="text-red-600 dark:text-red-400">Danger Zone</CardTitle></CardHeader>
          <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/10 rounded-xl">
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">Delete account</p>
              <p className="text-xs text-gray-500 mt-0.5">Permanently delete your account and all data</p>
            </div>
            <Button variant="danger" size="sm" onClick={() => toast.error('This action is irreversible!')}>Delete</Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
