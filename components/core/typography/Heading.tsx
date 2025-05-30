import { cn } from "@/lib/utils"
import type { ReactNode, JSX } from "react"

interface HeadingProps {
  level: 1 | 2 | 3
  children: ReactNode
  className?: string
}

export function Heading({ level, children, className }: HeadingProps) {
  const baseClasses = "font-semibold tracking-tight"

  const levelClasses = {
    1: "text-h1",
    2: "text-h2",
    3: "text-h3",
  }

  const Component = `h${level}` as keyof JSX.IntrinsicElements

  return <Component className={cn(baseClasses, levelClasses[level], className)}>{children}</Component>
}
