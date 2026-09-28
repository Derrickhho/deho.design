"use client"

import { useCallback, useRef } from "react"
import { attachLiveSelection, type HighlightHandle, type HighlightStyle } from "linecove"

/** Site selection blue. Light text stays readable on the dark canvas. */
const style: HighlightStyle = {
  radius: 4,
  color: "#007acc",
  paddingInline: 1,
}

/**
 * Paint linecove's selection on this element.
 * The highlight is the element's own background, so attach it to the
 * surface directly behind the text, not to an ancestor with an opaque child.
 */
export function useLinecove<T extends HTMLElement>() {
  const handle = useRef<HighlightHandle | null>(null)

  const ref = useCallback((node: T | null) => {
    handle.current?.destroy()
    handle.current = node ? attachLiveSelection(node, style) : null
  }, [])

  return ref
}
