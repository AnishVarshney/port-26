"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"

// Behavioral Profile Cards Data
const behavioralProfiles = [
  {
    id: "rendering",
    title: "RENDERING_ENGINE",
    subtitle: "GIF/Video Parity Struggle",
    color: "#FF007F", // Electric Pink
    icon: "layers",
    iosIssue: "Native GIF rendering with smooth 60fps playback",
    androidIssue: "Video fallback required, memory spikes on older devices",
    metric: { label: "Frame Drops", ios: "0.2%", android: "4.7%" },
    description: "The GIF vs Video rendering dichotomy forced adaptive media selection based on device capabilities.",
  },
  {
    id: "gestures",
    title: "GESTURE_PHYSICS",
    subtitle: "Bottom Sheet Behavior Gap",
    color: "#EBFF00", // Acid Yellow
    icon: "hand",
    iosIssue: "Spring-based gestures with native haptic feedback",
    androidIssue: "Linear interpolation, inconsistent touch velocity",
    metric: { label: "Gesture Latency", ios: "16ms", android: "48ms" },
    description: "iOS spring physics vs Android's linear approach created fundamentally different user experiences.",
  },
  {
    id: "motion",
    title: "MOTION_LOGIC",
    subtitle: "Refresh Rate Optimization",
    color: "#00FFFF", // Cyan
    icon: "zap",
    iosIssue: "ProMotion 120Hz adaptive rendering",
    androidIssue: "60Hz baseline with inconsistent high-refresh support",
    metric: { label: "Animation FPS", ios: "120", android: "60" },
    description: "Variable refresh rate handling required conditional animation timing adjustments.",
  },
  {
    id: "blur",
    title: "BLUR_FRAGMENT",
    subtitle: "UI Effect Performance Cost",
    color: "#BF00FF", // Bright Purple
    icon: "droplet",
    iosIssue: "Hardware-accelerated UIBlurEffect",
    androidIssue: "Software blur with significant CPU overhead",
    metric: { label: "Render Cost", ios: "2ms", android: "18ms" },
    description: "Blur effects that cost 2ms on iOS consumed 18ms on Android, forcing conditional visual degradation.",
  },
]

// Mixer Channels Data
const mixerChannels = [
  { id: "buffer", label: "BUFFER_TIME", before: 2400, after: 340, unit: "ms", color: "#00FF41" },
  { id: "switch", label: "STATION_SWITCH", before: 1800, after: 180, unit: "ms", color: "#00FF41" },
  { id: "cache", label: "CACHE_HIT_RATE", before: 23, after: 94, unit: "%", color: "#00FF41", invert: true },
  { id: "memory", label: "MEMORY_USAGE", before: 186, after: 52, unit: "MB", color: "#00FF41" },
  { id: "startup", label: "COLD_START", before: 3200, after: 890, unit: "ms", color: "#00FF41" },
]

// Icon Components
function LayersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  )
}

function HandIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v0M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v6M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8" />
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.9-5.8-2.4l-3.6-4.2a2 2 0 0 1 2.8-2.8L6 14" />
    </svg>
  )
}

function ZapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  )
}

function DropletIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  )
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  layers: LayersIcon,
  hand: HandIcon,
  zap: ZapIcon,
  droplet: DropletIcon,
}

// Behavioral Card Component
function BehavioralCard({
  profile,
  index,
}: {
  profile: (typeof behavioralProfiles)[0]
  index: number
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [showGhost, setShowGhost] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })

  const IconComponent = iconMap[profile.icon]

  // Calculate sine wave offset for positioning
  const sineOffset = Math.sin((index / behavioralProfiles.length) * Math.PI) * 40

  return (
    <motion.div
      ref={cardRef}
      className="relative"
      style={{ marginTop: `${sineOffset}px` }}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              scale: 1,
            }
          : {}
      }
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        type: "spring",
        stiffness: 100,
      }}
      whileInView={{
        scale: [1, 1.05, 1],
        transition: { duration: 0.4, delay: 0.2 },
      }}
      onHoverStart={() => {
        setIsHovered(true)
        setShowGhost(true)
      }}
      onHoverEnd={() => {
        setIsHovered(false)
        setShowGhost(false)
      }}
    >
      {/* Ghost Overlay - Shows opposite platform */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-dashed pointer-events-none z-10"
        style={{
          borderColor: profile.color,
          backgroundColor: `${profile.color}10`,
        }}
        initial={{ opacity: 0, x: 20, rotateY: -15 }}
        animate={
          showGhost
            ? {
                opacity: 0.6,
                x: 30,
                rotateY: 0,
              }
            : {
                opacity: 0,
                x: 20,
                rotateY: -15,
              }
        }
        transition={{ duration: 0.3 }}
      >
        <div
          className="absolute top-3 right-3 px-2 py-1 rounded text-[10px] font-mono"
          style={{ backgroundColor: profile.color, color: "#0F0F1B" }}
        >
          ANDROID_RENDER
        </div>
        <div className="p-6 pt-12">
          <p className="text-xs font-mono text-white/50 leading-relaxed">{profile.androidIssue}</p>
        </div>
      </motion.div>

      {/* Main Card */}
      <motion.div
        className="relative w-72 rounded-2xl overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${profile.color}15 0%, #0F0F1B 50%, ${profile.color}08 100%)`,
          border: `1px solid ${profile.color}40`,
        }}
        animate={
          isHovered
            ? {
                boxShadow: `0 0 40px ${profile.color}30, inset 0 0 20px ${profile.color}10`,
              }
            : {
                boxShadow: `0 0 0px transparent`,
              }
        }
      >
        {/* Top Glow Line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, ${profile.color}, transparent)` }}
          animate={isHovered ? { opacity: 1, scaleX: 1 } : { opacity: 0.5, scaleX: 0.5 }}
        />

        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            <motion.div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                backgroundColor: `${profile.color}20`,
                border: `1px solid ${profile.color}40`,
              }}
              animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
            >
              <IconComponent className="w-6 h-6" style={{ color: profile.color } as React.CSSProperties} />
            </motion.div>
            <div
              className="px-2 py-1 rounded text-[10px] font-mono"
              style={{ backgroundColor: profile.color, color: "#0F0F1B" }}
            >
              iOS_NATIVE
            </div>
          </div>

          <h3 className="font-mono text-sm font-bold mb-1" style={{ color: profile.color }}>
            {profile.title}
          </h3>
          <p className="text-xs text-white/50 font-mono">{profile.subtitle}</p>
        </div>

        {/* Metrics Comparison */}
        <div className="px-6 pb-4">
          <div className="rounded-lg p-3" style={{ backgroundColor: `${profile.color}08` }}>
            <p className="text-[10px] text-white/40 font-mono mb-2">{profile.metric.label}</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-white/30 font-mono">iOS</span>
                <span className="text-lg font-mono font-bold" style={{ color: profile.color }}>
                  {profile.metric.ios}
                </span>
              </div>
              <div className="flex-1 h-px" style={{ backgroundColor: `${profile.color}30` }} />
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-white/30 font-mono">AND</span>
                <span className="text-lg font-mono font-bold text-white/50">{profile.metric.android}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="px-6 pb-6">
          <p className="text-xs text-white/40 leading-relaxed">{profile.description}</p>
        </div>

        {/* Animated Bottom Wave */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden opacity-20"
          style={{ background: `linear-gradient(to top, ${profile.color}20, transparent)` }}
        >
          <motion.svg
            viewBox="0 0 200 50"
            className="absolute bottom-0 w-full"
            animate={{ x: [-200, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "linear" }}
          >
            <path
              d="M0,25 Q25,10 50,25 T100,25 T150,25 T200,25 T250,25 T300,25 T350,25 T400,25"
              fill="none"
              stroke={profile.color}
              strokeWidth="2"
            />
          </motion.svg>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// Mixer Fader Component
function MixerFader({
  channel,
  index,
}: {
  channel: (typeof mixerChannels)[0]
  index: number
}) {
  const [value, setValue] = useState(0) // 0 = before, 100 = after (optimized)
  const [showBubble, setShowBubble] = useState(false)
  const faderRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(faderRef, { once: true })

  const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!faderRef.current) return
    const rect = faderRef.current.getBoundingClientRect()
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY
    const y = clientY - rect.top
    const percentage = Math.max(0, Math.min(100, 100 - (y / rect.height) * 100))
    setValue(percentage)
    setShowBubble(true)
  }

  const currentValue = channel.invert
    ? channel.before + (channel.after - channel.before) * (value / 100)
    : channel.before - (channel.before - channel.after) * (value / 100)

  const improvement = channel.invert
    ? (((channel.after - channel.before) / channel.before) * 100).toFixed(0)
    : (((channel.before - channel.after) / channel.before) * 100).toFixed(0)

  return (
    <motion.div
      className="flex flex-col items-center gap-3"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 + 0.3 }}
    >
      {/* Channel Label */}
      <div className="text-[10px] font-mono text-white/40 text-center tracking-wider">{channel.label}</div>

      {/* Fader Track */}
      <div
        ref={faderRef}
        className="relative w-8 h-48 rounded-full cursor-ns-resize"
        style={{
          background: "linear-gradient(to bottom, #1a1a2e, #0F0F1B)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
        onMouseMove={(e) => e.buttons === 1 && handleDrag(e)}
        onMouseDown={handleDrag}
        onMouseUp={() => setShowBubble(false)}
        onMouseLeave={() => setShowBubble(false)}
        onTouchMove={handleDrag}
        onTouchEnd={() => setShowBubble(false)}
      >
        {/* Track Marks */}
        {[0, 25, 50, 75, 100].map((mark) => (
          <div
            key={mark}
            className="absolute left-1/2 -translate-x-1/2 w-4 h-px bg-white/10"
            style={{ bottom: `${mark}%` }}
          />
        ))}

        {/* Fill */}
        <motion.div
          className="absolute bottom-0 left-1 right-1 rounded-full"
          style={{
            height: `${value}%`,
            background: `linear-gradient(to top, ${channel.color}80, ${channel.color}20)`,
          }}
          animate={{ height: `${value}%` }}
        />

        {/* Fader Knob */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-10 h-6 rounded-md flex items-center justify-center cursor-grab active:cursor-grabbing"
          style={{
            bottom: `calc(${value}% - 12px)`,
            background: `linear-gradient(to bottom, #3a3a4a, #2a2a3a)`,
            border: `1px solid ${value > 50 ? channel.color : "rgba(255,255,255,0.2)"}`,
            boxShadow: value > 50 ? `0 0 15px ${channel.color}50` : "none",
          }}
        >
          <div className="w-6 h-1 rounded-full bg-white/30" />
        </motion.div>

        {/* Data Bubble */}
        <motion.div
          className="absolute -right-24 w-20 p-2 rounded-lg text-center pointer-events-none"
          style={{
            bottom: `calc(${value}% - 20px)`,
            background: channel.color,
            color: "#0F0F1B",
          }}
          initial={{ opacity: 0, x: -10 }}
          animate={showBubble ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
        >
          <div className="text-sm font-mono font-bold">
            {Math.round(currentValue)}
            {channel.unit}
          </div>
          <div className="text-[8px] opacity-70">CURRENT</div>
          {/* Arrow */}
          <div
            className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-0 h-0"
            style={{
              borderTop: "6px solid transparent",
              borderBottom: "6px solid transparent",
              borderRight: `6px solid ${channel.color}`,
            }}
          />
        </motion.div>
      </div>

      {/* Before/After Values */}
      <div className="text-center">
        <div className="flex items-center gap-1 text-[10px] font-mono">
          <span className="text-red-400">{channel.before}</span>
          <span className="text-white/30">→</span>
          <span style={{ color: channel.color }}>{channel.after}</span>
          <span className="text-white/30">{channel.unit}</span>
        </div>
        <div className="text-[10px] font-mono mt-1" style={{ color: channel.color }}>
          {channel.invert ? "+" : "-"}
          {Math.abs(Number(improvement))}%
        </div>
      </div>
    </motion.div>
  )
}

export function TalesFMSpectrumSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background Sine Wave Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="none">
          {[0, 1, 2].map((i) => (
            <motion.path
              key={i}
              d={`M0,${200 + i * 30} Q300,${100 + i * 30} 600,${200 + i * 30} T1200,${200 + i * 30}`}
              fill="none"
              stroke={i === 0 ? "#00FFFF" : i === 1 ? "#FF007F" : "#EBFF00"}
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 0.5 } : {}}
              transition={{ duration: 2, delay: i * 0.3 }}
            />
          ))}
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-cyan-400 to-transparent" />
            <span className="text-[10px] font-mono text-cyan-400/60 tracking-[0.3em]">EXPERIMENT</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-500">
            EXP_03: BEHAVIORAL_SPECTRUM
          </h2>
          <p className="mt-4 text-white/40 font-mono text-sm max-w-2xl">
            Mapping the platform-specific frictions that shaped our cross-platform rendering strategy
          </p>
        </motion.div>

        {/* Wave-Form Grid - Behavioral Cards */}
        <div className="mb-32">
          <motion.div
            className="flex flex-wrap justify-center gap-8 lg:gap-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
          >
            {behavioralProfiles.map((profile, index) => (
              <BehavioralCard key={profile.id} profile={profile} index={index} />
            ))}
          </motion.div>
        </div>

        {/* The Latency Mixer */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {/* Mixer Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#00FF41]/30 bg-[#00FF41]/5 mb-4">
              <div className="w-2 h-2 rounded-full bg-[#00FF41] animate-pulse" />
              <span className="text-[10px] font-mono text-[#00FF41] tracking-wider">SOLUTION_MODULE</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">THE LATENCY MIXER</h3>
            <p className="text-white/40 font-mono text-sm">
              Drag the faders to see how caching strategy optimized performance
            </p>
          </div>

          {/* Mixer Console */}
          <div
            className="relative max-w-4xl mx-auto rounded-2xl p-8 md:p-12"
            style={{
              background: "linear-gradient(135deg, #1a1a2e 0%, #0F0F1B 50%, #1a1a2e 100%)",
              border: "1px solid rgba(0,255,65,0.2)",
              boxShadow: "0 0 60px rgba(0,255,65,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            {/* LED Display */}
            <div
              className="absolute top-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-lg font-mono text-sm"
              style={{
                background: "#0a0a12",
                border: "1px solid rgba(0,255,65,0.3)",
                boxShadow: "inset 0 2px 10px rgba(0,0,0,0.5)",
              }}
            >
              <span className="text-[#00FF41]">CACHE_OPTIMIZER</span>
              <span className="text-white/30"> v2.1</span>
            </div>

            {/* Faders Container */}
            <div className="flex justify-center gap-8 md:gap-12 pt-12">
              {mixerChannels.map((channel, index) => (
                <MixerFader key={channel.id} channel={channel} index={index} />
              ))}
            </div>

            {/* Master Output */}
            <div className="mt-12 pt-8 border-t border-white/5 text-center">
              <div className="inline-flex items-center gap-6 px-6 py-3 rounded-lg bg-black/30">
                <div className="text-left">
                  <div className="text-[10px] font-mono text-white/30">TOTAL IMPROVEMENT</div>
                  <div className="text-2xl font-mono font-bold text-[#00FF41]">86%</div>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="text-left">
                  <div className="text-[10px] font-mono text-white/30">STRATEGY</div>
                  <div className="text-sm font-mono text-white/70">Multi-tier LRU + Predictive Prefetch</div>
                </div>
              </div>
            </div>

            {/* Corner Screws */}
            {["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"].map((position, i) => (
              <div
                key={i}
                className={`absolute ${position} w-4 h-4 rounded-full`}
                style={{
                  background: "linear-gradient(135deg, #3a3a4a, #1a1a2a)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div className="absolute inset-1 rounded-full bg-black/30" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
