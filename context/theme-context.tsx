"use client"

import type React from "react"
import { createContext, useContext, useEffect } from "react"
import { darkTheme } from "../theme/default-theme"
import type { FinderTheme } from "../types/theme"

interface ThemeContextType {
  theme: FinderTheme
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: React.ReactNode
  theme?: Partial<FinderTheme>
}

export function ThemeProvider({ children, theme: customTheme }: ThemeProviderProps) {
  const theme = customTheme ? { ...darkTheme, ...customTheme } : darkTheme

  // Overscroll reveals the document background, so keep it matched to the canvas.
  useEffect(() => {
    const color = theme.background
    document.documentElement.style.backgroundColor = color
    document.body.style.backgroundColor = color

    let meta = document.querySelector('meta[name="theme-color"]')
    if (!meta) {
      meta = document.createElement("meta")
      meta.setAttribute("name", "theme-color")
      document.head.appendChild(meta)
    }
    meta.setAttribute("content", color)
  }, [theme.background])

  return (
    <ThemeContext.Provider value={{ theme, isDark: true }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
