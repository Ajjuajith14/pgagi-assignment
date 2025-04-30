"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { ThemeToggle } from "./theme-toggle"
import { Home, BarChart2, Users, FileText, HelpCircle, Menu } from "lucide-react"
import { Button } from "./button"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SidebarProps {
  isOpen?: boolean
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(({ isOpen = true, ...props }, ref) => {
  const sidebarWidth = isOpen ? "w-64" : "w-16"
  const pathname = usePathname()

  return (
    <motion.div
      ref={ref}
      className={cn("h-screen bg-card border-r flex flex-col transition-all duration-300 ease-in-out", sidebarWidth)}
      initial={false}
      animate={{ width: isOpen ? 256 : 64 }}
      {...props}
    >
      <div className="p-4 border-b flex items-center justify-between h-16">
        {isOpen ? (
          <h2 className="font-semibold text-lg">Analytics</h2>
        ) : (
          <div className="w-full flex justify-center">
            <Menu className="h-5 w-5" />
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto py-4">
        <nav className="px-2 space-y-1">
          <SidebarItem
            icon={Home}
            label="Dashboard"
            href="/dashboard"
            isActive={pathname === "/dashboard"}
            isOpen={isOpen}
          />
          <SidebarItem
            icon={BarChart2}
            label="Analytics"
            href="/analytics"
            isActive={pathname === "/analytics"}
            isOpen={isOpen}
          />
          <SidebarItem
            icon={FileText}
            label="Reports"
            href="/reports"
            isActive={pathname === "/reports"}
            isOpen={isOpen}
          />
          <SidebarItem icon={Users} label="Users" href="/users" isActive={pathname === "/users"} isOpen={isOpen} />
          <SidebarItem icon={HelpCircle} label="Help" href="/help" isActive={pathname === "/help"} isOpen={isOpen} />
        </nav>
      </div>

      <div className="p-4 border-t flex justify-center">
        <ThemeToggle />
      </div>
    </motion.div>
  )
})
Sidebar.displayName = "Sidebar"

interface SidebarItemProps {
  icon: React.ElementType
  label: string
  href: string
  isActive?: boolean
  isOpen?: boolean
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, href, isActive, isOpen }) => {
  return (
    <Link href={href} className="block w-full">
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className={cn("w-full justify-start mb-1", isOpen ? "px-3" : "px-0 justify-center")}
      >
        <Icon className="h-5 w-5 mr-2" />
        {isOpen && <span>{label}</span>}
      </Button>
    </Link>
  )
}

const SidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn("flex flex-col h-full w-full bg-card text-card-foreground py-4", className)}
        ref={ref}
        {...props}
      />
    )
  },
)
SidebarContent.displayName = "SidebarContent"

const SidebarFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div className={cn("flex items-center justify-center h-16 border-t", className)} ref={ref} {...props} />
  },
)
SidebarFooter.displayName = "SidebarFooter"

const SidebarGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div className={cn("flex flex-col space-y-1", className)} ref={ref} {...props} />
  },
)
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupAction = React.forwardRef<HTMLButtonElement, React.HTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    return (
      <button
        className={cn("flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted", className)}
        ref={ref}
        {...props}
      />
    )
  },
)
SidebarGroupAction.displayName = "SidebarGroupAction"

const SidebarGroupContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div className={cn("flex flex-col space-y-1 px-4", className)} ref={ref} {...props} />
  },
)
SidebarGroupContent.displayName = "SidebarGroupContent"

const SidebarGroupLabel = React.forwardRef<HTMLLabelElement, React.HTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => {
    return <label className={cn("text-sm font-medium text-muted-foreground px-4", className)} ref={ref} {...props} />
  },
)
SidebarGroupLabel.displayName = "SidebarGroupLabel"

const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div className={cn("flex items-center justify-between h-16 border-b px-4", className)} ref={ref} {...props} />
    )
  },
)
SidebarHeader.displayName = "SidebarHeader"

const SidebarInput = React.forwardRef<HTMLInputElement, React.HTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
SidebarInput.displayName = "SidebarInput"

const SidebarInset = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div className={cn("bg-secondary rounded-md p-4", className)} ref={ref} {...props} />
  },
)
SidebarInset.displayName = "SidebarInset"

const SidebarMenu = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  ({ className, ...props }, ref) => {
    return <ul className={cn("flex flex-col space-y-1", className)} ref={ref} {...props} />
  },
)
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuAction = React.forwardRef<HTMLButtonElement, React.HTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    return (
      <button
        className={cn("flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted", className)}
        ref={ref}
        {...props}
      />
    )
  },
)
SidebarMenuAction.displayName = "SidebarMenuAction"

const SidebarMenuBadge = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
SidebarMenuBadge.displayName = "SidebarMenuBadge"

const SidebarMenuButton = React.forwardRef<HTMLButtonElement, React.HTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    return (
      <button
        className={cn("flex items-center space-x-2 rounded-md p-2 hover:bg-muted", className)}
        ref={ref}
        {...props}
      />
    )
  },
)
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarMenuItem = React.forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => {
    return (
      <li className={cn("flex items-center space-x-2 rounded-md p-2 hover:bg-muted", className)} ref={ref} {...props} />
    )
  },
)
SidebarMenuItem.displayName = "SidebarMenuItem"

const SidebarMenuSkeleton = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div className={cn("flex items-center space-x-2 rounded-md p-2", className)} ref={ref} {...props} />
  },
)
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton"

const SidebarMenuSub = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  ({ className, ...props }, ref) => {
    return <ul className={cn("flex flex-col space-y-1 pl-4", className)} ref={ref} {...props} />
  },
)
SidebarMenuSub.displayName = "SidebarMenuSub"

const SidebarMenuSubButton = React.forwardRef<HTMLButtonElement, React.HTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    return (
      <button
        className={cn("flex items-center space-x-2 rounded-md p-2 hover:bg-muted", className)}
        ref={ref}
        {...props}
      />
    )
  },
)
SidebarMenuSubButton.displayName = "SidebarMenuSubButton"

const SidebarMenuSubItem = React.forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => {
    return (
      <li className={cn("flex items-center space-x-2 rounded-md p-2 hover:bg-muted", className)} ref={ref} {...props} />
    )
  },
)
SidebarMenuSubItem.displayName = "SidebarMenuSubItem"

const SidebarRail = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div className={cn("flex flex-col w-16 border-r", className)} ref={ref} {...props} />
  },
)
SidebarRail.displayName = "SidebarRail"

const SidebarSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div className={cn("h-px w-full bg-border", className)} ref={ref} {...props} />
  },
)
SidebarSeparator.displayName = "SidebarSeparator"

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
}
