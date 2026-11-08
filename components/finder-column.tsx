"use client"

import React from "react"
import { useTheme } from "../context/theme-context"
import { useLinecove } from "./linecove-selection"

interface FinderColumnProps {
  children: React.ReactNode
  width?: string
  showBorder?: boolean
  selectedIndex?: number
  variant?: "folder" | "file"
  highlightClassName?: string
  onEmptyClick?: () => void
}

export function FinderColumn({ children, width = "w-60", showBorder = false, selectedIndex, variant = "folder", highlightClassName, onEmptyClick }: FinderColumnProps) {
  const { theme } = useTheme()
  const linecoveRef = useLinecove<HTMLDivElement>()

  const styles = {
    backgroundColor: theme.column.background,
    borderRightColor: showBorder ? theme.column.border : "transparent",
    borderRightWidth: "0.5px",
  }

  // Always apply border class to maintain consistent width
  const borderClass = showBorder ? "border-r" : "border-r border-transparent"

  // Get the correct theme colors based on variant and state
  const getSelectedBackground = () => {
    if (variant === "file") {
      return theme.fileButton.selected.background
    } else {
      // For folders in desktop mode, use regular blue styling for selected folders
      // Gray styling is only used when a file is selected (handled by isFileSelected)
      return theme.folderButton.selected.background
    }
  }

  const selectedChildIsMuted = () => {
    if (selectedIndex === undefined || selectedIndex === null) return false
    const selectedChild = React.Children.toArray(children)[selectedIndex]
    return React.isValidElement(selectedChild) && (selectedChild.props as { isFileSelected?: boolean }).isFileSelected === true
  }

  const selectedBackground = selectedChildIsMuted()
    ? (theme.folderButton as { selectedDesktop: { background: string } }).selectedDesktop.background
    : getSelectedBackground()

  // Calculate selected position synchronously to prevent flash
  const getSelectedPosition = () => {
    if (selectedIndex !== undefined && selectedIndex !== null) {
      const buttonHeight = 32 // h-8 = 32px
      const buttonSpacing = 0 // space-y-0.5 = 2px
      const padding = 10 // p-2.5 = 10px
      return padding + (selectedIndex * (buttonHeight + buttonSpacing))
    }
    return 0
  }

  const selectedPosition = getSelectedPosition()

  return (
    <div
      ref={linecoveRef}
      className={`${width} h-full flex-shrink-0 ${borderClass}`}
      style={styles}
      onClick={(event) => {
        if ((event.target as HTMLElement).closest("button")) return
        onEmptyClick?.()
      }}
    >
      <div className="p-2.5 space-y-0.5 relative w-full">
        {/* Selected background */}
        {selectedIndex !== undefined && selectedIndex !== null && (
          <div 
            className={`absolute left-2.5 right-2.5 h-8 rounded-sm pointer-events-none${highlightClassName ? ` ${highlightClassName}` : ""}`}
            style={{ 
              backgroundColor: selectedBackground,
              top: selectedPosition,
              zIndex: 2,
            }}
          />
        )}
        
        {/* Button content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  )
}
