"use client"

import React from "react"
import { useTheme } from "../context/theme-context"
import { Body } from "./typography"
import { FlexibleContentRenderer } from "./flexible-content-renderer"
import { ErrorBoundary } from "./error-boundary"
import { AppLink } from "./app-link"
import type { ContentData } from "../types/content"

export interface Breadcrumb {
  label: string
  onClick?: () => void
}

interface FinderContentProps {
  breadcrumbs?: Breadcrumb[]
  children?: React.ReactNode
  content?: ContentData
  isEmpty?: boolean
  isTablet?: boolean
}

export function FinderContent({ breadcrumbs, children, content, isEmpty = false, isTablet = false }: FinderContentProps) {
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
    <div className="flex-1 flex flex-col h-full max-h-full overflow-hidden" style={styles}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div
          className="h-10 flex items-center px-3 flex-shrink-0"
          style={{ borderBottom: `1px solid ${theme.column.border}` }}
        >
          {breadcrumbs.map((crumb, i) => (
            <React.Fragment key={i}>
              {i > 0 && (
                <span className="mx-1 text-xs leading-none" style={{ color: theme.content.mutedText }}>
                  /
                </span>
              )}
              {crumb.onClick ? (
                <AppLink onClick={crumb.onClick} variant="white" className="text-xs">
                  {crumb.label}
                </AppLink>
              ) : (
                <span className="text-xs font-medium leading-none text-white">
                  {crumb.label}
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
      <div className="p-3 overflow-y-auto flex-1 min-w-0 scrollbar-hide" style={{ color: theme.content.bodyText }}>
        <ErrorBoundary>
          {content ? (
            <FlexibleContentRenderer content={content} />
          ) : (
            children
          )}
        </ErrorBoundary>
      </div>
    </div>
  )
}
