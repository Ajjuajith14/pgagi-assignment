"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { GlobalLoader } from "@/components/ui/global-loader"

export default function LandingPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  // Remove automatic redirection from homepage
  // This allows users to see the homepage even when authenticated
  // They can manually navigate to dashboard using the UI

  if (isLoading) {
    return <GlobalLoader text="Preparing your experience..." />
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <motion.div initial={{ rotate: -10 }} animate={{ rotate: 0 }} transition={{ duration: 0.5 }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </motion.div>
            <span className="text-xl font-bold">Analytics Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <Link href="/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/signin">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link href="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Your Personal Analytics Dashboard
            </motion.h1>
            <motion.p
              className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Track weather, news, stocks, and more with a customizable dashboard tailored to your needs.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {user ? (
                <Link href="/dashboard">
                  <Button size="lg">Go to Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link href="/signup">
                    <Button size="lg" className="mr-4">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="/signin">
                    <Button size="lg" variant="outline">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                className="bg-card p-6 rounded-lg shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Weather Updates</h3>
                <p className="text-muted-foreground">
                  Get real-time weather updates for any location with detailed forecasts.
                </p>
              </motion.div>

              <motion.div
                className="bg-card p-6 rounded-lg shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Latest News</h3>
                <p className="text-muted-foreground">
                  Stay informed with the latest news from various categories and sources.
                </p>
              </motion.div>

              <motion.div
                className="bg-card p-6 rounded-lg shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Stock Tracking</h3>
                <p className="text-muted-foreground">
                  Monitor your favorite stocks with real-time price updates and historical data.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Analytics Dashboard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
