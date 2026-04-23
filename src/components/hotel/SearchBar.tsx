import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { useHotelStore } from '../../store/useHotelStore';

interface Props { compact?: boolean }

export const SearchBar: React.FC<Props> = ({ compact }) => {
  const navigate = useNavigate();
  const { setSearchFilters } = useHotelStore();
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  const cities = ['Addis Ababa', 'Bahir Dar', 'Lalibela', 'Hawassa', 'Gondar', 'Dire Dawa'];

  const handleSearch = () => {
    setSearchFilters({ location, checkIn, checkOut, guests });
    navigate('/hotels');
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-2 shadow-lg">
        <div className="flex items-center gap-2 flex-1 px-2">
          <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Where to?" list="cities-compact"
            className="bg-transparent text-sm outline-none w-full text-gray-900 dark:text-gray-100 placeholder-gray-400" />
          <datalist id="cities-compact">{cities.map(c => <option key={c} value={c} />)}</datalist>
        </div>
        <button onClick={handleSearch} className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-amber-500/30 transition-all">
          Search
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl shadow-black/10 p-2 flex flex-col md:flex-row gap-2">
      {/* Location */}
      <div className="flex items-center gap-3 flex-1 px-4 py-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
        <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-0.5">Destination</p>
          <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Where are you going?" list="cities-list"
            className="bg-transparent text-sm font-medium outline-none w-full text-gray-900 dark:text-gray-100 placeholder-gray-400" />
          <datalist id="cities-list">{cities.map(c => <option key={c} value={c} />)}</datalist>
        </div>
      </div>

      <div className="hidden md:block w-px bg-gray-200 dark:bg-gray-700 my-2" />

      {/* Check-in */}
      <div className="flex items-center gap-3 flex-1 px-4 py-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
        <Calendar className="w-5 h-5 text-amber-500 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-0.5">Check-in</p>
          <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)}
            className="bg-transparent text-sm font-medium outline-none w-full text-gray-900 dark:text-gray-100" />
        </div>
      </div>

      <div className="hidden md:block w-px bg-gray-200 dark:bg-gray-700 my-2" />

      {/* Check-out */}
      <div className="flex items-center gap-3 flex-1 px-4 py-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
        <Calendar className="w-5 h-5 text-amber-500 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-0.5">Check-out</p>
          <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)}
            className="bg-transparent text-sm font-medium outline-none w-full text-gray-900 dark:text-gray-100" />
        </div>
      </div>

      <div className="hidden md:block w-px bg-gray-200 dark:bg-gray-700 my-2" />

      {/* Guests */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
        <Users className="w-5 h-5 text-amber-500 flex-shrink-0" />
        <div>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-0.5">Guests</p>
          <div className="flex items-center gap-2">
            <button onClick={() => setGuests(g => Math.max(1, g - 1))} className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 flex items-center justify-center text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">-</button>
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 w-4 text-center">{guests}</span>
            <button onClick={() => setGuests(g => Math.min(10, g + 1))} className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 flex items-center justify-center text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">+</button>
          </div>
        </div>
      </div>

      {/* Search button */}
      <button onClick={handleSearch}
        className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:-translate-y-0.5 transition-all duration-200">
        <Search className="w-5 h-5" />
        <span className="hidden sm:block">Search</span>
      </button>
    </div>
  );
};
