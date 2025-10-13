/**
 * Animation constants (re-exported from design system for backward compatibility)
 * @deprecated Use DESIGN_SYSTEM from './design-system' directly for new code
 */

import { DESIGN_SYSTEM } from './design-system'

// Legacy exports for backward compatibility
export const ANIMATION_DELAYS = DESIGN_SYSTEM.DELAYS

export const SECTION_DELAYS = [
  DESIGN_SYSTEM.DELAYS.FIRST,
  DESIGN_SYSTEM.DELAYS.SECOND,
  DESIGN_SYSTEM.DELAYS.THIRD,
  DESIGN_SYSTEM.DELAYS.FOURTH,
] as const

export const getCardDelay = DESIGN_SYSTEM.getCardDelay
