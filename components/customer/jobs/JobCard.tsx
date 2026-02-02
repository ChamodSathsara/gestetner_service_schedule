// components/jobs/JobCard.tsx
"use client";

import Link from 'next/link';

interface Job {
  id: string;
  title: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  priority: 'low' | 'medium' | 'high';
  createdDate: string;
  assignedTo: string;
}

interface JobCardProps {
  job: Job;
  machineId: string;
}

export function JobCard({ job, machineId }: JobCardProps) {
  const statusColors = {
    pending: 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
  };

  const priorityColors = {
    low: 'text-gray-600',
    medium: 'text-yellow-600',
    high: 'text-red-600',
  };

  return (
    <Link href={`/customer-feedback-machines/${machineId}/jobs/${job.id}`}>
      <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h4 className="text-lg font-semibold text-gray-900">{job.title}</h4>
            <p className={`text-sm font-medium ${priorityColors[job.priority]}`}>
              Priority: {job.priority.toUpperCase()}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[job.status]}`}>
            {job.status}
          </span>
        </div>
        
        <div className="space-y-1 text-sm text-gray-600">
          <p>
            <span className="font-medium">Created:</span> {job.createdDate}
          </p>
          <p>
            <span className="font-medium">Assigned to:</span> {job.assignedTo}
          </p>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100">
          <span className="text-blue-600 text-sm hover:underline">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}