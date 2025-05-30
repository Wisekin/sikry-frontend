"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { Text } from "@/components/core/typography/Text"

export function Breadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  const breadcrumbs = [
    { name: "Home", href: "/" },
    ...segments.map((segment, index) => ({
      name: segment.charAt(0).toUpperCase() + segment.slice(1),
      href: "/" + segments.slice(0, index + 1).join("/"),
    })),
  ]

  return (
    <nav className="flex items-center space-x-2">
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.href} className="flex items-center">
          {/* Render Home icon (as a Link) or the breadcrumb name */}
          {index === 0 ? (
            <Link href={breadcrumb.href} aria-label="Home" className="flex items-center">
              <Home className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
              {/* Optionally, show "Home" text if preferred, or rely on icon + tooltip via aria-label */}
            </Link>
          ) : index === breadcrumbs.length - 1 ? (
            <Text size="sm" className="text-foreground font-semibold">
              {breadcrumb.name}
            </Text>
          ) : (
            <Link
              href={breadcrumb.href}
              className="text-sm text-primary hover:text-primary/80 hover:underline underline-offset-4 transition-colors"
            >
              {breadcrumb.name}
            </Link>
          )}
          {/* Render separator if this is not the last item */}
          {index < breadcrumbs.length - 1 && (
            <ChevronRight className="w-4 h-4 text-neutral-400 dark:text-neutral-500 mx-2" />
          )}
        </div>
      ))}
    </nav>
  )
}
