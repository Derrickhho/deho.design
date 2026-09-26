"use client"

import type React from "react"
import { useTheme } from "../context/theme-context"
import { Typography } from "./typography"
import { getImageUrl } from "../lib/image-utils"
import Image from "next/image"

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
        {thumbnail.image && thumbnail.image !== "/placeholder.jpg" ? (
          <div
            className="w-full h-40 rounded-lg border-0 overflow-hidden"
            style={{
              backgroundImage: `url(${getImageUrl(thumbnail.image)})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              WebkitMaskImage: '-webkit-radial-gradient(white, black)',
            }}
          />
        ) : (
          <div className="w-full h-40 rounded-lg flex items-center justify-center bg-gray-100">
            <div className="text-gray-400 text-sm">Image placeholder</div>
          </div>
        )}

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
