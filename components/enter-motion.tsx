const ENTER_DELAYS = [
  "delay-0",
  "delay-50",
  "delay-100",
  "delay-150",
  "delay-200",
  "delay-250",
  "delay-300",
  "delay-350",
  "delay-400",
  "delay-450",
  "delay-500",
  "delay-550",
  "delay-600",
  "delay-650",
  "delay-700",
  "delay-750",
  "delay-800",
  "delay-850",
  "delay-900",
  "delay-950",
]

export function enterMotionClass(step?: number, duration = "duration-500") {
  if (step === undefined) return undefined
  const delay = ENTER_DELAYS[Math.min(step, ENTER_DELAYS.length - 1)]
  return `animate-in fade-in slide-in-from-bottom-4 ${duration} fill-mode-both motion-reduce:animate-none ${delay}`
}
