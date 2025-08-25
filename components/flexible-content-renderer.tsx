"use client"

import type React from "react"
import { useTheme } from "../context/theme-context"
import { Typography } from "./typography"
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

  return (
    <div className="flex flex-col">
      <div className="space-y-4">
        {/* Image placeholder */}
        <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center">
          {block.image && block.image !== "/placeholder.jpg" ? (
            <img 
              src={getImageUrl(block.image)} 
              alt="Project thumbnail" 
              className="w-full h-full object-cover rounded-lg"
              onLoad={() => console.log('✅ Image loaded successfully:', block.image)}
              onError={(e) => {
                console.error('❌ Image failed to load:', block.image)
                console.error('Error details:', e)
                console.error('Attempted URL:', getImageUrl(block.image))
                console.error('Current location:', typeof window !== 'undefined' ? window.location.href : 'server-side')
              }}
            />
          ) : (
            <div className="text-gray-400 text-sm">Image placeholder</div>
          )}
        </div>

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
  const { theme, isDark } = useTheme()
  
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
    
    if (isContactSection || isDoodlesSection || isDoodlesContent) {
      const linkUrl = 'url' in item ? item.url || item.details : item.details
      
      return (
        <div className="flex justify-between items-start min-w-0">
          <Typography variant="body" className="font-medium flex-shrink-0">
            {item.content}
          </Typography>
          <div className="flex items-center relative flex-shrink-0 ml-2">
            <a 
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center transition-all duration-200 hover:-translate-x-4"
            >
              <Typography 
                variant="bodySmall" 
                color={theme.content.mutedText}
                className={`transition-colors duration-200 ${
                  isDark 
                    ? "group-hover:!text-blue-400 group-active:!text-blue-400" 
                    : "group-hover:!text-blue-600 group-active:!text-blue-600"
                }`}
              >
                {item.details}
              </Typography>
              <svg 
                className={`w-3 h-3 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-200 absolute -right-4 ${
                  isDark ? "text-blue-400" : "text-blue-600"
                }`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </div>
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
  const { isDark } = useTheme()

  while ((match = linkRegex.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    // Add the link
    parts.push(
      <a
        key={match.index}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center relative"
      >
        <span className={`font-medium transition-colors duration-200 ${
          isDark 
            ? "text-blue-400 group-hover:text-blue-300 group-active:text-blue-300" 
            : "text-blue-600 group-hover:text-blue-800 group-active:text-blue-800"
        }`}>
          {match[1]}
        </span>
        <span className={`absolute bottom-0 left-1/2 w-0 h-px transition-all duration-300 ease-out ${
          isDark ? "bg-blue-400" : "bg-blue-600"
        } group-hover:w-full group-hover:-translate-x-1/2 group-active:w-full group-active:-translate-x-1/2`}></span>
      </a>
    )

    lastIndex = match.index + match[0].length
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts.length > 0 ? parts : text
}
