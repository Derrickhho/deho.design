import { z } from "zod"
import { ICON_KEYS } from "../lib/icon-keys"

export const iconKeySchema = z.enum(ICON_KEYS)

const workExperienceItemSchema = z.object({
  content: z.string(),
  role: z.string().optional(),
  details: z.string(),
})

const currentStatusItemSchema = z.object({
  status: z.string(),
  description: z.string(),
})

const contactItemSchema = z.object({
  content: z.string(),
  details: z.string(),
  url: z.string().optional(),
})

const listItemSchema = z.union([
  contactItemSchema,
  workExperienceItemSchema,
  currentStatusItemSchema,
])

const thumbnailBlockSchema = z.object({
  type: z.literal("thumbnail"),
  image: z.string().optional(),
  dateRange: z.string().optional(),
  description: z.string(),
})

const paragraphBlockSchema = z.object({
  type: z.literal("paragraph"),
  content: z.string(),
})

const listBlockSchema = z.object({
  type: z.literal("list"),
  title: z.string().optional(),
  items: z.array(listItemSchema),
})

export const contentBlockSchema = z.discriminatedUnion("type", [
  thumbnailBlockSchema,
  paragraphBlockSchema,
  listBlockSchema,
])

export const contentDataSchema = z.object({
  title: z.string(),
  blocks: z.array(contentBlockSchema),
})

export type PortfolioItemSource = {
  id: string
  name: string
  type: "folder" | "file"
  icon: z.infer<typeof iconKeySchema>
  selectedIcon?: z.infer<typeof iconKeySchema>
  children?: PortfolioItemSource[]
  content?: z.infer<typeof contentDataSchema>
}

export const portfolioItemSchema: z.ZodType<PortfolioItemSource> = z.lazy(() =>
  z.object({
    id: z.string(),
    name: z.string(),
    type: z.enum(["folder", "file"]),
    icon: iconKeySchema,
    selectedIcon: iconKeySchema.optional(),
    children: z.array(portfolioItemSchema).optional(),
    content: contentDataSchema.optional(),
  })
)

export const portfolioSchema = z.array(portfolioItemSchema)
