"use client"

import { useState } from "react"
import { AppShell } from "@/components/core/layout/AppShell"
import { Heading } from "@/components/core/typography/Heading"
import { Text } from "@/components/core/typography/Text"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/data/tables/DataTable"
import { Plus, Search, Filter, Download } from "lucide-react"

export default function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const companies = [
    {
      id: "1",
      name: "TechFlow Solutions",
      domain: "techflow.ch",
      industry: "Software Development",
      employees: "25-50",
      location: "Geneva, Switzerland",
      confidence: 95,
      lastScraped: "2024-01-15",
      status: "Active",
    },
    {
      id: "2",
      name: "Alpine Marketing Group",
      domain: "alpinemarketing.com",
      industry: "Marketing & Advertising",
      employees: "10-25",
      location: "Zurich, Switzerland",
      confidence: 88,
      lastScraped: "2024-01-14",
      status: "Active",
    },
    {
      id: "3",
      name: "SwissFintech Innovations",
      domain: "swissfintech.io",
      industry: "Financial Technology",
      employees: "50-100",
      location: "Basel, Switzerland",
      confidence: 92,
      lastScraped: "2024-01-13",
      status: "Pending",
    },
  ]

  const columns = [
    {
      header: "Company",
      accessorKey: "name",
      cell: ({ row }: any) => (
        <div>
          <div className="font-medium">{row.original.name}</div>
          <div className="text-caption text-muted-foreground">{row.original.domain}</div>
        </div>
      ),
    },
    {
      header: "Industry",
      accessorKey: "industry",
    },
    {
      header: "Location",
      accessorKey: "location",
    },
    {
      header: "Employees",
      accessorKey: "employees",
    },
    {
      header: "Confidence",
      accessorKey: "confidence",
      cell: ({ row }: any) => (
        <Badge
          variant="outline"
          className={
            row.original.confidence >= 90
              ? "text-[var(--color-functional-success)] bg-[var(--color-functional-success)]/10 border-[var(--color-functional-success)]/20"
              : row.original.confidence >= 70
                ? "text-[var(--color-functional-warning)] bg-[var(--color-functional-warning)]/10 border-[var(--color-functional-warning)]/20"
                : "text-destructive bg-destructive/10 border-destructive/20"
          }
        >
          {row.original.confidence}%
        </Badge>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }: any) => (
        <Badge variant={row.original.status === "Active" ? "default" : "secondary"}>{row.original.status}</Badge>
      ),
    },
    {
      header: "Last Scraped",
      accessorKey: "lastScraped",
    },
  ]

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Heading level={1}>Companies</Heading>
            <Text className="text-secondary">Manage and track your discovered companies</Text>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Company
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-caption text-muted-foreground">Total Companies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-h2 font-semibold">1,247</div>
              <Text size="sm" className="text-[var(--color-functional-success)]">
                +12% this month
              </Text>
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-caption text-muted-foreground">High Confidence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-h2 font-semibold">892</div>
              <Text size="sm" className="text-[var(--color-functional-success)]">
                90%+ accuracy
              </Text>
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-caption text-muted-foreground">Recently Scraped</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-h2 font-semibold">156</div>
              <Text size="sm" className="text-muted-foreground">
                Last 24 hours
              </Text>
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-caption text-muted-foreground">Contacted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-h2 font-semibold">423</div>
              <Text size="sm" className="text-accent">
                68% response rate
              </Text>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Data Table */}
        <Card className="shadow-md">
          <DataTable data={companies} columns={columns} />
        </Card>
      </div>
    </AppShell>
  )
}
