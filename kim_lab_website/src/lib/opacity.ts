/**
 * Opacity constants (integrated into design system)
 * @deprecated This file will be merged into design-system.ts in future versions
 * Use CSS variables from index.css for opacity values
 */

// Legacy opacity constants
export const OPACITY = {
  CARD: 0.5,
  CARD_HOVER: 0.6,
  NAV: 0.85,
  FOOTER: 0.85,
  BUTTON_ACTIVE: 0.9,
  BUTTON_HOVER: 0.1,
  INPUT: 0.5,
  BADGE: 0.85,
  BORDER: 0.3,
  SHADOW_LIGHT: 0.15,
  SHADOW_MEDIUM: 0.2,
  DISABLED: 0.5,
  LOADING: 0.7,
} as const

// Utility functions (prefer CSS variables in new code)
export function glassBackground(opacity: number = OPACITY.CARD): string {
  return `rgba(248, 250, 252, ${opacity})`
}

export function glassBorder(opacity: number = OPACITY.BORDER): string {
  return `rgba(226, 232, 240, ${opacity})`
}

export function glassShadow(opacity: number = OPACITY.SHADOW_LIGHT): string {
  return `rgba(166, 183, 217, ${opacity})`
}

export function tailwindOpacity(opacity: number): string {
  return `/${Math.round(opacity * 100)}`
}
