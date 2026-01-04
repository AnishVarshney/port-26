
"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Radio, Waves } from "lucide-react"

export function TalesFMHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const diskRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [frequency, setFrequency] = useState("98.7")
  const [isLoaded, setIsLoaded] = useState(false)
  const [cursorScale, setCursorScale] = useState(1)

  // Mouse tracking for disk tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 150 }
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), springConfig)

  // Tuning bar frequency based on horizontal mouse position
  const frequencies = ["87.5", "91.3", "95.1", "98.7", "102.5", "106.3", "107.9"]

  useEffect(() => {
    setIsLoaded(true)

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      mouseX.set(e.clientX - centerX)
      mouseY.set(e.clientY - centerY)

      setMousePosition({ x: e.clientX, y: e.clientY })

      // Calculate frequency based on horizontal position
      const relativeX = (e.clientX - rect.left) / rect.width
      const freqIndex = Math.floor(relativeX * frequencies.length)
      setFrequency(frequencies[Math.min(freqIndex, frequencies.length - 1)])

      // Audio-reactive cursor pulse
      setCursorScale(1 + Math.sin(Date.now() * 0.01) * 0.1)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY, frequencies])

  // Pulsing cursor beat simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorScale((prev) => (prev === 1 ? 1.2 : 1))
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden" style={{ background: "#0F0F1B" }}>
      {/* Analog Grain Overlay */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Chromatic Light Leaks */}
      <motion.div
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-[150px] opacity-40"
        style={{ background: "linear-gradient(135deg, #DFFF00 0%, #00FFFF 100%)" }}
        animate={{
          x: [0, 100, 50, 0],
          y: [0, 50, 100, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-30"
        style={{ background: "linear-gradient(225deg, #FF00FF 0%, #FF6B6B 100%)" }}
        animate={{
          x: [0, -80, -40, 0],
          y: [0, -60, -120, 0],
          scale: [1, 0.8, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-25"
        style={{ background: "linear-gradient(180deg, #00FFFF 0%, #FF00FF 100%)" }}
        animate={{
          rotate: [0, 180, 360],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left: Asymmetrical Typography */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative"
          >
            {/* Wave Typography - TalesFM */}
            <div className="relative mb-8">
              <motion.div
                className="flex items-baseline"
                initial={{ opacity: 0 }}
                animate={isLoaded ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                {["T", "a", "l", "e", "s"].map((letter, i) => (
                  <motion.span
                    key={`tales-${i}`}
                    className="text-7xl md:text-9xl font-light text-white/90 tracking-tight"
                    style={{ fontFamily: "var(--font-sans)" }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={isLoaded ? { y: [0, -5, 3, -2, 0][i % 5], opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 + i * 0.05 }}
                  >
                    {letter}
                  </motion.span>
                ))}
                {["F", "M"].map((letter, i) => (
                  <motion.span
                    key={`fm-${i}`}
                    className="text-7xl md:text-9xl font-black text-white tracking-tight"
                    style={{
                      fontFamily: "var(--font-sans)",
                      textShadow: "0 0 40px rgba(223, 255, 0, 0.5)",
                    }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={isLoaded ? { y: [0, 5, -3, 2, 0][(i + 5) % 5], opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 1.1 + i * 0.05 }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.div>

              {/* Neon underline */}
              <motion.div
                className="h-[2px] mt-4"
                style={{
                  background: "linear-gradient(90deg, #DFFF00 0%, #00FFFF 50%, transparent 100%)",
                  boxShadow: "0 0 20px rgba(223, 255, 0, 0.6)",
                }}
                initial={{ width: 0 }}
                animate={isLoaded ? { width: "60%" } : {}}
                transition={{ duration: 1, delay: 1.3 }}
              />
            </div>

            {/* Subheading */}
            <motion.p
              className="text-xl md:text-2xl text-white/60 max-w-md tracking-wide leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              Designing a Better Way to Experience <span className="text-[#DFFF00]">Live Radio</span>
            </motion.p>

            {/* Live Now Indicator */}
            <motion.div
              className="mt-8 inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.8 }}
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-[#FF00FF]"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              />
              <span className="text-sm text-white/70 font-mono">LIVE NOW</span>
              <span className="text-sm text-white/40">|</span>
              <span className="text-sm text-[#00FFFF]">Smooth Jazz 24/7</span>
            </motion.div>

            {/* UI Experiment Badge */}
            <motion.div
              className="mt-6 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={isLoaded ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 2 }}
            >
              <div className="px-3 py-1 rounded bg-[#DFFF00]/10 border border-[#DFFF00]/30">
                <span className="text-xs font-mono text-[#DFFF00]">THE UI EXPERIMENT</span>
              </div>
              <span className="text-xs text-white/40">React Native Visual Performance</span>
            </motion.div>
          </motion.div>

          {/* Right: Glass Disk */}
          <motion.div
            ref={diskRef}
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 1.2,
              delay: 0.3,
              type: "spring",
              stiffness: 100,
            }}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              perspective: 1000,
            }}
          >
            {/* Outer Glow Ring */}
            <motion.div
              className="absolute w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full"
              style={{
                background: "conic-gradient(from 0deg, #DFFF00, #00FFFF, #FF00FF, #DFFF00)",
                filter: "blur(40px)",
                opacity: 0.4,
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />

            {/* Glass Record Disk */}
            <motion.div
              className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px] rounded-full"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.15)",
                boxShadow: `
                  0 0 60px rgba(223, 255, 0, 0.2),
                  0 0 120px rgba(0, 255, 255, 0.1),
                  inset 0 0 60px rgba(255, 255, 255, 0.05)
                `,
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Inner Grooves (Vinyl Lines) */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full border border-white/5"
                  style={{
                    width: `${80 - i * 10}%`,
                    height: `${80 - i * 10}%`,
                    top: `${10 + i * 5}%`,
                    left: `${10 + i * 5}%`,
                  }}
                />
              ))}

              {/* Center Label */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #DFFF00 0%, #00FFFF 100%)",
                  boxShadow: "0 0 30px rgba(223, 255, 0, 0.5)",
                }}
              >
                <Radio className="w-10 h-10 md:w-12 md:h-12 text-[#0F0F1B]" />
              </div>

              {/* Refractive Light Sweeps */}
              <motion.div
                className="absolute inset-0 rounded-full overflow-hidden"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <div
                  className="absolute top-0 left-1/2 w-1 h-1/2 origin-bottom"
                  style={{
                    background: "linear-gradient(to top, transparent, rgba(255,255,255,0.3))",
                  }}
                />
              </motion.div>

              {/* Prismatic Edge Reflections */}
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: `conic-gradient(
                    from ${mousePosition.x * 0.1}deg,
                    transparent 0deg,
                    rgba(0, 255, 255, 0.2) 60deg,
                    transparent 120deg,
                    rgba(255, 0, 255, 0.2) 180deg,
                    transparent 240deg,
                    rgba(223, 255, 0, 0.2) 300deg,
                    transparent 360deg
                  )`,
                }}
              />
            </motion.div>

            {/* Floating Frequency Waves */}
            <motion.div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-end gap-1"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-gradient-to-t from-[#DFFF00] to-[#00FFFF] rounded-full"
                  animate={{
                    height: [10, 30 + Math.random() * 20, 10],
                  }}
                  transition={{
                    duration: 0.5 + Math.random() * 0.5,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Tuning Bar (Bottom Scrubber) */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-16 border-t border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 2.2 }}
      >
        {/* The thin frequency line */}
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Frequency Markers */}
        <div className="absolute top-1/2 left-0 right-0 flex justify-between px-8 md:px-16 -translate-y-1/2">
          {frequencies.map((freq, i) => (
            <div key={freq} className="flex flex-col items-center gap-1">
              <div
                className={`w-[2px] h-3 rounded-full transition-all duration-300 ${
                  frequency === freq ? "bg-[#DFFF00] h-5" : "bg-white/30"
                }`}
              />
              <span
                className={`text-[10px] font-mono transition-all duration-300 ${
                  frequency === freq ? "text-[#DFFF00]" : "text-white/30"
                }`}
              >
                {freq}
              </span>
            </div>
          ))}
        </div>

        {/* Floating Frequency Indicator near cursor */}
        <motion.div
          className="fixed pointer-events-none z-50 px-3 py-1 rounded-full bg-[#0F0F1B]/80 border border-[#DFFF00]/50 backdrop-blur-sm"
          style={{
            left: mousePosition.x,
            top: mousePosition.y - 50,
            transform: "translateX(-50%)",
          }}
          animate={{ opacity: mousePosition.y > 0 ? 1 : 0 }}
        >
          <div className="flex items-center gap-2">
            <Waves className="w-3 h-3 text-[#DFFF00]" />
            <span className="text-sm font-mono text-[#DFFF00]">{frequency} FM</span>
          </div>
        </motion.div>

        {/* Audio-Reactive Cursor Glow (subtle ring around cursor) */}
        <motion.div
          className="fixed pointer-events-none z-40 rounded-full border border-[#DFFF00]/30"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            transform: "translate(-50%, -50%)",
            width: 40 * cursorScale,
            height: 40 * cursorScale,
            boxShadow: `0 0 ${20 * cursorScale}px rgba(223, 255, 0, 0.3)`,
          }}
        />
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ delay: 2.5 }}
      >
        <span className="text-xs text-white/30 font-mono tracking-widest">SCROLL TO EXPLORE</span>
        <motion.div
          className="w-[1px] h-8 bg-gradient-to-b from-[#DFFF00] to-transparent"
          animate={{ scaleY: [1, 0.5, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        />
      </motion.div>
    </section>
  )
}
