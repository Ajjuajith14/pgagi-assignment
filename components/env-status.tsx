"use client"

import { useEnvChecker } from "@/utils/env-checker"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'

export function EnvStatus() {
  const envStatus = useEnvChecker()

  const missingKeys = Object.entries(envStatus)
    .filter(([_, value]) => !value)
    .map(([key]) => key)

  if (missingKeys.length === 0) {
    return null
  }

  return (
    <Alert variant="warning" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>API Key Configuration Issue</AlertTitle>
      <AlertDescription>
        <p>The following API keys appear to be missing or invalid:</p>
        <ul className="list-disc pl-5 mt-2">
          {missingKeys.includes("weather") && <li>OpenWeatherMap API Key (NEXT_PUBLIC_OPENWEATHERMAP_API_KEY)</li>}
          {missingKeys.includes("news") && (
            <li>
              News API Key (NEXT_PUBLIC_NEWS_API_KEY) - Get one from{" "}
              <a href="https://newsapi.org/register" className="underline" target="_blank" rel="noopener noreferrer">
                newsapi.org
              </a>
            </li>
          )}
          {missingKeys.includes("stocks") && (
            <li>
              Alpha Vantage API Key (NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY) - The key "SV8WVCEUSURUN2AE" appears to be an
              Alpha Vantage key, not a News API key
            </li>
          )}
        </ul>
        <p className="mt-2">
          Please check your environment variables and make sure you're using the correct API keys for each service.
        </p>
      </AlertDescription>
    </Alert>
  )
}