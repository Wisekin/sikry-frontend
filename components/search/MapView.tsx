import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Map } from "lucide-react"
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

interface MapViewProps {
  companies: Company[]
}

export function MapView({ companies }: MapViewProps) {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Map className="w-5 h-5" />
          Interactive Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-muted rounded-lg p-8 text-center min-h-96 flex items-center justify-center">
          <div>
            <Map className="w-16 h-16 mx-auto text-secondary mb-4" />
            <Text className="text-secondary">Interactive map visualization will be available in the next update.</Text>
            <Text size="sm" className="text-secondary mt-2">
              Showing {companies.length} companies across different locations.
            </Text>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
