"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import { SidebarNav } from "@/components/core/navigation/SidebarNav"
import { Breadcrumbs } from "@/components/core/navigation/Breadcrumbs"
import { cn } from "@/lib/utils"

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  // SidebarNav actual widths are w-20 (5rem) and w-72 (18rem)
  // The sidebarWidth variable here seems unused for SidebarNav's width,
  // but mainContentMargin should match SidebarNav's actual widths.
  const mainContentMargin = isSidebarCollapsed ? "ml-20" : "ml-72"

  return (
    <div className="min-h-screen bg-background flex">
      <SidebarNav isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
      <main className={cn("flex-1 p-6 transition-all duration-300", mainContentMargin)}>
        <div className="mb-6">
          <Breadcrumbs />
        </div>
        {children}
      </main>
    </div>
  )
}
