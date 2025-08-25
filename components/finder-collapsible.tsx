"use client"

import React, { useState, useEffect, useRef } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { FinderButton } from "./finder-button"
import { useTheme } from "../context/theme-context"
import { useIsTablet } from "../hooks/use-mobile"
import type { FileSystemItem } from "../types/content"

interface FinderCollapsibleProps {
  folders: FileSystemItem[]
  selectedFolder: string
  selectedFile: string
  onFolderClick: (folderId: string) => void
  onFileClick: (fileId: string) => void
  activeColumn: 'folder' | 'file'
}

export function FinderCollapsible({
  folders,
  selectedFolder,
  selectedFile,
  onFolderClick,
  onFileClick,
  activeColumn
}: FinderCollapsibleProps) {
  const { theme } = useTheme()
  const isTablet = useIsTablet()
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set([selectedFolder]))
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [hoverPosition, setHoverPosition] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Ensure selected folder is always expanded (only in desktop mode)
  useEffect(() => {
    if (!isTablet && selectedFolder && !expandedFolders.has(selectedFolder)) {
      setExpandedFolders(prev => new Set([...prev, selectedFolder]))
    }
  }, [selectedFolder, expandedFolders, isTablet])

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId)
    } else {
      newExpanded.add(folderId)
    }
    setExpandedFolders(newExpanded)
  }

  // Get selected indices for animation
  const selectedFolderIndex = folders.findIndex((item) => item.id === selectedFolder)
  const currentFolder = folders.find((item) => item.id === selectedFolder)
  const selectedFileIndex = currentFolder?.children?.findIndex((item) => item.id === selectedFile) ?? -1

  // Calculate the global index of the selected item
  const getSelectedGlobalIndex = () => {
    if (selectedFolderIndex < 0) return -1
    
    let globalIndex = 0
    for (let i = 0; i < folders.length; i++) {
      if (i === selectedFolderIndex) {
        // If we're selecting a file within this folder (check if selectedFile exists and is in this folder)
        if (selectedFile && selectedFileIndex >= 0 && expandedFolders.has(folders[i].id)) {
          // Count how many files come before the selected file in this folder
          const filesBeforeSelected = selectedFileIndex
          return globalIndex + 1 + filesBeforeSelected // +1 for the folder itself
        }
        // If we're selecting the folder itself
        return globalIndex
      }
      
      globalIndex++ // Count the folder
      
      // If this folder is expanded, count its children
      if (expandedFolders.has(folders[i].id) && folders[i].children) {
        globalIndex += folders[i].children!.length
      }
    }
    return -1
  }

  const selectedGlobalIndex = getSelectedGlobalIndex()
  
  // For tablet mode, if a file is selected, don't show folder background
  // For desktop mode, always show the selected item background
  const fallbackSelectedIndex = selectedGlobalIndex >= 0 ? selectedGlobalIndex : selectedFolderIndex



  // Helper function to calculate global index for any item
  const getGlobalIndex = (folderIndex: number, fileIndex?: number) => {
    let globalIndex = 0
    for (let i = 0; i < folders.length; i++) {
      if (i === folderIndex) {
        if (fileIndex !== undefined && expandedFolders.has(folders[i].id)) {
          // Return index for file within this folder
          return globalIndex + 1 + fileIndex
        }
        // Return index for folder itself
        return globalIndex
      }
      globalIndex++ // Count the folder
      // If this folder is expanded, count its children
      if (expandedFolders.has(folders[i].id) && folders[i].children) {
        globalIndex += folders[i].children!.length
      }
    }
    return -1
  }



  // Calculate the actual position of each item in the list
  const calculateItemPositions = () => {
    const positions: number[] = []
    const buttonHeight = 40 // h-10 = 40px
    const containerPadding = 12 // p-3 = 12px
    const verticalOffset = -0 // Move background up by 4px to align with button
    let currentPosition = containerPadding + verticalOffset
    let globalIndex = 0

    folders.forEach((folder, folderIndex) => {
      // Add folder position
      positions[globalIndex] = currentPosition
      currentPosition += buttonHeight
      globalIndex++

      // If folder is expanded, add positions for its children
      if (expandedFolders.has(folder.id) && folder.children) {
        folder.children.forEach(() => {
          positions[globalIndex] = currentPosition
          currentPosition += buttonHeight
          globalIndex++
        })
      }
    })

    return positions
  }

  // Update hover position when hoveredIndex changes
  useEffect(() => {
    if (hoveredIndex !== null && containerRef.current) {
      const positions = calculateItemPositions()
      if (positions[hoveredIndex] !== undefined) {
        setHoverPosition(positions[hoveredIndex])
        setIsVisible(true)
      }
    } else {
      setIsVisible(false)
    }
  }, [hoveredIndex, expandedFolders])

  const styles = {
    backgroundColor: theme.column.background,
    borderColor: theme.column.border,
  }

  // Get the correct theme colors based on variant and state
  const getSelectedBackground = () => {
    // Use desktop-specific background for desktop mode, regular background for tablet
    if (!isTablet) {
      return (theme.folderButton as any).selectedDesktop.background
    }
    
    // For tablet mode, if a file is selected, use file background instead of folder background
    if (isTablet && selectedFile) {
      return theme.fileButton.selected.background
    }
    
    return theme.folderButton.selected.background
  }

  const selectedBackground = getSelectedBackground()

  return (
    <div className="w-60 flex-shrink-0 border-r" style={styles}>
      <div className="p-3 max-h-full overflow-y-auto relative scrollbar-hide" ref={containerRef}>
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
        
        {/* Selected background */}
        {fallbackSelectedIndex >= 0 && (
          <div 
            className="absolute left-3 right-3 h-10 rounded-md pointer-events-none transition-all duration-200 ease-in-out"
            style={{ 
              backgroundColor: selectedBackground,
              top: calculateItemPositions()[fallbackSelectedIndex] || 0,
              zIndex: 2,
            }}
          />
        )}
        
        {/* Button content */}
        <div className="relative z-10">
          {folders.map((folder, folderIndex) => {
            const isExpanded = expandedFolders.has(folder.id)
            const isSelected = selectedFolder === folder.id
            const hasChildren = folder.children && folder.children.length > 0

            return (
              <div key={folder.id}>
                {/* Folder Button */}
                <div className="flex items-center">
                  <div className="flex-1">
                    <FinderButton
                      icon={isSelected ? folder.selectedIcon || folder.icon : folder.icon}
                      isSelected={isSelected}
                      isFileSelected={!!selectedFile && folder.children?.some(file => file.id === selectedFile)}
                      onClick={() => {
                        // Handle folder selection only
                        onFolderClick(folder.id)
                      }}
                      variant="folder"
                      onToggleExpand={hasChildren ? () => toggleFolder(folder.id) : undefined}
                      isExpanded={isExpanded}
                      onMouseEnter={() => setHoveredIndex(getGlobalIndex(folderIndex))}
                      onMouseLeave={() => setHoveredIndex(null)}
                      isDesktop={false}
                    >
                      {folder.name}
                    </FinderButton>
                  </div>
                </div>

                {/* Folder Contents */}
                {isExpanded && hasChildren && (
                  <div className="ml-6">
                    {folder.children?.map((file, fileIndex) => (
                      <div key={file.id} className="ml-1">
                        <FinderButton
                          icon={file.icon}
                          isSelected={selectedFile === file.id}
                          onClick={() => {
                            onFileClick(file.id)
                            // In tablet mode, ensure the parent folder is expanded when file is clicked
                            if (!expandedFolders.has(folder.id)) {
                              toggleFolder(folder.id)
                            }
                          }}
                          variant="file"
                          onMouseEnter={() => setHoveredIndex(getGlobalIndex(folderIndex, fileIndex))}
                          onMouseLeave={() => setHoveredIndex(null)}
                          isDesktop={false}
                        >
                          {file.name}
                        </FinderButton>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
