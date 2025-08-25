"use client"

import type React from "react"
import { useTheme } from "../context/theme-context"
import { Heading2, Body } from "./typography"
import { FlexibleContentRenderer } from "./flexible-content-renderer"
import { ErrorBoundary } from "./error-boundary"
import type { ContentData } from "../types/content"

interface FinderContentProps {
  title?: string
  children?: React.ReactNode
  content?: ContentData
  isEmpty?: boolean
  isTablet?: boolean
}

export function FinderContent({ title, children, content, isEmpty = false, isTablet = false }: FinderContentProps) {
  const { theme } = useTheme()

  const styles = {
    backgroundColor: theme.content.background,
  }

  if (isEmpty) {
    return (
      <div className="flex-1" style={styles}>
        <div className="p-3 overflow-y-auto h-full max-h-full scrollbar-hide">
          <div className="flex items-center justify-center h-full">
            <Body color={theme.content.mutedText}>Select something to view details</Body>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1" style={styles}>
      <div className="p-3 overflow-y-auto h-full max-h-full flex flex-col scrollbar-hide">
        {title && (
          <div className="h-10 mb-2 flex items-center">
            <Heading2 color={theme.content.titleText} className="mb-0">
              {title}
            </Heading2>
          </div>
        )}
        {title && (
          <div className="border-t border-dashed border-gray-300 mb-4" style={{ borderStyle: 'dashed', borderWidth: '1px 0 0 0', borderImage: 'repeating-linear-gradient(to right, #d1d5db 0, #d1d5db 2px, transparent 2px, transparent 4px) 1' }}></div>
        )}
        <div className="flex-1 min-w-0 overflow-hidden" style={{ color: theme.content.bodyText }}>
          <ErrorBoundary>
            {content ? (
              <FlexibleContentRenderer content={content} />
            ) : (
              children
            )}
          </ErrorBoundary>
        </div>
      </div>
    </div>
  )
}
