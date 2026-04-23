import React from 'react';
import { Link } from 'react-router-dom';
import { GitFork, MessageCircle, Link2 } from 'lucide-react';

export const Footer: React.FC = () => (
  <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 py-12 px-6">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <span className="text-white text-sm font-black">N</span>
            </div>
            <span className="font-bold text-xl gradient-text">Nexus</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            The modern platform for teams who move fast and build things that last.
          </p>
          <div className="flex gap-3 mt-4">
            {[GitFork, MessageCircle, Link2].map((Icon, i) => (
              <a key={i} href="#" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors" aria-label="Social link">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        {[
          { title: 'Product', links: ['Features', 'Pricing', 'Changelog', 'Roadmap'] },
          { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
          { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Cookies'] },
        ].map(col => (
          <div key={col.title}>
            <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-3">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map(link => (
                <li key={link}>
                  <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-100 dark:border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500">© 2025 Nexus Inc. All rights reserved.</p>
        <p className="text-sm text-gray-500">Built with ❤️ for developers</p>
      </div>
    </div>
  </footer>
);
