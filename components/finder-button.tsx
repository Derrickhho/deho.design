"use client"

import React, { useState } from "react"
import { ChevronRight, ChevronDown } from "lucide-react"
import { useTheme } from "../context/theme-context"
import { Typography } from "./typography"
import { useIsTablet } from "../hooks/use-mobile"

interface FinderButtonProps {
  icon: React.ReactNode
  children: React.ReactNode
  isSelected?: boolean
  isFileSelected?: boolean
  onClick: () => void
  variant?: "folder" | "file"
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onToggleExpand?: () => void
  isExpanded?: boolean
  isDesktop?: boolean
}

export function FinderButton({ 
  icon, 
  children, 
  isSelected = false, 
  isFileSelected = false,
  onClick, 
  variant = "folder",
  onMouseEnter,
  onMouseLeave,
  onToggleExpand,
  isExpanded,
  isDesktop = false
}: FinderButtonProps) {
  const { theme } = useTheme()
  const isTablet = useIsTablet()
  const [isHovered, setIsHovered] = useState(false)

  const baseClasses = "w-full h-10 flex items-center gap-2 pt-2 pr-2.5 pb-2 pl-3 text-left rounded-md transition-all duration-200 ease-in-out select-none"

  const buttonTheme = variant === "folder" ? theme.folderButton : theme.fileButton
  
  // Determine text color based on state
  let textColor: string
  let iconSelected: boolean
  if (isFileSelected && variant === "folder") {
    // File-selected folders take priority over regular selection
    if (isDesktop) {
      textColor = (theme.folderButton as any).selectedDesktop.text
    } else {
      textColor = (theme.folderButton as any).fileSelected.text
    }
    iconSelected = false // Don't make icon white for file-selected folders
  } else if (isSelected) {
    // Regular selected text color
    textColor = buttonTheme.selected.text
    iconSelected = true // Make icon white for truly selected items
  } else {
    textColor = buttonTheme.default.text
    iconSelected = false
  }

  const styles = {
    backgroundColor: 'transparent', // Background is handled by parent animated overlays
    color: textColor,
  }

  const handleMouseEnter = () => {
    console.log('Finder button: mouse enter, setting hover to true')
    setIsHovered(true)
    onMouseEnter?.()
  }

  const handleMouseLeave = () => {
    console.log('Finder button: mouse leave, setting hover to false')
    setIsHovered(false)
    onMouseLeave?.()
  }

  // Clone the icon to pass hover and selected states if it's a Lottie icon
  const iconElement = React.isValidElement(icon) 
    ? React.cloneElement(icon as any, {
        isHovered,
        isSelected: iconSelected
      })
    : icon

  return (
    <button 
      onClick={onClick} 
      className={baseClasses}
      style={styles}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {/* Left chevron for tablet expand/collapse */}
      {onToggleExpand && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggleExpand()
          }}
          className="p-1 rounded transition-transform duration-200"
          style={{ color: textColor }}
        >
          <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isExpanded ? 'rotate-180' : 'rotate-0'}`} />
        </button>
      )}
      
      <div style={{ color: textColor }}>
        {iconElement}
      </div>
      <Typography variant="button" color="inherit" className="flex-1">
        {children}
      </Typography>
      
      {/* Right chevron for desktop selection indicator */}
      {variant === "folder" && (isSelected || isFileSelected) && !onToggleExpand && (
        <ChevronRight className="w-3 h-3 ml-auto" style={{ color: textColor }} />
      )}
    </button>
  )
}
