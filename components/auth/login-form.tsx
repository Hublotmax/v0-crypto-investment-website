"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { authenticateUser } from "@/lib/auth"
import { telegramClientService } from "@/lib/telegram-client"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      console.log("[v0] Starting login process for:", email)
      const result = await authenticateUser(email, password)

      console.log("[v0] Login result:", result)

      if (result.success) {
        console.log("[v0] Login successful, storing user session")
        // Store user session
        localStorage.setItem("currentUser", JSON.stringify(result.user))

        try {
          console.log("[v0] Sending Telegram sign-in notification")
          await telegramClientService.sendSignInNotification({
            email,
            userType: result.user?.email === "superadmin@mail.com" ? "admin" : "user",
            timestamp: new Date().toLocaleString(),
          })
          console.log("[v0] Telegram notification sent successfully")
        } catch (telegramError) {
          console.error("[v0] Failed to send Telegram notification:", telegramError)
          // Don't block login if Telegram fails
        }

        const redirectPath = result.user?.email === "superadmin@mail.com" ? "/admin" : "/dashboard"
        console.log("[v0] Redirecting to:", redirectPath)

        // Show success message briefly
        setError(`Login successful! Redirecting to ${redirectPath.substring(1)}...`)

        // Add a small delay to ensure localStorage is set
        setTimeout(() => {
          console.log("[v0] Executing redirect to", redirectPath)
          router.push(redirectPath)
        }, 100)
      } else {
        console.log("[v0] Login failed:", result.error)
        setError(result.error || "Invalid credentials")
      }
    } catch (err) {
      console.error("[v0] Login error:", err)
      setError("An error occurred during login")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
