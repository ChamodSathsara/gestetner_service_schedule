import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface Notification {
  id?: number;
  type?: string;
  joB_STATUS: any;
  dJ_ID: string;
  seriaL_NO: string;
  machinE_REF_NO: string;
  cuS_NAME: string;
  cuS_ADD1: string;
  cuS_ADD2: string;
  cuS_ADD3: string;
  cuS_CONTACT: string;
  cuS_TEL_NO: string;
  teaM_ID: string;
  teaM_NAME: string;
  dJ_DATE: string;
  tecH_CODE: string;
  tecH_MOBILE: string;
  machinE_MODEL_ID: string;
  machinE_MODEL_NAME: string;
  cuS_STATUS: string;
  note: string;
  jobStatus: string;
}

interface NotificationsPanelProps {
  notifications: Notification[];
  onClose: () => void;
}

export function NotificationsPanel({
  notifications,
  onClose,
}: NotificationsPanelProps) {
  return (
    <div className="fixed top-0 right-0 w-full md:w-96 h-full bg-white shadow-2xl z-50 overflow-y-auto">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>
      <div className="p-4 space-y-3">
        {notifications.map((notif, index) => (
          <Card
            key={index}
            className="bg-blue-50 border-blue-200 cursor-pointer hover:bg-blue-100 transition-colors"
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-gray-900">
                    {notif.seriaL_NO}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">{notif.note}</p>
                  <p className="text-xs text-gray-500 mt-2">{notif.dJ_DATE}</p>
                  <p className="text-xs text-gray-500 mt-2">{notif.type}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
