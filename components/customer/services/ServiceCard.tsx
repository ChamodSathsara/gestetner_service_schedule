// components/services/ServiceCard.tsx
"use client";

import Link from "next/link";

interface Service {
  id: string;
  name: string;
  status: "scheduled" | "completed" | "in-progress";
  date: string;
  technician: string;
  type: string;
}

interface ServiceCardProps {
  service: Service;
  machineId: string;
}

export function ServiceCard({ service, machineId }: ServiceCardProps) {
  const statusColors = {
    scheduled: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    "in-progress": "bg-yellow-100 text-yellow-800",
  };

  return (
    <Link
      href={`/customer-feedback-machines/${machineId}/services/${service.id}`}
    >
      <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h4 className="text-lg font-semibold text-gray-900">
              {service.name}
            </h4>
            <p className="text-sm text-gray-500">{service.type}</p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[service.status]}`}
          >
            {service.status}
          </span>
        </div>

        <div className="space-y-1 text-sm text-gray-600">
          <p>
            <span className="font-medium">Date:</span> {service.date}
          </p>
          <p>
            <span className="font-medium">Technician:</span>{" "}
            {service.technician}
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
