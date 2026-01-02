import { FooterSection } from "@/components/footer-section"
import { VTNHeroSection } from "@/components/vtn/vtn-hero-section"
import { VTNJourneySection } from "@/components/vtn/vtn-journey-section"
import { VTNNativeRewriteSection } from "@/components/vtn/vtn-native-rewrite-section"
import { VTNSystemOrchestrationSection } from "@/components/vtn/vtn-system-orchestration-section"



export const metadata = {
  title: "VoiceToNotes | Anish Varshney",
  description:
    "Deep dive into the VoiceToNotes project - From React Native MVP to native iOS/WatchOS ecosystem serving 18,000+ users.",
}

export default function VTNPage() {
  return (
    <main className="min-h-screen bg-[#050505]">
      <VTNHeroSection />
      <VTNJourneySection />
      <VTNNativeRewriteSection />
      <VTNSystemOrchestrationSection />
      <FooterSection/>
    </main>
  )
}
