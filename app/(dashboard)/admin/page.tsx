"use client"

import { AppShell } from "@/components/core/layout/AppShell"
import { Heading } from "@/components/core/typography/Heading"
import { Text } from "@/components/core/typography/Text"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, CreditCard, Shield, FileText, Settings, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function AdminPage() {
  const adminSections = [
    {
      title: "Team Management",
      description: "Manage users, roles, and permissions",
      icon: Users,
      href: "/admin/team",
      status: "Active",
      count: "12 users",
    },
    {
      title: "Billing & Usage",
      description: "Monitor usage and manage billing",
      icon: CreditCard,
      href: "/admin/billing",
      status: "Current",
      count: "$2,450/mo",
    },
    {
      title: "Anti-Spam Settings",
      description: "Configure spam protection and compliance",
      icon: Shield,
      href: "/admin/anti-spam",
      status: "Protected",
      count: "0.02% rate",
    },
    {
      title: "Compliance",
      description: "GDPR, data retention, and privacy settings",
      icon: FileText,
      href: "/admin/compliance",
      status: "Compliant",
      count: "All regions",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
      case "Current":
      case "Protected":
      case "Compliant":
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      case "Warning":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "Error":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-muted text-secondary"
    }
  }

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <Heading level={1}>Administration</Heading>
          <Text className="text-secondary">Manage system settings, users, and compliance</Text>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-caption text-secondary">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-h2 font-semibold">12</div>
              <Text size="sm" className="text-emerald-600">
                +2 this month
              </Text>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-caption text-secondary">Monthly Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-h2 font-semibold">$2,450</div>
              <Text size="sm" className="text-secondary">
                Within budget
              </Text>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-caption text-secondary">Compliance Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-h2 font-semibold text-emerald-600">100%</div>
              <Text size="sm" className="text-emerald-600">
                Fully compliant
              </Text>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-caption text-secondary">System Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-h2 font-semibold text-emerald-600">99.9%</div>
              <Text size="sm" className="text-emerald-600">
                Uptime
              </Text>
            </CardContent>
          </Card>
        </div>

        {/* Admin Sections */}
        <div className="grid md:grid-cols-2 gap-6">
          {adminSections.map((section, index) => (
            <Card key={index} className="shadow-card hover:shadow-floating transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                      <section.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                      <CardDescription>{section.description}</CardDescription>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-secondary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getStatusColor(section.status)}>
                      {section.status}
                    </Badge>
                    <Text size="sm" className="text-secondary">
                      {section.count}
                    </Text>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={section.href}>
                      <Settings className="w-3 h-3 mr-1" />
                      Manage
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* System Status */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Real-time system health and performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-h2 font-semibold text-emerald-600">Operational</div>
                <Text size="sm" className="text-secondary">
                  All systems running
                </Text>
              </div>
              <div className="text-center">
                <div className="text-h2 font-semibold text-accent">156ms</div>
                <Text size="sm" className="text-secondary">
                  Avg response time
                </Text>
              </div>
              <div className="text-center">
                <div className="text-h2 font-semibold text-primary">99.9%</div>
                <Text size="sm" className="text-secondary">
                  Uptime (30 days)
                </Text>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
