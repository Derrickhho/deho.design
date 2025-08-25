"use client"

import type React from "react"
import { useTheme } from "../context/theme-context"
import type { JSX } from "react" // Import JSX to declare the variable

interface TypographyProps {
  children: React.ReactNode
  variant: "h1" | "h2" | "h3" | "body" | "bodySmall" | "caption" | "button"
  color?: string
  className?: string
  as?: keyof JSX.IntrinsicElements
}

export function Typography({ children, variant, color, className = "", as }: TypographyProps) {
  const { theme } = useTheme()
  const typographyStyle = theme.typography[variant]

  const Component = as || getDefaultElement(variant)

  const styles: React.CSSProperties = {
    fontSize: typographyStyle.fontSize,
    fontWeight: typographyStyle.fontWeight,
    lineHeight: typographyStyle.lineHeight,
    letterSpacing: typographyStyle.letterSpacing,
    color: color || "inherit",
    margin: 0,
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  }

  return (
    <Component className={className} style={styles}>
      {children}
    </Component>
  )
}

function getDefaultElement(variant: string): keyof JSX.IntrinsicElements {
  switch (variant) {
    case "h1":
      return "h1"
    case "h2":
      return "h2"
    case "h3":
      return "h3"
    case "body":
    case "bodySmall":
      return "p"
    case "caption":
      return "span"
    case "button":
      return "span"
    default:
      return "span"
  }
}

// Convenience components for common use cases
export function Heading1(props: Omit<TypographyProps, "variant">) {
  return <Typography {...props} variant="h1" />
}

export function Heading2(props: Omit<TypographyProps, "variant">) {
  return <Typography {...props} variant="h2" />
}

export function Heading3(props: Omit<TypographyProps, "variant">) {
  return <Typography {...props} variant="h3" />
}

export function Body(props: Omit<TypographyProps, "variant">) {
  return <Typography {...props} variant="body" />
}

export function BodySmall(props: Omit<TypographyProps, "variant">) {
  return <Typography {...props} variant="bodySmall" />
}

export function Caption(props: Omit<TypographyProps, "variant">) {
  return <Typography {...props} variant="caption" />
}
