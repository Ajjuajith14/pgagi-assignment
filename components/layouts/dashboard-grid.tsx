"use client"

import type React from "react"
import { useDrop } from "react-dnd"
import { ItemTypes } from "@/lib/dnd-types"
import { useLocalStorage } from "@/hooks/use-local-storage"

interface WidgetPosition {
  id: string
  x: number
  y: number
  width: number
  height: number
}

interface DashboardGridProps {
  children: React.ReactNode
}

export function DashboardGrid({ children }: DashboardGridProps) {
  const [widgetPositions, setWidgetPositions] = useLocalStorage<WidgetPosition[]>("widget-positions", [
    { id: "weather-widget", x: 0, y: 0, width: 1, height: 1 },
    { id: "news-widget", x: 1, y: 0, width: 1, height: 1 },
    { id: "stocks-widget", x: 2, y: 0, width: 1, height: 1 },
  ])

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.WIDGET,
    drop: (item: { type: string; id: string }, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset()
      if (!delta) return

      const gridSize = 100 // Approximate grid cell size in pixels
      const deltaX = Math.round(delta.x / gridSize)
      const deltaY = Math.round(delta.y / gridSize)

      moveWidget(item.id, deltaX, deltaY)
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  const moveWidget = (id: string, deltaX: number, deltaY: number) => {
    setWidgetPositions((prevPositions) =>
      prevPositions.map((widget) => {
        if (widget.id === id) {
          const newX = Math.max(0, widget.x + deltaX)
          const newY = Math.max(0, widget.y + deltaY)
          return { ...widget, x: newX, y: newY }
        }
        return widget
      })
    )
  }

  return (
    <div
    ref={(node: HTMLDivElement | null) => {
      if (node) drop(node)
    }}
    className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 min-h-[calc(100vh-4rem)] ${
      isOver ? "bg-muted/50" : ""
    }`}
  >
    {children}
  </div>
  )
}
