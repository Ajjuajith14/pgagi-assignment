"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Cloud, CloudRain, Sun, Wind, CloudSnow, CloudLightning, Droplets } from 'lucide-react'
import { useWeatherQuery } from "@/hooks/use-weather"
import { WeatherChart } from "@/components/charts/weather-chart"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorAlert } from "@/components/ui/error-alert"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface WeatherWidgetProps {
  defaultCity?: string
}

export function WeatherWidget({ defaultCity = "New York" }: WeatherWidgetProps) {
  const [city, setCity] = useState(defaultCity)
  const [searchCity, setSearchCity] = useState(defaultCity)
  const { data, isLoading, isError, refetch } = useWeatherQuery(city)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])

  // Simulate city suggestions
  useEffect(() => {
    if (searchCity.length > 2 && isSearchFocused) {
      const cities = [
        "New York",
        "London",
        "Tokyo",
        "Paris",
        "Berlin",
        "Sydney",
        "Toronto",
        "Singapore",
        "Dubai",
        "Mumbai",
      ]

      const filtered = cities.filter(
        (c) => c.toLowerCase().includes(searchCity.toLowerCase()) && c.toLowerCase() !== searchCity.toLowerCase(),
      )

      setSuggestions(filtered.slice(0, 5))
    } else {
      setSuggestions([])
    }
  }, [searchCity, isSearchFocused])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCity(searchCity)
    setSuggestions([])
  }

  const selectSuggestion = (suggestion: string) => {
    setSearchCity(suggestion)
    setCity(suggestion)
    setSuggestions([])
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition?.toLowerCase()) {
      case "rain":
      case "drizzle":
        return <CloudRain className="h-10 w-10 text-[hsl(var(--weather-primary))]" />
      case "clouds":
        return <Cloud className="h-10 w-10 text-[hsl(var(--weather-primary))]" />
      case "clear":
        return <Sun className="h-10 w-10 text-[hsl(var(--weather-primary))]" />
      case "snow":
        return <CloudSnow className="h-10 w-10 text-[hsl(var(--weather-primary))]" />
      case "thunderstorm":
        return <CloudLightning className="h-10 w-10 text-[hsl(var(--weather-primary))]" />
      default:
        return <Cloud className="h-10 w-10 text-[hsl(var(--weather-primary))]" />
    }
  }

  const getWeatherBackground = (condition: string) => {
    switch (condition?.toLowerCase()) {
      case "rain":
      case "drizzle":
        return "bg-gradient-to-br from-blue-500/10 to-blue-600/20"
      case "clouds":
        return "bg-gradient-to-br from-gray-300/10 to-gray-400/20"
      case "clear":
        return "bg-gradient-to-br from-yellow-400/10 to-orange-300/20"
      case "snow":
        return "bg-gradient-to-br from-blue-100/10 to-blue-200/20"
      case "thunderstorm":
        return "bg-gradient-to-br from-purple-500/10 to-purple-600/20"
      default:
        return "bg-gradient-to-br from-blue-500/10 to-blue-600/20"
    }
  }

  return (
    <Card className="shadow-lg overflow-hidden">
      <CardHeader
        className={cn(
          "pb-2",
          data?.current?.condition
            ? getWeatherBackground(data.current.condition)
            : "bg-gradient-to-br from-blue-500/10 to-blue-600/20",
        )}
      >
        <div className="flex justify-between items-center">
          <CardTitle className="text-[hsl(var(--weather-primary))]">Weather</CardTitle>
          <motion.div whileHover={{ rotate: 10 }} whileTap={{ scale: 0.95 }}>
            {data?.current?.condition && getWeatherIcon(data.current.condition)}
          </motion.div>
        </div>
        <form onSubmit={handleSearch} className="mt-2 relative">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search city..."
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className="pl-8 w-full"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              />
            </div>
            <Button type="submit" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          <AnimatePresence>
            {suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-10 w-full bg-card border rounded-md mt-1 shadow-lg"
              >
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion}
                    className="px-3 py-2 hover:bg-muted cursor-pointer"
                    onClick={() => selectSuggestion(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </CardHeader>
      <CardContent className="pt-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <LoadingSpinner />
          </div>
        ) : isError ? (
          <ErrorAlert message="Failed to load weather data. Please try again." />
        ) : data ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold">{data.location}</h3>
                <Badge variant="outline" className="mt-1">
                  {data.current.condition}
                </Badge>
              </div>
              <div className="text-4xl font-bold">{data.current.temperature}°C</div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-muted rounded-md p-2">
                <Wind className="h-4 w-4 mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Wind</p>
                <p className="font-medium">{data.current.wind} km/h</p>
              </div>
              <div className="bg-muted rounded-md p-2">
                <Droplets className="h-4 w-4 mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Humidity</p>
                <p className="font-medium">{data.current.humidity}%</p>
              </div>
              <div className="bg-muted rounded-md p-2">
                <div className="h-4 w-4 mx-auto mb-1">🌡️</div>
                <p className="text-xs text-muted-foreground">Feels Like</p>
                <p className="font-medium">{data.current.feelsLike}°C</p>
              </div>
            </div>

            <div className="h-40">
              <WeatherChart forecast={data.forecast} />
            </div>

            <div className="text-xs text-right text-muted-foreground">
              <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={() => refetch()}>
                Refresh
              </Button>
            </div>
          </motion.div>
        ) : null}
      </CardContent>
    </Card>
  )
}