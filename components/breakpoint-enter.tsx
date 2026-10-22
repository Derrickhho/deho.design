"use client"

import type React from "react"
import { useState } from "react"

interface BreakpointEnterProps {
  animate: boolean
  className?: string
  children: React.ReactNode
}

// `animate` is captured on mount so toggling it later never replays the
// animation on an element that is already on screen.
export function BreakpointEnter({ animate, className = "", children }: BreakpointEnterProps) {
  const [shouldAnimate] = useState(animate)

  return <div className={`${className} ${shouldAnimate ? "breakpoint-enter" : ""}`}>{children}</div>
}
