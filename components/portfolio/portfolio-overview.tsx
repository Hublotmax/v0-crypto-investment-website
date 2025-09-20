"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, DollarSign, PieChart } from "lucide-react"
import type { Investment } from "@/lib/auth"

interface PortfolioOverviewProps {
  investments: Investment[]
}

export function PortfolioOverview({ investments }: PortfolioOverviewProps) {
  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0)
  const activeInvestments = investments.filter((inv) => inv.status === "active").length
  const pendingInvestments = investments.filter((inv) => inv.status === "pending").length

  // Calculate estimated returns (simplified calculation)
  const estimatedReturns = investments.reduce((sum, inv) => {
    if (inv.status === "active") {
      const returnRate = Number.parseFloat(inv.expectedReturns.replace("%", "")) / 100
      return sum + inv.amount * returnRate
    }
    return sum
  }, 0)

  const totalValue = totalInvested + estimatedReturns

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">+${estimatedReturns.toLocaleString()} estimated returns</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalInvested.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Across {investments.length} investments</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Investments</CardTitle>
          <PieChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeInvestments}</div>
          <p className="text-xs text-muted-foreground">{pendingInvestments} pending approval</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Estimated Returns</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">+${estimatedReturns.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            {estimatedReturns > 0 ? "+" : ""}
            {((estimatedReturns / totalInvested) * 100 || 0).toFixed(1)}% growth
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
