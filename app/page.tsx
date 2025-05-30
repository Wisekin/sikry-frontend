import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Zap, Shield, Users, TrendingUp, MessageSquare, ArrowRight } from "lucide-react"
import Link from "next/link"
import { SmartSearchBar } from "@/components/search/SmartSearchBar"
import { Heading } from "@/components/core/typography/Heading"
import { Text } from "@/components/core/typography/Text"

export default function HomePage() {
  const features = [
    {
      icon: Search,
      title: "Natural Language Search",
      description: "Find companies using conversational queries powered by AI",
      example: "Find SaaS companies in Switzerland with 50+ employees",
    },
    {
      icon: Users,
      title: "Zero-Config Data Extraction",
      description: "Automatically extract contact information and company data",
      example: "Emails, phones, technologies detected with 95% accuracy",
    },
    {
      icon: MessageSquare,
      title: "Unified Communications",
      description: "Engage prospects through email, SMS, and WhatsApp",
      example: "Multi-channel campaigns with spam protection",
    },
    {
      icon: TrendingUp,
      title: "Market Intelligence",
      description: "Analyze competitors and market trends in real-time",
      example: "Relationship mapping and competitive analysis",
    },
  ]

  const trustIndicators = ["SOC 2 Type II Certified", "GDPR Compliant", "99.9% Uptime SLA", "Enterprise Security"]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-surface/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Search className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-semibold text-primary">S-I-K-R-Y</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/features" className="text-sm font-medium text-secondary hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-secondary hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="/search" className="text-sm font-medium text-secondary hover:text-primary transition-colors">
              Search
            </Link>
            <Button size="sm" className="bg-accent hover:bg-accent/90">
              Get Started
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="text-center max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-6 bg-accent/10 text-accent border-accent/20">
            <Zap className="w-3 h-3 mr-1" />
            World's First AI-Powered Business Intelligence Platform
          </Badge>

          <Heading level={1} className="mb-6">
            Discover, Analyze, and <span className="text-accent">Engage Businesses</span> with AI
          </Heading>

          <Text size="lg" className="text-secondary mb-8 max-w-2xl mx-auto">
            Transform how you find and connect with businesses using natural language search, automated data extraction,
            and unified communication channels.
          </Text>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <SmartSearchBar
              placeholder="Find companies: 'Marketing agencies in Geneva with 10-50 employees'"
              showSuggestions={true}
            />
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {trustIndicators.map((indicator, index) => (
              <Badge key={index} variant="outline" className="flex items-center gap-1 border-secondary/20">
                <Shield className="w-3 h-3" />
                {indicator}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Heading level={2} className="mb-4">
            Powered by AI for Every Use Case
          </Heading>
          <Text className="text-secondary max-w-2xl mx-auto">
            From sales prospecting to market research, S-I-K-R-Y adapts to your business intelligence needs
          </Text>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-card hover:shadow-floating transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-h3">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg p-3">
                  <Text size="sm" className="text-secondary italic">
                    "{feature.example}"
                  </Text>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <Heading level={2} className="text-white mb-4">
            Ready to Transform Your Business Intelligence?
          </Heading>
          <Text size="lg" className="opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of companies already using S-I-K-R-Y to discover, analyze, and engage with businesses
            worldwide.
          </Text>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/search">
                Start Free Search
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
              Book Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <Search className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-semibold">S-I-K-R-Y</span>
              </div>
              <Text className="text-white/80">
                Sikso Intelligent Knowledge Retrieval Ystem - Your business intelligence ecosystem.
              </Text>
            </div>
            <div>
              <Heading level={3} className="text-white mb-4">
                Product
              </Heading>
              <ul className="space-y-2 text-white/80">
                <li>
                  <Link href="/search" className="hover:text-white transition-colors">
                    Search
                  </Link>
                </li>
                <li>
                  <Link href="/companies" className="hover:text-white transition-colors">
                    Companies
                  </Link>
                </li>
                <li>
                  <Link href="/comms" className="hover:text-white transition-colors">
                    Communications
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <Heading level={3} className="text-white mb-4">
                Company
              </Heading>
              <ul className="space-y-2 text-white/80">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <Heading level={3} className="text-white mb-4">
                Legal
              </Heading>
              <ul className="space-y-2 text-white/80">
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="hover:text-white transition-colors">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
            <Text>&copy; 2024 S-I-K-R-Y. All rights reserved.</Text>
          </div>
        </div>
      </footer>
    </div>
  )
}
