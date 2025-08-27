import type { Metadata } from 'next'
import './globals.css'
import { ReactQueryClientProvider } from '../lib/react-query'

export const metadata: Metadata = {
  title: 'Quizzera – The Ultimate Online Quiz & Exam Platform',
  description: 'Practice quizzes, timed exams, analytics, and leaderboards built for students and educators.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReactQueryClientProvider>
          {children}
        </ReactQueryClientProvider>
      </body>
    </html>
  )
}