import { useCurrencyStore } from '../store/currencyStore';
import { formatPrice, convert } from '../utils/currency';

export function useCurrency() {
  const { selectedCurrency, setCurrency } = useCurrencyStore();
  return {
    currency: selectedCurrency,
    setCurrency,
    formatPrice: (amountUSD: number) => formatPrice(amountUSD, selectedCurrency),
    convert: (amountUSD: number) => convert(amountUSD, selectedCurrency),
  };
}
