"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { FinderButton } from "./components/finder-button"
import { FinderColumn } from "./components/finder-column"
import { FinderWindow } from "./components/finder-window"
import { FinderContent } from "./components/finder-content"
import { FinderHeader } from "./components/finder-header"
import { FinderCollapsible } from "./components/finder-collapsible"
import { ThemeProvider, useTheme } from "./context/theme-context"
import { portfolioContent, getContentById } from "./content/portfolio-content"
import { ErrorBoundary } from "./components/error-boundary"
import { useIsTablet, useIsMobile } from "./hooks/use-mobile"
import { FlexibleContentRenderer } from "./components/flexible-content-renderer"
import { Heading1, Body } from "./components/typography"
import type { FinderTheme } from "./types/theme"


function FinderPortfolioContent() {
  const { theme } = useTheme()
  const isTablet = useIsTablet()
  const isMobile = useIsMobile()
  const [selectedFolder, setSelectedFolder] = useState<string>("info")
  const [selectedFile, setSelectedFile] = useState<string>("about-me")
  const [activeColumn, setActiveColumn] = useState<'folder' | 'file'>('file')

  const currentFolder = portfolioContent.find((item) => item.id === selectedFolder)
  const currentFile = currentFolder?.children?.find((item) => item.id === selectedFile)



  // Get selected indices for animation
  const selectedFolderIndex = portfolioContent.findIndex((item) => item.id === selectedFolder)
  const selectedFileIndex = currentFolder?.children?.findIndex((item) => item.id === selectedFile) ?? -1

  const handleFolderClick = (folderId: string) => {
    setSelectedFolder(folderId)
    
    // In tablet mode, just select the folder - expansion/collapse is handled by FinderCollapsible
    if (isTablet) {
      // Don't automatically select the first file - let users click on files directly
      setSelectedFile("")
      // Note: Folder expansion/collapse is handled by the button click in FinderCollapsible
    } else {
      // Desktop mode: clear the selected file when switching folders
      setSelectedFile("")
      setActiveColumn('folder')
    }
  }

  const handleFileClick = (fileId: string) => {
    // Find the folder that contains this file
    const parentFolder = portfolioContent.find(folder => 
      folder.children?.some(file => file.id === fileId)
    )
    
    if (parentFolder) {
      // Set the parent folder as selected
      setSelectedFolder(parentFolder.id)
    }
    
    setSelectedFile(fileId)
    if (!isTablet) {
      setActiveColumn('file')
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const currentFolderIndex = portfolioContent.findIndex((item) => item.id === selectedFolder)
      const currentFileIndex = currentFolder?.children?.findIndex((item) => item.id === selectedFile) ?? -1
      
      if (isTablet) {
        // Tablet mode: simplified navigation - just disable left/right
        switch (event.key) {
          case 'ArrowLeft':
          case 'ArrowRight':
            // No-op in tablet mode since we only have one column
            event.preventDefault()
            break
          case 'ArrowUp':
          case 'ArrowDown':
            // Let the default behavior work for up/down
            break
        }
      } else {
        // Desktop mode: original logic
        switch (event.key) {
          case 'ArrowUp':
            event.preventDefault()
            if (activeColumn === 'folder') {
              // Move up in folder column
              if (currentFolderIndex > 0) {
                const newFolderIndex = currentFolderIndex - 1
                const newFolder = portfolioContent[newFolderIndex]
                handleFolderClick(newFolder.id)
              }
            } else if (activeColumn === 'file' && currentFolder?.children) {
              // Move up in file column
              if (currentFileIndex > 0) {
                const newFileIndex = currentFileIndex - 1
                const newFile = currentFolder.children[newFileIndex]
                handleFileClick(newFile.id)
              }
            }
            break
          case 'ArrowDown':
            event.preventDefault()
            if (activeColumn === 'folder') {
              // Move down in folder column
              if (currentFolderIndex < portfolioContent.length - 1) {
                const newFolderIndex = currentFolderIndex + 1
                const newFolder = portfolioContent[newFolderIndex]
                handleFolderClick(newFolder.id)
              }
            } else if (activeColumn === 'file' && currentFolder?.children) {
              // Move down in file column
              if (currentFileIndex < currentFolder.children.length - 1) {
                const newFileIndex = currentFileIndex + 1
                const newFile = currentFolder.children[newFileIndex]
                handleFileClick(newFile.id)
              }
            }
            break
          case 'ArrowLeft':
            event.preventDefault()
            // Move to folder column
            if (activeColumn === 'file') {
              setActiveColumn('folder')
            }
            break
          case 'ArrowRight':
            event.preventDefault()
            // Move to file column (if files exist)
            if (activeColumn === 'folder' && currentFolder?.children && currentFolder.children.length > 0) {
              setActiveColumn('file')
              // If no file is selected, select the first one
              if (currentFileIndex < 0) {
                setSelectedFile(currentFolder.children[0].id)
              }
            }
            break
        }
      }
    }

    // Add event listener
    window.addEventListener('keydown', handleKeyDown)

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedFolder, selectedFile, currentFolder, portfolioContent, activeColumn, isTablet])

  // Get the About Me content for mobile
  const aboutMeContent = portfolioContent
    .find(folder => folder.id === "info")?.children
    ?.find(file => file.id === "about-me")?.content

  // Get the Contact Me content for mobile
  const contactMeContent = portfolioContent
    .find(folder => folder.id === "info")?.children
    ?.find(file => file.id === "contact-me")?.content

  return (
    <ErrorBoundary>
      {isMobile ? (
        // Mobile Layout - Simple About Me content
        <div
          className="min-h-screen p-6"
          style={{ backgroundColor: theme.background }}
        >
          <div className="max-w-md mx-auto">
            <FinderHeader title="Derrick Ho" padding="py-3 px-0" />
            
            {/* Dotted divider */}
            <div className="border-t border-dashed border-gray-300 my-6" style={{ borderStyle: 'dashed', borderWidth: '1px 0 0 0', borderImage: 'repeating-linear-gradient(to right, #d1d5db 0, #d1d5db 2px, transparent 2px, transparent 4px) 1' }}></div>
            
            {aboutMeContent && (
              <div className="space-y-6 mt-8" style={{ color: theme.content.bodyText }}>
                <FlexibleContentRenderer content={aboutMeContent} />
              </div>
            )}
            
            {contactMeContent && (
              <div className="space-y-6" style={{ color: theme.content.bodyText }}>
                <FlexibleContentRenderer content={contactMeContent} />
              </div>
            )}
          </div>
        </div>
      ) : (
        // Desktop/Tablet Layout - Finder Interface
        <div
          className="min-h-screen flex items-center justify-center p-8"
          style={{ backgroundColor: theme.background }}
        >
          <div className={isTablet ? "w-[640px]" : "w-[880px]"}>
            <FinderHeader title="Derrick Ho" />

            <FinderWindow>
              {isTablet ? (
                // Tablet Layout - Collapsible Folders + Content
                <>
                  <FinderCollapsible
                    folders={portfolioContent}
                    selectedFolder={selectedFolder}
                    selectedFile={selectedFile}
                    onFolderClick={handleFolderClick}
                    onFileClick={handleFileClick}
                    activeColumn={activeColumn}
                  />
                  <FinderContent
                    title={currentFile?.content?.title}
                    content={currentFile?.content}
                    isEmpty={!currentFile}
                    isTablet={true}
                  />
                </>
              ) : (
                // Desktop Layout - Three Columns
                <>
                  {/* Left Column - Folders */}
                  <FinderColumn width="w-60" showBorder selectedIndex={selectedFolderIndex >= 0 ? selectedFolderIndex : undefined} variant="folder">
                    {portfolioContent.map((item) => (
                      <FinderButton
                        key={item.id}
                        icon={selectedFolder === item.id ? item.selectedIcon || item.icon : item.icon}
                        isSelected={selectedFolder === item.id && activeColumn === 'folder'}
                        isFileSelected={selectedFolder === item.id && activeColumn === 'file' && selectedFile !== ""}
                        onClick={() => handleFolderClick(item.id)}
                        variant="folder"
                        isDesktop={true}
                      >
                        {item.name}
                      </FinderButton>
                    ))}
                  </FinderColumn>

                  {/* Middle Column - Folder Contents */}
                  <FinderColumn 
                    key={`file-column-${selectedFolder}`}
                    width="w-60" 
                    showBorder 
                    selectedIndex={selectedFile && selectedFileIndex >= 0 ? selectedFileIndex : undefined} 
                    variant="file"
                  >
                    {currentFolder?.children?.map((item) => (
                      <FinderButton
                        key={item.id}
                        icon={item.icon}
                        isSelected={selectedFile === item.id && activeColumn === 'file'}
                        onClick={() => handleFileClick(item.id)}
                        variant="file"
                        isDesktop={true}
                      >
                        {item.name}
                      </FinderButton>
                    ))}
                  </FinderColumn>

                  {/* Right Column - File Content */}
                  <FinderContent
                    title={activeColumn === 'file' ? currentFile?.content?.title : undefined}
                    content={activeColumn === 'file' ? currentFile?.content : undefined}
                    isEmpty={activeColumn === 'folder' || !currentFile}
                  />
                </>
              )}
            </FinderWindow>
          </div>
        </div>
      )}
    </ErrorBoundary>
  )
}

interface FinderPortfolioProps {
  theme?: Partial<FinderTheme>
}

export default function FinderPortfolio({ theme }: FinderPortfolioProps) {
  return (
    <ThemeProvider theme={theme}>
      <FinderPortfolioContent />
    </ThemeProvider>
  )
}
