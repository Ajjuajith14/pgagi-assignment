import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface StockDataPoint {
  date: string
  price: number
  volume: number
}

interface StockResponse {
  symbol: string
  companyName: string
  price: number
  change: number
  changePercent: number
  open: number
  high: number
  low: number
  volume: number
  historicalData: StockDataPoint[]
}

export const stocksApi = createApi({
  reducerPath: "stocksApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getStock: builder.query<StockResponse, string>({
      query: (symbol) => `stocks?symbol=${encodeURIComponent(symbol)}`,
    }),
  }),
})

export const { useGetStockQuery } = stocksApi