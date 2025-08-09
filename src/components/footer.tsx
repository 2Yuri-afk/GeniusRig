"use client"

import Link from "next/link"
import { Cpu, Github, Twitter, Mail, Bot } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-t from-nord-0/5 to-transparent border-t border-primary/10">

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0">
          {/* Left Side - Brand */}
          <div className="text-center lg:text-left space-y-4">
            <Link href="/" className="flex items-center space-x-4 group justify-center lg:justify-start">
              <Cpu className="h-12 w-12 text-primary transition-transform duration-300 group-hover:rotate-180" />
              <span
                className="font-heading font-black tracking-wider antialiased transition-all ease-in-out"
                style={{
                  fontSize: "2rem",
                  fontFeatureSettings: '"kern" 1',
                  textRendering: "optimizeLegibility",
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                }}
              >
                <span className="text-foreground">Genius</span>
                <span className="gradient-text">Rig</span>
              </span>
            </Link>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              Build your perfect PC with AI-powered recommendations. Get compatible components, 
              optimized pricing, and expert insights for any budget.
            </p>
          </div>

          {/* Right Side - Personal Branding & Links */}
          <div className="text-center lg:text-right space-y-4">
            {/* Built by */}
            <div className="flex items-center justify-center lg:justify-end space-x-2 text-sm text-muted-foreground">
              <span>Built by</span>
              <span className="text-primary font-mono">@vulnerablepie</span>
              <Bot className="h-4 w-4 text-primary" />
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center lg:justify-end space-x-3">
              <Link 
                href="https://github.com/2Yuri-afk" 
                className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors duration-200 group"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
              </Link>
              <Link 
                href="https://twitter.com/vulnerablepie" 
                className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors duration-200 group"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
              </Link>
              <Link 
                href="mailto:corenandrei.andino@gmail.com" 
                className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors duration-200 group"
                aria-label="Email"
              >
                <Mail className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
              </Link>
            </div>

            {/* Tech Stack */}
            <div className="text-xs text-muted-foreground">
              Powered by <span className="text-primary font-mono">Gemini 2.0</span> • 
              Built with <span className="text-primary font-mono">Next.js</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}