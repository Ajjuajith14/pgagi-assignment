"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { WeatherWidget } from "@/components/widgets/weather-widget"
import { NewsWidget } from "@/components/widgets/news-widget"
import { StocksWidget } from "@/components/widgets/stocks-widget"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { ApiKeyStatus } from "@/components/api-key-status"
import { GlobalLoader } from "@/components/ui/global-loader"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const { setTheme } = useTheme()
  const router = useRouter()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/signin")
    } else if (user) {
      setIsInitialized(true)
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (user?.preferences.theme) {
      setTheme(user.preferences.theme)
    }
  }, [user, setTheme])

  const enabledWidgets = user?.preferences.widgets || []

  if (isLoading || !isInitialized) {
    return <GlobalLoader text="Loading dashboard..." />
  }

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6">
        <div className="flex justify-between items-center mb-6">
          <motion.h1
            className="text-3xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {user ? `Welcome, ${user.name}` : "Analytics Dashboard"}
          </motion.h1>

          <Link href="/profile">
            <Button variant="outline" size="sm">
              Customize Dashboard
            </Button>
          </Link>
        </div>

        <ApiKeyStatus />

        <div
          className={`grid ${user?.preferences.dashboardLayout === "list" ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"} gap-6`}
        >
          {enabledWidgets.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg">
              <PlusCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No widgets enabled</h3>
              <p className="text-muted-foreground text-center mb-4">
                You haven't enabled any widgets yet. Go to your profile to customize your dashboard.
              </p>
              <Link href="/profile">
                <Button>Enable Widgets</Button>
              </Link>
            </div>
          ) : (
            <>
              {enabledWidgets.includes("weather") && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <WeatherWidget defaultCity={user?.preferences.widgetSettings?.weather?.defaultCity || "New York"} />
                </motion.div>
              )}

              {enabledWidgets.includes("news") && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="h-full"
                >
                  <NewsWidget defaultCategory={user?.preferences.widgetSettings?.news?.category || "technology"} />
                </motion.div>
              )}

              {enabledWidgets.includes("stocks") && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="h-full"
                >
                  <StocksWidget defaultSymbol={user?.preferences.widgetSettings?.stocks?.symbols?.[0] || "AAPL"} />
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
