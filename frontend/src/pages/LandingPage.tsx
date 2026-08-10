import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/landing/Navbar"
import { Hero } from "@/components/landing/Hero"
import { BenefitsGrid } from "@/components/landing/BenefitsGrid"
import { ExamplePrompts } from "@/components/landing/ExamplePrompts"
import { FeatureShowcase } from "@/components/landing/FeatureShowcase"
import { SocialProof } from "@/components/landing/SocialProof"
import { FinalCTA } from "@/components/landing/FinalCTA"
import { Footer } from "@/components/landing/Footer"
import { CommandMenu } from "@/components/CommandMenu"

export function LandingPage() {
  const [commandMenuOpen, setCommandMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary selection:text-primary-foreground">
      
      {/* Sticky Blur Navbar */}
      <Navbar onOpenCommandMenu={() => setCommandMenuOpen(true)} />

      {/* Main Content Sections with Framer Motion Stagger */}
      <main id="main-content" className="flex-1">
        
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Hero />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.3 }}
        >
          <BenefitsGrid />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.3 }}
        >
          <ExamplePrompts />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.3 }}
        >
          <FeatureShowcase />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.3 }}
        >
          <SocialProof />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.3 }}
        >
          <FinalCTA />
        </motion.div>

      </main>

      {/* Footer */}
      <Footer />

      {/* Global ⌘K Command Palette */}
      <CommandMenu open={commandMenuOpen} onOpenChange={setCommandMenuOpen} />

    </div>
  )
}
