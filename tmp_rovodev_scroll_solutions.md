# Scroll Indicator Solutions

## Current Issue
- Scroll indicator at `bottom-24` (96px from bottom)
- Chatbot button at `bottom-6 right-6` (24px from bottom/right)
- At 125%/150% screen scaling, elements may overlap

## Solution Options:

### Option 1: Remove (Simplest)
```tsx
{/* Remove lines 284-289 completely */}
```

### Option 2: Better Responsive Positioning
```tsx
{/* Scroll Indicator - Responsive positioning */}
<div className="hidden md:block absolute bottom-32 lg:bottom-28 xl:bottom-24 left-1/2 transform -translate-x-1/2 animate-bounce">
  <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
    <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
  </div>
</div>
```

### Option 3: Smart Positioning (Avoid chatbot)
```tsx
{/* Scroll Indicator - Left side to avoid chatbot */}
<div className="hidden md:block absolute bottom-24 left-8 animate-bounce">
  <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
    <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
  </div>
</div>
```

### Option 4: Hide when chatbot is present
```tsx
{/* Scroll Indicator - Hidden when chatbot might interfere */}
<div className="hidden md:block xl:block absolute bottom-24 left-1/2 transform -translate-x-1/2 animate-bounce">
  <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
    <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
  </div>
</div>
```