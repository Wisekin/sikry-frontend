import { CompanyCard } from "@/components/data/cards/CompanyCard"

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

interface ResultsGridProps {
  companies: Company[]
  layout?: "grid" | "list"
}

export function ResultsGrid({ companies, layout = "grid" }: ResultsGridProps) {
  if (layout === "list") {
    return (
      <div className="space-y-4">
        {companies.map((company) => (
          <CompanyCard key={company.id} company={company} layout="list" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      {companies.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </div>
  )
}
