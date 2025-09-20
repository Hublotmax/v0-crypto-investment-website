"use client"

import { Suspense } from "react"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { InvestmentsList } from "@/components/dashboard/investments-list"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getCurrentUser, type User } from "@/lib/auth"
import { Loader2, CheckCircle } from "lucide-react"

function DashboardContent() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()
  const success = searchParams.get("success")

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
          {success === "investment-created" && (
            <Alert className="border-success bg-success/10">
              <CheckCircle className="h-4 w-4 text-success" />
              <AlertDescription className="text-success-foreground">
                <strong>Investment Created Successfully!</strong> Your investment is now pending approval. You will be
                notified once the payment is verified and your investment becomes active.
              </AlertDescription>
            </Alert>
          )}

          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user.firstName}!</h1>
            <p className="text-muted-foreground">Here's an overview of your investment portfolio</p>
          </div>

          <DashboardStats investments={user.investments} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <InvestmentsList investments={user.investments} />
            </div>
            <div>
              <RecentActivity investments={user.investments} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export function DashboardWrapper() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  )
}
