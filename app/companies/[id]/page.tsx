"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ConfidenceMeter } from "@/components/confidence-meter"
import { DataFieldPill } from "@/components/data-field-pill"
import { CommsChannelSelector } from "@/components/comms-channel-selector"
import { EngagementTimeline } from "@/components/engagement-timeline"
import {
  Building2,
  Globe,
  MapPin,
  Users,
  Calendar,
  ExternalLink,
  Settings,
  TrendingUp,
  Shield,
  Loader2,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

interface CompanyData {
  id: string
  name: string
  domain: string
  location: string
  industry: string
  employees: string
  description: string
  logo?: string
  founded?: string
  website: string
  extractedData: {
    emails: Array<{ value: string; confidence: number; source: string }>
    phones: Array<{ value: string; confidence: number; source: string }>
    technologies: Array<{ value: string; confidence: number; category: string }>
    addresses: Array<{ value: string; confidence: number; type: string }>
    socialMedia: Array<{ platform: string; url: string; confidence: number }>
  }
  confidenceScore: number
  lastScraped: string
  scrapingHistory: Array<{ date: string; fieldsFound: number; confidence: number }>
}

export default function CompanyDetailPage() {
  const params = useParams()
  const companyId = params.id as string
  const [company, setCompany] = useState<CompanyData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for demonstration
  const mockCompany: CompanyData = {
    id: companyId,
    name: "TechFlow Solutions",
    domain: "techflow.ch",
    location: "Geneva, Switzerland",
    industry: "Software Development",
    employees: "25-50",
    description:
      "Leading digital transformation consultancy specializing in React and TypeScript solutions. We help businesses modernize their technology stack and build scalable web applications.",
    founded: "2018",
    website: "https://techflow.ch",
    extractedData: {
      emails: [
        { value: "contact@techflow.ch", confidence: 95, source: "Website Contact Page" },
        { value: "hello@techflow.ch", confidence: 88, source: "LinkedIn About Section" },
        { value: "careers@techflow.ch", confidence: 82, source: "Jobs Page" },
      ],
      phones: [
        { value: "+41 22 123 4567", confidence: 92, source: "Website Footer" },
        { value: "+41 22 123 4568", confidence: 78, source: "Google Business Listing" },
      ],
      technologies: [
        { value: "React", confidence: 98, category: "Frontend Framework" },
        { value: "TypeScript", confidence: 96, category: "Programming Language" },
        { value: "Node.js", confidence: 94, category: "Backend Runtime" },
        { value: "AWS", confidence: 89, category: "Cloud Platform" },
        { value: "Docker", confidence: 85, category: "DevOps" },
        { value: "PostgreSQL", confidence: 83, category: "Database" },
      ],
      addresses: [
        { value: "Rue du Rhône 123, 1204 Geneva, Switzerland", confidence: 94, type: "Headquarters" },
        { value: "Bahnhofstrasse 45, 8001 Zurich, Switzerland", confidence: 76, type: "Branch Office" },
      ],
      socialMedia: [
        { platform: "LinkedIn", url: "https://linkedin.com/company/techflow-solutions", confidence: 98 },
        { platform: "Twitter", url: "https://twitter.com/techflowch", confidence: 85 },
        { platform: "GitHub", url: "https://github.com/techflow-solutions", confidence: 92 },
      ],
    },
    confidenceScore: 95,
    lastScraped: "2024-01-15T10:30:00Z",
    scrapingHistory: [
      { date: "2024-01-15", fieldsFound: 18, confidence: 95 },
      { date: "2024-01-10", fieldsFound: 16, confidence: 92 },
      { date: "2024-01-05", fieldsFound: 14, confidence: 88 },
      { date: "2024-01-01", fieldsFound: 12, confidence: 85 },
    ],
  }

  useEffect(() => {
    // Simulate API call
    setLoading(true)
    setTimeout(() => {
      setCompany(mockCompany)
      setLoading(false)
    }, 1000)
  }, [companyId])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-green-700 mx-auto mb-4" />
          <p className="text-muted-foreground">Loading company details...</p>
        </div>
      </div>
    )
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Company Not Found</h2>
          <p className="text-muted-foreground mb-4">The company you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/search">Back to Search</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/search/results">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Results
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-700 to-green-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-800 to-green-700 bg-clip-text text-transparent">
                S-I-K-R-Y
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Company Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-700 to-green-600 rounded-xl flex items-center justify-center">
                  {company.logo ? (
                    <img src={company.logo || "/placeholder.svg"} alt={company.name} className="w-12 h-12 rounded-lg" />
                  ) : (
                    <Building2 className="w-8 h-8 text-white" />
                  )}
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{company.name}</h1>
                  <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Globe className="w-4 h-4" />
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-indigo-600"
                      >
                        {company.domain}
                      </a>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{company.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{company.employees} employees</span>
                    </div>
                    {company.founded && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Founded {company.founded}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ConfidenceMeter score={company.confidenceScore} size="lg" showProgress />
                <Button>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit Website
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <Badge variant="secondary">{company.industry}</Badge>
              <Badge variant="outline">Last updated: {new Date(company.lastScraped).toLocaleDateString()}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{company.description}</p>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Extracted Data */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Extracted Data
                  </CardTitle>
                  <CardDescription>Automatically detected information with confidence scores</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Emails */}
                  <div>
                    <h4 className="font-medium mb-3">Email Addresses</h4>
                    <div className="space-y-2">
                      {company.extractedData.emails.map((email, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800 rounded-lg"
                        >
                          <DataFieldPill type="email" value={email.value} confidence={email.confidence} />
                          <span className="text-xs text-muted-foreground">{email.source}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Phones */}
                  <div>
                    <h4 className="font-medium mb-3">Phone Numbers</h4>
                    <div className="space-y-2">
                      {company.extractedData.phones.map((phone, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800 rounded-lg"
                        >
                          <DataFieldPill type="phone" value={phone.value} confidence={phone.confidence} />
                          <span className="text-xs text-muted-foreground">{phone.source}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Technologies */}
                  <div>
                    <h4 className="font-medium mb-3">Technologies</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {company.extractedData.technologies.map((tech, index) => (
                        <div key={index} className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                          <DataFieldPill type="technology" value={tech.value} confidence={tech.confidence} />
                          <p className="text-xs text-muted-foreground mt-1">{tech.category}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Company Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Data Quality Metrics
                  </CardTitle>
                  <CardDescription>Historical data extraction performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Overall Confidence</span>
                        <span className="font-medium">{company.confidenceScore}%</span>
                      </div>
                      <Progress value={company.confidenceScore} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Data Completeness</span>
                        <span className="font-medium">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Source Reliability</span>
                        <span className="font-medium">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-3">Scraping History</h4>
                    <div className="space-y-2">
                      {company.scrapingHistory.map((entry, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span>{new Date(entry.date).toLocaleDateString()}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">{entry.fieldsFound} fields</span>
                            <Badge variant="outline" className="text-xs">
                              {entry.confidence}%
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <EngagementTimeline companyId={company.id} />
              </div>
              <div>
                <CommsChannelSelector companyId={company.id} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI-Generated Insights</CardTitle>
                <CardDescription>Intelligent analysis of company data and market position</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">AI Insights Coming Soon</h3>
                  <p className="text-muted-foreground">
                    Advanced market intelligence and competitive analysis will be available in the next update.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="configuration" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Scraping Configuration
                </CardTitle>
                <CardDescription>Customize data extraction settings and field detection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">Auto-Detection Settings</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Email Detection</span>
                        <Badge variant="secondary">Enabled</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Phone Detection</span>
                        <Badge variant="secondary">Enabled</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Technology Stack Detection</span>
                        <Badge variant="secondary">Enabled</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Social Media Detection</span>
                        <Badge variant="outline">Disabled</Badge>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-3">Confidence Thresholds</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Minimum Confidence Score</span>
                          <span>70%</span>
                        </div>
                        <Progress value={70} className="h-2" />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button>Save Configuration</Button>
                    <Button variant="outline">Reset to Defaults</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
