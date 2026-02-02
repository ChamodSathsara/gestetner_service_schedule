// components/machines/MachineCard.tsx
"use client";

import Link from 'next/link';

interface Machine {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'maintenance';
  location: string;
  lastService: string;
}

interface MachineCardProps {
  machine: Machine;
}

export function MachineCard({ machine }: MachineCardProps) {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    maintenance: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <Link href={`/customer-feedback-machines/${machine.id}`}>
      <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{machine.name}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[machine.status]}`}>
            {machine.status}
          </span>
        </div>
        
        <div className="space-y-2 text-sm text-gray-600">
          <p>
            <span className="font-medium">Location:</span> {machine.location}
          </p>
          <p>
            <span className="font-medium">Last Service:</span> {machine.lastService}
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <span className="text-blue-600 text-sm font-medium hover:underline">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}