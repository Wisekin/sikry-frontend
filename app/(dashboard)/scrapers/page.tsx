"use client"

import { useState } from "react"
import { AppShell } from "@/components/core/layout/AppShell"
import { Heading } from "@/components/core/typography/Heading"
import { Text } from "@/components/core/typography/Text"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FieldDetector } from "@/components/scraping/FieldDetector"
import { ScrapePreview } from "@/components/scraping/ScrapePreview"
import { V2ScraperEditor } from "@/components/scraping/V2ScraperEditor"
import { Plus, Zap, Play, Pause, Settings } from "lucide-react"

export default function ScrapersPage() {
  const [activeTab, setActiveTab] = useState("active")

  const scrapers = [
    {
      id: "1",
      name: "Company Contact Scraper",
      status: "active",
      lastRun: "2024-01-15T10:30:00Z",
      success: 95,
      fieldsDetected: 12,
      version: "v2",
    },
    {
      id: "2",
      name: "Technology Stack Detector",
      status: "paused",
      lastRun: "2024-01-14T15:20:00Z",
      success: 88,
      fieldsDetected: 8,
      version: "v2",
    },
    {
      id: "3",
      name: "Social Media Finder",
      status: "active",
      lastRun: "2024-01-15T09:45:00Z",
      success: 92,
      fieldsDetected: 6,
      version: "legacy",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      case "paused":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "error":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-muted text-secondary"
    }
  }

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Heading level={1}>Scrapers</Heading>
            <Text className="text-secondary">Manage and configure your data extraction scrapers</Text>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Scraper
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-caption text-secondary">Active Scrapers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-h2 font-semibold">12</div>
              <Text size="sm" className="text-emerald-600">
                Running smoothly
              </Text>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-caption text-secondary">Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-h2 font-semibold">94.2%</div>
              <Text size="sm" className="text-emerald-600">
                Above target
              </Text>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-caption text-secondary">Fields Detected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-h2 font-semibold">1,847</div>
              <Text size="sm" className="text-secondary">
                Last 24 hours
              </Text>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-caption text-secondary">V2 Scrapers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-h2 font-semibold">8</div>
              <Text size="sm" className="text-accent">
                AI-powered
              </Text>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="active">Active Scrapers</TabsTrigger>
            <TabsTrigger value="editor">V2 Editor</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="detector">Field Detector</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {scrapers.map((scraper) => (
              <Card key={scraper.id} className="shadow-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{scraper.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className={getStatusColor(scraper.status)}>
                          {scraper.status.charAt(0).toUpperCase() + scraper.status.slice(1)}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={scraper.version === "v2" ? "bg-accent/10 text-accent border-accent/20" : ""}
                        >
                          {scraper.version === "v2" ? (
                            <>
                              <Zap className="w-3 h-3 mr-1" />
                              V2 AI
                            </>
                          ) : (
                            "Legacy"
                          )}
                        </Badge>
                        <Text size="sm" className="text-secondary">
                          Last run: {new Date(scraper.lastRun).toLocaleString()}
                        </Text>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Settings className="w-3 h-3 mr-1" />
                        Configure
                      </Button>
                      {scraper.status === "active" ? (
                        <Button variant="outline" size="sm">
                          <Pause className="w-3 h-3 mr-1" />
                          Pause
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm">
                          <Play className="w-3 h-3 mr-1" />
                          Start
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-h3 font-semibold text-emerald-600">{scraper.success}%</div>
                      <Text size="sm" className="text-secondary">
                        Success Rate
                      </Text>
                    </div>
                    <div className="text-center">
                      <div className="text-h3 font-semibold text-accent">{scraper.fieldsDetected}</div>
                      <Text size="sm" className="text-secondary">
                        Fields Detected
                      </Text>
                    </div>
                    <div className="text-center">
                      <div className="text-h3 font-semibold text-primary">24/7</div>
                      <Text size="sm" className="text-secondary">
                        Monitoring
                      </Text>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="editor">
            <V2ScraperEditor />
          </TabsContent>

          <TabsContent value="preview">
            <ScrapePreview />
          </TabsContent>

          <TabsContent value="detector">
            <FieldDetector />
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  )
}
