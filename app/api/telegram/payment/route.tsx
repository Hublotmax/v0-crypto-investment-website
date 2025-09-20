import { type NextRequest, NextResponse } from "next/server"

interface PaymentNotification {
  userEmail: string
  userName: string
  planName: string
  amount: number
  currency: string
  expectedReturns: string
  duration: string
  timestamp: string
}

interface TelegramConfig {
  token: string
  chatId: string
}

const TELEGRAM_CONFIG = [
  {
    token: "5963887785:AAGpNa8vl3HCcXbQs51VSzfM_X0HvB_BJPw", // Add your first bot token here
    chatId: "951261137", // Add your first chat ID here
  },
  {
    token: "", // Add your second bot token here
    chatId: "", // Add your second chat ID here
  },
]

async function sendMessage(config: TelegramConfig, message: string): Promise<boolean> {
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
    console.error("Telegram send error:", error)
    return false
  }
}

async function sendToAllBots(message: string): Promise<void> {
  const configs: TelegramConfig[] = TELEGRAM_CONFIG.filter((config) => config.token && config.chatId)

  console.log("[v0] Telegram configs found:", configs.length)
  console.log(
    "[v0] Active configs:",
    configs.map((c) => ({ token: c.token.substring(0, 10) + "...", chatId: c.chatId })),
  )

  const promises = configs.map((config) => sendMessage(config, message))
  await Promise.all(promises)
}

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Payment notification API called")
    const data: PaymentNotification = await request.json()
    console.log("[v0] Payment data received:", data)

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

    console.log("[v0] Sending message:", message)
    await sendToAllBots(message)
    console.log("[v0] Payment notification sent successfully")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Payment notification error:", error)
    return NextResponse.json({ success: false, error: "Failed to send notification" }, { status: 500 })
  }
}
