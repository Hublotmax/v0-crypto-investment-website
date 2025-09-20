import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { InvestmentPlans } from "@/components/investment-plans"
import { Features } from "@/components/features"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <InvestmentPlans />
      <Features />
      <Footer />
    </main>
  )
}
