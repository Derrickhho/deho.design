import type { ContentData, FileSystemItem } from "../types/content"
import { renderIcon } from "../lib/icon-registry"
import { portfolioSchema, type PortfolioItemSource } from "./portfolio-schema"
import portfolioJson from "./portfolio.json"

function hydrateItem(item: PortfolioItemSource): FileSystemItem {
  return {
    id: item.id,
    name: item.name,
    type: item.type,
    icon: renderIcon(item.icon),
    selectedIcon: item.selectedIcon ? renderIcon(item.selectedIcon) : undefined,
    children: item.children?.map(hydrateItem),
    content: item.content as ContentData | undefined,
  }
}

export function loadPortfolioContent(): FileSystemItem[] {
  const parsed = portfolioSchema.parse(portfolioJson)
  return parsed.map(hydrateItem)
}

export const portfolioContent = loadPortfolioContent()

export function getContentById(id: string): FileSystemItem | undefined {
  function search(items: FileSystemItem[]): FileSystemItem | undefined {
    for (const item of items) {
      if (item.id === id) return item
      if (item.children) {
        const found = search(item.children)
        if (found) return found
      }
    }
    return undefined
  }
  return search(portfolioContent)
}

export function getFolderById(id: string): FileSystemItem | undefined {
  const item = getContentById(id)
  return item?.type === "folder" ? item : undefined
}

export function getFileById(id: string): FileSystemItem | undefined {
  const item = getContentById(id)
  return item?.type === "file" ? item : undefined
}
