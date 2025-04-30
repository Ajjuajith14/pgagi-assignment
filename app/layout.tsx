import type React from "react"
import type { Metadata } from "next/types"
import { Inter } from "next/font/google"
import { Providers } from "@/components/providers"
import "./globals.css" 

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Analytics Dashboard",
  description: "Comprehensive analytics dashboard with multiple data sources",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
