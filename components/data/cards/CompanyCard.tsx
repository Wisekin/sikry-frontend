import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ConfidenceBadge } from "@/components/company/ConfidenceBadge"
import { DataFieldPill } from "@/components/company/DataFieldPill"
import { Building2, MapPin, Users, Globe, ExternalLink, MessageSquare, Download } from "lucide-react"
import Link from "next/link"
import { Text } from "@/components/core/typography/Text"

interface Company {
  id: string
  name: string
  domain: string
  location: string
  industry: string
  employees: string
  description: string
  logo?: string
  confidenceScore: number
  extractedData: {
    emails: string[]
    phones: string[]
    technologies: string[]
  }
  lastScraped: string
}

interface CompanyCardProps {
  company: Company
  layout?: "grid" | "list"
}

export function CompanyCard({ company, layout = "grid" }: CompanyCardProps) {
  const isListLayout = layout === "list"

  return (
    <Card className={`shadow-card hover:shadow-floating transition-all duration-200 ${isListLayout ? "flex" : ""}`}>
      <CardHeader className={`${isListLayout ? "flex-1" : ""}`}>
        <div className={`flex ${isListLayout ? "items-center gap-4" : "items-start justify-between"}`}>
          <div className={`flex items-center gap-3 ${isListLayout ? "flex-1" : ""}`}>
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              {company.logo ? (
                <img src={company.logo || "/placeholder.svg"} alt={company.name} className="w-8 h-8 rounded" />
              ) : (
                <Building2 className="w-6 h-6 text-white" />
              )}
            </div>
            <div className={isListLayout ? "flex-1" : ""}>
              <h3 className="font-semibold text-lg text-foreground">{company.name}</h3>
              <div className="flex items-center gap-2 text-caption text-secondary">
                <Globe className="w-3 h-3" />
                <span>{company.domain}</span>
              </div>
            </div>
          </div>

          {!isListLayout && <ConfidenceBadge score={company.confidenceScore} size="sm" />}
        </div>

        {!isListLayout && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-caption text-secondary">
              <MapPin className="w-3 h-3" />
              <span>{company.location}</span>
            </div>
            <div className="flex items-center gap-2 text-caption text-secondary">
              <Users className="w-3 h-3" />
              <span>{company.employees} employees</span>
            </div>
            <Badge variant="secondary" className="bg-muted text-secondary">
              {company.industry}
            </Badge>
          </div>
        )}
      </CardHeader>

      <CardContent className={`${isListLayout ? "flex-1" : ""}`}>
        {isListLayout ? (
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 text-caption text-secondary mb-2">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{company.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>{company.employees}</span>
                </div>
                <Badge variant="secondary" className="text-xs bg-muted text-secondary">
                  {company.industry}
                </Badge>
              </div>
              <Text size="sm" className="text-secondary line-clamp-2">
                {company.description}
              </Text>
            </div>
            <div className="flex items-center gap-4">
              <ConfidenceBadge score={company.confidenceScore} size="sm" />
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Download className="w-3 h-3 mr-1" />
                  Scrape
                </Button>
                <Button size="sm" variant="outline">
                  <MessageSquare className="w-3 h-3 mr-1" />
                  Contact
                </Button>
                <Button size="sm" asChild>
                  <Link href={`/companies/${company.id}`}>
                    View Details
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <Text size="sm" className="text-secondary mb-4 line-clamp-3">
              {company.description}
            </Text>

            <div className="space-y-3">
              <div className="space-y-2">
                <h4 className="text-caption font-medium">Extracted Data</h4>
                <div className="flex flex-wrap gap-1">
                  {company.extractedData.emails.map((email, index) => (
                    <DataFieldPill key={index} type="email" value={email} />
                  ))}
                  {company.extractedData.phones.map((phone, index) => (
                    <DataFieldPill key={index} type="phone" value={phone} />
                  ))}
                  {company.extractedData.technologies.slice(0, 3).map((tech, index) => (
                    <DataFieldPill key={index} type="technology" value={tech} />
                  ))}
                  {company.extractedData.technologies.length > 3 && (
                    <Badge variant="outline" className="text-xs border-secondary/20">
                      +{company.extractedData.technologies.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <Text size="sm" className="text-secondary">
                  Last updated: {new Date(company.lastScraped).toLocaleDateString()}
                </Text>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Download className="w-3 h-3 mr-1" />
                    Scrape
                  </Button>
                  <Button size="sm" variant="outline">
                    <MessageSquare className="w-3 h-3 mr-1" />
                    Contact
                  </Button>
                  <Button size="sm" asChild>
                    <Link href={`/companies/${company.id}`}>
                      View Details
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
