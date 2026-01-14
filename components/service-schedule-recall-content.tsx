"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar, MapPin, Phone, Wrench, Clock, ArrowRight, Search } from "lucide-react"
import { mockDataConfig } from "@/lib/data-config"

const { serviceScheduleRecallJobs } = mockDataConfig

export function ServiceScheduleRecallContent() {
  const [selectedJob, setSelectedJob] = useState<(typeof serviceScheduleRecallJobs)[0] | null>(null)
  const [reason, setReason] = useState("")
  const [nextDate, setNextDate] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const handleSaveRecall = () => {
    if (reason && nextDate) {
      alert(`Recall updated for ${selectedJob?.jobId}. Reason: ${reason}, Next Date: ${nextDate}`)
      setSelectedJob(null)
      setReason("")
      setNextDate("")
    }
  }

  // Filter jobs based on search term
  const filteredJobs = serviceScheduleRecallJobs.filter((job) => {
    const search = searchTerm.toLowerCase()
    return (
      job.jobId.toLowerCase().includes(search) ||
      job.customerName.toLowerCase().includes(search) ||
      job.location.toLowerCase().includes(search) ||
      job.technician.toLowerCase().includes(search)
    )
  })

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Service Schedule Recall</h1>
        <p className="text-muted-foreground">Manage and reschedule service and breakdown jobs</p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by Job ID, Customer, Location, or Technician..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 bg-card border-border shadow-sm"
          />
        </div>
        {searchTerm && (
          <p className="text-sm text-muted-foreground mt-2">
            Found {filteredJobs.length} {filteredJobs.length === 1 ? "result" : "results"}
          </p>
        )}
      </div>

      {/* Jobs Grid */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredJobs.map((job) => (
            <Card
              key={job.id}
              className="group relative bg-gradient-to-br from-card to-card/50 border-0 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => setSelectedJob(job)}
            >
              {/* Accent Line & Gradient Overlay */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 ${
                  job.type === "service"
                    ? "bg-gradient-to-r from-blue-500 to-blue-600"
                    : "bg-gradient-to-r from-red-500 to-red-600"
                }`}
              />
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${
                  job.type === "service" ? "bg-blue-500" : "bg-red-500"
                }`}
              />

              <CardHeader className="pb-4 relative">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`p-1.5 rounded-lg ${job.type === "service" ? "bg-blue-500/10" : "bg-red-500/10"}`}>
                        {job.type === "service" ? (
                          <Clock className={`w-4 h-4 ${job.type === "service" ? "text-blue-500" : "text-red-500"}`} />
                        ) : (
                          <Wrench className={`w-4 h-4 ${job.type === "service" ? "text-blue-500" : "text-red-500"}`} />
                        )}
                      </div>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          job.type === "service"
                            ? "bg-blue-500/15 text-blue-600 dark:text-blue-400"
                            : "bg-red-500/15 text-red-600 dark:text-red-400"
                        }`}
                      >
                        {job.type.toUpperCase()}
                      </span>
                    </div>
                    <CardTitle className="text-xl font-bold mt-2">{job.jobId}</CardTitle>
                    <CardDescription className="text-base mt-1">{job.customerName}</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3 relative">
                {/* Machine Reference - Prominent */}
                <div
                  className={`p-3 rounded-lg ${
                    job.type === "service"
                      ? "bg-blue-500/5 border border-blue-500/20"
                      : "bg-red-500/5 border border-red-500/20"
                  }`}
                >
                  <p className="text-xs text-muted-foreground mb-1">Machine Reference</p>
                  <p className="font-bold text-lg">{job.machineRef}</p>
                </div>

                {/* Info Grid */}
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="p-2 rounded-md bg-accent">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="text-sm font-medium">{job.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="p-2 rounded-md bg-accent">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Scheduled Date</p>
                      <p className="text-sm font-medium">{new Date(job.date).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="p-2 rounded-md bg-accent">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Technician</p>
                      <p className="text-sm font-medium">{job.technician}</p>
                    </div>
                  </div>
                </div>

                {/* Action Indicator */}
                <div className="pt-3 border-t border-border/50">
                  <div className="flex items-center justify-between text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    <span className="font-medium">Click to reschedule</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No results found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or clear the search to see all jobs.
          </p>
          <Button onClick={() => setSearchTerm("")} variant="outline" className="mt-4">
            Clear Search
          </Button>
        </div>
      )}

      {/* Recall Dialog */}
      <Dialog open={!!selectedJob} onOpenChange={(open) => !open && setSelectedJob(null)}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>Reschedule Job</DialogTitle>
            <DialogDescription>Update the recall reason and set next service date</DialogDescription>
          </DialogHeader>

          {selectedJob && (
            <div className="space-y-6">
              {/* Job Details - Read Only */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-secondary rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground">Job ID</p>
                  <p className="font-bold">{selectedJob.jobId}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Customer</p>
                  <p className="font-bold">{selectedJob.customerName}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="font-bold">{selectedJob.location}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Technician</p>
                  <p className="font-bold">{selectedJob.technician}</p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Recall Reason</label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Enter reason for rescheduling..."
                    className="w-full mt-2 p-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Next Service Date</label>
                  <Input
                    type="date"
                    value={nextDate}
                    onChange={(e) => setNextDate(e.target.value)}
                    className="mt-2 bg-input border-border"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button onClick={handleSaveRecall} className="flex-1 bg-primary hover:bg-primary/90">
                  Save Recall
                </Button>
                <Button onClick={() => setSelectedJob(null)} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}