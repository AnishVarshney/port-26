"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Copy, Check, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const navLinks = [
  { name: "Work", href: "#work" },
  { name: "Leadership", href: "#leadership" },
  { name: "Stack", href: "#stack" },
  { name: "Archive", href: "#archive" },
]

export function Navbar() {
  const [copied, setCopied] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState<string | null>(null)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { toast } = useToast()

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Copy email handler
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("anishvarshney912@gmail.com")
      setCopied(true)
      toast({
        title: "Email copied to clipboard!",
        description: "anishvarshney912@gmail.com",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast({
        title: "Failed to copy email",
        variant: "destructive",
      })
    }
  }

  // Handle smooth scroll
  const handleNavClick = (href: string) => {
    setActiveLink(href)
    setMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl",
          "rounded-2xl border border-white/10",
          "backdrop-blur-md transition-all duration-300",
          scrolled ? "bg-[#0A0A0A]/90 py-3 shadow-2xl shadow-black/20" : "bg-[#0A0A0A]/70 py-4",
        )}
      >
        <div className="flex items-center justify-between px-4 md:px-6">
          {/* Left Section - Identity */}
          <div className="flex items-center gap-3">
            <span className="font-mono font-bold text-white text-sm md:text-base tracking-tight">Anish Varshney</span>
            <div className="hidden sm:flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-white/40 text-xs md:text-sm">Building @ Web3task</span>
            </div>
          </div>

          {/* Center Section - Navigation (Desktop) */}
          <div className="hidden md:flex items-center gap-1 relative">
            {navLinks.map((link) => (
              <motion.button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
                className={cn(
                  "relative px-4 py-2 text-sm font-sans transition-colors duration-200",
                  activeLink === link.href ? "text-white" : "text-white/60 hover:text-white",
                )}
              >
                {/* Sliding pill background */}
                {hoveredLink === link.name && (
                  <motion.span
                    layoutId="navbar-hover"
                    className="absolute inset-0 bg-white/10 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
                {/* Active indicator dot */}
                {activeLink === link.href && (
                  <motion.span
                    layoutId="navbar-active"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopyEmail}
              className={cn(
                "bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 hover:text-white",
                "transition-all duration-200 text-xs md:text-sm",
              )}
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span
                    key="check"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex items-center gap-1.5"
                  >
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="hidden sm:inline">Copied!</span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex items-center gap-1.5"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Copy Email</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white/60 hover:text-white hover:bg-white/10"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0A0A0A]/95 backdrop-blur-xl"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Content - Dynamic Island Style */}
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              className="absolute bottom-8 left-4 right-4"
            >
              <div className="bg-[#1F1F1F] rounded-3xl border border-white/10 p-6 shadow-2xl">
                {/* Live Status on Mobile */}
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-white/60 text-sm">Building @ Web3task</span>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col gap-2">
                  {navLinks.map((link, index) => (
                    <motion.button
                      key={link.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleNavClick(link.href)}
                      className={cn(
                        "text-left px-4 py-3 rounded-xl text-lg font-medium transition-colors",
                        activeLink === link.href
                          ? "bg-white/10 text-white"
                          : "text-white/60 hover:bg-white/5 hover:text-white",
                      )}
                    >
                      {link.name}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
