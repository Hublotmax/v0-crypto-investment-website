import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, DollarSign, Clock, Target } from "lucide-react"
import type { Investment } from "@/lib/auth"

interface DashboardStatsProps {
  investments: Investment[]
}

export function DashboardStats({ investments }: DashboardStatsProps) {
  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0)
  const activeInvestments = investments.filter((inv) => inv.status === "active").length
  const pendingInvestments = investments.filter((inv) => inv.status === "pending").length
  const completedInvestments = investments.filter((inv) => inv.status === "completed").length

  // Calculate estimated returns (simplified calculation)
  const estimatedReturns = investments.reduce((sum, inv) => {
    const returnRate = Number.parseFloat(inv.expectedReturns.replace("%", "")) / 100
    return sum + inv.amount * returnRate
  }, 0)

  const stats = [
    {
      title: "Total Invested",
      value: `$${totalInvested.toLocaleString()}`,
      icon: DollarSign,
      description: "Across all investments",
    },
    {
      title: "Estimated Returns",
      value: `$${estimatedReturns.toLocaleString()}`,
      icon: TrendingUp,
      description: "Expected profit",
    },
    {
      title: "Active Investments",
      value: activeInvestments.toString(),
      icon: Target,
      description: "Currently running",
    },
    {
      title: "Pending Approval",
      value: pendingInvestments.toString(),
      icon: Clock,
      description: "Awaiting confirmation",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
