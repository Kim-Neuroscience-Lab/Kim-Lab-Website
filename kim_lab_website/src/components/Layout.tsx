import { type ReactNode } from 'react'
import { Navigation } from './Navigation'
import { Footer } from './Footer'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1 relative pt-16">
        {children}
      </main>
      <Footer />
    </div>
  )
}
