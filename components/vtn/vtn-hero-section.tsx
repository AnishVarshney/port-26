"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ArrowLeft, Users, CheckCircle2, Smartphone, Watch, Mic, Brain, ChevronRight } from "lucide-react"
import Link from "next/link"

// Revision history data
const revisionHistory = [
  { version: "v1.0", label: "Hybrid", status: "deprecated", year: "2023" },
  { version: "v2.0", label: "Native", status: "stable", year: "2024" },
  { version: "v2.5", label: "Ecosystem", status: "current", year: "2024" },
]

// Log ticker messages
const logMessages = [
  "[LOG]: 10k Android users active...",
  "[LOG]: iOS Native Migration Stable...",
  "[LOG]: WatchOS Bridge Connected...",
  "[LOG]: Real-time transcription online...",
  "[LOG]: Cloud sync operational...",
  "[LOG]: AI engine v3.2 deployed...",
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
  const [selectedRevision, setSelectedRevision] = useState("v2.5")
  const [currentLogIndex, setCurrentLogIndex] = useState(0)
  const [scanComplete, setScanComplete] = useState(false)
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  // Log ticker effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogIndex((prev) => (prev + 1) % logMessages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Scan animation on load
  useEffect(() => {
    const timer = setTimeout(() => setScanComplete(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden" style={{ background: "#050505" }}>
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 122, 255, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 122, 255, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
        {/* Fine grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 122, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 122, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "10px 10px",
          }}
        />
        {/* Schematic coordinate markers */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute font-mono text-[10px] text-[#007AFF]/20"
            style={{ left: `${20 + i * 15}%`, top: "10px" }}
          >
            x:{(20 + i * 15).toFixed(0)}
          </div>
        ))}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute font-mono text-[10px] text-[#007AFF]/20"
            style={{ left: "10px", top: `${20 + i * 15}%` }}
          >
            y:{(20 + i * 15).toFixed(0)}
          </div>
        ))}
      </div>

      {/* Scanning Laser Line Animation */}
      <AnimatePresence>
        {!scanComplete && (
          <motion.div
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#007AFF] to-transparent z-50"
            initial={{ top: 0 }}
            animate={{ top: "100%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            style={{ boxShadow: "0 0 20px #007AFF, 0 0 40px #007AFF" }}
          />
        )}
      </AnimatePresence>

      {/* Live Stat Ticker */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: scanComplete ? 1 : 0, y: scanComplete ? 0 : -20 }}
        transition={{ delay: 0.2 }}
        className="absolute top-0 left-0 right-0 bg-[#0A0A0A]/80 border-b border-[#007AFF]/20 py-2 z-40 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link
              href="/#work"
              className="flex items-center gap-2 text-white/60 hover:text-[#007AFF] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-mono text-xs">Back to Portfolio</span>
            </Link>
            <motion.div
              key={currentLogIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="font-mono text-xs text-[#007AFF]"
            >
              {logMessages[currentLogIndex]}
            </motion.div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span className="font-mono text-xs text-[#10B981]">App Store: Approved</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 min-h-[80vh] items-center">
          {/* Left Side: The Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: scanComplete ? 1 : 0, x: scanComplete ? 0 : -30 }}
            transition={{ delay: 0.5 }}
            className="relative"
          >
            {/* Architecture Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#007AFF]/10 border border-[#007AFF]/30 mb-6"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#007AFF] animate-pulse" />
              <span className="font-mono text-xs text-[#007AFF]">MIGRATED: React Native → Swift Native</span>
            </motion.div>

            {/* Project Title */}
            <h1
              className="text-7xl md:text-8xl lg:text-9xl font-bold text-white mb-4 tracking-tight"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              VTN
            </h1>
            <h2
              className="text-2xl md:text-3xl font-light text-white/80 mb-8"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              VoiceToNotes
            </h2>

            {/* Revision History */}
            <div className="mb-8">
              <span className="font-mono text-xs text-white/40 mb-3 block">// revision_history</span>
              <div className="flex flex-col gap-2">
                {revisionHistory.map((rev, index) => (
                  <motion.button
                    key={rev.version}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    onClick={() => setSelectedRevision(rev.version)}
                    className={`flex items-center gap-4 px-4 py-2 rounded-lg border transition-all duration-300 ${
                      selectedRevision === rev.version
                        ? "bg-[#007AFF]/10 border-[#007AFF]/50 text-white"
                        : "bg-transparent border-white/10 text-white/50 hover:border-white/20 hover:text-white/70"
                    }`}
                  >
                    <span className="font-mono text-sm font-bold">{rev.version}</span>
                    <span className="font-mono text-sm">{rev.label}</span>
                    <span
                      className={`ml-auto font-mono text-xs px-2 py-0.5 rounded ${
                        rev.status === "current"
                          ? "bg-[#10B981]/20 text-[#10B981]"
                          : rev.status === "stable"
                            ? "bg-[#007AFF]/20 text-[#007AFF]"
                            : "bg-white/10 text-white/40"
                      }`}
                    >
                      {rev.status}
                    </span>
                    <span className="font-mono text-xs text-white/30">{rev.year}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Key Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="grid grid-cols-3 gap-4"
            >
              <div className="relative p-4 rounded-lg bg-[#0A0A0A] border border-white/10">
                <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-[#10B981]" />
                <Users className="w-5 h-5 text-[#10B981] mb-2" />
                <div className="font-mono text-2xl font-bold text-white">18K+</div>
                <div className="font-mono text-xs text-white/40">Total Users</div>
              </div>
              <div className="relative p-4 rounded-lg bg-[#0A0A0A] border border-white/10">
                <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-[#007AFF]" />
                <CheckCircle2 className="w-5 h-5 text-[#007AFF] mb-2" />
                <div className="font-mono text-2xl font-bold text-white">15</div>
                <div className="font-mono text-xs text-white/40">Day Releases</div>
              </div>
              <div className="relative p-4 rounded-lg bg-[#0A0A0A] border border-white/10">
                <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-[#F59E0B]" />
                <Smartphone className="w-5 h-5 text-[#F59E0B] mb-2" />
                <div className="font-mono text-2xl font-bold text-white">3</div>
                <div className="font-mono text-xs text-white/40">Platforms</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side: Exploded View Hero Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: scanComplete ? 1 : 0, x: scanComplete ? 0 : 30 }}
            transition={{ delay: 0.6 }}
            className="relative perspective-1000"
          >
            {/* Exploded View Container */}
            <div className="relative h-[500px] md:h-[600px]">
              {/* Phone Frame Base */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[560px] rounded-[3rem] border-2 border-white/10 bg-[#0A0A0A]"
                style={{
                  transform: "perspective(1000px) rotateY(-5deg) rotateX(5deg)",
                  boxShadow: "0 25px 50px -12px rgba(0, 122, 255, 0.15)",
                }}
              >
                {/* Screen Content */}
                <div className="absolute inset-3 rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F]">
                  {/* Status Bar */}
                  <div className="flex items-center justify-between px-6 py-2 bg-black/50">
                    <span className="font-mono text-[10px] text-white/60">9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-2 rounded-sm bg-white/60" />
                    </div>
                  </div>
                  {/* App Header */}
                  <div className="px-6 py-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Mic className="w-5 h-5 text-[#007AFF]" />
                      <span className="font-semibold text-white">VoiceToNotes</span>
                    </div>
                    {/* Recording Card */}
                    <div className="bg-[#1A1A1A] rounded-2xl p-4 border border-white/5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-[#007AFF]/20 flex items-center justify-center">
                          <Brain className="w-5 h-5 text-[#007AFF]" />
                        </div>
                        <div>
                          <div className="text-sm text-white font-medium">Meeting Notes</div>
                          <div className="text-xs text-white/40">2 min ago</div>
                        </div>
                      </div>
                      <div className="h-8 bg-[#007AFF]/10 rounded-lg flex items-center px-3">
                        <div className="flex gap-0.5">
                          {[...Array(20)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-1 bg-[#007AFF] rounded-full"
                              animate={{ height: [8, 16, 8] }}
                              transition={{
                                duration: 0.5,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: i * 0.05,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Exploded UI Layers */}
              {uiLayers.map((layer, index) => (
                <motion.div
                  key={layer.id}
                  className="absolute left-1/2 top-1/2 w-[260px] h-[400px] rounded-2xl border cursor-pointer transition-all duration-300"
                  style={{
                    borderColor: `${layer.color}40`,
                    backgroundColor: `${layer.color}05`,
                    transform: `
                      perspective(1000px) 
                      translateX(-50%) 
                      translateY(-50%) 
                      translateZ(${layer.z + (hoveredLayer === layer.id ? 20 : 0)}px)
                      rotateY(-5deg) 
                      rotateX(5deg)
                    `,
                    boxShadow:
                      hoveredLayer === layer.id ? `0 0 30px ${layer.color}30, inset 0 0 20px ${layer.color}10` : "none",
                  }}
                  onMouseEnter={() => setHoveredLayer(layer.id)}
                  onMouseLeave={() => setHoveredLayer(null)}
                  initial={{ opacity: 0, z: -50 }}
                  animate={{ opacity: 1, z: layer.z }}
                  transition={{ delay: 1 + index * 0.15 }}
                >
                  {/* Layer Label */}
                  <div
                    className="absolute -right-4 top-4 flex items-center gap-2"
                    style={{ transform: "translateX(100%)" }}
                  >
                    <div className="w-8 h-px" style={{ backgroundColor: `${layer.color}60` }} />
                    <div className="flex flex-col items-start">
                      <span className="font-mono text-[10px] font-bold" style={{ color: layer.color }}>
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
                  </div>
                </motion.div>
              ))}

              {/* Watch Companion Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 right-0 flex items-center gap-3 px-4 py-2 rounded-full bg-[#0A0A0A] border border-white/10"
              >
                <Watch className="w-4 h-4 text-[#007AFF]" />
                <span className="font-mono text-xs text-white/60">WatchOS Companion</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Data Pulse Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="relative h-px bg-gradient-to-r from-transparent via-[#007AFF]/50 to-transparent mt-16"
        >
          <motion.div
            className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-[#007AFF] to-transparent"
            animate={{ left: ["0%", "100%"] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </motion.div>

        {/* Emotional Goal Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="text-center mt-16"
        >
          <p className="font-mono text-sm text-white/40 mb-4">// mission_statement</p>
          <h3 className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            From a <span className="text-[#007AFF]">1.5-month solo sprint</span> with zero backend knowledge to a{" "}
            <span className="text-[#10B981]">native iOS/WatchOS ecosystem</span> serving 18,000+ users.
          </h3>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.3 }}
            className="flex items-center justify-center gap-2 mt-6 text-white/40"
          >
            <span className="font-mono text-xs">Scroll to explore the journey</span>
            <ChevronRight className="w-4 h-4 animate-pulse" />
          </motion.div>
        </motion.div>
      </div>

      {/* Sticky Side Nav Preview (appears on scroll) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: scanComplete ? 0.5 : 0, x: scanComplete ? 0 : -20 }}
        whileHover={{ opacity: 1 }}
        className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
      >
        <div className="flex flex-col gap-2">
          {["Solo MVP", "Scaling RN", "Native Pivot", "Ecosystem"].map((phase, i) => (
            <div key={phase} className="flex items-center gap-2 group cursor-pointer">
              <div
                className={`w-1 h-8 rounded-full transition-all duration-300 ${i === 0 ? "bg-[#007AFF]" : "bg-white/20 group-hover:bg-white/40"}`}
              />
              <span
                className={`font-mono text-[10px] transition-all duration-300 ${i === 0 ? "text-[#007AFF]" : "text-white/30 group-hover:text-white/60"}`}
              >
                {phase}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
