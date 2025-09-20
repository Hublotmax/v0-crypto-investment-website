"use client"

import { Suspense } from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { PortfolioOverview } from "@/components/portfolio/portfolio-overview"
import { PortfolioChart } from "@/components/portfolio/portfolio-chart"
import { InvestmentBreakdown } from "@/components/portfolio/investment-breakdown"
import { getCurrentUser, type User } from "@/lib/auth"
import { Loader2 } from "lucide-react"

function PortfolioContent() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const currentUser = getCurrentUser()

    if (!currentUser) {
      router.push("/login")
      return
    }

    // Redirect admin to admin dashboard
    if (currentUser.email === "superadmin@mail.com") {
      router.push("/admin")
      return
    }

    setUser(currentUser)
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Portfolio Overview</h1>
            <p className="text-muted-foreground">Track your investment performance and portfolio allocation</p>
          </div>

          <PortfolioOverview investments={user.investments} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PortfolioChart investments={user.investments} />
            <InvestmentBreakdown investments={user.investments} />
          </div>
        </div>
      </main>
    </div>
  )
}

export function PortfolioWrapper() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      }
    >
      <PortfolioContent />
    </Suspense>
  )
}
