import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp } from "lucide-react"
import Link from "next/link"
import Script from "next/script"

export function Hero() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <Script src="https://www.livecoinwatch.com/static/lcw-widget.js" strategy="lazyOnload" />

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-success/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 text-center">
        {/* Announcement Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success text-sm font-medium mb-8">
          <TrendingUp className="h-4 w-4" />
          <span>Announcing $20M in Seed & Series A Funding</span>
          <ArrowRight className="h-4 w-4" />
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance mb-6">
          Crypto Investment
          <br />
          <span className="text-muted-foreground">for Smart Investors</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
          Quickly deploy our suite of crypto investment plans designed for retail. Our industry-leading platform powers
          fixed income investing for firms representing $3T+ in assets.
        </p>

        <div className="mb-12">
          <div className="bg-card/50 backdrop-blur-sm border rounded-lg p-6 max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Live Crypto Market Data</h3>
            <div
              className="livecoinwatch-widget-5"
              data-lcw-base="USD"
              data-lcw-color-tx="#999999"
              data-lcw-marquee-1="coins"
              data-lcw-marquee-2="movers"
              data-lcw-marquee-items="10"
            />
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/register">
            <Button size="lg" className="text-lg px-8 py-6">
              Start Investing
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="#plans">
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
              View Plans
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t">
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">$3T+</div>
            <div className="text-muted-foreground">Assets Under Management</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">50K+</div>
            <div className="text-muted-foreground">Active Investors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">99.9%</div>
            <div className="text-muted-foreground">Platform Uptime</div>
          </div>
        </div>
      </div>
    </section>
  )
}
