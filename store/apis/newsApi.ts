import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface NewsArticle {
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

interface NewsResponse {
  status: string
  totalResults: number
  articles: NewsArticle[]
}

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getNews: builder.query<NewsResponse, string>({
      query: (category) => `news?category=${encodeURIComponent(category)}`,
    }),
  }),
})

export const { useGetNewsQuery } = newsApi