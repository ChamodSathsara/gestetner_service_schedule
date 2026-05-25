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
  fill?: string;
}

// ─── Loading Overlay ───────────────────────────────────────────────────────────

function DashboardLoader() {
  const steps = [
    { label: "Job counts & rates", icon: "📊" },
    { label: "Service metrics", icon: "🔧" },
    { label: "Pending jobs", icon: "📋" },
    { label: "Warranty data", icon: "🛡️" },
    { label: "Overdue jobs", icon: "⏰" },
    { label: "Technician performance", icon: "👥" },
    { label: "Weekly trends", icon: "📈" },
    { label: "Job percentages", icon: "🥧" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6 p-8 rounded-2xl bg-card border border-border shadow-xl max-w-sm w-full mx-4">
        {/* Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-border" />
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        </div>

        <div className="text-center space-y-1">
          <h2 className="text-lg font-semibold text-foreground">
            Loading Dashboard
          </h2>
          <p className="text-sm text-muted-foreground">
            Fetching your service overview…
          </p>
        </div>

        {/* Step checklist */}
        <ul className="w-full space-y-2">
          {steps.map((step, i) => (
            <li
              key={i}
              className="flex items-center gap-3 text-sm text-muted-foreground animate-pulse"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <span className="text-base">{step.icon}</span>
              <span>{step.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Skeleton Cards ────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="h-4 w-24 bg-secondary rounded animate-pulse" />
        <div className="h-4 w-4 bg-secondary rounded animate-pulse" />
      </CardHeader>
      <CardContent>
        <div className="h-8 w-16 bg-secondary rounded animate-pulse mb-2" />
        <div className="h-3 w-28 bg-secondary rounded animate-pulse" />
      </CardContent>
    </Card>
  );
}

function SkeletonChart({ height = 250 }: { height?: number }) {
  return (
    <div
      className="w-full bg-secondary rounded-lg animate-pulse"
      style={{ height }}
    />
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export function DashboardContent() {
  const [isLoading, setIsLoading] = useState(true);

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
  } = useApiConfig();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Run all API calls in parallel — dashboard only shows once ALL resolve
        const [
          jobCountAndRate,
          serviceCountAndRate,
          pendingJobs,
          customerWarranty,
          oldestDueJobs,
          techniciansPerformance,
          lastWeekJobPerformence,
          completeAndPendingServicesPercentage,
          completeAndPendingJobPercentage,
        ] = await Promise.all([
          getJobCountAndRate(),
          getServiceCountAndRate(),
          getPendingJobs(),
          getCustomerWarranty(),
          getOldestDueJobs(),
          getTechniciansPerformance(),
          getLastWeekJobPerformence(),
          getCompleteAndPendingServicesPercentage(),
          getCompleteAndPendingJobPercentage(),
        ]);

        setJobCountAndRate(jobCountAndRate);
        setServiceCountAndRate(serviceCountAndRate);
        setPendingJobs(pendingJobs);
        setCustomerWarranty(customerWarranty);
        setOldestDueJobs(oldestDueJobs);
        setTechniciansPerformance(techniciansPerformance);
        setLastWeekJobPerformence(lastWeekJobPerformence);
        setCompleteAndPendingServicesPercentage(
          completeAndPendingServicesPercentage,
        );
        setCompleteAndPendingJobPercentage(completeAndPendingJobPercentage);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Show full-screen loading overlay while any API is pending
  if (isLoading) {
    return <DashboardLoader />;
  }

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
