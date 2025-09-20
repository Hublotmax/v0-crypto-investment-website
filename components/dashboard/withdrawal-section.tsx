"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Wallet, Clock } from "lucide-react"
import type { Investment } from "@/lib/auth"

interface WithdrawalSectionProps {
  investments: Investment[]
}

export function WithdrawalSection({ investments }: WithdrawalSectionProps) {
  const [showPendingAlert, setShowPendingAlert] = useState(false)

  // Calculate available balance (only from active investments)
  const activeInvestments = investments.filter((inv) => inv.status === "active")
  const availableBalance = activeInvestments.reduce((sum, inv) => {
    const returnRate = Number.parseFloat(inv.expectedReturns.replace("%", "")) / 100
    return sum + inv.amount * returnRate
  }, 0)

  const handleWithdrawal = () => {
    setShowPendingAlert(true)

    // Hide the alert after 5 seconds
    setTimeout(() => {
      setShowPendingAlert(false)
    }, 5000)
  }

  return (
    <div className="space-y-4">
      {showPendingAlert && (
        <Alert className="border-yellow-200 bg-yellow-50">
          <Clock className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            <strong>Withdrawal Request Submitted!</strong> Your payment is pending approval. You will be notified once
            the withdrawal is processed and approved by our team.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wallet className="h-5 w-5" />
            <span>Withdrawal</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Available Balance:</span>
              <span className="text-lg font-semibold">${availableBalance.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Active Investments:</span>
              <span className="text-sm">{activeInvestments.length}</span>
            </div>
          </div>

          <Button onClick={handleWithdrawal} className="w-full" disabled={availableBalance <= 0}>
            <Wallet className="mr-2 h-4 w-4" />
            Request Withdrawal
          </Button>

          {availableBalance <= 0 && (
            <p className="text-xs text-muted-foreground text-center">
              No funds available for withdrawal. Complete active investments to unlock returns.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
