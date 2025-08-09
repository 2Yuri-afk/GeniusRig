# GeniusRig

A modern SaaS application that provides AI-powered PC build recommendations based on your budget, use case, and preferences.

## Features

- 🤖 AI-powered component recommendations using OpenAI GPT
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

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd geniusrig
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Add your Google Gemini API key to `.env.local`:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

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

## API Routes

### POST /api/generate-build

Generates PC build recommendations based on user requirements.

**Request Body:**
```json
{
  "budget": 1500,
  "useCase": "gaming",
  "preferredBrands": "Intel, NVIDIA" // optional
}
```

**Response:**
```json
{
  "parts": [
    {
      "name": "Intel Core i5-13600K",
      "type": "CPU",
      "price_estimate": 300
    }
    // ... more components
  ],
  "total_estimate": 1450,
  "reasoning": "This build focuses on gaming performance..."
}
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `OPENAI_API_KEY` environment variable in Vercel dashboard
4. Deploy!

The app will be automatically deployed on every push to the main branch.

## Environment Variables

- `GEMINI_API_KEY`: Your Google Gemini API key for generating build recommendations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.