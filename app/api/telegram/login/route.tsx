import { type NextRequest, NextResponse } from "next/server"

interface LoginNotification {
  email: string
  userType: "admin" | "user"
  timestamp: string
  ipAddress?: string
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
    const data: LoginNotification = await request.json()

    const userTypeEmoji = data.userType === "admin" ? "👑" : "👤"
    const message = `
🔐 <b>New Login Alert</b>

${userTypeEmoji} <b>User Type:</b> ${data.userType.toUpperCase()}
📧 <b>Email:</b> ${data.email}
🕐 <b>Time:</b> ${data.timestamp}
${data.ipAddress ? `🌐 <b>IP:</b> ${data.ipAddress}` : ""}

${data.userType === "admin" ? "⚠️ <b>ADMIN ACCESS</b>" : "✅ User logged in successfully"}
    `.trim()

    await sendToAllBots(message)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Login notification error:", error)
    return NextResponse.json({ success: false, error: "Failed to send notification" }, { status: 500 })
  }
}
