"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
}

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ config, className, children, ...props }, ref) => {
    // Create CSS variables for each color in the config
    const colorVars = Object.entries(config).reduce((acc, [key, value]) => {
      return {
        ...acc,
        [`--color-${key}`]: value.color,
      }
    }, {})

    return (
      <div
        ref={ref}
        className={cn("w-full", className)}
        style={colorVars as React.CSSProperties}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ChartContainer.displayName = "ChartContainer"

interface ChartTooltipContentProps {
  active?: boolean
  payload?: Array<{
    value: number
    name: string
    dataKey: string
  }>
  label?: string
  labelKey?: string
  labelFormatter?: (label: string) => string
  valueFormatter?: (value: number) => string
  indicator?: "dot" | "line"
}

function ChartTooltipContent({
  active,
  payload,
  label,
  labelKey,
  labelFormatter,
  valueFormatter,
  indicator = "dot",
}: ChartTooltipContentProps) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">
            {labelFormatter ? labelFormatter(label || "") : label}
          </span>
        </div>
        <div className="flex flex-col">
          {payload.map((item, index) => (
            <div key={index} className="flex items-center justify-end gap-2">
              {indicator === "dot" && (
                <div
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: `var(--color-${item.dataKey})`,
                  }}
                />
              )}
              {indicator === "line" && (
                <div
                  className="h-1 w-4 rounded-full"
                  style={{
                    backgroundColor: `var(--color-${item.dataKey})`,
                  }}
                />
              )}
              <span className="text-xs font-medium">
                {labelKey === item.dataKey
                  ? item.value
                  : valueFormatter
                  ? valueFormatter(item.value)
                  : item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export { ChartContainer, ChartTooltipContent }