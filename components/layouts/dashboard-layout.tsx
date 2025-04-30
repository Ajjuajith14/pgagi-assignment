"use client"

import type React from "react"
import { Sidebar } from "@/components/ui/sidebar"
import { Navbar } from "@/components/ui/navbar"
import { useSidebar } from "@/hooks/use-sidebar"
import { RealTimeUpdates } from "@/components/ui/real-time-updates"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isOpen, toggle } = useSidebar()

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar onToggleSidebar={toggle} />
        <main className="flex-1 overflow-auto bg-muted/40">{children}</main>
        <RealTimeUpdates />
      </div>
    </div>
  )
}