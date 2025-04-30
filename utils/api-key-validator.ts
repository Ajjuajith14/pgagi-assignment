"use client"

import { useState, useEffect } from "react"

export function useNewsApiKeyValidator() {
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    async function validateApiKey() {
      try {
        const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY

        if (!apiKey) {
          setIsValid(false)
          setErrorMessage("News API key is not set")
          return
        }

        const response = await fetch(`/api/news?category=technology`)

        if (!response.ok) {
          const data = await response.json()
          setIsValid(false)
          setErrorMessage(data.message || `API returned status ${response.status}`)
          return
        }

        const data = await response.json()

        if (data.status === "error") {
          setIsValid(false)
          setErrorMessage(data.message || "API returned an error status")
          return
        }

        setIsValid(true)
        setErrorMessage(null)
      } catch (error) {
        setIsValid(false)
        setErrorMessage(error instanceof Error ? error.message : "Unknown error")
      } finally {
        setIsLoading(false)
      }
    }

    validateApiKey()
  }, [])

  return { isValid, isLoading, errorMessage }
}