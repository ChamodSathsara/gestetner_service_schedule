"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "./sidebar"

interface ProtectedLayoutProps {
  children: React.ReactNode
}

interface User {
  username: string
  role: string
}

export function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (!storedUser) {
      router.push("/")
    } else {
      setUser(JSON.parse(storedUser))
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex h-screen bg-white">
      <Sidebar userRole={user.role} username={user.username} onCollapsedChange={setIsCollapsed} />
      <main className={`flex-1 overflow-auto transition-all duration-300 ${isCollapsed ? "md:ml-20" : "md:ml-64"}`}>
        <div className="h-full flex items-start justify-center">{children}</div>
      </main>
    </div>
  )
}
