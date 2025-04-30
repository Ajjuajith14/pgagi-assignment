"use client"

import { useNewsApiKeyValidator } from "@/utils/api-key-validator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import { useEffect, useState } from "react"

export function ApiKeyStatus() {
  const {
    isValid: isNewsApiValid,
    isLoading: isNewsApiLoading,
    errorMessage: newsApiErrorMessage,
  } = useNewsApiKeyValidator()
  const [stocksApiStatus, setStocksApiStatus] = useState<{
    isValid: boolean | null
    errorMessage: string | null
  }>({
    isValid: null,
    errorMessage: null,
  })

  useEffect(() => {
    const checkAlphaVantageKey = () => {
      const apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY

      if (!apiKey) {
        setStocksApiStatus({
          isValid: false,
          errorMessage: "Alpha Vantage API key is not set",
        })
        return
      }

      setStocksApiStatus({
        isValid: true,
        errorMessage: null,
      })
    }

    checkAlphaVantageKey()
  }, [])

  if (isNewsApiLoading) {
    return null
  }

  return (
    <>
      {isNewsApiValid === false && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>News API Key Issue</AlertTitle>
          <AlertDescription>
            <p>There's a problem with your News API key: {newsApiErrorMessage}</p>
            <p className="mt-2">
              Make sure you've set the correct API key as NEXT_PUBLIC_NEWS_API_KEY in your environment variables.
            </p>
            <p className="mt-2">
              Note: The free tier of News API only works in development environments and has usage limitations.
            </p>
          </AlertDescription>
        </Alert>
      )}

      {stocksApiStatus.isValid === false && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Alpha Vantage API Key Issue</AlertTitle>
          <AlertDescription>
            <p>There's a problem with your Alpha Vantage API key: {stocksApiStatus.errorMessage}</p>
            <p className="mt-2">
              Make sure you've set the correct API key as NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY in your environment
              variables.
            </p>
            <p className="mt-2">
              Note: The free tier of Alpha Vantage API has usage limitations (5 API requests per minute and 500 requests
              per day).
            </p>
          </AlertDescription>
        </Alert>
      )}
    </>
  )
}