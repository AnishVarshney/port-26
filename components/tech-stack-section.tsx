"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import {
  SiSwift,
  SiNodedotjs,
  SiFirebase,
  SiPostgresql,
  SiGit,
  SiDocker,
  SiPostman,
  SiXcode,
  SiAndroidstudio,
  SiGooglecloud,
  SiAppstore,
} from "react-icons/si"
import { TbBrandReactNative } from "react-icons/tb"
import { Brain, MessageSquare, Network, ToggleLeft, ToggleRight, Award, CheckCircle2 } from "lucide-react"

// Skill data with proficiency and last deployed
const languages = [
  { name: "Swift", proficiency: 95, color: "#F05138" },
  { name: "TypeScript", proficiency: 90, color: "#3178C6" },
  { name: "C++", proficiency: 75, color: "#00599C" },
  { name: "SQL", proficiency: 85, color: "#336791" },
  { name: "JavaScript", proficiency: 92, color: "#F7DF1E" },
]

const mobileCore = [
  { name: "Swift", icon: SiSwift, color: "#F05138", lastDeployed: 2, active: true },
  { name: "React Native", icon: TbBrandReactNative, color: "#61DAFB", lastDeployed: 45, active: false },
  { name: "Xcode", icon: SiXcode, color: "#147EFB", lastDeployed: 2, active: true },
  { name: "Android Studio", icon: SiAndroidstudio, color: "#3DDC84", lastDeployed: 30, active: false },
]

const systemEngine = [
  {
    name: "Node.js",
    icon: SiNodedotjs,
    color: "#339933",
    lastDeployed: 5,
    active: true,
    subServices: ["Express.js", "REST APIs", "WebSockets"],
  },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    color: "#336791",
    lastDeployed: 3,
    active: true,
    subServices: ["Indexing", "Triggers", "Views"],
  },
  {
    name: "Firebase",
    icon: SiFirebase,
    color: "#FFCA28",
    lastDeployed: 12,
    active: false,
    subServices: ["Firestore", "RTDB", "GCP"],
  },
]

const operations = [
  { name: "App Store Connect", icon: SiAppstore, color: "#0D96F6", lastDeployed: 7 },
  { name: "Google Play Console", icon: SiGooglecloud, color: "#4285F4", lastDeployed: 14 },
  { name: "Firebase Hosting", icon: SiFirebase, color: "#FFCA28", lastDeployed: 20 },
]

const tools = [
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Postman", icon: SiPostman, color: "#FF6C37" },
]

const competencies = [
  { name: "Technical Leadership", icon: Brain, color: "#8B5CF6" },
  { name: "Communication", icon: MessageSquare, color: "#10B981" },
  { name: "Architecture", icon: Network, color: "#3B82F6" },
]

const cloudCredentials = [
  { name: "Prompt Design in Vertex AI", issuer: "Google Cloud", verified: true },
  { name: "Responsible AI", issuer: "Google Cloud", verified: true },
]

// Radar Chart Component
function RadarChart({ skills }: { skills: typeof languages }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const isInView = useInView(svgRef, { once: true })

  const centerX = 150
  const centerY = 150
  const maxRadius = 120
  const levels = 5

  const angleStep = (Math.PI * 2) / skills.length

  const getPoint = (index: number, value: number) => {
    const angle = index * angleStep - Math.PI / 2
    const radius = (value / 100) * maxRadius
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    }
  }

  const dataPoints = skills.map((skill, i) => getPoint(i, skill.proficiency))
  const pathD = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z"

  return (
    <svg ref={svgRef} viewBox="0 0 300 300" className="w-full h-full">
      {/* Grid levels */}
      {Array.from({ length: levels }).map((_, level) => {
        const radius = ((level + 1) / levels) * maxRadius
        const points = skills
          .map((_, i) => {
            const angle = i * angleStep - Math.PI / 2
            return `${centerX + radius * Math.cos(angle)},${centerY + radius * Math.sin(angle)}`
          })
          .join(" ")
        return (
          <polygon
            key={level}
            points={points}
            fill="none"
            stroke="#1E90FF"
            strokeWidth="0.5"
            opacity={0.2 + level * 0.1}
          />
        )
      })}

      {/* Axis lines */}
      {skills.map((_, i) => {
        const angle = i * angleStep - Math.PI / 2
        return (
          <line
            key={i}
            x1={centerX}
            y1={centerY}
            x2={centerX + maxRadius * Math.cos(angle)}
            y2={centerY + maxRadius * Math.sin(angle)}
            stroke="#1E90FF"
            strokeWidth="0.5"
            opacity={0.3}
          />
        )
      })}

      {/* Data polygon */}
      <motion.path
        d={pathD}
        fill="rgba(30, 144, 255, 0.2)"
        stroke="#1E90FF"
        strokeWidth="2"
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ transformOrigin: "150px 150px" }}
      />

      {/* Data points */}
      {dataPoints.map((point, i) => (
        <motion.circle
          key={i}
          cx={point.x}
          cy={point.y}
          r="6"
          fill={skills[i].color}
          stroke="#0A0A0A"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
        />
      ))}

      {/* Labels */}
      {skills.map((skill, i) => {
        const angle = i * angleStep - Math.PI / 2
        const labelRadius = maxRadius + 25
        const x = centerX + labelRadius * Math.cos(angle)
        const y = centerY + labelRadius * Math.sin(angle)
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={skill.color}
            fontSize="11"
            fontFamily="monospace"
            fontWeight="bold"
          >
            {skill.name}
          </text>
        )
      })}
    </svg>
  )
}

// Odometer Counter Component
function OdometerCounter({ target }: { target: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isInView, target])

  const digits = count.toString().padStart(3, "0").split("")

  return (
    <div ref={ref} className="flex gap-1">
      {digits.map((digit, i) => (
        <motion.div
          key={i}
          className="w-16 h-20 bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a] rounded-lg border border-[#1E90FF]/30 flex items-center justify-center overflow-hidden"
          initial={{ rotateX: -90 }}
          animate={isInView ? { rotateX: 0 } : {}}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          <span className="text-4xl font-mono font-bold text-[#1E90FF] drop-shadow-[0_0_10px_rgba(30,144,255,0.5)]">
            {digit}
          </span>
        </motion.div>
      ))}
      <motion.div
        className="w-12 h-20 bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a] rounded-lg border border-[#1E90FF]/30 flex items-center justify-center"
        initial={{ rotateX: -90 }}
        animate={isInView ? { rotateX: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <span className="text-3xl font-mono font-bold text-[#1E90FF]/70">+</span>
      </motion.div>
    </div>
  )
}

// Skill Card with X-Ray Hover
function SkillCard({
  skill,
  index,
}: {
  skill: { name: string; icon: any; color: string; lastDeployed: number; active?: boolean; subServices?: string[] }
  index: number
}) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = skill.icon

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative p-4 rounded-xl bg-[#0f0f1a]/80 border border-white/5 backdrop-blur-xl overflow-hidden transition-all duration-300"
        style={{
          boxShadow: isHovered ? `0 0 30px ${skill.color}40` : "none",
        }}
      >
        {/* Pulse effect for active skills */}
        {skill.active && (
          <motion.div
            className="absolute inset-0 rounded-xl"
            style={{ border: `1px solid ${skill.color}` }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        )}

        {/* Circuit line decoration */}
        <div className="absolute top-0 left-4 w-px h-full bg-gradient-to-b from-transparent via-[#1E90FF]/20 to-transparent" />

        <div className="flex items-center gap-3 mb-2">
          <div
            className="p-2 rounded-lg transition-all duration-300"
            style={{
              backgroundColor: `${skill.color}20`,
              boxShadow: isHovered ? `0 0 15px ${skill.color}40` : "none",
            }}
          >
            <Icon className="w-6 h-6" style={{ color: skill.color }} />
          </div>
          <div>
            <h4 className="font-mono font-semibold text-white text-sm">{skill.name}</h4>
            <p className="text-xs text-white/40 font-mono">
              Last Deployed: <span className="text-[#1E90FF]">{skill.lastDeployed} days ago</span>
            </p>
          </div>
        </div>

        {/* X-Ray expansion for skills with sub-services */}
        <AnimatePresence>
          {isHovered && skill.subServices && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-3 mt-3 border-t border-white/10">
                <p className="text-[10px] text-white/30 font-mono uppercase tracking-wider mb-2">
                  Sub-services Mastered
                </p>
                <div className="flex flex-wrap gap-1">
                  {skill.subServices.map((service, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-[#1E90FF]/10 text-[#1E90FF] border border-[#1E90FF]/20"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active indicator */}
        {skill.active && (
          <div className="absolute top-2 right-2 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[8px] font-mono text-emerald-400 uppercase">Active</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// Cloud Credential Card
function CredentialCard({ credential, index }: { credential: (typeof cloudCredentials)[0]; index: number }) {
  return (
    <motion.div
      className="p-4 rounded-xl bg-[#0f0f1a]/80 border border-[#4285F4]/20 backdrop-blur-xl"
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 0 30px rgba(66, 133, 244, 0.2)",
      }}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-[#4285F4]/10">
          <Award className="w-5 h-5 text-[#4285F4]" />
        </div>
        <div className="flex-1">
          <h4 className="font-mono font-semibold text-white text-sm leading-tight">{credential.name}</h4>
          <p className="text-xs text-white/40 font-mono mt-1">{credential.issuer}</p>
        </div>
        {credential.verified && (
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span className="text-[10px] font-mono text-emerald-400">Verified</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export function TechStackSection() {
  const [viewMode, setViewMode] = useState<"tools" | "competencies">("tools")
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section ref={sectionRef} id="stack" className="relative min-h-screen py-24 px-4 md:px-8 overflow-hidden">
      {/* Circuit board background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit" patternUnits="userSpaceOnUse" width="100" height="100">
              <path
                d="M 0 50 L 40 50 M 60 50 L 100 50 M 50 0 L 50 40 M 50 60 L 50 100"
                stroke="#1E90FF"
                strokeWidth="0.5"
                fill="none"
              />
              <circle cx="50" cy="50" r="3" fill="#1E90FF" />
              <circle cx="0" cy="50" r="2" fill="#1E90FF" />
              <circle cx="100" cy="50" r="2" fill="#1E90FF" />
              <circle cx="50" cy="0" r="2" fill="#1E90FF" />
              <circle cx="50" cy="100" r="2" fill="#1E90FF" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      {/* Glowing circuit lines */}
      <motion.div
        className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#1E90FF]/30 to-transparent"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#1E90FF]/30 to-transparent"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E90FF]/10 border border-[#1E90FF]/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#1E90FF] animate-pulse" />
            <span className="text-sm font-mono text-[#1E90FF]">Neural Grid Initialized</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">Tech Stack</h2>
          <p className="text-white/50 font-mono max-w-2xl mx-auto">
            A diagnostic view of my technical capabilities, proficiency levels, and deployment history.
          </p>
        </motion.div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Languages Radar */}
          <motion.div
            className="p-6 rounded-2xl bg-[#0f0f1a]/60 border border-white/5 backdrop-blur-xl"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-mono font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1E90FF]" />
              Languages Radar
            </h3>
            <div className="aspect-square">
              <RadarChart skills={languages} />
            </div>
          </motion.div>

          {/* Center: Grind Counter */}
          <motion.div
            className="p-6 rounded-2xl bg-[#0f0f1a]/60 border border-white/5 backdrop-blur-xl flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-mono font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1E90FF]" />
              The Grind Counter
            </h3>
            <OdometerCounter target={400} />
            <div className="mt-4 text-center">
              <p className="text-white/80 font-mono text-lg">Problems Solved</p>
              <p className="text-xs text-white/40 font-mono mt-1">
                LeetCode & CodeStudio <span className="text-[#1E90FF]">Tier-1</span>
              </p>
            </div>

            {/* Mini stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 w-full">
              {[
                { label: "Easy", value: "180+", color: "#10B981" },
                { label: "Medium", value: "170+", color: "#F59E0B" },
                { label: "Hard", value: "50+", color: "#EF4444" },
              ].map((stat, i) => (
                <div key={i} className="text-center p-2 rounded-lg bg-white/5">
                  <p className="text-lg font-mono font-bold" style={{ color: stat.color }}>
                    {stat.value}
                  </p>
                  <p className="text-[10px] text-white/40 font-mono uppercase">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Cloud Credentials Vault */}
          <motion.div
            className="p-6 rounded-2xl bg-[#0f0f1a]/60 border border-white/5 backdrop-blur-xl"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-mono font-bold text-white mb-4 flex items-center gap-2">
              <SiGooglecloud className="w-5 h-5 text-[#4285F4]" />
              Cloud Credentials Vault
            </h3>
            <div className="space-y-4">
              {cloudCredentials.map((credential, i) => (
                <CredentialCard key={i} credential={credential} index={i} />
              ))}
            </div>

            {/* GCP badge */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-[#4285F4]/10 to-[#34A853]/10 border border-[#4285F4]/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <SiGooglecloud className="w-8 h-8 text-[#4285F4]" />
                </div>
                <div>
                  <p className="font-mono font-semibold text-white text-sm">Google Cloud</p>
                  <p className="text-xs text-white/40 font-mono">Certified Professional</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Logic Toggle */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() => setViewMode(viewMode === "tools" ? "competencies" : "tools")}
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#0f0f1a]/80 border border-white/10 backdrop-blur-xl hover:border-[#1E90FF]/30 transition-all duration-300"
          >
            <span
              className={`font-mono text-sm transition-colors ${viewMode === "tools" ? "text-[#1E90FF]" : "text-white/40"}`}
            >
              Tools
            </span>
            {viewMode === "tools" ? (
              <ToggleLeft className="w-6 h-6 text-[#1E90FF]" />
            ) : (
              <ToggleRight className="w-6 h-6 text-[#1E90FF]" />
            )}
            <span
              className={`font-mono text-sm transition-colors ${viewMode === "competencies" ? "text-[#1E90FF]" : "text-white/40"}`}
            >
              Core Competencies
            </span>
          </button>
        </motion.div>

        {/* Tools / Competencies Grid */}
        <motion.div
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <AnimatePresence mode="wait">
            {viewMode === "tools"
              ? tools.map((tool, i) => (
                  <motion.div
                    key={tool.name}
                    className="p-4 rounded-xl bg-[#0f0f1a]/60 border border-white/5 backdrop-blur-xl flex items-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: `0 0 20px ${tool.color}30`,
                    }}
                  >
                    <div className="p-3 rounded-lg" style={{ backgroundColor: `${tool.color}20` }}>
                      <tool.icon className="w-6 h-6" style={{ color: tool.color }} />
                    </div>
                    <span className="font-mono font-semibold text-white">{tool.name}</span>
                  </motion.div>
                ))
              : competencies.map((comp, i) => (
                  <motion.div
                    key={comp.name}
                    className="p-4 rounded-xl bg-[#0f0f1a]/60 border border-white/5 backdrop-blur-xl flex items-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: `0 0 20px ${comp.color}30`,
                    }}
                  >
                    <div className="p-3 rounded-lg" style={{ backgroundColor: `${comp.color}20` }}>
                      <comp.icon className="w-6 h-6" style={{ color: comp.color }} />
                    </div>
                    <span className="font-mono font-semibold text-white">{comp.name}</span>
                  </motion.div>
                ))}
          </AnimatePresence>
        </motion.div>

        {/* Skill Zones */}
        <div className="mt-16 space-y-12">
          {/* Mobile Core Zone */}
          <div>
            <motion.h3
              className="text-xl font-mono font-bold text-white mb-6 flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <span className="px-3 py-1 rounded-lg bg-[#F05138]/10 text-[#F05138] text-sm">Zone 01</span>
              Mobile Core
            </motion.h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {mobileCore.map((skill, i) => (
                <SkillCard key={skill.name} skill={skill} index={i} />
              ))}
            </div>
          </div>

          {/* System Engine Zone */}
          <div>
            <motion.h3
              className="text-xl font-mono font-bold text-white mb-6 flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <span className="px-3 py-1 rounded-lg bg-[#339933]/10 text-[#339933] text-sm">Zone 02</span>
              System Engine
            </motion.h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {systemEngine.map((skill, i) => (
                <SkillCard key={skill.name} skill={skill} index={i} />
              ))}
            </div>
          </div>

          {/* Operations Zone */}
          <div>
            <motion.h3
              className="text-xl font-mono font-bold text-white mb-6 flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <span className="px-3 py-1 rounded-lg bg-[#0D96F6]/10 text-[#0D96F6] text-sm">Zone 03</span>
              Operations
            </motion.h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {operations.map((skill, i) => (
                <SkillCard key={skill.name} skill={{ ...skill, active: false }} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
