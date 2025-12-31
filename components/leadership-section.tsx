"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import {
  AlertTriangle,
  GitBranch,
  Users,
  Zap,
  Shield,
  MessageSquare,
  Target,
  Rocket,
  CheckCircle2,
  ArrowRight,
  Cpu,
  Globe,
  Smartphone,
} from "lucide-react"

// Release Heatmap data - bi-weekly sprints
const heatmapData = [
  { week: "W1", status: "production", intensity: 0.9 },
  { week: "W2", status: "development", intensity: 0.4 },
  { week: "W3", status: "production", intensity: 1 },
  { week: "W4", status: "development", intensity: 0.5 },
  { week: "W5", status: "production", intensity: 0.85 },
  { week: "W6", status: "development", intensity: 0.3 },
  { week: "W7", status: "production", intensity: 0.95 },
  { week: "W8", status: "development", intensity: 0.6 },
  { week: "W9", status: "production", intensity: 1 },
  { week: "W10", status: "development", intensity: 0.45 },
  { week: "W11", status: "production", intensity: 0.9 },
  { week: "W12", status: "development", intensity: 0.55 },
  { week: "W13", status: "production", intensity: 0.88 },
  { week: "W14", status: "development", intensity: 0.4 },
  { week: "W15", status: "production", intensity: 1 },
  { week: "W16", status: "development", intensity: 0.5 },
]

// Crisis resolution logs
const crisisLogs = [
  {
    timestamp: "2024-12-15 03:42:21",
    type: "CRITICAL",
    message: "Resolved production bottleneck affecting 18k+ users",
    duration: "47min",
  },
  {
    timestamp: "2024-11-28 14:15:08",
    type: "HIGH",
    message: "Coordinated cross-platform bug fix across iOS & Android",
    duration: "2h 15min",
  },
  {
    timestamp: "2024-11-10 09:33:45",
    type: "CRITICAL",
    message: "Led war room for Firebase authentication outage",
    duration: "1h 32min",
  },
  {
    timestamp: "2024-10-22 18:20:11",
    type: "MEDIUM",
    message: "Orchestrated emergency hotfix deployment to App Store",
    duration: "58min",
  },
  {
    timestamp: "2024-10-05 11:45:33",
    type: "HIGH",
    message: "Resolved database migration blocking release pipeline",
    duration: "3h 10min",
  },
]

// Leadership pillars
const leadershipPillars = [
  { id: "crisis", label: "Crisis Management", icon: Shield, color: "#F97316" },
  { id: "architecture", label: "Technical Architecture", icon: Cpu, color: "#3B82F6" },
  { id: "coordination", label: "Cross-team Coordination", icon: Users, color: "#10B981" },
]

// Radar chart skills
const radarSkills = [
  { skill: "Communication", value: 0.92, angle: 0 },
  { skill: "Strategic Decisions", value: 0.98, angle: 72 },
  { skill: "Technical Mentorship", value: 0.88, angle: 144 },
  { skill: "Crisis Response", value: 0.95, angle: 216 },
  { skill: "Team Building", value: 0.9, angle: 288 },
]

// Workflow steps for tooltip
const workflowSteps = ["Sprints", "Code Review", "QA", "Release"]

export function LeadershipSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [expandedCluster, setExpandedCluster] = useState(false)
  const [hoveredPillar, setHoveredPillar] = useState<string | null>(null)
  const [showWorkflow, setShowWorkflow] = useState(false)
  const [deploymentAngle, setDeploymentAngle] = useState(0)

  // Animate deployment dial
  useState(() => {
    const interval = setInterval(() => {
      setDeploymentAngle((prev) => (prev + 0.5) % 360)
    }, 50)
    return () => clearInterval(interval)
  })

  return (
    <section
      ref={sectionRef}
      id="leadership"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ backgroundColor: "#050505" }}
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#3B82F6]" />
            <span className="text-[#3B82F6] font-mono text-sm tracking-wider uppercase">Mission Control</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Leadership <span className="text-[#10B981]">Pulse</span>
          </h2>
          <p className="text-white/50 max-w-2xl font-mono text-sm">
            Real-time metrics from leading a team of 12-15 developers through bi-weekly release cycles
          </p>
        </motion.div>

        {/* Release Heatmap - "The Pulse" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mb-8 p-6 rounded-xl backdrop-blur-xl border border-white/10"
          style={{ backgroundColor: "rgba(255,255,255,0.02)" }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <GitBranch className="w-4 h-4 text-[#3B82F6]" strokeWidth={1} />
              <span className="font-mono text-sm text-white/70">Release Heatmap</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#1E3A5F]" />
                <span className="text-xs text-white/40 font-mono">Development</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#10B981]" />
                <span className="text-xs text-white/40 font-mono">Production</span>
              </div>
            </div>
          </div>

          {/* Heatmap blocks */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {heatmapData.map((item, index) => (
              <motion.div
                key={item.week}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.03 }}
                className="relative group flex-shrink-0"
              >
                <div
                  className="w-12 h-16 rounded-lg flex items-end justify-center pb-1 cursor-pointer transition-all duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor:
                      item.status === "production"
                        ? `rgba(16, 185, 129, ${item.intensity})`
                        : `rgba(30, 58, 95, ${item.intensity + 0.3})`,
                    boxShadow:
                      item.status === "production" ? `0 0 20px rgba(16, 185, 129, ${item.intensity * 0.5})` : "none",
                  }}
                >
                  <span className="text-[10px] font-mono text-white/60">{item.week}</span>
                </div>
                {/* Glow effect for production */}
                {item.status === "production" && (
                  <div
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      boxShadow: `0 0 30px rgba(16, 185, 129, 0.6)`,
                    }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Team Grid - Node Cluster */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4 relative p-6 rounded-xl backdrop-blur-xl border border-white/10 overflow-hidden"
            style={{ backgroundColor: "rgba(255,255,255,0.02)" }}
            onMouseEnter={() => setExpandedCluster(true)}
            onMouseLeave={() => setExpandedCluster(false)}
          >
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-4 h-4 text-[#10B981]" strokeWidth={1} />
              <span className="font-mono text-sm text-white/70">Team Grid</span>
            </div>

            {/* Developer metric with workflow tooltip */}
            <div
              className="relative inline-block mb-6"
              onMouseEnter={() => setShowWorkflow(true)}
              onMouseLeave={() => setShowWorkflow(false)}
            >
              <span className="text-5xl font-bold text-white">12-15</span>
              <span className="text-white/40 text-lg ml-2">Developers</span>

              {/* Workflow tooltip */}
              <AnimatePresence>
                {showWorkflow && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 top-full mt-3 z-20 p-4 rounded-lg backdrop-blur-xl border border-white/10"
                    style={{ backgroundColor: "rgba(0,0,0,0.9)" }}
                  >
                    <span className="text-xs text-white/50 font-mono block mb-2">Workflow</span>
                    <div className="flex items-center gap-2">
                      {workflowSteps.map((step, i) => (
                        <div key={step} className="flex items-center gap-2">
                          <span className="text-sm text-white font-mono">{step}</span>
                          {i < workflowSteps.length - 1 && <ArrowRight className="w-3 h-3 text-[#3B82F6]" />}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Node cluster */}
            <div className="relative h-32">
              {/* Collapsed state - clustered nodes */}
              <AnimatePresence>
                {!expandedCluster && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="relative w-24 h-24">
                      {[...Array(15)].map((_, i) => {
                        const angle = (i / 15) * Math.PI * 2
                        const radius = 30 + (i % 3) * 8
                        const x = Math.cos(angle) * radius
                        const y = Math.sin(angle) * radius
                        return (
                          <motion.div
                            key={i}
                            className="absolute w-3 h-3 rounded-full bg-[#10B981]"
                            style={{
                              left: `calc(50% + ${x}px - 6px)`,
                              top: `calc(50% + ${y}px - 6px)`,
                              opacity: 0.4 + (i % 3) * 0.2,
                            }}
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.4 + (i % 3) * 0.2, 0.8, 0.4 + (i % 3) * 0.2],
                            }}
                            transition={{
                              duration: 2,
                              delay: i * 0.1,
                              repeat: Number.POSITIVE_INFINITY,
                            }}
                          />
                        )
                      })}
                    </div>
                    <span className="absolute text-xs text-white/40 font-mono mt-28">Hover to expand</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Expanded state - pillars */}
              <AnimatePresence>
                {expandedCluster && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-0 flex flex-col gap-3"
                  >
                    {leadershipPillars.map((pillar, index) => (
                      <motion.div
                        key={pillar.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 p-3 rounded-lg border border-white/5 cursor-pointer transition-all duration-300 hover:border-white/20"
                        style={{
                          backgroundColor: hoveredPillar === pillar.id ? `${pillar.color}15` : "rgba(255,255,255,0.02)",
                        }}
                        onMouseEnter={() => setHoveredPillar(pillar.id)}
                        onMouseLeave={() => setHoveredPillar(null)}
                      >
                        <pillar.icon className="w-4 h-4" style={{ color: pillar.color }} strokeWidth={1} />
                        <span className="text-sm text-white/80 font-mono">{pillar.label}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Crisis Resolution Log */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-5 relative p-6 rounded-xl backdrop-blur-xl border border-white/10 overflow-hidden"
            style={{ backgroundColor: "rgba(255,255,255,0.02)" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-4 h-4 text-[#F97316]" strokeWidth={1} />
              <span className="font-mono text-sm text-white/70">Crisis Resolution Log</span>
            </div>

            {/* Terminal-style log window */}
            <div
              className="relative h-64 overflow-hidden rounded-lg border border-white/5"
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="text-[10px] text-white/30 font-mono ml-2">war-room.log</span>
              </div>

              {/* Scrolling logs */}
              <div className="p-3 space-y-2 overflow-y-auto h-[calc(100%-36px)] scrollbar-thin">
                {crisisLogs.map((log, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="font-mono text-xs group"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-white/30 shrink-0">{log.timestamp}</span>
                      <span
                        className="px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0"
                        style={{
                          backgroundColor:
                            log.type === "CRITICAL"
                              ? "rgba(239, 68, 68, 0.2)"
                              : log.type === "HIGH"
                                ? "rgba(249, 115, 22, 0.2)"
                                : "rgba(59, 130, 246, 0.2)",
                          color: log.type === "CRITICAL" ? "#EF4444" : log.type === "HIGH" ? "#F97316" : "#3B82F6",
                        }}
                      >
                        {log.type}
                      </span>
                    </div>
                    <p className="text-white/70 mt-1 pl-0 group-hover:text-white transition-colors">{log.message}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
                      <span className="text-[#10B981]">Resolved in {log.duration}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Glow effect */}
              <div
                className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
                style={{
                  background: "linear-gradient(transparent, rgba(5,5,5,0.9))",
                }}
              />
            </div>
          </motion.div>

          {/* Deployment Dial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3 relative p-6 rounded-xl backdrop-blur-xl border border-white/10 overflow-hidden"
            style={{ backgroundColor: "rgba(255,255,255,0.02)" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Rocket className="w-4 h-4 text-[#3B82F6]" strokeWidth={1} />
              <span className="font-mono text-sm text-white/70">Deployment Dial</span>
            </div>

            {/* 3D Radial Gauge */}
            <div className="relative flex items-center justify-center h-40">
              <svg className="w-36 h-36" viewBox="0 0 100 100">
                {/* Background ring */}
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                {/* Progress ring */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="url(#deployGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="251.2"
                  strokeDashoffset="50"
                  initial={{ strokeDashoffset: 251.2 }}
                  animate={isInView ? { strokeDashoffset: 50 } : {}}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
                />
                {/* Gradient definition */}
                <defs>
                  <linearGradient id="deployGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>
                </defs>
                {/* Pulsing needle */}
                <motion.line
                  x1="50"
                  y1="50"
                  x2="50"
                  y2="18"
                  stroke="#10B981"
                  strokeWidth="2"
                  strokeLinecap="round"
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  style={{ transformOrigin: "50px 50px" }}
                />
                {/* Center dot */}
                <circle cx="50" cy="50" r="4" fill="#10B981" />
              </svg>

              {/* Glow effect */}
              <div
                className="absolute inset-0 rounded-full opacity-30 blur-xl pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)",
                }}
              />
            </div>

            <div className="text-center mt-2">
              <span className="text-2xl font-bold text-white font-mono">15-Day</span>
              <span className="text-white/40 text-sm block">Velocity Cycle</span>
            </div>

            {/* Platform indicators */}
            <div className="flex justify-center gap-4 mt-4">
              {[
                { icon: Smartphone, label: "iOS", color: "#3B82F6" },
                { icon: Smartphone, label: "Android", color: "#10B981" },
                { icon: Globe, label: "Firebase", color: "#F97316" },
              ].map((platform) => (
                <div key={platform.label} className="flex flex-col items-center gap-1">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: Math.random() }}
                  >
                    <platform.icon className="w-4 h-4" style={{ color: platform.color }} strokeWidth={1} />
                  </motion.div>
                  <span className="text-[10px] text-white/40 font-mono">{platform.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* People Stack Radar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="lg:col-span-6 relative p-6 rounded-xl backdrop-blur-xl border border-white/10 overflow-hidden"
            style={{ backgroundColor: "rgba(255,255,255,0.02)" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-4 h-4 text-[#10B981]" strokeWidth={1} />
              <span className="font-mono text-sm text-white/70">Leadership Skills Radar</span>
            </div>

            <div className="flex items-center justify-center">
              <svg className="w-64 h-64" viewBox="0 0 200 200">
                {/* Background circles */}
                {[0.25, 0.5, 0.75, 1].map((scale, i) => (
                  <circle
                    key={i}
                    cx="100"
                    cy="100"
                    r={70 * scale}
                    fill="none"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="1"
                  />
                ))}

                {/* Axis lines */}
                {radarSkills.map((skill) => {
                  const radian = (skill.angle - 90) * (Math.PI / 180)
                  const x2 = 100 + Math.cos(radian) * 70
                  const y2 = 100 + Math.sin(radian) * 70
                  return (
                    <line
                      key={skill.skill}
                      x1="100"
                      y1="100"
                      x2={x2}
                      y2={y2}
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="1"
                    />
                  )
                })}

                {/* Data polygon */}
                <motion.polygon
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  points={radarSkills
                    .map((skill) => {
                      const radian = (skill.angle - 90) * (Math.PI / 180)
                      const r = skill.value * 70
                      const x = 100 + Math.cos(radian) * r
                      const y = 100 + Math.sin(radian) * r
                      return `${x},${y}`
                    })
                    .join(" ")}
                  fill="rgba(16, 185, 129, 0.2)"
                  stroke="#10B981"
                  strokeWidth="2"
                  style={{ transformOrigin: "100px 100px" }}
                />

                {/* Data points */}
                {radarSkills.map((skill, index) => {
                  const radian = (skill.angle - 90) * (Math.PI / 180)
                  const r = skill.value * 70
                  const x = 100 + Math.cos(radian) * r
                  const y = 100 + Math.sin(radian) * r
                  return (
                    <motion.circle
                      key={skill.skill}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="#10B981"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                    />
                  )
                })}

                {/* Labels */}
                {radarSkills.map((skill) => {
                  const radian = (skill.angle - 90) * (Math.PI / 180)
                  const x = 100 + Math.cos(radian) * 90
                  const y = 100 + Math.sin(radian) * 90
                  return (
                    <text
                      key={skill.skill}
                      x={x}
                      y={y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-white/50 text-[8px] font-mono"
                    >
                      {skill.skill}
                    </text>
                  )
                })}
              </svg>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="lg:col-span-6 grid grid-cols-2 gap-4"
          >
            {[
              {
                icon: Zap,
                label: "Sprint Velocity",
                value: "98%",
                sublabel: "On-time delivery",
                color: "#10B981",
              },
              {
                icon: MessageSquare,
                label: "Team Sync",
                value: "Daily",
                sublabel: "Standups & Reviews",
                color: "#3B82F6",
              },
              {
                icon: Shield,
                label: "Incidents Resolved",
                value: "47",
                sublabel: "This quarter",
                color: "#F97316",
              },
              {
                icon: GitBranch,
                label: "Releases Shipped",
                value: "32",
                sublabel: "Bi-weekly cycles",
                color: "#10B981",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                className="relative p-4 rounded-xl backdrop-blur-xl border border-white/10 group cursor-pointer transition-all duration-300 hover:border-white/20"
                style={{ backgroundColor: "rgba(255,255,255,0.02)" }}
              >
                {/* Glow effect on hover */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    boxShadow: `0 0 30px ${stat.color}30`,
                  }}
                />

                <stat.icon className="w-4 h-4 mb-2" style={{ color: stat.color }} strokeWidth={1} />
                <div className="text-2xl font-bold text-white font-mono">{stat.value}</div>
                <div className="text-xs text-white/70">{stat.label}</div>
                <div className="text-[10px] text-white/40 font-mono mt-1">{stat.sublabel}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
