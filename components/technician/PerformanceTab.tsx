import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, CheckCircle2, Clock } from "lucide-react"
import { useApiConfig } from "@/hooks/apiconfig"
import { useEffect, useState } from "react"
import { Loading } from "./Loading";

interface PerformanceData {
  completedJobs: number;
  totalJobs: number;
  performancePercentage: number;
  techCode: string | null;
  weeklyCompleted: number;
}

export function PerformanceTab() {
  const { getPerformance } = useApiConfig();
  const [performanceData, setPerformanceData] = useState<PerformanceData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPerformance = async () => {
    try {
      setLoading(true);
      const data = await getPerformance();
      console.log("Performance Data:", data);
      setPerformanceData(data);
    } catch (error) {
      console.error("Error fetching performance data:", error);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    fetchPerformance();
  }, []);

  const pendingJobs = performanceData 
    ? performanceData.totalJobs - performanceData.completedJobs 
    : 0;


    if (loading) {
    return <Loading fullScreen message="Loading dashboard data..." />
  }

  if (loading) {
    return (
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded-full"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
    {/* // Services Card */}
    <Card className="bg-white border-gray-200 shadow-sm mb-5">
      <CardHeader>
        <CardTitle className="text-gray-900 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          Services Performance Metrics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Performance</span>
            <span className="font-bold text-xl text-blue-600">
              {performanceData?.performancePercentage.toFixed(1)}%
            </span>
          </div>
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-500" 
              style={{ width: `${performanceData?.performancePercentage || 0}%` }} 
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {performanceData && performanceData.performancePercentage >= 90 
              ? "Excellent performance! Keep it up." 
              : performanceData && performanceData.performancePercentage >= 70
              ? "Good performance! Room for improvement."
              : "Keep working hard to improve your performance."}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-4 pb-3 text-center">
              <CheckCircle2 className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold text-blue-700">
                {performanceData?.completedJobs || 0}
              </p>
              <p className="text-xs text-blue-600 font-medium">Completed</p>
            </CardContent>
          </Card>
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-4 pb-3 text-center">
              <Clock className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold text-blue-700">
                {pendingJobs}
              </p>
              <p className="text-xs text-blue-600 font-medium">Total Services</p>
            </CardContent>
          </Card>
        </div>

        

        <div className="pt-4 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">Recent Achievements</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-700">
                {performanceData?.weeklyCompleted || 0} Services completed this week
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>



    {/* // jobs Card */}
     <Card className="bg-white border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-gray-900 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          Jobs Performance Metrics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Performance</span>
            <span className="font-bold text-xl text-blue-600">
              {performanceData?.performancePercentage.toFixed(1)}%
            </span>
          </div>
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-500" 
              style={{ width: `${performanceData?.performancePercentage || 0}%` }} 
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {performanceData && performanceData.performancePercentage >= 90 
              ? "Excellent performance! Keep it up." 
              : performanceData && performanceData.performancePercentage >= 70
              ? "Good performance! Room for improvement."
              : "Keep working hard to improve your performance."}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-4 pb-3 text-center">
              <CheckCircle2 className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold text-blue-700">
                {performanceData?.completedJobs || 0}
              </p>
              <p className="text-xs text-blue-600 font-medium">Completed Jobs</p>
            </CardContent>
          </Card>
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-4 pb-3 text-center">
              <Clock className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold text-blue-700">
                {pendingJobs}
              </p>
              <p className="text-xs text-blue-600 font-medium">Total Jobs</p>
            </CardContent>
          </Card>
        </div>

        

        <div className="pt-4 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">Recent Achievements</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-700">
                {performanceData?.weeklyCompleted || 0} jobs completed this week
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    </>
  );
}