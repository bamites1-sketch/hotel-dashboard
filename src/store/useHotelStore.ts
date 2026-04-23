import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Booking, SearchFilters } from '../types/hotel';
import { mockBookings } from '../data/hotels';

interface HotelState {
  favorites: string[];          // hotel IDs
  bookings: Booking[];
  searchFilters: Partial<SearchFilters>;
  toggleFavorite: (hotelId: string) => void;
  isFavorite: (hotelId: string) => boolean;
  addBooking: (booking: Booking) => void;
  cancelBooking: (bookingId: string) => void;
  setSearchFilters: (filters: Partial<SearchFilters>) => void;
  clearFilters: () => void;
}

export const useHotelStore = create<HotelState>()(
  persist(
    (set, get) => ({
      favorites: [],
      bookings: mockBookings,
      searchFilters: {},
      toggleFavorite: (hotelId) =>
        set(state => ({
          favorites: state.favorites.includes(hotelId)
            ? state.favorites.filter(id => id !== hotelId)
            : [...state.favorites, hotelId],
        })),
      isFavorite: (hotelId) => get().favorites.includes(hotelId),
      addBooking: (booking) =>
        set(state => ({ bookings: [booking, ...state.bookings] })),
      cancelBooking: (bookingId) =>
        set(state => ({
          bookings: state.bookings.map(b =>
            b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
          ),
        })),
      setSearchFilters: (filters) =>
        set(state => ({ searchFilters: { ...state.searchFilters, ...filters } })),
      clearFilters: () => set({ searchFilters: {} }),
    }),
    { name: 'hotel-storage', partialize: state => ({ favorites: state.favorites, bookings: state.bookings }) }
  )
);
