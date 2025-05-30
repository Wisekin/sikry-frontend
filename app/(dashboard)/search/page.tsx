"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SmartSearchBar } from "@/components/search/SmartSearchBar"
import { ResultsGrid } from "@/components/search/ResultsGrid"
import { MapView } from "@/components/search/MapView"
import { AppShell } from "@/components/core/layout/AppShell"
import { Heading } from "@/components/core/typography/Heading"
import { Text } from "@/components/core/typography/Text"
import { Filter, Download, Grid, Map, List, Loader2 } from "lucide-react"

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

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const sources = searchParams.get("sources")?.split(",") || []

  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid")
  const [filters, setFilters] = useState({
    industry: "All Industries",
    location: "",
    employeeCount: "All Sizes",
    confidenceScore: 0,
  })

  // Mock data
  const mockCompanies: Company[] = [
    {
      id: "1",
      name: "TechFlow Solutions",
      domain: "techflow.ch",
      location: "Geneva, Switzerland",
      industry: "Software Development",
      employees: "25-50",
      description: "Leading digital transformation consultancy specializing in React and TypeScript solutions.",
      confidenceScore: 95,
      extractedData: {
        emails: ["contact@techflow.ch", "hello@techflow.ch"],
        phones: ["+41 22 123 4567"],
        technologies: ["React", "TypeScript", "AWS", "Node.js"],
      },
      lastScraped: "2024-01-15T10:30:00Z",
    },
    {
      id: "2",
      name: "Alpine Marketing Group",
      domain: "alpinemarketing.com",
      location: "Zurich, Switzerland",
      industry: "Marketing & Advertising",
      employees: "10-25",
      description: "Full-service marketing agency helping B2B companies scale their digital presence.",
      confidenceScore: 88,
      extractedData: {
        emails: ["info@alpinemarketing.com"],
        phones: ["+41 44 987 6543"],
        technologies: ["HubSpot", "Google Analytics", "WordPress"],
      },
      lastScraped: "2024-01-15T09:15:00Z",
    },
    {
      id: "3",
      name: "SwissFintech Innovations",
      domain: "swissfintech.io",
      location: "Basel, Switzerland",
      industry: "Financial Technology",
      employees: "50-100",
      description: "Pioneering blockchain and AI solutions for the financial services industry.",
      confidenceScore: 92,
      extractedData: {
        emails: ["contact@swissfintech.io", "partnerships@swissfintech.io"],
        phones: ["+41 61 555 0123"],
        technologies: ["Blockchain", "AI/ML", "Python", "Kubernetes"],
      },
      lastScraped: "2024-01-15T11:45:00Z",
    },
  ]

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setCompanies(mockCompanies)
      setLoading(false)
    }, 1500)
  }, [query, sources])

  const filteredCompanies = companies.filter((company) => {
    if (filters.industry !== "All Industries" && company.industry !== filters.industry) return false
    if (filters.location && !company.location.toLowerCase().includes(filters.location.toLowerCase())) return false
    if (filters.employeeCount !== "All Sizes" && company.employees !== filters.employeeCount) return false
    if (filters.confidenceScore && company.confidenceScore < filters.confidenceScore) return false
    return true
  })

  const handleExport = () => {
    const csvContent = [
      ["Name", "Domain", "Location", "Industry", "Employees", "Confidence Score"],
      ...filteredCompanies.map((company) => [
        company.name,
        company.domain,
        company.location,
        company.industry,
        company.employees,
        company.confidenceScore.toString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `search-results-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Search Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Heading level={1}>Company Search</Heading>
            <Text className="text-secondary">
              {loading ? "Searching..." : `Found ${filteredCompanies.length} companies for "${query}"`}
            </Text>
          </div>
          <Button variant="outline" onClick={handleExport} className="w-full sm:w-auto">
            <Download className="w-4 h-4 mr-2" />
            Export Results
          </Button>
        </div>

        {/* Search Bar */}
        <SmartSearchBar placeholder="Refine your search..." showSuggestions={true} />

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar - Fixed width */}
          <div className="w-full lg:w-80 space-y-6">
            <Card className="p-4 shadow-card filter-card">
              <Heading level={3} className="mb-4 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </Heading>
              <div className="space-y-4">
                <div className="w-full">
                  <label className="text-caption font-medium mb-2 block">Industry</label>
                  <Select
                    value={filters.industry}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, industry: value }))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All Industries" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Industries">All Industries</SelectItem>
                      <SelectItem value="Software Development">Software Development</SelectItem>
                      <SelectItem value="Marketing & Advertising">Marketing & Advertising</SelectItem>
                      <SelectItem value="Financial Technology">Financial Technology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-full">
                  <label className="text-caption font-medium mb-2 block">Location</label>
                  <Input
                    placeholder="Enter location..."
                    value={filters.location}
                    onChange={(e) => setFilters((prev) => ({ ...prev, location: e.target.value }))}
                    className="w-full"
                  />
                </div>

                <div className="w-full">
                  <label className="text-caption font-medium mb-2 block">Company Size</label>
                  <Select
                    value={filters.employeeCount}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, employeeCount: value }))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All Sizes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Sizes">All Sizes</SelectItem>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="10-25">10-25 employees</SelectItem>
                      <SelectItem value="25-50">25-50 employees</SelectItem>
                      <SelectItem value="50-100">50-100 employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-full">
                  <label className="text-caption font-medium mb-2 block">Min. Confidence Score</label>
                  <Select
                    value={filters.confidenceScore.toString()}
                    onValueChange={(value) =>
                      setFilters((prev) => ({ ...prev, confidenceScore: Number.parseInt(value) }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Any Score" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Any Score</SelectItem>
                      <SelectItem value="70">70%+</SelectItem>
                      <SelectItem value="80">80%+</SelectItem>
                      <SelectItem value="90">90%+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </div>

          {/* Results */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "grid" | "list" | "map")}>
                <TabsList>
                  <TabsTrigger value="grid">
                    <Grid className="w-4 h-4" />
                  </TabsTrigger>
                  <TabsTrigger value="list">
                    <List className="w-4 h-4" />
                  </TabsTrigger>
                  <TabsTrigger value="map">
                    <Map className="w-4 h-4" />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
                <span className="ml-2 text-lg">Searching across multiple sources...</span>
              </div>
            ) : (
              <Tabs value={viewMode} className="w-full">
                <TabsContent value="grid">
                  <ResultsGrid companies={filteredCompanies} />
                </TabsContent>

                <TabsContent value="list">
                  <ResultsGrid companies={filteredCompanies} layout="list" />
                </TabsContent>

                <TabsContent value="map">
                  <MapView companies={filteredCompanies} />
                </TabsContent>
              </Tabs>
            )}

            {!loading && filteredCompanies.length === 0 && (
              <div className="text-center py-12">
                <Heading level={3} className="mb-2">
                  No companies found
                </Heading>
                <Text className="text-secondary mb-4">Try adjusting your search query or filters.</Text>
                <Button variant="outline">Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  )

}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  )
}
