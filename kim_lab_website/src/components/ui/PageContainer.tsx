import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { DESIGN_SYSTEM } from '../../lib/design-system'

interface PageContainerProps {
  children: ReactNode
  className?: string
  fullHeight?: boolean
}

export function PageContainer({ children, className = '', fullHeight = true }: PageContainerProps) {
  return (
    <div className={`${fullHeight ? 'min-h-screen' : ''} pt-24 sm:pt-28 pb-24 sm:pb-28 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  )
}

interface PageHeaderProps {
  title: string
  description?: string
  className?: string
}

export function PageHeader({ title, description, className = '' }: PageHeaderProps) {
  return (
    <motion.div
      initial={DESIGN_SYSTEM.MOTION_VARIANTS.page.initial}
      animate={DESIGN_SYSTEM.MOTION_VARIANTS.page.animate}
      transition={DESIGN_SYSTEM.TRANSITIONS.page}
      className={`text-center mb-16 ${className}`}
    >
      <h1 className="text-4xl sm:text-5xl font-display font-bold text-primary mb-6">
        {title}
      </h1>
      {description && (
        <p className="text-xl text-secondary max-w-4xl mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  )
}
