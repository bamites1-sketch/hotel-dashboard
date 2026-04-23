import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { loginSchema, type LoginInput } from '../lib/validators';
import { authApi } from '../lib/api';
import { useAuthStore } from '../store/useAuthStore';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import type { User } from '../types';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [showPass, setShowPass] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      const res = await authApi.login(data.email, data.password);
      setAuth(res.user as User, res.token);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch {
      toast.error('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div key={i} className="absolute rounded-full bg-white/5"
              style={{ width: `${(i + 1) * 80}px`, height: `${(i + 1) * 80}px`, top: `${20 + i * 10}%`, left: `${10 + i * 8}%` }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
            />
          ))}
        </div>
        <div className="relative text-white text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl font-black">N</span>
          </div>
          <h2 className="text-4xl font-black mb-4">Welcome back</h2>
          <p className="text-white/70 text-lg max-w-sm">Sign in to access your dashboard and continue building great things.</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-white dark:bg-gray-950">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
          <div className="mb-8">
            <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <span className="text-white text-sm font-black">N</span>
              </div>
              <span className="font-bold text-xl gradient-text">Nexus</span>
            </Link>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Sign in</h1>
            <p className="text-gray-500 dark:text-gray-400">Don't have an account? <Link to="/register" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">Sign up free</Link></p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              icon={<Mail className="w-4 h-4" />}
              error={errors.email?.message}
              autoComplete="email"
              {...register('email')}
            />
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
              autoComplete="current-password"
              {...register('password')}
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-primary-500 focus:ring-primary-500" />
                <span className="text-gray-600 dark:text-gray-400">Remember me</span>
              </label>
              <a href="#" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">Forgot password?</a>
            </div>

            <Button type="submit" loading={isSubmitting} className="w-full" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              Sign in
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
              <span className="text-xs text-gray-400">or continue with</span>
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['Google', 'GitHub'].map(provider => (
                <button key={provider} className="btn-secondary text-sm flex items-center justify-center gap-2 py-2.5">
                  {provider}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
