export type Currency = 'USD' | 'PHP' | 'EUR' | 'GBP' | 'JPY' | 'CAD' | 'AUD' | 'SGD' | 'INR' | 'MXN'

export const CURRENCY_SYMBOLS = {
  USD: '$',
  PHP: '₱',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  CAD: 'C$',
  AUD: 'A$',
  SGD: 'S$',
  INR: '₹',
  MXN: '$'
} as const

export const CURRENCY_RATES = {
  USD: 1,
  PHP: 56.5,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.0,
  CAD: 1.35,
  AUD: 1.52,
  SGD: 1.34,
  INR: 83.2,
  MXN: 17.8
} as const

export function convertCurrency(amount: number, fromCurrency: Currency, toCurrency: Currency): number {
  if (fromCurrency === toCurrency) return amount
  
  // Convert to USD first if needed
  const usdAmount = fromCurrency === 'USD' ? amount : amount / CURRENCY_RATES[fromCurrency]
  
  // Convert from USD to target currency
  return toCurrency === 'USD' ? usdAmount : usdAmount * CURRENCY_RATES[toCurrency]
}

export function formatCurrency(amount: number, currency: Currency): string {
  const symbol = CURRENCY_SYMBOLS[currency]
  const formattedAmount = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Math.round(amount))
  
  return `${symbol}${formattedAmount}`
}

export function getCurrencyFromStorage(): Currency {
  if (typeof window === 'undefined') return 'USD'
  return (localStorage.getItem('preferredCurrency') as Currency) || 'USD'
}

export function setCurrencyInStorage(currency: Currency): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('preferredCurrency', currency)
}