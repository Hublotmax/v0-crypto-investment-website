import { type NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

const DATA_FILE = path.join(process.cwd(), "data", "users.txt")

const ADMIN_USER = {
  id: "admin-001",
  firstName: "Super",
  lastName: "Admin",
  email: "superadmin@mail.com",
  password: "Olamide1!",
  createdAt: new Date().toISOString(),
  investments: [],
}

async function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), "data")
  try {
    await fs.access(dataDir)
    console.log("[v0] Data directory exists")
  } catch {
    console.log("[v0] Creating data directory")
    await fs.mkdir(dataDir, { recursive: true })
  }
}

export async function GET() {
  try {
    console.log("[v0] GET request - Loading user data from:", DATA_FILE)
    await ensureDataDirectory()

    try {
      const data = await fs.readFile(DATA_FILE, "utf-8")
      console.log("[v0] File content:", data.substring(0, 100) + "...")
      const users = JSON.parse(data)

      const hasAdmin = users.some((user: any) => user.email === "superadmin@mail.com")
      if (!hasAdmin) {
        users.unshift(ADMIN_USER)
      }

      console.log("[v0] Successfully loaded users:", users.length)
      return NextResponse.json({ users })
    } catch (error) {
      console.log("[v0] File doesn't exist or is invalid, creating with admin user")
      const initialUsers = [ADMIN_USER]
      await fs.writeFile(DATA_FILE, JSON.stringify(initialUsers, null, 2))
      console.log("[v0] Created initial file with admin user")
      return NextResponse.json({ users: initialUsers })
    }
  } catch (error) {
    console.error("[v0] Error in GET request:", error)
    return NextResponse.json({ error: "Failed to read user data", details: error.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] POST request - Saving user data")

    const body = await request.json()
    console.log("[v0] Request body received")

    const { users } = body

    if (!Array.isArray(users)) {
      console.error("[v0] Invalid users data - not an array")
      return NextResponse.json({ error: "Invalid users data" }, { status: 400 })
    }

    // Try to save to file system, but don't fail if it doesn't work
    try {
      await ensureDataDirectory()

      const hasAdmin = users.some((user: any) => user.email === "superadmin@mail.com")
      if (!hasAdmin) {
        users.unshift(ADMIN_USER)
      }

      const dataToWrite = JSON.stringify(users, null, 2)
      await fs.writeFile(DATA_FILE, dataToWrite)

      console.log("[v0] Successfully saved to file system:", users.length)
      return NextResponse.json({ success: true, userCount: users.length, method: "filesystem" })
    } catch (fsError) {
      console.warn("[v0] File system save failed:", fsError.message)

      // Return success anyway since client-side storage is primary
      return NextResponse.json({
        success: true,
        userCount: users.length,
        method: "client-only",
        warning: "Server storage unavailable, using client storage",
      })
    }
  } catch (error) {
    console.error("[v0] Error in POST request:", error)

    // Return a proper JSON error response
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process request",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
