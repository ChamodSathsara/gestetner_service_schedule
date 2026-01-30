"use client"

import React, { useState, useEffect } from 'react';
import MachineList from './MachineList';
import ServiceJobView from './ServiceJobView';
import ReviewForm from './ReviewForm';
import type { Machine, ServiceOrJob, Review } from './types';

const CustomerReviewSystem: React.FC = () => {
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [selectedItem, setSelectedItem] = useState<ServiceOrJob | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch machines data
  useEffect(() => {
    fetchMachines();
  }, []);

  const fetchMachines = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with your actual API endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/Customer/machines`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setMachines(data);
      } else {
        // Fallback to mock data for development
        setMachines(getMockMachines());
      }
    } catch (error) {
      console.error('Error fetching machines:', error);
      // Fallback to mock data
      setMachines(getMockMachines());
    } finally {
      setIsLoading(false);
    }
  };

  const handleMachineSelect = (machine: Machine) => {
    setSelectedMachine(machine);
    setSelectedItem(null);
  };

  const handleItemSelect = (item: ServiceOrJob) => {
    setSelectedItem(item);
  };

  const handleBackToMachines = () => {
    setSelectedMachine(null);
    setSelectedItem(null);
  };

  const handleBackToList = () => {
    setSelectedItem(null);
  };

  const handleSubmitReview = async (reviewData: { rating: number; message: string }) => {
    if (!selectedItem) return;

    try {
      const newReview: Review = {
        id: Date.now().toString(),
        itemId: selectedItem.id,
        itemType: selectedMachine?.services.includes(selectedItem) ? 'service' : 'job',
        rating: reviewData.rating,
        message: reviewData.message,
        createdAt: new Date().toISOString(),
      };

      // TODO: Replace with your actual API endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/Customer/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newReview),
      });

      if (response.ok) {
        setReviews([...reviews, newReview]);
        setSelectedItem(null);
        return true;
      } else {
        throw new Error('Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      return false;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your machines...</p>
        </div>
      </div>
    );
  }

  // Review Form View
  if (selectedItem && selectedMachine) {
    return (
      <ReviewForm
        item={selectedItem}
        machine={selectedMachine}
        onBack={handleBackToList}
        onSubmit={handleSubmitReview}
        existingReviews={reviews}
      />
    );
  }

  // Service/Job List View
  if (selectedMachine) {
    return (
      <ServiceJobView
        machine={selectedMachine}
        onBack={handleBackToMachines}
        onItemSelect={handleItemSelect}
        reviews={reviews}
      />
    );
  }

  // Machine List View (Default)
  return (
    <MachineList
      machines={machines}
      onMachineSelect={handleMachineSelect}
    />
  );
};

// Mock data for development/testing
const getMockMachines = (): Machine[] => {
  return [
    {
      id: '1',
      machineNumber: 'MCH-001',
      machineName: 'CNC Machine A',
      model: 'Model X-2000',
      services: [
        {
          id: 's1',
          jobId: 'SRV-001',
          date: '2024-01-15',
          location: 'Building A - Floor 2',
          description: 'Regular maintenance and inspection',
          customerName: 'John Doe',
          status: 'Completed',
          machineRefNo: 'MCH-001',
          technician_name: 'Mike Smith'
        },
        {
          id: 's2',
          jobId: 'SRV-002',
          date: '2024-01-20',
          location: 'Building A - Floor 2',
          description: 'Oil change and calibration',
          customerName: 'John Doe',
          status: 'Completed',
          machineRefNo: 'MCH-001',
          technician_name: 'Sarah Johnson'
        }
      ],
      jobs: [
        {
          id: 'j1',
          jobId: 'JOB-001',
          date: '2024-01-10',
          location: 'Building A - Floor 2',
          description: 'Belt replacement and motor check',
          customerName: 'John Doe',
          status: 'In Progress',
          note: 'Waiting for replacement parts',
          machineRefNo: 'MCH-001',
          technician_name: 'Mike Smith'
        }
      ]
    },
    {
      id: '2',
      machineNumber: 'MCH-002',
      machineName: 'Lathe Machine B',
      model: 'Model L-500',
      services: [
        {
          id: 's3',
          jobId: 'SRV-003',
          date: '2024-01-18',
          location: 'Building B - Floor 1',
          description: 'Precision calibration service',
          customerName: 'John Doe',
          status: 'Completed',
          machineRefNo: 'MCH-002',
          technician_name: 'Tom Wilson'
        }
      ],
      jobs: [
        {
          id: 'j2',
          jobId: 'JOB-002',
          date: '2024-01-22',
          location: 'Building B - Floor 1',
          description: 'Chuck replacement',
          customerName: 'John Doe',
          status: 'Pending',
          machineRefNo: 'MCH-002',
          technician_name: 'Tom Wilson'
        }
      ]
    },
    {
      id: '3',
      machineNumber: 'MCH-003',
      machineName: 'Milling Machine C',
      model: 'Model M-300',
      services: [],
      jobs: [
        {
          id: 'j3',
          jobId: 'JOB-003',
          date: '2024-01-25',
          location: 'Building C - Floor 3',
          description: 'Spindle bearing replacement',
          customerName: 'John Doe',
          status: 'Completed',
          machineRefNo: 'MCH-003',
          technician_name: 'David Lee'
        }
      ]
    }
  ];
};

export default CustomerReviewSystem;