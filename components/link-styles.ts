// Shared styling for interactive links and link-like buttons (breadcrumbs, etc.)
// so hover/active treatment stays consistent across the app.
// Inline so links share the surrounding text's line box (no selection gaps).
// px-1 with matching -mx-1 keeps a hover halo without shifting layout (net 0px gap).
// Vertical padding on an inline element grows the hover background up/down for
// breathing room without pushing lines apart or affecting text selection.
export const linkClassName =
  "group rounded px-1 py-0.5 -mx-1 box-decoration-clone transition-colors duration-200 hover:bg-blue-400/20 active:bg-blue-400/20"
