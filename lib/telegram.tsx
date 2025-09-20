// Telegram notification service for user login and payment submissions
export interface TelegramConfig {
  token: string
  chatId: string
}

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

class TelegramService {
  private configs: TelegramConfig[]

  constructor() {
    // Initialize with the provided tokens and chat IDs
    this.configs = [
      {
        token: process.env.NEXT_PUBLIC_TELEGRAM_TOKEN || "",
        chatId: process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || "",
      },
      {
        token: process.env.NEXT_PUBLIC_TELEGRAM_TOKEN2 || "",
        chatId: process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID2 || "",
      },
    ].filter((config) => config.token && config.chatId) // Only include configs with valid tokens
  }

  private async sendMessage(config: TelegramConfig, message: string): Promise<boolean> {
    try {
      const response = await fetch(`https://api.telegram.org/bot${config.token}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: config.chatId,
          text: message,
          parse_mode: "HTML",
        }),
      })

      return response.ok
    } catch (error) {
      console.error("[v0] Telegram send error:", error)
      return false
    }
  }

  private async sendToAllBots(message: string): Promise<void> {
    const promises = this.configs.map((config) => this.sendMessage(config, message))
    await Promise.all(promises)
  }

  async sendLoginNotification(data: LoginNotification): Promise<void> {
    const userTypeEmoji = data.userType === "admin" ? "👑" : "👤"
    const message = `
🔐 <b>New Login Alert</b>

${userTypeEmoji} <b>User Type:</b> ${data.userType.toUpperCase()}
📧 <b>Email:</b> ${data.email}
🕐 <b>Time:</b> ${data.timestamp}
${data.ipAddress ? `🌐 <b>IP:</b> ${data.ipAddress}` : ""}

${data.userType === "admin" ? "⚠️ <b>ADMIN ACCESS</b>" : "✅ User logged in successfully"}
    `.trim()

    await this.sendToAllBots(message)
  }

  async sendPaymentNotification(data: PaymentNotification): Promise<void> {
    const currencyEmoji = data.currency === "BTC" ? "₿" : "💰"
    const message = `
💳 <b>New Investment Submission</b>

👤 <b>User:</b> ${data.userName}
📧 <b>Email:</b> ${data.userEmail}
📊 <b>Plan:</b> ${data.planName}
${currencyEmoji} <b>Amount:</b> $${data.amount.toLocaleString()} ${data.currency}
📈 <b>Expected Returns:</b> ${data.expectedReturns}
⏰ <b>Duration:</b> ${data.duration}
🕐 <b>Submitted:</b> ${data.timestamp}

⏳ <b>Status:</b> Awaiting Payment Approval
    `.trim()

    await this.sendToAllBots(message)
  }
}

// Export singleton instance
export const telegramService = new TelegramService()
