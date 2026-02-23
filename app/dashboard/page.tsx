"use client"

import { ProtectedLayout } from "@/components/protected-layout"
import { DashboardContent } from "@/components/manager/dashboard-content"

export default function DashboardPage() {
  return (
    <ProtectedLayout>
      <DashboardContent />
    </ProtectedLayout>
  )
}
