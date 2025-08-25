"use client"

import React, { useState, useEffect } from "react"
import { LottieIcon } from "./lottie-icon"

// Dynamic Lottie loader
function useLottieAnimation(filename: string) {
  const [animationData, setAnimationData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAnimation = async () => {
      try {
        const response = await fetch(`/lottie/${filename}`)
        const data = await response.json()
        setAnimationData(data)
      } catch (error) {
        console.error(`Failed to load animation: ${filename}`, error)
      } finally {
        setLoading(false)
      }
    }

    loadAnimation()
  }, [filename])

  return { animationData, loading }
}

// Folder icon with actual Lottie animation
export function FolderLottieIcon({ 
  className = "", 
  size = 20, 
  isHovered = false,
  isSelected = false 
}: { 
  className?: string; 
  size?: number; 
  isHovered?: boolean;
  isSelected?: boolean;
}) {
  // Use different animation based on selected state
  const filename = isSelected ? "Folder Open.json" : "Folder.json"
  const { animationData, loading } = useLottieAnimation(filename)
  
  if (loading || !animationData) {
    return <div className={className} style={{ width: size, height: size }} />
  }
  
  return (
    <LottieIcon
      animationData={animationData}
      className={className}
      size={size}
      loop={false}
      autoplay={false}
      isHovered={isHovered}
      isSelected={isSelected}
    />
  )
}

// User icon with Lottie animation
export function UserLottieIcon({ 
  className = "", 
  size = 20,
  isHovered = false,
  isSelected = false 
}: { 
  className?: string; 
  size?: number;
  isHovered?: boolean;
  isSelected?: boolean;
}) {
  const { animationData, loading } = useLottieAnimation("User.json")
  
  if (loading || !animationData) {
    return <div className={className} style={{ width: size, height: size }} />
  }
  
  return (
    <LottieIcon
      animationData={animationData}
      className={className}
      size={size}
      loop={false}
      autoplay={false}
      isHovered={isHovered}
      isSelected={isSelected}
    />
  )
}

// Contact icon with Lottie animation
export function ContactLottieIcon({ 
  className = "", 
  size = 20,
  isHovered = false,
  isSelected = false 
}: { 
  className?: string; 
  size?: number;
  isHovered?: boolean;
  isSelected?: boolean;
}) {
  const { animationData, loading } = useLottieAnimation("Contact.json")
  
  if (loading || !animationData) {
    return <div className={className} style={{ width: size, height: size }} />
  }
  
  return (
    <LottieIcon
      animationData={animationData}
      className={className}
      size={size}
      loop={false}
      autoplay={false}
      isHovered={isHovered}
      isSelected={isSelected}
    />
  )
}

// Design icon with Lottie animation
export function DesignLottieIcon({ 
  className = "", 
  size = 20,
  isHovered = false,
  isSelected = false 
}: { 
  className?: string; 
  size?: number;
  isHovered?: boolean;
  isSelected?: boolean;
}) {
  const { animationData, loading } = useLottieAnimation("Design.json")
  
  if (loading || !animationData) {
    return <div className={className} style={{ width: size, height: size }} />
  }
  
  return (
    <LottieIcon
      animationData={animationData}
      className={className}
      size={size}
      loop={false}
      autoplay={false}
      isHovered={isHovered}
      isSelected={isSelected}
    />
  )
}

// Picture icon with Lottie animation
export function PictureLottieIcon({ 
  className = "", 
  size = 20,
  isHovered = false,
  isSelected = false 
}: { 
  className?: string; 
  size?: number;
  isHovered?: boolean;
  isSelected?: boolean;
}) {
  const { animationData, loading } = useLottieAnimation("Picture.json")
  
  if (loading || !animationData) {
    return <div className={className} style={{ width: size, height: size }} />
  }
  
  return (
    <LottieIcon
      animationData={animationData}
      className={className}
      size={size}
      loop={false}
      autoplay={false}
      isHovered={isHovered}
      isSelected={isSelected}
    />
  )
}

// Translation icon with Lottie animation
export function TranslationLottieIcon({ 
  className = "", 
  size = 20,
  isHovered = false,
  isSelected = false 
}: { 
  className?: string; 
  size?: number;
  isHovered?: boolean;
  isSelected?: boolean;
}) {
  const { animationData, loading } = useLottieAnimation("Translation.json")
  
  if (loading || !animationData) {
    return <div className={className} style={{ width: size, height: size }} />
  }
  
  return (
    <LottieIcon
      animationData={animationData}
      className={className}
      size={size}
      loop={false}
      autoplay={false}
      isHovered={isHovered}
      isSelected={isSelected}
    />
  )
}

// Placeholder icons for other types (can be replaced with actual Lottie files later)
export function FileLottieIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <div 
      className={className} 
      style={{ 
        width: size, 
        height: size,
        backgroundColor: '#9ca3af',
        borderRadius: '2px'
      }}
    />
  )
}

export function MailLottieIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <div 
      className={className} 
      style={{ 
        width: size, 
        height: size,
        backgroundColor: '#4b5563',
        borderRadius: '2px'
      }}
    />
  )
}
