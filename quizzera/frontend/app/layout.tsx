import type { Metadata } from 'next'
import './globals.css'
import { ReactQueryClientProvider } from '../lib/react-query'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata: Metadata = {
  title: 'Quizzera – The Ultimate Online Quiz & Exam Platform',
  description: 'Practice quizzes, timed exams, analytics, and leaderboards built for students and educators.',
  metadataBase: new URL('https://quizzera.pk'),
  openGraph: {
    siteName: 'Quizzera',
    type: 'website',
    locale: 'en_PK',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <ReactQueryClientProvider>
          {children}
        </ReactQueryClientProvider>
        <Footer />
      </body>
    </html>
  )
}