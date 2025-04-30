"use client"

import { useEffect, useState } from "react"
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { motion, AnimatePresence } from "framer-motion"

interface Update {
  id: string
  type: "news" | "weather" | "stocks"
  title: string
  message: string
  timestamp: Date
}

export function RealTimeUpdates() {
  const [updates, setUpdates] = useState<Update[]>([])
  const [showUpdate, setShowUpdate] = useState(false)
  const [currentUpdate, setCurrentUpdate] = useState<Update | null>(null)

  // Simulate real-time updates
  useEffect(() => {
    const possibleUpdates = [
      {
        type: "weather",
        title: "Weather Alert",
        message: "Heavy rain expected in your area in the next hour.",
      },
      {
        type: "stocks",
        title: "Stock Movement",
        message: "AAPL just moved up by 2% in the last 15 minutes.",
      },
      {
        type: "news",
        title: "Breaking News",
        message: "Major tech announcement from Apple expected today.",
      },
      {
        type: "weather",
        title: "Temperature Change",
        message: "Temperature will drop by 5°C tonight.",
      },
      {
        type: "stocks",
        title: "Market Update",
        message: "S&P 500 is up by 1.2% today.",
      },
    ]

    // Generate a random update every 30 seconds
    const interval = setInterval(() => {
      const randomUpdate = possibleUpdates[Math.floor(Math.random() * possibleUpdates.length)]
      const newUpdate = {
        id: Math.random().toString(36).substring(2, 9),
        ...randomUpdate,
        timestamp: new Date(),
      }

      setUpdates((prev) => [...prev, newUpdate])
      setCurrentUpdate(newUpdate)
      setShowUpdate(true)

      // Hide the update after 5 seconds
      setTimeout(() => {
        setShowUpdate(false)
      }, 5000)
    }, 30000)

    // Initial update
    const initialUpdate = {
      id: Math.random().toString(36).substring(2, 9),
      type: "news" as const,
      title: "Welcome to Analytics Dashboard",
      message: "You'll receive real-time updates here.",
      timestamp: new Date(),
    }
    setUpdates([initialUpdate])
    setCurrentUpdate(initialUpdate)
    setShowUpdate(true)
    setTimeout(() => {
      setShowUpdate(false)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  if (!currentUpdate) return null

  return (
    <AnimatePresence>
      {showUpdate && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 z-50 max-w-md"
        >
          <Alert variant="default" className="border-l-4 border-primary">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{currentUpdate.title}</AlertTitle>
            <AlertDescription>
              {currentUpdate.message}
              <div className="mt-2 text-xs text-muted-foreground">{currentUpdate.timestamp.toLocaleTimeString()}</div>
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  )
}