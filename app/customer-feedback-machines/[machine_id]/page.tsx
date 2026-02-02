// app/customer-feedback-machines/[machine_id]/page.tsx
"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MachineDetails } from '@/components/customer/machines/MachineDetails';
import { ServiceList } from '@/components/customer/services/ServiceList';
import { JobList } from '@/components/customer/jobs/JobList';

export default function MachinePage() {
  const params = useParams();
  const machineId = params.machine_id as string;

  useEffect(() => {
    console.log("Machine ID in browser:", machineId);
  }, [machineId]);

  return (
    <div className="container mx-auto px-4 py-8">
      <MachineDetails machineId={machineId} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Services Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Services</h2>
          <ServiceList machineId={machineId} />
        </div>

        {/* Jobs Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Jobs</h2>
          <JobList machineId={machineId} />
        </div>
      </div>
    </div>
  );
}