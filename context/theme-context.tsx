"use client"

import type React from "react"
import { createContext, useContext, useMemo, useSyncExternalStore } from "react"
import { darkTheme, lightTheme } from "../theme/default-theme"
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

type ThemeTree = { [key: string]: string | ThemeTree | undefined }

const toKebab = (key: string) => key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)

function cssVarDeclarations(tree: ThemeTree, prefix = "--finder"): string {
  return Object.entries(tree)
    .map(([key, value]) => {
      const name = `${prefix}-${toKebab(key)}`
      if (value === undefined) return ""
      return typeof value === "string" ? `${name}:${value};` : cssVarDeclarations(value, name)
    })
    .join("")
}

function cssVarReferences<T extends ThemeTree>(tree: T, prefix = "--finder"): T {
  return Object.fromEntries(
    Object.entries(tree).map(([key, value]) => {
      const name = `${prefix}-${toKebab(key)}`
      return [key, typeof value === "string" ? `var(${name})` : value && cssVarReferences(value, name)]
    }),
  ) as T
}

const DARK_QUERY = "(prefers-color-scheme: dark)"

function subscribeToColorScheme(onChange: () => void) {
  const mql = window.matchMedia(DARK_QUERY)
  mql.addEventListener("change", onChange)
  return () => mql.removeEventListener("change", onChange)
}

export function ThemeProvider({ children, theme: customTheme }: ThemeProviderProps) {
  // Colors are CSS variables switched by a media query, so the server-rendered
  // HTML already matches the system theme without waiting for hydration.
  const { css, theme } = useMemo(() => {
    const light = { ...lightTheme, ...customTheme }
    const dark = { ...darkTheme, ...customTheme }
    return {
      css: `:root{${cssVarDeclarations(light as unknown as ThemeTree)}}@media ${DARK_QUERY}{:root{${cssVarDeclarations(dark as unknown as ThemeTree)}}}`,
      theme: cssVarReferences(dark as unknown as ThemeTree) as unknown as FinderTheme,
    }
  }, [customTheme])

  const isDark = useSyncExternalStore(
    subscribeToColorScheme,
    () => window.matchMedia(DARK_QUERY).matches,
    () => false,
  )

  return (
    <ThemeContext.Provider value={{ theme, isDark }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
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
