import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import BenefitsSection from "@/components/benefits-section"
import FAQSection from "@/components/faq-section"
import FeaturesSection from "@/components/features-section"
import HeroSection from "@/components/hero-section"
import ProblemSolutionSection from "@/components/problem-solution-section"
import SecondCTASection from "@/components/second-cta.-section"

export default function IndexPage() {
  return (
    <>
      <HeroSection />
      <ProblemSolutionSection />
      <BenefitsSection />
      <FeaturesSection />
      <FAQSection />
      <SecondCTASection />
    </>
  )
}
