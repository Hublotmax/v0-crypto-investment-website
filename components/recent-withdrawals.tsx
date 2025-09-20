"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Withdrawal {
  id: string
  name: string
  address: string
  amount: number
  currency: "BTC" | "USDT"
  timestamp: Date
}

const generateRandomWithdrawal = (): Withdrawal => {
  const names = [
    "John Smith",
    "Sarah Johnson",
    "Michael Brown",
    "Emma Davis",
    "David Wilson",
    "Lisa Anderson",
    "Robert Taylor",
    "Jennifer Martinez",
    "William Garcia",
    "Mary Rodriguez",
    "James Miller",
    "Patricia Wilson",
    "Christopher Moore",
    "Linda Taylor",
    "Daniel Anderson",
    "Barbara Thomas",
    "Matthew Jackson",
    "Elizabeth White",
    "Anthony Harris",
    "Susan Martin",
    "Mark Thompson",
    "Nancy Garcia",
    "Steven Martinez",
    "Betty Robinson",
    "Paul Clark",
    "Helen Rodriguez",
    "Andrew Lewis",
    "Sandra Lee",
    "Joshua Walker",
    "Donna Hall",
    "Kenneth Allen",
    "Carol Young",
    "Kevin Hernandez",
    "Ruth King",
    "Brian Wright",
    "Sharon Lopez",
    "George Hill",
    "Michelle Scott",
    "Edward Green",
    "Laura Adams",
    "Ronald Baker",
    "Cynthia Gonzalez",
    "Timothy Nelson",
    "Amy Carter",
    "Jason Mitchell",
    "Kathleen Perez",
    "Jeffrey Roberts",
    "Angela Turner",
    "Ryan Phillips",
    "Brenda Campbell",
  ]

  const btcPrefixes = ["1", "3", "bc1"]
  const usdtPrefixes = ["0x", "TR", "TU"]

  const currency = Math.random() > 0.5 ? "BTC" : "USDT"
  const prefixes = currency === "BTC" ? btcPrefixes : usdtPrefixes
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]

  // Generate random address
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  const addressLength = currency === "BTC" ? 34 : 42
  let address = prefix

  for (let i = prefix.length; i < addressLength; i++) {
    address += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  // Mask last 6 digits
  const maskedAddress = address.slice(0, -6) + "******"

  // Generate random amount
  const amount =
    currency === "BTC"
      ? Number.parseFloat((Math.random() * 2 + 0.1).toFixed(4))
      : Number.parseFloat((Math.random() * 50000 + 1000).toFixed(2))

  // Generate random timestamp within last month
  const now = new Date()
  const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  const randomTime = new Date(lastMonth.getTime() + Math.random() * (now.getTime() - lastMonth.getTime()))

  return {
    id: Math.random().toString(36).substr(2, 9),
    name: names[Math.floor(Math.random() * names.length)],
    address: maskedAddress,
    amount,
    currency,
    timestamp: randomTime,
  }
}

export function RecentWithdrawals() {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([])

  // Generate initial withdrawals
  useEffect(() => {
    const initialWithdrawals = Array.from({ length: 100 }, generateRandomWithdrawal).sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime(),
    )
    setWithdrawals(initialWithdrawals)
  }, [])

  // Add new withdrawal every 5 minutes
  useEffect(() => {
    const interval = setInterval(
      () => {
        const newWithdrawal = generateRandomWithdrawal()
        // Set timestamp to now for new withdrawals
        newWithdrawal.timestamp = new Date()

        setWithdrawals((prev) => {
          const updated = [newWithdrawal, ...prev].slice(0, 100) // Keep only latest 100
          return updated.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        })
      },
      5 * 60 * 1000,
    ) // 5 minutes

    return () => clearInterval(interval)
  }, [])

  const formatTime = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Recent Withdrawals</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See real-time payouts to our investors. Join thousands of satisfied clients who are earning consistent
            returns.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              Live Withdrawal Feed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {withdrawals.slice(0, 20).map((withdrawal) => (
                <div
                  key={withdrawal.id}
                  className="flex items-center justify-between p-3 bg-background rounded-lg border"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="font-medium">{withdrawal.name}</div>
                      <Badge variant="outline" className="text-xs">
                        {withdrawal.currency}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground font-mono">{withdrawal.address}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">
                      +{withdrawal.amount} {withdrawal.currency}
                    </div>
                    <div className="text-xs text-muted-foreground">{formatTime(withdrawal.timestamp)}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center text-sm text-muted-foreground">
              Showing latest 20 of {withdrawals.length} recent withdrawals
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
