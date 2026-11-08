"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { FinderButton } from "./components/finder-button"
import { FinderColumn } from "./components/finder-column"
import { FinderWindow } from "./components/finder-window"
import { FinderContent } from "./components/finder-content"
import { FinderHeader } from "./components/finder-header"
import { FinderCollapsible } from "./components/finder-collapsible"
import { ThemeProvider, useTheme } from "./context/theme-context"
import { portfolioContent, getContentById } from "./content/load-portfolio"
import { ErrorBoundary } from "./components/error-boundary"
import { useIsTablet, useIsMobile } from "./hooks/use-mobile"
import { FlexibleContentRenderer } from "./components/flexible-content-renderer"
import { Heading1, Body } from "./components/typography"
import { AppLink } from "./components/app-link"
import type { ContentData, FileSystemItem } from "./types/content"
import { enterMotionClass } from "./components/enter-motion"
import { useLinecove } from "./components/linecove-selection"
import type { FinderTheme } from "./types/theme"


function workDate(file: FileSystemItem) {
  for (const block of file.content?.blocks ?? []) {
    if (block.type === "thumbnail" && block.dateRange) return block.dateRange
  }
  return ""
}

function contactItems(content?: ContentData) {
  return content?.blocks.flatMap((block) => (block.type === "list" ? block.items : [])) ?? []
}

function MobileSectionLabel({ label }: { label: string }) {
  const { theme } = useTheme()
  return (
    <div className="flex items-center gap-3">
      <Body color={theme.content.mutedText} fontWeight={500} className="shrink-0">{label}</Body>
      <div className="h-px flex-1" style={{ backgroundColor: theme.column.border }} />
    </div>
  )
}

function FinderPortfolioContent() {
  const { theme } = useTheme()
  const isTablet = useIsTablet()
  const isMobile = useIsMobile()
  const linecoveRef = useLinecove<HTMLDivElement>()
  const [selectedFolder, setSelectedFolder] = useState<string>("info")
  const [selectedFile, setSelectedFile] = useState<string>("about-me")
  const [activeColumn, setActiveColumn] = useState<'folder' | 'file'>('file')
  const [enterColumns, setEnterColumns] = useState(true)
  const initialSelection = useRef({ folder: selectedFolder, file: selectedFile })
  const enterStopped = useRef(false)
  if (
    selectedFolder !== initialSelection.current.folder ||
    selectedFile !== initialSelection.current.file
  ) {
    enterStopped.current = true
  }
  const showEnter = enterColumns && !enterStopped.current

  useEffect(() => {
    const id = window.setTimeout(() => setEnterColumns(false), 2000)
    return () => window.clearTimeout(id)
  }, [])

  const currentFolder = portfolioContent.find((item) => item.id === selectedFolder)
  const currentFile = currentFolder?.children?.find((item) => item.id === selectedFile)



  // Get selected indices for animation
  const selectedFolderIndex = portfolioContent.findIndex((item) => item.id === selectedFolder)
  const selectedFileIndex = currentFolder?.children?.findIndex((item) => item.id === selectedFile) ?? -1

  const handleFolderClick = (folderId: string, options?: { selectFirstFile?: boolean }) => {
    window.getSelection()?.removeAllRanges()
    setSelectedFolder(folderId)
    const folder = portfolioContent.find((item) => item.id === folderId)
    const firstFile = folder?.children?.[0]

    if (!isTablet && options?.selectFirstFile && firstFile) {
      setSelectedFile(firstFile.id)
      setActiveColumn('folder')
      return
    }

    // In tablet mode, just select the folder - expansion/collapse is handled by FinderCollapsible
    if (isTablet) {
      setSelectedFile("")
    } else {
      setSelectedFile("")
      setActiveColumn('folder')
    }
  }

  const handleFileColumnEmptyClick = () => {
    window.getSelection()?.removeAllRanges()
    setSelectedFile("")
    setActiveColumn("folder")
  }

  const handleFileClick = (fileId: string) => {
    window.getSelection()?.removeAllRanges()
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
              window.getSelection()?.removeAllRanges()
              setActiveColumn('folder')
            }
            break
          case 'ArrowRight':
            event.preventDefault()
            // Move to file column (if files exist)
            if (activeColumn === 'folder' && currentFolder?.children && currentFolder.children.length > 0) {
              window.getSelection()?.removeAllRanges()
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
          ref={linecoveRef}
          className="min-h-screen p-6"
          style={{ backgroundColor: theme.background }}
        >
          <div className="max-w-md mx-auto flex flex-col gap-12">
            <div>
              <FinderHeader title="Derrick Ho" padding="pb-4 px-0" />

              {aboutMeContent && (
                <div className="[&_img]:rounded-xl [&>div>div:last-child]:pb-0" style={{ color: theme.content.bodyText }}>
                  <FlexibleContentRenderer content={aboutMeContent} />
                </div>
              )}
            </div>

            <div>
              <MobileSectionLabel label="Work" />
              <div className="mt-4 space-y-1">
                {portfolioContent.find((folder) => folder.id === "work")?.children?.map((file) => (
                  <div key={file.id} className="flex items-baseline justify-between gap-4">
                    <Body color={theme.content.bodyText} lineHeight={1.2}>{file.name}</Body>
                    <Body color={theme.content.mutedText} lineHeight={1.2} className="shrink-0">{workDate(file)}</Body>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <MobileSectionLabel label="Contact me" />
              <div className="mt-4 space-y-1">
                {contactItems(contactMeContent).map((item) => {
                  const label = "content" in item ? item.content : ""
                  const details = "details" in item ? item.details : ""
                  const url = "url" in item ? item.url : undefined
                  return (
                    <div key={label} className="flex items-baseline justify-between gap-4">
                      <Body color={theme.content.bodyText} lineHeight={1.2}>{label}</Body>
                      {url ? (
                        <AppLink href={url} className="shrink-0 text-right text-[12px] leading-[1.2]">{details}</AppLink>
                      ) : (
                        <Body color={theme.content.bodyText} lineHeight={1.2} className="shrink-0 text-right">{details}</Body>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Desktop/Tablet Layout - Finder Interface
        <div
          ref={linecoveRef}
          className="min-h-screen flex items-center justify-center p-8"
          style={{ backgroundColor: theme.background }}
        >
          <div className={isTablet ? "w-[640px]" : "w-[809px]"}>
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
                    enter={showEnter}
                  />
                  <FinderContent
                    breadcrumbs={currentFile ? [
                      ...(currentFolder ? [{ label: currentFolder.name, onClick: () => handleFolderClick(currentFolder.id) }] : []),
                      { label: currentFile.name, onClick: () => handleFileClick(currentFile.id) },
                    ] : undefined}
                    content={currentFile?.content}
                    isEmpty={!currentFile}
                    isTablet={true}
                    enterStart={showEnter ? portfolioContent.length + (currentFolder?.children?.length ?? 0) + 1 : undefined}
                  />
                </>
              ) : (
                // Desktop Layout - Three Columns
                <>
                  {/* Left Column - Folders */}
                  <FinderColumn width="w-56" showBorder selectedIndex={selectedFolderIndex >= 0 ? selectedFolderIndex : undefined} variant="folder" highlightClassName={showEnter && selectedFolderIndex >= 0 ? enterMotionClass(selectedFolderIndex, "duration-[400ms]") : undefined}>
                    {portfolioContent.map((item, index) => (
                      <FinderButton
                        key={item.id}
                        icon={selectedFolder === item.id ? item.selectedIcon || item.icon : item.icon}
                        isSelected={selectedFolder === item.id && activeColumn === 'folder'}
                        isFileSelected={selectedFolder === item.id && activeColumn === 'file' && selectedFile !== ""}
                        onClick={() => handleFolderClick(item.id, { selectFirstFile: true })}
                        variant="folder"
                        isDesktop={true}
                        enterStep={showEnter ? index : undefined}
                      >
                        {item.name}
                      </FinderButton>
                    ))}
                  </FinderColumn>

                  {/* Middle Column - Folder Contents */}
                  <FinderColumn 
                    key={`file-column-${selectedFolder}`}
                    width="w-56" 
                    showBorder 
                    selectedIndex={selectedFile && selectedFileIndex >= 0 ? selectedFileIndex : undefined} 
                    variant="file"
                    highlightClassName={showEnter && selectedFileIndex >= 0 ? enterMotionClass(portfolioContent.length + selectedFileIndex, "duration-[400ms]") : undefined}
                    onEmptyClick={handleFileColumnEmptyClick}
                  >
                    {currentFolder?.children?.map((item, index) => (
                      <FinderButton
                        key={item.id}
                        icon={item.icon}
                        isSelected={selectedFile === item.id && activeColumn === 'file'}
                        isFileSelected={selectedFile === item.id && activeColumn === 'folder'}
                        onClick={() => handleFileClick(item.id)}
                        variant="file"
                        isDesktop={true}
                        enterStep={showEnter ? portfolioContent.length + index : undefined}
                      >
                        {item.name}
                      </FinderButton>
                    ))}
                  </FinderColumn>

                  {/* Right Column - File Content */}
                  <FinderContent
                    breadcrumbs={currentFile ? [
                      ...(currentFolder ? [{ label: currentFolder.name, onClick: () => handleFolderClick(currentFolder.id) }] : []),
                      { label: currentFile.name, onClick: () => handleFileClick(currentFile.id) },
                    ] : undefined}
                    content={currentFile?.content}
                    isEmpty={!currentFile}
                    enterStart={showEnter ? portfolioContent.length + (currentFolder?.children?.length ?? 0) + 1 : undefined}
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
