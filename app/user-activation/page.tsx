"use client"

import { ProtectedLayout } from "@/components/protected-layout"
import { UserActivationContent } from "@/components/user-activation-content"

export default function UserActivationPage() {
  return (
    <ProtectedLayout>
      <UserActivationContent />
    </ProtectedLayout>
  )
}
