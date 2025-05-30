"use client"

import type { ReactNode } from "react"
import { SidebarNav } from "@/components/core/navigation/SidebarNav"
import { Breadcrumbs } from "@/components/core/navigation/Breadcrumbs"

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <SidebarNav />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <Breadcrumbs />
          </div>
          {children}
        </main>
      </div>
    </div>
  )
}
