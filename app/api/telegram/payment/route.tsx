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
  const configs: TelegramConfig[] = [
    {
      token: process.env.TELEGRAM_TOKEN || "",
      chatId: process.env.TELEGRAM_CHAT_ID || "",
    },
    {
      token: process.env.TELEGRAM_TOKEN2 || "",
      chatId: process.env.TELEGRAM_CHAT_ID2 || "",
    },
  ].filter((config) => config.token && config.chatId)

  const promises = configs.map((config) => sendMessage(config, message))
  await Promise.all(promises)
}

export async function POST(request: NextRequest) {
  try {
    const data: PaymentNotification = await request.json()

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

    await sendToAllBots(message)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Payment notification error:", error)
    return NextResponse.json({ success: false, error: "Failed to send notification" }, { status: 500 })
  }
}
