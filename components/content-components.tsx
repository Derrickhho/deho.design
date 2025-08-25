"use client"

import type React from "react"

import { useTheme } from "../context/theme-context"
import { Body, Caption, Heading3 } from "./typography"

export function WorkExperienceItem({ company, role, period }: { company: string; role?: string; period: string }) {
  const { theme } = useTheme()

  return (
    <div className="flex justify-between items-center">
      <Body color={theme.content.bodyText}>{role ? `${role} at ${company}` : company}</Body>
      <Caption color={theme.content.mutedText}>{period}</Caption>
    </div>
  )
}

export function CurrentStatusItem({ status, description }: { status: string; description: string }) {
  const { theme } = useTheme()

  return (
    <div className="flex justify-between items-center">
      <Body color={theme.content.bodyText}>{status}</Body>
      <Caption color={theme.content.mutedText}>{description}</Caption>
    </div>
  )
}

export function SectionHeading({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()

  return (
    <Heading3 color={theme.content.bodyText} className="mb-2">
      {children}
    </Heading3>
  )
}

export function ContentParagraph({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()

  return (
    <Body color={theme.content.bodyText} className="leading-5">
      {children}
    </Body>
  )
}
