import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, DollarSign, TrendingUp } from "lucide-react"
import type { Investment } from "@/lib/auth"
import Link from "next/link"

interface InvestmentsListProps {
  investments: Investment[]
}

export function InvestmentsList({ investments }: InvestmentsListProps) {
  const getStatusColor = (status: Investment["status"]) => {
    switch (status) {
      case "active":
        return "bg-success text-success-foreground"
      case "pending":
        return "bg-accent text-accent-foreground"
      case "completed":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusText = (status: Investment["status"]) => {
    switch (status) {
      case "active":
        return "Active"
      case "pending":
        return "Pending Approval"
      case "completed":
        return "Completed"
      default:
        return "Unknown"
    }
  }

  if (investments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Investments</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No investments yet</p>
            <p className="text-sm">Start your crypto investment journey today</p>
          </div>
          <Link href="/invest">
            <Button>Make Your First Investment</Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Investments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {investments.map((investment) => (
          <div key={investment.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">{investment.planName} Plan</h3>
                <p className="text-sm text-muted-foreground">
                  Created {new Date(investment.createdAt).toLocaleDateString()}
                </p>
              </div>
              <Badge className={getStatusColor(investment.status)}>{getStatusText(investment.status)}</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Investment Amount</p>
                  <p className="font-semibold">
                    ${investment.amount.toLocaleString()} {investment.currency}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Expected Returns</p>
                  <p className="font-semibold text-success">{investment.expectedReturns}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-semibold">{investment.duration}</p>
                </div>
              </div>
            </div>

            {investment.status === "pending" && (
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
                <p className="text-sm text-accent-foreground">
                  <strong>Payment Status:</strong> Awaiting payment approval. Your investment will be activated once
                  payment is confirmed.
                </p>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
