"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { lightTheme, darkTheme } from "../theme/default-theme"
import type { FinderTheme } from "../types/theme"

interface ThemeContextType {
  theme: FinderTheme
  isDark: boolean
  toggleTheme: () => void
  setTheme: (theme: FinderTheme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: React.ReactNode
  theme?: Partial<FinderTheme>
}

export function ThemeProvider({ children, theme: customTheme }: ThemeProviderProps) {
  const [isDark, setIsDark] = useState(true)
  const [currentTheme, setCurrentTheme] = useState<FinderTheme>(darkTheme)
  const [isClient, setIsClient] = useState(false)

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Load theme preference from localStorage on mount (client-side only)
  useEffect(() => {
    if (isClient) {
      const savedTheme = localStorage.getItem('theme-preference')
      if (savedTheme === 'dark') {
        setIsDark(true)
        setCurrentTheme(darkTheme)
      }
    }
  }, [isClient])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    setCurrentTheme(newIsDark ? darkTheme : lightTheme)
    if (isClient) {
      localStorage.setItem('theme-preference', newIsDark ? 'dark' : 'light')
    }
  }

  const setTheme = (theme: FinderTheme) => {
    setCurrentTheme(theme)
  }

  // Merge custom theme with current theme if provided
  const theme = customTheme ? { ...currentTheme, ...customTheme } : currentTheme

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, setTheme }}>
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
