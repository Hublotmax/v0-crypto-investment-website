"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Investment } from "@/lib/auth"
import { Calendar, Clock, TrendingUp } from "lucide-react"

interface InvestmentBreakdownProps {
  investments: Investment[]
}

export function InvestmentBreakdown({ investments }: InvestmentBreakdownProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Investment Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {investments.map((investment) => (
            <div key={investment.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{investment.planName} Plan</h4>
                  <p className="text-2xl font-bold">${investment.amount.toLocaleString()}</p>
                </div>
                <Badge className={getStatusColor(investment.status)}>
                  {investment.status.charAt(0).toUpperCase() + investment.status.slice(1)}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-muted-foreground">Expected Returns:</span>
                  <span className="font-medium text-green-600">{investment.expectedReturns}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">{investment.duration}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Created:</span>
                <span>{new Date(investment.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}

          {investments.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No investments found</p>
              <p className="text-sm">Start your investment journey today</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
