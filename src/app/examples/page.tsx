"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Cpu, 
  HardDrive, 
  MemoryStick, 
  Monitor, 
  Zap, 
  Settings,
  Gamepad2,
  Video,
  Code,
  Briefcase,
  ArrowRight,
  Star
} from "lucide-react"
import Link from "next/link"

const componentIcons = {
  CPU: Cpu,
  GPU: Monitor,
  RAM: MemoryStick,
  Storage: HardDrive,
  Motherboard: Settings,
  PSU: Zap,
  Case: Settings,
}

const exampleBuilds = [
  {
    id: "gaming-beast",
    title: "Gaming Beast",
    budget: 2500,
    useCase: "gaming",
    icon: Gamepad2,
    description: "High-end gaming build for 4K gaming and streaming",
    rating: 5,
    parts: [
      { name: "Intel Core i7-13700K", type: "CPU", price_estimate: 400 },
      { name: "NVIDIA RTX 4080", type: "GPU", price_estimate: 1200 },
      { name: "32GB DDR5-5600", type: "RAM", price_estimate: 300 },
      { name: "1TB NVMe SSD", type: "Storage", price_estimate: 150 },
      { name: "ASUS ROG Strix Z790", type: "Motherboard", price_estimate: 250 },
      { name: "850W 80+ Gold PSU", type: "PSU", price_estimate: 150 },
      { name: "NZXT H7 Flow", type: "Case", price_estimate: 130 }
    ],
    total: 2580,
    reasoning: "This build prioritizes maximum gaming performance with the RTX 4080 for 4K gaming, paired with a powerful i7 processor for smooth gameplay and streaming capabilities."
  },
  {
    id: "budget-gamer",
    title: "Budget Gamer",
    budget: 800,
    useCase: "gaming",
    icon: Gamepad2,
    description: "Affordable gaming build for 1080p gaming",
    rating: 4,
    parts: [
      { name: "AMD Ryzen 5 5600", type: "CPU", price_estimate: 130 },
      { name: "NVIDIA RTX 4060", type: "GPU", price_estimate: 300 },
      { name: "16GB DDR4-3200", type: "RAM", price_estimate: 60 },
      { name: "500GB NVMe SSD", type: "Storage", price_estimate: 50 },
      { name: "MSI B450M PRO-VDH", type: "Motherboard", price_estimate: 70 },
      { name: "600W 80+ Bronze PSU", type: "PSU", price_estimate: 70 },
      { name: "Cooler Master MasterBox", type: "Case", price_estimate: 50 }
    ],
    total: 730,
    reasoning: "Perfect entry-level gaming build that delivers excellent 1080p performance without breaking the bank. Great price-to-performance ratio."
  },
  {
    id: "content-creator",
    title: "Content Creator Pro",
    budget: 3000,
    useCase: "video-editing",
    icon: Video,
    description: "Professional workstation for video editing and content creation",
    rating: 5,
    parts: [
      { name: "AMD Ryzen 9 7900X", type: "CPU", price_estimate: 550 },
      { name: "NVIDIA RTX 4070 Ti", type: "GPU", price_estimate: 800 },
      { name: "64GB DDR5-5200", type: "RAM", price_estimate: 600 },
      { name: "2TB NVMe SSD", type: "Storage", price_estimate: 200 },
      { name: "ASUS ProArt X670E", type: "Motherboard", price_estimate: 400 },
      { name: "1000W 80+ Platinum PSU", type: "PSU", price_estimate: 200 },
      { name: "Fractal Design Define 7", type: "Case", price_estimate: 180 }
    ],
    total: 2930,
    reasoning: "Optimized for content creation with high core count CPU, ample RAM for large projects, and professional-grade components for reliability."
  },
  {
    id: "developer-station",
    title: "Developer Station",
    budget: 1500,
    useCase: "programming",
    icon: Code,
    description: "Efficient development workstation for coding and compilation",
    rating: 4,
    parts: [
      { name: "AMD Ryzen 7 7700X", type: "CPU", price_estimate: 350 },
      { name: "NVIDIA RTX 4060 Ti", type: "GPU", price_estimate: 400 },
      { name: "32GB DDR5-5200", type: "RAM", price_estimate: 250 },
      { name: "1TB NVMe SSD", type: "Storage", price_estimate: 100 },
      { name: "MSI MAG B650 Tomahawk", type: "Motherboard", price_estimate: 200 },
      { name: "750W 80+ Gold PSU", type: "PSU", price_estimate: 120 },
      { name: "be quiet! Pure Base 500", type: "Case", price_estimate: 90 }
    ],
    total: 1510,
    reasoning: "Balanced build focusing on CPU performance for compilation, ample RAM for IDEs and VMs, with a capable GPU for any graphics work."
  },
  {
    id: "office-productivity",
    title: "Office Productivity",
    budget: 600,
    useCase: "productivity",
    icon: Briefcase,
    description: "Reliable office computer for daily productivity tasks",
    rating: 4,
    parts: [
      { name: "AMD Ryzen 5 5600G", type: "CPU", price_estimate: 160 },
      { name: "Integrated Radeon Graphics", type: "GPU", price_estimate: 0 },
      { name: "16GB DDR4-3200", type: "RAM", price_estimate: 60 },
      { name: "500GB NVMe SSD", type: "Storage", price_estimate: 50 },
      { name: "ASRock B450M PRO4", type: "Motherboard", price_estimate: 70 },
      { name: "500W 80+ Bronze PSU", type: "PSU", price_estimate: 60 },
      { name: "Fractal Design Core 1000", type: "Case", price_estimate: 50 }
    ],
    total: 450,
    reasoning: "Cost-effective productivity build using integrated graphics, perfect for office work, web browsing, and light multitasking."
  }
]

const useCaseColors = {
  gaming: "bg-nord-11/10 text-nord-11 border-nord-11/20",
  "video-editing": "bg-nord-15/10 text-nord-15 border-nord-15/20", 
  programming: "bg-nord-14/10 text-nord-14 border-nord-14/20",
  productivity: "bg-nord-9/10 text-nord-9 border-nord-9/20",
}

const formatUseCase = (useCase: string) => {
  switch (useCase) {
    case 'gaming':
      return 'Gaming'
    case 'video-editing':
      return 'Video Editing'
    case 'programming':
      return 'Programming'
    case 'productivity':
      return 'Productivity'
    case 'streaming':
      return 'Streaming'
    case 'general':
      return 'General Use'
    case 'workstation':
      return 'Workstation'
    default:
      return useCase.charAt(0).toUpperCase() + useCase.slice(1)
  }
}

export default function ExamplesPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-6">
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-2">
              <Star className="h-4 w-4 text-nord-13" />
              <span className="text-sm font-medium">Curated Example Builds</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight">
              Example
              <span className="gradient-text"> PC Builds</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our curated collection of PC builds for different use cases and budgets. 
              Get inspired and see what our AI can create for you!
            </p>
          </div>

          {/* Example Builds Grid */}
          <div className="space-y-8">
            {exampleBuilds.map((build, index) => (
              <Card key={build.id} className="glass-card border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                      <build.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl font-bold">{build.title}</CardTitle>
                        <div className="text-right">
                          <div className="text-2xl font-black gradient-text">${build.total.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">Budget: ${build.budget.toLocaleString()}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 mt-2">
                        <Badge className={`${useCaseColors[build.useCase as keyof typeof useCaseColors]} border`}>
                          {formatUseCase(build.useCase)}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          {Array.from({ length: build.rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-nord-13 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground mt-2">{build.description}</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Components */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg flex items-center space-x-2">
                        <Settings className="h-5 w-5" />
                        <span>Components</span>
                      </h4>
                      <div className="space-y-3">
                        {build.parts.map((part, partIndex) => {
                          const IconComponent = componentIcons[part.type as keyof typeof componentIcons] || Settings
                          return (
                            <div key={partIndex} className="flex items-center justify-between p-3 bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <IconComponent className="h-5 w-5 text-primary" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <Badge variant="outline" className="text-xs mb-1">{part.type}</Badge>
                                  <p className="font-medium text-sm">{part.name}</p>
                                </div>
                              </div>
                              <p className="font-bold text-lg">${part.price_estimate}</p>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Enhanced Reasoning */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg flex items-center space-x-2">
                        <Star className="h-5 w-5" />
                        <span>Why This Build?</span>
                      </h4>
                      
                      {/* Main reasoning */}
                      <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                        <p className="text-foreground leading-relaxed text-sm">{build.reasoning}</p>
                      </div>
                      
                      {/* Interactive highlights */}
                      <div className="grid grid-cols-1 gap-3">
                        <div className="p-3 bg-nord-14/10 rounded-lg border border-nord-14/20">
                          <div className="flex items-center space-x-2 mb-1">
                            <div className="w-2 h-2 bg-nord-14 rounded-full"></div>
                            <h5 className="font-semibold text-nord-14 text-sm">Performance Match</h5>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Optimized for {build.useCase} within ${build.budget.toLocaleString()} budget.
                          </p>
                        </div>
                        
                        <div className="p-3 bg-nord-9/10 rounded-lg border border-nord-9/20">
                          <div className="flex items-center space-x-2 mb-1">
                            <div className="w-2 h-2 bg-nord-9 rounded-full"></div>
                            <h5 className="font-semibold text-nord-9 text-sm">Value Efficiency</h5>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Maximum performance per dollar with proven components.
                          </p>
                        </div>
                      </div>
                      
                      {/* Performance Highlights */}
                      <div className="space-y-2">
                        <h5 className="font-medium text-sm">Perfect For:</h5>
                        <div className="flex flex-wrap gap-2">
                          {build.useCase === 'gaming' && (
                            <>
                              <Badge variant="outline" className="text-xs bg-nord-11/10 text-nord-11 border-nord-11/20">4K Gaming</Badge>
                              <Badge variant="outline" className="text-xs bg-nord-11/10 text-nord-11 border-nord-11/20">High FPS</Badge>
                              <Badge variant="outline" className="text-xs bg-nord-11/10 text-nord-11 border-nord-11/20">Streaming</Badge>
                            </>
                          )}
                          {build.useCase === 'video-editing' && (
                            <>
                              <Badge variant="outline" className="text-xs bg-nord-15/10 text-nord-15 border-nord-15/20">4K Video</Badge>
                              <Badge variant="outline" className="text-xs bg-nord-15/10 text-nord-15 border-nord-15/20">Fast Rendering</Badge>
                              <Badge variant="outline" className="text-xs bg-nord-15/10 text-nord-15 border-nord-15/20">Multi-tasking</Badge>
                            </>
                          )}
                          {build.useCase === 'programming' && (
                            <>
                              <Badge variant="outline" className="text-xs bg-nord-14/10 text-nord-14 border-nord-14/20">Fast Compilation</Badge>
                              <Badge variant="outline" className="text-xs bg-nord-14/10 text-nord-14 border-nord-14/20">Multiple IDEs</Badge>
                              <Badge variant="outline" className="text-xs bg-nord-14/10 text-nord-14 border-nord-14/20">Virtual Machines</Badge>
                            </>
                          )}
                          {build.useCase === 'productivity' && (
                            <>
                              <Badge variant="outline" className="text-xs bg-nord-9/10 text-nord-9 border-nord-9/20">Office Work</Badge>
                              <Badge variant="outline" className="text-xs bg-nord-9/10 text-nord-9 border-nord-9/20">Web Browsing</Badge>
                              <Badge variant="outline" className="text-xs bg-nord-9/10 text-nord-9 border-nord-9/20">Light Tasks</Badge>
                            </>
                          )}
                        </div>
                      </div>
                      
                      {/* Key component highlight */}
                      <div className="space-y-2">
                        <h5 className="font-medium text-sm">Key Components:</h5>
                        <div className="flex flex-wrap gap-2">
                          {build.parts.slice(0, 4).map((part, idx) => {
                            const IconComponent = componentIcons[part.type as keyof typeof componentIcons] || Settings
                            return (
                              <Badge key={idx} variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20 flex items-center space-x-1">
                                <IconComponent className="h-3 w-3" />
                                <span>{part.type}</span>
                              </Badge>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center space-y-6 py-12">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Ready to Build Your
              <span className="gradient-text"> Perfect PC</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              These are just examples! Our AI can create a custom build tailored specifically to your needs, budget, and preferences.
            </p>
            <div className="mt-8">
              <Link href="/build">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 border-0 shadow-lg hover:shadow-xl group"
              >
                Create My Custom Build
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}