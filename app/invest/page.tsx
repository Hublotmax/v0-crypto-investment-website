"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { InvestmentForm } from "@/components/invest/investment-form"
import { getCurrentUser, type User } from "@/lib/auth"
import { Loader2 } from "lucide-react"
import Link from "next/link"

export default function InvestPage() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedPlan = searchParams.get("plan")

  useEffect(() => {
    const currentUser = getCurrentUser()

    if (!currentUser) {
      router.push("/login")
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
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">C</span>
            </div>
            <span className="font-bold text-xl">CryptoVest</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Make an Investment</h1>
            <p className="text-muted-foreground">Choose your investment amount and payment method</p>
          </div>

          <InvestmentForm user={user} selectedPlan={selectedPlan} />
        </div>
      </main>
    </div>
  )
}
