export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
  createdAt: string
  investments: Investment[]
}

export interface Investment {
  id: string
  planName: string
  amount: number
  currency: string
  status: "pending" | "active" | "completed"
  createdAt: string
  expectedReturns: string
  duration: string
}

export interface AuthResult {
  success: boolean
  user?: User
  error?: string
}

// File-based storage functions
export async function saveUserData(users: User[]): Promise<void> {
  try {
    console.log("[v0] Attempting to save users:", users.length)

    // Save to localStorage as primary storage
    if (typeof window !== "undefined") {
      localStorage.setItem("userData", JSON.stringify(users))
      console.log("[v0] Successfully saved to localStorage")
    }

    // Also try to save to server as backup
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ users }),
      })

      if (response.ok) {
        const responseData = await response.json()
        console.log("[v0] Server save successful:", responseData)
      } else {
        // Don't throw error if server save fails, localStorage is primary
        console.warn("[v0] Server save failed, but localStorage succeeded")
      }
    } catch (serverError) {
      console.warn("[v0] Server save failed:", serverError.message)
      // Continue - localStorage save was successful
    }

    console.log("[v0] Successfully saved user data")
  } catch (error) {
    console.error("[v0] Error saving user data:", error)
    throw error
  }
}

export async function loadUserData(): Promise<User[]> {
  try {
    console.log("[v0] Attempting to load user data")

    // Try localStorage first
    if (typeof window !== "undefined") {
      const localData = localStorage.getItem("userData")
      if (localData) {
        try {
          const users = JSON.parse(localData)
          console.log("[v0] Successfully loaded from localStorage:", users.length)

          // Ensure admin user exists
          const hasAdmin = users.some((user: User) => user.email === "superadmin@mail.com")
          if (!hasAdmin) {
            users.unshift(ADMIN_USER)
          }

          return users
        } catch (parseError) {
          console.warn("[v0] Failed to parse localStorage data:", parseError)
        }
      }
    }

    // Fallback to server
    try {
      const response = await fetch("/api/users", {
        cache: "no-store",
      })

      if (response.ok) {
        const data = await response.json()
        const users = data.users || []

        // Save to localStorage for future use
        if (typeof window !== "undefined") {
          localStorage.setItem("userData", JSON.stringify(users))
        }

        console.log("[v0] Successfully loaded from server:", users.length)
        return users
      }
    } catch (serverError) {
      console.warn("[v0] Server load failed:", serverError.message)
    }

    // Final fallback - return admin user only
    console.log("[v0] Returning admin user as fallback")
    const fallbackUsers = [ADMIN_USER]

    // Save fallback to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("userData", JSON.stringify(fallbackUsers))
    }

    return fallbackUsers
  } catch (error) {
    console.error("[v0] Error loading user data:", error)
    return [ADMIN_USER]
  }
}

const ADMIN_USER: User = {
  id: "admin-001",
  firstName: "Super",
  lastName: "Admin",
  email: "superadmin@mail.com",
  password: "Olamide1!",
  createdAt: new Date().toISOString(),
  investments: [],
}

export async function registerUser(userData: {
  firstName: string
  lastName: string
  email: string
  password: string
}): Promise<AuthResult> {
  try {
    console.log("[v0] Starting registration for:", userData.email)
    const users = await loadUserData()
    console.log("[v0] Current users count:", users.length)

    const existingUser = users.find((user) => user.email === userData.email)
    if (existingUser) {
      console.log("[v0] User already exists:", userData.email)
      return { success: false, error: "User with this email already exists" }
    }

    const newUser: User = {
      id: Date.now().toString(),
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      createdAt: new Date().toISOString(),
      investments: [],
    }

    console.log("[v0] Created new user:", newUser.id)
    users.push(newUser)

    console.log("[v0] Saving updated users list")
    await saveUserData(users)

    console.log("[v0] Registration successful for:", userData.email)
    return { success: true, user: newUser }
  } catch (error) {
    console.error("[v0] Registration error:", error)
    return { success: false, error: `Registration failed: ${error.message}` }
  }
}

export async function authenticateUser(email: string, password: string): Promise<AuthResult> {
  try {
    if (email === "superadmin@mail.com" && password === "Olamide1!") {
      return { success: true, user: ADMIN_USER }
    }

    const users = await loadUserData()

    const user = users.find((u) => u.email === email && u.password === password)

    if (!user) {
      return { success: false, error: "Invalid email or password" }
    }

    return { success: true, user }
  } catch (error) {
    console.error("[v0] Authentication error:", error)
    return { success: false, error: "Authentication failed" }
  }
}

export async function updateUserInvestments(userId: string, investment: Investment): Promise<AuthResult> {
  try {
    const users = await loadUserData()
    const userIndex = users.findIndex((u) => u.id === userId)

    if (userIndex === -1) {
      return { success: false, error: "User not found" }
    }

    users[userIndex].investments.push(investment)
    await saveUserData(users)

    return { success: true, user: users[userIndex] }
  } catch (error) {
    return { success: false, error: "Failed to update investments" }
  }
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null

  const userData = localStorage.getItem("currentUser")
  return userData ? JSON.parse(userData) : null
}

export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("currentUser")
  }
}
