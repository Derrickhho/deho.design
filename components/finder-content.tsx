"use client"

import React from "react"
import { useTheme } from "../context/theme-context"
import { Body } from "./typography"
import { FlexibleContentRenderer } from "./flexible-content-renderer"
import { ErrorBoundary } from "./error-boundary"
import { AppLink } from "./app-link"
import { useLinecove } from "./linecove-selection"
import { enterMotionClass } from "./enter-motion"
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
  enterStart?: number
}

export function FinderContent({ breadcrumbs, children, content, isEmpty = false, enterStart }: FinderContentProps) {
  const { theme } = useTheme()
  const linecoveRef = useLinecove<HTMLDivElement>()
  const showsBreadcrumb = Boolean(breadcrumbs && breadcrumbs.length > 0)
  const enterClassName = enterMotionClass(showsBreadcrumb || isEmpty ? enterStart : undefined)
  const contentEnterStart = enterStart !== undefined ? enterStart + (showsBreadcrumb ? 1 : 0) : undefined

  const styles = {
    backgroundColor: theme.content.background,
  }

  if (isEmpty) {
    return (
      <div ref={linecoveRef} className="flex-1" style={styles}>
        <div className="p-3 overflow-y-auto h-full max-h-full scrollbar-hide">
          <div className={`flex items-center justify-center h-full${enterClassName ? ` ${enterClassName}` : ""}`}>
            <Body color={theme.content.mutedText}>Select something to view details</Body>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div ref={linecoveRef} className="flex-1 flex flex-col h-full max-h-full overflow-hidden" style={styles}>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div
          className={`flex h-[44px] items-start px-3 pt-4 flex-shrink-0${enterClassName ? ` ${enterClassName}` : ""}`}
          style={{ borderBottom: `0.5px solid ${theme.column.border}` }}
        >
          <div className="flex items-center">
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
                <span className="text-xs font-medium leading-none" style={{ color: theme.content.titleText }}>
                  {crumb.label}
                </span>
              )}
            </React.Fragment>
          ))}
          </div>
        </div>
      )}
      <div className="p-3 overflow-y-auto flex-1 min-w-0 scrollbar-hide" style={{ color: theme.content.bodyText }}>
        <ErrorBoundary>
          {content ? (
            <FlexibleContentRenderer content={content} enterStart={contentEnterStart} />
          ) : (
            children
          )}
        </ErrorBoundary>
      </div>
      </div>
    </div>
  )
}
