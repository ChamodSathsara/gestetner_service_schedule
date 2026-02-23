"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Users, CheckCircle2, AlertCircle, TrendingUp } from "lucide-react";
import { mockDataConfig } from "@/lib/data-config";

export function DashboardContent() {
  // Import data from config instead of defining locally
  const {
    monthlyServiceSuccess,
    monthlyBreakdownSuccess,
    technicianSummaryData,
    technicianPerformance,
    pendingJobs,
    warrantyDetailsData,
    warrantySummaryData,
  } = mockDataConfig;

  return (
    <div className="w-full max-w-7xl px-4 md:px-8 py-4 md:py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's your service management overview.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">432</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Jobs</CardTitle>
            <AlertCircle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">Awaiting completion</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Technicians
            </CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Across all branches</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">On-time completion</p>
          </CardContent>
        </Card>
      </div>

      

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Service Success */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Monthly Service Schedule Success</CardTitle>
            <CardDescription>Last 30 days completion rate</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={monthlyServiceSuccess}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {monthlyServiceSuccess.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Breakdown Success */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Monthly Breakdown Success</CardTitle>
            <CardDescription>Last 30 days completion rate</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={monthlyBreakdownSuccess}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {monthlyBreakdownSuccess.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Technician Summary Graph */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Technician Summary - Daily Jobs</CardTitle>
          <CardDescription>
            Service schedules and breakdowns progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={technicianSummaryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="date" stroke="rgba(0,0,0,0.5)" />
              <YAxis stroke="rgba(0,0,0,0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid rgba(0,0,0,0.1)",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="services"
                stroke="#3b82f6"
                dot={false}
                name="Service Schedules"
              />
              <Line
                type="monotone"
                dataKey="breakdowns"
                stroke="#ef4444"
                dot={false}
                name="Breakdowns"
              />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#22c55e"
                dot={false}
                name="Completed"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Performance & Pending Jobs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Technician Performance */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Top Technician Performance</CardTitle>
            <CardDescription>Best performers this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {technicianPerformance.map((tech) => (
                <div
                  key={tech.id}
                  className="flex items-center justify-between p-3 bg-secondary rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">
                      {tech.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{tech.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {tech.completedJobs} jobs completed
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-amber-400">⭐ {tech.rating}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Jobs Alert */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Pending Jobs - Due Soon</CardTitle>
            <CardDescription>
              Jobs requiring immediate attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingJobs.map((job) => (
                <div
                  key={job.id}
                  className="p-3 border border-border rounded-lg hover:bg-secondary transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-foreground">{job.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {job.technician}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        job.jobType === "Service"
                          ? "bg-blue-500/20 text-blue-600"
                          : "bg-red-500/20 text-red-600"
                      }`}
                    >
                      {job.jobType}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {job.location}
                  </p>
                  <div className="text-xs font-bold text-amber-600">
                    ⏰ {job.daysLeft} day{job.daysLeft !== 1 ? "s" : ""} left
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Warranty Details Report table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Customer Warranty Details Report</CardTitle>
          <CardDescription>
            Machine warranty information for all customers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left p-2 font-semibold text-foreground">
                    Customer Name
                  </th>
                  <th className="text-left p-2 font-semibold text-foreground">
                    Address 1
                  </th>
                  <th className="text-left p-2 font-semibold text-foreground">
                    Address 2
                  </th>
                  <th className="text-left p-2 font-semibold text-foreground">
                    Address 3
                  </th>
                  <th className="text-left p-2 font-semibold text-foreground">
                    Serial No
                  </th>
                  <th className="text-left p-2 font-semibold text-foreground">
                    Machine Description
                  </th>
                  <th className="text-left p-2 font-semibold text-foreground">
                    Ref Code
                  </th>
                  <th className="text-left p-2 font-semibold text-foreground">
                    Team
                  </th>
                  <th className="text-left p-2 font-semibold text-foreground">
                    Status
                  </th>
                  <th className="text-left p-2 font-semibold text-foreground">
                    Officer Code
                  </th>
                  <th className="text-left p-2 font-semibold text-foreground">
                    Officer Name
                  </th>
                  <th className="text-left p-2 font-semibold text-foreground">
                    MA Period End
                  </th>
                  <th className="text-left p-2 font-semibold text-foreground">
                    Warranty End
                  </th>
                </tr>
              </thead>
              <tbody>
                {warrantyDetailsData.map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-border hover:bg-secondary transition-colors"
                  >
                    <td className="p-2 text-foreground">{row.cusName}</td>
                    <td className="p-2 text-foreground">{row.invAdd1}</td>
                    <td className="p-2 text-foreground">{row.invAdd2}</td>
                    <td className="p-2 text-foreground">{row.invAdd3}</td>
                    <td className="p-2 text-foreground">{row.serialNo}</td>
                    <td className="p-2 text-foreground">{row.machineDesc}</td>
                    <td className="p-2 text-foreground">
                      {row.machineRefCode}
                    </td>
                    <td className="p-2 text-foreground">{row.team}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${row.cusStatus === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}
                      >
                        {row.cusStatus}
                      </span>
                    </td>
                    <td className="p-2 text-foreground">{row.tOfficerCode}</td>
                    <td className="p-2 text-foreground">{row.tOfficerName}</td>
                    <td className="p-2 text-foreground">{row.maPeriodEnd}</td>
                    <td className="p-2 text-foreground">
                      {row.mWarrantyEndDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Customer Warranty Summary Report table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Customer Warranty Summary Report</CardTitle>
          <CardDescription>
            Machine count summary by technician officer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left p-2 font-semibold text-foreground">
                    Officer Code
                  </th>
                  <th className="text-left p-2 font-semibold text-foreground">
                    Officer Name
                  </th>
                  <th className="text-left p-2 font-semibold text-foreground">
                    Team
                  </th>
                  <th className="text-left p-2 font-semibold text-foreground">
                    Machine Count
                  </th>
                </tr>
              </thead>
              <tbody>
                {warrantySummaryData.map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-border hover:bg-secondary transition-colors"
                  >
                    <td className="p-2 text-foreground font-medium">
                      {row.tOfficerCode}
                    </td>
                    <td className="p-2 text-foreground">{row.tOfficerName}</td>
                    <td className="p-2 text-foreground">{row.team}</td>
                    <td className="p-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">
                        {row.machineCount}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
