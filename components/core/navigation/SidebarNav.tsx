"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Search, Building2, MessageSquare, TrendingUp, Settings, ChevronLeft, ChevronRight, Zap } from "lucide-react"

const navigation = [
  { name: "Search", href: "/search", icon: Search },
  { name: "Companies", href: "/companies", icon: Building2 },
  { name: "Communications", href: "/comms", icon: MessageSquare },
  { name: "Market Intel", href: "/market-intel", icon: TrendingUp },
  { name: "Scrapers", href: "/scrapers", icon: Zap },
  { name: "Admin", href: "/admin", icon: Settings },
]

interface SidebarNavProps {
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
}

export function SidebarNav({ isCollapsed, setIsCollapsed }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <div className={cn("bg-card border-r border-border transition-all duration-300 overflow-x-hidden", isCollapsed ? "w-20 min-w-[5rem]" : "w-72 min-w-[18rem]")}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Search className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-semibold text-primary">S-I-K-R-Y</span>
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(!isCollapsed)} className="h-8 w-8 p-0">
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>

        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-neutral-700 dark:text-neutral-300 hover:bg-muted hover:text-primary",
                  isCollapsed && "justify-center",
                )}
              >
                <item.icon className={cn("w-5 h-5", !isCollapsed && "mr-3")} />
                {!isCollapsed && item.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
