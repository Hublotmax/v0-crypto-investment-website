import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, DollarSign, TrendingUp } from "lucide-react"
import type { Investment } from "@/lib/auth"

interface RecentActivityProps {
  investments: Investment[]
}

export function RecentActivity({ investments }: RecentActivityProps) {
  // Sort investments by creation date (most recent first)
  const recentInvestments = [...investments]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  const getActivityIcon = (status: Investment["status"]) => {
    switch (status) {
      case "active":
        return TrendingUp
      case "pending":
        return Clock
      case "completed":
        return DollarSign
      default:
        return Clock
    }
  }

  const getActivityText = (investment: Investment) => {
    switch (investment.status) {
      case "active":
        return `Started ${investment.planName} investment`
      case "pending":
        return `Created ${investment.planName} investment`
      case "completed":
        return `Completed ${investment.planName} investment`
      default:
        return `Updated ${investment.planName} investment`
    }
  }

  const getStatusColor = (status: Investment["status"]) => {
    switch (status) {
      case "active":
        return "text-success"
      case "pending":
        return "text-accent-foreground"
      case "completed":
        return "text-muted-foreground"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {recentInvestments.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="h-8 w-8 mx-auto mb-2 text-muted-foreground opacity-50" />
            <p className="text-sm text-muted-foreground">No recent activity</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentInvestments.map((investment) => {
              const ActivityIcon = getActivityIcon(investment.status)
              return (
                <div key={investment.id} className="flex items-start gap-3">
                  <div className={`p-2 rounded-full bg-muted ${getStatusColor(investment.status)}`}>
                    <ActivityIcon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{getActivityText(investment)}</p>
                    <p className="text-xs text-muted-foreground">
                      ${investment.amount.toLocaleString()} • {new Date(investment.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
