import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { cn } from '../lib/utils';

const cities = [
  'All',
  'Addis Ababa',
  'Bahir Dar',
  'Hawassa',
  'Gondar',
  'Lalibela',
  'Dire Dawa',
];

export const EthiopianCityFilter: React.FC = () => {
  const [selected, setSelected] = useState('All');

  return (
    <div className="w-full py-4">
      <div className="flex items-center gap-2 mb-3">
        <MapPin className="w-4 h-4 text-emerald-500" />
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Browse by city
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {cities.map(city => (
          <button
            key={city}
            onClick={() => setSelected(city)}
            aria-pressed={selected === city}
            className={cn(
              'px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-150',
              selected === city
                ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm shadow-emerald-500/30'
                : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400'
            )}
          >
            {city}
          </button>
        ))}
      </div>

      {selected !== 'All' && (
        <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">
          Showing results for <span className="text-emerald-500 font-medium">{selected}</span>
        </p>
      )}
    </div>
  );
};
