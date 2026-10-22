import * as React from "react"

const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 1024

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

export type Breakpoint = "mobile" | "tablet" | "desktop"

function getBreakpoint(): Breakpoint {
  const width = window.innerWidth
  if (width < MOBILE_BREAKPOINT) return "mobile"
  if (width < TABLET_BREAKPOINT) return "tablet"
  return "desktop"
}

// Returns undefined until measured on the client, so callers can tell the
// initial measurement apart from a later resize across a breakpoint.
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = React.useState<Breakpoint | undefined>(undefined)

  React.useEffect(() => {
    const queries = [MOBILE_BREAKPOINT, TABLET_BREAKPOINT].map((bp) => window.matchMedia(`(min-width: ${bp}px)`))
    const onChange = () => setBreakpoint(getBreakpoint())
    queries.forEach((mql) => mql.addEventListener("change", onChange))
    onChange()
    return () => queries.forEach((mql) => mql.removeEventListener("change", onChange))
  }, [])

  return breakpoint
}

export function useIsTablet() {
  const [isTablet, setIsTablet] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${MOBILE_BREAKPOINT}px) and (max-width: ${TABLET_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsTablet(window.innerWidth >= MOBILE_BREAKPOINT && window.innerWidth < TABLET_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsTablet(window.innerWidth >= MOBILE_BREAKPOINT && window.innerWidth < TABLET_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isTablet
}
