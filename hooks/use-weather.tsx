"use client"

import { useQuery } from "@tanstack/react-query"
import { fetchWeatherData } from "@/services/weather-service"

export function useWeatherQuery(city: string) {
  return useQuery({
    queryKey: ["weather", city],
    queryFn: () => fetchWeatherData(city),
    staleTime: 1000 * 60 * 30, // 30 minutes
    refetchOnWindowFocus: false,
  })
}