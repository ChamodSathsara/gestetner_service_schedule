"use client"

import { ProtectedLayout } from "@/components/protected-layout"
import { TechniciansContent } from "@/components/technicians-content"

export default function TechniciansPage() {
  return (
    <ProtectedLayout>
      <TechniciansContent />
    </ProtectedLayout>
  )
}
