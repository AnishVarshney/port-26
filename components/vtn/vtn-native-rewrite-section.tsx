"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  Cpu,
  Layers,
  Sparkles,
  FolderArchive,
  FileText,
  Check,
  Zap,
  Clock,
  Box,
  GitBranch,
  ChevronRight,
} from "lucide-react"

// Floating UI Canvas component with peel-back interaction
function FloatingCanvas({
  index,
  title,
  specs,
  isHovered,
  onHover,
  onLeave,
}: {
  index: number
  title: string
  specs: { label: string; value: string }[]
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}) {
  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        top: `${index * 30}px`,
        left: `${index * 25}px`,
        zIndex: 10 - index,
      }}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      whileHover={{ scale: 1.02, z: 50 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Interface Builder Window Frame */}
      <div className="relative w-[280px] md:w-[320px] rounded-xl overflow-hidden border border-white/10 bg-[#0c0c0c] shadow-2xl">
        {/* Window Header */}
        <div className="flex items-center gap-2 px-3 py-2 bg-[#1a1a1a] border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-[10px] font-mono text-white/40 ml-2">{title}.storyboard</span>
        </div>

        {/* Canvas Content */}
        <div className="relative aspect-[9/16] max-h-[400px] overflow-hidden">
          {/* The UI Skin Layer */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] p-4"
            animate={{ opacity: isHovered ? 0.2 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Mock iOS UI Elements */}
            <div className="space-y-3">
              <div className="h-8 w-24 rounded-lg bg-[#007AFF]/20 border border-[#007AFF]/30" />
              <div className="h-12 w-full rounded-xl bg-white/5 border border-white/10" />
              <div className="grid grid-cols-2 gap-2">
                <div className="h-20 rounded-lg bg-white/5 border border-white/10" />
                <div className="h-20 rounded-lg bg-white/5 border border-white/10" />
              </div>
              <div className="h-32 w-full rounded-xl bg-white/5 border border-white/10" />
              <div className="flex gap-2">
                <div className="h-10 flex-1 rounded-lg bg-[#007AFF]/30 border border-[#007AFF]/40" />
                <div className="h-10 w-10 rounded-lg bg-white/5 border border-white/10" />
              </div>
            </div>
          </motion.div>

          {/* The Storyboard Logic Layer (revealed on hover) */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute inset-0 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Constraint Lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Vertical alignment guides */}
                  <line x1="10" y1="0" x2="10" y2="100" stroke="#007AFF" strokeWidth="0.2" strokeDasharray="2,2" />
                  <line x1="50" y1="0" x2="50" y2="100" stroke="#007AFF" strokeWidth="0.2" strokeDasharray="2,2" />
                  <line x1="90" y1="0" x2="90" y2="100" stroke="#007AFF" strokeWidth="0.2" strokeDasharray="2,2" />
                  {/* Horizontal alignment guides */}
                  <line x1="0" y1="20" x2="100" y2="20" stroke="#007AFF" strokeWidth="0.2" strokeDasharray="2,2" />
                  <line x1="0" y1="50" x2="100" y2="50" stroke="#007AFF" strokeWidth="0.2" strokeDasharray="2,2" />
                  <line x1="0" y1="80" x2="100" y2="80" stroke="#007AFF" strokeWidth="0.2" strokeDasharray="2,2" />
                  {/* Connection lines to view controllers */}
                  <path
                    d="M 20 30 Q 50 40 80 25"
                    stroke="#28c840"
                    strokeWidth="0.3"
                    fill="none"
                    className="animate-pulse"
                  />
                  <path
                    d="M 15 60 Q 40 70 85 55"
                    stroke="#ff9500"
                    strokeWidth="0.3"
                    fill="none"
                    className="animate-pulse"
                  />
                </svg>

                {/* UIKit Hierarchy Labels */}
                <div className="relative z-10 space-y-4 text-[8px] font-mono">
                  <div className="flex items-center gap-1 text-[#007AFF]">
                    <Box className="w-3 h-3" />
                    <span>UIViewController</span>
                  </div>
                  <div className="ml-4 flex items-center gap-1 text-[#28c840]">
                    <GitBranch className="w-3 h-3" />
                    <span>UIStackView</span>
                  </div>
                  <div className="ml-8 flex items-center gap-1 text-[#ff9500]">
                    <Layers className="w-3 h-3" />
                    <span>UITableView</span>
                  </div>
                  <div className="ml-4 flex items-center gap-1 text-[#007AFF]">
                    <Zap className="w-3 h-3" />
                    <span>@IBOutlet</span>
                  </div>
                  <div className="ml-8 flex items-center gap-1 text-[#ff5f57]">
                    <ChevronRight className="w-3 h-3" />
                    <span>@IBAction</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Vertical Spec Labels */}
        <div className="absolute -right-16 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          {specs.map((spec, i) => (
            <motion.div
              key={i}
              className="text-[9px] font-mono text-white/30 whitespace-nowrap origin-left -rotate-90 translate-x-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              {spec.label}: <span className="text-[#007AFF]">{spec.value}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// Feature Module Component (Isometric Block Style)
function FeatureModule({
  icon: Icon,
  title,
  description,
  color,
  delay,
  isActive,
}: {
  icon: React.ElementType
  title: string
  description: string
  color: string
  delay: number
  isActive: boolean
}) {
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
    >
      {/* Isometric Block Effect */}
      <div
        className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
        style={{ background: `${color}20` }}
      />

      <div
        className={`relative p-5 rounded-xl border transition-all duration-500 ${
          isActive ? "border-white/20 bg-white/5" : "border-white/5 bg-[#0a0a0a]"
        }`}
        style={{
          boxShadow: isActive ? `0 0 30px ${color}20, inset 0 1px 0 ${color}10` : "none",
        }}
      >
        {/* 3D Top Face Effect */}
        <div
          className="absolute -top-px left-2 right-2 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${color}40, transparent)` }}
        />

        {/* Icon Container */}
        <motion.div
          className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
          style={{ background: `${color}15`, border: `1px solid ${color}30` }}
          animate={isActive ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </motion.div>

        {/* Content */}
        <h4 className="text-sm font-semibold text-white mb-2">{title}</h4>
        <p className="text-xs text-white/50 leading-relaxed">{description}</p>

        {/* Active Indicator */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              className="absolute top-3 right-3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: color }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// Performance Gauge Component
function PerformanceGauge({ progress }: { progress: number }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const target = Math.min(progress * 100, 100)
    const duration = 1500
    const startTime = Date.now()
    const startValue = displayValue

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(Math.round(startValue + (target - startValue) * eased))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [progress])

  const angle = (displayValue / 100) * 180 - 90

  return (
    <motion.div
      className="relative w-32 h-20"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    >
      {/* Gauge Background */}
      <svg className="w-full h-full" viewBox="0 0 100 60">
        {/* Background Arc */}
        <path d="M 10 55 A 40 40 0 0 1 90 55" fill="none" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round" />
        {/* Progress Arc */}
        <motion.path
          d="M 10 55 A 40 40 0 0 1 90 55"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="125.6"
          initial={{ strokeDashoffset: 125.6 }}
          animate={{ strokeDashoffset: 125.6 - (displayValue / 100) * 125.6 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        {/* Gradient Definition */}
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff5f57" />
            <stop offset="50%" stopColor="#febc2e" />
            <stop offset="100%" stopColor="#28c840" />
          </linearGradient>
        </defs>
      </svg>

      {/* Needle */}
      <motion.div
        className="absolute bottom-1 left-1/2 w-0.5 h-10 bg-white origin-bottom rounded-full"
        style={{ marginLeft: "-1px" }}
        animate={{ rotate: angle }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      {/* Center Point */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#007AFF] border-2 border-white" />

      {/* Labels */}
      <div className="absolute -bottom-5 left-0 text-[8px] font-mono text-[#ff5f57]">RN</div>
      <div className="absolute -bottom-5 right-0 text-[8px] font-mono text-[#28c840]">Swift</div>
      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white">
        {displayValue}% faster
      </div>
    </motion.div>
  )
}

// Animation Preview Component
function AnimationPreview({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-full h-24 rounded-lg bg-[#0a0a0a] border border-white/10 overflow-hidden">
      <AnimatePresence>
        {isHovered && (
          <>
            {/* Card sliding into collection animation */}
            <motion.div
              className="absolute left-4 top-1/2 -translate-y-1/2 w-16 h-20 rounded-lg bg-gradient-to-br from-[#007AFF]/30 to-[#007AFF]/10 border border-[#007AFF]/30"
              initial={{ x: 0, scale: 1 }}
              animate={{ x: 60, scale: 0.8, opacity: 0.5 }}
              transition={{ duration: 0.6, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
            />
            <motion.div
              className="absolute left-20 top-1/2 -translate-y-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {/* Collection folder */}
              <div className="relative">
                <div className="w-20 h-24 rounded-lg bg-[#1a1a1a] border border-white/10" />
                <div className="absolute -top-1 left-2 right-2 h-3 rounded-t-lg bg-[#252525] border border-white/10 border-b-0" />
              </div>
            </motion.div>
            {/* 60fps indicator */}
            <div className="absolute top-2 right-2 text-[8px] font-mono text-[#28c840]">60fps</div>
          </>
        )}
      </AnimatePresence>
      {!isHovered && (
        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-mono text-white/30">
          Hover to preview animation
        </div>
      )}
    </div>
  )
}

export function VTNNativeRewriteSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [hoveredCanvas, setHoveredCanvas] = useState<number | null>(null)
  const [activeModule, setActiveModule] = useState<number>(0)
  const [animationHovered, setAnimationHovered] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const gaugeProgress = useTransform(scrollYProgress, [0.2, 0.6], [0, 0.65])
  const [gaugeValue, setGaugeValue] = useState(0)

  useEffect(() => {
    const unsubscribe = gaugeProgress.on("change", (v) => setGaugeValue(v))
    return unsubscribe
  }, [gaugeProgress])

  // Cycle through active modules
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveModule((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const canvases = [
    {
      title: "MainViewController",
      specs: [
        { label: "Memory", value: "-35%" },
        { label: "Framework", value: "UIKit" },
      ],
    },
    {
      title: "RecordingView",
      specs: [
        { label: "Build", value: "100%" },
        { label: "Arch", value: "MVC" },
      ],
    },
    {
      title: "CollectionsVC",
      specs: [
        { label: "Crash", value: "0.5%" },
        { label: "Tests", value: "94%" },
      ],
    },
  ]

  const featureModules = [
    {
      icon: Sparkles,
      title: "The Intelligence Block",
      description:
        "Enhanced AI engine with on-device processing, delivering 40% faster transcription with improved accuracy.",
      color: "#007AFF",
    },
    {
      icon: FolderArchive,
      title: "The Archive Block",
      description:
        "Hierarchical Collections system enabling users to organize notes into nested folders with smart tagging.",
      color: "#ff9500",
    },
    {
      icon: FileText,
      title: "The Persistence Block",
      description: "Robust Drafts system with auto-save, version history, and seamless cloud sync across all devices.",
      color: "#28c840",
    },
  ]

  return (
    <section ref={sectionRef} className="relative min-h-screen py-32 overflow-hidden">
      {/* Clean Slate Background */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Alignment Guide Grid */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Vertical guides */}
        {[10, 25, 50, 75, 90].map((pos) => (
          <div key={`v-${pos}`} className="absolute top-0 bottom-0 w-px bg-white/[0.03]" style={{ left: `${pos}%` }} />
        ))}
        {/* Horizontal guides */}
        {[20, 40, 60, 80].map((pos) => (
          <div key={`h-${pos}`} className="absolute left-0 right-0 h-px bg-white/[0.03]" style={{ top: `${pos}%` }} />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#007AFF] animate-pulse" />
            <span className="text-xs font-mono text-[#007AFF] tracking-widest">NATIVE_ARCHITECTURE</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4">
            <span className="text-white/30">PHASE_03:</span>{" "}
            <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              THE_NATIVE_REWRITE
            </span>
          </h2>
          <p className="text-lg text-white/40 max-w-2xl">
            A complete architectural transformation. From hybrid compromises to native precision.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Floating Canvas Stack */}
          <div className="relative h-[550px]">
            <motion.div
              className="absolute -top-4 -left-4 text-[10px] font-mono text-white/20 tracking-widest"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              STORYBOARD_WORKSPACE
            </motion.div>

            {/* The Cascading 3D Stack */}
            <div className="relative" style={{ perspective: "1000px" }}>
              {canvases.map((canvas, index) => (
                <FloatingCanvas
                  key={index}
                  index={index}
                  title={canvas.title}
                  specs={canvas.specs}
                  isHovered={hoveredCanvas === index}
                  onHover={() => setHoveredCanvas(index)}
                  onLeave={() => setHoveredCanvas(null)}
                />
              ))}
            </div>

            {/* Performance Gauge */}
            <motion.div
              className="absolute bottom-0 left-0 p-4 rounded-xl bg-[#0a0a0a]/80 backdrop-blur-sm border border-white/5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-[9px] font-mono text-white/40 mb-2 tracking-wider">BUILD_PERFORMANCE</div>
              <PerformanceGauge progress={gaugeValue} />
            </motion.div>

            {/* Peel-back instruction hint */}
            <motion.div
              className="absolute bottom-0 right-0 text-[9px] font-mono text-white/20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
              animate={{ opacity: [0.2, 0.5, 0.2] }}
            >
              hover to reveal storyboard logic →
            </motion.div>
          </div>

          {/* Right: Feature Modules */}
          <div className="space-y-6">
            <motion.div
              className="text-[10px] font-mono text-white/20 tracking-widest mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              SYSTEM_MODULES
            </motion.div>

            {/* Feature Modules */}
            {featureModules.map((module, index) => (
              <FeatureModule
                key={index}
                icon={module.icon}
                title={module.title}
                description={module.description}
                color={module.color}
                delay={0.2 + index * 0.15}
                isActive={activeModule === index}
              />
            ))}

            {/* Animation Preview */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              onMouseEnter={() => setAnimationHovered(true)}
              onMouseLeave={() => setAnimationHovered(false)}
            >
              <div className="text-[9px] font-mono text-white/40 mb-2 tracking-wider">UI/UX_IMPROVEMENTS</div>
              <AnimationPreview isHovered={animationHovered} />
            </motion.div>

            {/* Technical Stats Bar */}
            <motion.div
              className="flex flex-wrap gap-4 pt-6 border-t border-white/5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              {[
                { icon: Clock, label: "Build Time", value: "-65%", color: "#28c840" },
                { icon: Cpu, label: "Memory", value: "-35%", color: "#007AFF" },
                { icon: Check, label: "Crash-Free", value: "99.5%", color: "#ff9500" },
              ].map((stat, index) => (
                <div key={index} className="flex items-center gap-2">
                  <stat.icon className="w-3.5 h-3.5" style={{ color: stat.color }} />
                  <span className="text-[10px] font-mono text-white/40">{stat.label}:</span>
                  <span className="text-[10px] font-mono font-semibold" style={{ color: stat.color }}>
                    {stat.value}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom Architectural Decision Note */}
        <motion.div
          className="mt-24 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#007AFF]/10 border border-[#007AFF]/20 mb-6">
            <Check className="w-4 h-4 text-[#28c840]" />
            <span className="text-xs font-mono text-white/60">MIGRATION_COMPLETE</span>
          </div>
          <p className="text-sm text-white/40 leading-relaxed">
            The native rewrite wasn't just a technical decision—it was an architectural commitment to
            <span className="text-white/70"> performance, maintainability, and user experience</span>. By embracing
            Swift and UIKit, we gained full control over every pixel and every millisecond.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
