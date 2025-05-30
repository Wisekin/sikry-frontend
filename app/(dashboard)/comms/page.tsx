"use client"

import { useState } from "react"
import { AppShell } from "@/components/core/layout/AppShell"
import { Heading } from "@/components/core/typography/Heading"
import { Text } from "@/components/core/typography/Text"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChannelSelector } from "@/components/comms/ChannelSelector"
import { TemplateBuilder } from "@/components/comms/TemplateBuilder"
import { CampaignTracker } from "@/components/comms/CampaignTracker"
import { SpamShieldBadge } from "@/components/comms/SpamShieldBadge"
import { ComplianceBadge } from "@/components/comms/ComplianceBadge"
import { Plus, Send, BarChart3, Settings } from "lucide-react"

export default function CommsPage() {
  const [activeTab, setActiveTab] = useState("campaigns")

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Heading level={1}>Communications</Heading>
            <Text className="text-secondary">Manage your outreach campaigns and templates</Text>
          </div>
          <div className="flex gap-2">
            <SpamShieldBadge />
            <ComplianceBadge />
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Campaign
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-caption text-secondary">Messages Sent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-h2 font-semibold">12,847</div>
              <Text size="sm" className="text-emerald-600">
                +23% this month
              </Text>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-caption text-secondary">Open Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-h2 font-semibold">68.5%</div>
              <Text size="sm" className="text-emerald-600">
                +5.2% vs avg
              </Text>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-caption text-secondary">Response Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-h2 font-semibold">24.3%</div>
              <Text size="sm" className="text-emerald-600">
                Above industry avg
              </Text>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-caption text-secondary">Spam Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-h2 font-semibold text-emerald-600">0.02%</div>
              <Text size="sm" className="text-secondary">
                Well below 0.1% limit
              </Text>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="campaigns">
              <BarChart3 className="w-4 h-4 mr-2" />
              Campaigns
            </TabsTrigger>
            <TabsTrigger value="templates">
              <Settings className="w-4 h-4 mr-2" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="bulk-sender">
              <Send className="w-4 h-4 mr-2" />
              Bulk Sender
            </TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="space-y-6">
            <CampaignTracker />
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <TemplateBuilder />
          </TabsContent>

          <TabsContent value="bulk-sender" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Bulk Message Sender</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChannelSelector />
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Delivery Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Text size="sm">Rate Limiting</Text>
                      <Text size="sm" className="text-accent">
                        50/hour
                      </Text>
                    </div>
                    <div className="flex items-center justify-between">
                      <Text size="sm">Personalization</Text>
                      <Text size="sm" className="text-emerald-600">
                        Enabled
                      </Text>
                    </div>
                    <div className="flex items-center justify-between">
                      <Text size="sm">A/B Testing</Text>
                      <Text size="sm" className="text-secondary">
                        Disabled
                      </Text>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  )
}
