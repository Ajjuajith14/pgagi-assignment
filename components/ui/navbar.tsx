"use client"

import type React from "react"

import { useState } from "react"
import { Menu, Bell, Search, User, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"

interface NavbarProps {
  onToggleSidebar: () => void
}

export function Navbar({ onToggleSidebar }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const { user, signOut } = useAuth()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Searching for:", searchQuery)
    // Implement global search functionality
  }

  return (
    <header className="bg-card text-card-foreground border-b h-16 flex items-center px-4 sticky top-0 z-10">
      <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="mr-4" aria-label="Toggle sidebar">
        <Menu className="h-5 w-5" />
      </Button>

      <form onSubmit={handleSearch} className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </form>

      <div className="ml-auto flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full notification-pulse"></span>
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-medium">Notifications</h3>
              <Button variant="ghost" size="sm">
                Mark all as read
              </Button>
            </div>
            <div className="max-h-80 overflow-y-auto">
              <DropdownMenuItem className="p-4 focus:bg-muted">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Weather Alert</p>
                    <span className="text-xs text-muted-foreground">2m ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Heavy rain expected in New York tomorrow.</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-4 focus:bg-muted">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Stock Update</p>
                    <span className="text-xs text-muted-foreground">15m ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">AAPL is up by 2.5% today.</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-4 focus:bg-muted">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Breaking News</p>
                    <span className="text-xs text-muted-foreground">1h ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Major tech announcement from Apple expected today.</p>
                </div>
              </DropdownMenuItem>
            </div>
            <div className="p-4 border-t">
              <Button variant="outline" className="w-full">
                View all notifications
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <img src="/images/abstract-user-icon.png" alt="User avatar" className="rounded-full w-8 h-8" />
                <span className="sr-only">User profile</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/profile">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/profile?tab=preferences">
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Dashboard Settings</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/signin">
            <Button variant="outline" size="sm">
              Sign in
            </Button>
          </Link>
        )}
      </div>
    </header>
  )
}
