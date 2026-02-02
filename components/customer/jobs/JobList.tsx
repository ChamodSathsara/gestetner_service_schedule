// components/jobs/JobList.tsx
"use client";

import { useState, useEffect } from 'react';
import { JobCard } from './JobCard';

interface Job {
  id: string;
  title: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  priority: 'low' | 'medium' | 'high';
  createdDate: string;
  assignedTo: string;
}

interface JobListProps {
  machineId: string;
}

export function JobList({ machineId }: JobListProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setJobs([
        {
          id: 'job-001',
          title: 'Calibration Check',
          status: 'completed',
          priority: 'medium',
          createdDate: '2024-01-10',
          assignedTo: 'Technical Team A',
        },
        {
          id: 'job-002',
          title: 'Network Connectivity Issue',
          status: 'in-progress',
          priority: 'high',
          createdDate: '2024-01-22',
          assignedTo: 'IT Support',
        },
        {
          id: 'job-003',
          title: 'Button Responsiveness Test',
          status: 'pending',
          priority: 'low',
          createdDate: '2024-01-25',
          assignedTo: 'QA Team',
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

  if (jobs.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No jobs found for this machine
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} machineId={machineId} />
      ))}
    </div>
  );
}