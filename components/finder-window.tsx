"use client"

import type React from "react"
import { useTheme } from "../context/theme-context"

interface FinderWindowProps {
  children: React.ReactNode
  height?: string
  width?: string
}

export function FinderWindow({ children, height = "h-[400px]", width = "w-full" }: FinderWindowProps) {
  const { theme, isDark } = useTheme()

  const styles = {
    backgroundColor: theme.windowBackground,
    borderColor: theme.windowBorder,
  }

  return (
    <div className={`rounded-xl overflow-hidden border leading-7 ${height} ${width}`} style={styles}>
      <div className="flex h-full flex-nowrap">{children}</div>
    </div>
  )
}
