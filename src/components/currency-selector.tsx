"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { Currency, getCurrencyFromStorage, setCurrencyInStorage, CURRENCY_SYMBOLS } from "@/lib/currency"
import { DollarSign, Globe } from "lucide-react"

interface CurrencySelectorProps {
  value: Currency
  onChange: (currency: Currency) => void
  className?: string
}

export function CurrencySelector({ value, onChange, className }: CurrencySelectorProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Globe className="h-4 w-4 text-muted-foreground" />
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value as Currency)}
        className="w-28"
      >
        <option value="USD">🇺🇸 USD</option>
        <option value="EUR">🇪🇺 EUR</option>
        <option value="GBP">🇬🇧 GBP</option>
        <option value="JPY">🇯🇵 JPY</option>
        <option value="CAD">🇨🇦 CAD</option>
        <option value="AUD">🇦🇺 AUD</option>
        <option value="SGD">🇸🇬 SGD</option>
        <option value="PHP">🇵🇭 PHP</option>
        <option value="INR">🇮🇳 INR</option>
        <option value="MXN">🇲🇽 MXN</option>
      </Select>
    </div>
  )
}

export function useCurrency() {
  const [currency, setCurrency] = useState<Currency>('USD')

  useEffect(() => {
    setCurrency(getCurrencyFromStorage())
  }, [])

  const updateCurrency = (newCurrency: Currency) => {
    setCurrency(newCurrency)
    setCurrencyInStorage(newCurrency)
  }

  return { currency, setCurrency: updateCurrency }
}