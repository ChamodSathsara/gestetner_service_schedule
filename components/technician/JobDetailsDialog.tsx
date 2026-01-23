import { use, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Phone, CheckCircle2 } from "lucide-react"
import { useApiConfig } from "@/hooks/apiconfig"
import { useAuth } from "@/context/AuthContext"
import { toast } from "sonner"

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
  customer_agreement?: string
  machineRefNo?: string
  serialNo?: string
  expected_visit_no?: number
}

interface JobDetailsDialogProps {
  job: Job | null
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
  onInProgress: () => void
  varient: "service" | "breakdown"
}

export function JobDetailsDialog({ job, isOpen, onClose, onComplete, onInProgress, varient }: JobDetailsDialogProps) {
  const [jobNote, setJobNote] = useState("")
  const [solution, setSolution] = useState("")
  const [activeTab, setActiveTab] = useState("start")
  const [lastVisit] = useState("2024-01-12 by John Silva")
  const [isLoading, setIsLoading] = useState(false)
  console.log(job, "__________ JobDetailsDialog Rendered");

  const { updateBreakdownStatus, updateServiceVisitStatus ,getPreviousServiceLists } = useApiConfig()
  const { user } = useAuth()

  if (!job) return null

  const handleStarted = async () => {
    if (!user?.tecH_CODE) {
      toast.error("User information not available")
      return
    }

  

    setIsLoading(true)
    try {
      if (varient === "breakdown") {
        console.log("Starting breakdown job with note:", jobNote)
        // Breakdown API call
        const breackdownUpdate = await updateBreakdownStatus({
          techCode: user.tecH_CODE,
          jobId: parseInt(job.jobId),
          machineRefNo: job.machineRefNo || "",
          serialNo: job.serialNo || "",
          jobStatus: "started",
          note: jobNote || ""
        })
        console.log("Breakdown update response:", breackdownUpdate)
      } else {
        // Service API call
        const updateServiceresponse = await updateServiceVisitStatus({
          techCode: user.tecH_CODE,
          visitNo: parseInt(job.jobId),
          machineRefNo: job.machineRefNo || "",
          jobStatus: "started"
        })

        console.log("Service visit update response:", updateServiceresponse)
      }

      toast.success("Job started successfully")
      onInProgress()
      setJobNote("")
      setActiveTab("complete")
    } catch (error) {
      console.error("Error starting job:", error)
      toast.error("Failed to start job. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  
  
  const fetchPreviousServices = async () => {
    try {
      const previousServices = await getPreviousServiceLists(job.machineRefNo || "")  
      console.log("Previous Services for job", job.jobId, ":", previousServices)
    } catch (error) {
      console.error("Error fetching previous services:", error)
    }
  }

  const handleCompleted = async () => {
    if (!user?.tecH_CODE) {
      toast.error("User information not available")
      return
    }

    setIsLoading(true)
    try {
      if (varient === "breakdown") {
        // Breakdown API call
        await updateBreakdownStatus({
          techCode: user.tecH_CODE,
          jobId: parseInt(job.jobId),
          machineRefNo: job.machineRefNo || "",
          serialNo: job.serialNo || "",
          jobStatus: "complete",
          note: solution || ""
        })
      } else {
        // Service API call
        await updateServiceVisitStatus({
          techCode: user.tecH_CODE,
          visitNo: parseInt(job.jobId),
          machineRefNo: job.machineRefNo || "",
          jobStatus: "complete"
        })
      }

      toast.success("Job completed successfully")
      onComplete()
      setSolution("")
      setJobNote("")
      setActiveTab("start")
      onClose()
    } catch (error) {
      console.error("Error completing job:", error)
      toast.error("Failed to complete job. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setJobNote("")
    setSolution("")
    setActiveTab("start")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-white border-gray-200 max-h-[90vh] overflow-y-auto max-w-[45vh]">
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
              {varient === "service" && (
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Time Left
                  </p>
                  <p className="font-bold text-red-600 mt-1">
                    {job.daysLeft}
                  </p>
                </div>
              )}

              {varient === "breakdown" && (
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Agreement
                  </p>
                  <p className="font-bold text-red-600 mt-1">
                    {job.customer_agreement}
                  </p>
                </div>
              )}
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

          {/* Tabs Section */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="start">Start Job</TabsTrigger>
              <TabsTrigger value="complete" disabled={job.status === "pending"}>Complete Job</TabsTrigger>
            </TabsList>

            <TabsContent value="start" className="space-y-4 mt-4">
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
                  disabled={isLoading}
                />
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 h-11 font-semibold"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleStarted}
                  className="bg-blue-600 hover:bg-blue-700 text-white h-11 font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? "Starting..." : "Started"}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="complete" className="space-y-4 mt-4">
              {/* Solution */}
              <div>
                <label className="text-sm font-semibold text-gray-900 block mb-2">Solution</label>
                <textarea
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                  placeholder="Enter the solution or work completed..."
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={4}
                  disabled={isLoading}
                />
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 h-11 font-semibold"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCompleted}
                  className="bg-green-600 hover:bg-green-700 text-white h-11 font-semibold"
                  disabled={isLoading}
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  {isLoading ? "Completing..." : "Completed"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}