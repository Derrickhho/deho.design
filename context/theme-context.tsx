"use client"

import type React from "react"
import { createContext, useContext } from "react"
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
