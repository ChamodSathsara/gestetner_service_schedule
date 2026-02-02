// app/customer-feedback-machines/[machine_id]/services/[service_id]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ServiceDetails } from "@/components/customer/services/ServiceDetails";

export default function MachineServicePage() {
  const params = useParams();
  const router = useRouter();
  const machineId = params.machine_id as string;
  const serviceId = params.service_id as string;

  useEffect(() => {
    console.log("Machine ID:", machineId);
    console.log("Service ID:", serviceId);
  }, [machineId, serviceId]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm">
        <ol className="flex items-center space-x-2">
          <li>
            <button
              onClick={() => router.push("/customer-feedback-machines")}
              className="text-blue-600 hover:underline"
            >
              Machines
            </button>
          </li>
          <li>/</li>
          <li>
            <button
              onClick={() =>
                router.push(`/customer-feedback-machines/${machineId}`)
              }
              className="text-blue-600 hover:underline"
            >
              Machine {machineId}
            </button>
          </li>
          <li>/</li>
          <li className="text-gray-600">Service {serviceId}</li>
        </ol>
      </nav>

      <ServiceDetails machineId={machineId} serviceId={serviceId} />
    </div>
  );
}
