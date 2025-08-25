"use client"

import type React from "react"
import { useTheme } from "../context/theme-context"
import { Typography } from "./typography"

interface ThumbnailRendererProps {
  thumbnail: {
    image?: string
    dateRange?: string
    description: string
  }
}

export function ThumbnailRenderer({ thumbnail }: ThumbnailRendererProps) {
  const { theme } = useTheme()

  return (
    <div className="flex flex-col h-full">
      <div className="space-y-4 flex-1">
        {/* Image placeholder */}
        <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center">
          {thumbnail.image && thumbnail.image !== "/placeholder.jpg" ? (
            <img 
              src={thumbnail.image} 
              alt="Project thumbnail" 
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="text-gray-400 text-sm">Image placeholder</div>
          )}
        </div>

        {/* Date range */}
        {thumbnail.dateRange && (
          <Typography variant="bodySmall" color={theme.content.mutedText}>
            {thumbnail.dateRange}
          </Typography>
        )}

        {/* Description */}
        <Typography variant="body" className="pt-2">
          {thumbnail.description}
        </Typography>
      </div>
    </div>
  )
}
