import { NextResponse } from "next/server"
import { fetchStockData } from "@/services/stocks-service"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const symbol = searchParams.get("symbol")

  if (!symbol) {
    return NextResponse.json({ error: "Symbol parameter is required" }, { status: 400 })
  }

  try {
    const data = await fetchStockData(symbol)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching stock data:", error)
    return NextResponse.json(
      { error: "Failed to fetch stock data", message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}