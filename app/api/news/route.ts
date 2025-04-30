import { NextResponse } from "next/server"

interface NewsAPIResponse {
  status: string
  totalResults: number
  articles: Array<{
    source: {
      id: string | null
      name: string
    }
    author: string
    title: string
    description: string
    url: string
    urlToImage: string
    publishedAt: string
    content: string
  }>
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const query = searchParams.get("q")

  if (!category && !query) {
    return NextResponse.json({ error: "Category or query parameter is required" }, { status: 400 })
  }

  try {
    //API key 
    const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: "News API key is missing", message: "Please check your environment variables" },
        { status: 500 },
      )
    }

    let apiUrl: string

    if (category) {
      apiUrl = `https://newsapi.org/v2/top-headlines?category=${encodeURIComponent(category)}&language=en&apiKey=${apiKey}`
    } else {
      apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query!)}&language=en&sortBy=publishedAt&apiKey=${apiKey}`
    }

    const response = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "analytics-dashboard/1.0",
      },
      cache: "no-cache",
    })

    console.log(`News API response status: ${response.status}`)

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`News API error: ${response.status} - ${errorText}`)

      return NextResponse.json(
        {
          error: "Failed to fetch news data",
          message: `News API returned status ${response.status}`,
          details: errorText,
        },
        { status: response.status },
      )
    }

    const data: NewsAPIResponse = await response.json()

    if (data.status === "error") {
      return NextResponse.json({ error: "News API returned an error", message: data.status }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in news API route:", error)

    return NextResponse.json(
      {
        error: "Failed to fetch news data",
        message: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
