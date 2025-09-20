"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Starter",
    description: "Perfect for beginners",
    minAmount: 100,
    maxAmount: 500,
    duration: "30 days",
    returns: "5%",
    features: ["Basic portfolio tracking", "Email support", "Monthly reports", "Mobile app access"],
    popular: false,
  },
  {
    name: "Growth",
    description: "Most popular choice",
    minAmount: 500,
    maxAmount: 2000,
    duration: "60 days",
    returns: "12%",
    features: [
      "Advanced analytics",
      "Priority support",
      "Weekly reports",
      "Mobile app access",
      "Risk management tools",
    ],
    popular: true,
  },
  {
    name: "Professional",
    description: "For serious investors",
    minAmount: 2000,
    maxAmount: 5000,
    duration: "90 days",
    returns: "20%",
    features: [
      "Professional analytics",
      "Dedicated support",
      "Daily reports",
      "Mobile app access",
      "Advanced risk tools",
      "Custom strategies",
    ],
    popular: false,
  },
  {
    name: "Elite",
    description: "Maximum returns",
    minAmount: 5000,
    maxAmount: 10000,
    duration: "120 days",
    returns: "35%",
    features: [
      "Elite-level analytics",
      "24/7 dedicated support",
      "Real-time reports",
      "Mobile app access",
      "Premium risk tools",
      "Custom strategies",
      "Personal advisor",
    ],
    popular: false,
  },
]

export function InvestmentPlans() {
  return (
    <section id="plans" className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">Choose Your Investment Plan</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Select from our carefully crafted investment plans designed to maximize your crypto returns while managing
            risk effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? "border-accent shadow-lg scale-105" : ""}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent text-accent-foreground">
                  <Star className="h-3 w-3 mr-1" />
                  Most Popular
                </Badge>
              )}

              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <div className="text-3xl font-bold text-success">{plan.returns}</div>
                  <div className="text-sm text-muted-foreground">Expected Returns</div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground">Investment Range</div>
                  <div className="font-semibold">
                    ${plan.minAmount.toLocaleString()} - ${plan.maxAmount.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">Duration: {plan.duration}</div>
                </div>

                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-success flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Link href={`/invest?plan=${plan.name.toLowerCase()}`} className="w-full">
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                    Choose {plan.name}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
