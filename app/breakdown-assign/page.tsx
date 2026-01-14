"use client"

import { ProtectedLayout } from "@/components/protected-layout"
import { BreakdownAssignContent } from "@/components/breakdown-assign-content"

export default function BreakdownAssignPage() {
  return (
    <ProtectedLayout>
      <BreakdownAssignContent />
    </ProtectedLayout>
  )
}
