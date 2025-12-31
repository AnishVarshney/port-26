"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type ButtonVariant = "default" | "secondary" | "ghost"
type ButtonSize = "default" | "sm" | "lg"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", type = "button", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center rounded-lg font-medium transition-colors " +
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 " +
      "disabled:pointer-events-none disabled:opacity-50"

    const variants: Record<ButtonVariant, string> = {
      default: "bg-white text-black hover:bg-white/90",
      secondary: "bg-white/10 text-white hover:bg-white/15 border border-white/10",
      ghost: "bg-transparent text-white hover:bg-white/10",
    }

    const sizes: Record<ButtonSize, string> = {
      default: "h-10 px-4 py-2 text-sm",
      sm: "h-9 px-3 py-1.5 text-sm",
      lg: "h-11 px-8 py-3 text-base",
    }

    return (
      <button ref={ref} type={type} className={cn(base, variants[variant], sizes[size], className)} {...props} />
    )
  },
)

Button.displayName = "Button"



