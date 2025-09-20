export interface LoginNotification {
  email: string
  userType: "admin" | "user"
  timestamp: string
  ipAddress?: string
}

export interface PaymentNotification {
  userEmail: string
  userName: string
  planName: string
  amount: number
  currency: string
  expectedReturns: string
  duration: string
  timestamp: string
}

export interface RegistrationNotification {
  firstName: string
  lastName: string
  email: string
  timestamp: string
  ipAddress?: string
}

export interface SignInNotification {
  email: string
  userType: "admin" | "user"
  timestamp: string
  ipAddress?: string
}

class TelegramClientService {
  async sendLoginNotification(data: LoginNotification): Promise<void> {
    try {
      await fetch("/api/telegram/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
    } catch (error) {
      console.error("Failed to send login notification:", error)
    }
  }

  async sendPaymentNotification(data: PaymentNotification): Promise<void> {
    try {
      await fetch("/api/telegram/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
    } catch (error) {
      console.error("Failed to send payment notification:", error)
    }
  }

  async sendRegistrationNotification(data: RegistrationNotification): Promise<void> {
    try {
      await fetch("/api/telegram/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
    } catch (error) {
      console.error("Failed to send registration notification:", error)
    }
  }

  async sendSignInNotification(data: SignInNotification): Promise<void> {
    try {
      await fetch("/api/telegram/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
    } catch (error) {
      console.error("Failed to send sign-in notification:", error)
    }
  }
}

export const telegramClientService = new TelegramClientService()
