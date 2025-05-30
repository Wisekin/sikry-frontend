import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import type { Company } from "@/types/company"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1", 10)
    const limit = Number.parseInt(searchParams.get("limit") || "10", 10)
    const sort = searchParams.get("sort") || "name"
    const order = searchParams.get("order") || "asc"

    const supabase = createClient()

    // Calculate pagination
    const from = (page - 1) * limit
    const to = from + limit - 1

    // Execute the query
    const { data, error, count } = await supabase
      .from("companies")
      .select("*", { count: "exact" })
      .order(sort, { ascending: order === "asc" })
      .range(from, to)

    if (error) {
      throw error
    }

    return NextResponse.json({
      data,
      success: true,
      meta: {
        total: count || 0,
        page,
        limit,
        hasMore: count ? from + data.length < count : false,
      },
    })
  } catch (error) {
    console.error("Companies API error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch companies",
        errors: [{ code: "fetch_error", message: error instanceof Error ? error.message : "Unknown error" }],
      },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const body: Partial<Company> = await request.json()
    const supabase = createClient()

    // Validate required fields
    if (!body.name || !body.domain) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
          errors: [{ code: "validation_error", message: "Name and domain are required" }],
        },
        { status: 400 },
      )
    }

    // Create the company
    const { data, error } = await supabase.from("companies").insert(body).select().single()

    if (error) {
      throw error
    }

    return NextResponse.json({
      data,
      success: true,
      message: "Company created successfully",
    })
  } catch (error) {
    console.error("Companies API error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create company",
        errors: [{ code: "create_error", message: error instanceof Error ? error.message : "Unknown error" }],
      },
      { status: 500 },
    )
  }
}
