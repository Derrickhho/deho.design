"use client"

import type React from "react"
import { linkClassName } from "./link-styles"

interface AppLinkProps {
  children: React.ReactNode
  // Renders an <a> when href is provided, otherwise a <button>.
  href?: string
  onClick?: () => void
  // Text color variant. Blue for content links, white for breadcrumb-style nav.
  variant?: "blue" | "white"
  className?: string
}

export function AppLink({ children, href, onClick, variant = "blue", className = "" }: AppLinkProps) {
  const textClass =
    variant === "white"
      ? "text-white"
      : "text-blue-400 group-hover:text-blue-300 group-active:text-blue-300"

  // Inherit font-size/line-height from context so inline links match the
  // paragraph they sit in and don't create gaps when text is selected.
  const content = (
    <span className={`font-medium transition-colors duration-200 ${textClass}`}>
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
