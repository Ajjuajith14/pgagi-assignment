"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export interface User {
  id: string
  email: string
  name: string
  role: "user" | "admin"
  preferences: {
    dashboardLayout: "grid" | "list"
    theme: "light" | "dark" | "system"
    widgets: string[]
    widgetSettings: Record<string, any>
  }
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signOut: () => Promise<void>
  updateUserPreferences: (preferences: Partial<User["preferences"]>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for demo purposes
const MOCK_USERS: User[] = [
  {
    id: "1",
    email: "demo@gmail.com", // Updated email
    name: "Demo User",
    role: "user",
    preferences: {
      dashboardLayout: "grid",
      theme: "system",
      widgets: ["weather", "news", "stocks"],
      widgetSettings: {
        weather: { defaultCity: "New York" },
        news: { category: "technology" },
        stocks: { symbols: ["AAPL", "MSFT", "GOOGL"] },
      },
    },
  },
  {
    id: "2",
    email: "admin@example.com",
    name: "Admin User",
    role: "admin",
    preferences: {
      dashboardLayout: "grid",
      theme: "dark",
      widgets: ["weather", "news", "stocks"],
      widgetSettings: {
        weather: { defaultCity: "San Francisco" },
        news: { category: "business" },
        stocks: { symbols: ["TSLA", "AMZN", "META"] },
      },
    },
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, this would be an API call to validate the session
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Authentication error:", error)
        // Clear any invalid data
        localStorage.removeItem("user")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Update the signIn function to handle redirection properly

  const signIn = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Check for the specific demo credentials
      if (email === "demo@gmail.com" && password === "demo@123") {
        const demoUser = MOCK_USERS.find((u) => u.email === "demo@gmail.com")
        if (demoUser) {
          setUser(demoUser)
          localStorage.setItem("user", JSON.stringify(demoUser))
          // Set a cookie for middleware
          document.cookie = `user=true; path=/; max-age=${60 * 60 * 24 * 7}` // 7 days
          router.push("/dashboard")
          return
        }
      }

      // For other users in the mock database
      const user = MOCK_USERS.find((u) => u.email === email)

      if (!user) {
        throw new Error("Invalid credentials")
      }

      // Simulate successful login
      setUser(user)
      localStorage.setItem("user", JSON.stringify(user))
      // Set a cookie for middleware
      document.cookie = `user=true; path=/; max-age=${60 * 60 * 24 * 7}` // 7 days
      router.push("/dashboard")
    } catch (error) {
      console.error("Sign in error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    setIsLoading(true)
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      // In a real app, this would be an API call to create a new user
      const existingUser = MOCK_USERS.find((u) => u.email === email)

      if (existingUser) {
        throw new Error("User already exists")
      }

      // Create a new user
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        email,
        name,
        role: "user",
        preferences: {
          dashboardLayout: "grid",
          theme: "system",
          widgets: ["weather", "news", "stocks"],
          widgetSettings: {
            weather: { defaultCity: "New York" },
            news: { category: "technology" },
            stocks: { symbols: ["AAPL"] },
          },
        },
      }

      // Simulate successful registration
      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
      // Set a cookie for middleware
      document.cookie = `user=true; path=/; max-age=${60 * 60 * 24 * 7}` // 7 days
      router.push("/dashboard")
    } catch (error) {
      console.error("Sign up error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    setIsLoading(true)
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // In a real app, this would be an API call to invalidate the session
      setUser(null)
      localStorage.removeItem("user")
      // Remove the cookie
      document.cookie = "user=; path=/; max-age=0"
      router.push("/signin")
    } catch (error) {
      console.error("Sign out error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const updateUserPreferences = async (preferences: Partial<User["preferences"]>) => {
    if (!user) return

    setIsLoading(true)
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Update user preferences
      const updatedUser = {
        ...user,
        preferences: {
          ...user.preferences,
          ...preferences,
        },
      }

      // In a real app, this would be an API call to update the user
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    } catch (error) {
      console.error("Update preferences error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const value = {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
    updateUserPreferences,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
