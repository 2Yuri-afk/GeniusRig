"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Typing animation for tech text
export function TypingAnimation({ 
  text, 
  className = "",
  speed = 100,
  showCursor = true 
}: {
  text: string;
  className?: string;
  speed?: number;
  showCursor?: boolean;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && !isComplete && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
}

// Glitch effect for tech elements
export function GlitchText({ 
  children, 
  className = "",
  intensity = "low",
  triggerOnHover = false 
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: "low" | "medium" | "high";
  triggerOnHover?: boolean;
}) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (!triggerOnHover) {
      const glitchInterval = setInterval(() => {
        if (Math.random() > 0.7) {
          setIsGlitching(true);
          setTimeout(() => setIsGlitching(false), 400); // Increased from 200ms to 400ms
        }
      }, 3000); // Increased from 1500ms to 3000ms

      return () => clearInterval(glitchInterval);
    }
  }, [triggerOnHover]);

  const handleMouseEnter = () => {
    if (triggerOnHover) {
      setIsGlitching(true);
    }
  };

  const handleMouseLeave = () => {
    if (triggerOnHover) {
      setIsGlitching(false);
    }
  };

  const glitchStyles = {
    low: "translate-x-1 text-primary/80 drop-shadow-sm",
    medium: "translate-x-2 skew-x-2 text-accent/90 drop-shadow-md scale-105",
    high: "translate-x-3 skew-x-3 text-red-500/80 drop-shadow-lg scale-110"
  };

  return (
    <span 
      className={cn(
        "inline-block transition-all duration-100 cursor-pointer",
        isGlitching && glitchStyles[intensity],
        isGlitching && "animate-pulse",
        className
      )}
      style={{
        textShadow: isGlitching ? "2px 0 #BF616A, -2px 0 #81A1C1" : "none"
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </span>
  );
}

// Matrix-style falling code
export function MatrixRain({ className = "" }: { className?: string }) {
  const [drops, setDrops] = useState<Array<{ id: number; left: number; delay: number }>>([]);

  useEffect(() => {
    const newDrops = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5
    }));
    setDrops(newDrops);
  }, []);

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="absolute text-xs font-mono text-primary/20 animate-pulse"
          style={{
            left: `${drop.left}%`,
            animationDelay: `${drop.delay}s`,
            animationDuration: "3s"
          }}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="mb-1">
              {Math.random() > 0.5 ? "1" : "0"}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// Floating particles for tech atmosphere
export function FloatingParticles({ 
  count = 15,
  className = "" 
}: { 
  count?: number;
  className?: string;
}) {
  const [particles, setParticles] = useState<Array<{
    id: number;
    size: number;
    left: number;
    top: number;
    duration: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, [count]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-primary/10 animate-pulse"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
    </div>
  );
}

// Scan line effect
export function ScanLine({ className = "" }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent h-1 animate-pulse" 
           style={{ 
             animation: "scan 3s linear infinite",
             background: "linear-gradient(90deg, transparent, rgba(129, 161, 193, 0.3), transparent)"
           }} />
      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </div>
  );
}

// Circuit board lines
export function CircuitLines({ className = "" }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {/* Horizontal lines */}
      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse" />
      <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent animate-pulse" 
           style={{ animationDelay: "1s" }} />
      
      {/* Vertical lines */}
      <div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-primary/15 to-transparent animate-pulse" 
           style={{ animationDelay: "0.5s" }} />
      <div className="absolute right-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-accent/15 to-transparent animate-pulse" 
           style={{ animationDelay: "1.5s" }} />
      
      {/* Circuit nodes */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/40 rounded-full animate-ping" />
      <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-accent/40 rounded-full animate-ping" 
           style={{ animationDelay: "1s" }} />
    </div>
  );
}

// Holographic border effect
export function HoloBorder({ 
  children, 
  className = "",
  intensity = "medium" 
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: "low" | "medium" | "high";
}) {
  const intensityStyles = {
    low: "shadow-lg shadow-primary/20",
    medium: "shadow-xl shadow-primary/30 border border-primary/30",
    high: "shadow-2xl shadow-primary/40 border border-primary/50"
  };

  return (
    <div className={cn(
      "relative rounded-lg backdrop-blur-sm bg-background/80",
      intensityStyles[intensity],
      "before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-primary/20 before:via-transparent before:to-accent/20 before:animate-pulse",
      className
    )}>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}