# GeniusRig

A modern SaaS application that provides AI-powered PC build recommendations based on your budget, use case, and preferences.

## Features

- 🤖 AI-powered component recommendations using Google Gemini
- 💬 Intelligent chatbot assistant (RigBot) for instant PC building help
- 💰 Budget-optimized builds
- 🎯 Use case specific recommendations (gaming, productivity, video editing, etc.)
- 📱 Responsive design with Tailwind CSS
- 🎨 Modern UI components with shadcn/ui
- 📊 Build history dashboard
- 🔧 Component compatibility checking

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **AI Integration**: Google Gemini API
- **Language**: TypeScript
- **Deployment**: Vercel

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── build/             # Build assistant page
│   ├── dashboard/         # Build history dashboard
│   ├── about/             # About page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── navbar.tsx        # Navigation component
├── lib/                  # Utility functions
├── types/                # TypeScript type definitions
└── globals.css           # Global styles
```

## License

This project is licensed under the MIT License.