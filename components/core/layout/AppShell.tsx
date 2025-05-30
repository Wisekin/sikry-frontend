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

  const sidebarWidth = isSidebarCollapsed ? "w-16" : "w-64"
  const mainContentMargin = isSidebarCollapsed ? "ml-16" : "ml-64"

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
