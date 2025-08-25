"use client"

import type React from "react"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "../context/theme-context"

interface ThemeSwitcherProps {
  className?: string
}

export function ThemeSwitcher({ className = "" }: ThemeSwitcherProps) {
  const { theme, toggleTheme, isDark } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200 cursor-pointer hover:opacity-80 ${className}`}
      style={{
        backgroundColor: isDark ? "#6E6E6E" : "#d1d5db",
      }}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
          isDark ? "translate-x-6" : "translate-x-1"
        }`}
      />
      <div className="absolute inset-0.5 flex items-center justify-between px-1">
        <Sun className={`h-3 w-3 ${isDark ? "text-white opacity-50" : "text-gray-400"}`} />
        <Moon className={`h-3 w-3 ${isDark ? "text-gray-400" : "text-gray-400 opacity-80"}`} />
      </div>
    </button>
  )
}
