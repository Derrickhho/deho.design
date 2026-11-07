"use client"

import { useLayoutEffect, useRef, useState, type React } from "react"
import { useTheme } from "../context/theme-context"
import { Typography } from "./typography"
import { AppLink } from "./app-link"
import type { ContentData, ContentBlock, WorkExperienceItem, CurrentStatusItem, ContactItem } from "../types/content"
import { getImageUrl } from "../lib/image-utils"
import Image from "next/image"
import { enterMotionClass } from "./enter-motion"


interface FlexibleContentRendererProps {
  content: ContentData
  enterStart?: number
}

function blockEnterCount(block: ContentBlock) {
  if (block.type === "thumbnail") {
    const images = thumbnailImages(block)
    return (images.length > 0 ? 1 : 0) + (block.dateRange ? 1 : 0) + (block.description ? 1 : 0)
  }
  if (block.type === "paragraph") return 1
  if (block.type === "list") return (block.title ? 1 : 0) + block.items.length
  return 0
}

export function FlexibleContentRenderer({ content, enterStart }: FlexibleContentRendererProps) {
  let step = enterStart
  let aboutMeText = false
  return (
    <div className="w-full min-w-0">
      {content.blocks.map((block, index) => {
        const start = step
        const slowText = aboutMeText && block.type === "paragraph"
        if (step !== undefined) {
          step += blockEnterCount(block)
          if (block.type === "thumbnail" && thumbnailImages(block).includes("/about-me-photo.jpg")) {
            aboutMeText = true
            step += 2
          }
        }
        return (
          <div key={index} className="pb-3 min-w-0">
            <ContentBlockRenderer block={block} enterStart={start} slowText={slowText} />
          </div>
        )
      })}
    </div>
  )
}

function ContentBlockRenderer({ block, enterStart, slowText }: { block: ContentBlock; enterStart?: number; slowText?: boolean }) {
  switch (block.type) {
    case "thumbnail":
      return <ThumbnailBlockRenderer block={block} enterStart={enterStart} />
    case "paragraph":
      return <ParagraphBlockRenderer block={block} enterStart={enterStart} slowText={slowText} />
    case "list":
      return <ListBlockRenderer block={block} enterStart={enterStart} />
    default:
      return null
  }
}

const PHOTO_TRAITS: Record<string, { alt: string; position: string; ratio: number }> = {
  "/about-me-portrait.jpg": { alt: "Derrick Ho", position: "object-center", ratio: 1024 / 886 },
  "/about-me-photo.jpg": { alt: "About me", position: "object-[35%_70%]", ratio: 1016 / 687 },
  "/doodle-cake.jpg": { alt: "Cake over Lucca Delicatessen", position: "object-center", ratio: 763 / 1024 },
  "/doodle-sunset.jpg": { alt: "Pac-Man over a sunset bay", position: "object-center", ratio: 1024 / 768 },
  "/doodle-forest.jpg": { alt: "Astronauts in a forest", position: "object-center", ratio: 1024 / 683 },
  "/aiya-box.jpg": { alt: "Aiya! box", position: "object-center", ratio: 682 / 1024 },
  "/aiya-open.jpg": { alt: "Aiya! open box", position: "object-center", ratio: 682 / 1024 },
  "/aiya-cards.jpg": { alt: "Aiya! cards", position: "object-center", ratio: 681 / 1024 },
}

function photoTrait(src: string) {
  return PHOTO_TRAITS[src] ?? { alt: "About me", position: "object-center", ratio: 1 }
}

function blockPhotoDrag(event: React.DragEvent<HTMLImageElement>) {
  event.preventDefault()
}

function fadeGradient(direction: "to left" | "to right", color: string) {
  return `linear-gradient(${direction}, ${color} 0%, color-mix(in srgb, ${color} 40%, transparent) 42%, transparent 100%)`
}

function thumbnailImages(block: { images?: string[]; imageLeft?: string; image?: string }) {
  const listed = block.images?.length ? block.images : [block.imageLeft, block.image]
  return listed.filter((src): src is string => Boolean(src) && src !== "/placeholder.jpg")
}

function PhotoGallery({ images, enterStep }: { images: string[]; enterStep?: number }) {
  const { theme } = useTheme()
  const rowRef = useRef<HTMLDivElement>(null)
  const [ratios, setRatios] = useState<number[]>(() => images.map((src) => photoTrait(src).ratio))
  const [fade, setFade] = useState({ left: false, right: false })

  const updateFade = () => {
    const el = rowRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setFade({
      left: el.scrollLeft > 4,
      right: max - el.scrollLeft > 4,
    })
  }

  useLayoutEffect(() => {
    const el = rowRef.current
    if (!el) return
    updateFade()
    const observer = new ResizeObserver(updateFade)
    observer.observe(el)
    for (const child of el.children) observer.observe(child)
    return () => observer.disconnect()
  }, [images.length])

  const fadeColor = theme.content.background
  const motion = enterMotionClass(enterStep) ? ` ${enterMotionClass(enterStep)}` : ""

  if (images.length === 1) {
    const src = images[0]
    return (
      <img
        src={getImageUrl(src)}
        alt={photoTrait(src).alt}
        draggable={false}
        onDragStart={blockPhotoDrag}
        className={`mb-3 h-40 w-full select-none rounded-sm object-cover [-webkit-user-drag:none] ${photoTrait(src).position}${motion}`}
        onError={() => {
          console.error('❌ Image failed to load:', src)
          console.error('Attempted URL:', getImageUrl(src))
        }}
      />
    )
  }

  if (images.length === 2) {
    const pairWidth = (index: number) =>
      index === 0
        ? "w-[calc(var(--photo-ratio-0)*10rem*0.9)]"
        : "w-[calc(100%-0.5rem-var(--photo-ratio-0)*10rem*0.9)]"
    return (
      <div
        className={`mb-3 flex h-40 w-full min-w-0 gap-2${motion}`}
        style={{
          "--photo-ratio-0": ratios[0] || photoTrait(images[0]).ratio,
          "--photo-ratio-1": ratios[1] || photoTrait(images[1]).ratio,
        } as React.CSSProperties}
      >
        {images.map((src, index) => (
          <img
            key={src}
            src={getImageUrl(src)}
            alt={photoTrait(src).alt}
            draggable={false}
            onDragStart={blockPhotoDrag}
            className={`h-full min-w-0 shrink-0 select-none rounded-sm object-cover [-webkit-user-drag:none] ${pairWidth(index)} ${photoTrait(src).position}`}
            onLoad={(event) => {
              const img = event.currentTarget
              const ratio = img.naturalWidth / img.naturalHeight
              setRatios((current) => {
                if (Math.abs((current[index] ?? 0) - ratio) < 0.001) return current
                const next = current.length === images.length ? [...current] : images.map((item) => photoTrait(item).ratio)
                next[index] = ratio
                return next
              })
            }}
            onError={() => {
              console.error('❌ Image failed to load:', src)
              console.error('Attempted URL:', getImageUrl(src))
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className={`relative mb-3 min-w-0 max-w-full${motion}`}>
      <div
        ref={rowRef}
        className="flex h-40 w-full min-w-0 gap-2 overflow-x-auto overscroll-x-contain scrollbar-hide"
        onScroll={updateFade}
      >
        {images.map((src, index) => (
          <img
            key={src}
            src={getImageUrl(src)}
            alt={photoTrait(src).alt}
            draggable={false}
            onDragStart={blockPhotoDrag}
            className={`h-full w-[calc(var(--photo-ratio)*10rem)] shrink-0 select-none rounded-sm object-cover [-webkit-user-drag:none] ${photoTrait(src).position}`}
            style={{ "--photo-ratio": ratios[index] || photoTrait(src).ratio } as React.CSSProperties}
            onLoad={(event) => {
              const img = event.currentTarget
              const ratio = img.naturalWidth / img.naturalHeight
              setRatios((current) => {
                if (Math.abs((current[index] ?? 0) - ratio) < 0.001) return current
                const next = current.length === images.length ? [...current] : images.map((item) => photoTrait(item).ratio)
                next[index] = ratio
                return next
              })
            }}
            onError={() => {
              console.error('❌ Image failed to load:', src)
              console.error('Attempted URL:', getImageUrl(src))
            }}
          />
        ))}
      </div>
      {fade.left && (
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-12"
          style={{ background: fadeGradient("to right", fadeColor) }}
        />
      )}
      {fade.right && (
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-12"
          style={{ background: fadeGradient("to left", fadeColor) }}
        />
      )}
    </div>
  )
}

// Thumbnail Block Renderer
function ThumbnailBlockRenderer({ block, enterStart }: { block: any; enterStart?: number }) {
  const images = thumbnailImages(block)

  const hasImages = images.length > 0
  const hasDate = Boolean(block.dateRange)
  let step = enterStart
  const imageStep = hasImages && step !== undefined ? step++ : undefined
  const dateStep = hasDate && step !== undefined ? step++ : undefined
  const descriptionStep = block.description && step !== undefined ? step++ : undefined

  return (
    <div className="flex min-w-0 flex-col">
      {hasImages ? <PhotoGallery key={images.join("|")} images={images} enterStep={imageStep} /> : null}

      {hasDate ? (
        <DateLine enterStep={dateStep} className={hasImages ? "pt-3" : undefined}>{block.dateRange}</DateLine>
      ) : null}

      {block.description ? (
        <DescriptionLine enterStep={descriptionStep} className={hasImages && !hasDate ? "pt-3" : hasDate ? "mt-3" : undefined}>
          {block.description}
        </DescriptionLine>
      ) : null}
    </div>
  )
}

function DateLine({ className, children, enterStep }: { className?: string; children: React.ReactNode; enterStep?: number }) {
  const { theme } = useTheme()
  const enterClassName = enterMotionClass(enterStep)
  return (
    <Typography
      variant="bodySmall"
      color={theme.content.mutedText}
      className={[enterClassName, className].filter(Boolean).join(" ") || undefined}
    >
      {children}
    </Typography>
  )
}

function DescriptionLine({ className, children, enterStep }: { className?: string; children: React.ReactNode; enterStep?: number }) {
  const enterClassName = enterMotionClass(enterStep)
  return (
    <Typography variant="body" className={[enterClassName, className].filter(Boolean).join(" ") || undefined}>
      {children}
    </Typography>
  )
}

// Paragraph Block Renderer
function ParagraphBlockRenderer({ block, enterStart, slowText }: { block: any; enterStart?: number; slowText?: boolean }) {
  const enterClassName = enterMotionClass(enterStart, slowText ? "duration-700" : undefined)
  return (
    <Typography variant="body" className={enterClassName}>
      {parseLinks(block.content)}
    </Typography>
  )
}

// List Block Renderer
function ListBlockRenderer({ block, enterStart }: { block: any; enterStart?: number }) {
  const { theme, isDark } = useTheme()
  let step = enterStart
  const titleStep = block.title && step !== undefined ? step++ : undefined
  const itemSteps: Array<number | undefined> = block.items.map(() => (step !== undefined ? step++ : undefined))

  return (
    <div className="space-y-4 min-w-0">
      {block.title ? <ListTitle enterStep={titleStep}>{block.title}</ListTitle> : null}
      <div className="space-y-0.5 min-w-0">
        {block.items.map((item: any, index: number) => (
          <ItemRenderer key={index} item={item} sectionTitle={block.title} enterStep={itemSteps[index]} />
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

function ListTitle({ children, enterStep }: { children: React.ReactNode; enterStep?: number }) {
  const enterClassName = enterMotionClass(enterStep)
  return <Typography variant="h3" className={enterClassName}>{children}</Typography>
}

function ItemRenderer({ item, sectionTitle, enterStep }: ItemRendererProps & { enterStep?: number }) {
  const { theme } = useTheme()
  const enterClassName = enterMotionClass(enterStep)
  const rowClass = `flex justify-between items-start min-w-0${enterClassName ? ` ${enterClassName}` : ""}`
  
  if ('role' in item) {
    // WorkExperienceItem
    return (
      <div className={rowClass}>
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
      <div className={rowClass}>
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
        <div className={rowClass}>
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
        <div className={rowClass}>
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
