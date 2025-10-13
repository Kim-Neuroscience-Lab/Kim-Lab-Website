# Centralized Design System

This document outlines the centralized design system for the Kim Neuroscience Lab website, ensuring consistency and maintainability across all components.

## 📁 File Structure

```
src/lib/
├── design-system.ts     # Main design system (NEW)
├── animations.ts        # Legacy compatibility layer
└── opacity.ts          # Legacy compatibility layer

src/index.css           # CSS variables & utility classes
```

## 🎨 Design System Components

### 1. **Animation Constants** (`/src/lib/design-system.ts`)

```typescript
import { DESIGN_SYSTEM } from "../lib/design-system";

// Standardized durations
DESIGN_SYSTEM.DURATIONS.FAST; // 0.3s
DESIGN_SYSTEM.DURATIONS.NORMAL; // 0.6s
DESIGN_SYSTEM.DURATIONS.SLOW; // 0.8s

// Standardized delays (0.2s increments)
DESIGN_SYSTEM.DELAYS.FIRST; // 0.2s
DESIGN_SYSTEM.DELAYS.SECOND; // 0.4s
DESIGN_SYSTEM.DELAYS.THIRD; // 0.6s
DESIGN_SYSTEM.DELAYS.FOURTH; // 0.8s
```

### 2. **Motion Variants** (Framer Motion)

```typescript
// Pre-configured motion patterns
DESIGN_SYSTEM.MOTION_VARIANTS.page; // Standard page entrance
DESIGN_SYSTEM.MOTION_VARIANTS.section; // Section entrance
DESIGN_SYSTEM.MOTION_VARIANTS.card; // Card with glass effect
DESIGN_SYSTEM.MOTION_VARIANTS.featureGrid; // Feature grid entrance

// Utility functions
DESIGN_SYSTEM.getCardMotionProps(delay);
DESIGN_SYSTEM.getSectionMotionProps(delay);
```

### 3. **CSS Utility Classes** (`/src/index.css`)

```css
/* Transitions */
.transition-smooth          /* 300ms ease-out */
.transition-fast           /* 200ms ease-out */
.transition-colors-smooth  /* 200ms color transitions */

/* Hover Effects */
.hover-scale-sm:hover      /* scale-[1.01] */
.hover-scale-md:hover      /* scale-[1.02] */
.hover-lift:hover          /* -translate-y-1 + shadow */

/* Navigation */
.nav-link                  /* Standard nav link styling */
.nav-link-active          /* Active nav state */

/* Links */
.link-primary             /* Blue link with hover */
.focus-ring              /* Standardized focus states */
```

### 4. **Opacity System** (CSS Variables)

```css
:root {
  --glass-bg: rgba(248, 250, 252, 0.5); /* 50% cards */
  --glass-bg-hover: rgba(248, 250, 252, 0.6); /* 60% hover */
  --glass-nav-bg: rgba(248, 250, 252, 0.85); /* 85% nav/footer */
  --glass-border: rgba(226, 232, 240, 0.3); /* 30% borders */
  --glass-shadow-light: rgba(166, 183, 217, 0.15); /* 15% shadows */
}
```

## 🔧 Usage Examples

### Creating Animated Components

**❌ OLD (Scattered)**

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
>
```

**✅ NEW (Centralized)**

```tsx
<motion.div {...DESIGN_SYSTEM.getSectionMotionProps(DESIGN_SYSTEM.DELAYS.FIRST)}>
```

### Styling Interactive Elements

**❌ OLD (Scattered)**

```tsx
<div className="hover:scale-[1.02] transition-transform duration-300 ease-out">
```

**✅ NEW (Centralized)**

```tsx
<div className="hover-scale-md transition-transform-smooth">
```

### Navigation Links

**❌ OLD (Inconsistent)**

```tsx
<Link className="text-secondary hover:text-primary hover:bg-moebius-blue-400/10 transition-colors">
```

**✅ NEW (Standardized)**

```tsx
<Link className="nav-link">
```

## 🎯 Benefits

1. **DRY Principle**: No duplicated animation/styling logic
2. **Consistency**: All animations use same timing/easing
3. **Maintainability**: Change globally from single source
4. **Performance**: Reused CSS classes reduce bundle size
5. **Type Safety**: Full TypeScript support
6. **Documentation**: Self-documenting design patterns

## 🔄 Migration Guide

### For New Components

- Use `DESIGN_SYSTEM` for all animations and transitions
- Apply utility classes from `index.css`
- Follow component patterns from `/src/components/ui/`

### For Existing Components

- Replace hardcoded durations with `DESIGN_SYSTEM.DURATIONS.*`
- Replace inline transitions with utility classes
- Use motion variants instead of manual initial/animate/transition

## 📊 Design Tokens

| Category     | Values                 | Usage                |
| ------------ | ---------------------- | -------------------- |
| **Duration** | 0.2s, 0.3s, 0.6s, 0.8s | Animation timing     |
| **Delay**    | 0.2s increments        | Staggered animations |
| **Opacity**  | 50%, 60%, 85%          | Glass effects        |
| **Easing**   | ease-out, ease-in-out  | Smooth transitions   |

This system ensures **zero duplication** and **maximum consistency** across the entire codebase.



