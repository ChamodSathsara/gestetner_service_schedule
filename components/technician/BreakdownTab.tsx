
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
  // daysLeft: number
  status: string
  note?: string
  customer_agreement?: string
}

interface BreakdownTabProps {
  breakdowns: Job[]
  onJobClick: (job: Job) => void
}

export function BreakdownTab({ breakdowns, onJobClick }: BreakdownTabProps) {
  return (
    <div className="space-y-3">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-900">Emergency Breakdowns</h2>
        <p className="text-sm text-gray-500">{breakdowns.length} jobs require immediate attention</p>
      </div>
      {breakdowns.map((job) => (
        <Card
          key={job.id}
          className="bg-white border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-all cursor-pointer"
          onClick={() => onJobClick(job)}
        >
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <p className="font-bold text-base md:text-lg text-gray-900">{job.jobId}</p>
                <p className="text-sm text-gray-500 mt-1">{job.description}</p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded bg-blue-100 text-blue-700 ml-2">
                {job.status.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{job.location}</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="text-sm font-bold text-blue-600 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {job.customer_agreement} 
              </div>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
