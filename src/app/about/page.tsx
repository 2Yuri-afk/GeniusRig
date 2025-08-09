import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-heading font-bold tracking-tight">
            About <span className="gradient-text">GeniusRig</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Your intelligent companion for building the perfect PC
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>What We Do</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              GeniusRig is a smart tool that helps you build the perfect computer 
              for your needs and budget. Using advanced AI technology powered by Google Gemini 2.0, 
              we analyze your requirements and recommend compatible components that work together seamlessly.
            </p>
            <p>
              Whether you&apos;re building a gaming rig, a productivity workstation, or a video 
              editing powerhouse, GeniusRig considers factors like performance requirements, 
              budget constraints, and brand preferences to give you personalized recommendations 
              with the latest 2025 hardware including RTX 50 series and AMD RX 8000 series.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto font-bold text-lg">
                  1
                </div>
                <h3 className="font-semibold">Tell Us Your Needs</h3>
                <p className="text-sm text-muted-foreground">
                  Enter your budget, intended use, and any brand preferences
                </p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto font-bold text-lg">
                  2
                </div>
                <h3 className="font-semibold">Smart Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced algorithms process your requirements and find the best component combinations
                </p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto font-bold text-lg">
                  3
                </div>
                <h3 className="font-semibold">Get Recommendations</h3>
                <p className="text-sm text-muted-foreground">
                  Receive detailed component recommendations with pricing and reasoning
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>AI-powered component recommendations</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>Budget-optimized builds</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>Compatibility checking</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>Build history tracking</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>Mobile-friendly interface</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}