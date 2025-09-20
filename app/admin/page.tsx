"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminStats } from "@/components/admin/admin-stats"
import { UsersTable } from "@/components/admin/users-table"
import { getCurrentUser, loadUserData, type User } from "@/lib/auth"
import { Loader2 } from "lucide-react"

export default function AdminPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const user = getCurrentUser()

    if (!user || user.email !== "superadmin@mail.com") {
      router.push("/login")
      return
    }

    setCurrentUser(user)
    loadUsers()
  }, [router])

  const loadUsers = async () => {
    try {
      const userData = await loadUserData()
      setUsers(userData)
    } catch (error) {
      console.error("Failed to load users:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const refreshUsers = () => {
    loadUsers()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!currentUser) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader user={currentUser} />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage users and monitor platform activity</p>
          </div>

          <AdminStats users={users} />

          <UsersTable users={users} onRefresh={refreshUsers} />
        </div>
      </main>
    </div>
  )
}
