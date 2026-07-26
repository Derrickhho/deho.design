export const ICON_KEYS = [
  "folder",
  "user",
  "contact",
  "work",
  "highlight",
  "translate",
  "mail",
  "file",
] as const

export type IconKey = (typeof ICON_KEYS)[number]
