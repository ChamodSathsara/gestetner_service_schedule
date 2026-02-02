// components/machines/MachineDetails.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface MachineDetailsProps {
  machineId: string;
}

interface MachineData {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'maintenance';
  location: string;
  lastService: string;
  model: string;
  serialNumber: string;
  installDate: string;
}

export function MachineDetails({ machineId }: MachineDetailsProps) {
  const router = useRouter();
  const [machine, setMachine] = useState<MachineData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMachine({
        id: machineId,
        name: `Feedback Terminal ${machineId.split('-')[1]}`,
        status: 'active',
        location: 'Main Building - Floor 1',
        lastService: '2024-01-15',
        model: 'FBM-2000X',
        serialNumber: 'SN-' + machineId.toUpperCase(),
        installDate: '2023-06-01',
      });
      setLoading(false);
    }, 500);
  }, [machineId]);

  if (loading) {
    return <div className="h-64 bg-gray-200 animate-pulse rounded-lg" />;
  }

  if (!machine) {
    return <div className="text-center py-8">Machine not found</div>;
  }

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    maintenance: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <button
        onClick={() => router.push('/customer-feedback-machines')}
        className="mb-4 text-blue-600 hover:underline text-sm"
      >
        ← Back to all machines
      </button>

      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{machine.name}</h1>
          <p className="text-gray-600 mt-1">ID: {machine.id}</p>
        </div>
        <span className={`px-4 py-2 rounded-full text-sm font-medium ${statusColors[machine.status]}`}>
          {machine.status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Location</h3>
          <p className="text-gray-900">{machine.location}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Model</h3>
          <p className="text-gray-900">{machine.model}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Serial Number</h3>
          <p className="text-gray-900">{machine.serialNumber}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Install Date</h3>
          <p className="text-gray-900">{machine.installDate}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Last Service</h3>
          <p className="text-gray-900">{machine.lastService}</p>
        </div>
      </div>
    </div>
  );
}