import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Currency = 'ETB' | 'USD';

interface CurrencyState {
  selectedCurrency: Currency;
  setCurrency: (c: Currency) => void;
}

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      selectedCurrency: 'ETB',
      setCurrency: (selectedCurrency) => set({ selectedCurrency }),
    }),
    { name: 'currency-storage' }
  )
);
