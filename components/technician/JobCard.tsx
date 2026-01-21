import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Clock } from "lucide-react"

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
}

interface JobCardProps {
  job: Job
  onClick: () => void
  variant?: "service" | "breakdown"
}

export function JobCard({ job, onClick, variant = "service" }: JobCardProps) {
  return (
    <Card
      className="bg-white border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-all cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-3 md:p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <p className="font-bold text-sm md:text-base text-gray-900">{job.jobId}</p>
            <p className="text-xs text-gray-500 mt-0.5">
              {job.customerName || job.description}
            </p>
          </div>
          <span className="text-[10px] md:text-xs font-bold px-2 py-1 rounded bg-blue-100 text-blue-700 ml-2 whitespace-nowrap">
            {variant === "breakdown" ? job.status.toUpperCase() : job.status.toUpperCase()}
          </span>
         {variant === "service" && (
           <span className="text-[10px] md:text-xs font-bold px-2 py-1 rounded bg-blue-100 text-blue-700 ml-2 whitespace-nowrap">
            {job.daysLeft} Days Left
          </span>
         )}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{job.location}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            {variant === "breakdown" ? (
              <span className="font-bold text-blue-600 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {job.customer_agreement}
              </span>
            ) : (
              <span className="font-bold text-blue-600 flex items-center gap-1">
                Visit No : {job.expected_visit_no}
                
              </span>
              
            )}

          </div>
          <Button size="sm" className="h-7 text-xs bg-blue-600 hover:bg-blue-700">
            Start
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}