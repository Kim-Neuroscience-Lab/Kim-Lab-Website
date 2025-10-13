/**
 * Centralized Design System
 * Single source of truth for all animations, transitions, and styling patterns
 */

// =============================================================================
// ANIMATION CONSTANTS
// =============================================================================

export const DURATIONS = {
  // Framer Motion durations
  FAST: 0.3,
  NORMAL: 0.6, 
  SLOW: 0.8,
  EXTRA_SLOW: 1.2,
  
  // CSS transition durations  
  CSS_FAST: '0.3s',
  CSS_NORMAL: '0.6s', 
  CSS_SLOW: '0.8s',
  CSS_EXTRA_SLOW: '1.2s',
} as const

export const EASINGS = {
  // Framer Motion easings
  SMOOTH: 'easeOut',
  BOUNCE: 'easeInOut',
  SHARP: 'easeIn',
  
  // CSS easings
  CSS_SMOOTH: 'ease-out',
  CSS_BOUNCE: 'ease-in-out', 
  CSS_SHARP: 'ease-in',
} as const

export const DELAYS = {
  // Section staggering (consistent 0.2s increments)
  FIRST: 0.2,
  SECOND: 0.4,
  THIRD: 0.6,
  FOURTH: 0.8,
  
  // Card staggering within sections
  CARDS_BASE: 0.1,
  CARDS_STAGGER: 0.05,
  
  // Special components
  FEATURE_GRID: 0.6,
} as const

// =============================================================================
// MOTION VARIANTS
// =============================================================================

export const MOTION_VARIANTS = {
  // Standard page entrance
  page: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },
  
  // Section entrance
  section: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  },
  
  // Card entrance with glass effect
  card: {
    initial: { 
      opacity: 0, 
      y: 20,
      backgroundColor: 'rgba(248, 250, 252, 0)',
      blur: 16,
      borderColor: 'rgba(226, 232, 240, 0)'
    },
    animate: { 
      opacity: 1, 
      y: 0,
      backgroundColor: 'rgba(248, 250, 252, 0.85)',
      blur: 0,
      borderColor: 'rgba(226, 232, 240, 0.3)'
    }
  },
  
  // Feature grid entrance
  featureGrid: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 }
  },
  
  // Mobile menu
  mobileMenu: {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: 'auto' },
    exit: { opacity: 0, height: 0 }
  }
} as const

// =============================================================================
// TRANSITION CONFIGURATIONS  
// =============================================================================

export const TRANSITIONS = {
  // Standard page/section transitions
  page: { duration: DURATIONS.SLOW },
  section: { duration: DURATIONS.SLOW },
  
  // Card transitions (with glass effect timing)
  card: {
    opacity: { duration: DURATIONS.NORMAL },
    y: { duration: DURATIONS.NORMAL },
    backgroundColor: { duration: DURATIONS.EXTRA_SLOW, ease: EASINGS.SMOOTH },
    backdropFilter: { duration: DURATIONS.EXTRA_SLOW, ease: EASINGS.SMOOTH }
  },
  
  // Feature grid
  featureGrid: { duration: DURATIONS.SLOW },
  
  // Interactive elements
  hover: { duration: DURATIONS.FAST, ease: EASINGS.SMOOTH },
  button: { duration: DURATIONS.FAST },
  
  // Mobile menu
  mobileMenu: { duration: DURATIONS.FAST }
} as const

// =============================================================================
// TAILWIND CLASSES (REUSABLE PATTERNS)
// =============================================================================

export const TRANSITIONS_CSS = {
  // Standard CSS transitions for interactive elements
  COLORS: 'transition-colors duration-300 ease-out',
  TRANSFORM: 'transition-transform duration-300 ease-out', 
  ALL: 'transition-all duration-300 ease-out',
  
  // Glass effects now handled by framer-motion
  
  // Hover effects
  HOVER_SCALE_SM: 'hover:scale-[1.01] transition-transform duration-300',
  HOVER_SCALE_MD: 'hover:scale-[1.02] transition-transform duration-300',
  HOVER_TRANSLATE: 'hover:translate-x-1 transition-transform duration-300',
  
  // Focus effects
  FOCUS_RING: 'focus:outline-none focus:ring-2 focus:ring-moebius-blue-400/30 transition-all duration-200',
} as const

export const HOVER_PATTERNS = {
  // Navigation links
  NAV_LINK: 'text-secondary hover:text-primary hover:bg-moebius-blue-400/10 hover:backdrop-blur-sm transition-all duration-200',
  NAV_ACTIVE: 'text-white bg-moebius-blue-400/85 shadow-sm',
  
  // Buttons (these map to our button variants)
  BUTTON_PRIMARY: 'hover:scale-105 transition-all duration-300',
  BUTTON_SECONDARY: 'hover:bg-opacity-80 transition-all duration-300',
  
  // Cards
  CARD_HOVER: 'hover:shadow-lg hover:-translate-y-1 transition-all duration-300',
  
  // Links
  TEXT_LINK: 'text-moebius-blue-400 hover:text-moebius-blue-300 transition-colors duration-200',
  LOGO_LINK: 'text-primary hover:text-moebius-blue-300 transition-colors duration-200',
} as const

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Calculate staggered delay for cards within a section
 */
export function getCardDelay(sectionDelay: number, cardIndex: number = 0): number {
  return sectionDelay + DELAYS.CARDS_BASE + (cardIndex * DELAYS.CARDS_STAGGER)
}

/**
 * Get motion transition with delay
 */
export function getTransitionWithDelay(transitionKey: keyof typeof TRANSITIONS, delay: number) {
  return {
    ...TRANSITIONS[transitionKey],
    delay
  }
}

/**
 * Create card motion props with standardized timing (simultaneous animations)
 */
export function getCardMotionProps(delay: number = 0) {
  return {
    initial: MOTION_VARIANTS.card.initial,
    animate: MOTION_VARIANTS.card.animate,
    transition: {
      opacity: { duration: DURATIONS.NORMAL, delay, ease: EASINGS.SMOOTH },
      y: { duration: DURATIONS.NORMAL, delay, ease: EASINGS.SMOOTH },
      backgroundColor: { duration: DURATIONS.NORMAL, delay, ease: EASINGS.SMOOTH },
      blur: { duration: DURATIONS.NORMAL, delay, ease: EASINGS.SMOOTH },
      borderColor: { duration: DURATIONS.NORMAL, delay, ease: EASINGS.SMOOTH }
    }
  }
}

/**
 * Create section motion props with standardized timing  
 */
export function getSectionMotionProps(delay: number = DELAYS.FIRST) {
  return {
    initial: MOTION_VARIANTS.section.initial,
    animate: MOTION_VARIANTS.section.animate, 
    transition: getTransitionWithDelay('section', delay)
  }
}

// =============================================================================
// DESIGN TOKENS EXPORT (for easy importing)
// =============================================================================

export const DESIGN_SYSTEM = {
  DURATIONS,
  EASINGS,
  DELAYS,
  MOTION_VARIANTS,
  TRANSITIONS,
  TRANSITIONS_CSS,
  HOVER_PATTERNS,
  
  // Utility functions
  getCardDelay,
  getTransitionWithDelay,
  getCardMotionProps,
  getSectionMotionProps,
} as const
