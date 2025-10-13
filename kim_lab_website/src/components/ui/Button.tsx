import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'sketch'
  href?: string
  to?: string
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export function Button({ 
  children, 
  variant = 'primary', 
  href, 
  to, 
  onClick, 
  className = '',
  type = 'button',
  disabled = false
}: ButtonProps) {
  const variantClasses = {
    primary: 'btn-moebius-primary',
    secondary: 'btn-moebius-secondary',
    sketch: 'btn-moebius-sketch'
  }

  const baseClasses = `${variantClasses[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`

  if (to) {
    return (
      <Link to={to} className={baseClasses}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a 
        href={href} 
        className={baseClasses}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    )
  }

  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
    >
      {children}
    </button>
  )
}
