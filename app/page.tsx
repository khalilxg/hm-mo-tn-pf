import { Header } from "@/components/header"
import { DisclaimerBanner } from "@/components/disclaimer-banner"
import { HeroSection } from "@/components/hero-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { AnimatedFeaturesSection } from "@/components/animated-features-section"
import { DisclaimerSection } from "@/components/disclaimer-section"
import { PricingSection } from "@/components/pricing-section"
import { FAQSection } from "@/components/faq-section"
import { AnimatedCTASection } from "@/components/animated-cta-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { DonationThanksBanner } from "@/components/donation-button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <DonationThanksBanner />
      <main style={{ paddingTop: "var(--header-space, 6rem)" }}>
        <DisclaimerBanner />
        <HeroSection />
        <HowItWorksSection />
        <AnimatedFeaturesSection />
        <DisclaimerSection />
        <PricingSection />
        <FAQSection />
        <AnimatedCTASection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
