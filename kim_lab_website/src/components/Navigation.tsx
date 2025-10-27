import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, BrainCircuit } from 'lucide-react'
import { cn } from '../lib/utils'

const navigationItems = [
  { name: 'Research', href: '/research' },
  { name: 'People', href: '/people' },
  { name: 'Publications', href: '/publications' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Lab Fun', href: '/lab-fun' },
  { name: 'Code', href: '/code' },
  { name: 'Positions', href: '/positions' },
  { name: 'Land Acknowledgment', href: '/land-acknowledgment' },
  { name: 'Contact', href: '/contact' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full">
      <div className="absolute inset-0 rounded-b-2xl bg-[rgba(248,250,252,0.75)] border-b border-[rgba(166,183,217,0.25)] shadow-[0_12px_40px_rgba(166,183,217,0.12),0_4px_12px_rgba(0,0,0,0.08)] backdrop-blur-xl"></div>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="relative flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-primary hover:text-moebius-blue-300 transition-colors duration-200 ease-out"
          >
            <BrainCircuit className="h-8 w-8 text-moebius-blue-400" />
            <span className="font-display font-bold text-xl">
              Kim Neuroscience lab
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-4 flex items-baseline space-x-1.5">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'px-2 py-1.5 rounded-md text-xs font-medium transition-all duration-200 relative whitespace-nowrap',
                    location.pathname === item.href
                      ? 'text-white bg-moebius-blue-400/85 shadow-sm'
                      : 'text-secondary hover:text-primary hover:bg-moebius-blue-400/10 hover:backdrop-blur-sm transition-all duration-200 ease-out'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-secondary hover:text-primary hover:bg-moebius-blue-400/10 focus:outline-none focus:ring-2 focus:ring-moebius-blue-400/30 transition-all duration-200 ease-out"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/50 backdrop-blur-sm border-t border-moebius-blue-400/20"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'block px-3 py-2 rounded-md text-base font-medium transition-colors',
                    location.pathname === item.href
                      ? 'text-white bg-moebius-blue-400/85 shadow-sm'
                      : 'text-secondary hover:text-primary hover:bg-moebius-blue-400/10 transition-all duration-200 ease-out'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
