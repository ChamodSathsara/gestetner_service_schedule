"use client"

import React, { useState } from 'react';
import { ChevronRight, Calendar, MapPin, User, Wrench, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Machine, ServiceOrJob, Review, TabType } from './types';

interface ServiceJobViewProps {
  machine: Machine;
  onBack: () => void;
  onItemSelect: (item: ServiceOrJob) => void;
  reviews: Review[];
}

const ServiceJobView: React.FC<ServiceJobViewProps> = ({
  machine,
  onBack,
  onItemSelect,
  reviews,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('services');

  const items = activeTab === 'services' ? machine.services : machine.jobs;

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('completed')) return 'bg-green-100 text-green-800';
    if (statusLower.includes('progress')) return 'bg-blue-100 text-blue-800';
    if (statusLower.includes('pending')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-100 to-blue-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-400 to-sky-500 text-white p-6 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-blue-100 hover:text-white hover:bg-white/10 mb-4 -ml-2"
          >
            <ChevronRight className="w-5 h-5 rotate-180 mr-1" />
            Back to Machines
          </Button>
          <h1 className="text-3xl font-bold mb-2">{machine.machineNumber}</h1>
          <p className="text-blue-100">{machine.machineName}</p>
          {machine.model && (
            <p className="text-blue-200 text-sm mt-1">Model: {machine.model}</p>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex">
            <button
              onClick={() => setActiveTab('services')}
              className={`flex-1 py-4 px-6 font-semibold transition-all border-b-2 ${
                activeTab === 'services'
                  ? 'border-blue-500 text-blue-600 bg-blue-50/50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                Services
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 text-xs font-bold">
                  {machine.services.length}
                </span>
              </span>
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className={`flex-1 py-4 px-6 font-semibold transition-all border-b-2 ${
                activeTab === 'jobs'
                  ? 'border-blue-500 text-blue-600 bg-blue-50/50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                Jobs
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 text-xs font-bold">
                  {machine.jobs.length}
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Items List */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {items.length === 0 ? (
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-12 text-center">
              <Wrench className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No {activeTab} available
              </h3>
              <p className="text-gray-500">
                There are no {activeTab} recorded for this machine yet.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {items.map((item) => {
              const existingReview = reviews.find((r) => r.itemId === item.id);

              return (
                <Card
                  key={item.id}
                  onClick={() => onItemSelect(item)}
                  className="cursor-pointer bg-white/95 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group"
                >
                  <CardContent className="p-5">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <h3 className="text-lg font-bold text-gray-800">
                            {item.jobId}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                              item.status
                            )}`}
                          >
                            {item.status}
                          </span>
                        </div>
                        {item.description && (
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {item.description}
                          </p>
                        )}
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>

                    {/* Details */}
                    <div className="space-y-2.5 text-sm mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        <span>{formatDate(item.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        <span className="line-clamp-1">{item.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <User className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        <span>Technician: {item.technician_name}</span>
                      </div>
                    </div>

                    {/* Note */}
                    {item.note && (
                      <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-xs font-semibold text-yellow-800 mb-1">
                          Note:
                        </p>
                        <p className="text-sm text-yellow-700">{item.note}</p>
                      </div>
                    )}

                    {/* Review Status */}
                    {existingReview ? (
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= existingReview.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-green-600 font-semibold">
                            ✓ Reviewed
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="pt-4 border-t border-gray-200">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-blue-300 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            onItemSelect(item);
                          }}
                        >
                          <Star className="w-4 h-4 mr-2" />
                          Add Review
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceJobView;