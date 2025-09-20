import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, DollarSign, TrendingUp, Clock } from "lucide-react"
import type { User } from "@/lib/auth"

interface AdminStatsProps {
  users: User[]
}

export function AdminStats({ users }: AdminStatsProps) {
  const totalUsers = users.length
  const totalInvestments = users.reduce((sum, user) => sum + user.investments.length, 0)
  const totalInvested = users.reduce(
    (sum, user) => sum + user.investments.reduce((userSum, inv) => userSum + inv.amount, 0),
    0,
  )
  const pendingInvestments = users.reduce(
    (sum, user) => sum + user.investments.filter((inv) => inv.status === "pending").length,
    0,
  )

  const stats = [
    {
      title: "Total Users",
      value: totalUsers.toString(),
      icon: Users,
      description: "Registered users",
    },
    {
      title: "Total Invested",
      value: `$${totalInvested.toLocaleString()}`,
      icon: DollarSign,
      description: "Platform volume",
    },
    {
      title: "Total Investments",
      value: totalInvestments.toString(),
      icon: TrendingUp,
      description: "All time investments",
    },
    {
      title: "Pending Approvals",
      value: pendingInvestments.toString(),
      icon: Clock,
      description: "Awaiting approval",
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
