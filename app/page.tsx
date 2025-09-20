import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { InvestmentPlans } from "@/components/investment-plans"
import { RecentWithdrawals } from "@/components/recent-withdrawals"
import { Features } from "@/components/features"
import { TestimonialsSlider } from "@/components/testimonials-slider"
import { Footer } from "@/components/footer"
import { ChatSupportWidget } from "@/components/chat-support-widget"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <InvestmentPlans />
      <RecentWithdrawals />
      <Features />
      <TestimonialsSlider />
      <Footer />
      <ChatSupportWidget />
    </main>
  )
}
