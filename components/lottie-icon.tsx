"use client"

import React, { useRef } from "react"
import Lottie from "lottie-react"
import { useTheme } from "../context/theme-context"

interface LottieIconProps {
  animationData: any
  className?: string
  size?: number
  loop?: boolean
  autoplay?: boolean
  isHovered?: boolean
  isSelected?: boolean
  onComplete?: () => void
}

export function LottieIcon({ 
  animationData, 
  className = "", 
  size = 16, 
  loop = true, 
  autoplay = false,
  isHovered = false,
  isSelected = false,
  onComplete 
}: LottieIconProps) {
  const lottieRef = useRef<any>(null)
  const { isDark } = useTheme()

  React.useEffect(() => {
    if (lottieRef.current) {
      if (isHovered) {
        console.log('Lottie hover: playing animation')
        lottieRef.current.play()
      } else {
        console.log('Lottie hover: stopping animation')
        lottieRef.current.stop()
        lottieRef.current.goToAndStop(0, true)
      }
    }
  }, [isHovered])

  // Determine the filter based on theme and selected state
  let filter = "none"
  if (isSelected) {
    filter = "brightness(0) invert(1)" // White when selected
  } else if (isDark) {
    filter = "brightness(0) invert(1)" // White in dark mode
  }

  return (
    <div className={className} style={{ width: size, height: size }}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        onComplete={onComplete}
        style={{ 
          width: "100%", 
          height: "100%",
          objectFit: "contain",
          filter: filter
        }}

      />
    </div>
  )
}
