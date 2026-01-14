"use client"

import { ProtectedLayout } from "@/components/protected-layout"
import { ReportsContent } from "@/components/reports-content"

export default function ReportsPage() {
  return (
    <ProtectedLayout>
      <ReportsContent />
    </ProtectedLayout>
  )
}
