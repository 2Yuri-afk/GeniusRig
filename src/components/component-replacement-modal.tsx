"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { formatCurrency } from "@/lib/currency"
import { PCPart } from "@/types/build"
import { 
  Check, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Cpu, 
  HardDrive, 
  MemoryStick, 
  Monitor, 
  Zap, 
  Settings 
} from "lucide-react"

const componentIcons = {
  CPU: Cpu,
  GPU: Monitor,
  RAM: MemoryStick,
  Storage: HardDrive,
  Motherboard: Settings,
  PSU: Zap,
  Case: Settings,
}

interface ComponentReplacementModalProps {
  isOpen: boolean
  onClose: () => void
  currentComponent: PCPart
  alternatives: PCPart[]
  currency: 'USD' | 'PHP' | 'EUR' | 'GBP' | 'JPY' | 'CAD' | 'AUD' | 'SGD' | 'INR' | 'MXN'
  onReplace: (newComponent: PCPart) => void
  remainingBudget: number
}

export function ComponentReplacementModal({
  isOpen,
  onClose,
  currentComponent,
  alternatives,
  currency,
  onReplace,
  remainingBudget
}: ComponentReplacementModalProps) {
  if (!isOpen) return null

  const IconComponent = componentIcons[currentComponent.type as keyof typeof componentIcons] || Settings

  const getPriceDifference = (newPrice: number) => {
    return newPrice - currentComponent.price_estimate
  }

  const getPriceChangeIcon = (difference: number) => {
    if (difference > 0) return <TrendingUp className="h-4 w-4 text-red-500" />
    if (difference < 0) return <TrendingDown className="h-4 w-4 text-green-500" />
    return <Minus className="h-4 w-4 text-muted-foreground" />
  }

  const canAfford = (newPrice: number) => {
    const difference = getPriceDifference(newPrice)
    return remainingBudget + difference >= 0
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <IconComponent className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-2xl">Replace {currentComponent.type}</DialogTitle>
              <DialogDescription className="text-base">
                Choose an alternative component within your budget
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 overflow-y-auto max-h-[60vh]">
            {/* Current Component */}
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <h4 className="font-semibold mb-3 flex items-center space-x-2">
                <span>Current Selection</span>
                <Badge variant="outline" className="text-xs">{currentComponent.type}</Badge>
              </h4>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{currentComponent.name}</p>
                  <p className="text-sm text-muted-foreground">Currently selected</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{formatCurrency(currentComponent.price_estimate, currency)}</p>
                </div>
              </div>
            </div>

            {/* Budget Info */}
            <div className="p-3 bg-muted/20 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span>Remaining Budget:</span>
                <span className="font-semibold">{formatCurrency(remainingBudget, currency)}</span>
              </div>
            </div>

            {/* Alternative Components */}
            <div className="space-y-3 max-h-80 overflow-y-auto">
              <h4 className="font-semibold">Alternative Options</h4>
              {alternatives.map((alternative, index) => {
                const priceDifference = getPriceDifference(alternative.price_estimate)
                const affordable = canAfford(alternative.price_estimate)
                
                return (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border transition-all duration-200 ${
                      affordable 
                        ? 'bg-gradient-to-r from-muted/30 to-muted/20 border-muted hover:from-muted/50 hover:to-muted/40 cursor-pointer' 
                        : 'bg-red-50/50 border-red-200/50 opacity-60 cursor-not-allowed'
                    }`}
                    onClick={() => affordable && onReplace(alternative)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <p className="font-medium">{alternative.name}</p>
                          {!affordable && (
                            <Badge variant="destructive" className="text-xs">Over Budget</Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>Price: {formatCurrency(alternative.price_estimate, currency)}</span>
                          <div className="flex items-center space-x-1">
                            {getPriceChangeIcon(priceDifference)}
                            <span className={`font-medium ${
                              priceDifference > 0 ? 'text-red-600' : 
                              priceDifference < 0 ? 'text-green-600' : 'text-muted-foreground'
                            }`}>
                              {priceDifference > 0 ? '+' : ''}{formatCurrency(Math.abs(priceDifference), currency)}
                            </span>
                          </div>
                        </div>
                      </div>
                      {affordable && (
                        <Button
                          size="sm"
                          className="ml-4"
                          onClick={(e) => {
                            e.stopPropagation()
                            onReplace(alternative)
                          }}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Select
                        </Button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}