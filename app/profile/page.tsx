"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { Check } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { GlobalLoader } from "@/components/ui/global-loader"

export default function ProfilePage() {
  const { user, updateUserPreferences, isLoading } = useAuth()
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [dashboardLayout, setDashboardLayout] = useState<"grid" | "list">(user?.preferences.dashboardLayout || "grid")
  const [theme, setTheme] = useState<"light" | "dark" | "system">(user?.preferences.theme || "system")
  const [enabledWidgets, setEnabledWidgets] = useState<Record<string, boolean>>({
    weather: user?.preferences.widgets.includes("weather") || false,
    news: user?.preferences.widgets.includes("news") || false,
    stocks: user?.preferences.widgets.includes("stocks") || false,
  })

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setSuccessMessage("Profile updated successfully")
    setTimeout(() => setSuccessMessage(null), 3000)
  }

  const handleUpdatePreferences = async () => {
    const widgets = Object.entries(enabledWidgets)
      .filter(([_, enabled]) => enabled)
      .map(([widget]) => widget)

    await updateUserPreferences({
      dashboardLayout,
      theme,
      widgets,
    })

    setSuccessMessage("Preferences updated successfully")
    setTimeout(() => setSuccessMessage(null), 3000)
  }

  return (
    <>
      {isLoading && <GlobalLoader text="Updating preferences..." />}

      <DashboardLayout>
        <div className="container mx-auto py-6 space-y-6">
          <h1 className="text-3xl font-bold">User Profile</h1>

          {successMessage && (
            <Alert
              variant="default"
              className="bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-900 dark:text-green-400"
            >
              <Check className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="preferences">Dashboard Preferences</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your account information</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled
                      />
                      <p className="text-sm text-muted-foreground">Email cannot be changed</p>
                    </div>
                    <Button type="submit">Update Profile</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Dashboard Preferences</CardTitle>
                  <CardDescription>Customize your dashboard experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="layout">Dashboard Layout</Label>
                    <Select
                      value={dashboardLayout}
                      onValueChange={(value: string) => setDashboardLayout(value as "grid" | "list")}
                    >
                      <SelectTrigger id="layout">
                        <SelectValue placeholder="Select layout" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grid">Grid</SelectItem>
                        <SelectItem value="list">List</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <Select
                      value={theme}
                      onValueChange={(value: string) => setTheme(value as "light" | "dark" | "system")}
                    >
                      <SelectTrigger id="theme">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label>Enabled Widgets</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="weather-widget" className="cursor-pointer">
                          Weather Widget
                        </Label>
                        <Switch
                          id="weather-widget"
                          checked={enabledWidgets.weather}
                          onCheckedChange={(checked) => setEnabledWidgets((prev) => ({ ...prev, weather: checked }))}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="news-widget" className="cursor-pointer">
                          News Widget
                        </Label>
                        <Switch
                          id="news-widget"
                          checked={enabledWidgets.news}
                          onCheckedChange={(checked) => setEnabledWidgets((prev) => ({ ...prev, news: checked }))}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="stocks-widget" className="cursor-pointer">
                          Stocks Widget
                        </Label>
                        <Switch
                          id="stocks-widget"
                          checked={enabledWidgets.stocks}
                          onCheckedChange={(checked) => setEnabledWidgets((prev) => ({ ...prev, stocks: checked }))}
                        />
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleUpdatePreferences}>Save Preferences</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  )
}
