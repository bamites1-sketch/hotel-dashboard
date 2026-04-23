import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ArrowRight, Shield, Clock, HeadphonesIcon, Award } from 'lucide-react';
import { HotelNavbar } from '../../components/hotel/HotelNavbar';
import { SearchBar } from '../../components/hotel/SearchBar';
import { HotelCard } from '../../components/hotel/HotelCard';
import { mockHotels, mockReviews } from '../../data/hotels';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const perks = [
  { icon: Shield, title: 'Best Price Guarantee', desc: 'Find a lower price? We\'ll match it.' },
  { icon: Clock, title: 'Free Cancellation', desc: 'Cancel up to 24h before check-in.' },
  { icon: HeadphonesIcon, title: '24/7 Support', desc: 'We\'re here whenever you need us.' },
  { icon: Award, title: 'Verified Hotels', desc: 'Every property is personally vetted.' },
];

export const HotelLanding: React.FC = () => {
  const featured = mockHotels.filter(h => h.featured);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <HotelNavbar />

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1580746738099-b2d4b5d4b9b7?w=1600&q=80" alt="Ethiopia" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 backdrop-blur-sm text-amber-300 text-sm font-medium mb-6 border border-amber-500/30">
              🇪🇹 Ethiopia's #1 Hotel Booking Platform
            </span>
          </motion.div>

          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight">
            Discover Ethiopia's<br />
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Finest Hotels</span>
          </motion.h1>

          <motion.p initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            From Addis Ababa's luxury towers to Lalibela's ancient lodges — find your perfect stay across Ethiopia.
          </motion.p>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6, delay: 0.3 }} className="max-w-4xl mx-auto">
            <SearchBar />
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 mt-8 text-white/60 text-sm">
            {['500+ Hotels', '50,000+ Happy Guests', '6 Cities', 'Best Price Guarantee'].map(t => (
              <span key={t} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />{t}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Perks */}
      <section className="py-12 px-4 sm:px-6 bg-amber-50 dark:bg-amber-900/10 border-y border-amber-100 dark:border-amber-900/20">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map((p, i) => (
            <motion.div key={p.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}
              className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                <p.icon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">{p.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-2">✨ Hand-picked for you</p>
              <h2 className="text-4xl font-black text-gray-900 dark:text-white">Featured Hotels</h2>
            </div>
            <Link to="/hotels" className="hidden sm:flex items-center gap-2 text-sm font-semibold text-amber-600 dark:text-amber-400 hover:gap-3 transition-all">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((hotel, i) => <HotelCard key={hotel.id} hotel={hotel} index={i} />)}
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="py-20 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-3">Explore by City</h2>
            <p className="text-gray-500 dark:text-gray-400">Discover Ethiopia's most beautiful destinations</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { city: 'Addis Ababa', img: 'https://images.unsplash.com/photo-1580746738099-b2d4b5d4b9b7?w=600&q=80', count: 2 },
              { city: 'Lalibela', img: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?w=600&q=80', count: 1 },
              { city: 'Bahir Dar', img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80', count: 1 },
              { city: 'Hawassa', img: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80', count: 1 },
              { city: 'Gondar', img: 'https://images.unsplash.com/photo-1549294413-26f195200c16?w=600&q=80', count: 2 },
              { city: 'Dire Dawa', img: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=600&q=80', count: 1 },
            ].map((c, i) => (
              <motion.div key={c.city} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08 }}>
                <Link to={`/hotels?city=${c.city}`}
                  className="relative block rounded-2xl overflow-hidden group h-40 md:h-52">
                  <img src={c.img} alt={c.city} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white font-bold text-lg">{c.city}</p>
                    <p className="text-white/70 text-sm">{c.count} hotel{c.count > 1 ? 's' : ''}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-3">What Guests Say</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {mockReviews.slice(0, 3).map((r, i) => (
              <motion.div key={r.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}>
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 h-full">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: r.rating }).map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">"{r.content}"</p>
                  <div className="flex items-center gap-3">
                    <img src={r.userAvatar} alt={r.userName} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">{r.userName}</p>
                      <p className="text-xs text-gray-500">{r.date}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="relative rounded-3xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80" alt="Hotel" className="w-full h-64 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 flex items-center">
                <div className="px-8 md:px-12">
                  <h2 className="text-3xl md:text-4xl font-black text-white mb-3">Ready to explore Ethiopia?</h2>
                  <p className="text-white/70 mb-6 max-w-md">Join thousands of travelers who've discovered the magic of Ethiopian hospitality.</p>
                  <Link to="/hotels" className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-amber-500/40 hover:-translate-y-0.5 transition-all">
                    Browse Hotels <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 dark:border-gray-800 py-10 px-6 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏨</span>
            <span className="font-black text-xl bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">StayEthiopia</span>
          </div>
          <p className="text-sm text-gray-500">© 2025 StayEthiopia. Discover the beauty of Ethiopia.</p>
          <div className="flex gap-4 text-sm text-gray-500">
            {['Privacy', 'Terms', 'Support'].map(l => <a key={l} href="#" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">{l}</a>)}
          </div>
        </div>
      </footer>
    </div>
  );
};
