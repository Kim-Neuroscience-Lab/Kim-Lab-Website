import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { Card, CardTitle, CardDescription } from './Card'
import { DESIGN_SYSTEM } from '../../lib/design-system'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
  color?: string
  to?: string
}

interface FeatureGridProps {
  features: Feature[]
  columns?: 2 | 3 | 4
  delay?: number
  className?: string
}

export function FeatureGrid({ 
  features, 
  columns = 4, 
  delay = 1,
  className = ''
}: FeatureGridProps) {
  const gridClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }

  return (
    <motion.div
      initial={DESIGN_SYSTEM.MOTION_VARIANTS.featureGrid.initial}
      animate={DESIGN_SYSTEM.MOTION_VARIANTS.featureGrid.animate}
      transition={DESIGN_SYSTEM.getTransitionWithDelay('featureGrid', delay)}
      className={`grid ${gridClasses[columns]} gap-8 ${className}`}
    >
      {features.map((feature, index) => (
        <Card
          key={feature.title}
          delay={DESIGN_SYSTEM.getCardDelay(delay, index)}
          className="text-center"
          to={feature.to}
        >
          <feature.icon className={`h-12 w-12 mx-auto mb-4 ${feature.color || 'text-moebius-blue-400'}`} />
          <CardTitle>{feature.title}</CardTitle>
          <CardDescription size="sm">{feature.description}</CardDescription>
        </Card>
      ))}
    </motion.div>
  )
}
