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
import {
  GetAreaWiseJobSummary,
  GetCompleteAndPendingJobAndServicePercentage,
  GetJobAndServiceCountAndRate,
  GetLastWeekJobPerformence,
  GetOldestDueJobs,
  GetTechniciansPerformance,
  Job,
  PendingJob,
  useApiConfig,
} from "@/hooks/apiconfig";
import { useEffect, useState } from "react";

interface JobPercentageItem {
  name: string;
  value: number;
  fill?: string; // Add this line
}

export function DashboardContent() {
  const [JobCountAndRate, setJobCountAndRate] =
    useState<GetJobAndServiceCountAndRate>();
  const [ServiceCountAndRate, setServiceCountAndRate] =
    useState<GetJobAndServiceCountAndRate>();
  const [PendingJobs, setPendingJobs] = useState<Job[]>();
  const [PendingServices, setPendingServices] = useState<any>();
  const [CustomerWarranty, setCustomerWarranty] =
    useState<GetAreaWiseJobSummary>();
  const [OldestDueJobs, setOldestDueJobs] = useState<PendingJob[]>();
  const [TechniciansPerformance, setTechniciansPerformance] =
    useState<GetTechniciansPerformance>();
  const [LastWeekJobPerformence, setLastWeekJobPerformence] =
    useState<GetLastWeekJobPerformence>();
  const [
    CompleteAndPendingServicesPercentage,
    setCompleteAndPendingServicesPercentage,
  ] = useState<JobPercentageItem[]>([]);
  const [CompleteAndPendingJobPercentage, setCompleteAndPendingJobPercentage] =
    useState<GetCompleteAndPendingJobAndServicePercentage>();

  // Import data from config instead of defining locally
  const { warrantyDetailsDataNew } = mockDataConfig;

  const {
    getCustomerWarranty,
    getOldestDueJobs,
    getTechniciansPerformance,
    getLastWeekJobPerformence,
    getCompleteAndPendingServicesPercentage,
    getCompleteAndPendingJobPercentage,

    getPendingJobs,
    getServiceCountAndRate,
    getJobCountAndRate,
  } = useApiConfig(); // Placeholder for future API integration

  useEffect(() => {
    // Example of how to use the API functions - currently just logging results
    const fetchData = async () => {
      const jobCountAndRate = await getJobCountAndRate();
      setJobCountAndRate(jobCountAndRate);

      const serviceCountAndRate = await getServiceCountAndRate();
      setServiceCountAndRate(serviceCountAndRate);

      const pendingJobs: Job[] = await getPendingJobs();
      setPendingJobs(pendingJobs);

      const customerWarranty = await getCustomerWarranty();
      setCustomerWarranty(customerWarranty);

      const oldestDueJobs = await getOldestDueJobs();
      setOldestDueJobs(oldestDueJobs);

      const techniciansPerformance = await getTechniciansPerformance();
      setTechniciansPerformance(techniciansPerformance);

      const lastWeekJobPerformence = await getLastWeekJobPerformence();
      setLastWeekJobPerformence(lastWeekJobPerformence);

      const completeAndPendingServicesPercentage =
        await getCompleteAndPendingServicesPercentage();
      setCompleteAndPendingServicesPercentage(
        completeAndPendingServicesPercentage,
      );

      const completeAndPendingJobPercentage =
        await getCompleteAndPendingJobPercentage();
      setCompleteAndPendingJobPercentage(completeAndPendingJobPercentage);
    };

    fetchData();
  }, []);

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
            <div className="text-2xl font-bold">
              {JobCountAndRate?.jobCount || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {JobCountAndRate?.jobRate || 0}% Success Rate
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Complete Jobs</CardTitle>
            <AlertCircle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {JobCountAndRate?.successCount || 0}
            </div>
            <p className="text-xs text-muted-foreground">Last Year Completed</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Services
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {ServiceCountAndRate?.jobCount || 0}
            </div>

            <p className="text-xs text-muted-foreground">
              {" "}
              {ServiceCountAndRate?.jobRate || 0}% Success Rate
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Success Services
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {ServiceCountAndRate?.successCount || 0}
            </div>
            <p className="text-xs text-muted-foreground">Last Year Completed</p>
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
                  data={CompleteAndPendingServicesPercentage || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {CompleteAndPendingServicesPercentage?.map((entry, index) => (
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
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={CompleteAndPendingJobPercentage || []}
                  cx="50%"
                  cy="45%"
                  labelLine={false}
                  label={({ value }) => (value > 0 ? `${value}%` : "")}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {CompleteAndPendingJobPercentage?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value, entry: any) =>
                    `${value}: ${entry.payload.value}%`
                  }
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Technician Summary Graph */}
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
            <LineChart data={LastWeekJobPerformence}>
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
                dataKey="pending"
                stroke="#ef4444"
                strokeWidth={2}
                dot={false}
                name="Pending Jobs"
              />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#22c55e"
                strokeWidth={2}
                dot={false}
                name="Completed Jobs"
              />
              <Line
                type="monotone"
                dataKey="started"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                name="Started Jobs"
              />
              <Line
                type="monotone"
                dataKey="cancel"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={false}
                name="Cancelled Jobs"
              />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={false}
                name="Total Jobs"
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
              {TechniciansPerformance?.map((tech) => (
                <div
                  key={tech.tech_id}
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
            <CardTitle>Overdue Jobs</CardTitle>
            <CardDescription>
              Jobs requiring immediate attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {OldestDueJobs?.map((job: PendingJob) => (
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
          <CardTitle>
            Last Year Customer Warranty Details Report Summery
          </CardTitle>
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
                    Area
                  </th>

                  <th className="text-left p-2 font-semibold text-foreground">
                    NS
                  </th>
                  <th className="text-left p-2 font-semibold text-foreground">
                    FS
                  </th>
                  <th className="text-left p-2 font-semibold text-foreground">
                    MA
                  </th>
                  <th className="text-left p-2 font-semibold text-foreground">
                    EX
                  </th>
                </tr>
              </thead>
              <tbody>
                {CustomerWarranty?.map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-border hover:bg-secondary transition-colors"
                  >
                    <td className="p-2 text-foreground">{row.area}</td>
                    <td className="p-2 text-foreground">{row.ns}</td>
                    <td className="p-2 text-foreground">{row.fs}</td>
                    <td className="p-2 text-foreground">{row.ma}</td>
                    <td className="p-2 text-foreground">{row.ex}</td>
                    {/* <td className="p-2 text-foreground">{row.machineDesc}</td>
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
                    </td> */}
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
