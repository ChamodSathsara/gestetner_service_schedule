"use client"

import { ProtectedLayout } from "@/components/protected-layout"
import { TechnicianDashboardContent } from "@/components/technician-dashboard-content"

export default function TechnicianDashboardPage() {
  return (
    <ProtectedLayout>
      <TechnicianDashboardContent />
    </ProtectedLayout>
  )
}
