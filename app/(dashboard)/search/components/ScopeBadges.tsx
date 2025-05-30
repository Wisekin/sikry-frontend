import { Badge } from "@/components/ui/badge"
import { Globe, Linkedin, Database, Building2, MapPin, Users } from "lucide-react"

interface ScopeBadgesProps {
  selectedSources: string[]
  filters: {
    industry?: string
    location?: string
    employeeCount?: string
  }
}

export function ScopeBadges({ selectedSources, filters }: ScopeBadgesProps) {
  const sourceIcons = {
    google: Globe,
    linkedin: Linkedin,
    crunchbase: Database,
  }

  const getSourceLabel = (source: string) => {
    const labels = {
      google: "Google",
      linkedin: "LinkedIn",
      crunchbase: "Crunchbase",
    }
    return labels[source as keyof typeof labels] || source
  }

  return (
    <div className="flex flex-wrap gap-2">
      {/* Source badges */}
      {selectedSources.map((source) => {
        const Icon = sourceIcons[source as keyof typeof sourceIcons]
        return (
          <Badge key={source} variant="outline" className="flex items-center gap-1">
            {Icon && <Icon className="w-3 h-3" />}
            {getSourceLabel(source)}
          </Badge>
        )
      })}

      {/* Filter badges */}
      {filters.industry && filters.industry !== "All Industries" && (
        <Badge variant="outline" className="flex items-center gap-1">
          <Building2 className="w-3 h-3" />
          {filters.industry}
        </Badge>
      )}

      {filters.location && (
        <Badge variant="outline" className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {filters.location}
        </Badge>
      )}

      {filters.employeeCount && filters.employeeCount !== "All Sizes" && (
        <Badge variant="outline" className="flex items-center gap-1">
          <Users className="w-3 h-3" />
          {filters.employeeCount}
        </Badge>
      )}
    </div>
  )
}
