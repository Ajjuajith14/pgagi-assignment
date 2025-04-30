"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useNewsQuery } from "@/hooks/use-news"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorAlert } from "@/components/ui/error-alert"
import { Search, RefreshCw } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface NewsWidgetProps {
  defaultCategory?: string
}

export function NewsWidget({ defaultCategory = "technology" }: NewsWidgetProps) {
  const [searchMode, setSearchMode] = useState<"category" | "keyword">("category")
  const [searchInput, setSearchInput] = useState(defaultCategory)
  const [activeQuery, setActiveQuery] = useState(defaultCategory)
  const [isActiveQueryCategory, setIsActiveQueryCategory] = useState(true)

  const { data, isLoading, isError, refetch } = useNewsQuery(activeQuery, isActiveQueryCategory)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setActiveQuery(searchInput)
    setIsActiveQueryCategory(searchMode === "category")
  }

  const predefinedCategories = ["technology", "business", "health", "science", "sports", "entertainment"]

  return (
    <Card className="shadow-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-green-500/10 to-green-600/10 pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-[hsl(var(--news-primary))]">News</CardTitle>
          <Tabs
            value={searchMode}
            onValueChange={(value) => setSearchMode(value as "category" | "keyword")}
            className="h-8"
          >
            <TabsList className="h-8">
              <TabsTrigger value="category" className="text-xs px-2 py-1 h-7">
                Categories
              </TabsTrigger>
              <TabsTrigger value="keyword" className="text-xs px-2 py-1 h-7">
                Search
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {searchMode === "category" ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {predefinedCategories.map((category) => (
              <Button
                key={category}
                variant={activeQuery === category && isActiveQueryCategory ? "default" : "outline"}
                size="sm"
                className="text-xs h-7"
                onClick={() => {
                  setActiveQuery(category)
                  setIsActiveQueryCategory(true)
                  setSearchInput(category)
                }}
              >
                {category}
              </Button>
            ))}
          </div>
        ) : (
          <form onSubmit={handleSearch} className="mt-2 relative">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search news..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="pl-8 w-full"
                />
              </div>
              <Button type="submit" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>
        )}
      </CardHeader>
      <CardContent className="pt-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <LoadingSpinner />
          </div>
        ) : isError ? (
          <ErrorAlert message="Failed to load news data. Please try again." />
        ) : data && data.articles ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="text-sm font-medium mb-2">
              {isActiveQueryCategory ? `Top headlines in ${activeQuery}` : `Search results for "${activeQuery}"`}
            </div>

            {data.articles.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No news articles found. Try a different search.
              </div>
            ) : (
              data.articles.slice(0, 5).map((article, index) => (
                <motion.div
                  key={index}
                  className="border-b pb-3 last:border-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: index * 0.1 },
                  }}
                >
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="block hover:underline">
                    <h3 className="text-md font-medium">{article.title}</h3>
                    <p className="text-sm text-gray-500">{article.source.name}</p>
                  </a>
                </motion.div>
              ))
            )}

            <div className="text-xs text-right text-muted-foreground flex justify-between items-center">
              <div className="text-xs text-muted-foreground">
                {data.totalResults > 5 && `Showing 5 of ${data.totalResults} results`}
              </div>
              <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={() => refetch()}>
                <RefreshCw className="h-3 w-3 mr-1" />
                Refresh
              </Button>
            </div>
          </motion.div>
        ) : (
          <div>No news available.</div>
        )}
      </CardContent>
    </Card>
  )
}
