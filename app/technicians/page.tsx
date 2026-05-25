"use client"

import { ProtectedLayout } from "@/components/protected-layout"
import { TechniciansContent } from "@/components/manager/technicians-content"

export default function TechniciansPage() {
  return (
    <ProtectedLayout>
      <TechniciansContent />
    </ProtectedLayout>
  )
}