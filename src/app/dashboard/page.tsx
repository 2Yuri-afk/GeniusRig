"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { formatCurrency } from "@/lib/currency"
import { PCBuild } from "@/types/build"
import { 
  Cpu, 
  HardDrive, 
  MemoryStick, 
  Monitor, 
  Zap, 
  Settings,
  Trash2,
  Calendar,
  DollarSign,
  TrendingUp,
  Sparkles,
  Plus,
  BarChart3,
  Clock,
  Filter,
  Search,
  Download
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

const useCaseColors = {
  gaming: "bg-nord-11/10 text-nord-11 border-nord-11/20",
  "video-editing": "bg-nord-15/10 text-nord-15 border-nord-15/20",
  programming: "bg-nord-14/10 text-nord-14 border-nord-14/20",
  productivity: "bg-nord-9/10 text-nord-9 border-nord-9/20",
  streaming: "bg-nord-12/10 text-nord-12 border-nord-12/20",
  general: "bg-nord-3/10 text-nord-3 border-nord-3/20",
  workstation: "bg-nord-12/10 text-nord-12 border-nord-12/20",
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

export default function DashboardPage() {
  const [builds, setBuilds] = useState<PCBuild[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"date" | "budget" | "useCase">("date")

  useEffect(() => {
    // Load builds from localStorage
    try {
      const savedBuilds = localStorage.getItem("pcBuilds")
      if (savedBuilds) {
        const parsedBuilds = JSON.parse(savedBuilds)
        setBuilds(parsedBuilds.sort((a: PCBuild, b: PCBuild) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ))
      }
    } catch (error) {
      console.error("Error loading builds:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const clearHistory = () => {
    localStorage.removeItem("pcBuilds")
    setBuilds([])
  }

  const deleteBuild = (buildId: string) => {
    const updatedBuilds = builds.filter(build => build.id !== buildId)
    setBuilds(updatedBuilds)
    localStorage.setItem("pcBuilds", JSON.stringify(updatedBuilds))
  }

  const downloadBuildPDF = async (build: PCBuild) => {
    // Dynamic import to avoid SSR issues
    const { jsPDF } = await import('jspdf')
    
    // Create new PDF document
    const doc = new jsPDF()
    
    // Set up fonts and colors
    const primaryColor = [129, 161, 193] // Nord 9 blue
    const textColor = [76, 86, 106] // Nord 3 gray
    const accentColor = [143, 188, 187] // Nord 7 teal
    
    let yPosition = 20
    
    // Header
    doc.setFontSize(24)
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
    doc.text('GeniusRig PC Build Report', 20, yPosition)
    
    yPosition += 15
    doc.setFontSize(10)
    doc.setTextColor(textColor[0], textColor[1], textColor[2])
    doc.text('AI-Powered PC Build Assistant', 20, yPosition)
    
    // Line separator
    yPosition += 10
    doc.setDrawColor(accentColor[0], accentColor[1], accentColor[2])
    doc.line(20, yPosition, 190, yPosition)
    
    // Build Details Section
    yPosition += 15
    doc.setFontSize(16)
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
    doc.text('Build Details', 20, yPosition)
    
    yPosition += 10
    doc.setFontSize(11)
    doc.setTextColor(textColor[0], textColor[1], textColor[2])
    
    const details = [
      `Use Case: ${build.useCase.charAt(0).toUpperCase() + build.useCase.slice(1)}`,
      `Budget: ${formatCurrency(build.budget, build.currency)}`,
      `Total Cost: ${formatCurrency(build.total_estimate, build.currency)}`,
      `Created: ${new Date(build.createdAt).toLocaleDateString()}`,
      ...(build.preferredBrands ? [`Preferred Brands: ${build.preferredBrands}`] : [])
    ]
    
    details.forEach(detail => {
      doc.text(detail, 25, yPosition)
      yPosition += 7
    })
    
    // Components Section
    yPosition += 10
    doc.setFontSize(16)
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
    doc.text('Components', 20, yPosition)
    
    yPosition += 10
    doc.setFontSize(11)
    doc.setTextColor(textColor[0], textColor[1], textColor[2])
    
    // Components table header
    doc.setFont('helvetica', 'bold')
    doc.text('Type', 25, yPosition)
    doc.text('Component', 60, yPosition)
    doc.text('Price', 150, yPosition)
    
    yPosition += 5
    doc.line(25, yPosition, 180, yPosition)
    yPosition += 7
    
    // Components list
    doc.setFont('helvetica', 'normal')
    build.parts.forEach(part => {
      if (yPosition > 250) { // New page if needed
        doc.addPage()
        yPosition = 20
      }
      
      doc.text(part.type, 25, yPosition)
      
      // Wrap long component names
      const componentName = part.name.length > 35 ? part.name.substring(0, 32) + '...' : part.name
      doc.text(componentName, 60, yPosition)
      
      doc.text(formatCurrency(part.price_estimate, build.currency), 150, yPosition)
      yPosition += 7
    })
    
    // Total
    yPosition += 5
    doc.line(25, yPosition, 180, yPosition)
    yPosition += 7
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
    doc.text('TOTAL:', 25, yPosition)
    doc.text(formatCurrency(build.total_estimate, build.currency), 150, yPosition)
    
    // Why This Build Section
    yPosition += 20
    if (yPosition > 220) { // New page if needed
      doc.addPage()
      yPosition = 20
    }
    
    doc.setFontSize(16)
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
    doc.text('Why This Build?', 20, yPosition)
    
    yPosition += 10
    doc.setFontSize(11)
    doc.setTextColor(textColor[0], textColor[1], textColor[2])
    doc.setFont('helvetica', 'normal')
    
    // Split reasoning into lines
    const reasoningLines = doc.splitTextToSize(build.reasoning, 170)
    reasoningLines.forEach((line: string) => {
      if (yPosition > 270) { // New page if needed
        doc.addPage()
        yPosition = 20
      }
      doc.text(line, 20, yPosition)
      yPosition += 6
    })
    
    // Footer
    const pageCount = doc.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setFontSize(8)
      doc.setTextColor(textColor[0], textColor[1], textColor[2])
      doc.text('Generated by GeniusRig', 20, 285)
      doc.text(`Page ${i} of ${pageCount}`, 170, 285)
    }
    
    // Download the PDF
    const fileName = `GeniusRig-${build.useCase}-Build-${formatCurrency(build.budget, build.currency).replace(/[^a-zA-Z0-9]/g, '')}.pdf`
    doc.save(fileName)
  }

  const filteredBuilds = builds.filter(build =>
    build.useCase.toLowerCase().includes(searchTerm.toLowerCase()) ||
    build.preferredBrands?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    build.budget.toString().includes(searchTerm)
  )

  const sortedBuilds = [...filteredBuilds].sort((a, b) => {
    switch (sortBy) {
      case "budget":
        return b.budget - a.budget
      case "useCase":
        return a.useCase.localeCompare(b.useCase)
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })

  const totalSpent = builds.reduce((sum, build) => sum + build.total_estimate, 0)
  const avgBudget = builds.length > 0 ? Math.round(totalSpent / builds.length) : 0

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="space-y-4">
            <Skeleton className="h-12 w-64" />
            <Skeleton className="h-6 w-96" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-xl" />
            ))}
          </div>
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    )
  }

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
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight">
                  Build
                  <span className="gradient-text"> Dashboard</span>
                </h1>
                <p className="text-xl text-muted-foreground mt-2">
                  Track and manage your PC build history
                </p>
              </div>
              <div className="flex gap-3">
                <Button asChild className="bg-primary hover:bg-primary/90 border-0">
                  <a href="/build">
                    <Plus className="h-4 w-4 mr-2" />
                    New Build
                  </a>
                </Button>
                {builds.length > 0 && (
                  <Button variant="outline" onClick={clearHistory}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                )}
              </div>
            </div>

            {/* Stats Cards */}
            {builds.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <Card className="glass-card border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-nord-9/10 rounded-xl flex items-center justify-center">
                        <BarChart3 className="h-6 w-6 text-nord-9" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Builds</p>
                        <p className="text-2xl font-bold">{builds.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-nord-14/10 rounded-xl flex items-center justify-center">
                        <DollarSign className="h-6 w-6 text-nord-14" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Value</p>
                        <p className="text-2xl font-bold">{formatCurrency(totalSpent, builds[0]?.currency || 'USD')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-nord-15/10 rounded-xl flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-nord-15" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Avg Budget</p>
                        <p className="text-2xl font-bold">{formatCurrency(avgBudget, builds[0]?.currency || 'USD')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-nord-12/10 rounded-xl flex items-center justify-center">
                        <Clock className="h-6 w-6 text-nord-12" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Latest Build</p>
                        <p className="text-2xl font-bold">
                          {builds.length > 0 ? new Date(builds[0].createdAt).toLocaleDateString() : 'None'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Search and Filter */}
            {builds.length > 0 && (
              <Card className="glass-card border-0">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search builds by use case, brands, or budget..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Filter className="h-4 w-4 text-muted-foreground" />
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as "date" | "budget" | "useCase")}
                        className="px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="date">Sort by Date</option>
                        <option value="budget">Sort by Budget</option>
                        <option value="useCase">Sort by Use Case</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Builds Grid */}
          {builds.length === 0 ? (
            <Card className="glass-card border-0 shadow-2xl">
              <CardContent className="pt-16 pb-16 text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <Cpu className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-2">No builds yet</h3>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Start by creating your first PC build! Our AI will help you find the perfect components for your needs and budget.
                </p>
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 border-0">
                  <a href="/build">
                    <Plus className="h-5 w-5 mr-2" />
                    Generate Your First Build
                  </a>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {sortedBuilds.map((build, index) => (
                <Card key={build.id} className="glass-card border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-2xl font-bold">
                            {formatCurrency(build.budget, build.currency)} Build
                          </h3>
                          <Badge className={`${useCaseColors[build.useCase as keyof typeof useCaseColors] || useCaseColors.general} border`}>
                            {formatUseCase(build.useCase)}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(build.createdAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{new Date(build.createdAt).toLocaleTimeString()}</span>
                          </div>
                          {build.preferredBrands && (
                            <div className="flex items-center space-x-1">
                              <Sparkles className="h-4 w-4" />
                              <span>Brands: {build.preferredBrands}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => downloadBuildPDF(build)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/10 hover:text-primary"
                          title="Download build as PDF"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteBuild(build.id)}
                          className="text-nord-11 hover:text-nord-11/80 hover:bg-nord-11/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Components */}
                      <div className="lg:col-span-2 space-y-4">
                        <h4 className="font-semibold text-lg flex items-center space-x-2">
                          <Settings className="h-5 w-5" />
                          <span>Components</span>
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {build.parts.map((part, partIndex) => {
                            const IconComponent = componentIcons[part.type as keyof typeof componentIcons] || Settings
                            return (
                              <div key={partIndex} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <IconComponent className="h-4 w-4 text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs text-muted-foreground">{part.type}</p>
                                  <p className="font-medium text-sm truncate">{part.name}</p>
                                </div>
                                <p className="font-bold text-sm">{formatCurrency(part.price_estimate, build.currency)}</p>
                              </div>
                            )
                          })}
                        </div>
                        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20">
                          <span className="font-bold text-lg">Total Cost:</span>
                          <span className="text-xl font-black gradient-text">{formatCurrency(build.total_estimate, build.currency)}</span>
                        </div>
                      </div>

                      {/* AI Insights */}
                      <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                        <div className="space-y-3">
                          <h4 className="font-semibold text-lg flex items-center space-x-2">
                            <Sparkles className="h-5 w-5 text-primary" />
                            <span>AI Insights</span>
                          </h4>
                          <div className="p-3 bg-muted/20 rounded-lg">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {build.reasoning}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Results Summary */}
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Showing {sortedBuilds.length} of {builds.length} build{builds.length !== 1 ? "s" : ""}
                  {searchTerm && ` matching "${searchTerm}"`}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}