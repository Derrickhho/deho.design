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
        <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center" style={{ border: '2px solid blue' }}>
          {thumbnail.image && thumbnail.image !== "/placeholder.jpg" ? (
            <Image 
              src={getImageUrl(thumbnail.image)} 
              alt="Project thumbnail" 
              width={400}
              height={160}
              className="w-full h-full object-cover rounded-lg"
              onLoad={() => console.log('✅ Image loaded successfully:', thumbnail.image)}
              onError={(e) => {
                console.error('❌ Image failed to load:', thumbnail.image)
                console.error('Error details:', e)
                console.error('Attempted URL:', getImageUrl(thumbnail.image || ''))
              }}
              style={{ border: '1px solid red' }} // Add visible border for debugging
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
