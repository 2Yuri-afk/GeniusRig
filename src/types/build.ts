export interface PCPart {
  name: string
  type: string
  price_estimate: number
}

export interface PCBuild {
  id: string
  parts: PCPart[]
  total_estimate: number
  reasoning: string
  budget: number
  useCase: string
  preferredBrands?: string
  currency: 'USD' | 'PHP' | 'EUR' | 'GBP' | 'JPY' | 'CAD' | 'AUD' | 'SGD' | 'INR' | 'MXN'
  createdAt: string
}