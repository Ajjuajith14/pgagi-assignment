"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlobalLoaderProps {
  isLoading?: boolean
  text?: string
}

export function GlobalLoader({ isLoading = true, text = "Loading..." }: GlobalLoaderProps) {
  if (!isLoading) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm"
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="relative h-16 w-16">
          {/* Outer circle */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-primary/30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Spinning arc */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />

          {/* Inner pulsing circle */}
          <motion.div
            className="absolute inset-4 rounded-full bg-primary/20"
            animate={{ scale: [0.8, 1.1, 0.8] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        </div>

        <motion.p
          className="text-lg font-medium text-foreground"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>

        {/* Animated dots */}
        <motion.div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-2 w-2 rounded-full bg-primary"
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 0.6,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Background gradient animation */}
      <motion.div
        className={cn(
          "absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-background to-secondary/5",
          "opacity-30",
        )}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        style={{
          backgroundSize: "400% 400%",
        }}
      />
    </motion.div>
  )
}