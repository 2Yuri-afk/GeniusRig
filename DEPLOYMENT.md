# Deployment Guide

## Deploy to Vercel

### Prerequisites
- GitHub account
- Vercel account
- Google Gemini API key

### Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: AI PC Build Assistant"
   git branch -M main
   git remote add origin https://github.com/yourusername/ai-pc-build-assistant.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables:
     - `GEMINI_API_KEY`: Your Google Gemini API key

3. **Environment Variables Setup**
   In Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add: `GEMINI_API_KEY` = `your_gemini_api_key_here`
   - Make sure it's available for Production, Preview, and Development

4. **Deploy**
   - Click "Deploy"
   - Your app will be live at `https://your-project-name.vercel.app`

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local and add your Google Gemini API key
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

### Production Build

```bash
npm run build
npm start
```

### Features Included

✅ Responsive design with Tailwind CSS
✅ Modern UI with shadcn/ui components
✅ AI-powered build recommendations
✅ Build history with localStorage
✅ Multiple use case support
✅ Budget optimization
✅ Brand preference handling
✅ Error handling and loading states
✅ TypeScript support
✅ ESLint configuration
✅ Production-ready build

### API Usage

The app uses Google's Gemini 1.5 Flash model to generate PC build recommendations. Make sure you have enabled the Generative Language API in your Google Cloud Console.

### Customization

- Modify `src/app/api/generate-build/route.ts` to use different AI models
- Update `src/types/build.ts` to add more fields
- Customize styling in `src/app/globals.css`
- Add more use cases in `src/app/build/page.tsx`