// components/services/ServiceList.tsx
"use client";

import { useState, useEffect } from 'react';
import { ServiceCard } from './ServiceCard';

interface Service {
  id: string;
  name: string;
  status: 'scheduled' | 'completed' | 'in-progress';
  date: string;
  technician: string;
  type: string;
}

interface ServiceListProps {
  machineId: string;
}

export function ServiceList({ machineId }: ServiceListProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setServices([
        {
          id: 'service-001',
          name: 'Routine Maintenance',
          status: 'completed',
          date: '2024-01-15',
          technician: 'John Smith',
          type: 'Preventive',
        },
        {
          id: 'service-002',
          name: 'Screen Replacement',
          status: 'completed',
          date: '2024-01-20',
          technician: 'Jane Doe',
          type: 'Repair',
        },
        {
          id: 'service-003',
          name: 'Software Update',
          status: 'scheduled',
          date: '2024-02-05',
          technician: 'Mike Johnson',
          type: 'Update',
        },
      ]);
      setLoading(false);
    }, 500);
  }, [machineId]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-gray-200 animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No services found for this machine
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} machineId={machineId} />
      ))}
    </div>
  );
}