import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { DESIGN_SYSTEM } from '../../lib/design-system'

interface CardProps {
  children: ReactNode
  className?: string
  size?: 'default' | 'large'
  animated?: boolean
  delay?: number
  to?: string
  href?: string
  target?: string
  rel?: string
}

export function Card({
  children,
  className = '',
  size = 'default',
  animated = true,
  delay = 0,
  to,
  href,
  target,
  rel
}: CardProps) {
  const baseClasses = `
    glass-card
    relative isolate overflow-hidden
    ${size === 'large' ? 'p-8' : 'p-6'}
    ${className}
  `

  const Component: any = to ? Link : href ? 'a' : 'div'
  const componentProps = to
    ? { to }
    : href
    ? { href, target, rel }
    : {}

  if (!animated) {
    return (
      <Component
        className={baseClasses}
        {...componentProps}
      >
        {children}
      </Component>
    )
  }

  return (
    <motion.div
      {...DESIGN_SYSTEM.getCardMotionProps(delay)}
      className={baseClasses}
      {...componentProps}
    >
      {children}
    </motion.div>
  )
}

interface CardTitleProps {
  children: ReactNode
  className?: string
  size?: 'base' | 'large'
}

export function CardTitle({ children, className = '', size = 'base' }: CardTitleProps) {
  const sizeClasses = {
    base: 'text-xl',
    large: 'text-2xl'
  }
  
  return (
    <h3 className={`${sizeClasses[size]} font-display font-semibold text-primary mb-2 ${className}`}>
      {children}
    </h3>
  )
}

interface CardDescriptionProps {
  children: ReactNode
  className?: string
  size?: 'sm' | 'base'
}

export function CardDescription({ children, className = '', size = 'base' }: CardDescriptionProps) {
  const sizeClasses = {
    sm: 'text-sm',
    base: 'text-base'
  }
  
  return (
    <p className={`text-secondary ${sizeClasses[size]} ${className}`}>
      {children}
    </p>
  )
}
