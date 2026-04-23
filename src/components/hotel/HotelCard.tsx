import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Heart, MapPin, Wifi, Car, Dumbbell } from 'lucide-react';
import { useHotelStore } from '../../store/useHotelStore';
import { useCurrency } from '../../hooks/useCurrency';
import type { Hotel } from '../../types/hotel';
import { cn } from '../../lib/utils';

interface Props {
  hotel: Hotel;
  view?: 'grid' | 'list';
  index?: number;
}

const amenityIcons: Record<string, React.FC<any>> = { 'Free WiFi': Wifi, 'Parking': Car, 'Gym': Dumbbell };

export const HotelCard: React.FC<Props> = ({ hotel, view = 'grid', index = 0 }) => {
  const { toggleFavorite, isFavorite } = useHotelStore();
  const { formatPrice } = useCurrency();
  const fav = isFavorite(hotel.id);

  if (view === 'list') {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
        <Link to={`/hotels/${hotel.id}`} className="flex gap-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group">
          <div className="relative w-48 sm:w-64 flex-shrink-0">
            <img src={hotel.images[0]} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            {hotel.originalPrice && (
              <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                -{Math.round((1 - hotel.pricePerNight / hotel.originalPrice) * 100)}%
              </span>
            )}
            <button onClick={e => { e.preventDefault(); toggleFavorite(hotel.id); }}
              className={cn('absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all', fav ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-white')}
              aria-label={fav ? 'Remove from wishlist' : 'Add to wishlist'}>
              <Heart className={cn('w-4 h-4', fav && 'fill-current')} />
            </button>
          </div>
          <div className="flex-1 p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">{hotel.name}</h3>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{hotel.rating}</span>
                  <span className="text-xs text-gray-500">({hotel.reviewCount})</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm mb-3">
                <MapPin className="w-3.5 h-3.5" />{hotel.location}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{hotel.shortDescription}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {hotel.amenities.slice(0, 4).map(a => (
                  <span key={a} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full">{a}</span>
                ))}
              </div>
            </div>
            <div className="flex items-end justify-between mt-3">
              <div>
                {hotel.originalPrice && <p className="text-xs text-gray-400 line-through">{formatPrice(hotel.originalPrice)}/night</p>}
                <p className="text-xl font-black text-amber-600 dark:text-amber-400">{formatPrice(hotel.pricePerNight)}<span className="text-sm font-normal text-gray-500">/night</span></p>
              </div>
              <span className="text-xs bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 px-3 py-1.5 rounded-xl font-semibold">View deal →</span>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
      <Link to={`/hotels/${hotel.id}`} className="block bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          <img src={hotel.images[0]} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          {hotel.originalPrice && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow">
              -{Math.round((1 - hotel.pricePerNight / hotel.originalPrice) * 100)}% OFF
            </span>
          )}
          {hotel.featured && (
            <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow">
              ⭐ Featured
            </span>
          )}
          <button onClick={e => { e.preventDefault(); toggleFavorite(hotel.id); }}
            className={cn('absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-all duration-200', fav ? 'bg-red-500 text-white scale-110' : 'bg-white/90 text-gray-600 hover:bg-white hover:scale-110')}
            aria-label={fav ? 'Remove from wishlist' : 'Add to wishlist'}>
            <Heart className={cn('w-4 h-4', fav && 'fill-current')} />
          </button>
          <div className="absolute bottom-3 left-3">
            <span className="text-xs bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-lg capitalize">{hotel.category}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-bold text-gray-900 dark:text-gray-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1">{hotel.name}</h3>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{hotel.rating}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs mb-3">
            <MapPin className="w-3 h-3" />{hotel.city}, {hotel.country}
          </div>
          <div className="flex flex-wrap gap-1 mb-4">
            {hotel.amenities.slice(0, 3).map(a => (
              <span key={a} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full">{a}</span>
            ))}
          </div>
          <div className="flex items-end justify-between border-t border-gray-100 dark:border-gray-800 pt-3">
            <div>
              {hotel.originalPrice && <p className="text-xs text-gray-400 line-through">{formatPrice(hotel.originalPrice)}</p>}
              <p className="text-lg font-black text-amber-600 dark:text-amber-400">{formatPrice(hotel.pricePerNight)}<span className="text-xs font-normal text-gray-500">/night</span></p>
            </div>
            <span className="text-xs text-gray-500">({hotel.reviewCount} reviews)</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
