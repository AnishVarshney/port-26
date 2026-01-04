import { TalesFMHeroSection } from "@/components/tales-fm/tales-fm-hero-section"
import { TalesFMRealityCheckSection } from "@/components/tales-fm/tales-fm-reality-check-section"
import { TalesFMSpectrumSection } from "@/components/tales-fm/tales-fm-spectrum-section"
import { TalesFMFutureSection } from "@/components/tales-fm/tales-fm-future-section"
import { FooterSection } from "@/components/footer-section"

export const metadata = {
  title: "TalesFM Case Study | Anish Varshney",
  description: "A deep dive into building TalesFM - The UI Experiment pushing React Native's visual performance limits",
}

export default function TalesFMPage() {
  return (
    <main className="min-h-screen bg-[#0F0F1B]">
      <TalesFMHeroSection />
      <TalesFMRealityCheckSection />
      <TalesFMSpectrumSection />
      <TalesFMFutureSection />
      <FooterSection />
    </main>
  )
}
