import type React from "react"
import {
  FolderLottieIcon,
  UserLottieIcon,
  ContactLottieIcon,
  DesignLottieIcon,
  PictureLottieIcon,
  TranslationLottieIcon,
  MailLottieIcon,
  FileLottieIcon,
} from "../components/central-icons"
import { ICON_KEYS, type IconKey } from "./icon-keys"

export { ICON_KEYS, type IconKey }

type AppIconComponent = React.FC<{
  className?: string
  size?: number
  isHovered?: boolean
  isSelected?: boolean
}>

export const iconRegistry: Record<IconKey, AppIconComponent> = {
  folder: FolderLottieIcon,
  user: UserLottieIcon,
  contact: ContactLottieIcon,
  work: DesignLottieIcon,
  highlight: PictureLottieIcon,
  translate: TranslationLottieIcon,
  mail: MailLottieIcon,
  file: FileLottieIcon,
}

export function renderIcon(key: IconKey, size = 16): React.ReactElement {
  const Icon = iconRegistry[key]
  return <Icon size={size} />
}
