import { NextResponse } from "next/server"
import type { ScraperConfig } from "@/types/scraping"

export async function POST(request: Request) {
  try {
    const body: { url: string; config: ScraperConfig } = await request.json()
    const { url, config } = body

    // Validate required fields
    if (!url || !config || !config.selectors || config.selectors.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
          errors: [{ code: "validation_error", message: "URL and valid config with selectors are required" }],
        },
        { status: 400 },
      )
    }

    // In a real implementation, this would call a scraping service
    // For now, we'll return mock data
    const mockData = generateMockScrapedData(config.selectors)

    return NextResponse.json({
      success: true,
      data: mockData,
      meta: {
        url,
        timestamp: new Date().toISOString(),
        duration: Math.floor(Math.random() * 5000) + 1000, // Random duration between 1-6 seconds
      },
    })
  } catch (error) {
    console.error("Scraper execution error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to execute scraper",
        errors: [{ code: "execution_error", message: error instanceof Error ? error.message : "Unknown error" }],
      },
      { status: 500 },
    )
  }
}

function generateMockScrapedData(selectors: any[]) {
  const results = []

  // Generate 5 mock results
  for (let i = 0; i < 5; i++) {
    const result: Record<string, any> = {}

    selectors.forEach((selector) => {
      switch (selector.type) {
        case "text":
          result[selector.name] = `Sample ${selector.name} ${i + 1}`
          break
        case "link":
          result[selector.name] = `https://example.com/${selector.name.toLowerCase()}/${i + 1}`
          break
        case "email":
          result[selector.name] = `contact${i + 1}@example.com`
          break
        case "phone":
          result[selector.name] = `+1-555-${100 + i}-${1000 + i}`
          break
        case "number":
          result[selector.name] = Math.floor(Math.random() * 1000)
          break
        case "date":
          const date = new Date()
          date.setDate(date.getDate() - i)
          result[selector.name] = date.toISOString()
          break
        default:
          result[selector.name] = `Unknown type: ${selector.type}`
      }
    })

    results.push(result)
  }

  return results
}
