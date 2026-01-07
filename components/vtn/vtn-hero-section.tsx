"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Clock, Mic, Brain, Zap, Watch } from "lucide-react"
import Link from "next/link"
import { VTNPhoneFrame } from "./vtn-phone-frame"

// Revision history data
const revisions = [
  {
    version: "v1.0",
    label: "Hybrid",
    status: "deprecated",
    tech: "React Native",
    date: "Jan 2024",
  },
  {
    version: "v2.0",
    label: "Native",
    status: "stable",
    tech: "Swift + UIKit",
    date: "Jun 2024",
  },
  {
    version: "v2.5",
    label: "Ecosystem",
    status: "current",
    tech: "iOS + WatchOS",
    date: "Dec 2024",
  },
]

// Exploded view layers
const uiLayers = [
  {
    id: "typography",
    label: "Typography Layer",
    z: 60,
    color: "#3B82F6",
    achievement: "Custom SF Pro Display Integration",
  },
  { id: "icons", label: "Icon System", z: 40, color: "#10B981", achievement: "SF Symbols + Custom Glyphs" },
  { id: "ai-logic", label: "AI Logic Layer", z: 20, color: "#F59E0B", achievement: "Real-time Transcription Pipeline" },
  { id: "storyboard", label: "Storyboard UI", z: 0, color: "#8B5CF6", achievement: "Custom Storyboard Architecture" },
]

export function VTNHeroSection() {
  const [scanComplete, setScanComplete] = useState(false)
  const [selectedRevision, setSelectedRevision] = useState(1)
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null)
  const [logIndex, setLogIndex] = useState(0)

  const logs = [
    "Initializing VoiceToNotes case study...",
    "Loading project metrics: 18,000+ users",
    "Parsing architecture: Swift + UIKit",
    "Mapping ecosystem: iOS + WatchOS",
    "Ready for exploration.",
  ]

  useEffect(() => {
    const timer = setTimeout(() => setScanComplete(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (logIndex < logs.length - 1) {
      const timer = setTimeout(() => setLogIndex((prev) => prev + 1), 800)
      return () => clearTimeout(timer)
    }
  }, [logIndex, logs.length])

  return (
    <section className="relative min-h-screen bg-[#050505] overflow-hidden">
      {/* Scanning Laser Effect */}
      <AnimatePresence>
        {!scanComplete && (
          <motion.div
            initial={{ top: 0 }}
            animate={{ top: "100%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "linear" }}
            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#007AFF] to-transparent z-50"
            style={{
              boxShadow: "0 0 30px 10px rgba(0, 122, 255, 0.3)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Live Log Ticker */}
      <div className="absolute top-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-b border-white/5 py-2 px-4 z-40">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#007AFF] animate-pulse" />
          <motion.span
            key={logIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-xs text-white/60"
          >
            {logs[logIndex]}
          </motion.span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: scanComplete ? 1 : 0, x: scanComplete ? 0 : -20 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-sm">cd ../work</span>
          </Link>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side: Revision History & Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: scanComplete ? 1 : 0, x: scanComplete ? 0 : -30 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            {/* Project Title */}
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-3 mb-4"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#007AFF] to-[#00C7FF] flex items-center justify-center">
                  <Mic className="w-5 h-5 text-white" />
                </div>
                <span className="font-mono text-xs text-white/40 uppercase tracking-wider">Case Study</span>
              </motion.div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">VoiceToNotes</h1>
              <p className="text-lg text-white/60 max-w-md">
                From React Native MVP to native iOS ecosystem serving{" "}
                <span className="text-[#007AFF] font-semibold">18,000+</span> users with real-time voice transcription.
              </p>
            </div>

            {/* Revision History Selector */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs text-white/40 uppercase tracking-wider">Revision History</h3>
              <div className="space-y-2">
                {revisions.map((rev, index) => (
                  <motion.button
                    key={rev.version}
                    onClick={() => setSelectedRevision(index)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                      selectedRevision === index
                        ? "bg-[#007AFF]/10 border-[#007AFF]/50"
                        : "bg-white/5 border-white/10 hover:border-white/20"
                    }`}
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span
                          className={`font-mono text-sm font-bold ${
                            selectedRevision === index ? "text-[#007AFF]" : "text-white/60"
                          }`}
                        >
                          {rev.version}
                        </span>
                        <span className="text-white font-medium">{rev.label}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase ${
                            rev.status === "current"
                              ? "bg-green-500/20 text-green-400"
                              : rev.status === "stable"
                                ? "bg-blue-500/20 text-blue-400"
                                : "bg-white/10 text-white/40"
                          }`}
                        >
                          {rev.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-white/40">
                        <Clock className="w-3 h-3" />
                        <span className="font-mono text-xs">{rev.date}</span>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-white/40">{rev.tech}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Brain, label: "AI Pipeline", value: "Real-time" },
                { icon: Zap, label: "Crash Rate", value: "0.5%" },
                { icon: Watch, label: "Platforms", value: "iOS + Watch" },
              ].map((metric) => (
                <div key={metric.label} className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <metric.icon className="w-5 h-5 text-[#007AFF] mb-2" />
                  <div className="font-mono text-xs text-white/40 mb-1">{metric.label}</div>
                  <div className="text-white font-semibold">{metric.value}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Interactive Phone Frame */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: scanComplete ? 1 : 0, x: scanComplete ? 0 : 30 }}
            transition={{ delay: 0.6 }}
            className="relative flex justify-center"
          >
            <VTNPhoneFrame />

            {/* Floating UI Layer Labels */}
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 space-y-6 hidden xl:block">
              {uiLayers.map((layer, index) => (
                <motion.div
                  key={layer.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.15 }}
                  className="flex items-center gap-2 cursor-pointer group"
                  onMouseEnter={() => setHoveredLayer(layer.id)}
                  onMouseLeave={() => setHoveredLayer(null)}
                >
                  <div
                    className="w-8 h-px transition-all duration-300"
                    style={{
                      backgroundColor: hoveredLayer === layer.id ? layer.color : `${layer.color}40`,
                    }}
                  />
                  <div className="flex flex-col items-start">
                    <span
                      className="font-mono text-[10px] font-bold transition-colors duration-300"
                      style={{
                        color: hoveredLayer === layer.id ? layer.color : `${layer.color}80`,
                      }}
                    >
                      {layer.label}
                    </span>
                    <AnimatePresence>
                      {hoveredLayer === layer.id && (
                        <motion.span
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="font-mono text-[9px] text-white/60 max-w-[120px]"
                        >
                          {layer.achievement}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Watch Companion Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: scanComplete ? 1 : 0, scale: scanComplete ? 1 : 0.8 }}
              transition={{ delay: 1.2 }}
              className="absolute -bottom-8 -left-8 p-3 rounded-2xl bg-[#1A1A1A] border border-white/10"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#007AFF] to-[#00C7FF] flex items-center justify-center">
                  <Watch className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-[10px] text-white/40 font-mono">COMPANION</div>
                  <div className="text-xs text-white font-medium">WatchOS App</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Blueprint Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 122, 255, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 122, 255, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </section>
  )
}
