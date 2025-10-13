import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { DESIGN_SYSTEM } from '../../lib/design-system'

interface SectionProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function Section({ children, className = '', delay = 0.2 }: SectionProps) {
  return (
    <motion.div
      {...DESIGN_SYSTEM.getSectionMotionProps(delay)}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface SectionTitleProps {
  children: ReactNode
  className?: string
  centered?: boolean
}

export function SectionTitle({ children, className = '', centered = true }: SectionTitleProps) {
  return (
    <h2 className={`text-3xl font-display font-bold text-primary mb-8 ${centered ? 'text-center' : ''} ${className}`}>
      {children}
    </h2>
  )
}

interface SectionDescriptionProps {
  children: ReactNode
  className?: string
  size?: 'base' | 'large'
}

export function SectionDescription({ children, className = '', size = 'base' }: SectionDescriptionProps) {
  const sizeClasses = {
    base: 'text-base',
    large: 'text-lg'
  }
  
  return (
    <p className={`${sizeClasses[size]} text-secondary leading-relaxed ${className}`}>
      {children}
    </p>
  )
}
