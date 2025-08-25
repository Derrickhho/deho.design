"use client"

import type React from "react"
import { useTheme } from "../context/theme-context"
import { Typography } from "./typography"
import { ThemeSwitcher } from "./theme-switcher"

interface FinderHeaderProps {
  title: string
  padding?: string
}

export function FinderHeader({ title, padding = "py-3 px-3" }: FinderHeaderProps) {
  const { theme } = useTheme()

  const styles = {
  }

  return (
    <div 
      className={`flex items-center justify-between rounded-t-xl ${padding}`}
      style={styles}
    >
      <Typography variant="h1" color={theme.headerText}>
        {title}
      </Typography>
      <ThemeSwitcher />
    </div>
  )
}
