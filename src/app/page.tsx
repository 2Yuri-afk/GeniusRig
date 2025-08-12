"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  TypingAnimation, 
  GlitchText, 
  FloatingParticles, 
  CircuitLines,
  HoloBorder 
} from "@/components/animations/tech-animations";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Cpu,
  Zap,
  Target,
  TrendingUp,
  Shield,
  Clock,
  ArrowRight,
  Sparkles,
  Monitor,
  HardDrive,
  MemoryStick,
  Gamepad2,
  Video,
  Code,
  Star,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "AI-Powered Intelligence",
    description:
      "Advanced machine learning algorithms analyze thousands of component combinations to find your perfect build.",
    color: "from-yellow-400 to-orange-500",
  },
  {
    icon: Target,
    title: "Precision Matching",
    description:
      "Get components that perfectly match your use case, whether gaming, content creation, or productivity.",
    color: "from-blue-400 to-purple-500",
  },
  {
    icon: TrendingUp,
    title: "Budget Optimization",
    description:
      "Maximize performance per dollar with intelligent budget allocation across all components.",
    color: "from-green-400 to-blue-500",
  },
  {
    icon: Shield,
    title: "Compatibility Guaranteed",
    description:
      "Every recommendation is verified for compatibility, ensuring your build works flawlessly.",
    color: "from-purple-400 to-pink-500",
  },
  {
    icon: Clock,
    title: "Real-time Pricing",
    description:
      "Get up-to-date market prices and availability information for all recommended components.",
    color: "from-pink-400 to-red-500",
  },
  {
    icon: Monitor,
    title: "Performance Insights",
    description:
      "Understand exactly what performance to expect from your build across different applications.",
    color: "from-indigo-400 to-cyan-500",
  },
];

const useCases = [
  { icon: Gamepad2, name: "Gaming", color: "text-nord-11" },
  { icon: Video, name: "Content Creation", color: "text-nord-15" },
  { icon: Code, name: "Development", color: "text-nord-14" },
  { icon: HardDrive, name: "Workstation", color: "text-nord-9" },
];

const stats = [
  { number: "7", label: "Component Types" },
  { number: "2025", label: "Latest Hardware" },
  { number: "24/7", label: "AI Powered" },
  { number: "10", label: "Currencies Supported" },
];

export default function HomePage() {
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center -mt-16">
        {/* Tech Atmosphere Effects */}
        <FloatingParticles count={20} className="opacity-60" />
        <CircuitLines />
        
        {/* Real PC Images - Hidden on mobile */}
        <div className="hidden lg:block absolute inset-0 overflow-hidden">
          {/* Left Side - PC Image 1 */}
          <div className="absolute left-20 top-1/2 transform -translate-y-1/2 floating-animation opacity-30 group cursor-pointer">
            <div className="relative transition-all duration-500 hover:scale-105">
              <Image
                src="/pc-image-1.png"
                alt="Gaming PC Build"
                width={200}
                height={300}
                className="object-contain drop-shadow-2xl transition-all duration-500 group-hover:drop-shadow-[0_0_30px_rgba(191,97,106,0.6)]"
                priority
              />
              {/* Nord Aurora RGB Glow - Gaming PC (Hover Only) */}
              <div className="absolute inset-0 rounded-lg blur-xl -z-10 opacity-0 group-hover:opacity-100 transition-all duration-500"
                   style={{
                     background: `
                       radial-gradient(circle at 30% 20%, rgba(191, 97, 106, 0.8) 0%, transparent 60%),
                       radial-gradient(circle at 70% 80%, rgba(208, 135, 112, 0.8) 0%, transparent 60%),
                       radial-gradient(circle at 50% 50%, rgba(235, 203, 139, 0.6) 0%, transparent 60%)
                     `,
                     animation: "aurora-glow 2s ease-in-out infinite"
                   }} />
            </div>
          </div>

          {/* Right Side - PC Image 2 */}
          <div
            className="absolute right-20 top-1/2 transform -translate-y-1/2 floating-animation opacity-30 group cursor-pointer"
            style={{ animationDelay: "1s" }}
          >
            <div className="relative transition-all duration-500 hover:scale-105">
              <Image
                src="/pc-image-2.png"
                alt="Workstation PC Build"
                width={200}
                height={300}
                className="object-contain drop-shadow-2xl transition-all duration-500 group-hover:drop-shadow-[0_0_30px_rgba(163,190,140,0.6)]"
                priority
              />
              {/* Nord Aurora RGB Glow - Workstation PC (Hover Only) */}
              <div className="absolute inset-0 rounded-lg blur-xl -z-10 opacity-0 group-hover:opacity-100 transition-all duration-500"
                   style={{
                     background: `
                       radial-gradient(circle at 40% 30%, rgba(163, 190, 140, 0.8) 0%, transparent 60%),
                       radial-gradient(circle at 60% 70%, rgba(180, 142, 173, 0.8) 0%, transparent 60%),
                       radial-gradient(circle at 20% 80%, rgba(143, 188, 187, 0.6) 0%, transparent 60%)
                     `,
                     animation: "aurora-glow 2s ease-in-out infinite"
                   }} />
            </div>
          </div>

          {/* Subtle Background Elements */}
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl floating-animation" />
          <div
            className="absolute top-3/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl floating-animation"
            style={{ animationDelay: "2s" }}
          />
        </div>

        {/* Mobile-friendly animated tech icons */}
        <div className="lg:hidden absolute inset-0 overflow-hidden pointer-events-none">
          {/* Top left - CPU icon */}
          <div className="absolute top-1/4 left-8 floating-tech-icon opacity-30">
            <Cpu className="h-8 w-8 text-primary" />
          </div>
          
          {/* Top right - Monitor icon */}
          <div 
            className="absolute top-1/3 right-8 floating-tech-icon opacity-30"
            style={{ animationDelay: "1s" }}
          >
            <Monitor className="h-8 w-8 text-accent" />
          </div>
          
          {/* Bottom left - Memory icon */}
          <div 
            className="absolute bottom-1/3 left-12 floating-tech-icon opacity-30"
            style={{ animationDelay: "2s" }}
          >
            <MemoryStick className="h-6 w-6 text-nord-14" />
          </div>
          
          {/* Bottom right - HDD icon */}
          <div 
            className="absolute bottom-1/4 right-12 floating-tech-icon opacity-30"
            style={{ animationDelay: "3s" }}
          >
            <HardDrive className="h-6 w-6 text-nord-12" />
          </div>
          
          {/* Center left - Gamepad icon */}
          <div 
            className="absolute top-1/2 left-4 floating-tech-icon opacity-25"
            style={{ animationDelay: "0.5s" }}
          >
            <Gamepad2 className="h-7 w-7 text-nord-11" />
          </div>
          
          {/* Center right - Video icon */}
          <div 
            className="absolute top-1/2 right-4 floating-tech-icon opacity-25"
            style={{ animationDelay: "1.5s" }}
          >
            <Video className="h-7 w-7 text-nord-15" />
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-8 max-w-5xl mx-auto">
            <div className="space-y-6">
              <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[8rem] xl:text-[10rem] font-heading font-bold tracking-tight leading-tight">
                <span className="block mb-2">
                  <TypingAnimation text="Build Your" speed={80} showCursor={false} />
                </span>
                <span className="block mb-4">
                  <GlitchText intensity="medium" triggerOnHover={true} className="gradient-text">
                    Dream PC
                  </GlitchText>
                </span>
                <span className="block text-4xl sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl font-body font-light text-muted-foreground">
                  <TypingAnimation text="with AI Precision" speed={60} showCursor={false} />
                </span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
                Get personalized PC build recommendations powered by
                cutting-edge AI. Tell us your budget and use case, and
                we&apos;ll craft the perfect components for you.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/build">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  Start Building Now
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/examples">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 border-primary/20 hover:border-primary/40 hover:bg-primary/10 backdrop-blur-sm"
                >
                  View Examples
                </Button>
              </Link>
            </div>

            {/* Use Cases */}
            <div className="flex flex-wrap justify-center gap-6 pt-8">
              {useCases.map((useCase, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 glass-card px-4 py-2 rounded-full"
                >
                  <useCase.icon className={`h-5 w-5 ${useCase.color}`} />
                  <span className="text-sm font-medium">{useCase.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-3xl md:text-4xl font-bold gradient-text">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold">
              Why Choose
              <span className="gradient-text"> GeniusRig</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of PC building with intelligent
              recommendations and seamless optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <HoloBorder
                key={index}
                intensity={currentFeature === index ? "high" : "medium"}
                className={`hover:scale-105 transition-all duration-300 group cursor-pointer ${
                  currentFeature === index ? "pulse-glow" : ""
                }`}
              >
                <div style={{ animationDelay: `${index * 0.1}s` }}>
                <Card className="bg-transparent border-0 shadow-none">
                <CardHeader className="space-y-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} p-3 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
                </Card>
                </div>
              </HoloBorder>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-heading font-bold">
              Ready to Build Your
              <span className="gradient-text"> Perfect PC</span>?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of satisfied builders who trust our AI to create
              their ideal setup.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/build">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 border-0 shadow-lg hover:shadow-xl group"
                >
                  Get Started Free
                  <Sparkles className="ml-2 h-5 w-5 group-hover:animate-spin" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 border-primary/20 hover:border-primary/40 hover:bg-primary/10"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
