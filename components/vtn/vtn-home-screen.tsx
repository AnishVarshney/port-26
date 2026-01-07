"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Bell, Settings, Search, FileText, Mic, Sparkles, Pencil, Calendar, Plus, ScanLine } from "lucide-react"

interface VTNHomeScreenProps {
  onNavigate: (screen: "transcribe" | "settings") => void
  userName?: string
}

// Feature card data
const features = [
  {
    id: "scan",
    title: "Scan",
    description: "Notes, Scripts, Ideas...",
    icon: ScanLine,
    screen: null,
  },
  {
    id: "transcribe",
    title: "Transcribe",
    description: "Voice, Recordings, Ideas...",
    icon: Mic,
    screen: "transcribe" as const,
  },
  {
    id: "ask-ai",
    title: "Ask AI",
    description: "Summarise, Re-write, Gr...",
    icon: Sparkles,
    screen: null,
  },
  {
    id: "write",
    title: "Write Yourself",
    description: "Stories, Notes, Ideas, Scr...",
    icon: Pencil,
    screen: null,
  },
]

// Reusable Feature Block component
function FeatureBlock({
  title,
  description,
  icon: Icon,
  onTap,
}: {
  title: string
  description: string
  icon: React.ElementType
  onTap?: () => void
}) {
  return (
    <motion.button
      onClick={onTap}
      whileTap={{ scale: 0.96 }}
      className="flex flex-col items-start p-4 bg-white rounded-[18px] text-left w-full"
      style={{
        boxShadow: "0 2px 8px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)",
      }}
    >
      <div className="w-8 h-8 rounded-lg bg-[#F5F5F5] flex items-center justify-center mb-3">
        <Icon className="w-4 h-4 text-black" strokeWidth={1.5} />
      </div>
      <span className="font-semibold text-[13px] text-black leading-tight">{title}</span>
      <span className="text-[11px] text-[#7E7E7E] mt-0.5 truncate w-full">{description}</span>
    </motion.button>
  )
}

// Search Bar component
function SearchBar() {
  return (
    <div className="flex items-center gap-2 px-4 py-3 rounded-full border border-[#E5E5E5] bg-[#FAFAFA]">
      <Search className="w-4 h-4 text-[#7E7E7E]" strokeWidth={2} />
      <span className="text-[15px] text-[#7E7E7E]">Search</span>
    </div>
  )
}

// Bottom Navigation component
function BottomNav() {
  const currentDay = new Date().getDate()

  return (
    <div className="absolute bottom-5 left-4 right-4 flex items-center justify-between">
      {/* Control Pill */}
      <motion.div
        className="flex items-center gap-1 p-1.5 bg-black rounded-full"
        style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}
      >
        {/* Notes Button */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center"
        >
          <FileText className="w-5 h-5 text-black" strokeWidth={1.5} />
        </motion.button>
        {/* Calendar Button */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          className="w-10 h-10 rounded-full bg-[#2A2A2A] flex items-center justify-center relative"
        >
          <Calendar className="w-5 h-5 text-white/70" strokeWidth={1.5} />
          <span className="absolute bottom-1 text-[8px] font-bold text-white/90">{currentDay}</span>
        </motion.button>
      </motion.div>

      {/* Add FAB */}
      <motion.button
        whileTap={{ scale: 0.92 }}
        className="w-14 h-14 rounded-full bg-black flex items-center justify-center"
        style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}
      >
        <Plus className="w-7 h-7 text-white" strokeWidth={2} />
      </motion.button>
    </div>
  )
}

export function VTNHomeScreen({ onNavigate, userName = "Joey" }: VTNHomeScreenProps) {
  const hasUnread = true // Demo: show notification badge

  return (
    <div className="flex flex-col h-full bg-[#F9F9F9]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-2 pb-3">
        <motion.button whileTap={{ scale: 0.92 }} className="relative p-2 -ml-2">
          <Bell className="w-6 h-6 text-black" strokeWidth={1.5} />
          {hasUnread && <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />}
        </motion.button>
        <motion.button whileTap={{ scale: 0.92 }} className="p-2 -mr-2" onClick={() => onNavigate("settings")}>
          <Settings className="w-6 h-6 text-black" strokeWidth={1.5} />
        </motion.button>
      </div>

      {/* Search */}
      <div className="px-5 mb-5">
        <SearchBar />
      </div>

      {/* Hero Greeting */}
      <div className="px-5 mb-6">
        <p className="text-[22px] font-semibold text-[#7E7E7E] leading-tight">Hi {userName},</p>
        <h1 className="text-[28px] font-bold text-black leading-tight mt-1">
          Continue
          <br />
          where you left
        </h1>
      </div>

      {/* Bento Feature Grid */}
      <div className="px-5 grid grid-cols-2 gap-3 pb-28">
        {features.map((feature) => (
          <FeatureBlock
            key={feature.id}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            onTap={feature.screen ? () => onNavigate(feature.screen) : undefined}
          />
        ))}
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
