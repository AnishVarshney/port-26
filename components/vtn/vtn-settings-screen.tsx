"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronLeft,
  User,
  SlidersHorizontal,
  Shield,
  FileText,
  Info,
  MessageSquare,
  LogOut,
  LogIn,
} from "lucide-react"

interface VTNSettingsScreenProps {
  onBack: () => void
  isAuthenticated: boolean
  onSignOut: () => void
  onSignIn: () => void
  onNavigateToAccount: () => void
}

// Settings option data
const mainSettings = [
  { id: "account", title: "Account", icon: User, type: "navigate" as const },
  { id: "personalize", title: "Personalize", icon: SlidersHorizontal, type: "navigate" as const },
  { id: "privacy", title: "Privacy", icon: Shield, type: "external" as const, url: "https://voicetonotes.com/privacy" },
  {
    id: "terms",
    title: "Terms of Services",
    icon: FileText,
    type: "external" as const,
    url: "https://voicetonotes.com/terms",
  },
  { id: "about", title: "About", icon: Info, type: "external" as const, url: "https://voicetonotes.com/about" },
]

const secondarySettings = [
  {
    id: "feedback",
    title: "Feedback",
    icon: MessageSquare,
    type: "external" as const,
    url: "mailto:feedback@voicetonotes.com",
  },
]

// Reusable Settings Option component
function SettingsOption({
  title,
  icon: Icon,
  onTap,
  isLast = false,
  variant = "default",
}: {
  title: string
  icon: React.ElementType
  onTap: () => void
  isLast?: boolean
  variant?: "default" | "danger"
}) {
  return (
    <motion.button
      onClick={onTap}
      whileTap={{ scale: 0.98, opacity: 0.7 }}
      className="w-full flex items-center gap-4 px-4 py-3.5 text-left"
    >
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
          variant === "danger" ? "bg-red-50" : "bg-[#F5F5F5]"
        }`}
      >
        <Icon
          className={`w-[18px] h-[18px] ${variant === "danger" ? "text-red-500" : "text-black"}`}
          strokeWidth={1.5}
        />
      </div>
      <span className={`text-[15px] font-medium flex-1 ${variant === "danger" ? "text-red-500" : "text-black"}`}>
        {title}
      </span>
      {!isLast && <div className="absolute bottom-0 left-16 right-4 h-[0.5px] bg-[#E5E5E5]" />}
    </motion.button>
  )
}

// Pro Upgrade Card component
function ProCard() {
  return (
    <motion.div
      className="mx-5 mb-5 p-4 bg-white rounded-[20px] flex items-center gap-4"
      style={{
        boxShadow: "0 2px 12px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.02)",
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Text Content */}
      <div className="flex-1">
        <h3 className="text-[16px] font-semibold text-black leading-tight">Want more features?</h3>
        <p className="text-[13px] text-black/60 mt-1 leading-snug">Upgrade to unlock additional features</p>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="mt-3 px-5 py-2 bg-black text-white text-[13px] font-semibold rounded-lg"
        >
          Get Pro
        </motion.button>
      </div>

      {/* 3D Geometric Illustration */}
      <div className="w-20 h-20 relative">
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
            transform: "rotate(-12deg) skewY(-5deg)",
          }}
        />
        <div
          className="absolute inset-2 rounded-xl bg-white/20 backdrop-blur-sm"
          style={{
            transform: "rotate(-12deg) skewY(-5deg)",
          }}
        />
        <div
          className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-yellow-400/80"
          style={{
            transform: "rotate(15deg)",
          }}
        />
        <div className="absolute bottom-4 right-2 w-6 h-6 rounded-full bg-cyan-400/80" />
      </div>
    </motion.div>
  )
}

// Sign Out Confirmation Modal
function SignOutModal({
  isOpen,
  onCancel,
  onConfirm,
}: {
  isOpen: boolean
  onCancel: () => void
  onConfirm: () => void
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="absolute inset-0 bg-black/40 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute left-4 right-4 top-1/2 -translate-y-1/2 bg-white rounded-2xl p-5 z-50"
            style={{
              boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
            }}
          >
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-3">
                <LogOut className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-[18px] font-semibold text-black mb-1">Sign Out?</h3>
              <p className="text-[14px] text-black/60 mb-5">Are you sure you want to sign out of your account?</p>

              <div className="flex gap-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={onCancel}
                  className="flex-1 py-3 rounded-xl bg-[#F5F5F5] text-black font-semibold text-[15px]"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={onConfirm}
                  className="flex-1 py-3 rounded-xl bg-red-500 text-white font-semibold text-[15px]"
                >
                  Sign Out
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export function VTNSettingsScreen({
  onBack,
  isAuthenticated,
  onSignOut,
  onSignIn,
  onNavigateToAccount,
}: VTNSettingsScreenProps) {
  const [showSignOutModal, setShowSignOutModal] = useState(false)

  const handleOptionTap = (option: (typeof mainSettings)[0] | (typeof secondarySettings)[0]) => {
    if (option.id === "account") {
      onNavigateToAccount()
    } else if (option.type === "external" && "url" in option) {
      window.open(option.url, "_blank", "noopener,noreferrer")
    } else {
      console.log(`Navigate to ${option.id}`)
    }
  }

  const handleAuthAction = () => {
    if (isAuthenticated) {
      setShowSignOutModal(true)
    } else {
      onSignIn()
    }
  }

  const handleSignOutConfirm = () => {
    setShowSignOutModal(false)
    onSignOut()
  }

  return (
    <div className="flex flex-col h-full bg-[#F9F9F9] relative">
      {/* Header */}
      <div className="flex items-center justify-center px-5 pt-2 pb-4 relative">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="absolute left-4 w-9 h-9 rounded-full bg-black flex items-center justify-center"
          aria-label="Go back"
        >
          <ChevronLeft className="w-5 h-5 text-white" strokeWidth={2} />
        </motion.button>
        <h1 className="text-[18px] font-bold text-black">Settings</h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-8">
        {/* Pro Upgrade Card */}
        <ProCard />

        {/* Main Settings Card */}
        <div
          className="mx-5 mb-4 bg-white rounded-[20px] overflow-hidden"
          style={{
            boxShadow: "0 2px 12px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)",
          }}
        >
          {/* Main List */}
          <div className="relative">
            {mainSettings.map((option, index) => (
              <div key={option.id} className="relative">
                <SettingsOption
                  title={option.title}
                  icon={option.icon}
                  onTap={() => handleOptionTap(option)}
                  isLast={index === mainSettings.length - 1}
                />
                {index < mainSettings.length - 1 && (
                  <div className="absolute bottom-0 left-16 right-4 h-[0.5px] bg-[#E8E8E8]" />
                )}
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-[8px] bg-[#F5F5F5]" />

          {/* Secondary List */}
          <div className="relative">
            {secondarySettings.map((option, index) => (
              <div key={option.id} className="relative">
                <SettingsOption
                  title={option.title}
                  icon={option.icon}
                  onTap={() => handleOptionTap(option)}
                  isLast={index === secondarySettings.length - 1}
                />
                {index < secondarySettings.length - 1 && (
                  <div className="absolute bottom-0 left-16 right-4 h-[0.5px] bg-[#E8E8E8]" />
                )}
              </div>
            ))}

            {/* Sign Out / Sign In Option */}
            <div className="relative">
              <div className="absolute top-0 left-16 right-4 h-[0.5px] bg-[#E8E8E8]" />
              <SettingsOption
                title={isAuthenticated ? "Sign out" : "Sign In / Sign Up"}
                icon={isAuthenticated ? LogOut : LogIn}
                onTap={handleAuthAction}
                isLast
                variant={isAuthenticated ? "danger" : "default"}
              />
            </div>
          </div>
        </div>

        {/* App Version */}
        <p className="text-center text-[12px] text-black/40 mt-4">VoiceToNotes v2.5.0</p>
      </div>

      {/* Sign Out Confirmation Modal */}
      <SignOutModal
        isOpen={showSignOutModal}
        onCancel={() => setShowSignOutModal(false)}
        onConfirm={handleSignOutConfirm}
      />
    </div>
  )
}
