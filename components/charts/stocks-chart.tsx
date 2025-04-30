"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { motion } from "framer-motion" 

interface StockDataPoint {
  date: string
  price: number
  volume: number
}

interface StocksChartProps {
  data: StockDataPoint[]
  timeRange?: string
}

export function StocksChart({ data, timeRange = "1W" }: StocksChartProps) {
  const filteredData = (() => {
    const now = new Date()
    switch (timeRange) {
      case "1D":
        return data.slice(-1)
      case "1W":
        return data.slice(-7)
      case "1M":
        return data.slice(-30)
      case "1Y":
        return data
      default:
        return data.slice(-7) 
    }
  })()

  const avgPrice = filteredData.reduce((sum, point) => sum + point.price, 0) / filteredData.length || 0

  return (
    <motion.div
      key={timeRange}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <ChartContainer
        config={{
          price: {
            label: "Price",
            color: "hsl(var(--stocks-primary))",
          },
        }}
        className="h-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--stocks-primary))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--stocks-primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => {
                const date = new Date(value)
                return timeRange === "1D"
                  ? date.toLocaleTimeString("en-US", { hour: "numeric" })
                  : date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
              }}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              tickFormatter={(value) => `$${value}`}
              tick={{ fontSize: 12 }}
              domain={["dataMin - 5", "dataMax + 5"]}
            />
            <Tooltip content={<ChartTooltipContent labelKey="price" indicator="line" />} />
            <ReferenceLine
              y={avgPrice}
              stroke="hsl(var(--muted-foreground))"
              strokeDasharray="3 3"
              label={{
                value: "Avg",
                position: "right",
                fill: "hsl(var(--muted-foreground))",
              }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="var(--color-price)"
              fillOpacity={1}
              fill="url(#colorPrice)"
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </motion.div>
  )
}
