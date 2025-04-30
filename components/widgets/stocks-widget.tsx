"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, TrendingUp, TrendingDown, RefreshCw, Clock, DollarSign, BarChart3 } from 'lucide-react'
import { useStocksQuery } from "@/hooks/use-stocks"
import { StocksChart } from "@/components/charts/stocks-chart"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorAlert } from "@/components/ui/error-alert"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface StocksWidgetProps {
  defaultSymbol?: string
}

export function StocksWidget({ defaultSymbol = "AAPL" }: StocksWidgetProps) {
  const [symbol, setSymbol] = useState(defaultSymbol)
  const [searchSymbol, setSearchSymbol] = useState(defaultSymbol)
  const { data, isLoading, isError, refetch } = useStocksQuery(symbol)
  const [timeRange, setTimeRange] = useState("1W")
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [livePrice, setLivePrice] = useState<number | null>(null)
  const [priceChange, setPriceChange] = useState<number>(0)

  useEffect(() => {
    if (searchSymbol.length > 0 && isSearchFocused) {
      const stocks = [
        { symbol: "AAPL", name: "Apple Inc." },
        { symbol: "MSFT", name: "Microsoft Corporation" },
        { symbol: "GOOGL", name: "Alphabet Inc." },
        { symbol: "AMZN", name: "Amazon.com Inc." },
        { symbol: "TSLA", name: "Tesla, Inc." },
        { symbol: "META", name: "Meta Platforms, Inc." },
        { symbol: "NVDA", name: "NVIDIA Corporation" },
        { symbol: "JPM", name: "JPMorgan Chase & Co." },
        { symbol: "V", name: "Visa Inc." },
        { symbol: "WMT", name: "Walmart Inc." },
      ]

      const filtered = stocks.filter(
        (s) =>
          s.symbol.toLowerCase().includes(searchSymbol.toLowerCase()) ||
          s.name.toLowerCase().includes(searchSymbol.toLowerCase()),
      )

      setSuggestions(filtered.slice(0, 5).map((s) => `${s.symbol} - ${s.name}`))
    } else {
      setSuggestions([])
    }
  }, [searchSymbol, isSearchFocused])

  useEffect(() => {
    if (!data) return

    setLivePrice(data.price)

    const interval = setInterval(() => {
      if (data) {
        const change = (Math.random() - 0.5) * 0.5
        const newPrice = Number((data.price + change).toFixed(2))
        setLivePrice(newPrice)
        setPriceChange(change)

        setTimeout(() => setPriceChange(0), 2000)
      }
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [data])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const symbolOnly = searchSymbol.split(" - ")[0]
    setSymbol(symbolOnly)
    setSuggestions([])
  }

  const selectSuggestion = (suggestion: string) => {
    setSearchSymbol(suggestion)
    const symbolOnly = suggestion.split(" - ")[0]
    setSymbol(symbolOnly)
    setSuggestions([])
  }

  return (
    <Card className="shadow-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-[hsl(var(--stocks-primary))]">Stocks</CardTitle>
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
            <BarChart3 className="h-6 w-6 text-[hsl(var(--stocks-primary))]" />
          </motion.div>
        </div>
        <form onSubmit={handleSearch} className="mt-2 relative">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search symbol or company..."
                value={searchSymbol}
                onChange={(e) => setSearchSymbol(e.target.value)}
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
          <ErrorAlert message="Failed to load stock data. Please try again." />
        ) : data ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold">{data.symbol}</h3>
                <p className="text-muted-foreground text-sm">{data.companyName}</p>
              </div>
              <div className="flex flex-col items-end">
                <motion.div
                  className="text-3xl font-bold flex items-center"
                  animate={{
                    color: priceChange > 0 ? "rgb(34, 197, 94)" : priceChange < 0 ? "rgb(239, 68, 68)" : "currentColor",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <DollarSign className="h-5 w-5" />
                  {livePrice !== null ? livePrice.toFixed(2) : data.price.toFixed(2)}
                </motion.div>
                <div className={`flex items-center ${data.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {data.change >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  <span>
                    {data.change.toFixed(2)} ({data.changePercent.toFixed(2)}%)
                  </span>
                </div>
              </div>
            </div>

            <Tabs defaultValue={timeRange} onValueChange={setTimeRange} className="w-full">
              <TabsList className="grid grid-cols-4 mb-2">
                <TabsTrigger value="1D">1D</TabsTrigger>
                <TabsTrigger value="1W">1W</TabsTrigger>
                <TabsTrigger value="1M">1M</TabsTrigger>
                <TabsTrigger value="1Y">1Y</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-muted rounded-md p-2">
                <p className="text-xs text-muted-foreground">Open</p>
                <p className="font-medium">${data.open.toFixed(2)}</p>
              </div>
              <div className="bg-muted rounded-md p-2">
                <p className="text-xs text-muted-foreground">High</p>
                <p className="font-medium">${data.high.toFixed(2)}</p>
              </div>
              <div className="bg-muted rounded-md p-2">
                <p className="text-xs text-muted-foreground">Low</p>
                <p className="font-medium">${data.low.toFixed(2)}</p>
              </div>
            </div>

            <div className="h-40">
              <StocksChart data={data.historicalData} timeRange={timeRange} />
            </div>

            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>Last updated: {new Date().toLocaleTimeString()}</span>
              </div>
              <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={() => refetch()}>
                <RefreshCw className="h-3 w-3 mr-1" />
                Refresh
              </Button>
            </div>
          </motion.div>
        ) : null}
      </CardContent>
    </Card>
  )
}