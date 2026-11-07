"use client"

import type React from "react"
import { createContext, useContext, useEffect, useMemo, useState, useSyncExternalStore } from "react"
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
type ThemeChoice = "light" | "dark"

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
  const [override, setOverride] = useState<ThemeChoice | null>(null)

  // Colors are CSS variables. The media query follows the system theme, and
  // data-theme overrides it after Command-\.
  const { css, theme } = useMemo(() => {
    const light = { ...lightTheme, ...customTheme }
    const dark = { ...darkTheme, ...customTheme }
    const lightCss = cssVarDeclarations(light as unknown as ThemeTree)
    const darkCss = cssVarDeclarations(dark as unknown as ThemeTree)
    return {
      css: `:root{${lightCss}}@media ${DARK_QUERY}{:root:not([data-theme="light"]){${darkCss}}}html[data-theme="dark"]{${darkCss}}html[data-theme="light"]{${lightCss}}`,
      theme: cssVarReferences(dark as unknown as ThemeTree) as unknown as FinderTheme,
    }
  }, [customTheme])

  const systemDark = useSyncExternalStore(
    subscribeToColorScheme,
    () => window.matchMedia(DARK_QUERY).matches,
    () => false,
  )
  const isDark = override ? override === "dark" : systemDark

  useEffect(() => {
    const root = document.documentElement
    if (override) root.dataset.theme = override
    else delete root.dataset.theme
    root.style.colorScheme = isDark ? "dark" : "light"
  }, [override, isDark])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) return
      if (event.key !== "\\" && event.code !== "Backslash") return
      const target = event.target
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable || target.tagName === "INPUT" || target.tagName === "TEXTAREA")
      ) {
        return
      }
      event.preventDefault()
      setOverride((current) => {
        const active = current ?? (window.matchMedia(DARK_QUERY).matches ? "dark" : "light")
        return active === "dark" ? "light" : "dark"
      })
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

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
