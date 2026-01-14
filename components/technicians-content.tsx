"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Eye } from "lucide-react"

const mockTechnicians = [
  {
    id: "TECH001",
    name: "John Silva",
    email: "john@gestetner.com",
    phone: "+94-701234567",
    team: "Team A",
    allJobs: 156,
    pendingJobs: 8,
    performancePercentage: 94.2,
    joinDate: "2021-03-15",
    specialization: "Multifunction Printers",
  },
  {
    id: "TECH002",
    name: "Priya Sharma",
    email: "priya@gestetner.com",
    phone: "+94-701234568",
    team: "Team B",
    allJobs: 142,
    pendingJobs: 5,
    performancePercentage: 92.1,
    joinDate: "2021-06-20",
    specialization: "Digital Production Systems",
  },
  {
    id: "TECH003",
    name: "Miguel Fernandez",
    email: "miguel@gestetner.com",
    phone: "+94-701234569",
    team: "Team A",
    allJobs: 138,
    pendingJobs: 12,
    performancePercentage: 88.5,
    joinDate: "2022-01-10",
    specialization: "Document Management",
  },
]

export function TechniciansContent() {
  const [selectedTech, setSelectedTech] = useState<(typeof mockTechnicians)[0] | null>(null)

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Technicians</h1>
        <p className="text-muted-foreground">View and manage technician information and performance</p>
      </div>

      {/* Technicians Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTechnicians.map((tech) => (
          <Card key={tech.id} className="bg-card border-border hover:shadow-lg transition-all">
            <CardHeader>
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
                  {tech.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <span className="px-2 py-1 rounded text-xs font-bold bg-primary/20 text-primary">{tech.team}</span>
              </div>
              <CardTitle>{tech.name}</CardTitle>
              <CardDescription>{tech.specialization}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-2 bg-secondary rounded">
                  <p className="text-xs text-muted-foreground">Total Jobs</p>
                  <p className="font-bold text-lg">{tech.allJobs}</p>
                </div>
                <div className="p-2 bg-secondary rounded">
                  <p className="text-xs text-muted-foreground">Pending</p>
                  <p className="font-bold text-lg text-amber-400">{tech.pendingJobs}</p>
                </div>
                <div className="col-span-2 p-2 bg-secondary rounded">
                  <p className="text-xs text-muted-foreground">Performance</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="font-bold text-lg">{tech.performancePercentage}%</p>
                    <div className="w-20 h-2 bg-border rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: `${tech.performancePercentage}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              <Button onClick={() => setSelectedTech(tech)} className="w-full bg-primary hover:bg-primary/90">
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Details Dialog */}
      <Dialog open={!!selectedTech} onOpenChange={(open) => !open && setSelectedTech(null)}>
        <DialogContent className="bg-card border-border max-w-2xl">
          <DialogHeader>
            <DialogTitle>Technician Details</DialogTitle>
            <DialogDescription>Complete information and performance metrics</DialogDescription>
          </DialogHeader>

          {selectedTech && (
            <div className="space-y-6">
              {/* Profile */}
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-2xl">
                  {selectedTech.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{selectedTech.name}</h3>
                  <p className="text-muted-foreground">{selectedTech.specialization}</p>
                  <p className="text-sm text-muted-foreground">ID: {selectedTech.id}</p>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h4 className="font-semibold mb-3">Contact Information</h4>
                <div className="grid grid-cols-2 gap-4 p-3 bg-secondary rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedTech.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="font-medium">{selectedTech.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Team</p>
                    <p className="font-medium">{selectedTech.team}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Join Date</p>
                    <p className="font-medium">{new Date(selectedTech.joinDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div>
                <h4 className="font-semibold mb-3">Performance Metrics</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Overall Performance</span>
                      <span className="font-bold">{selectedTech.performancePercentage}%</span>
                    </div>
                    <div className="w-full h-3 bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                        style={{ width: `${selectedTech.performancePercentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="p-3 bg-secondary rounded text-center">
                      <p className="text-xs text-muted-foreground">All Jobs</p>
                      <p className="text-2xl font-bold">{selectedTech.allJobs}</p>
                    </div>
                    <div className="p-3 bg-secondary rounded text-center">
                      <p className="text-xs text-muted-foreground">Pending</p>
                      <p className="text-2xl font-bold text-amber-400">{selectedTech.pendingJobs}</p>
                    </div>
                    <div className="p-3 bg-secondary rounded text-center">
                      <p className="text-xs text-muted-foreground">Completed</p>
                      <p className="text-2xl font-bold text-green-400">
                        {selectedTech.allJobs - selectedTech.pendingJobs}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Button onClick={() => setSelectedTech(null)} className="w-full bg-primary hover:bg-primary/90">
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
