export interface NewsArticle {
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
}

export interface NewsResponse {
  status: string
  totalResults: number
  articles: NewsArticle[]
}

export async function fetchNewsData(query: string, isCategory = true): Promise<NewsResponse> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY

    if (!apiKey) {
      console.error("News API key is missing. Please check your environment variables.")
      return FALLBACK_NEWS
    }

    console.log(`Fetching news for ${isCategory ? "category" : "query"}: ${query}`)

    // We'll use a server-side API route to proxy the request
    const endpoint = isCategory
      ? `/api/news?category=${encodeURIComponent(query)}`
      : `/api/news?q=${encodeURIComponent(query)}`

    const response = await fetch(endpoint)

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`News API error: ${response.status} - ${errorText}`)

      console.log("Using fallback news data due to API error")
      return FALLBACK_NEWS
    }

    const data = await response.json()

    if (data.error) {
      console.error(`API route error: ${data.error} - ${data.message}`)
      return FALLBACK_NEWS
    }

    const articles =
      data.articles?.map((article: any) => ({
        source: {
          id: article.source?.id || null,
          name: article.source?.name || "Unknown Source",
        },
        author: article.author || "Unknown Author",
        title: article.title || "No Title",
        description: article.description || "No description available",
        url: article.url || "#",
        urlToImage: article.urlToImage || "/breaking-news-desk.png",
        publishedAt: article.publishedAt || new Date().toISOString(),
        content: article.content || "No content available",
      })) || FALLBACK_NEWS.articles

    return {
      status: data.status || "ok",
      totalResults: data.totalResults || articles.length,
      articles,
    }
  } catch (error) {
    console.error("Error fetching news data:", error)
    return FALLBACK_NEWS
  }
}

const FALLBACK_NEWS: NewsResponse = {
  status: "ok",
  totalResults: 5,
  articles: [
    {
      source: { id: "fallback", name: "Tech Daily" },
      author: "Tech Reporter",
      title: "New AI Breakthrough Promises Faster Computing",
      description: "Researchers have developed a new AI algorithm that could revolutionize computing speeds.",
      url: "#",
      urlToImage: "/interconnected-tech.png",
      publishedAt: new Date().toISOString(),
      content:
        "Researchers at a leading tech institute have developed a groundbreaking AI algorithm that promises to increase computing speeds by up to 200%. The new approach uses quantum-inspired techniques to optimize processing paths.",
    },
    {
      source: { id: "fallback", name: "Science Today" },
      author: "Science Editor",
      title: "Climate Research Shows Promising Results",
      description: "New climate models provide more accurate predictions for regional changes.",
      url: "#",
      urlToImage: "/diverse-people-health-news.png",
      publishedAt: new Date().toISOString(),
      content:
        "Climate scientists have developed more precise models that can predict regional climate changes with greater accuracy. These models incorporate new data from satellite observations and ground stations.",
    },
    {
      source: { id: "fallback", name: "Business Insider" },
      author: "Financial Analyst",
      title: "Markets React to Economic Policy Changes",
      description: "Global markets show mixed reactions to new economic policies.",
      url: "#",
      urlToImage: "/financial-headlines.png",
      publishedAt: new Date().toISOString(),
      content:
        "Stock markets around the world showed varied responses to the announcement of new economic policies. While some sectors saw gains, others experienced temporary setbacks as investors recalibrated their expectations.",
    },
    {
      source: { id: "fallback", name: "Health Journal" },
      author: "Medical Correspondent",
      title: "New Treatment Shows Promise for Chronic Conditions",
      description: "Clinical trials reveal effectiveness of new therapeutic approach.",
      url: "#",
      urlToImage: "/microscopic-defense.png",
      publishedAt: new Date().toISOString(),
      content:
        "A newly developed treatment has shown significant promise in clinical trials for managing several chronic health conditions. Researchers are optimistic about its potential to improve quality of life for millions of patients.",
    },
    {
      source: { id: "fallback", name: "Tech Trends" },
      author: "Technology Analyst",
      title: "Next Generation of Mobile Devices Announced",
      description: "Leading manufacturers reveal upcoming features for next-gen smartphones.",
      url: "#",
      urlToImage: "/modern-smartphone-showcase.png",
      publishedAt: new Date().toISOString(),
      content:
        "Major smartphone manufacturers have announced their next generation of devices, featuring improved cameras, faster processors, and longer battery life. The new models are expected to be available in stores next quarter.",
    },
  ],
}
