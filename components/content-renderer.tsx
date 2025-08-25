"use client"

import type React from "react"
import type { ContentData, ContentBlock, WorkExperienceItem, CurrentStatusItem, ContactItem } from "../types/content"
import { Typography } from "./typography"
import { useTheme } from "../context/theme-context"


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
            ? "text-blue-400 group-hover:text-blue-300" 
            : "text-blue-600 group-hover:text-blue-800"
        }`}>
          {match[1]}
        </span>
        <span className={`absolute bottom-0 left-1/2 w-0 h-px transition-all duration-300 ease-out ${
          isDark ? "bg-blue-400" : "bg-blue-600"
        } group-hover:w-full group-hover:-translate-x-1/2`}></span>
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

interface ContentRendererProps {
  content: ContentData
}

export function ContentRenderer({ content }: ContentRendererProps) {
  return (
    <div className="space-y-4">
      {content.blocks?.map((block, index) => (
        <ContentBlockRenderer key={index} block={block} />
      ))}
    </div>
  )
}

interface ContentBlockRendererProps {
  block: ContentBlock
}

function ContentBlockRenderer({ block }: ContentBlockRendererProps) {
  switch (block.type) {
    case "paragraph":
      return (
        <div className="space-y-4">
          <Typography variant="body">
            {parseLinks(block.content)}
          </Typography>
        </div>
      )
    
    case "list":
      return (
        <div className="space-y-4">
          {block.title && <Typography variant="h3">{block.title}</Typography>}
          <div className="space-y-0.5">
            {block.items.map((item, index) => (
              <ItemRenderer key={index} item={item} sectionTitle={block.title} />
            ))}
          </div>
        </div>
      )
    
    case "thumbnail":
      return null // Handle thumbnail blocks if needed
    
    default:
      return null
  }
}

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
    const isContactSection = sectionTitle?.toLowerCase().includes('contact')
    const isDoodlesSection = sectionTitle?.toLowerCase().includes('check out my work')
    
    if (isContactSection || isDoodlesSection) {
      const linkUrl = 'url' in item ? item.url || item.details : item.details
      
      return (
        <div className="flex justify-between items-start">
          <Typography variant="body" className="font-medium">
            {item.content}
          </Typography>
          <div className="flex items-center">
            <a 
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1 transition-all duration-200 hover:-translate-x-4"
            >
              <Typography 
                variant="bodySmall" 
                color={theme.content.mutedText}
                className={`transition-colors duration-200 ${
                  isDark 
                    ? "group-hover:!text-blue-400" 
                    : "group-hover:!text-blue-600"
                }`}
              >
                {item.details}
              </Typography>
              <svg 
                className={`w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-200 ${
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
        <div className="flex justify-between items-start">
          <Typography variant="body" className="font-medium">
            {item.content}
          </Typography>
          <Typography 
            variant="bodySmall" 
            color={theme.content.mutedText}
          >
            {item.details}
          </Typography>
        </div>
      )
    }
  }
}
