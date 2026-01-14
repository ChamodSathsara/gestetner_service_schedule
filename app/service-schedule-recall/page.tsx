"use client"

import { ProtectedLayout } from "@/components/protected-layout"
import { ServiceScheduleRecallContent } from "@/components/service-schedule-recall-content"

export default function ServiceScheduleRecallPage() {
  return (
    <ProtectedLayout>
      <ServiceScheduleRecallContent />
    </ProtectedLayout>
  )
}
