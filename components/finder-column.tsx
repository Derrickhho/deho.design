"use client"

import React, { useState, useRef, useEffect } from "react"
import { useTheme } from "../context/theme-context"

interface FinderColumnProps {
  children: React.ReactNode
  width?: string
  showBorder?: boolean
  selectedIndex?: number
  variant?: "folder" | "file"
}

export function FinderColumn({ children, width = "w-60", showBorder = false, selectedIndex, variant = "folder" }: FinderColumnProps) {
  const { theme } = useTheme()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [hoverPosition, setHoverPosition] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const previousPositionRef = useRef<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const styles = {
    backgroundColor: theme.column.background,
    borderRightColor: showBorder ? theme.column.border : "transparent",
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
      const buttonHeight = 40 // h-10 = 40px
      const buttonSpacing = 0 // space-y-0.5 = 2px
      const padding = 12 // p-3 = 12px
      return padding + (selectedIndex * (buttonHeight + buttonSpacing))
    }
    return 0
  }

  const selectedPosition = getSelectedPosition()

  // Update hover position when hoveredIndex changes
  useEffect(() => {
    if (hoveredIndex !== null && containerRef.current) {
      const buttonHeight = 40 // h-10 = 40px
      const buttonSpacing = 0 // space-y-0.5 = 2px
      const padding = 12 // p-3 = 12px
      const newPosition = padding + (hoveredIndex * (buttonHeight + buttonSpacing))
      setHoverPosition(newPosition)
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [hoveredIndex])

  // Update animation state when selectedIndex changes
  useEffect(() => {
    if (selectedIndex !== undefined && selectedIndex !== null) {
      // Check if we had a valid previous position to animate from
      const hadValidPreviousPosition = previousPositionRef.current !== null && previousPositionRef.current > 0
      
      if (hadValidPreviousPosition) {
        // Animate from previous position
        setShouldAnimate(true)
      } else {
        // First selection - no animation
        setShouldAnimate(false)
      }
      
      // Store current position for next time
      previousPositionRef.current = selectedPosition
    } else {
      // No selection - reset everything
      setShouldAnimate(false)
      previousPositionRef.current = null
    }
  }, [selectedIndex, selectedPosition])

  // Clone children and add hover handlers
  const childrenWithHover = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<any>, {
        onMouseEnter: () => setHoveredIndex(index),
        onMouseLeave: () => setHoveredIndex(null),
        key: index,
      })
    }
    return child
  })

  return (
    <div className={`${width} flex-shrink-0 ${borderClass}`} style={styles}>
      <div className="p-3 space-y-0.5 relative w-full" ref={containerRef}>
        {/* Animated hover background with fade effect - below selected state */}
        <div 
          className={`absolute left-3 right-3 h-10 rounded-md transition-all duration-200 ease-in-out pointer-events-none ${
            isVisible ? 'opacity-35' : 'opacity-0'
          }`}
          style={{ 
            backgroundColor: theme.folderButton.default.hover,
            top: hoverPosition,
            zIndex: 1,
          }}
        />
        
        {/* Selected background - only animate when moving from valid previous position */}
        {selectedIndex !== undefined && selectedIndex !== null && (
          <div 
            className={`absolute left-3 right-3 h-10 rounded-md pointer-events-none ${
              shouldAnimate ? 'transition-all duration-200 ease-in-out' : ''
            }`}
            style={{ 
              backgroundColor: selectedBackground,
              top: selectedPosition,
              zIndex: 2,
            }}
          />
        )}
        
        {/* Button content */}
        <div className="relative z-10">
          {childrenWithHover}
        </div>
      </div>
    </div>
  )
}
