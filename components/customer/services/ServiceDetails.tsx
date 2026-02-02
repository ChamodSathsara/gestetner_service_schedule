// components/services/ServiceDetails.tsx
"use client";

import { useState, useEffect } from 'react';

interface ServiceDetailsProps {
  machineId: string;
  serviceId: string;
}

interface ServiceData {
  id: string;
  name: string;
  status: 'scheduled' | 'completed' | 'in-progress';
  date: string;
  technician: string;
  type: string;
  duration: string;
  notes: string;
  partsUsed: string[];
  cost: string;
}

export function ServiceDetails({ machineId, serviceId }: ServiceDetailsProps) {
  const [service, setService] = useState<ServiceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setService({
        id: serviceId,
        name: 'Routine Maintenance',
        status: 'completed',
        date: '2024-01-15',
        technician: 'John Smith',
        type: 'Preventive',
        duration: '2 hours',
        notes: 'Performed regular maintenance checks. All systems functioning properly. Replaced air filter and cleaned sensors.',
        partsUsed: ['Air Filter (AF-200)', 'Cleaning Solution', 'Sensor Wipes'],
        cost: '$250.00',
      });
      setLoading(false);
    }, 500);
  }, [machineId, serviceId]);

  if (loading) {
    return <div className="h-96 bg-gray-200 animate-pulse rounded-lg" />;
  }

  if (!service) {
    return <div className="text-center py-8">Service not found</div>;
  }

  const statusColors = {
    scheduled: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{service.name}</h1>
          <p className="text-gray-600 mt-1">Service ID: {service.id}</p>
        </div>
        <span className={`px-4 py-2 rounded-full text-sm font-medium ${statusColors[service.status]}`}>
          {service.status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Type</h3>
          <p className="text-gray-900">{service.type}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Date</h3>
          <p className="text-gray-900">{service.date}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Technician</h3>
          <p className="text-gray-900">{service.technician}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Duration</h3>
          <p className="text-gray-900">{service.duration}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Cost</h3>
          <p className="text-gray-900">{service.cost}</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Service Notes</h3>
        <p className="text-gray-900 bg-gray-50 p-4 rounded">{service.notes}</p>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-2">Parts Used</h3>
        <ul className="list-disc list-inside space-y-1">
          {service.partsUsed.map((part, index) => (
            <li key={index} className="text-gray-900">{part}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}