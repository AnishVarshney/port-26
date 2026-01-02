"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  Watch,
  Server,
  Shield,
  Check,
  X,
  ChevronRight,
  Zap,
  Database,
  Cpu,
  Wifi,
  Lock,
  Unlock,
  Crown,
  User,
  Eye,
  Volume2,
  Brain,
} from "lucide-react"

// App Store rejection data
const rejectionTimeline = [
  {
    id: 1,
    date: "2024-02-15",
    guideline: "Guideline 5.1.1",
    issue: "Data Collection and Storage",
    rejection:
      "Your app collects user data but does not clearly explain how voice recordings are processed and stored.",
    solution: `// Added comprehensive privacy disclosure
func presentPrivacyDisclosure() {
    let alert = UIAlertController(
        title: "Voice Processing",
        message: "Audio is processed on-device using Apple's Speech Framework. Transcripts are stored locally in encrypted CoreData.",
        preferredStyle: .alert
    )
    // User must acknowledge before first recording
    present(alert, animated: true)
}`,
    status: "resolved",
  },
  {
    id: 2,
    date: "2024-02-22",
    guideline: "Guideline 2.1",
    issue: "App Completeness",
    rejection: "WatchOS app crashes when attempting to sync without phone nearby.",
    solution: `// Implemented graceful degradation
func syncToPhone() {
    guard WCSession.default.isReachable else {
        // Queue for later sync instead of crashing
        LocalSyncQueue.shared.enqueue(recording)
        showOfflineIndicator()
        return
    }
    performImmediateSync()
}`,
    status: "resolved",
  },
  {
    id: 3,
    date: "2024-03-01",
    guideline: "Guideline 3.1.1",
    issue: "In-App Purchase",
    rejection: "Premium features accessible without completing purchase flow.",
    solution: `// Implemented strict entitlement verification
class EntitlementManager {
    func verifyAccess(_ feature: Feature) -> Bool {
        let receipt = StoreKit.receipt
        let entitlements = receipt.decode()
        return entitlements.contains(feature.id) 
            && !entitlements.isExpired
    }
}`,
    status: "resolved",
  },
  {
    id: 4,
    date: "2024-03-08",
    guideline: "Final Review",
    issue: "All Guidelines Met",
    rejection: "",
    solution: "App Store Approved - Ready for Distribution",
    status: "approved",
  },
]

// RBAC feature access matrix
const rbacFeatures = {
  GUEST: {
    color: "#6B7280",
    features: [
      { name: "Basic Recording", enabled: true },
      { name: "3 Notes Limit", enabled: true },
      { name: "On-Device Transcription", enabled: true },
      { name: "AI Summaries", enabled: false },
      { name: "Unlimited Storage", enabled: false },
      { name: "WatchOS Sync", enabled: false },
      { name: "Collections", enabled: false },
      { name: "Export Options", enabled: false },
    ],
  },
  AUTH: {
    color: "#007AFF",
    features: [
      { name: "Basic Recording", enabled: true },
      { name: "25 Notes Limit", enabled: true },
      { name: "On-Device Transcription", enabled: true },
      { name: "AI Summaries", enabled: true },
      { name: "Unlimited Storage", enabled: false },
      { name: "WatchOS Sync", enabled: true },
      { name: "Collections", enabled: false },
      { name: "Export Options", enabled: false },
    ],
  },
  PREMIUM: {
    color: "#00FF41",
    features: [
      { name: "Basic Recording", enabled: true },
      { name: "Unlimited Notes", enabled: true },
      { name: "On-Device Transcription", enabled: true },
      { name: "AI Summaries", enabled: true },
      { name: "Unlimited Storage", enabled: true },
      { name: "WatchOS Sync", enabled: true },
      { name: "Collections", enabled: true },
      { name: "Export Options", enabled: true },
    ],
  },
}

// Data filament paths
const dataFilaments = [
  { id: "watch", label: "STREAMING: AUDIO_CHUNKS", delay: 0 },
  { id: "rbac", label: "AUTH_STATUS: VERIFIED", delay: 0.3 },
  { id: "storage", label: "LATENCY: <200ms", delay: 0.6 },
]

export function VTNSystemOrchestrationSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedTier, setSelectedTier] = useState<"GUEST" | "AUTH" | "PREMIUM">("PREMIUM")
  const [selectedRejection, setSelectedRejection] = useState<number | null>(null)
  const [pulseCount, setPulseCount] = useState(0)
  const [flowActive, setFlowActive] = useState(true)
  const [packetPosition, setPacketPosition] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1])

  // Global pulse effect every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseCount((prev) => prev + 1)
    }, 15000)
    return () => clearInterval(interval)
  }, [])

  // Packet flow animation
  useEffect(() => {
    if (!flowActive) return
    const interval = setInterval(() => {
      setPacketPosition((prev) => (prev + 1) % 100)
    }, 30)
    return () => clearInterval(interval)
  }, [flowActive])

  return (
    <section ref={containerRef} className="relative min-h-screen py-32 overflow-hidden">
      {/* Background with Global Pulse */}
      <div className="absolute inset-0 bg-[#050505]">
        {/* Radial gradient base */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,122,255,0.03)_0%,transparent_70%)]" />

        {/* Global Pulse Effect - emanates every 15 seconds */}
        <AnimatePresence>
          <motion.div
            key={pulseCount}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#007AFF]/20"
            initial={{ width: 0, height: 0, opacity: 0.5 }}
            animate={{ width: 2000, height: 2000, opacity: 0 }}
            transition={{ duration: 4, ease: "easeOut" }}
          />
        </AnimatePresence>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <motion.div style={{ opacity, scale }} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFCC00]/10 border border-[#FFCC00]/30 rounded-full mb-6">
            <div className="w-2 h-2 rounded-full bg-[#FFCC00] animate-pulse" />
            <span className="text-[#FFCC00] text-sm font-mono">PHASE_04</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-mono font-bold text-white mb-4 tracking-tight">
            SYSTEM_ORCHESTRATION
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            The nervous system of VTN — cross-device sync, role-based access, and App Store compliance
          </p>
        </motion.div>

        {/* Core & Orbit Layout */}
        <div className="relative">
          {/* Central Backend Node */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <div className="relative">
              {/* Glow rings */}
              <div className="absolute inset-0 -m-8 rounded-full bg-[#007AFF]/20 blur-xl animate-pulse" />
              <div className="absolute inset-0 -m-4 rounded-full bg-[#007AFF]/10 blur-md" />

              {/* Core node */}
              <motion.div
                className="relative w-32 h-32 rounded-full bg-gradient-to-br from-[#1a1a2e] to-[#0a0a14] border border-[#007AFF]/50 flex items-center justify-center"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(0,122,255,0.3)",
                    "0 0 40px rgba(0,122,255,0.5)",
                    "0 0 20px rgba(0,122,255,0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <div className="text-center">
                  <Server className="w-8 h-8 text-[#007AFF] mx-auto mb-1" />
                  <span className="text-[10px] text-white/70 font-mono">BACKEND</span>
                </div>

                {/* Orbiting particles */}
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-[#007AFF]"
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                    style={{
                      top: "50%",
                      left: "50%",
                      transformOrigin: `${40 + i * 15}px 0`,
                    }}
                  />
                ))}
              </motion.div>

              {/* Data labels floating around core */}
              {dataFilaments.map((filament, index) => (
                <motion.div
                  key={filament.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + filament.delay }}
                  className="absolute whitespace-nowrap"
                  style={{
                    top: index === 0 ? "-60px" : index === 1 ? "50%" : "140px",
                    left: index === 1 ? "160px" : "50%",
                    transform: index === 1 ? "translateY(-50%)" : "translateX(-50%)",
                  }}
                >
                  <span className="text-[10px] font-mono text-[#007AFF]/70 bg-[#007AFF]/10 px-2 py-1 rounded">
                    {filament.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Three-Module Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-[700px]">
            {/* WatchOS Terminal - Top Left */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="relative h-full">
                {/* Data filament connection */}
                <svg
                  className="absolute top-1/2 right-0 w-32 h-2 overflow-visible"
                  style={{ transform: "translateX(100%)" }}
                >
                  <defs>
                    <linearGradient id="watchGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#007AFF" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#007AFF" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <line
                    x1="0"
                    y1="1"
                    x2="120"
                    y2="1"
                    stroke="url(#watchGradient)"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  >
                    <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.5s" repeatCount="indefinite" />
                  </line>
                  {/* Flowing packet */}
                  <circle r="4" fill="#007AFF">
                    <animate attributeName="cx" from="0" to="120" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;1;0" dur="2s" repeatCount="indefinite" />
                  </circle>
                </svg>

                <div className="bg-[#0a0a0f]/80 backdrop-blur-xl border border-[#007AFF]/20 rounded-2xl p-6 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#007AFF]/10 flex items-center justify-center">
                      <Watch className="w-5 h-5 text-[#007AFF]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">WatchOS Terminal</h3>
                      <span className="text-xs text-white/40 font-mono">DEVICE_BRIDGE</span>
                    </div>
                  </div>

                  {/* Watch UI Render */}
                  <div className="relative mx-auto w-48 h-56 mb-6">
                    {/* Watch frame */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-[40px] p-2">
                      <div className="w-full h-full bg-black rounded-[36px] overflow-hidden border border-white/10">
                        {/* Watch screen content */}
                        <div className="p-4 h-full flex flex-col">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[10px] text-white/50">VoiceToNotes</span>
                            <div className="w-2 h-2 rounded-full bg-[#00FF41] animate-pulse" />
                          </div>

                          {/* Recording UI */}
                          <div className="flex-1 flex flex-col items-center justify-center">
                            <motion.div
                              className="w-16 h-16 rounded-full bg-[#FF3B30]/20 flex items-center justify-center mb-3"
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                            >
                              <div className="w-10 h-10 rounded-full bg-[#FF3B30] flex items-center justify-center">
                                <Volume2 className="w-5 h-5 text-white" />
                              </div>
                            </motion.div>
                            <span className="text-xs text-white/70">Recording...</span>
                            <span className="text-[10px] text-[#007AFF] font-mono mt-1">02:34</span>
                          </div>

                          {/* Sync status */}
                          <div className="flex items-center justify-center gap-1 text-[10px] text-white/40">
                            <Wifi className="w-3 h-3" />
                            <span>Syncing to iPhone</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Digital Crown */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-3 h-10 bg-gradient-to-b from-[#3a3a3a] to-[#2a2a2a] rounded-r-full" />
                  </div>

                  {/* Packet Stream Graphic */}
                  <div className="bg-[#0a0a14] rounded-lg p-4 border border-white/5">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="w-4 h-4 text-[#007AFF]" />
                      <span className="text-xs text-white/70 font-mono">PACKET_STREAM</span>
                    </div>

                    <div className="space-y-2">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="flex items-center gap-2">
                          <motion.div
                            className="h-1.5 bg-[#007AFF]/30 rounded-full flex-1 overflow-hidden"
                            initial={{ opacity: 0.5 }}
                          >
                            <motion.div
                              className="h-full bg-[#007AFF] rounded-full"
                              animate={{ x: ["-100%", "200%"] }}
                              transition={{
                                duration: 1.5,
                                delay: i * 0.3,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "linear",
                              }}
                              style={{ width: "30%" }}
                            />
                          </motion.div>
                          <span className="text-[10px] text-white/30 font-mono w-16">
                            {["AUDIO", "META", "SYNC"][i]}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] text-white/40">WCSession Bridge</span>
                      <span className="text-[10px] text-[#00FF41] font-mono">CONNECTED</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Spacer for center node */}
            <div className="hidden lg:block lg:col-span-1" />

            {/* RBAC Logic Gate - Top Right */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-1"
            >
              <div className="relative h-full">
                {/* Data filament connection */}
                <svg
                  className="absolute top-1/2 left-0 w-32 h-2 overflow-visible"
                  style={{ transform: "translateX(-100%) scaleX(-1)" }}
                >
                  <defs>
                    <linearGradient id="rbacGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FFCC00" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#FFCC00" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="1" x2="120" y2="1" stroke="url(#rbacGradient)" strokeWidth="2" strokeDasharray="4 4">
                    <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.5s" repeatCount="indefinite" />
                  </line>
                  <circle r="4" fill="#FFCC00">
                    <animate attributeName="cx" from="0" to="120" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;1;0" dur="2s" repeatCount="indefinite" />
                  </circle>
                </svg>

                <div className="bg-[#0a0a0f]/80 backdrop-blur-xl border border-[#FFCC00]/20 rounded-2xl p-6 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#FFCC00]/10 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-[#FFCC00]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Logic Gate</h3>
                      <span className="text-xs text-white/40 font-mono">RBAC_SYSTEM</span>
                    </div>
                  </div>

                  {/* Tier Toggle */}
                  <div className="flex gap-2 mb-6">
                    {(["GUEST", "AUTH", "PREMIUM"] as const).map((tier) => (
                      <button
                        key={tier}
                        onClick={() => setSelectedTier(tier)}
                        className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono transition-all duration-300 flex items-center justify-center gap-1.5 ${
                          selectedTier === tier
                            ? "bg-white/10 border-2"
                            : "bg-white/5 border border-white/10 hover:bg-white/10"
                        }`}
                        style={{
                          borderColor: selectedTier === tier ? rbacFeatures[tier].color : undefined,
                          color: selectedTier === tier ? rbacFeatures[tier].color : "rgba(255,255,255,0.5)",
                        }}
                      >
                        {tier === "GUEST" && <User className="w-3 h-3" />}
                        {tier === "AUTH" && <Lock className="w-3 h-3" />}
                        {tier === "PREMIUM" && <Crown className="w-3 h-3" />}
                        {tier}
                      </button>
                    ))}
                  </div>

                  {/* Gate Schematic */}
                  <div className="bg-[#0a0a14] rounded-lg p-4 border border-white/5 mb-4">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="text-center">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-1">
                          <User className="w-4 h-4 text-white/50" />
                        </div>
                        <span className="text-[10px] text-white/30">Entry</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-white/30" />
                      <motion.div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${rbacFeatures[selectedTier].color}20` }}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                      >
                        {selectedTier === "GUEST" && (
                          <Unlock className="w-5 h-5" style={{ color: rbacFeatures[selectedTier].color }} />
                        )}
                        {selectedTier === "AUTH" && (
                          <Lock className="w-5 h-5" style={{ color: rbacFeatures[selectedTier].color }} />
                        )}
                        {selectedTier === "PREMIUM" && (
                          <Crown className="w-5 h-5" style={{ color: rbacFeatures[selectedTier].color }} />
                        )}
                      </motion.div>
                      <ChevronRight className="w-4 h-4 text-white/30" />
                      <div className="text-center">
                        <div className="w-8 h-8 rounded-full bg-[#00FF41]/20 flex items-center justify-center mb-1">
                          <Check className="w-4 h-4 text-[#00FF41]" />
                        </div>
                        <span className="text-[10px] text-white/30">Access</span>
                      </div>
                    </div>
                  </div>

                  {/* Feature Access Matrix */}
                  <div className="space-y-2">
                    {rbacFeatures[selectedTier].features.map((feature, index) => (
                      <motion.div
                        key={feature.name}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`flex items-center justify-between py-1.5 px-2 rounded transition-all duration-300 ${
                          feature.enabled ? "bg-white/5" : "bg-white/[0.02]"
                        }`}
                      >
                        <span className={`text-xs ${feature.enabled ? "text-white/70" : "text-white/30"}`}>
                          {feature.name}
                        </span>
                        {feature.enabled ? (
                          <Check className="w-3.5 h-3.5 text-[#00FF41]" />
                        ) : (
                          <X className="w-3.5 h-3.5 text-white/20" />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* War Room Ledger - Bottom Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <div className="bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0a0a14]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FF3B30]/10 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-[#FF3B30]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">War Room Ledger</h3>
                    <span className="text-xs text-white/40 font-mono">APP_STORE_COMPLIANCE</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/40">Final Status:</span>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-[#00FF41]/10 rounded-full">
                    <div className="w-2 h-2 rounded-full bg-[#00FF41] animate-pulse" />
                    <span className="text-xs text-[#00FF41] font-mono">APPROVED</span>
                  </div>
                </div>
              </div>

              {/* Rejection Timeline */}
              <div className="p-6">
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                  {rejectionTimeline.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex-shrink-0 w-72 p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                        item.status === "approved"
                          ? "bg-[#00FF41]/5 border-[#00FF41]/30 hover:border-[#00FF41]/50"
                          : selectedRejection === item.id
                            ? "bg-[#FF3B30]/10 border-[#FF3B30]/50"
                            : "bg-white/[0.02] border-white/10 hover:border-white/20"
                      }`}
                      onClick={() => setSelectedRejection(selectedRejection === item.id ? null : item.id)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-white/40 font-mono">{item.date}</span>
                        {item.status === "approved" ? (
                          <div className="flex items-center gap-1 text-[#00FF41]">
                            <Check className="w-3.5 h-3.5" />
                            <span className="text-xs font-mono">APPROVED</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-[#FF3B30]">
                            <X className="w-3.5 h-3.5" />
                            <span className="text-xs font-mono">REJECTED</span>
                          </div>
                        )}
                      </div>

                      <div className="mb-2">
                        <span
                          className={`text-xs font-mono px-2 py-0.5 rounded ${
                            item.status === "approved"
                              ? "bg-[#00FF41]/20 text-[#00FF41]"
                              : "bg-[#FFCC00]/20 text-[#FFCC00]"
                          }`}
                        >
                          {item.guideline}
                        </span>
                      </div>

                      <h4 className="text-sm text-white font-medium mb-2">{item.issue}</h4>

                      {item.rejection && <p className="text-xs text-white/40 line-clamp-2 mb-3">{item.rejection}</p>}

                      {item.status !== "approved" && (
                        <div className="flex items-center gap-1 text-[#007AFF] text-xs">
                          <span>View Solution</span>
                          <ChevronRight className="w-3 h-3" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Solution Popup */}
                <AnimatePresence>
                  {selectedRejection && selectedRejection !== 4 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="mt-4 bg-[#0a0a14] rounded-xl border border-[#007AFF]/30 overflow-hidden"
                    >
                      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#007AFF]/5">
                        <div className="flex items-center gap-2">
                          <Cpu className="w-4 h-4 text-[#007AFF]" />
                          <span className="text-sm text-white font-medium">Anish&apos;s Solution</span>
                        </div>
                        <button onClick={() => setSelectedRejection(null)} className="text-white/40 hover:text-white">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <pre className="p-4 text-xs text-white/70 overflow-x-auto font-mono">
                        {rejectionTimeline.find((r) => r.id === selectedRejection)?.solution}
                      </pre>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer Stats */}
              <div className="px-6 py-4 border-t border-white/10 bg-[#0a0a14] flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-white/40" />
                    <span className="text-xs text-white/40">PostgreSQL + Redis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-white/40" />
                    <span className="text-xs text-white/40">Node.js Backend</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-white/40" />
                    <span className="text-xs text-white/40">OpenAI GPT-4</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-lg font-bold text-[#00FF41]">18,000+</span>
                    <span className="text-xs text-white/40 ml-2">Active Users</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-white">4.8</span>
                    <span className="text-xs text-white/40 ml-2">App Store Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 15-Day Release Velocity Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10">
            <motion.div
              className="w-2 h-2 rounded-full bg-[#007AFF]"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
            <span className="text-xs text-white/50 font-mono">RELEASE_VELOCITY: 15_DAYS | GLOBAL_PULSE_ACTIVE</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
