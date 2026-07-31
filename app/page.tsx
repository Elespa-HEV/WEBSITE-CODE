import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MobilitySection from "@/components/MobilitySection";
import HybridTechnology from "@/components/HybridTechnology";
import EcosystemGrid from "@/components/EcosystemGrid";
import TeamSection from "@/components/TeamSection";
import AdvisorsGrid from "@/components/AdvisorsGrid";
import SupportedBy from "@/components/SupportedBy";
import InTheMedia from "@/components/InTheMedia";
import TrustedBy from "@/components/TrustedBy";
import MissionSection from "@/components/MissionSection";
import EnquirySection from "@/components/EnquirySection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />
      <MobilitySection />
      <HybridTechnology />
      <div id="products">
        <EcosystemGrid />
      </div>
      <TeamSection />
      <AdvisorsGrid />
      <SupportedBy />
      <InTheMedia />
      <TrustedBy />
      <MissionSection />
      <EnquirySection />
      <Footer />
    </main>
  );
}
