"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"

// Diagnostic items for comparison
const diagnosticItems = [
  {
    id: "blur",
    label: "Blur Effects",
    ios: {
      title: "Native UIBlurEffect",
      description: "Hardware-accelerated Gaussian blur with real-time rendering at 120fps",
      performance: 98,
    },
    android: {
      title: "RenderScript Fallback",
      description: "Software-rendered blur with noticeable frame drops on mid-tier devices",
      performance: 62,
    },
  },
  {
    id: "sheets",
    label: "Bottom Sheets",
    ios: {
      title: "Spring Physics",
      description: "UIKit spring animations with natural momentum and rubber-banding",
      performance: 95,
    },
    android: {
      title: "Linear Interpolation",
      description: "Basic easing curves without haptic feedback or gesture prediction",
      performance: 58,
    },
  },
  {
    id: "transitions",
    label: "Transition Performance",
    ios: {
      title: "Core Animation",
      description: "Metal-backed layer compositing with implicit animation batching",
      performance: 99,
    },
    android: {
      title: "JS Bridge Overhead",
      description: "Serialization delays causing 16-32ms frame drops during navigation",
      performance: 54,
    },
  },
]

// Flickering data points component
function FlickeringDataPoints() {
  const [points, setPoints] = useState<Array<{
    id: number
    x: number
    y: number
    delay: number
    duration: number
    isIOS: boolean
  }>>([])

  useEffect(() => {
    // Generate points only on client to avoid hydration mismatch
    setPoints(
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 1 + Math.random() * 2,
        isIOS: Math.random() > 0.5,
      }))
    )
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {points.map((point) => (
        <motion.div
          key={point.id}
          className={`absolute w-1 h-1 rounded-full ${point.isIOS ? "bg-cyan-400" : "bg-pink-500"}`}
          style={{ left: `${point.x}%`, top: `${point.y}%` }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: point.duration,
            delay: point.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Performance glitch effect for Android side
function PerformanceGlitch({ isActive }: { isActive: boolean }) {
  const [glitching, setGlitching] = useState(false)

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(
      () => {
        setGlitching(true)
        setTimeout(() => setGlitching(false), 150)
      },
      3000 + Math.random() * 2000,
    )

    return () => clearInterval(interval)
  }, [isActive])

  if (!glitching) return null

  return (
    <motion.div
      className="absolute inset-0 bg-pink-500/10 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.3, 0] }}
      transition={{ duration: 0.15 }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(236, 72, 153, 0.1) 2px, rgba(236, 72, 153, 0.1) 4px)",
        }}
      />
    </motion.div>
  )
}

// Phone mockup with split view
function PhoneMockup({ sliderPosition }: { sliderPosition: number }) {
  const [hoveredElement, setHoveredElement] = useState<string | null>(null)

  return (
    <div className="relative w-[320px] h-[680px] mx-auto">
      {/* Phone frame */}
      <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-b from-zinc-700 to-zinc-900 p-[3px] shadow-2xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-20" />

        <div className="relative w-full h-full rounded-[2.8rem] overflow-hidden bg-[#0F0F1B]">
          {/* iOS Side (Left) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] to-[#0F0F1B]">
              {/* iOS App UI */}
              <div className="p-4 space-y-4">
                {/* Status bar */}
                <div className="flex justify-between items-center text-white/60 text-xs font-mono">
                  <span>9:41</span>
                  <div className="flex gap-1">
                    <div className="w-4 h-2 border border-white/60 rounded-sm">
                      <div className="w-3/4 h-full bg-cyan-400 rounded-sm" />
                    </div>
                  </div>
                </div>

                {/* Header with smooth blur */}
                <motion.div
                  className="relative rounded-2xl overflow-hidden"
                  onHoverStart={() => setHoveredElement("blur")}
                  onHoverEnd={() => setHoveredElement(null)}
                >
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-purple-500/30"
                    style={{
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                    }}
                  />
                  <div className="relative p-4">
                    <h3 className="text-white font-semibold text-lg">Now Playing</h3>
                    <p className="text-white/60 text-sm">Smooth Glass Effect</p>
                  </div>
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                </motion.div>

                {/* Album art placeholder */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-900/50 to-purple-900/50">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  {/* Smooth animated gradient overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  />
                </div>

                {/* Bottom sheet preview */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-40 rounded-t-3xl overflow-hidden"
                  onHoverStart={() => setHoveredElement("sheets")}
                  onHoverEnd={() => setHoveredElement(null)}
                  style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.5))",
                    backdropFilter: "blur(30px)",
                    WebkitBackdropFilter: "blur(30px)",
                  }}
                >
                  <div className="w-10 h-1 bg-white/30 rounded-full mx-auto mt-3" />
                  <div className="p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600" />
                      <div>
                        <p className="text-white font-medium text-sm">Cosmic Journey</p>
                        <p className="text-white/50 text-xs">Album Artwork</p>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-cyan-400 rounded-full"
                        animate={{ width: ["30%", "70%", "30%"] }}
                        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* iOS Label */}
            <div className="absolute top-16 left-4 px-2 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded">
              <span className="text-cyan-400 text-[10px] font-mono font-bold">NATIVE_FIDELITY</span>
            </div>
          </div>

          {/* Android Side (Right) */}
          <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] to-[#0F0F1B]">
              <PerformanceGlitch isActive={true} />

              {/* Android App UI - with "heavy" rendering */}
              <div className="p-4 space-y-4">
                {/* Status bar */}
                <div className="flex justify-between items-center text-white/60 text-xs font-mono">
                  <span>9:41</span>
                  <div className="flex gap-1">
                    <div className="w-4 h-2 border border-white/60 rounded-sm">
                      <div className="w-3/4 h-full bg-pink-500 rounded-sm" />
                    </div>
                  </div>
                </div>

                {/* Header with blocky blur simulation */}
                <motion.div
                  className="relative rounded-2xl overflow-hidden"
                  onHoverStart={() => setHoveredElement("blur")}
                  onHoverEnd={() => setHoveredElement(null)}
                >
                  {/* Simulated blocky/pixelated blur */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20"
                    style={{
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                      imageRendering: "pixelated",
                    }}
                  />
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(236,72,153,0.1) 4px, rgba(236,72,153,0.1) 8px)",
                    }}
                  />
                  <div className="relative p-4">
                    <h3 className="text-white font-semibold text-lg">Now Playing</h3>
                    <p className="text-white/60 text-sm">Blocky Blur Fallback</p>
                  </div>
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-pink-500" />
                </motion.div>

                {/* Album art with stuttering animation */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-pink-900/50 to-purple-900/50">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center shadow-lg shadow-pink-500/30">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  {/* Stuttering gradient overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent"
                    animate={{ opacity: [0.3, 0.6, 0.3, 0.5, 0.3] }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                      times: [0, 0.25, 0.5, 0.75, 1],
                    }}
                  />
                  {/* Frame drop indicator */}
                  <motion.div
                    className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-pink-500/30 rounded text-[8px] font-mono text-pink-300"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    ~45fps
                  </motion.div>
                </div>

                {/* Bottom sheet - linear animation */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-40 rounded-t-3xl overflow-hidden"
                  onHoverStart={() => setHoveredElement("sheets")}
                  onHoverEnd={() => setHoveredElement(null)}
                  style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.4))",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                  }}
                >
                  <div className="w-10 h-1 bg-white/30 rounded-full mx-auto mt-3" />
                  <div className="p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-400 to-pink-600" />
                      <div>
                        <p className="text-white font-medium text-sm">Cosmic Journey</p>
                        <p className="text-white/50 text-xs">Album Artwork</p>
                      </div>
                    </div>
                    {/* Progress bar with jitter */}
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-pink-400 rounded-full"
                        animate={{ width: ["30%", "32%", "30%", "35%", "33%", "70%", "68%", "70%", "30%"] }}
                        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Android Label */}
            <div className="absolute top-16 right-4 px-2 py-1 bg-pink-500/20 border border-pink-500/30 rounded">
              <span className="text-pink-400 text-[10px] font-mono font-bold">ABSTRACTION_FRICTION</span>
            </div>
          </div>

          {/* Prismatic Slider */}
          <motion.div
            className="absolute top-0 bottom-0 w-1 cursor-ew-resize z-30"
            style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
            whileHover={{ scale: 1.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-400 via-white to-pink-500 shadow-lg shadow-white/30" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl">
              <svg className="w-4 h-4 text-zinc-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hover tooltip */}
      <AnimatePresence>
        {hoveredElement && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-80 p-4 rounded-xl bg-zinc-900/90 backdrop-blur-xl border border-white/10 z-40"
          >
            {diagnosticItems
              .filter((item) => item.id === hoveredElement)
              .map((item) => (
                <div key={item.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-cyan-400 font-mono text-xs">iOS: {item.ios.title}</span>
                    <span className="text-pink-400 font-mono text-xs">Android: {item.android.title}</span>
                  </div>
                  <div className="text-white/60 text-xs text-center">{item.ios.description}</div>
                </div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Diagnostic column component
function DiagnosticColumn({ side, items }: { side: "ios" | "android"; items: typeof diagnosticItems }) {
  const isIOS = side === "ios"

  return (
    <div className="space-y-4">
      <h4 className={`text-xs font-mono font-bold ${isIOS ? "text-cyan-400" : "text-pink-400"}`}>
        {isIOS ? "iOS_NATIVE" : "ANDROID_RN"}
      </h4>
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: isIOS ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          viewport={{ once: true }}
          className={`p-4 rounded-xl border ${
            isIOS
              ? "bg-cyan-500/5 border-cyan-500/20 hover:border-cyan-500/40"
              : "bg-pink-500/5 border-pink-500/20 hover:border-pink-500/40"
          } transition-colors group cursor-pointer`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/80 text-sm font-medium">{item.label}</span>
            <span className={`text-xs font-mono ${isIOS ? "text-cyan-400" : "text-pink-400"}`}>
              {isIOS ? item.ios.performance : item.android.performance}%
            </span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${isIOS ? "bg-cyan-400" : "bg-pink-500"}`}
              initial={{ width: 0 }}
              whileInView={{ width: `${isIOS ? item.ios.performance : item.android.performance}%` }}
              transition={{ duration: 1, delay: index * 0.1 }}
              viewport={{ once: true }}
            />
          </div>
          <p className="text-white/40 text-xs mt-2 group-hover:text-white/60 transition-colors">
            {isIOS ? item.ios.description : item.android.description}
          </p>
        </motion.div>
      ))}
    </div>
  )
}

export function TalesFMRealityCheckSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const phoneRef = useRef<HTMLDivElement>(null)

  // Handle slider drag
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !phoneRef.current) return

    const rect = phoneRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = Math.max(10, Math.min(90, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !phoneRef.current) return

    const rect = phoneRef.current.getBoundingClientRect()
    const x = e.touches[0].clientX - rect.left
    const percentage = Math.max(10, Math.min(90, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-32 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => setIsDragging(false)}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#0F0F1B]" />
      <FlickeringDataPoints />

      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-cyan-500/5 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-pink-500/5 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#CCFF00] font-mono text-xs tracking-widest mb-4 block">LAB_02: THE_REALITY_CHECK</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Visual Parity ≠ Experience Parity
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Drag the slider to reveal the rendering differences between native iOS and React Native on Android
          </p>
        </motion.div>

        {/* Main comparison layout */}
        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-start">
          {/* iOS Diagnostic Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block"
          >
            <DiagnosticColumn side="ios" items={diagnosticItems} />
          </motion.div>

          {/* Phone Mockup */}
          <motion.div
            ref={phoneRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
          >
            <PhoneMockup sliderPosition={sliderPosition} />

            {/* Slider instruction */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/40 text-sm"
            >
              <motion.svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ x: [-4, 4, -4] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
              </motion.svg>
              <span className="font-mono text-xs">DRAG_TO_COMPARE</span>
            </motion.div>
          </motion.div>

          {/* Android Diagnostic Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block"
          >
            <DiagnosticColumn side="android" items={diagnosticItems} />
          </motion.div>
        </div>

        {/* Mobile diagnostic cards */}
        <div className="lg:hidden mt-12 grid sm:grid-cols-2 gap-6">
          <DiagnosticColumn side="ios" items={diagnosticItems} />
          <DiagnosticColumn side="android" items={diagnosticItems} />
        </div>

        {/* Engineering Insight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10">
            <div className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
            <span className="text-white/60 font-mono text-sm">
              ENGINEERING_JUDGMENT: Framework abstraction costs must be measured in user experience, not code elegance
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
