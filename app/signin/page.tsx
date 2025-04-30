"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { GlobalLoader } from "@/components/ui/global-loader"

export default function SignInPage() {
  const [email, setEmail] = useState("demo@gmail.com") // Pre-filled with demo email
  const [password, setPassword] = useState("demo@123") // Pre-filled with demo password
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { signIn, isLoading } = useAuth()
  const router = useRouter()

  // Update the handleSubmit function to ensure proper redirection

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      // For demo credentials, use the normal sign-in flow instead of special handling
      await signIn(email, password)
      // The signIn function in auth-context will handle the redirection
    } catch (err) {
      console.error("Sign in error:", err)
      setError("Invalid email or password. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {(isLoading || isSubmitting) && <GlobalLoader text="Signing in..." />}

      <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
            <CardDescription>Enter your email and password to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting || isLoading}>
                {isSubmitting ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-center text-sm text-muted-foreground mt-2">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
            <div className="text-center text-xs text-muted-foreground mt-4">
              <p>Demo credentials:</p>
              <p>Email: demo@gmail.com</p>
              <p>Password: demo@123</p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
