"use client";
import { use, useEffect, useState } from "react";
import CustomerReviewSystem from "@/components/customer/CustomerReviewSystem";
import { useApiConfig } from "@/hooks/apiconfig";

interface PageProps {
  params: Promise<{
    serialNo: string;
  }>;
}

// Fetch data function - replace with your actual API call
async function getJobsAndServices(serialNo: string) {
  // Mock data for demonstration
  return {
    jobs: [
      {
        id: "job-001",
        jobId: "JOB-003",
        date: "2026-01-25T00:00:00",
        location: "Building C - Floor 3",
        description: "Spindle bearing replacement",
        customerName: "ABC Manufacturing Ltd",
        status: "COMPLETED",
        note: "Maintenance completed successfully",
        customer_agreement: "Agreed",
        machineRefNo: "MCH-003",
        technicianName: "David Lee",
      },
      {
        id: "job-002",
        jobId: "JOB-004",
        date: "2026-01-28T00:00:00",
        location: "Factory Floor 2",
        description: "Hydraulic pump inspection and servicing",
        customerName: "XYZ Industries",
        status: "IN_PROGRESS",
        note: "Parts ordered",
        customer_agreement: "Pending",
        machineRefNo: "MCH-007",
        technicianName: "Ravi Kumar",
      },
      {
        id: "job-003",
        jobId: "JOB-005",
        date: "2026-02-02T00:00:00",
        location: "Warehouse B",
        description: "Conveyor belt motor replacement",
        customerName: "Global Logistics",
        status: "PENDING",
        machineRefNo: "MCH-012",
        technicianName: "Sarah Thompson",
      },
    ],
    services: [
      {
        contactPerson: null,
        customerID: "PAM2601089482",
        customerName: "Pamuditha Tillekeratne",
        customerTelephone: "0713304911",
        expectedVisitCount: 3,
        expectedVisitDate: "2026-02-01T00:00:00",
        expectedVisitNo: "EXPT_SV1",
        machineLocation01: "Wadduwa",
        machineLocation02: "",
        machineLocation03: "",
        machineRefNo: "Q454545",
        rowId: 268010,
        visitStatus: "COMPLETED",
        technicianName: "Samantha Silva",
      },
      {
        contactPerson: "John Manager",
        customerID: "CUS2601089483",
        customerName: "Nimal Perera",
        customerTelephone: "0771234567",
        expectedVisitCount: 5,
        expectedVisitDate: "2026-02-05T00:00:00",
        expectedVisitNo: "EXPT_SV2",
        machineLocation01: "Colombo",
        machineLocation02: "Level 3",
        machineLocation03: "Building A",
        machineRefNo: "M789012",
        rowId: 268011,
        visitStatus: "PENDING",
        technicianName: "Kamal Fernando",
      },
    ],
  };
}

export default function CustomerFeedbackMachinePage({ params }: PageProps) {
  // Unwrap the params Promise using React.use()
  const { serialNo } = use(params);
  const [servicesData, setServicesData] = useState<any[]>([]);
  const [jobsData, setJobsData] = useState<any[]>([]);

  const { getServicesBySerialNo, getJobsBySerialNo } = useApiConfig();

  // Console log the serial number
  useEffect(() => {
    console.log("Serial No Param:", serialNo);
    fetchServices();
    fetchJobs();
  }, [serialNo]);

  const fetchServices = async () => {
    try {
      const servicesData = await getServicesBySerialNo(serialNo);
      console.log("Fetched Services Data:", servicesData);
      setServicesData(servicesData);
    } catch (error) {
      console.error("Error fetching services by serial no:", error);
    }
  };

  const fetchJobs = async () => {
    try {
      const jobsData = await getJobsBySerialNo(serialNo);
      console.log("Fetched Jobs Data:", jobsData);
      setJobsData(jobsData);
    } catch (error) {
      console.error("Error fetching jobs by serial no:", error);
    }
  };

  return (
    <CustomerReviewSystem
      jobs={jobsData} // You'll need to fetch this data client-side
      services={servicesData} // You'll need to fetch this data client-side
      serialNo={serialNo}
    />
  );
}
