import { NextResponse } from "next/server"
import { fetchWeatherData } from "@/services/weather-service"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get("city")

  if (!city) {
    return NextResponse.json({ error: "City parameter is required" }, { status: 400 })
  }

  try {
    const data = await fetchWeatherData(city)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching weather data:", error)
    return NextResponse.json(
      { error: "Failed to fetch weather data", message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}