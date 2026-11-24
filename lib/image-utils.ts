export function collectImagePaths(value: unknown): string[] {
  const found = new Set<string>()

  const visit = (node: unknown) => {
    if (Array.isArray(node)) {
      node.forEach(visit)
      return
    }
    if (!node || typeof node !== "object") return
    const record = node as Record<string, unknown>
    if (record.type === "thumbnail") {
      const listed = Array.isArray(record.images) ? record.images : [record.imageLeft, record.image]
      for (const src of listed) {
        if (typeof src !== "string" || !src || src === "/placeholder.jpg") continue
        found.add(src.startsWith("/") ? src : `/${src}`)
      }
    }
    for (const child of Object.values(record)) visit(child)
  }

  visit(value)
  return [...found]
}

// Function to get image URL (works in both dev and production)
export function getImageUrl(path: string): string {
  // Ensure the path starts with a slash
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  
  // Add debugging
  console.log('getImageUrl called with:', path, 'returning:', normalizedPath)
  
  // Since Next.js has unoptimized: true, we should use the public folder directly
  // But let's try using absolute URLs in production
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    const baseUrl = window.location.origin
    const fullUrl = `${baseUrl}${normalizedPath}`
    console.log('Production detected, using full URL:', fullUrl)
    return fullUrl
  }
  
  // For development, return the path as-is
  return normalizedPath
}
