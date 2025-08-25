// Function to get image URL (works in both dev and production)
export function getImageUrl(path: string): string {
  // Ensure the path starts with a slash
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  
  // Add debugging
  console.log('getImageUrl called with:', path, 'returning:', normalizedPath)
  
  // For now, return the path as-is since images are in public folder
  // This will work in both development and production
  return normalizedPath
}
