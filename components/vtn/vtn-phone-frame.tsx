"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { VTNHomeScreen } from "./vtn-home-screen"
import { VTNTranscribeScreen } from "./vtn-transcribe-screen"
import { VTNSettingsScreen } from "./vtn-settings-screen"
import { VTNAccountScreen } from "./vtn-account-screen"
import { useVTNAuth } from "@/hooks/use-vtn-auth"

type Screen = "home" | "transcribe" | "settings" | "account"

// iOS-style slide transition variants
const slideVariants = {
  enterFromRight: {
    x: "100%",
    opacity: 1,
  },
  enterFromLeft: {
    x: "-30%",
    opacity: 0.5,
  },
  center: {
    x: 0,
    opacity: 1,
  },
  exitToLeft: {
    x: "-30%",
    opacity: 0.5,
  },
  exitToRight: {
    x: "100%",
    opacity: 1,
  },
}

export function VTNPhoneFrame() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home")
  const [direction, setDirection] = useState<"forward" | "back">("forward")
  const [screenHistory, setScreenHistory] = useState<Screen[]>(["home"])

  const { isAuthenticated, user, hasPremiumAccess, signIn, signOut, deleteAccount } = useVTNAuth()

  const navigateTo = (screen: Screen) => {
    setDirection("forward")
    setScreenHistory((prev) => [...prev, screen])
    setCurrentScreen(screen)
  }

  const goBack = () => {
    setDirection("back")
    setScreenHistory((prev) => {
      const newHistory = prev.slice(0, -1)
      const previousScreen = newHistory[newHistory.length - 1] || "home"
      setCurrentScreen(previousScreen)
      return newHistory
    })
  }

  return (
    <div className="relative">
      {/* Phone Frame */}
      <motion.div
        className="relative w-[300px] h-[620px] rounded-[3rem] border-[3px] border-white/20 bg-[#0A0A0A] overflow-hidden"
        style={{
          boxShadow:
            "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.05), inset 0 0 0 1px rgba(255,255,255,0.05)",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Dynamic Island */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-20" />

        {/* Screen Container */}
        <div className="absolute inset-[3px] rounded-[2.75rem] overflow-hidden bg-white">
          {/* Status Bar */}
          <div className="relative z-10 flex items-center justify-between px-8 pt-4 pb-2 bg-transparent">
            <span className="font-semibold text-sm text-black">9:41</span>
            <div className="flex items-center gap-1">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-[3px] rounded-full bg-black" style={{ height: `${8 + i * 2}px` }} />
                ))}
              </div>
              <div className="ml-1 w-6 h-3 rounded-sm border border-black relative">
                <div className="absolute inset-[2px] right-[4px] bg-black rounded-sm" />
                <div className="absolute right-[-2px] top-1/2 -translate-y-1/2 w-[2px] h-[6px] bg-black rounded-r-full" />
              </div>
            </div>
          </div>

          {/* Screen Content with iOS Slide Transitions */}
          <div className="relative h-[calc(100%-44px)] overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              {currentScreen === "home" && (
                <motion.div
                  key="home"
                  className="absolute inset-0"
                  initial={direction === "back" ? "enterFromLeft" : "enterFromRight"}
                  animate="center"
                  exit={direction === "forward" ? "exitToLeft" : "exitToRight"}
                  variants={slideVariants}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <VTNHomeScreen onNavigate={navigateTo} />
                </motion.div>
              )}

              {currentScreen === "transcribe" && (
                <motion.div
                  key="transcribe"
                  className="absolute inset-0"
                  initial={direction === "forward" ? "enterFromRight" : "enterFromLeft"}
                  animate="center"
                  exit={direction === "back" ? "exitToRight" : "exitToLeft"}
                  variants={slideVariants}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <VTNTranscribeScreen onBack={goBack} />
                </motion.div>
              )}

              {currentScreen === "settings" && (
                <motion.div
                  key="settings"
                  className="absolute inset-0"
                  initial={direction === "forward" ? "enterFromRight" : "enterFromLeft"}
                  animate="center"
                  exit={direction === "back" ? "exitToRight" : "exitToLeft"}
                  variants={slideVariants}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <VTNSettingsScreen
                    onBack={goBack}
                    isAuthenticated={isAuthenticated}
                    onSignOut={signOut}
                    onSignIn={signIn}
                    onNavigateToAccount={() => navigateTo("account")}
                  />
                </motion.div>
              )}

              {currentScreen === "account" && (
                <motion.div
                  key="account"
                  className="absolute inset-0"
                  initial={direction === "forward" ? "enterFromRight" : "enterFromLeft"}
                  animate="center"
                  exit={direction === "back" ? "exitToRight" : "exitToLeft"}
                  variants={slideVariants}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <VTNAccountScreen
                    onBack={goBack}
                    isAuthenticated={isAuthenticated}
                    user={user}
                    hasPremiumAccess={hasPremiumAccess}
                    onDeleteAccount={deleteAccount}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
