"use client";

import { notFound, useParams } from "next/navigation";
import NsBaseReport from "@/components/manager/reports/NsBaseReport";
import FsFreeReport from "@/components/manager/reports/FsFreeReport";
import MaBaseReport from "@/components/manager/reports/MaBaseReport";
import DailyJobReport from "@/components/manager/reports/DailyJobReport";
import BackLoackReport from "@/components/manager/reports/BackLoackReport";
import ExReport from "@/components/manager/reports/ExReport";
import CustomerBaseReport from "@/components/manager/reports/CustomerBaseReport";
import CustomerFeedbackReport from "@/components/manager/reports/CustomerFeedbackReport";
import MonthlyServiceReport from "@/components/manager/reports/MonthlyServiceReport";

const reportMap: Record<number, React.ComponentType> = {
  1: NsBaseReport,
  2: FsFreeReport,
  3: MaBaseReport,
  4: DailyJobReport,
  5: BackLoackReport,
  6: ExReport,
  7: CustomerBaseReport,
  8: CustomerFeedbackReport,
  9 : MonthlyServiceReport
};

export default function ReportPage() {
  const paramsn = useParams();
  const id: any = paramsn.id;
  //   const id = parseInt(params.id, 10);
  console.log("Report ID:", id);

  if (isNaN(id) || !reportMap[id]) {
    notFound();
  }

  const ReportComponent = reportMap[id];

  return (
    <div className="min-h-screen bg-gray-50">
      <ReportComponent />
    </div>
  );
}
