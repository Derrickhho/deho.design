"use client"

import { useCallback, useRef } from "react"
import { attachLiveSelection, type HighlightHandle } from "linecove"
import { useTheme } from "../context/theme-context"

const LIGHT_SELECTION = "#ADD6FF"
const DARK_SELECTION = "#007acc"

/**
 * Paint linecove's selection on this element.
 * The highlight is the element's own background, so attach it to the
 * surface directly behind the text, not to an ancestor with an opaque child.
 */
export function useLinecove<T extends HTMLElement>() {
  const { isDark } = useTheme()
  const handle = useRef<HighlightHandle | null>(null)
  const color = isDark ? DARK_SELECTION : LIGHT_SELECTION

  const ref = useCallback((node: T | null) => {
    handle.current?.destroy()
    handle.current = node
      ? attachLiveSelection(node, { radius: 4, color, paddingInline: 1 })
      : null
  }, [color])

  return ref
}
