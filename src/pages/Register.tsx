import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { registerSchema, type RegisterInput } from '../lib/validators';
import { authApi } from '../lib/api';
import { useAuthStore } from '../store/useAuthStore';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import type { User as UserType } from '../types';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [showPass, setShowPass] = useState(false);

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch('password', '');
  const checks = [
    { label: 'At least 8 characters', ok: password.length >= 8 },
    { label: 'One uppercase letter', ok: /[A-Z]/.test(password) },
    { label: 'One number', ok: /[0-9]/.test(password) },
  ];

  const onSubmit = async (data: RegisterInput) => {
    try {
      const res = await authApi.register(data.name, data.email, data.password);
      setAuth(res.user as UserType, res.token);
      toast.success('Account created! Welcome aboard.');
      navigate('/dashboard');
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-950">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
        <div className="glass-card rounded-3xl p-8">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <span className="text-white text-sm font-black">N</span>
            </div>
            <span className="font-bold text-xl gradient-text">Nexus</span>
          </Link>

          <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Create account</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Already have one? <Link to="/login" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">Sign in</Link></p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <Input label="Full name" type="text" placeholder="Alex Morgan" icon={<User className="w-4 h-4" />} error={errors.name?.message} autoComplete="name" {...register('name')} />
            <Input label="Email address" type="email" placeholder="you@example.com" icon={<Mail className="w-4 h-4" />} error={errors.email?.message} autoComplete="email" {...register('email')} />
            <div>
              <Input
                label="Password"
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                icon={<Lock className="w-4 h-4" />}
                rightIcon={
                  <button type="button" onClick={() => setShowPass(v => !v)} aria-label={showPass ? 'Hide password' : 'Show password'}>
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
                error={errors.password?.message}
                autoComplete="new-password"
                {...register('password')}
              />
              {password && (
                <div className="mt-2 space-y-1">
                  {checks.map(c => (
                    <p key={c.label} className={`text-xs flex items-center gap-1.5 ${c.ok ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}`}>
                      <CheckCircle2 className="w-3.5 h-3.5" />{c.label}
                    </p>
                  ))}
                </div>
              )}
            </div>
            <Input label="Confirm password" type="password" placeholder="••••••••" icon={<Lock className="w-4 h-4" />} error={errors.confirmPassword?.message} autoComplete="new-password" {...register('confirmPassword')} />

            <p className="text-xs text-gray-500 dark:text-gray-400">
              By creating an account, you agree to our <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline">Terms</a> and <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline">Privacy Policy</a>.
            </p>

            <Button type="submit" loading={isSubmitting} className="w-full" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              Create account
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
