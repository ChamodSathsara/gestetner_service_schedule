// components/machines/MachineList.tsx
"use client";

import { useState, useEffect } from 'react';
import { MachineCard } from './MachineCard';

interface Machine {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'maintenance';
  location: string;
  lastService: string;
}

export function MachineList() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMachines([
        {
          id: 'machine-001',
          name: 'Feedback Terminal A1',
          status: 'active',
          location: 'Main Building - Floor 1',
          lastService: '2024-01-15',
        },
        {
          id: 'machine-002',
          name: 'Feedback Terminal B2',
          status: 'active',
          location: 'East Wing - Floor 2',
          lastService: '2024-01-20',
        },
        {
          id: 'machine-003',
          name: 'Feedback Terminal C3',
          status: 'maintenance',
          location: 'West Wing - Floor 1',
          lastService: '2024-01-10',
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 bg-gray-200 animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {machines.map((machine) => (
        <MachineCard key={machine.id} machine={machine} />
      ))}
    </div>
  );
}