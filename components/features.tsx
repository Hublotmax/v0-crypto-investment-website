import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, TrendingUp, Users, Zap, Lock, BarChart3 } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Bank-Level Security",
    description: "Your investments are protected with military-grade encryption and multi-factor authentication.",
  },
  {
    icon: TrendingUp,
    title: "Automated Execution",
    description: "Streamline crypto trading with automated execution powered by advanced algorithms.",
  },
  {
    icon: BarChart3,
    title: "Risk Management",
    description: "Create custom risk policies, monitor open orders, and take control of your portfolio.",
  },
  {
    icon: Users,
    title: "Expert Support",
    description: "Get guidance from our team of crypto investment experts and dedicated account managers.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Execute trades in milliseconds with our high-performance trading infrastructure.",
  },
  {
    icon: Lock,
    title: "Regulatory Compliant",
    description: "Fully compliant with financial regulations and audited by leading security firms.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">Why Choose CryptoVest</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Built for the modern investor with enterprise-grade security and professional-level tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
