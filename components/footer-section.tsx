"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion"
import { Linkedin, Github, Apple, Copy, Check, ChevronUp } from "lucide-react"

export function FooterSection() {
  const [copied, setCopied] = useState(false)
  const [currentTime, setCurrentTime] = useState("")
  const [availabilityMode, setAvailabilityMode] = useState<"collaboration" | "building">("collaboration")
  const footerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  })

  const parallaxY = useTransform(scrollYProgress, [0, 1], [100, 0])
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 0.08])

  // Live time update
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
      }
      setCurrentTime(now.toLocaleTimeString("en-US", options))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("anishvarshney444@gmail.com")
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy email")
    }
  }

  const handleBackToTop = () => {
    // Fast warp scroll with blur effect
    document.body.style.transition = "filter 0.3s ease"
    document.body.style.filter = "blur(10px)"

    window.scrollTo({ top: 0, behavior: "smooth" })

    setTimeout(() => {
      document.body.style.filter = "blur(0px)"
      setTimeout(() => {
        document.body.style.transition = ""
        document.body.style.filter = ""
      }, 300)
    }, 500)
  }

  const socialLinks = [
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/anishvarshney", color: "#0A66C2" },
    { name: "GitHub", icon: Github, href: "https://github.com/anishvarshney", color: "#FFFFFF" },
    { name: "App Store", icon: Apple, href: "https://apps.apple.com", color: "#007AFF" },
  ]

  return (
    <footer ref={footerRef} id="footer" className="relative min-h-[80vh] bg-black overflow-hidden">
      {/* Massive Parallax Background Text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        style={{ y: parallaxY, opacity: textOpacity }}
      >
        <h2 className="text-[15vw] font-black tracking-tighter text-white whitespace-nowrap font-mono">
          ANISH VARSHNEY
        </h2>
      </motion.div>

      {/* Data Stream Divider Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent overflow-hidden">
        <motion.div
          className="absolute top-0 h-full w-32 bg-gradient-to-r from-transparent via-[#007AFF] to-transparent"
          animate={{ x: ["-128px", "calc(100vw + 128px)"] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>

      {/* Status Badge - Current Focus */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="absolute top-6 right-6 md:top-8 md:right-8"
      >
        <div className="px-4 py-2 bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-full">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#007AFF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#007AFF]" />
            </span>
            <span className="text-xs font-mono text-slate-400">
              Current Focus: <span className="text-white">Scaling Native Architectures @ Web3task</span>
            </span>
          </div>
        </div>
      </motion.div>

      {/* Main Footer Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6 py-20">
        {/* Email CTA with Copy to Clipboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <motion.button
            onClick={handleCopyEmail}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-8 py-4 bg-[#0A0A0A] border border-white/10 rounded-xl overflow-hidden"
          >
            {/* Hover flash effect */}
            <motion.div
              className="absolute inset-0 bg-[#007AFF]/20"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />

            <div className="relative flex items-center gap-4">
              <span className="text-xl md:text-2xl font-medium text-white tracking-tight">
                anishvarshney444@gmail.com
              </span>
              <motion.div animate={copied ? { scale: [1, 1.2, 1] } : {}} transition={{ duration: 0.3 }}>
                {copied ? (
                  <Check className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Copy className="w-5 h-5 text-slate-400 group-hover:text-[#007AFF] transition-colors" />
                )}
              </motion.div>
            </div>

            {/* Jitter effect on hover */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              whileHover={{
                x: [0, -2, 2, -1, 1, 0],
                transition: { duration: 0.4 },
              }}
            />
          </motion.button>

          {copied && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center text-sm text-emerald-400 mt-2 font-mono"
            >
              Copied to clipboard!
            </motion.p>
          )}
        </motion.div>

        {/* Social Links - Magnetic Pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {socialLinks.map((link) => (
            <MagneticSocialPill key={link.name} link={link} />
          ))}
        </motion.div>

        {/* Availability Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 px-6 py-3 bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-full">
            <span
              className={`text-sm font-mono transition-colors ${availabilityMode === "collaboration" ? "text-emerald-400" : "text-slate-500"}`}
            >
              Open for Collaboration
            </span>

            {/* 3D Toggle Switch */}
            <button
              onClick={() => setAvailabilityMode((prev) => (prev === "collaboration" ? "building" : "collaboration"))}
              className="relative w-14 h-7 rounded-full bg-[#1F1F1F] border border-white/10 shadow-inner"
              style={{
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.5)",
              }}
            >
              <motion.div
                className="absolute top-1 w-5 h-5 rounded-full shadow-lg"
                animate={{
                  left: availabilityMode === "collaboration" ? "4px" : "calc(100% - 24px)",
                  backgroundColor: availabilityMode === "collaboration" ? "#10B981" : "#007AFF",
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                style={{
                  boxShadow:
                    "0 2px 8px rgba(0,0,0,0.3), 0 0 10px " +
                    (availabilityMode === "collaboration" ? "rgba(16,185,129,0.5)" : "rgba(0,122,255,0.5)"),
                }}
              />
            </button>

            <span
              className={`text-sm font-mono transition-colors ${availabilityMode === "building" ? "text-[#007AFF]" : "text-slate-500"}`}
            >
              Building Systems
            </span>
          </div>
        </motion.div>

        {/* Location/Time Node */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-6 text-sm font-mono text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>New Delhi, India</span>
            </div>
            <div className="w-px h-4 bg-slate-700" />
            <div className="flex items-center gap-2">
              <span className="text-slate-400">IST</span>
              <span className="text-white tabular-nums">{currentTime}</span>
            </div>
          </div>
        </motion.div>

        {/* Back to Top - Re-run Sequence */}
        <motion.button
          onClick={handleBackToTop}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center gap-2 px-6 py-3 bg-[#007AFF]/10 border border-[#007AFF]/30 rounded-full text-[#007AFF] hover:bg-[#007AFF]/20 transition-colors"
        >
          <span className="text-sm font-mono">re-run_sequence</span>
          <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
            <ChevronUp className="w-4 h-4" />
          </motion.div>
        </motion.button>
      </div>

      {/* Build Version */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="absolute bottom-4 right-6 text-[10px] font-mono text-slate-600"
      >
        v2.0.26-stable-anish
      </motion.div>

      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="absolute bottom-4 left-6 text-[10px] font-mono text-slate-600"
      >
        © {new Date().getFullYear()} Anish Varshney. All systems operational.
      </motion.div>
    </footer>
  )
}

// Magnetic Social Pill Component
function MagneticSocialPill({
  link,
}: { link: { name: string; icon: React.ElementType; href: string; color: string } }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { stiffness: 300, damping: 20 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY

    x.set(distanceX * 0.3)
    y.set(distanceY * 0.3)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const Icon = link.icon

  return (
    <motion.a
      ref={ref}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="group relative flex items-center gap-3 px-5 py-3 bg-[#0A0A0A] border border-white/10 rounded-full hover:border-white/20 transition-colors overflow-hidden"
    >
      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: `radial-gradient(circle at center, ${link.color}20 0%, transparent 70%)`,
        }}
      />

      <div className="relative">
        <Icon className="w-5 h-5 transition-colors" style={{ color: link.color }} />
      </div>
      <span className="relative text-sm font-medium text-white">{link.name}</span>

      {/* Preview indicator on hover */}
      <motion.div
        className="absolute right-3 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: link.color }}
      />
    </motion.a>
  )
}
