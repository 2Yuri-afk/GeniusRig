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
  allComponents?: PCPart[]
}

export function ComponentReplacementModal({
  isOpen,
  onClose,
  currentComponent,
  alternatives,
  currency,
  onReplace,
  remainingBudget,
  allComponents = []
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
    // If the new component is cheaper (negative difference), we can always afford it
    // If it's more expensive (positive difference), check if we have enough remaining budget
    return difference <= 0 || remainingBudget >= difference
  }

  const getComponentTier = (component: PCPart) => {
    const name = component.name.toLowerCase()
    
    if (component.type === 'CPU') {
      // Intel tiers
      if (name.includes('i9') || name.includes('15900') || name.includes('14900')) return 'high-end'
      if (name.includes('i7') || name.includes('15700') || name.includes('14700')) return 'mid-high'
      if (name.includes('i5') || name.includes('15600') || name.includes('14600')) return 'mid-range'
      if (name.includes('i3')) return 'budget'
      
      // AMD tiers
      if (name.includes('9950') || name.includes('9900') || name.includes('7950') || name.includes('7900')) return 'high-end'
      if (name.includes('9700') || name.includes('7700') || name.includes('8700')) return 'mid-high'
      if (name.includes('9600') || name.includes('7600') || name.includes('8600')) return 'mid-range'
      if (name.includes('7500') || name.includes('8500')) return 'budget'
    }
    
    if (component.type === 'GPU') {
      // NVIDIA tiers
      if (name.includes('5090') || name.includes('4090')) return 'high-end'
      if (name.includes('5080') || name.includes('4080') || name.includes('5070 ti') || name.includes('4070 ti')) return 'mid-high'
      if (name.includes('5070') || name.includes('4070') || name.includes('5060 ti') || name.includes('4060 ti')) return 'mid-range'
      if (name.includes('5060') || name.includes('4060')) return 'budget'
      
      // AMD tiers
      if (name.includes('8800') || name.includes('7900')) return 'high-end'
      if (name.includes('8700') || name.includes('7800') || name.includes('7700')) return 'mid-high'
      if (name.includes('8600') || name.includes('7600')) return 'mid-range'
      if (name.includes('8500') || name.includes('7500')) return 'budget'
    }
    
    return 'unknown'
  }

  const checkBottleneck = (newComponent: PCPart) => {
    if (!allComponents.length) return null
    
    const newTier = getComponentTier(newComponent)
    if (newTier === 'unknown') return null
    
    if (newComponent.type === 'CPU') {
      // Check CPU vs GPU bottleneck
      const gpu = allComponents.find(c => c.type === 'GPU')
      if (gpu) {
        const gpuTier = getComponentTier(gpu)
        const tierOrder = ['budget', 'mid-range', 'mid-high', 'high-end']
        const cpuIndex = tierOrder.indexOf(newTier)
        const gpuIndex = tierOrder.indexOf(gpuTier)
        
        // If CPU is 2+ tiers below GPU, it's a bottleneck
        if (gpuIndex - cpuIndex >= 2) return 'cpu-bottleneck'
        // If CPU is 2+ tiers above GPU, GPU might be bottleneck
        if (cpuIndex - gpuIndex >= 2) return 'gpu-bottleneck'
      }
    }
    
    if (newComponent.type === 'GPU') {
      // Check GPU vs CPU bottleneck
      const cpu = allComponents.find(c => c.type === 'CPU')
      if (cpu) {
        const cpuTier = getComponentTier(cpu)
        const tierOrder = ['budget', 'mid-range', 'mid-high', 'high-end']
        const gpuIndex = tierOrder.indexOf(newTier)
        const cpuIndex = tierOrder.indexOf(cpuTier)
        
        // If GPU is 2+ tiers above CPU, CPU might be bottleneck
        if (gpuIndex - cpuIndex >= 2) return 'cpu-bottleneck'
        // If CPU is 2+ tiers above GPU, it's overkill
        if (cpuIndex - gpuIndex >= 2) return 'overkill'
      }
    }
    
    return null
  }

  const isCompatible = (newComponent: PCPart) => {
    // Basic compatibility checks based on component type
    const componentName = newComponent.name.toLowerCase()
    const currentName = currentComponent.name.toLowerCase()
    
    switch (newComponent.type) {
      case 'PSU':
        // Check PSU wattage compatibility with current build's GPU
        const wattageMatch = componentName.match(/(\d+)w/)
        if (wattageMatch && allComponents.length > 0) {
          const wattage = parseInt(wattageMatch[1])
          
          // Find the GPU in the current build
          const gpu = allComponents.find(component => component.type === 'GPU')
          if (gpu) {
            const gpuName = gpu.name.toLowerCase()
            
            // Check PSU requirements based on the actual GPU in the build
            if (gpuName.includes('rtx 4090') || gpuName.includes('rtx 5090')) return wattage >= 850
            if (gpuName.includes('rtx 4080') || gpuName.includes('rtx 5080')) return wattage >= 750
            if (gpuName.includes('rtx 4070') || gpuName.includes('rtx 5070')) return wattage >= 650
            if (gpuName.includes('rtx 4060') || gpuName.includes('rtx 5060')) return wattage >= 550
            if (gpuName.includes('rx 7900') || gpuName.includes('rx 8800')) return wattage >= 750
            if (gpuName.includes('rx 7700') || gpuName.includes('rx 8700')) return wattage >= 650
            if (gpuName.includes('rx 7600') || gpuName.includes('rx 8600')) return wattage >= 550
            
            // For other GPUs, require at least 500W
            return wattage >= 500
          }
        }
        return true // Default to compatible if we can't determine
        
      case 'RAM':
        // Check DDR type compatibility
        const isDDR4 = componentName.includes('ddr4')
        const isDDR5 = componentName.includes('ddr5')
        const currentIsDDR4 = currentName.includes('ddr4')
        const currentIsDDR5 = currentName.includes('ddr5')
        
        // If we can determine DDR type, ensure they match
        if ((isDDR4 || isDDR5) && (currentIsDDR4 || currentIsDDR5)) {
          return (isDDR4 && currentIsDDR4) || (isDDR5 && currentIsDDR5)
        }
        return true // Default to compatible if we can't determine
        
      case 'CPU':
        // Check socket compatibility (basic check)
        const isAM5 = componentName.includes('ryzen') && (componentName.includes('7000') || componentName.includes('8000') || componentName.includes('9000'))
        const isAM4 = componentName.includes('ryzen') && !isAM5
        const isLGA1700 = componentName.includes('intel') && (componentName.includes('12') || componentName.includes('13') || componentName.includes('14'))
        const isLGA1851 = componentName.includes('intel') && componentName.includes('15')
        
        const currentIsAM5 = currentName.includes('ryzen') && (currentName.includes('7000') || currentName.includes('8000') || currentName.includes('9000'))
        const currentIsAM4 = currentName.includes('ryzen') && !currentIsAM5
        const currentIsLGA1700 = currentName.includes('intel') && (currentName.includes('12') || currentName.includes('13') || currentName.includes('14'))
        const currentIsLGA1851 = currentName.includes('intel') && currentName.includes('15')
        
        // Check if sockets match
        if (isAM5 && currentIsAM5) return true
        if (isAM4 && currentIsAM4) return true
        if (isLGA1700 && currentIsLGA1700) return true
        if (isLGA1851 && currentIsLGA1851) return true
        
        // If we can't determine or sockets don't match
        return !(isAM5 || isAM4 || isLGA1700 || isLGA1851) || !(currentIsAM5 || currentIsAM4 || currentIsLGA1700 || currentIsLGA1851)
        
      default:
        return true // Default to compatible for other components
    }
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
                const compatible = isCompatible(alternative)
                const bottleneckIssue = checkBottleneck(alternative)
                const canSelect = affordable && compatible
                
                return (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border transition-all duration-200 ${
                      canSelect 
                        ? bottleneckIssue 
                          ? 'bg-gradient-to-r from-yellow-50/50 to-yellow-100/30 border-yellow-200/50 hover:from-yellow-100/50 hover:to-yellow-200/40 cursor-pointer' 
                          : 'bg-gradient-to-r from-muted/30 to-muted/20 border-muted hover:from-muted/50 hover:to-muted/40 cursor-pointer'
                        : 'bg-red-50/50 border-red-200/50 opacity-60 cursor-not-allowed'
                    }`}
                    onClick={() => canSelect && onReplace(alternative)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2 flex-wrap">
                          <p className="font-medium">{alternative.name}</p>
                          {!affordable && (
                            <Badge variant="destructive" className="text-xs">Over Budget</Badge>
                          )}
                          {affordable && !compatible && (
                            <Badge variant="destructive" className="text-xs">Incompatible</Badge>
                          )}
                          {affordable && compatible && bottleneckIssue === 'cpu-bottleneck' && (
                            <Badge variant="outline" className="text-xs bg-yellow-100 text-yellow-800 border-yellow-300">CPU Bottleneck</Badge>
                          )}
                          {affordable && compatible && bottleneckIssue === 'gpu-bottleneck' && (
                            <Badge variant="outline" className="text-xs bg-yellow-100 text-yellow-800 border-yellow-300">GPU Bottleneck</Badge>
                          )}
                          {affordable && compatible && bottleneckIssue === 'overkill' && (
                            <Badge variant="outline" className="text-xs bg-blue-100 text-blue-800 border-blue-300">Overkill</Badge>
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
                      {canSelect && (
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