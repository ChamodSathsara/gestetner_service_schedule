import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Bell } from "lucide-react";

interface Service {
  id: string;
  jobId: string;
  customerName: string;
  phone_number: string;
  location: string;
  machineRefNo: string;
  date: string;
  daysLeft: number;
  expected_visit_no: number;
  status: "completed" | "pending" | "overdue";
}

interface Job {
  id: string;
  jobId: string;
  customerName: string;
  phone_number: string;
  location: string;
  machineRefNo: string;
  serialNo: string;
  customer_agreement: string;
  date: string;
  description: string;
  note: string;
  status: "pending" | "completed" | "in-progress";
}

interface Due {
  machineRefNo: string;
  expectedVisitNo: string;
  expectedVisitDate: string;
  expectedVisitCount: number;
  visitStatus: string | null;
  rowId: number;
  customerID: string;
  customerName: string;
  contactPerson: string;
  customerTelephone: string;
  machineLocation01: string;
  machineLocation02: string;
  machineLocation03: string;
}

interface RecallCardProps {
  item: any;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    rowID: number,
    recallReason: string,
    recallDate: string,
    visitNo: number,
    isRecall: boolean,
    onSite: boolean,
  ) => void;
}

export default function RecallCard({
  item,
  isOpen,
  onClose,
  onSubmit,
}: RecallCardProps) {
  const [reason, setReason] = useState<string>("");
  const [isOnSite, setIsOnSite] = useState<boolean>(false);

  const handleSubmit = () => {
    const rowID = (item as Due).rowId || 0;
    const recallReason = reason;
    const recallDate = new Date().toISOString();
    const visitNo = (item as Due).expectedVisitNo
      ? parseInt((item as Due).expectedVisitNo)
      : 0;
    const isRecall = true;
    const onSite = isOnSite;
    console.log("Submitting recall with data:", {
      rowID,
      recallReason,
      recallDate,
      visitNo,
      isRecall,
      onSite,
    });

    onSubmit(rowID, recallReason, recallDate, visitNo, isRecall, onSite);
    setReason("");
    setIsOnSite(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Recall Job
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">
              Job ID:{" "}
              <span className="font-semibold text-gray-900">
                {item?.machineRefNo}
              </span>
            </p>
            <p className="text-sm text-gray-600">
              Customer:{" "}
              <span className="font-semibold text-gray-900">
                {item?.customerName}
              </span>
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Are you on site?
            </label>
            <div className="flex flex-col gap-2">
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="onSite"
                  value="yes"
                  checked={isOnSite === true}
                  onChange={() => setIsOnSite(true)}
                />
                Yes
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="onSite"
                  value="no"
                  checked={isOnSite === false}
                  onChange={() => setIsOnSite(false)}
                />
                No
              </label>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Reason for Recall
            </label>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter the reason for recalling this job..."
              className="min-h-[120px]"
            />
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button onClick={onClose} variant="outline" className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!reason.trim()}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
          >
            <Bell className="w-4 h-4 mr-2" />
            Recall
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
