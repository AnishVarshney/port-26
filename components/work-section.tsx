"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  Smartphone,
  Apple,
  Server,
  Database,
  Cloud,
  Star,
  Users,
  Activity,
  GitCommit,
  ChevronRight,
  Layers,
  X,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"

// Release history for the deployment ticker
const releaseHistory = [
  "v2.4.0 (iOS) Deployed",
  "v2.3.9 (Android) Deployed",
  "Bug Fix: RTDB Latency Resolved",
  "v2.3.8 (iOS) Deployed",
  "Feature: Voice Enhancement Added",
  "v2.3.7 (Android) Deployed",
  "Bug Fix: Auth Flow Optimized",
  "v2.3.6 (iOS) Deployed",
]

// Architecture components data
const architectureComponents = [
  {
    id: "gcp",
    label: "GCP",
    icon: Cloud,
    color: "#3B82F6",
    x: 50,
    y: 20,
    contribution: "Configured Cloud Functions for serverless audio processing with 99.9% uptime",
  },
  {
    id: "firebase",
    label: "Firebase",
    icon: Server,
    color: "#F59E0B",
    x: 20,
    y: 50,
    contribution: "Implemented Realtime Database with optimized listeners reducing latency by 40%",
  },
  {
    id: "postgresql",
    label: "PostgreSQL",
    icon: Database,
    color: "#10B981",
    x: 80,
    y: 50,
    contribution: "Designed RBAC schema with row-level security for multi-tenant architecture",
  },
  {
    id: "node",
    label: "Node.js",
    icon: Server,
    color: "#3B82F6",
    x: 50,
    y: 80,
    contribution: "Built Express API layer handling 50K+ daily requests with JWT auth",
  },
]

// RBAC Code snippet for IDE overlay
const rbacCodeSnippet = `// RBAC Authorization Middleware
const checkPermission = async (req, res, next) => {
  const { userId, resource, action } = req.body;
  
  const userRole = await db.query(\`
    SELECT r.permissions FROM roles r
    JOIN user_roles ur ON ur.role_id = r.id
    WHERE ur.user_id = $1
  \`, [userId]);

  const hasPermission = userRole.rows[0]
    ?.permissions[resource]
    ?.includes(action);

  if (!hasPermission) {
    return res.status(403).json({ 
      error: 'Insufficient permissions' 
    });
  }
  
  next();
};`

const swiftCodeSnippet = `// Native Audio Recording Manager
class AudioRecordingManager: NSObject {
    private var audioRecorder: AVAudioRecorder?
    private var audioSession: AVAudioSession
    
    func startRecording() async throws {
        try audioSession.setCategory(
            .playAndRecord,
            mode: .default,
            options: [.defaultToSpeaker]
        )
        
        let settings: [String: Any] = [
            AVFormatIDKey: Int(kAudioFormatMPEG4AAC),
            AVSampleRateKey: 44100,
            AVNumberOfChannelsKey: 2,
            AVEncoderAudioQualityKey: AVAudioQuality.high.rawValue
        ]
        
        audioRecorder = try AVAudioRecorder(
            url: getDocumentsDirectory(),
            settings: settings
        )
        audioRecorder?.record()
    }
}`

export function WorkSection() {
  const [activeArch, setActiveArch] = useState<"react-native" | "swift">("react-native")
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const [showXRay, setShowXRay] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const titleFill = useTransform(scrollYProgress, [0.1, 0.3], [0, 100])

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative min-h-screen py-24 overflow-hidden"
      style={{
        background: "#0A0A0A",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundBlendMode: "overlay",
      }}
    >
      {/* Vertical Timeline Line */}
      <div className="absolute left-8 md:left-16 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />

      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="mb-16 pl-12 md:pl-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Outlined Title with Fill Effect */}
            <h2 className="text-6xl md:text-8xl font-bold relative">
              <span
                className="absolute inset-0 text-transparent bg-clip-text"
                style={{
                  WebkitTextStroke: "2px rgba(59, 130, 246, 0.3)",
                }}
              >
                WORK
              </span>
              <motion.span
                className="relative text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#60A5FA]"
                style={{
                  backgroundSize: "200% 100%",
                  backgroundPosition: useTransform(titleFill, (v) => `${100 - v}% 0`),
                }}
              >
                WORK
              </motion.span>
            </h2>
            <p className="text-white/50 font-mono text-sm mt-4">{"// Proof of Work → Shipping Code That Scales"}</p>
          </motion.div>
        </div>

        {/* Primary Project: VoiceToNotes */}
        <div className="relative pl-12 md:pl-24 mb-24">
          {/* Timeline Dot */}
          <motion.div
            className="absolute left-6 md:left-14 w-4 h-4 rounded-full bg-[#3B82F6] border-4 border-[#0A0A0A]"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            style={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
          />

          {/* Project Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Terminal-style Tag */}
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-xs text-[#F59E0B] bg-[#F59E0B]/10 px-2 py-1 rounded border border-[#F59E0B]/20">
                git-commit: native-migration
              </span>
              <span className="font-mono text-xs text-[#10B981] bg-[#10B981]/10 px-2 py-1 rounded border border-[#10B981]/20">
                status: production
              </span>
            </div>

            <Link href="/vtn" className="group inline-block">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center gap-3 group-hover:text-[#3B82F6] transition-colors">
                VoiceToNotes
                <ArrowUpRight className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </h3>
            </Link>
            <p className="text-white/60 text-lg mb-8 max-w-2xl">
              AI-powered voice memo app with real-time transcription. Led the complete architecture migration from React
              Native to native Swift, improving performance by 60%.
            </p>

            <Link
              href="/vtn"
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-lg bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6] font-mono text-sm hover:bg-[#3B82F6]/20 transition-all duration-300 group"
            >
              <span>View Full Case Study</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            {/* The Shift Toggle */}
            <div className="mb-8">
              <div className="inline-flex items-center bg-[#1A1A1A] rounded-lg p-1 border border-white/10">
                <button
                  onClick={() => setActiveArch("react-native")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md font-mono text-sm transition-all duration-300 ${
                    activeArch === "react-native"
                      ? "bg-[#3B82F6] text-white shadow-lg shadow-[#3B82F6]/30"
                      : "text-white/50 hover:text-white/70"
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  React Native
                </button>
                <button
                  onClick={() => setActiveArch("swift")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md font-mono text-sm transition-all duration-300 ${
                    activeArch === "swift"
                      ? "bg-[#F59E0B] text-black shadow-lg shadow-[#F59E0B]/30"
                      : "text-white/50 hover:text-white/70"
                  }`}
                >
                  <Apple className="w-4 h-4" />
                  Swift (Native)
                </button>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Code IDE Overlay */}
              <motion.div layout className="relative bg-[#1E1E1E] rounded-lg border border-white/10 overflow-hidden">
                {/* IDE Header */}
                <div className="flex items-center justify-between px-4 py-2 bg-[#2D2D2D] border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                      <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                      <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                    </div>
                    <span className="font-mono text-xs text-white/50 ml-2">
                      {activeArch === "react-native" ? "rbac-middleware.js" : "AudioRecordingManager.swift"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-mono px-2 py-0.5 rounded ${activeArch === "react-native" ? "bg-[#F59E0B]/20 text-[#F59E0B]" : "bg-[#F59E0B]/20 text-[#F59E0B]"}`}
                    >
                      {activeArch === "react-native" ? "Node.js" : "Swift 5"}
                    </span>
                  </div>
                </div>

                {/* Code Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeArch}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 overflow-x-auto"
                  >
                    <pre className="font-mono text-xs leading-relaxed">
                      <code className="text-white/80">
                        {activeArch === "react-native" ? rbacCodeSnippet : swiftCodeSnippet}
                      </code>
                    </pre>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Interactive Architecture Diagram */}
              <div className="relative bg-[#0F0F0F] rounded-lg border border-white/10 p-6 min-h-[300px]">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-white/50">architecture.diagram</span>
                  <span className="font-mono text-xs text-[#3B82F6]">Click to explore</span>
                </div>

                {/* Architecture Nodes */}
                <div className="relative h-[250px]">
                  {architectureComponents.map((component) => (
                    <motion.button
                      key={component.id}
                      className="absolute flex flex-col items-center gap-1 group"
                      style={{
                        left: `${component.x}%`,
                        top: `${component.y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      onClick={() => setSelectedComponent(selectedComponent === component.id ? null : component.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300"
                        style={{
                          backgroundColor: `${component.color}20`,
                          borderColor: component.color,
                          borderWidth: selectedComponent === component.id ? "2px" : "1px",
                          boxShadow: selectedComponent === component.id ? `0 0 20px ${component.color}50` : "none",
                        }}
                      >
                        <component.icon className="w-6 h-6" style={{ color: component.color }} />
                      </div>
                      <span className="font-mono text-xs text-white/60">{component.label}</span>
                    </motion.button>
                  ))}

                  {/* Connection Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <line
                      x1="50%"
                      y1="20%"
                      x2="20%"
                      y2="50%"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                    <line
                      x1="50%"
                      y1="20%"
                      x2="80%"
                      y2="50%"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                    <line
                      x1="20%"
                      y1="50%"
                      x2="50%"
                      y2="80%"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                    <line
                      x1="80%"
                      y1="50%"
                      x2="50%"
                      y2="80%"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                  </svg>
                </div>

                {/* Contribution Popup */}
                <AnimatePresence>
                  {selectedComponent && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-4 left-4 right-4 bg-[#1A1A1A] rounded-lg p-4 border border-white/10"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-mono text-sm text-white mb-1">
                            {architectureComponents.find((c) => c.id === selectedComponent)?.label}
                          </h4>
                          <p className="text-xs text-white/60">
                            {architectureComponents.find((c) => c.id === selectedComponent)?.contribution}
                          </p>
                        </div>
                        <button onClick={() => setSelectedComponent(null)} className="text-white/40 hover:text-white">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Live Metrics Status Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-6 flex flex-wrap items-center gap-4 p-4 bg-[#1A1A1A]/50 rounded-lg border border-white/5"
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#3B82F6]" />
                <span className="font-mono text-sm text-white">18K+</span>
                <span className="text-xs text-white/40">Users</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#10B981]" />
                <span className="font-mono text-sm text-white">0.5%</span>
                <span className="text-xs text-white/40">Crash Rate</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#F59E0B]" />
                <span className="font-mono text-sm text-white">4.8</span>
                <span className="text-xs text-white/40">App Store</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Secondary Project: TalesFM (Stacked Card) */}
        <div className="relative pl-12 md:pl-24 mb-16">
          {/* Timeline Dot */}
          <motion.div
            className="absolute left-6 md:left-14 w-4 h-4 rounded-full bg-[#10B981] border-4 border-[#0A0A0A]"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            style={{ boxShadow: "0 0 20px rgba(16, 185, 129, 0.5)" }}
          />

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Terminal-style Tag */}
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-xs text-[#3B82F6] bg-[#3B82F6]/10 px-2 py-1 rounded border border-[#3B82F6]/20">
                git-commit: audio-streaming
              </span>
              <span className="font-mono text-xs text-[#10B981] bg-[#10B981]/10 px-2 py-1 rounded border border-[#10B981]/20">
                status: maintained
              </span>
            </div>

            {/* Stacked Card Visual */}
            <div className="relative">
              {/* Background Card (Visual Stack Effect) */}
              <div className="absolute top-3 left-3 right-0 h-full bg-[#1A1A1A]/30 rounded-lg border border-white/5 -z-10" />

              <Link href="/tales-fm">
                <div
                  className="relative bg-[#1A1A1A] rounded-lg border border-white/10 p-6 overflow-hidden group cursor-pointer hover:border-[#DFFF00]/30 transition-colors duration-300"
                  onMouseEnter={() => setShowXRay(true)}
                  onMouseLeave={() => setShowXRay(false)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-3xl font-bold text-white group-hover:text-[#DFFF00] transition-colors">
                          TalesFM
                        </h3>
                        <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-[#DFFF00] transition-colors" />
                      </div>
                      <p className="text-white/60 max-w-lg">
                        Audio storytelling platform with real-time streaming. Maintained alongside VoiceToNotes,
                        demonstrating ability to manage multiple production apps simultaneously.
                      </p>
                    </div>
                    <Layers className="w-8 h-8 text-[#10B981] group-hover:text-[#DFFF00] transition-colors" />
                  </div>

                  {/* X-Ray View on Hover */}
                  <AnimatePresence>
                    {showXRay && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-[#0A0A0A]/95 p-6 flex flex-col justify-center"
                      >
                        <span className="font-mono text-xs text-[#DFFF00] mb-2">{"// Component Tree"}</span>
                        <pre className="font-mono text-xs text-white/70 leading-relaxed">
                          {`<App>
  └─ <AudioProvider>
      ├─ <StreamManager />
      ├─ <PlaybackControls />
      └─ <StoryFeed>
          └─ <StoryCard[] />`}
                        </pre>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-4 flex items-center gap-2 text-xs text-white/30 group-hover:text-[#DFFF00]/60 transition-colors">
                    <ChevronRight className="w-3 h-3" />
                    <span>View Full Case Study</span>
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Deployment Marquee Ticker */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#1A1A1A]/80 border-t border-white/5 py-3 overflow-hidden">
        <motion.div
          className="flex items-center gap-8 whitespace-nowrap"
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          {[...releaseHistory, ...releaseHistory].map((release, i) => (
            <div key={i} className="flex items-center gap-2">
              <GitCommit className="w-4 h-4 text-[#10B981]" />
              <span className="font-mono text-sm text-white/60">{release}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
