import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { Chatbot } from '@/components/chatbot'
import { Footer } from "@/components/footer"
import { PageTransition } from '@/components/page-transition'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'GeniusRig - AI PC Build Assistant',
  description: 'Build your perfect PC with AI-powered recommendations. Get compatible components, optimized pricing, and expert insights for any budget.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <Navbar />
        <main className="min-h-screen bg-background">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  )
}