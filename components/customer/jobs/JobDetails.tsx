// components/jobs/JobDetails.tsx
"use client";

import { useState, useEffect } from 'react';

interface JobDetailsProps {
  machineId: string;
  jobId: string;
}

interface JobData {
  id: string;
  title: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  priority: 'low' | 'medium' | 'high';
  createdDate: string;
  completedDate?: string;
  assignedTo: string;
  description: string;
  steps: string[];
  notes: string;
  estimatedTime: string;
}

export function JobDetails({ machineId, jobId }: JobDetailsProps) {
  const [job, setJob] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setJob({
        id: jobId,
        title: 'Calibration Check',
        status: 'completed',
        priority: 'medium',
        createdDate: '2024-01-10',
        completedDate: '2024-01-12',
        assignedTo: 'Technical Team A',
        description: 'Perform full calibration check on feedback terminal sensors and display.',
        steps: [
          'Power cycle the machine',
          'Run calibration diagnostic',
          'Adjust sensor sensitivity',
          'Test display accuracy',
          'Document results',
        ],
        notes: 'Calibration completed successfully. All sensors within acceptable tolerance. Display accuracy verified at 99.8%.',
        estimatedTime: '1.5 hours',
      });
      setLoading(false);
    }, 500);
  }, [machineId, jobId]);

  if (loading) {
    return <div className="h-96 bg-gray-200 animate-pulse rounded-lg" />;
  }

  if (!job) {
    return <div className="text-center py-8">Job not found</div>;
  }

  const statusColors = {
    pending: 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
  };

  const priorityColors = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
          <p className="text-gray-600 mt-1">Job ID: {job.id}</p>
        </div>
        <div className="flex gap-2">
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${priorityColors[job.priority]}`}>
            {job.priority} priority
          </span>
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${statusColors[job.status]}`}>
            {job.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Assigned To</h3>
          <p className="text-gray-900">{job.assignedTo}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Estimated Time</h3>
          <p className="text-gray-900">{job.estimatedTime}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Created Date</h3>
          <p className="text-gray-900">{job.createdDate}</p>
        </div>
        {job.completedDate && (
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Completed Date</h3>
            <p className="text-gray-900">{job.completedDate}</p>
          </div>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
        <p className="text-gray-900 bg-gray-50 p-4 rounded">{job.description}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Steps</h3>
        <ol className="list-decimal list-inside space-y-2">
          {job.steps.map((step, index) => (
            <li key={index} className="text-gray-900 bg-gray-50 p-3 rounded">
              {step}
            </li>
          ))}
        </ol>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-2">Notes</h3>
        <p className="text-gray-900 bg-gray-50 p-4 rounded">{job.notes}</p>
      </div>
    </div>
  );
}