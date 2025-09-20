"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Investment } from "@/lib/auth"

interface PortfolioChartProps {
  investments: Investment[]
}

export function PortfolioChart({ investments }: PortfolioChartProps) {
  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0)

  // Group investments by plan
  const planData = investments.reduce(
    (acc, inv) => {
      if (!acc[inv.planName]) {
        acc[inv.planName] = { amount: 0, count: 0 }
      }
      acc[inv.planName].amount += inv.amount
      acc[inv.planName].count += 1
      return acc
    },
    {} as Record<string, { amount: number; count: number }>,
  )

  const chartData = Object.entries(planData).map(([plan, data]) => ({
    plan,
    amount: data.amount,
    percentage: ((data.amount / totalInvested) * 100).toFixed(1),
    count: data.count,
  }))

  const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500", "bg-red-500"]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {chartData.map((item, index) => (
            <div key={item.plan} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${colors[index % colors.length]}`} />
                  <span className="font-medium">{item.plan}</span>
                </div>
                <span className="text-sm text-muted-foreground">{item.percentage}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${colors[index % colors.length]}`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>${item.amount.toLocaleString()}</span>
                <span>
                  {item.count} investment{item.count !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          ))}

          {chartData.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No investments yet</p>
              <p className="text-sm">Start investing to see your portfolio allocation</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
