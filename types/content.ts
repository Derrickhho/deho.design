import type React from "react"

export interface FileSystemItem {
  id: string
  name: string
  type: "folder" | "file"
  icon: React.ReactNode
  selectedIcon?: React.ReactNode
  children?: FileSystemItem[]
  content?: ContentData
}

export interface ContentData {
  title: string
  blocks: ContentBlock[]
}

export type ContentBlock = 
  | ThumbnailBlock
  | ParagraphBlock
  | ListBlock

export interface ThumbnailBlock {
  type: "thumbnail"
  image?: string
  dateRange?: string
  description: string
}

export interface ParagraphBlock {
  type: "paragraph"
  content: string
}

export interface ListBlock {
  type: "list"
  title?: string
  items: WorkExperienceItem[] | CurrentStatusItem[] | ContactItem[]
}

export type ContentSection = 
  | ParagraphSection
  | SectionWithItems

export interface ParagraphSection {
  type: "paragraph"
  content: string
}

export interface SectionWithItems {
  type: "section"
  title: string
  items: WorkExperienceItem[] | CurrentStatusItem[] | ContactItem[]
}

export interface ThumbnailData {
  image?: string
  dateRange?: string
  description: string
}

export interface WorkExperienceItem {
  content: string
  role?: string
  details: string
}

export interface CurrentStatusItem {
  status: string
  description: string
}

export interface ContactItem {
  content: string
  details: string
  url?: string
}
