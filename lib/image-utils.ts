// Import images for production bundling
import watershedImage from "@/data/images/watershed.png"
import commonroomImage from "@/data/images/commonroom.png"
import robinhoodImage from "@/data/images/robinhood.png"
import dropboxImage from "@/data/images/dropbox.png"
import doodlesImage from "@/data/images/doodles.png"
import tabooImage from "@/data/images/taboo.png"

// Image mapping for production
const imageMap: Record<string, string> = {
  "/work/watershed.png": watershedImage,
  "/work/commonroom.png": commonroomImage,
  "/work/robinhood.png": robinhoodImage,
  "/work/dropbox.png": dropboxImage,
  "/doodles.png": doodlesImage,
  "/taboo.PNG": tabooImage,
  "/taboo.png": tabooImage,
}

// Function to get image URL (works in both dev and production)
export function getImageUrl(path: string): string {
  // Ensure the path starts with a slash
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  
  // Add debugging
  console.log('getImageUrl called with:', path, 'returning:', imageMap[normalizedPath] || normalizedPath)
  
  // In production, use the imported image
  if (imageMap[normalizedPath]) {
    return imageMap[normalizedPath]
  }
  
  // Fallback to the original path (for development)
  return normalizedPath
}
