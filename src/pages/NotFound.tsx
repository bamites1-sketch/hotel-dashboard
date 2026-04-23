import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center p-6 bg-white dark:bg-gray-950">
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-md">
      {/* Animated 404 */}
      <div className="relative mb-8">
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="text-[10rem] font-black leading-none gradient-text select-none"
        >
          404
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-gray-950 pointer-events-none" />
      </div>

      <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-3">Page not found</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
        Looks like you've wandered off the map. The page you're looking for doesn't exist or has been moved.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/" className="btn-primary flex items-center gap-2 justify-center">
          <Home className="w-4 h-4" /> Go home
        </Link>
        <button onClick={() => window.history.back()} className="btn-secondary flex items-center gap-2 justify-center">
          <ArrowLeft className="w-4 h-4" /> Go back
        </button>
      </div>
    </motion.div>
  </div>
);
