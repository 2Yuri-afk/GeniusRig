"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
        {/* Animated Pixelated PC Graphics */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Left Side - 8-bit Desktop PC */}
          <div className="absolute left-20 top-1/2 transform -translate-y-1/2 floating-animation opacity-20">
            <div
              className="pixel-pc-desktop scale-75 lg:scale-100"
              style={{ imageRendering: "pixelated" }}
            >
              {/* 8-bit Monitor */}
              <div className="relative">
                <div className="w-32 h-20 bg-gray-800 mb-2 pixel-art">
                  <div className="w-full h-full bg-blue-500 p-1">
                    <div className="w-full h-1 bg-white mb-1"></div>
                    <div className="w-24 h-1 bg-white mb-1"></div>
                    <div className="w-16 h-1 bg-white mb-1"></div>
                    <div className="w-20 h-1 bg-white mb-1"></div>
                    <div className="w-12 h-1 bg-white"></div>
                  </div>
                </div>
                {/* Monitor Stand - pixelated */}
                <div className="w-8 h-4 bg-gray-600 mx-auto"></div>
                <div className="w-16 h-2 bg-gray-700 mx-auto"></div>
              </div>

              {/* 8-bit PC Case */}
              <div className="w-16 h-24 bg-gray-900 mt-4 relative pixel-art">
                <div className="w-2 h-2 bg-green-400 absolute top-2 left-2 animate-pulse"></div>
                <div className="w-2 h-2 bg-blue-400 absolute top-2 left-6"></div>
                <div className="w-12 h-8 bg-gray-800 absolute bottom-2 left-2">
                  <div className="w-full h-1 bg-gray-600 mb-1"></div>
                  <div className="w-full h-1 bg-gray-600 mb-1"></div>
                  <div className="w-full h-1 bg-gray-600"></div>
                </div>
                {/* Pixelated vents */}
                <div className="absolute top-6 left-1 w-1 h-1 bg-gray-600"></div>
                <div className="absolute top-6 left-3 w-1 h-1 bg-gray-600"></div>
                <div className="absolute top-6 left-5 w-1 h-1 bg-gray-600"></div>
                <div className="absolute top-8 left-1 w-1 h-1 bg-gray-600"></div>
                <div className="absolute top-8 left-3 w-1 h-1 bg-gray-600"></div>
                <div className="absolute top-8 left-5 w-1 h-1 bg-gray-600"></div>
              </div>
            </div>
          </div>

          {/* Right Side - 8-bit Gaming Setup */}
          <div
            className="absolute right-20 top-1/2 transform -translate-y-1/2 floating-animation opacity-20"
            style={{ animationDelay: "1s" }}
          >
            <div
              className="pixel-pc-gaming scale-75 lg:scale-100"
              style={{ imageRendering: "pixelated" }}
            >
              {/* 8-bit Gaming Monitor */}
              <div className="relative">
                <div className="w-36 h-24 bg-gray-900 mb-2 pixel-art">
                  <div className="w-full h-full bg-red-500 p-1">
                    <div className="w-full h-1 bg-yellow-300 mb-1"></div>
                    <div className="w-28 h-1 bg-yellow-300 mb-1"></div>
                    <div className="w-20 h-1 bg-yellow-300 mb-1"></div>
                    <div className="w-24 h-1 bg-yellow-300 mb-1"></div>
                    <div className="w-16 h-1 bg-yellow-300 mb-1"></div>
                    {/* Game-like pixels */}
                    <div className="flex gap-1 mt-2">
                      <div className="w-2 h-2 bg-green-400"></div>
                      <div className="w-2 h-2 bg-blue-400"></div>
                      <div className="w-2 h-2 bg-red-400"></div>
                      <div className="w-2 h-2 bg-yellow-400"></div>
                    </div>
                  </div>
                </div>
                {/* RGB Monitor Stand - pixelated */}
                <div className="w-10 h-6 bg-red-500 mx-auto animate-pulse"></div>
                <div className="w-20 h-3 bg-gray-800 mx-auto"></div>
              </div>

              {/* 8-bit RGB PC Case */}
              <div className="w-20 h-28 bg-gray-900 mt-4 relative pixel-art overflow-hidden">
                {/* RGB strip effect */}
                <div className="absolute top-0 left-0 w-full h-1 bg-red-500 animate-pulse"></div>
                <div
                  className="absolute top-1 left-0 w-full h-1 bg-green-500 animate-pulse"
                  style={{ animationDelay: "0.3s" }}
                ></div>
                <div
                  className="absolute top-2 left-0 w-full h-1 bg-blue-500 animate-pulse"
                  style={{ animationDelay: "0.6s" }}
                ></div>

                <div className="w-2 h-2 bg-red-400 absolute top-4 left-2 animate-pulse"></div>
                <div
                  className="w-2 h-2 bg-green-400 absolute top-4 left-6 animate-pulse"
                  style={{ animationDelay: "0.3s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-blue-400 absolute top-4 left-10 animate-pulse"
                  style={{ animationDelay: "0.6s" }}
                ></div>

                <div className="w-16 h-10 bg-gray-800 absolute bottom-3 left-2">
                  <div className="w-full h-1 bg-purple-400 animate-pulse"></div>
                  <div
                    className="w-full h-1 bg-pink-400 animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-full h-1 bg-cyan-400 animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>

                {/* Pixelated side vents */}
                <div className="absolute top-8 right-1 w-1 h-1 bg-gray-600"></div>
                <div className="absolute top-10 right-1 w-1 h-1 bg-gray-600"></div>
                <div className="absolute top-12 right-1 w-1 h-1 bg-gray-600"></div>
                <div className="absolute top-14 right-1 w-1 h-1 bg-gray-600"></div>
              </div>
            </div>
          </div>

          {/* Subtle Background Elements */}
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl floating-animation" />
          <div
            className="absolute top-3/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl floating-animation"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-8 max-w-5xl mx-auto">
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold tracking-tight leading-tight">
                <span className="block mb-2">Build Your</span>
                <span className="block mb-4">
                  <span className="gradient-text">Dream PC</span>
                </span>
                <span className="block text-4xl sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl font-body font-light text-muted-foreground">
                  with AI Precision
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

        {/* Scroll Indicator - Hidden on mobile */}
        <div className="hidden md:block absolute bottom-24 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
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
              <Card
                key={index}
                className={`glass-card border-0 hover:scale-105 transition-all duration-300 group cursor-pointer ${
                  currentFeature === index ? "pulse-glow" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
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
