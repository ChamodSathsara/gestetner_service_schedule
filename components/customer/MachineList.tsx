"use client"

import React from 'react';
import { ChevronRight, Wrench, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { Machine } from './types';

interface MachineListProps {
  machines: Machine[];
  onMachineSelect: (machine: Machine) => void;
}

const MachineList: React.FC<MachineListProps> = ({ machines, onMachineSelect }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-100 to-blue-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-400 to-sky-500 text-white p-6 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">My Machines</h1>
          <p className="text-blue-100">Select a machine to view and review services</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {machines.length === 0 ? (
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-12 text-center">
              <Wrench className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Machines Found</h3>
              <p className="text-gray-500">You don't have any machines registered yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {machines.map((machine) => (
              <Card
                key={machine.id}
                onClick={() => onMachineSelect(machine)}
                className="cursor-pointer bg-white/95 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                {/* Machine Header */}
                <div className="bg-gradient-to-r from-blue-400 to-sky-500 p-5">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">
                        {machine.machineNumber}
                      </h3>
                      <p className="text-blue-50 text-sm font-medium">
                        {machine.machineName}
                      </p>
                    </div>
                    <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Machine Details */}
                <CardContent className="p-5">
                  {machine.model && (
                    <div className="mb-4 pb-4 border-b border-gray-100">
                      <p className="text-sm text-gray-500 mb-1">Model</p>
                      <p className="text-gray-700 font-semibold">{machine.model}</p>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2 text-sm flex-1">
                      <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Services</p>
                        <p className="text-gray-800 font-bold text-lg">{machine.services.length}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm flex-1">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                        <Wrench className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Jobs</p>
                        <p className="text-gray-800 font-bold text-lg">{machine.jobs.length}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MachineList;