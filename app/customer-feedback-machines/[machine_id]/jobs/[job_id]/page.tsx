// app/customer-feedback-machines/[machine_id]/jobs/[job_id]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { JobDetails } from "@/components/customer/jobs/JobDetails";

export default function MachineJobPage() {
  const params = useParams();
  const router = useRouter();
  const machineId = params.machine_id as string;
  const jobId = params.job_id as string;

  useEffect(() => {
    console.log("Machine ID:", machineId);
    console.log("Job ID:", jobId);
  }, [machineId, jobId]);

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
          <li className="text-gray-600">Job {jobId}</li>
        </ol>
      </nav>

      <JobDetails machineId={machineId} jobId={jobId} />
    </div>
  );
}
