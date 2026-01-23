import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Calendar, ChevronRight } from "lucide-react"
import { useApiConfig } from "@/hooks/apiconfig"
import { useEffect } from "react"

interface Job {
  id: string
  jobId: string
  date: string
  location: string
  description?: string
  customerName?: string
  daysLeft?: number
  status: string
  note?: string
  expected_visit_no?: string
  customer_agreement?: string
  machineRefNo?: string
}

interface JobCardProps {
  job: Job
  onClick: () => void
  variant?: "service" | "breakdown"
}

export function JobCard({ job, onClick, variant = "service" }: JobCardProps) {
  // console.log("Rendering JobCard for job:", job.jobId, "with variant:", variant ,"__________ ",job);
  const { getPreviousServiceLists } = useApiConfig()
  const isBreakdown = variant === "breakdown"

 

  const fetchPreviousServices = async () => {
    try {
      const previousServices = await getPreviousServiceLists(job.machineRefNo || "")  
      console.log("Previous Services for job", job.jobId, ":", previousServices)
    } catch (error) {
      console.error("Error fetching previous services:", error)
    }
  }

  return (
    <Card
      className="bg-white border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow transition-all cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-3">
        {/* Header Row */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm text-gray-900 mb-0.5">
              {job.jobId}
            </h3>
            <p className="text-xs text-gray-500 truncate">
              {job.customerName || job.description}
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-2">
          <MapPin className="w-3.5 h-3.5 text-gray-400" />
          <span className="truncate">{job.location}</span>
        </div>

        {/* Footer Info */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          {isBreakdown ? (
            <div className="flex items-center gap-1.5 text-xs text-gray-700">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              <span>{job.customer_agreement}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs text-gray-700">
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                <span>Visit {job.expected_visit_no}</span>
              </div>
              {job.daysLeft !== undefined && (
                <span className="text-gray-400">•</span>
              )}
              {job.daysLeft !== undefined && (
                <span>{job.daysLeft} days left</span>
              )}
            </div>
          )}
          
          <span className={`
            text-[10px] font-medium px-2 py-1 rounded
            ${isBreakdown 
              ? 'bg-red-50 text-red-600' 
              : 'bg-blue-50 text-blue-600'
            }
          `}>
            {job.status}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}