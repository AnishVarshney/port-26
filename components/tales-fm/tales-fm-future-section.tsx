"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"
import { Radio, Headphones, Users, AudioWaveform as Waveform, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"

const futureFeatures = [
  {
    id: "social",
    label: "Social Listening",
    icon: Users,
    description: "Collaborative playlists & live listening rooms",
  },
  {
    id: "visualizer",
    label: "Audio Visualizers",
    icon: Waveform,
    description: "Real-time frequency-responsive graphics",
  },
  { id: "hifi", label: "Hi-Fi Streaming", icon: Headphones, description: "Lossless audio with spatial audio support" },
  { id: "ai", label: "AI Curation", icon: Sparkles, description: "Personalized station generation" },
]

export function TalesFMFutureSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const portalRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])
  const [activeFeature, setActiveFeature] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const clarity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.7, 1])
  const signalStrength = useTransform(scrollYProgress, [0, 0.8], [0, 100])
  const springClarity = useSpring(clarity, { stiffness: 100, damping: 30 })
  const springSignal = useSpring(signalStrength, { stiffness: 50, damping: 20 })

  // Cycle through future features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % futureFeatures.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Handle mouse movement for ripple effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!portalRef.current) return
    const rect = portalRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePosition({ x, y })

    // Create ripple on fast movement
    if (Math.random() > 0.85) {
      const id = Date.now()
      setRipples((prev) => [...prev.slice(-5), { id, x, y }])
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id))
      }, 1500)
    }
  }

  // Transition handler
  const handleTransition = () => {
    setIsTransitioning(true)
  }

  return (
    <section ref={containerRef} className="relative min-h-[120vh] bg-[#0F0F1B] overflow-hidden py-32">
      {/* Background gradient layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F1B] via-[#1a1a2e] to-[#0F0F1B]" />
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(223, 255, 0, 0.15), transparent 60%)`,
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>

      {/* Signal Strength Sidebar */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
        <div className="flex flex-col items-center gap-4">
          <span
            className="text-[10px] font-mono text-white/40 tracking-widest rotate-180 writing-mode-vertical"
            style={{ writingMode: "vertical-rl" }}
          >
            SIGNAL_STRENGTH
          </span>
          <div className="relative w-2 h-48 bg-white/5 rounded-full overflow-hidden border border-white/10">
            <motion.div
              className="absolute bottom-0 left-0 right-0 rounded-full"
              style={{
                height: useTransform(springSignal, (v) => `${v}%`),
                background: "linear-gradient(to top, #DFFF00, #00FFFF)",
                boxShadow: "0 0 20px rgba(223, 255, 0, 0.5)",
              }}
            />
            {/* Signal markers */}
            {[0, 25, 50, 75, 100].map((mark) => (
              <div key={mark} className="absolute left-full ml-2 w-1 h-px bg-white/20" style={{ bottom: `${mark}%` }} />
            ))}
          </div>
          <div className="flex flex-col items-center gap-1">
            <motion.span
              className="text-xs font-mono"
              style={{
                color: useTransform(springSignal, (v) => (v > 80 ? "#DFFF00" : v > 50 ? "#00FFFF" : "#ffffff40")),
              }}
            >
              <motion.span>{useTransform(springSignal, (v) => Math.round(v))}</motion.span>%
            </motion.span>
            <span className="text-[8px] font-mono text-white/30">LOCKED</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#DFFF00]/50" />
            <Radio className="w-4 h-4 text-[#DFFF00] animate-pulse" />
            <span className="text-xs font-mono text-[#DFFF00]/70 tracking-[0.3em]">TRANSMISSION_INCOMING</span>
            <Radio className="w-4 h-4 text-[#DFFF00] animate-pulse" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#DFFF00]/50" />
          </div>
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight"
            style={{
              fontStretch: "125%",
              background: "linear-gradient(135deg, #ffffff 0%, #DFFF00 50%, #00FFFF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            FUTURE_ENCODING
          </h2>
          <motion.div
            className="mt-4 flex items-center justify-center gap-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <span className="text-sm font-mono text-[#00FFFF]">[</span>
            <span className="text-sm font-mono text-white/60">SIGNAL_LOCKED</span>
            <span className="text-sm font-mono text-[#00FFFF]">]</span>
          </motion.div>
        </motion.div>

        {/* The Liquid Wave Portal */}
        <div className="relative flex justify-center items-center mb-20">
          <motion.div
            ref={portalRef}
            onMouseMove={handleMouseMove}
            className="relative w-[500px] h-[500px] md:w-[600px] md:h-[600px] cursor-crosshair"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Outer glow ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(from ${mousePosition.x * 3.6}deg, #DFFF00, #00FFFF, #FF00FF, #DFFF00)`,
                filter: "blur(40px)",
                opacity: useTransform(springClarity, [0.3, 1], [0.2, 0.5]),
              }}
            />

            {/* Portal glass container */}
            <motion.div
              className="absolute inset-4 rounded-full overflow-hidden"
              style={{
                background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, rgba(15,15,27,0.9) 70%)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: `
                  inset 0 0 60px rgba(223, 255, 0, 0.1),
                  inset 0 0 120px rgba(0, 255, 255, 0.05),
                  0 0 80px rgba(223, 255, 0, 0.2)
                `,
              }}
            >
              {/* Ripple effects */}
              <AnimatePresence>
                {ripples.map((ripple) => (
                  <motion.div
                    key={ripple.id}
                    className="absolute rounded-full border border-[#DFFF00]/30"
                    style={{
                      left: `${ripple.x}%`,
                      top: `${ripple.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    initial={{ width: 0, height: 0, opacity: 1 }}
                    animate={{ width: 200, height: 200, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                ))}
              </AnimatePresence>

              {/* Refractive wave layers */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `radial-gradient(circle at ${50 + Math.sin(i) * 20}% ${50 + Math.cos(i) * 20}%, 
                      rgba(${i % 2 === 0 ? "223, 255, 0" : "0, 255, 255"}, 0.1) 0%, 
                      transparent 50%)`,
                    filter: `blur(${springClarity.get() > 0.7 ? 5 : 20}px)`,
                  }}
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    rotate: { duration: 20 + i * 5, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                    scale: { duration: 4 + i, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                  }}
                />
              ))}

              {/* Future features cycling display */}
              <div className="absolute inset-0 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFeature}
                    initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                    animate={{
                      opacity: springClarity.get() > 0.5 ? 0.8 : 0.3,
                      scale: 1,
                      filter: `blur(${springClarity.get() > 0.7 ? 0 : 5}px)`,
                    }}
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                  >
                    {(() => {
                      const Feature = futureFeatures[activeFeature]
                      const Icon = Feature.icon
                      return (
                        <>
                          <Icon className="w-16 h-16 mx-auto mb-4 text-[#DFFF00]" />
                          <h4 className="text-xl font-bold text-white mb-2">{Feature.label}</h4>
                          <p className="text-sm text-white/50 max-w-[200px]">{Feature.description}</p>
                        </>
                      )
                    })()}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Audio visualizer bars */}
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-end gap-1">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 rounded-full bg-gradient-to-t from-[#DFFF00] to-[#00FFFF]"
                    animate={{
                      height: [10 + Math.random() * 20, 20 + Math.random() * 40, 10 + Math.random() * 20],
                    }}
                    transition={{
                      duration: 0.5 + Math.random() * 0.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: i * 0.05,
                    }}
                    style={{
                      opacity: 0.3 + (mousePosition.x / 100) * 0.5,
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Orbiting particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: i % 2 === 0 ? "#DFFF00" : "#00FFFF",
                  boxShadow: `0 0 10px ${i % 2 === 0 ? "#DFFF00" : "#00FFFF"}`,
                  left: "50%",
                  top: "50%",
                }}
                animate={{
                  x: [
                    Math.cos((i / 8) * Math.PI * 2) * 280,
                    Math.cos(((i + 4) / 8) * Math.PI * 2) * 280,
                    Math.cos((i / 8) * Math.PI * 2) * 280,
                  ],
                  y: [
                    Math.sin((i / 8) * Math.PI * 2) * 280,
                    Math.sin(((i + 4) / 8) * Math.PI * 2) * 280,
                    Math.sin((i / 8) * Math.PI * 2) * 280,
                  ],
                }}
                transition={{
                  duration: 15 + i * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Floating Conclusion Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative max-w-2xl mx-auto"
        >
          <div
            className="relative p-8 md:p-12 rounded-3xl overflow-hidden"
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(40px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: `
                0 0 0 1px rgba(223, 255, 0, 0.1),
                0 20px 60px rgba(0, 0, 0, 0.5),
                inset 0 1px 0 rgba(255, 255, 255, 0.1)
              `,
            }}
          >
            {/* Accent corner */}
            <div className="absolute top-0 right-0 w-32 h-32">
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#DFFF00] animate-pulse" />
              <div className="absolute top-4 right-8 w-8 h-px bg-gradient-to-l from-[#DFFF00]/50 to-transparent" />
              <div className="absolute top-8 right-4 h-8 w-px bg-gradient-to-t from-[#DFFF00]/50 to-transparent" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-[10px] font-mono text-[#DFFF00] tracking-widest">MISSION_STATEMENT</span>
                <div className="flex-1 h-px bg-gradient-to-r from-[#DFFF00]/30 to-transparent" />
              </div>

              <blockquote
                className="text-xl md:text-2xl lg:text-3xl font-light text-white/90 leading-relaxed mb-8"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                "TalesFM was the laboratory where I mastered the{" "}
                <span className="text-[#DFFF00] font-medium">friction between design and performance</span>
                —proving that visual ambition and technical excellence aren't mutually exclusive."
              </blockquote>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#DFFF00] to-[#00FFFF] flex items-center justify-center">
                    <span className="text-sm font-bold text-[#0F0F1B]">AV</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Anish Varshney</p>
                    <p className="text-xs text-white/40">Team Lead & Developer</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xs font-mono text-white/30">EXPERIMENT_STATUS</p>
                  <p className="text-sm font-mono text-[#00FFFF]">EVOLVED → PRODUCTION</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Link href="/#work" onClick={handleTransition}>
            <motion.button
              className="group relative px-8 py-4 rounded-full overflow-hidden"
              style={{
                background: "transparent",
                border: "1px solid rgba(0, 255, 255, 0.5)",
                boxShadow: "0 0 20px rgba(0, 255, 255, 0.2)",
              }}
              whileHover={{
                boxShadow: "0 0 40px rgba(0, 255, 255, 0.4)",
                borderColor: "rgba(0, 255, 255, 0.8)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center gap-3 text-sm font-mono text-[#00FFFF] tracking-wider">
                TUNE INTO THE NEXT PHASE
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#00FFFF]/10 to-[#DFFF00]/10"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </Link>

          <p className="mt-6 text-xs font-mono text-white/30">Press to return to the main frequency</p>
        </motion.div>

        {/* Build version footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-24 pt-12 border-t border-white/5 text-center"
        >
          <p className="text-[10px] font-mono text-white/20 tracking-widest">
            TALESFM_CASE_STUDY // v1.0.0-synthwave-edition // SIGNAL_LOCKED
          </p>
        </motion.div>
      </div>

      {/* Transition overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 z-[100]"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            style={{
              background: "linear-gradient(135deg, #DFFF00, #00FFFF, #FF00FF)",
              transformOrigin: "bottom",
            }}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
