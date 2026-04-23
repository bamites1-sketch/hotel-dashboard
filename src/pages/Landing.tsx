import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Shield, Zap, Users, Globe, Puzzle, Star, CheckCircle2 } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { testimonials, features } from '../lib/mockData';
import { EthiopianHero } from '../components/EthiopianHero';
import { EthiopianCityFilter } from '../components/EthiopianCityFilter';

const iconMap: Record<string, React.FC<any>> = { BarChart3, Shield, Zap, Users, Globe, Puzzle };

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export const Landing: React.FC = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />

    {/* Hero */}
    <section className="relative flex items-center justify-center px-6 py-24 lg:py-32">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-400/20 dark:bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-400/20 dark:bg-accent-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium mb-6 border border-primary-200 dark:border-primary-800">
            <Zap className="w-3.5 h-3.5" />
            Now with AI-powered insights
          </span>
        </motion.div>

        <motion.h1 initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl lg:text-7xl font-black tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
          Build faster.<br />
          <span className="gradient-text">Ship smarter.</span>
        </motion.h1>

        <motion.p initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          The all-in-one platform that gives your team real-time analytics, seamless collaboration, and enterprise-grade security — without the complexity.
        </motion.p>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register" className="btn-primary text-base px-8 py-3.5 flex items-center gap-2 justify-center">
            Start for free <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/dashboard" className="btn-secondary text-base px-8 py-3.5 flex items-center gap-2 justify-center">
            View demo
          </Link>
        </motion.div>

        <motion.p initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 text-sm text-gray-400 flex items-center justify-center gap-4">
          {['No credit card required', 'Free 14-day trial', 'Cancel anytime'].map(t => (
            <span key={t} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />{t}</span>
          ))}
        </motion.p>

        {/* Hero image / dashboard preview */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 relative">
          <div className="glass-card rounded-3xl p-1 shadow-2xl shadow-primary-500/10">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 grid grid-cols-3 gap-4">
              {[
                { label: 'Revenue', value: '$1.24M', change: '+12.5%', color: 'text-emerald-500' },
                { label: 'Users', value: '52.4K', change: '+8.2%', color: 'text-emerald-500' },
                { label: 'Conversion', value: '3.84%', change: '-1.1%', color: 'text-red-500' },
              ].map(stat => (
                <div key={stat.label} className="card p-4 text-left">
                  <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
                  <p className={`text-xs font-medium ${stat.color}`}>{stat.change}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Ethiopian Hero — full-width showcase */}
    <section className="px-6 pb-16">
      <div className="max-w-5xl mx-auto">
        <EthiopianHero />
      </div>
    </section>

    {/* Logos */}
    <section className="py-12 px-6 border-y border-gray-100 dark:border-gray-800">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm text-gray-400 mb-8">Trusted by teams at</p>
        <div className="flex flex-wrap justify-center gap-8 items-center opacity-50 dark:opacity-30">
          {['Stripe', 'Vercel', 'Linear', 'Notion', 'Figma', 'Loom'].map(name => (
            <span key={name} className="text-xl font-black text-gray-400 dark:text-gray-600">{name}</span>
          ))}
        </div>
      </div>
    </section>

    {/* Ethiopian City Filter — standalone section */}
    <section className="px-6 pb-4">
      <div className="max-w-6xl mx-auto">
        <EthiopianCityFilter />
      </div>
    </section>

    {/* Features */}
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Everything you need to scale</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">Powerful features designed for modern teams who demand the best.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = iconMap[f.icon];
            return (
              <motion.div key={f.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <div className="card p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 flex items-center justify-center mb-4 group-hover:from-primary-500/20 group-hover:to-accent-500/20 transition-all">
                    {Icon && <Icon className="w-6 h-6 text-primary-500" />}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{f.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-24 px-6 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Loved by thousands</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400">Don't take our word for it.</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <div className="card p-6 h-full flex flex-col">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed flex-1 mb-6">"{t.content}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }}>
          <div className="glass-card rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10 pointer-events-none" />
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4 relative">Ready to get started?</h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 relative">Join 50,000+ teams already using Nexus to build better products.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative">
              <Link to="/register" className="btn-primary text-base px-8 py-3.5 flex items-center gap-2 justify-center">
                Start free trial <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/login" className="btn-secondary text-base px-8 py-3.5">Sign in</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    <Footer />
  </div>
);
