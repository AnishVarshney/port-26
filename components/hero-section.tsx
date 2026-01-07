"use client"

import type React from "react"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Smartphone, Apple, Users, Loader2 } from "lucide-react"
import { useRef } from "react"

// Magnetic tilt card component
function MagneticCard({
  children,
  className,
  glowEffect = false,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  glowEffect?: boolean
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 20, stiffness: 300 }
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), springConfig)
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) / rect.width)
    y.set((e.clientY - centerY) / rect.height)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${className} ${glowEffect ? "shadow-[0_0_60px_-15px_rgba(59,130,246,0.4)]" : ""}`}
    >
      {children}
    </motion.div>
  )
}

// Animated mesh gradient background
function MeshGradient() {
  return (
    <motion.div
      className="absolute -bottom-20 -right-20 w-64 h-64 opacity-30 blur-3xl pointer-events-none"
      animate={{
        background: [
          "radial-gradient(circle, #3B82F6 0%, #7C3AED 100%)",
          "radial-gradient(circle, #7C3AED 0%, #3B82F6 100%)",
          "radial-gradient(circle, #3B82F6 0%, #7C3AED 100%)",
        ],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    />
  )
}

// Progress ring component for Velocity tile
function ProgressRing() {
  return (
    <div className="relative w-12 h-12">
      <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="20" fill="none" stroke="#1F1F1F" strokeWidth="3" />
        <motion.circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke="#3B82F6"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="125.6"
          initial={{ strokeDashoffset: 125.6 }}
          animate={{ strokeDashoffset: [125.6, 0, 125.6] }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </svg>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <Loader2 className="w-5 h-5 text-blue-500" />
      </motion.div>
    </div>
  )
}

// Avatar stack for Leadership tile
function AvatarStack() {
  const avatars = [
    { bg: "bg-blue-500", initials: "AV" },
    { bg: "bg-emerald-500", initials: "SK" },
    { bg: "bg-purple-500", initials: "RJ" },
    { bg: "bg-orange-500", initials: "MP" },
  ]

  return (
    <div className="flex -space-x-3">
      {avatars.map((avatar, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 + i * 0.1 }}
          className={`w-8 h-8 rounded-full ${avatar.bg} border-2 border-[#0D0D0D] flex items-center justify-center text-xs font-medium text-white`}
        >
          {avatar.initials}
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
        className="w-8 h-8 rounded-full bg-white/10 border-2 border-[#0D0D0D] flex items-center justify-center text-xs font-medium text-white/60"
      >
        +8
      </motion.div>
    </div>
  )
}

export function HeroSection() {
  return (
    <section id="hero" className="min-h-screen pt-24 pb-12 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Desktop: 12-column bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 auto-rows-[minmax(140px,auto)]">
          {/* Identity Card - Span 8 cols, 2 rows */}
          <MagneticCard
            delay={0}
            className="lg:col-span-8 lg:row-span-2 md:col-span-2 relative overflow-hidden rounded-3xl bg-[#0D0D0D] border border-white/5 p-8 md:p-10"
          >
            <MeshGradient />
            <div className="relative z-10 h-full flex flex-col justify-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white tracking-tight font-mono"
              >
                Anish Varshney
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mt-4 text-lg md:text-xl text-white/60 font-medium"
              >
                Software Developer & Team Lead <span className="text-blue-500">@ Web3task</span>
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-6 flex items-center gap-3"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                {/* <span className="text-sm text-white/40 font-medium">Available for opportunities</span> */}
              </motion.div>
            </div>
          </MagneticCard>

          {/* Scale Metric Tile - Span 4 cols, 2 rows */}
          <MagneticCard
            delay={0.1}
            glowEffect
            className="lg:col-span-4 lg:row-span-2 relative overflow-hidden rounded-3xl bg-[#0D0D0D] border border-white/5 p-6 md:p-8"
          >
            <div className="h-full flex flex-col justify-between">
              <div>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-xs uppercase tracking-widest text-white/40 font-medium"
                >
                  Impact
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="mt-4 text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight"
                >
                  18,000+
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-2 text-sm text-white/50 font-medium"
                >
                  Active Users Scaled & Managed
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-6 flex items-center gap-6"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <Smartphone className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">10k+</p>
                    <p className="text-xs text-white/40">Android</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <Apple className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">8k+</p>
                    <p className="text-xs text-white/40">iOS</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </MagneticCard>

          {/* Leadership Tile - Span 4 cols, 1 row */}
          <MagneticCard
            delay={0.2}
            className="lg:col-span-4 relative overflow-hidden rounded-3xl bg-[#0D0D0D] border border-white/5 p-6"
          >
            <div className="h-full flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-white/40 font-medium">Leadership</span>
                  <h3 className="mt-2 text-3xl md:text-4xl font-extrabold text-white">
                    12-15 <span className="text-white/40 text-xl">Devs</span>
                  </h3>
                  <p className="mt-1 text-sm text-white/50">Cross-functional Team Leadership</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-500" />
                </div>
              </div>
              <AvatarStack />
            </div>
          </MagneticCard>

          {/* Velocity Tile - Span 4 cols, 1 row */}
          <MagneticCard
            delay={0.3}
            className="lg:col-span-4 relative overflow-hidden rounded-3xl bg-[#0D0D0D] border border-white/5 p-6"
          >
            <div className="h-full flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-white/40 font-medium">Velocity</span>
                <h3 className="mt-2 text-3xl md:text-4xl font-extrabold text-white">
                  15-Day <span className="text-white/40 text-xl">Cycle</span>
                </h3>
                <p className="mt-1 text-sm text-white/50">Production Deployment Velocity</p>
              </div>
              <ProgressRing />
            </div>
          </MagneticCard>

          {/* Pivot Tile - Span 4 cols, 2 rows */}
          <MagneticCard
            delay={0.4}
            className="lg:col-span-4 lg:row-span-2 relative overflow-hidden rounded-3xl bg-[#0D0D0D] border border-white/5 p-6 md:p-8"
          >
            <div className="h-full flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-white/40 font-medium">Technical Pivot</span>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="mt-4 flex items-center gap-3"
                >
                  <span className="text-2xl md:text-3xl font-extrabold text-white/40">Hybrid</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    className="text-2xl text-blue-500"
                  >
                    →
                  </motion.span>
                  <span className="text-2xl md:text-3xl font-extrabold text-emerald-500">Native</span>
                </motion.div>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="text-sm text-white/50 leading-relaxed"
              >
                Successfully migrated <span className="text-white font-medium">VoiceToNotes</span> from React Native to
                Native Swift (Storyboard) for granular UI control and enhanced performance.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="mt-4 flex gap-2"
              >
                <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-white/60 font-medium">
                  React Native
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-500/10 text-xs text-blue-400 font-medium">Swift</span>
                <span className="px-3 py-1 rounded-full bg-purple-500/10 text-xs text-purple-400 font-medium">
                  Storyboard
                </span>
              </motion.div>
            </div>
          </MagneticCard>
        </div>
      </div>
    </section>
  )
}
