"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { CurrencySelector, useCurrency } from "@/components/currency-selector"
import { ComponentReplacementModal } from "@/components/component-replacement-modal"
import { convertCurrency, formatCurrency } from "@/lib/currency"
import { PCBuild, PCPart } from "@/types/build"
import { 
  Cpu, 
  HardDrive, 
  MemoryStick, 
  Monitor, 
  Zap, 
  DollarSign,
  Sparkles,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Clock,
  Gamepad2,
  Video,
  Code,
  Briefcase,
  User,
  Settings,
  ChevronRight,
  Loader2,
  RefreshCw
} from "lucide-react"

const useCaseIcons = {
  gaming: Gamepad2,
  "video-editing": Video,
  programming: Code,
  productivity: Briefcase,
  streaming: Monitor,
  general: User,
  workstation: Settings,
}

const componentIcons = {
  CPU: Cpu,
  GPU: Monitor,
  RAM: MemoryStick,
  Storage: HardDrive,
  Motherboard: Settings,
  PSU: Zap,
  Case: Settings,
}

export default function BuildPage() {
  const [budget, setBudget] = useState("")
  const [useCase, setUseCase] = useState("")
  const [preferredBrands, setPreferredBrands] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [build, setBuild] = useState<PCBuild | null>(null)
  const [error, setError] = useState("")
  const [step, setStep] = useState(1)
  const { currency, setCurrency } = useCurrency()
  
  // Replacement modal state
  const [isReplacementModalOpen, setIsReplacementModalOpen] = useState(false)
  const [selectedComponentIndex, setSelectedComponentIndex] = useState<number | null>(null)
  const [alternativeComponents, setAlternativeComponents] = useState<PCPart[]>([])
  const [modifications, setModifications] = useState<Array<{originalComponent: PCPart, newComponent: PCPart}>>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setBuild(null)
    setStep(2)

    try {
      // Convert budget to USD for the API call
      const budgetInUSD = Math.round(convertCurrency(parseInt(budget), currency, 'USD'))
      
      const response = await fetch("/api/generate-build", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          budget: budgetInUSD,
          useCase,
          preferredBrands: preferredBrands || undefined,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate build")
      }

      const data = await response.json()
      // Convert prices to selected currency
      const convertedParts = data.parts.map((part: PCPart) => ({
        ...part,
        price_estimate: Math.round(convertCurrency(part.price_estimate, 'USD', currency))
      }))
      
      const convertedTotal = Math.round(convertCurrency(data.total_estimate, 'USD', currency))

      const newBuild: PCBuild = {
        id: Date.now().toString(),
        parts: convertedParts,
        total_estimate: convertedTotal,
        reasoning: data.reasoning,
        budget: parseInt(budget),
        useCase,
        preferredBrands: preferredBrands || undefined,
        currency,
        createdAt: new Date().toISOString(),
      }

      setBuild(newBuild)
      setStep(3)

      // Save to localStorage
      const existingBuilds = JSON.parse(localStorage.getItem("pcBuilds") || "[]")
      existingBuilds.push(newBuild)
      localStorage.setItem("pcBuilds", JSON.stringify(existingBuilds))
    } catch (err) {
      setError("Failed to generate build. Please try again.")
      setStep(1)
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setStep(1)
    setBuild(null)
    setError("")
  }

  // Generate alternative components (mock data for now)
  const generateAlternatives = (componentType: string, currentPrice: number): PCPart[] => {
    const alternatives: { [key: string]: PCPart[] } = {
      CPU: [
        { name: "Intel Core i5-13600K", type: "CPU", price_estimate: Math.round(convertCurrency(320, 'USD', currency)) },
        { name: "AMD Ryzen 7 7700X", type: "CPU", price_estimate: Math.round(convertCurrency(350, 'USD', currency)) },
        { name: "Intel Core i7-13700K", type: "CPU", price_estimate: Math.round(convertCurrency(400, 'USD', currency)) },
        { name: "AMD Ryzen 9 7900X", type: "CPU", price_estimate: Math.round(convertCurrency(550, 'USD', currency)) },
      ],
      GPU: [
        { name: "NVIDIA RTX 4060", type: "GPU", price_estimate: Math.round(convertCurrency(300, 'USD', currency)) },
        { name: "NVIDIA RTX 4060 Ti", type: "GPU", price_estimate: Math.round(convertCurrency(400, 'USD', currency)) },
        { name: "NVIDIA RTX 4070", type: "GPU", price_estimate: Math.round(convertCurrency(600, 'USD', currency)) },
        { name: "NVIDIA RTX 4070 Ti", type: "GPU", price_estimate: Math.round(convertCurrency(800, 'USD', currency)) },
        { name: "AMD RX 7600", type: "GPU", price_estimate: Math.round(convertCurrency(270, 'USD', currency)) },
        { name: "AMD RX 7700 XT", type: "GPU", price_estimate: Math.round(convertCurrency(450, 'USD', currency)) },
      ],
      RAM: [
        { name: "16GB DDR4-3200", type: "RAM", price_estimate: Math.round(convertCurrency(60, 'USD', currency)) },
        { name: "32GB DDR4-3200", type: "RAM", price_estimate: Math.round(convertCurrency(120, 'USD', currency)) },
        { name: "16GB DDR5-5600", type: "RAM", price_estimate: Math.round(convertCurrency(100, 'USD', currency)) },
        { name: "32GB DDR5-5600", type: "RAM", price_estimate: Math.round(convertCurrency(200, 'USD', currency)) },
        { name: "64GB DDR5-5600", type: "RAM", price_estimate: Math.round(convertCurrency(400, 'USD', currency)) },
      ],
      Storage: [
        { name: "500GB NVMe SSD", type: "Storage", price_estimate: Math.round(convertCurrency(50, 'USD', currency)) },
        { name: "1TB NVMe SSD", type: "Storage", price_estimate: Math.round(convertCurrency(100, 'USD', currency)) },
        { name: "2TB NVMe SSD", type: "Storage", price_estimate: Math.round(convertCurrency(200, 'USD', currency)) },
        { name: "1TB PCIe 5.0 SSD", type: "Storage", price_estimate: Math.round(convertCurrency(150, 'USD', currency)) },
      ],
      Motherboard: [
        { name: "MSI B450M PRO-VDH", type: "Motherboard", price_estimate: Math.round(convertCurrency(70, 'USD', currency)) },
        { name: "ASUS ROG Strix B550-F", type: "Motherboard", price_estimate: Math.round(convertCurrency(150, 'USD', currency)) },
        { name: "MSI MAG X570 Tomahawk", type: "Motherboard", price_estimate: Math.round(convertCurrency(200, 'USD', currency)) },
        { name: "ASUS ROG Strix X670E-E", type: "Motherboard", price_estimate: Math.round(convertCurrency(400, 'USD', currency)) },
      ],
      PSU: [
        { name: "500W 80+ Bronze PSU", type: "PSU", price_estimate: Math.round(convertCurrency(60, 'USD', currency)) },
        { name: "650W 80+ Gold PSU", type: "PSU", price_estimate: Math.round(convertCurrency(100, 'USD', currency)) },
        { name: "750W 80+ Gold PSU", type: "PSU", price_estimate: Math.round(convertCurrency(120, 'USD', currency)) },
        { name: "850W 80+ Platinum PSU", type: "PSU", price_estimate: Math.round(convertCurrency(180, 'USD', currency)) },
      ],
      Case: [
        { name: "Cooler Master MasterBox", type: "Case", price_estimate: Math.round(convertCurrency(50, 'USD', currency)) },
        { name: "Fractal Design Core 1000", type: "Case", price_estimate: Math.round(convertCurrency(60, 'USD', currency)) },
        { name: "NZXT H5 Flow", type: "Case", price_estimate: Math.round(convertCurrency(90, 'USD', currency)) },
        { name: "Fractal Design Define 7", type: "Case", price_estimate: Math.round(convertCurrency(150, 'USD', currency)) },
      ]
    }

    return alternatives[componentType] || []
  }

  const handleComponentClick = (componentIndex: number) => {
    if (!build) return
    
    const component = build.parts[componentIndex]
    const alternatives = generateAlternatives(component.type, component.price_estimate)
    
    setSelectedComponentIndex(componentIndex)
    setAlternativeComponents(alternatives)
    setIsReplacementModalOpen(true)
  }

  const handleReplaceComponent = (newComponent: PCPart) => {
    if (!build || selectedComponentIndex === null) return

    const updatedParts = [...build.parts]
    const oldComponent = updatedParts[selectedComponentIndex]
    updatedParts[selectedComponentIndex] = newComponent

    // Track modification
    const newModification = {
      originalComponent: oldComponent,
      newComponent: newComponent
    }
    
    // Check if we're replacing a component that was already modified
    const existingModIndex = modifications.findIndex(mod => 
      mod.newComponent.type === oldComponent.type
    )
    
    if (existingModIndex !== -1) {
      // Update existing modification
      const updatedModifications = [...modifications]
      updatedModifications[existingModIndex] = {
        originalComponent: updatedModifications[existingModIndex].originalComponent,
        newComponent: newComponent
      }
      setModifications(updatedModifications)
    } else {
      // Add new modification
      setModifications(prev => [...prev, newModification])
    }

    // Recalculate total
    const newTotal = updatedParts.reduce((sum, part) => sum + part.price_estimate, 0)

    const updatedBuild: PCBuild = {
      ...build,
      parts: updatedParts,
      total_estimate: newTotal
    }

    setBuild(updatedBuild)

    // Update localStorage
    const existingBuilds = JSON.parse(localStorage.getItem("pcBuilds") || "[]")
    const buildIndex = existingBuilds.findIndex((b: PCBuild) => b.id === build.id)
    if (buildIndex !== -1) {
      existingBuilds[buildIndex] = updatedBuild
      localStorage.setItem("pcBuilds", JSON.stringify(existingBuilds))
    }

    // Close modal
    setIsReplacementModalOpen(false)
    setSelectedComponentIndex(null)
    setAlternativeComponents([])
  }

  const getRemainingBudget = () => {
    if (!build) return 0
    return build.budget - build.total_estimate
  }

  return (
    <div className="relative min-h-screen">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-6 mb-12">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full px-6 py-2 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium">GeniusRig - AI-Powered Build Assistant</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-heading font-bold tracking-tight">
              Build Your
              <span className="gradient-text"> Perfect PC</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tell us your requirements and get AI-powered recommendations tailored to your needs and budget
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'
                }`}>
                  1
                </div>
                <span className="text-sm font-medium">Requirements</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'
                }`}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : '2'}
                </div>
                <span className="text-sm font-medium">AI Analysis</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <div className={`flex items-center space-x-2 ${step >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted'
                }`}>
                  3
                </div>
                <span className="text-sm font-medium">Your Build</span>
              </div>
            </div>
          </div>

          {/* Step 1: Requirements Form */}
          {step === 1 && (
            <div className="max-w-2xl mx-auto fade-in-up">
              <Card className="glass-card border-0 shadow-2xl">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Tell Us Your Requirements</CardTitle>
                  <CardDescription className="text-base">
                    Fill out the form below to get personalized PC component recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-3">
                      <Label htmlFor="budget" className="text-base font-semibold flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4" />
                          <span>Budget ({currency})</span>
                        </div>
                        <CurrencySelector value={currency} onChange={setCurrency} />
                      </Label>
                      <Input
                        id="budget"
                        type="number"
                        placeholder={currency === 'USD' ? "e.g., 1500" : "e.g., 85000"}
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        required
                        min={currency === 'USD' ? "300" : "17000"}
                        max={currency === 'USD' ? "10000" : "565000"}
                        className="h-12 text-lg"
                      />
                      <p className="text-sm text-muted-foreground">
                        Enter your total budget for the entire PC build in {currency}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="useCase" className="text-base font-semibold flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4" />
                        <span>Intended Use</span>
                      </Label>
                      <Select
                        id="useCase"
                        value={useCase}
                        onChange={(e) => setUseCase(e.target.value)}
                        required
                        className="h-12 text-lg"
                      >
                        <option value="">Select your primary use case</option>
                        <option value="gaming">🎮 Gaming</option>
                        <option value="productivity">💼 Productivity/Office Work</option>
                        <option value="video-editing">🎬 Video Editing</option>
                        <option value="streaming">📺 Streaming</option>
                        <option value="programming">💻 Programming/Development</option>
                        <option value="general">👤 General Use</option>
                        <option value="workstation">⚙️ Professional Workstation</option>
                      </Select>
                      <p className="text-sm text-muted-foreground">
                        This helps us optimize component selection for your specific needs
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="brands" className="text-base font-semibold flex items-center space-x-2">
                        <Sparkles className="h-4 w-4" />
                        <span>Preferred Brands (Optional)</span>
                      </Label>
                      <Input
                        id="brands"
                        placeholder="e.g., Intel, NVIDIA, AMD, ASUS"
                        value={preferredBrands}
                        onChange={(e) => setPreferredBrands(e.target.value)}
                        className="h-12 text-lg"
                      />
                      <p className="text-sm text-muted-foreground">
                        Leave blank for best value recommendations, or specify preferred brands
                      </p>
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isLoading} 
                      className="w-full h-12 text-lg bg-primary hover:bg-primary/90 border-0 shadow-lg hover:shadow-xl"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Generating Your Build...
                        </>
                      ) : (
                        <>
                          Generate My Build
                          <Sparkles className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 2: Loading */}
          {step === 2 && isLoading && (
            <div className="max-w-4xl mx-auto fade-in-up">
              <Card className="glass-card border-0 shadow-2xl">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
                    <Loader2 className="h-8 w-8 text-white animate-spin" />
                  </div>
                  <CardTitle className="text-2xl">Analyzing Your Requirements</CardTitle>
                  <CardDescription className="text-base">
                    Processing thousands of component combinations to find your perfect build...
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div key={i} className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
                        <Skeleton className="h-8 w-8 rounded" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-3 w-32" />
                        </div>
                        <Skeleton className="h-4 w-16" />
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>This usually takes 10-30 seconds</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="max-w-2xl mx-auto fade-in-up">
              <Card className="border-red-500/50 bg-red-500/5">
                <CardContent className="pt-6 text-center">
                  <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <p className="text-red-600 mb-4">{error}</p>
                  <Button onClick={resetForm} variant="outline">
                    Try Again
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 3: Results */}
          {step === 3 && build && (
            <div className="max-w-6xl mx-auto space-y-8 fade-in-up">
              {/* Build Summary */}
              <Card className="glass-card border-0 shadow-2xl">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-3xl">Your Perfect Build is Ready!</CardTitle>
                  <CardDescription className="text-lg">
                    Budget: <span className="font-semibold">{formatCurrency(build.budget, build.currency)}</span> | 
                    Use Case: <span className="font-semibold">{build.useCase}</span>
                    {build.preferredBrands && (
                      <span> | Brands: <span className="font-semibold">{build.preferredBrands}</span></span>
                    )}
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Components Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="glass-card border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="h-5 w-5" />
                      <span>Components</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {build.parts.map((part, index) => {
                      const IconComponent = componentIcons[part.type as keyof typeof componentIcons] || Settings
                      return (
                        <div 
                          key={index} 
                          className="relative flex items-center p-4 bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl hover:from-muted/70 hover:to-muted/50 hover:scale-105 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                          onClick={() => handleComponentClick(index)}
                        >
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mr-3">
                            <IconComponent className="h-5 w-5 text-primary" />
                          </div>
                          <div className="min-w-0 flex-1 mr-4">
                            <Badge variant="outline" className="text-xs mb-1">{part.type}</Badge>
                            <p className="font-medium text-sm truncate">{part.name}</p>
                          </div>
                          <div className="flex items-center justify-end w-32">
                            {/* Price - moves left on hover to make space */}
                            <div className="text-right transition-transform duration-300 group-hover:-translate-x-10">
                              <p className="font-bold text-lg">{formatCurrency(part.price_estimate, build.currency)}</p>
                            </div>
                            
                            {/* Replace Icon - appears in same position */}
                            <div className="absolute w-8 h-8 bg-primary/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                              <RefreshCw className="h-4 w-4 text-white" />
                            </div>
                          </div>
                        </div>
                      )
                    })}
                    
                    <div className="flex justify-between items-center p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20">
                      <span className="text-xl font-bold">Total Estimated Cost:</span>
                      <span className="text-2xl font-black gradient-text">{formatCurrency(build.total_estimate, build.currency)}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Sparkles className="h-5 w-5" />
                      <span>Why this build?</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Main reasoning */}
                    <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                      <p className="text-foreground leading-relaxed text-base">{build.reasoning}</p>
                    </div>

                    {/* Modifications Section */}
                    {modifications.length > 0 && (
                      <div className="p-4 bg-nord-13/10 rounded-lg border border-nord-13/20">
                        <div className="flex items-center space-x-2 mb-3">
                          <RefreshCw className="h-5 w-5 text-nord-13" />
                          <h4 className="font-semibold text-nord-13">Your Customizations</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          You&apos;ve customized this build from the original AI recommendations:
                        </p>
                        <div className="space-y-2">
                          {modifications.map((mod, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-muted/20 rounded-lg">
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline" className="text-xs">{mod.originalComponent.type}</Badge>
                                <span className="text-sm">
                                  <span className="line-through text-muted-foreground">{mod.originalComponent.name}</span>
                                  <span className="mx-2">→</span>
                                  <span className="font-medium">{mod.newComponent.name}</span>
                                </span>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {mod.newComponent.price_estimate > mod.originalComponent.price_estimate ? (
                                  <span className="text-red-600">+{formatCurrency(mod.newComponent.price_estimate - mod.originalComponent.price_estimate, build.currency)}</span>
                                ) : mod.newComponent.price_estimate < mod.originalComponent.price_estimate ? (
                                  <span className="text-green-600">-{formatCurrency(mod.originalComponent.price_estimate - mod.newComponent.price_estimate, build.currency)}</span>
                                ) : (
                                  <span>Same price</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Interactive highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-nord-14/10 rounded-lg border border-nord-14/20">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-2 h-2 bg-nord-14 rounded-full"></div>
                          <h4 className="font-semibold text-nord-14">Performance Match</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Components selected for optimal {build.useCase} performance within your budget.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-nord-9/10 rounded-lg border border-nord-9/20">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-2 h-2 bg-nord-9 rounded-full"></div>
                          <h4 className="font-semibold text-nord-9">Budget Efficiency</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Maximum value allocation across all components for {formatCurrency(build.budget, build.currency)}.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-nord-15/10 rounded-lg border border-nord-15/20">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-2 h-2 bg-nord-15 rounded-full"></div>
                          <h4 className="font-semibold text-nord-15">Future Ready</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Built with upgrade paths and modern standards in mind.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-nord-12/10 rounded-lg border border-nord-12/20">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-2 h-2 bg-nord-12 rounded-full"></div>
                          <h4 className="font-semibold text-nord-12">Compatibility</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          All components verified for seamless compatibility and stability.
                        </p>
                      </div>
                    </div>
                    
                    {/* Component breakdown */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-lg flex items-center space-x-2">
                        <Settings className="h-5 w-5" />
                        <span>Component Highlights</span>
                      </h4>
                      <div className="grid gap-3">
                        {build.parts.slice(0, 3).map((part, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                <span className="text-xs font-semibold text-primary">{part.type}</span>
                              </div>
                              <div>
                                <p className="font-medium text-sm">{part.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {part.type === 'CPU' && 'Processing powerhouse for your workload'}
                                  {part.type === 'GPU' && 'Graphics performance for smooth visuals'}
                                  {part.type === 'RAM' && 'Memory for multitasking efficiency'}
                                </p>
                              </div>
                            </div>
                            <span className="font-semibold text-primary">{formatCurrency(part.price_estimate, build.currency)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={resetForm}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 border-0"
                >
                  Generate Another Build
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  asChild
                >
                  <a href="/dashboard">View All Builds</a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Component Replacement Modal */}
      {build && selectedComponentIndex !== null && (
        <ComponentReplacementModal
          isOpen={isReplacementModalOpen}
          onClose={() => {
            setIsReplacementModalOpen(false)
            setSelectedComponentIndex(null)
            setAlternativeComponents([])
          }}
          currentComponent={build.parts[selectedComponentIndex]}
          alternatives={alternativeComponents}
          currency={currency}
          onReplace={handleReplaceComponent}
          remainingBudget={getRemainingBudget()}
        />
      )}
    </div>
  )
}