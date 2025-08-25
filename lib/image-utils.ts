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
