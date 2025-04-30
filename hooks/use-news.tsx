"use client"

import { useQuery } from "@tanstack/react-query"
import { fetchNewsData } from "@/services/news-service"

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

export function useNewsQuery(query: string, isCategory = true) {
  return useQuery<NewsResponse, Error>({
    queryKey: ["news", query, isCategory],
    queryFn: () => fetchNewsData(query, isCategory),
    staleTime: 1000 * 60 * 15, // 15 minutes
    refetchOnWindowFocus: false,
    retry: 1,
  })
}
