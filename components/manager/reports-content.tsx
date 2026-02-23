"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileText } from "lucide-react"
import { mockDataConfig } from "@/lib/data-config"

const { warrantyDetailsData } = mockDataConfig

const summarySectionData = [
  { tOfficerCode: "TO001", tOfficerName: "John Silva", team: "Team A", machineCount: 45 },
  { tOfficerCode: "TO002", tOfficerName: "Priya Sharma", team: "Team B", machineCount: 38 },
  { tOfficerCode: "TO003", tOfficerName: "Miguel Fernandez", team: "Team C", machineCount: 32 },
  { tOfficerCode: "TO004", tOfficerName: "Sarah Johnson", team: "Team D", machineCount: 41 },
  { tOfficerCode: "TO005", tOfficerName: "Ahmed Hassan", team: "Team A", machineCount: 29 },
]

export function ReportsContent() {
  const [reportType, setReportType] = useState("warranty-details")
  const [reportScope, setReportScope] = useState("all")

  const handleDownload = () => {
    const filename = `${reportType}-${reportScope}-${new Date().toISOString().split("T")[0]}.csv`
    alert(`Downloading: ${filename}`)
  }

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Reports</h1>
        <p className="text-muted-foreground">Generate and download service and warranty reports</p>
      </div>

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Report Options</CardTitle>
          <CardDescription>Select report type and scope</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Report Type</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="mt-2 bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="warranty-details">Customer Warranty Details</SelectItem>
                  <SelectItem value="warranty-summary">Warranty Summary</SelectItem>
                  <SelectItem value="service-schedule">Service Schedule Report</SelectItem>
                  <SelectItem value="breakdown">Breakdown Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Report Scope</label>
              <Select value={reportScope} onValueChange={setReportScope}>
                <SelectTrigger className="mt-2 bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="all">All Reports</SelectItem>
                  <SelectItem value="branch">Branch Report</SelectItem>
                  <SelectItem value="team">Team Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button onClick={handleDownload} className="w-full bg-primary hover:bg-primary/90">
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Preview */}
      {reportType === "warranty-details" && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Customer Warranty Details Report
            </CardTitle>
            <CardDescription>Complete warranty and machine information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Customer</th>
                    <th className="text-left py-3 px-4 font-semibold">Location</th>
                    <th className="text-left py-3 px-4 font-semibold">Machine Ref</th>
                    <th className="text-left py-3 px-4 font-semibold">Team</th>
                    <th className="text-left py-3 px-4 font-semibold">Warranty End</th>
                  </tr>
                </thead>
                <tbody>
                  {warrantyDetailsData.map((row, idx) => (
                    <tr key={idx} className="border-b border-border hover:bg-secondary transition-colors">
                      <td className="py-3 px-4">{row.cusName}</td>
                      <td className="py-3 px-4">{row.invAdd2}</td>
                      <td className="py-3 px-4 font-mono">{row.machineRefCode}</td>
                      <td className="py-3 px-4">{row.team}</td>
                      <td className="py-3 px-4">{new Date(row.mWarrantyEndDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {reportType === "warranty-summary" && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Warranty Summary Report
            </CardTitle>
            <CardDescription>Machine count by technician and team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Tech Code</th>
                    <th className="text-left py-3 px-4 font-semibold">Technician Name</th>
                    <th className="text-left py-3 px-4 font-semibold">Team</th>
                    <th className="text-left py-3 px-4 font-semibold">Machine Count</th>
                  </tr>
                </thead>
                <tbody>
                  {summarySectionData.map((row, idx) => (
                    <tr key={idx} className="border-b border-border hover:bg-secondary transition-colors">
                      <td className="py-3 px-4 font-mono">{row.tOfficerCode}</td>
                      <td className="py-3 px-4">{row.tOfficerName}</td>
                      <td className="py-3 px-4">{row.team}</td>
                      <td className="py-3 px-4 font-bold text-blue-400">{row.machineCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}