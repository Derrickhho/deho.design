// Function to get image URL (works in both dev and production)
export function getImageUrl(path: string): string {
  // Ensure the path starts with a slash
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  
  // Add debugging
  console.log('getImageUrl called with:', path, 'returning:', normalizedPath)
  
  // Try to detect if we're in production and use a different approach
  const isProduction = typeof window !== 'undefined' && window.location.hostname !== 'localhost'
  
  if (isProduction) {
    // In production, try to use the full URL
    const baseUrl = window.location.origin
    const fullUrl = `${baseUrl}${normalizedPath}`
    console.log('Production detected, using full URL:', fullUrl)
    return fullUrl
  }
  
  // For development, return the path as-is
  return normalizedPath
}
