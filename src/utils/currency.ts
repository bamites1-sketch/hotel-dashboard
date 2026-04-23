import type { Currency } from '../store/currencyStore';

// Static exchange rate config — update here only
export const EXCHANGE_RATE = { USD_TO_ETB: 55 } as const;

/** Convert a USD amount to the target currency */
export function convert(amountUSD: number, currency: Currency): number {
  return currency === 'ETB' ? amountUSD * EXCHANGE_RATE.USD_TO_ETB : amountUSD;
}

/** Format a USD amount into the target currency string */
export function formatPrice(amountUSD: number, currency: Currency): string {
  const value = convert(amountUSD, currency);
  if (currency === 'ETB') {
    return `${Math.round(value).toLocaleString('en-US')} Br`;
  }
  return `$${value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}
