import { Card, CardContent } from "@/components/ui/card";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Calendar,
} from "lucide-react";
import { JobCard } from "./JobCard";
import { useState } from "react";

interface Job {
  id: string;
  jobId: string;
  date: string;
  location: string;
  description?: string;
  customerName?: string;
  status: string;
  note?: string;
  customer_agreement?: string;
  phone_number?: number;
}

interface BreakdownTabProps {
  dueJobs: Job[];
  breakdowns: Job[];
  onJobClick: (job: Job) => void;
}

export function BreakdownTab({
  dueJobs,
  breakdowns,
  onJobClick,
}: BreakdownTabProps) {
  const [todayExpanded, setTodayExpanded] = useState(true);
  const [dueExpanded, setDueExpanded] = useState(true);

  return (
    <div className="space-y-3">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-3 md:p-4 shadow-md">
        <div className="flex items-center gap-2 mb-1">
          <AlertTriangle className="w-5 h-5 text-white" />
          <h2 className="text-sm md:text-base font-bold text-white">
            Emergency Breakdowns
          </h2>
        </div>
        <p className="text-xs md:text-sm text-red-100 ml-7">
          {breakdowns.length + dueJobs.length}{" "}
          {breakdowns.length + dueJobs.length === 1
            ? "job requires"
            : "jobs require"}{" "}
          immediate attention
        </p>
      </div>

      {/* Today Jobs Section */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => setTodayExpanded(!todayExpanded)}
          className="w-full bg-gradient-to-r from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-150 p-3 md:p-4 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-600" />
              <h3 className="text-sm md:text-base font-bold text-orange-900">
                Today's Jobs
              </h3>
              <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {breakdowns.length}
              </span>
            </div>
            {todayExpanded ? (
              <ChevronUp className="w-5 h-5 text-orange-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-orange-600" />
            )}
          </div>
        </button>

        {todayExpanded && (
          <div className="p-3 space-y-2 bg-white">
            {breakdowns.length > 0 ? (
              breakdowns.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onClick={() => onJobClick(job)}
                  variant="breakdown"
                />
              ))
            ) : (
              <Card className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200">
                <CardContent className="p-4 text-center">
                  <CheckCircle2 className="w-10 h-10 mx-auto mb-2 text-green-500" />
                  <p className="text-sm text-green-700 font-bold">
                    No Jobs Today
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    All clear for today
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>

      {/* Due Jobs Section */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => setDueExpanded(!dueExpanded)}
          className="w-full bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-150 p-3 md:p-4 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-red-600" />
              <h3 className="text-sm md:text-base font-bold text-red-900">
                Due Jobs
              </h3>
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {dueJobs.length}
              </span>
            </div>
            {dueExpanded ? (
              <ChevronUp className="w-5 h-5 text-red-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-red-600" />
            )}
          </div>
        </button>

        {dueExpanded && (
          <div className="p-3 space-y-2 bg-white">
            {dueJobs.length > 0 ? (
              dueJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onClick={() => onJobClick(job)}
                  variant="breakdown"
                />
              ))
            ) : (
              <Card className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200">
                <CardContent className="p-4 text-center">
                  <CheckCircle2 className="w-10 h-10 mx-auto mb-2 text-green-500" />
                  <p className="text-sm text-green-700 font-bold">
                    No Due Jobs
                  </p>
                  <p className="text-xs text-green-600 mt-1">All caught up!</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
