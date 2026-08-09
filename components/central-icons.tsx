"use client"

import type React from "react"
import type { CentralIconBaseProps } from "@central-icons-react/round-outlined-radius-3-stroke-2/CentralIconBase"
import {
  IconFolder1,
  IconPeople,
  IconContacts,
  IconSuitcaseWork,
  IconHighlight,
  IconTranslate,
  IconEmail1,
  IconFileText,
} from "@central-icons-react/round-outlined-radius-3-stroke-2"
import {
  IconFolderOpen as IconFolderOpenFilled,
  IconPeople as IconPeopleFilled,
  IconContacts as IconContactsFilled,
  IconSuitcaseWork as IconSuitcaseWorkFilled,
  IconHighlight as IconHighlightFilled,
  IconTranslate as IconTranslateFilled,
  IconEmail1 as IconEmail1Filled,
  IconFileText as IconFileTextFilled,
} from "@central-icons-react/round-filled-radius-3-stroke-2"

type CentralIcon = React.FC<CentralIconBaseProps>

interface AppIconProps {
  className?: string
  size?: number
  isHovered?: boolean
  isSelected?: boolean
}

// The Central Icons render with `currentColor`, so color is inherited from the
// surrounding element (handled by FinderButton). Each icon uses the outlined
// variant by default and swaps to the filled variant when its row is selected.
// `isHovered` is accepted for API compatibility and intentionally not forwarded.
function makeAppIcon(Unselected: CentralIcon, SelectedFilled: CentralIcon) {
  return function AppIcon({ className = "", size = 16, isSelected = false }: AppIconProps) {
    const Icon = isSelected ? SelectedFilled : Unselected
    return <Icon className={className} size={size} />
  }
}

export const FolderLottieIcon = makeAppIcon(IconFolder1, IconFolderOpenFilled)
export const UserLottieIcon = makeAppIcon(IconPeople, IconPeopleFilled)
export const ContactLottieIcon = makeAppIcon(IconContacts, IconContactsFilled)
export const DesignLottieIcon = makeAppIcon(IconSuitcaseWork, IconSuitcaseWorkFilled)
export const PictureLottieIcon = makeAppIcon(IconHighlight, IconHighlightFilled)
export const TranslationLottieIcon = makeAppIcon(IconTranslate, IconTranslateFilled)
export const MailLottieIcon = makeAppIcon(IconEmail1, IconEmail1Filled)
export const FileLottieIcon = makeAppIcon(IconFileText, IconFileTextFilled)
