"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Loader2, DollarSign, TrendingUp, Clock } from "lucide-react"
import { updateUserInvestments, type User, type Investment } from "@/lib/auth"
import { telegramClientService } from "@/lib/telegram-client"

interface InvestmentFormProps {
  user: User
  selectedPlan?: string | null
}

const investmentPlans = {
  starter: {
    name: "Starter",
    minAmount: 100,
    maxAmount: 500,
    duration: "30 days",
    returns: "5%",
  },
  growth: {
    name: "Growth",
    minAmount: 500,
    maxAmount: 2000,
    duration: "60 days",
    returns: "12%",
  },
  professional: {
    name: "Professional",
    minAmount: 2000,
    maxAmount: 5000,
    duration: "90 days",
    returns: "20%",
  },
  elite: {
    name: "Elite",
    minAmount: 5000,
    maxAmount: 10000,
    duration: "120 days",
    returns: "35%",
  },
}

export function InvestmentForm({ user, selectedPlan }: InvestmentFormProps) {
  const [planType, setPlanType] = useState(selectedPlan || "")
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPayment, setShowPayment] = useState(false)
  const router = useRouter()

  const currentPlan = planType ? investmentPlans[planType as keyof typeof investmentPlans] : null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!planType || !amount || !currency) {
      setError("Please fill in all fields")
      return
    }

    const investmentAmount = Number.parseFloat(amount)

    if (!currentPlan) {
      setError("Please select a valid investment plan")
      return
    }

    if (investmentAmount < currentPlan.minAmount || investmentAmount > currentPlan.maxAmount) {
      setError(`Investment amount must be between $${currentPlan.minAmount} and $${currentPlan.maxAmount}`)
      return
    }

    setShowPayment(true)
  }

  const handlePayment = async () => {
    setIsLoading(true)

    try {
      const investment: Investment = {
        id: Date.now().toString(),
        planName: currentPlan!.name,
        amount: Number.parseFloat(amount),
        currency,
        status: "pending",
        createdAt: new Date().toISOString(),
        expectedReturns: currentPlan!.returns,
        duration: currentPlan!.duration,
      }

      const result = await updateUserInvestments(user.id, investment)

      if (result.success) {
        try {
          await telegramClientService.sendPaymentNotification({
            userEmail: user.email,
            userName: `${user.firstName} ${user.lastName}`,
            planName: currentPlan!.name,
            amount: Number.parseFloat(amount),
            currency,
            expectedReturns: currentPlan!.returns,
            duration: currentPlan!.duration,
            timestamp: new Date().toLocaleString(),
          })
        } catch (telegramError) {
          console.error("[v0] Failed to send Telegram notification:", telegramError)
        }

        localStorage.setItem("currentUser", JSON.stringify(result.user))
        router.push("/dashboard?success=investment-created")
      } else {
        setError(result.error || "Failed to create investment")
      }
    } catch (err) {
      setError("An error occurred while processing your investment")
    } finally {
      setIsLoading(false)
    }
  }

  if (showPayment) {
    return (
      <PaymentInterface
        investment={{ planType, amount, currency, plan: currentPlan! }}
        onConfirm={handlePayment}
        onBack={() => setShowPayment(false)}
        isLoading={isLoading}
      />
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Investment Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="plan">Investment Plan</Label>
            <Select value={planType} onValueChange={setPlanType}>
              <SelectTrigger>
                <SelectValue placeholder="Select an investment plan" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(investmentPlans).map(([key, plan]) => (
                  <SelectItem key={key} value={key}>
                    {plan.name} - {plan.returns} returns ({plan.duration})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {currentPlan && (
            <div className="bg-muted rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{currentPlan.name} Plan</h3>
                <Badge variant="secondary">{currentPlan.returns} Returns</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Investment Range</p>
                    <p className="font-medium">
                      ${currentPlan.minAmount.toLocaleString()} - ${currentPlan.maxAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Duration</p>
                    <p className="font-medium">{currentPlan.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Expected Returns</p>
                    <p className="font-medium text-success">{currentPlan.returns}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="amount">Investment Amount</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={
                currentPlan ? `Min: $${currentPlan.minAmount}, Max: $${currentPlan.maxAmount}` : "Enter amount"
              }
              min={currentPlan?.minAmount}
              max={currentPlan?.maxAmount}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency">Payment Currency</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USDT">USDT (Tether)</SelectItem>
                <SelectItem value="BTC">BTC (Bitcoin)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full" size="lg">
            Continue to Payment
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

interface PaymentInterfaceProps {
  investment: {
    planType: string
    amount: string
    currency: string
    plan: {
      name: string
      returns: string
      duration: string
    }
  }
  onConfirm: () => void
  onBack: () => void
  isLoading: boolean
}

function PaymentInterface({ investment, onConfirm, onBack, isLoading }: PaymentInterfaceProps) {
  const walletAddresses = {
    USDT: "TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE",
    BTC: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  }

  const currentAddress = walletAddresses[investment.currency as keyof typeof walletAddresses]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Complete Payment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-muted rounded-lg p-4">
          <h3 className="font-semibold mb-3">Investment Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Plan:</span>
              <span className="font-medium">{investment.plan.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Amount:</span>
              <span className="font-medium">${Number.parseFloat(investment.amount).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Currency:</span>
              <span className="font-medium">{investment.currency}</span>
            </div>
            <div className="flex justify-between">
              <span>Expected Returns:</span>
              <span className="font-medium text-success">{investment.plan.returns}</span>
            </div>
            <div className="flex justify-between">
              <span>Duration:</span>
              <span className="font-medium">{investment.plan.duration}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-base font-semibold">Payment Instructions</Label>
            <p className="text-sm text-muted-foreground mt-1">
              Send exactly ${Number.parseFloat(investment.amount).toLocaleString()} worth of {investment.currency} to
              the address below:
            </p>
          </div>

          <div className="bg-card border rounded-lg p-4">
            <Label className="text-sm font-medium">{investment.currency} Wallet Address</Label>
            <div className="mt-2 p-3 bg-muted rounded font-mono text-sm break-all">{currentAddress}</div>
            <Button
              variant="outline"
              size="sm"
              className="mt-2 bg-transparent"
              onClick={() => navigator.clipboard.writeText(currentAddress)}
            >
              Copy Address
            </Button>
          </div>

          <Alert>
            <AlertDescription>
              <strong>Important:</strong> After sending the payment, click "Confirm Payment" below. Your investment will
              be marked as pending and activated once we verify the transaction on the blockchain.
            </AlertDescription>
          </Alert>
        </div>

        <div className="flex space-x-4">
          <Button variant="outline" onClick={onBack} className="flex-1 bg-transparent" disabled={isLoading}>
            Back
          </Button>
          <Button onClick={onConfirm} className="flex-1" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Confirm Payment
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
