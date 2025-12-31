import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { WorkSection } from "@/components/work-section"
import { LeadershipSection } from "@/components/leadership-section"
import { TechStackSection } from "@/components/tech-stack-section"
import { FooterSection } from "@/components/footer-section"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      <Toaster />

      <HeroSection />

      <WorkSection />

      <LeadershipSection />

      <TechStackSection />

      <FooterSection />
    </main>
  )
}
