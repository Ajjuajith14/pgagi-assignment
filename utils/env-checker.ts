"use client"

import { useEffect, useState } from "react"

export function useEnvChecker() {
  const [envStatus, setEnvStatus] = useState<{
    weather: boolean
    news: boolean
    stocks: boolean
  }>({
    weather: false,
    news: false,
    stocks: false,
  })

  useEffect(() => {
    const weatherKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY
    const newsKey = process.env.NEXT_PUBLIC_NEWS_API_KEY
    const stocksKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY

    setEnvStatus({
      weather: !!weatherKey && weatherKey.length > 5,
      news: !!newsKey && newsKey.length > 5,
      stocks: !!stocksKey && stocksKey.length > 5,
    })
  }, [])

  return envStatus
}