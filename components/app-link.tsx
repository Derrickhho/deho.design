"use client"

import type React from "react"
import { useTheme } from "../context/theme-context"
import { linkClassName } from "./link-styles"

interface AppLinkProps {
  children: React.ReactNode
  // Renders an <a> when href is provided, otherwise a <button>.
  href?: string
  onClick?: () => void
  // Text color variant. Blue for content links, title text color for breadcrumb-style nav.
  variant?: "blue" | "white"
  className?: string
}

export function AppLink({ children, href, onClick, variant = "blue", className = "" }: AppLinkProps) {
  const { theme } = useTheme()
  const textClass =
    variant === "white"
      ? ""
      : "text-blue-600 group-hover:text-blue-500 group-active:text-blue-500 dark:text-blue-400 dark:group-hover:text-blue-300 dark:group-active:text-blue-300"

  // Inherit font-size/line-height from context so inline links match the
  // paragraph they sit in and don't create gaps when text is selected.
  const content = (
    <span
      className={`font-medium ${textClass}`}
      style={variant === "white" ? { color: theme.content.titleText } : undefined}
    >
      {children}
    </span>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${linkClassName} ${className}`}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={`${linkClassName} cursor-pointer ${className}`}>
      {content}
    </button>
  )
}
