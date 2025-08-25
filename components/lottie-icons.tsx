"use client"

import React from "react"
import { LottieIcon } from "./lottie-icon"

// Import Lottie animation data directly
import folderAnimation from "../data/lottie/Folder.json"
import folderOpenAnimation from "../data/lottie/Folder Open.json"
import userAnimation from "../data/lottie/User.json"
import contactAnimation from "../data/lottie/Contact.json"
import designAnimation from "../data/lottie/Design.json"
import pictureAnimation from "../data/lottie/Picture.json"
import translationAnimation from "../data/lottie/Translation.json"

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
  const animationData = isSelected ? folderOpenAnimation : folderAnimation
  
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
  return (
    <LottieIcon
      animationData={userAnimation}
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
  return (
    <LottieIcon
      animationData={contactAnimation}
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
  return (
    <LottieIcon
      animationData={designAnimation}
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
  return (
    <LottieIcon
      animationData={pictureAnimation}
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
  return (
    <LottieIcon
      animationData={translationAnimation}
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
