"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { motion } from "framer-motion"

interface WeatherForecastDay {
  date: string
  temperature: number
  condition: string
}

interface WeatherChartProps {
  forecast: WeatherForecastDay[]
}

export function WeatherChart({ forecast }: WeatherChartProps) {
  const avgTemp = forecast.reduce((sum, day) => sum + day.temperature, 0) / forecast.length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="h-full"
    >
      <ChartContainer
        config={{
          temperature: {
            label: "Temperature",
            color: "hsl(var(--weather-primary))",
          },
        }}
        className="h-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={forecast} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="temperatureGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--weather-primary))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--weather-primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", { weekday: "short" })
              }}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              tickFormatter={(value) => `${value}°`}
              tick={{ fontSize: 12 }}
              domain={["dataMin - 2", "dataMax + 2"]}
            />
            <Tooltip content={<ChartTooltipContent labelKey="temperature" indicator="line" />} />
            <ReferenceLine
              y={avgTemp}
              stroke="hsl(var(--muted-foreground))"
              strokeDasharray="3 3"
              label={{
                value: "Avg",
                position: "right",
                fill: "hsl(var(--muted-foreground))",
                fontSize: 10,
              }}
            />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="var(--color-temperature)"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              animationDuration={1500}
              animationEasing="ease-in-out"
              fillOpacity={1}
              fill="url(#temperatureGradient)"
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </motion.div>
  )
}