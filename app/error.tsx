"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"
import { Heading } from "@/components/core/typography/Heading"
import { Text } from "@/components/core/typography/Text"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-floating">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-destructive rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <CardTitle>
            <Heading level={2}>Something went wrong</Heading>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <Text className="text-secondary">
            An unexpected error occurred. Please try again or contact support if the problem persists.
          </Text>
          {error.digest && (
            <Text size="sm" className="text-secondary font-mono bg-muted p-2 rounded">
              Error ID: {error.digest}
            </Text>
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={reset}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
