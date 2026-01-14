
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Settings, Users, Bell } from "lucide-react"

export function SettingsTab() {
  return (
    <Card className="bg-white border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-gray-900 flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Account Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button className="w-full justify-start bg-white text-gray-700 border-gray-200 hover:bg-gray-50 h-12" variant="outline">
          <Users className="w-4 h-4 mr-3" />
          Edit Profile
        </Button>
        <Button className="w-full justify-start bg-white text-gray-700 border-gray-200 hover:bg-gray-50 h-12" variant="outline">
          <Settings className="w-4 h-4 mr-3" />
          Change Password
        </Button>
        <Button className="w-full justify-start bg-white text-gray-700 border-gray-200 hover:bg-gray-50 h-12" variant="outline">
          <Bell className="w-4 h-4 mr-3" />
          Notifications
        </Button>
        <div className="pt-4 border-t border-gray-200">
          <Button className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 bg-transparent h-12" variant="outline">
            Logout
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
