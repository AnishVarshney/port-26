"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  AlertTriangle,
  Clock,
  GitBranch,
  Terminal,
  Zap,
  AlertCircle,
  ArrowRight,
  Coffee,
  Code2,
  FileWarning,
  Layers,
  Package,
} from "lucide-react"

// Developer's Journal entries for Phase I
const journalEntries = [
  {
    day: "Day 1-5",
    title: "Firebase Setup",
    note: "No backend experience. Started with Firebase docs at midnight.",
    icon: Coffee,
  },
  {
    day: "Day 6-15",
    title: "Core Recording",
    note: "Built real-time audio capture. Learned AVFoundation the hard way.",
    icon: Code2,
  },
  {
    day: "Day 16-25",
    title: "Transcription Pipeline",
    note: "Integrated Speech-to-Text. Accuracy issues, lots of debugging.",
    icon: Terminal,
  },
  {
    day: "Day 26-35",
    title: "UI/UX Polish",
    note: "React Native animations, custom components. Sleep was optional.",
    icon: Layers,
  },
  {
    day: "Day 36-45",
    title: "App Store Push",
    note: "Review rejections, metadata fixes. Finally approved at 3 AM.",
    icon: Zap,
  },
]

// Friction nodes for Phase II
const frictionNodes = [
  {
    id: "android-ndk",
    label: "Android NDK",
    x: 20,
    y: 30,
    connections: ["cmake", "gradle"],
    errorLog: "NDK version mismatch: Expected r21e, found r23. Build failed after 47 minutes.",
    severity: "critical",
  },
  {
    id: "cmake",
    label: "CMake",
    x: 45,
    y: 20,
    connections: ["native-modules"],
    errorLog: "CMakeLists.txt configuration error. Native module compilation failed.",
    severity: "warning",
  },
  {
    id: "cocoapods",
    label: "CocoaPods",
    x: 75,
    y: 35,
    connections: ["ios-build"],
    errorLog: "Pod install conflicts: React-Core requires 0.71, but project locked to 0.68.",
    severity: "critical",
  },
  {
    id: "gradle",
    label: "Gradle",
    x: 30,
    y: 55,
    connections: ["android-ndk", "native-modules"],
    errorLog: "Gradle sync failed. Peer dependency conflict in react-native-audio.",
    severity: "warning",
  },
  {
    id: "native-modules",
    label: "Native Modules",
    x: 55,
    y: 45,
    connections: ["cmake", "gradle", "cocoapods"],
    errorLog: "Bridge overhead: 40ms latency on audio buffer transfer.",
    severity: "error",
  },
  {
    id: "ios-build",
    label: "iOS Build",
    x: 80,
    y: 60,
    connections: ["cocoapods"],
    errorLog: "Xcode 15 compatibility issues. Build time increased by 40%.",
    severity: "error",
  },
]

// Screenshots placeholders for Phase I
const screenshots = [
  { id: 1, label: "Early UI v0.1", date: "Week 1" },
  { id: 2, label: "Recording Flow", date: "Week 2" },
  { id: 3, label: "Transcription", date: "Week 3" },
  { id: 4, label: "Notes List", date: "Week 4" },
  { id: 5, label: "Settings", date: "Week 5" },
  { id: 6, label: "App Store v1", date: "Week 6" },
]

export function VTNJourneySection() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [selectedJournal, setSelectedJournal] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Background density increases as user scrolls through Phase II
  const gridDensity = useTransform(scrollYProgress, [0.3, 0.8], [1, 3])
  const backgroundOpacity = useTransform(scrollYProgress, [0.3, 0.8], [0.02, 0.06])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #050505 0%, #0A0F1A 50%, #0D1117 100%)",
      }}
    >
      {/* Dynamic Background Grid - Gets denser in Phase II */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: backgroundOpacity }}>
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 149, 0, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 149, 0, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "30px 30px",
          }}
        />
      </motion.div>

      {/* Fragmented overlay for Phase II area */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(255, 59, 48, 0.1) 10px,
              rgba(255, 59, 48, 0.1) 11px
            )
          `,
        }}
      />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-[#FF9500] mb-4 block">// development_timeline</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">The Build Story</h2>
          <p className="font-mono text-sm text-white/40 max-w-xl mx-auto">
            From zero backend knowledge to production in 45 days—then hitting the wall of hybrid complexity.
          </p>
        </motion.div>

        {/* Timeline Ribbon Container */}
        <div className="relative">
          {/* Central Timeline Ribbon */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#FF9500] via-[#FF9500]/50 to-[#FF3B30] transform -translate-x-1/2 hidden lg:block" />

          {/* Timeline Nodes */}
          <div
            className="absolute left-1/2 top-[15%] w-3 h-3 rounded-full bg-[#FF9500] transform -translate-x-1/2 hidden lg:block"
            style={{ boxShadow: "0 0 20px #FF9500" }}
          />
          <div
            className="absolute left-1/2 top-[60%] w-3 h-3 rounded-full bg-[#FF3B30] transform -translate-x-1/2 hidden lg:block"
            style={{ boxShadow: "0 0 20px #FF3B30" }}
          />

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* PHASE I: THE SPRINT (Left Side) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Phase Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#FF9500] animate-pulse" />
                  <span className="font-mono text-sm text-[#FF9500] tracking-widest">PHASE_01</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">THE_SPRINT</h3>
                <p className="font-mono text-xs text-white/40">45 days • Solo Developer • Zero to App Store</p>
              </div>

              {/* Polaroid-style Screenshot Grid */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {screenshots.map((shot, index) => (
                  <motion.div
                    key={shot.id}
                    initial={{ opacity: 0, y: 20, rotate: -5 + Math.random() * 10 }}
                    whileInView={{ opacity: 1, y: 0, rotate: -3 + index * 1.5 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                    className="relative bg-white p-2 rounded shadow-lg cursor-pointer"
                    style={{
                      boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                    }}
                  >
                    {/* Screenshot Placeholder */}
                    <div className="aspect-[9/16] bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] rounded flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-[#FF9500]/20 flex items-center justify-center">
                          <Code2 className="w-4 h-4 text-[#FF9500]" />
                        </div>
                        <span className="text-[8px] text-white/40 font-mono">{shot.label}</span>
                      </div>
                    </div>
                    {/* Polaroid Label */}
                    <div className="text-center py-2">
                      <span className="text-[10px] text-gray-600 font-mono">{shot.date}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Developer's Journal Overlay */}
              <div className="bg-[#0A0A0A] border border-[#FF9500]/20 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Terminal className="w-4 h-4 text-[#FF9500]" />
                  <span className="font-mono text-xs text-[#FF9500]">developer_journal.md</span>
                </div>

                <div className="space-y-3">
                  {journalEntries.map((entry, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setSelectedJournal(selectedJournal === index ? null : index)}
                      className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                        selectedJournal === index ? "bg-[#FF9500]/10 border border-[#FF9500]/30" : "hover:bg-white/5"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#FF9500]/10 flex items-center justify-center flex-shrink-0">
                        <entry.icon className="w-4 h-4 text-[#FF9500]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs text-[#FF9500]">{entry.day}</span>
                          <span className="font-mono text-xs text-white/60">—</span>
                          <span className="font-mono text-xs text-white">{entry.title}</span>
                        </div>
                        <AnimatePresence>
                          {selectedJournal === index && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="text-xs text-slate-400 leading-relaxed"
                            >
                              {entry.note}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Sprint Stats */}
                <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="font-mono text-2xl font-bold text-[#FF9500]">45</div>
                    <div className="font-mono text-[10px] text-white/40">Days</div>
                  </div>
                  <div className="text-center">
                    <div className="font-mono text-2xl font-bold text-[#FF9500]">1</div>
                    <div className="font-mono text-[10px] text-white/40">Developer</div>
                  </div>
                  <div className="text-center">
                    <div className="font-mono text-2xl font-bold text-[#FF9500]">∞</div>
                    <div className="font-mono text-[10px] text-white/40">Coffee</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* PHASE II: THE FRICTION (Right Side) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative lg:mt-32"
            >
              {/* Phase Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#FF3B30] animate-pulse" />
                  <span className="font-mono text-sm text-[#FF3B30] tracking-widest">PHASE_02</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">THE_FRICTION</h3>
                <p className="font-mono text-xs text-white/40">Scaling Pains • Hybrid Overhead • Technical Debt</p>
              </div>

              {/* Infrastructure Stress-Test Diagram */}
              <div className="relative bg-[#0A0A0A] border border-[#FF3B30]/20 rounded-lg p-6 min-h-[400px]">
                {/* Diagram Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <GitBranch className="w-4 h-4 text-[#FF3B30]" />
                    <span className="font-mono text-xs text-[#FF3B30]">dependency_graph.viz</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-3 h-3 text-[#FF3B30]" />
                    <span className="font-mono text-[10px] text-[#FF3B30]">6 conflicts detected</span>
                  </div>
                </div>

                {/* Node-and-Link Diagram */}
                <div className="relative h-[300px]">
                  {/* Connection Lines (SVG) */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {frictionNodes.map((node) =>
                      node.connections.map((targetId) => {
                        const target = frictionNodes.find((n) => n.id === targetId)
                        if (!target) return null
                        const isHighlighted = hoveredNode === node.id || hoveredNode === targetId
                        return (
                          <motion.line
                            key={`${node.id}-${targetId}`}
                            x1={`${node.x}%`}
                            y1={`${node.y}%`}
                            x2={`${target.x}%`}
                            y2={`${target.y}%`}
                            stroke={isHighlighted ? "#FF3B30" : "#FF3B30"}
                            strokeWidth={isHighlighted ? 2 : 1}
                            strokeOpacity={isHighlighted ? 0.8 : 0.2}
                            strokeDasharray={isHighlighted ? "0" : "4 4"}
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                        )
                      }),
                    )}
                  </svg>

                  {/* Nodes */}
                  {frictionNodes.map((node, index) => (
                    <motion.div
                      key={node.id}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                      className="absolute cursor-pointer group"
                      style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%, -50%)" }}
                    >
                      {/* Node Circle */}
                      <motion.div
                        className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          node.severity === "critical"
                            ? "border-[#FF3B30] bg-[#FF3B30]/10"
                            : node.severity === "error"
                              ? "border-[#FF9500] bg-[#FF9500]/10"
                              : "border-yellow-500 bg-yellow-500/10"
                        }`}
                        whileHover={{ scale: 1.2 }}
                        animate={
                          hoveredNode === node.id
                            ? {
                                boxShadow: `0 0 20px ${node.severity === "critical" ? "#FF3B30" : node.severity === "error" ? "#FF9500" : "#EAB308"}`,
                              }
                            : {}
                        }
                      >
                        {node.severity === "critical" ? (
                          <AlertCircle className="w-5 h-5 text-[#FF3B30]" />
                        ) : node.severity === "error" ? (
                          <FileWarning className="w-5 h-5 text-[#FF9500]" />
                        ) : (
                          <Package className="w-5 h-5 text-yellow-500" />
                        )}
                      </motion.div>

                      {/* Node Label */}
                      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                        <span className="font-mono text-[10px] text-white/60">{node.label}</span>
                      </div>

                      {/* Error Log Popup */}
                      <AnimatePresence>
                        {hoveredNode === node.id && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-8 z-20 w-64"
                          >
                            <div className="bg-[#1A1A1A] border border-[#FF3B30]/30 rounded-lg p-3 shadow-xl">
                              <div className="flex items-center gap-2 mb-2">
                                <Terminal className="w-3 h-3 text-[#FF3B30]" />
                                <span className="font-mono text-[10px] text-[#FF3B30]">ERROR_LOG</span>
                              </div>
                              <p className="font-mono text-[10px] text-white/70 leading-relaxed">{node.errorLog}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>

                {/* Friction Metrics */}
                <div className="mt-8 grid grid-cols-3 gap-4">
                  <div className="bg-[#FF3B30]/5 border border-[#FF3B30]/20 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Clock className="w-3 h-3 text-[#FF3B30]" />
                      <span className="font-mono text-lg font-bold text-[#FF3B30]">+40%</span>
                    </div>
                    <span className="font-mono text-[10px] text-white/40">Build Time</span>
                  </div>
                  <div className="bg-[#FF3B30]/5 border border-[#FF3B30]/20 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <AlertTriangle className="w-3 h-3 text-[#FF3B30]" />
                      <span className="font-mono text-lg font-bold text-[#FF3B30]">12+</span>
                    </div>
                    <span className="font-mono text-[10px] text-white/40">Dep Conflicts</span>
                  </div>
                  <div className="bg-[#FF3B30]/5 border border-[#FF3B30]/20 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Layers className="w-3 h-3 text-[#FF3B30]" />
                      <span className="font-mono text-lg font-bold text-[#FF3B30]">40ms</span>
                    </div>
                    <span className="font-mono text-[10px] text-white/40">Bridge Latency</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* PIVOT TRIGGER */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <div className="inline-block">
              {/* Glitch Effect Container */}
              <motion.div
                className="relative"
                animate={{
                  x: [0, -2, 2, -1, 1, 0],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 3,
                }}
              >
                <div className="bg-[#FF3B30]/10 border-2 border-[#FF3B30] rounded-lg px-8 py-4 cursor-pointer group hover:bg-[#FF3B30]/20 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-[#FF3B30]" />
                      <span className="font-mono text-sm text-[#FF3B30] tracking-wider">SYSTEM_OVERLOAD</span>
                    </div>
                    <div className="w-px h-6 bg-[#FF3B30]/30" />
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-white font-bold">INITIATING NATIVE MIGRATION</span>
                      <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Glitch Layers */}
                <div
                  className="absolute inset-0 bg-[#FF3B30]/10 border-2 border-[#FF3B30] rounded-lg opacity-0 group-hover:opacity-30 pointer-events-none"
                  style={{ transform: "translate(-2px, -2px)" }}
                />
                <div
                  className="absolute inset-0 bg-[#00FFFF]/10 border-2 border-[#00FFFF] rounded-lg opacity-0 group-hover:opacity-20 pointer-events-none"
                  style={{ transform: "translate(2px, 2px)" }}
                />
              </motion.div>
            </div>

            {/* Transition hint */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="font-mono text-xs text-white/30 mt-4"
            >
              // The hybrid architecture had reached its limit. Time to go native.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
