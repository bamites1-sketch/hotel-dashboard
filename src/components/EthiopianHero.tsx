import React, { useState, useEffect } from 'react';

// Placeholder images — swap for real assets when available
const heroImages = [
  'https://images.unsplash.com/photo-1580746738099-b2d4b5d4b9b7?w=1200&q=80', // Addis Ababa
  'https://images.unsplash.com/photo-1627894483216-2138af692e32?w=1200&q=80', // Lalibela
  'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&q=80', // Simien Mountains
];

export const EthiopianHero: React.FC = () => {
  const [imgIndex, setImgIndex] = useState(() => Math.floor(Math.random() * heroImages.length));

  // Rotate image every 5 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setImgIndex(i => (i + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden mt-10 shadow-2xl shadow-primary-500/10">
      {/* Background image */}
      <img
        key={imgIndex}
        src={heroImages[imgIndex]}
        alt="Ethiopia landscape"
        className="w-full h-64 md:h-80 object-cover transition-opacity duration-700"
        loading="lazy"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* Text content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-2">
          🇪🇹 Explore Ethiopia
        </p>
        <h2 className="text-2xl md:text-3xl font-black leading-tight mb-1">
          Discover stays across Ethiopia
        </h2>
        <p className="text-sm text-white/70">
          Book hotels in Addis Ababa, Bahir Dar, Lalibela &amp; beyond
        </p>
        <p className="text-xs text-white/50 mt-1">
          Experience comfort, culture, and hospitality across Ethiopia
        </p>
      </div>

      {/* Dot indicators */}
      <div className="absolute top-4 right-4 flex gap-1.5">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setImgIndex(i)}
            aria-label={`View image ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === imgIndex ? 'bg-white w-5' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
