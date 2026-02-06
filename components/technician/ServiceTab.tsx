import { Card, CardContent } from "@/components/ui/card";
import { Calendar, CheckCircle2 } from "lucide-react";
import { JobCard } from "./JobCard";

interface Job {
  id: string;
  jobId: string;
  date: string;
  location: string;
  description?: string;
  customerName?: string;
  daysLeft: number;
  status: string;
  note?: string;
}

interface ServiceTabProps {
  services: Job[];
  onJobClick: (job: Job) => void;
}

export function ServiceTab({ services, onJobClick }: ServiceTabProps) {
  return (
    <div className="space-y-3">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-3 md:p-4 shadow-md">
        <div className="flex items-center gap-2 mb-1">
          <Calendar className="w-5 h-5 text-white" />
          <h2 className="text-sm md:text-base font-bold text-white">
            Service Schedule
          </h2>
        </div>
        <p className="text-xs md:text-sm text-blue-100 ml-7">
          {services.length} scheduled maintenance{" "}
          {services.length === 1 ? "job" : "jobs"}
        </p>
      </div>

      {/* Service Cards */}
      {services.length > 0 ? (
        <div className="space-y-2">
          {services.map((job, index) => (
            <JobCard
              key={index}
              job={job}
              onClick={() => onJobClick(job)}
              variant="service"
            />
          ))}
        </div>
      ) : (
        <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200">
          <CardContent className="p-6 md:p-8 text-center">
            <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p className="text-sm text-gray-700 font-bold">
              No Scheduled Services
            </p>
            <p className="text-xs text-gray-600 mt-1">
              All maintenance up to date
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
