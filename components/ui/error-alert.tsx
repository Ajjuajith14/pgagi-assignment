import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ErrorAlertProps {
  message: string
  details?: string
}

export function ErrorAlert({ message, details }: ErrorAlertProps) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {message}
        {details && (
          <details className="mt-2 text-xs">
            <summary>Technical details</summary>
            <p className="mt-1">{details}</p>
          </details>
        )}
      </AlertDescription>
    </Alert>
  )
}