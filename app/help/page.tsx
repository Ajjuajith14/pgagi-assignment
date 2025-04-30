"use client";

import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { motion } from "framer-motion";

export default function HelpPage() {
  return (
    <DashboardLayout>
      <div className="p-6 h-full">
        <h1 className="text-3xl font-bold mb-6">Help & Support</h1>
        <div className="relative h-[calc(100vh-12rem)] rounded-lg overflow-hidden shadow-lg">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/modern-tech-workspace.png')" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/30 to-violet-900/30 backdrop-blur-sm"></div>
          </div>

          <div className="relative z-10 p-8 h-full flex flex-col justify-center items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <h2 className="text-4xl font-bold mb-4 text-white drop-shadow-md">
                Need Assistance?
              </h2>
              <p className="text-xl text-white/90 mb-6 drop-shadow">
                Really need help with the understanding of the website
              </p>
              <div className="bg-card/80 backdrop-blur-md p-6 rounded-lg shadow-lg">
                <p className="text-lg mb-4">Do contact the Ajju Giri</p>
                <div className="flex justify-center">
                  <a
                    href="https://ajjugiri-portfolio.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Portfolio Link
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
