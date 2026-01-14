"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Plus, ViewIcon as ViewAllIcon } from "lucide-react"
import { mockDataConfig } from "@/lib/data-config"

export function BreakdownAssignContent() {
  const mockJobs = mockDataConfig.breakdownJobs
  console.log(mockJobs)

  const [searchQ, setSearchQ] = useState("")
  const [selectedJob, setSelectedJob] = useState<(typeof mockJobs)[0] | null>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isQNumberDialogOpen, setIsQNumberDialogOpen] = useState(false)
  const [formData, setFormData] = useState<(typeof mockJobs)[0] | null>(null)

  const filteredJobs = mockJobs.filter(
    (job) =>
      job.jobNumber.toLowerCase().includes(searchQ.toLowerCase()) ||
      job.serialNumber.toLowerCase().includes(searchQ.toLowerCase()),
  )

  const handleEdit = (job: (typeof mockJobs)[0]) => {
    setFormData({ ...job })
    setIsEditOpen(true)
  }

  const handleSave = () => {
    alert("Job updated successfully")
    setIsEditOpen(false)
    setFormData(null)
  }

  return (
    <div className="w-full max-w-7xl px-4 md:px-8 py-4 md:py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Breakdown Assignment</h1>
        <p className="text-gray-500">Manage and assign breakdown service jobs</p>
      </div>

      {/* Search Bar and Actions */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search by Job Number or Serial Number (Q)"
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
            className="bg-white border-gray-200"
          />
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setIsQNumberDialogOpen(true)}
            variant="outline"
            className="border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            <ViewAllIcon className="w-4 h-4 mr-2" />
            View all Q numbers
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Breakdown
          </Button>
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="bg-white border-gray-200 hover:shadow-lg transition-all">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                <div>
                  <p className="text-xs text-gray-500">Job Number</p>
                  <p className="font-bold text-gray-900">{job.jobNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Serial Number</p>
                  <p className="font-bold text-gray-900">{job.serialNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Machine Ref</p>
                  <p className="font-bold text-gray-900">{job.machineRef}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <p
                    className={`font-bold capitalize ${job.status === "pending" ? "text-amber-600" : "text-green-600"}`}
                  >
                    {job.status}
                  </p>
                </div>
                <Button onClick={() => handleEdit(job)} className="bg-blue-600 hover:bg-blue-700 text-white w-full">
                  <Eye className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

{/* Edit Dialog */}
<Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
  <DialogContent className="bg-white border-gray-200 max-w-5xl">
    <DialogHeader>
      <DialogTitle className="text-gray-900">Edit Breakdown Job</DialogTitle>
      <DialogDescription className="text-gray-500">Update job details and assignment</DialogDescription>
    </DialogHeader>

    {formData && (
      <div className="space-y-4">
        {/* Basic Information */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2 text-sm">Basic Information</h3>
          <div className="grid grid-cols-5 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-900">Job#</label>
              <Input
                value={formData.jobNumber}
                onChange={(e) => setFormData({ ...formData, jobNumber: e.target.value })}
                className="mt-1 bg-white border-gray-200 text-gray-900 h-9 text-sm"
                disabled
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-900">Serial#</label>
              <Input
                value={formData.serialNumber}
                onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                className="mt-1 bg-white border-gray-200 text-gray-900 h-9 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-900">Machine Ref</label>
              <Input
                value={formData.machineRef}
                onChange={(e) => setFormData({ ...formData, machineRef: e.target.value })}
                className="mt-1 bg-white border-gray-200 text-gray-900 h-9 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-900">Model</label>
              <Input
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                className="mt-1 bg-white border-gray-200 text-gray-900 h-9 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-900">Status</label>
              <Select value={formData.status} onValueChange={(val) => setFormData({ ...formData, status: val })}>
                <SelectTrigger className="mt-1 bg-white border-gray-200 text-gray-900 h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2 text-sm">Customer Information</h3>
          <div className="grid grid-cols-5 gap-3">
            <div className="col-span-2">
              <label className="text-xs font-medium text-gray-900">Customer</label>
              <Input
                value={formData.customer}
                onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                className="mt-1 bg-white border-gray-200 text-gray-900 h-9 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-900">Address 1</label>
              <Input
                value={formData.address1}
                onChange={(e) => setFormData({ ...formData, address1: e.target.value })}
                className="mt-1 bg-white border-gray-200 text-gray-900 h-9 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-900">Address 2</label>
              <Input
                value={formData.address2}
                onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
                className="mt-1 bg-white border-gray-200 text-gray-900 h-9 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-900">Address 3</label>
              <Input
                value={formData.address3}
                onChange={(e) => setFormData({ ...formData, address3: e.target.value })}
                className="mt-1 bg-white border-gray-200 text-gray-900 h-9 text-sm"
              />
            </div>
            <div className="col-span-5">
              <label className="text-xs font-medium text-gray-900">Contact</label>
              <Input
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                className="mt-1 bg-white border-gray-200 text-gray-900 h-9 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2 text-sm">Job Details</h3>
          <div className="grid grid-cols-5 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-900">Team</label>
              <Select value={formData.team} onValueChange={(val) => setFormData({ ...formData, team: val })}>
                <SelectTrigger className="mt-1 bg-white border-gray-200 text-gray-900 h-9 text-sm">
                  <SelectValue placeholder="Select team" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <SelectItem value="team-a">Team A</SelectItem>
                  <SelectItem value="team-b">Team B</SelectItem>
                  <SelectItem value="team-c">Team C</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-900">Inform-By</label>
              <Input
                value={formData.informBy}
                onChange={(e) => setFormData({ ...formData, informBy: e.target.value })}
                className="mt-1 bg-white border-gray-200 text-gray-900 h-9 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-900">Inform Type</label>
              <Select value={formData.informType} onValueChange={(val) => setFormData({ ...formData, informType: val })}>
                <SelectTrigger className="mt-1 bg-white border-gray-200 text-gray-900 h-9 text-sm">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <SelectItem value="phone">Phone</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="in-person">In Person</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-900">SMS</label>
              <Input
                value={formData.sms}
                onChange={(e) => setFormData({ ...formData, sms: e.target.value })}
                className="mt-1 bg-white border-gray-200 text-gray-900 h-9 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-900">Type</label>
              <Select value={formData.type} onValueChange={(val) => setFormData({ ...formData, type: val })}>
                <SelectTrigger className="mt-1 bg-white border-gray-200 text-gray-900 h-9 text-sm">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <SelectItem value="breakdown">Breakdown</SelectItem>
                  <SelectItem value="service">Service</SelectItem>
                  <SelectItem value="installation">Installation</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Assignment */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2 text-sm">Assignment</h3>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-900">Tech Code</label>
              <Input
                value={formData.techCode}
                onChange={(e) => setFormData({ ...formData, techCode: e.target.value })}
                className="mt-1 bg-white border-gray-200 text-gray-900 h-9 text-sm"
              />
            </div>
            <div className="col-span-2">
              <label className="text-xs font-medium text-gray-900">Tech Mobile</label>
              <Input
                value={formData.techMobile}
                onChange={(e) => setFormData({ ...formData, techMobile: e.target.value })}
                className="mt-1 bg-white border-gray-200 text-gray-900 h-9 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="text-xs font-medium text-gray-900">Note</label>
          <textarea
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            className="w-full mt-1 p-2 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm"
            rows={2}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-9">
            Save Changes
          </Button>
          <Button
            onClick={() => setIsEditOpen(false)}
            variant="outline"
            className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50 h-9"
          >
            Cancel
          </Button>
        </div>
      </div>
    )}
  </DialogContent>
</Dialog>

      {/* All Q Numbers Dialog */}
      <Dialog open={isQNumberDialogOpen} onOpenChange={setIsQNumberDialogOpen}>
        <DialogContent className="bg-white border-gray-200 max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-gray-900">All Q Numbers</DialogTitle>
            <DialogDescription className="text-gray-500">Complete list of all breakdown Q numbers</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Q Number</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Job Number</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Customer</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockJobs.map((job) => (
                    <tr key={job.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900 font-medium">{job.qNumber}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{job.jobNumber}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{job.customer}</td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                            job.status === "pending"
                              ? "bg-amber-100 text-amber-700"
                              : job.status === "assigned"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-green-100 text-green-700"
                          }`}
                        >
                          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Button
              onClick={() => setIsQNumberDialogOpen(false)}
              variant="outline"
              className="w-full border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
