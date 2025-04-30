"use client"

import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { motion } from "framer-motion"

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="p-6 h-full">
        <h1 className="text-3xl font-bold mb-6">Reports</h1>
        <div className="relative h-[calc(100vh-12rem)] rounded-lg overflow-hidden shadow-lg">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/financial-headlines.png')" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm"></div>
          </div>

          <div className="relative z-10 p-8 h-full flex flex-col justify-center items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <h2 className="text-4xl font-bold mb-4 text-white drop-shadow-md">Business Reports</h2>
              <p className="text-xl text-white/90 mb-6 drop-shadow">
                Sorry there are not many reports for this Projects or even for Apis....
              </p>
              <div className="bg-card/80 backdrop-blur-md p-6 rounded-lg shadow-lg">
                <p className="text-lg">Really there are NONE.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
