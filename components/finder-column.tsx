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
}

export function FinderColumn({ children, width = "w-60", showBorder = false, selectedIndex, variant = "folder" }: FinderColumnProps) {
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

  // Check if the selected index corresponds to a file-selected folder
  const isFileSelectedFolder = () => {
    if (variant !== "folder" || selectedIndex === undefined || selectedIndex === null) {
      return false
    }
    
    // Check if any child button has isFileSelected=true
    const childrenArray = React.Children.toArray(children)
    const selectedChild = childrenArray[selectedIndex]
    
    if (React.isValidElement(selectedChild)) {
      return (selectedChild.props as any).isFileSelected === true
    }
    
    return false
  }

  const selectedBackground = isFileSelectedFolder() 
    ? (theme.folderButton as any).selectedDesktop.background 
    : getSelectedBackground()

  // Calculate selected position synchronously to prevent flash
  const getSelectedPosition = () => {
    if (selectedIndex !== undefined && selectedIndex !== null) {
      const buttonHeight = 36 // h-9 = 36px
      const buttonSpacing = 0 // space-y-0.5 = 2px
      const padding = 10 // p-2.5 = 10px
      return padding + (selectedIndex * (buttonHeight + buttonSpacing))
    }
    return 0
  }

  const selectedPosition = getSelectedPosition()

  return (
    <div ref={linecoveRef} className={`${width} flex-shrink-0 ${borderClass}`} style={styles}>
      <div className="p-2.5 space-y-0.5 relative w-full">
        {/* Selected background */}
        {selectedIndex !== undefined && selectedIndex !== null && (
          <div 
            className="absolute left-2.5 right-2.5 h-9 rounded-md pointer-events-none"
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
