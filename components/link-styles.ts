// Shared styling for interactive links and link-like buttons (breadcrumbs, etc.)
// so hover/active treatment stays consistent across the app.
// Padding paints the hover wash around the text. The matching negative margin
// cancels it, so the link keeps the same line box as the surrounding body text.
export const linkClassName =
  "group rounded px-1 py-0.5 -mx-1 -my-0.5 font-medium box-decoration-clone hover:bg-blue-400/20 active:bg-blue-400/35"
