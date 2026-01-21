
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, CheckCircle2 } from "lucide-react"

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

interface JobDetailsDialogProps {
  job: Job | null
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
  onInProgress: () => void
}

export function JobDetailsDialog({ job, isOpen, onClose, onComplete, onInProgress }: JobDetailsDialogProps) {
  const [jobNote, setJobNote] = useState("")
  const [lastVisit] = useState("2024-01-12 by John Silva")

  if (!job) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-white border-gray-200 max-h-[90vh] overflow-y-auto max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">Job Details</DialogTitle>
          <DialogDescription className="text-gray-500">Review and update job information</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Job Info */}
          <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg space-y-3 border border-gray-200">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Job ID</p>
              <p className="font-bold text-lg text-gray-900 mt-1">{job.jobId}</p>
            </div>
            {job.description && (
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Description</p>
                <p className="text-sm text-gray-700 mt-1">{job.description}</p>
              </div>
            )}
            {job.customerName && (
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Customer</p>
                <p className="text-sm text-gray-700 mt-1">{job.customerName}</p>
              </div>
            )}
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Location</p>
              <p className="font-medium flex items-center gap-2 text-gray-900 mt-1">
                <MapPin className="w-4 h-4 text-blue-600" />
                {job.location}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Status</p>
                <p className="font-bold capitalize text-gray-900 mt-1">{job.status}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Time Left</p>
                <p className="font-bold text-red-600 mt-1">{job.customer_agreement}d</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 h-11">
              <Phone className="w-4 h-4 mr-2" />
              Call
            </Button>
            <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50 h-11">
              <MapPin className="w-4 h-4 mr-2" />
              Navigate
            </Button>
          </div>

          {/* Last Visit */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-2 text-sm">Last Visit</h4>
            <div className="p-3 border border-gray-200 rounded-lg bg-gray-50">
              <p className="text-sm text-gray-700">{lastVisit}</p>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-sm font-semibold text-gray-900 block mb-2">Add Work Note</label>
            <textarea
              value={jobNote}
              onChange={(e) => setJobNote(e.target.value)}
              placeholder="Enter work notes, observations, or updates..."
              className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
            />
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Button
              onClick={() => {
                onInProgress()
                setJobNote("")
              }}
              variant="outline"
              className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 h-11 font-semibold"
            >
              In Progress
            </Button>
            <Button
              onClick={() => {
                onComplete()
                setJobNote("")
              }}
              className="bg-green-600 hover:bg-green-700 text-white h-11 font-semibold"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Complete
            </Button>
          </div>

          <Button onClick={onClose} variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 h-11 mt-2">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
