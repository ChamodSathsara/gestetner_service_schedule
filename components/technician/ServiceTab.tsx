import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

interface Job {
  id: string
  jobId: string
  date: string
  location: string
  description?: string
  customerName?: string
  daysLeft: number
  status: string
  note?: string
}

interface ServiceTabProps {
  services: Job[]
  onJobClick: (job: Job) => void
}

export function ServiceTab({ services, onJobClick }: ServiceTabProps) {
  return (
    <div className="space-y-3">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-900">Service Schedule</h2>
        <p className="text-sm text-gray-500">{services.length} scheduled maintenance jobs</p>
      </div>
      {services.map((job) => (
        <Card
          key={job.id}
          className="bg-white border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-all cursor-pointer"
          onClick={() => onJobClick(job)}
        >
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <p className="font-bold text-base md:text-lg text-gray-900">{job.jobId}</p>
                <p className="text-sm text-gray-500 mt-1">{job.customerName}</p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded bg-blue-100 text-blue-700 ml-2">
                {job.daysLeft}d
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{job.location}</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="text-sm text-gray-500">Scheduled service</div>
              <Button size="sm" variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}