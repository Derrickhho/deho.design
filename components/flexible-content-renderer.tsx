"use client"

import type React from "react"
import { useTheme } from "../context/theme-context"
import { Typography } from "./typography"
import { AppLink } from "./app-link"
import type { ContentData, ContentBlock, WorkExperienceItem, CurrentStatusItem, ContactItem } from "../types/content"
import { getImageUrl } from "../lib/image-utils"
import Image from "next/image"


interface FlexibleContentRendererProps {
  content: ContentData
}

export function FlexibleContentRenderer({ content }: FlexibleContentRendererProps) {
  return (
    <div className="w-full min-w-0">
      {content.blocks.map((block, index) => (
        <div key={index} className="pb-3 min-w-0">
          <ContentBlockRenderer block={block} />
        </div>
      ))}
    </div>
  )
}

interface ContentBlockRendererProps {
  block: ContentBlock
}

function ContentBlockRenderer({ block }: ContentBlockRendererProps) {
  switch (block.type) {
    case "thumbnail":
      return <ThumbnailBlockRenderer block={block} />
    case "paragraph":
      return <ParagraphBlockRenderer block={block} />
    case "list":
      return <ListBlockRenderer block={block} />
    default:
      return null
  }
}

// Thumbnail Block Renderer
function ThumbnailBlockRenderer({ block }: { block: any }) {
  const { theme } = useTheme()

  const hasImage = block.image && block.image !== "/placeholder.jpg"

  return (
    <div className="flex flex-col">
      <div className="space-y-4">
        {/* Image (omitted for items without an image, e.g. work items) */}
        {hasImage && (
          <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center">
            <img
              src={getImageUrl(block.image)}
              alt="Project thumbnail"
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => {
                console.error('❌ Image failed to load:', block.image)
                console.error('Attempted URL:', getImageUrl(block.image))
              }}
            />
          </div>
        )}

        {/* Date range */}
        {block.dateRange && (
          <Typography variant="bodySmall" color={theme.content.mutedText}>
            {block.dateRange}
          </Typography>
        )}

        {/* Description */}
        <Typography variant="body" className="pt-2">
          {block.description}
        </Typography>
      </div>
    </div>
  )
}

// Paragraph Block Renderer
function ParagraphBlockRenderer({ block }: { block: any }) {
  return (
    <Typography variant="body">
      {parseLinks(block.content)}
    </Typography>
  )
}

// List Block Renderer
function ListBlockRenderer({ block }: { block: any }) {
  const { theme, isDark } = useTheme()

  return (
    <div className="space-y-4 min-w-0">
      {block.title && (
        <Typography variant="h3">{block.title}</Typography>
      )}
      <div className="space-y-0.5 min-w-0">
        {block.items.map((item: any, index: number) => (
          <ItemRenderer key={index} item={item} sectionTitle={block.title} />
        ))}
      </div>
    </div>
  )
}

// Item Renderer (reused from content-renderer.tsx)
interface ItemRendererProps {
  item: WorkExperienceItem | CurrentStatusItem | ContactItem
  sectionTitle?: string
}

function ItemRenderer({ item, sectionTitle }: ItemRendererProps) {
  const { theme } = useTheme()
  
  if ('role' in item) {
    // WorkExperienceItem
    return (
      <div className="flex justify-between items-start">
        <div>
          <Typography variant="body" className="font-medium">
            {item.content}
          </Typography>
          {item.role && (
            <Typography variant="bodySmall" className="text-muted-foreground">
              {item.role}
            </Typography>
          )}
        </div>
        <Typography 
          variant="bodySmall" 
          color={theme.content.mutedText}
        >
          {item.details}
        </Typography>
      </div>
    )
  } else if ('status' in item) {
    // CurrentStatusItem
    return (
      <div className="flex justify-between items-start">
        <Typography variant="body" className="font-medium">
          {item.status}
        </Typography>
        <Typography 
          variant="bodySmall" 
          color={theme.content.mutedText}
        >
          {item.description}
        </Typography>
      </div>
    )
  } else {
    // ContactItem - apply links if this is a contact section or specific content sections
    const isContactSection = sectionTitle?.toLowerCase().includes('contact') || sectionTitle?.toLowerCase().includes('reach me')
    const isDoodlesSection = sectionTitle?.toLowerCase().includes('check out my work')
    const isDoodlesContent = item.content.toLowerCase() === 'store' || item.content.toLowerCase() === 'instagram'
    const hasUrl = 'url' in item && !!item.url

    if (isContactSection || isDoodlesSection || isDoodlesContent || hasUrl) {
      const linkUrl = 'url' in item ? item.url || item.details : item.details
      
      return (
        <div className="flex justify-between items-start min-w-0">
          <Typography variant="body" className="font-medium flex-shrink-0">
            {item.content}
          </Typography>
          <AppLink href={linkUrl} className="flex-shrink-0 ml-2 text-xs">
            {item.details}
          </AppLink>
        </div>
      )
    } else {
      // Not a contact section, render as regular text
      return (
        <div className="flex justify-between items-start min-w-0">
          <Typography variant="body" className="font-medium flex-shrink-0">
            {item.content}
          </Typography>
          <Typography 
            variant="bodySmall" 
            color={theme.content.mutedText}
            className="flex-shrink-0 ml-2"
          >
            {item.details}
          </Typography>
        </div>
      )
    }
  }
}

// Function to parse markdown-style links and convert them to React elements
function parseLinks(text: string): React.ReactNode {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match

  while ((match = linkRegex.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    // Add the link
    parts.push(
      <AppLink key={match.index} href={match[2]}>
        {match[1]}
      </AppLink>
    )

    lastIndex = match.index + match[0].length
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts.length > 0 ? parts : text
}
