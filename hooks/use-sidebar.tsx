"use client"

import { useState, useEffect } from "react"

export function useSidebar() {
  const [isOpen, setIsOpen] = useState(true)
  useEffect(() => {
    const savedState = localStorage.getItem("sidebar-state")
    if (savedState) {
      setIsOpen(JSON.parse(savedState))
    }
  }, [])

  const toggle = () => {
    const newState = !isOpen
    setIsOpen(newState)
    localStorage.setItem("sidebar-state", JSON.stringify(newState))
  }

  return { isOpen, toggle }
}