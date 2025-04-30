"use client"

import type React from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { Provider as ReduxProvider } from "react-redux"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"
import { store } from "@/store"
import { AuthProvider } from "@/contexts/auth-context"

export function Providers({ children }: { children: React.ReactNode }) {
  
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: 5 * 60 * 1000, // 5 minutes
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <DndProvider backend={HTML5Backend}>{children}</DndProvider>
          </ThemeProvider>
        </AuthProvider>
      </ReduxProvider>
    </QueryClientProvider>
  )
}