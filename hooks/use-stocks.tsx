"use client"

import { useQuery } from "@tanstack/react-query"
import { fetchStockData } from "@/services/stocks-service"

export function useStocksQuery(symbol: string) {
  return useQuery({
    queryKey: ["stocks", symbol],
    queryFn: () => fetchStockData(symbol),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  })
}