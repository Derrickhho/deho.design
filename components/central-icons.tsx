"use client"

import type React from "react"
import type { CentralIconBaseProps } from "@central-icons-react/round-filled-radius-2-stroke-2/CentralIconBase"
import {
  IconFolder1,
  IconPeople,
  IconContacts,
  IconSuitcaseWork,
  IconHighlight,
  IconTranslate,
  IconEmail1,
  IconFileText,
  IconCodeBrackets,
} from "@central-icons-react/round-filled-radius-2-stroke-2"

type CentralIcon = React.FC<CentralIconBaseProps>

interface AppIconProps {
  className?: string
  size?: number
  isHovered?: boolean
  isSelected?: boolean
}

// Filled icons inherit color from FinderButton, which lightens the icon when
// the row is selected and darkens it otherwise. `isHovered` and `isSelected`
// stay on the props for API compatibility and are intentionally not forwarded.
function makeAppIcon(Icon: CentralIcon) {
  return function AppIcon({ className = "", size = 16 }: AppIconProps) {
    return <Icon className={className} size={size} />
  }
}

export const FolderLottieIcon = makeAppIcon(IconFolder1)
export const UserLottieIcon = makeAppIcon(IconPeople)
export const ContactLottieIcon = makeAppIcon(IconContacts)
export const DesignLottieIcon = makeAppIcon(IconSuitcaseWork)
export const PictureLottieIcon = makeAppIcon(IconHighlight)
export const TranslationLottieIcon = makeAppIcon(IconTranslate)
export const MailLottieIcon = makeAppIcon(IconEmail1)
export const FileLottieIcon = makeAppIcon(IconFileText)
export const CodeLottieIcon = makeAppIcon(IconCodeBrackets)
