
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, CheckCircle2, Clock } from "lucide-react"

export function PerformanceTab() {
  return (
    <Card className="bg-white border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-gray-900 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          Performance Metrics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Performance</span>
            <span className="font-bold text-xl text-blue-600">94.2%</span>
          </div>
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: "94.2%" }} />
          </div>
          <p className="text-xs text-gray-500 mt-2">Excellent performance! Keep it up.</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-4 pb-3 text-center">
              <CheckCircle2 className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold text-blue-700">156</p>
              <p className="text-xs text-blue-600 font-medium">Completed</p>
            </CardContent>
          </Card>
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-4 pb-3 text-center">
              <Clock className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold text-blue-700">8</p>
              <p className="text-xs text-blue-600 font-medium">Pending</p>
            </CardContent>
          </Card>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">Recent Achievements</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-700">10 jobs completed this week</span>
            </div>
            <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-700">95% customer satisfaction</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
