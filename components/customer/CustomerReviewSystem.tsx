"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useApiConfig } from "@/hooks/apiconfig";
import UnauthorizedDialog from "../technician/UnauthorizedDialog";

interface Service {
  techName: string;
  contactPerson: string | null;
  customerID: string;
  customerName: string;
  customerTelephone: string;
  expectedVisitCount: number;
  expectedVisitDate: string;
  expectedVisitNo: string;
  machineLocation01: string;
  machineLocation02: string;
  machineLocation03: string;
  machineRefNo: string;
  rowId: number;
  visitStatus: string;
}

interface Job {
  id: string;
  jobId: string;
  date: string;
  location: string;
  description?: string;
  customerName?: string;
  status: string;
  note?: string;
  customer_agreement?: string;
  machineRefNo?: string;
  technicianName?: string;
}

interface CustomerReviewSystemProps {
  services: Service[];
  jobs: Job[];
  serialNo: string;
}

const CustomerReviewSystem: React.FC<CustomerReviewSystemProps> = ({
  services,
  jobs,
  serialNo,
}) => {
  const [activeTab, setActiveTab] = useState<"jobs" | "services">("jobs");
  const router = useRouter();
  const {
    getServiceBySerialNoAndMachineNo,
    getJobBySerialNoAndMachineNo,
    setShowUnauthorizedDialog,
    showUnauthorizedDialog,
  } = useApiConfig();
  const [servicesData, setServicesData] = useState<any>();
  const [jobsData, setJobsData] = useState<any>();

  const handleServiceClick = async (service: Service) => {
    const visitNo = service.expectedVisitCount;

    await fetchServiceDetails(service);

    router.push(
      `/customer-feedback-machines/${serialNo}/service/${service.rowId}?visitNo=${visitNo}`,
    );
  };

  const fetchServiceDetails = async (service: Service) => {
    try {
      const serviceDetails = await getServiceBySerialNoAndMachineNo({
        serialNo: serialNo,
        visitNo: service.expectedVisitCount,
        rowId: service.rowId,
      });
      setServicesData(serviceDetails);
      console.log("Fetched Service Details:", serviceDetails);
    } catch (error) {
      console.error("Error fetching service details:", error);
    }
  };

  const fetchJobDetails = async (job: Job) => {
    try {
      const jobDetails = await getJobBySerialNoAndMachineNo(
        serialNo,
        job.jobId,
      );

      setJobsData(jobDetails);
      console.log("Fetched Job Details:", jobDetails);
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  };

  const handleJobClick = (job: Job) => {
    fetchJobDetails(job);
    router.push(`/customer-feedback-machines/${serialNo}/job/${job.jobId}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    console.log("Status:    __", status);
    const statusUpper = status.toUpperCase();
    switch (statusUpper) {
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getLocation = (service: Service) => {
    const locations = [
      service.machineLocation01,
      service.machineLocation02,
      service.machineLocation03,
    ]
      .filter(Boolean)
      .join(", ");
    return locations || "No location specified";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-6">
      <UnauthorizedDialog
        isOpen={showUnauthorizedDialog}
        onClose={() => setShowUnauthorizedDialog(false)}
      />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {/* <button
            onClick={() => router.back()}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to List
          </button> */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Leave a Review
          </h1>
          <p className="text-gray-600 mt-2">
            Share your experience with this service
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
          <div className="flex border-b">
            {/* Job tab */}
            <button
              onClick={() => setActiveTab("jobs")}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-all ${
                activeTab === "jobs"
                  ? "bg-blue-500 text-white border-b-4 border-blue-700"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              Jobs ({jobs.length})
            </button>

            {/* Service tab */}
            <button
              onClick={() => setActiveTab("services")}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-all ${
                activeTab === "services"
                  ? "bg-blue-500 text-white border-b-4 border-blue-700"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              Services ({services.length})
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {/* jobs Content */}
          {activeTab === "jobs" && (
            <>
              {jobs.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <p className="text-gray-500">No jobs available</p>
                </div>
              ) : (
                jobs.map((job, index) => (
                  <div
                    key={index}
                    onClick={() => handleJobClick(job)}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1 duration-200"
                  >
                    <div className="p-5 md:p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                        <div className="mb-3 md:mb-0">
                          <h3 className="text-xl font-bold text-gray-800 mb-1">
                            {job.jobId}
                          </h3>
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                              job.status,
                            )}`}
                          >
                            {job.status}
                          </span>
                        </div>
                      </div>

                      {job.description && (
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {job.description}
                        </p>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center text-gray-700">
                          <svg
                            className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <div>
                            <p className="text-xs text-gray-500">Date</p>
                            <p className="font-medium">
                              {formatDate(job.date)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center text-gray-700">
                          <svg
                            className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <div>
                            <p className="text-xs text-gray-500">Location</p>
                            <p className="font-medium truncate">
                              {job.location}
                            </p>
                          </div>
                        </div>

                        {job.technicianName && (
                          <div className="flex items-center text-gray-700">
                            <svg
                              className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                            <div>
                              <p className="text-xs text-gray-500">
                                Technician
                              </p>
                              <p className="font-medium truncate">
                                {job.technicianName}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {job.machineRefNo && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <p className="text-sm text-gray-600">
                            <span className="font-semibold">Machine Ref:</span>{" "}
                            {job.machineRefNo}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </>
          )}

          {/* services Content */}
          {activeTab === "services" && (
            <>
              {services.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <p className="text-gray-500">No services available</p>
                </div>
              ) : (
                services.map((service, index) => (
                  <div
                    key={index}
                    onClick={() => handleServiceClick(service)}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1 duration-200"
                  >
                    <div className="p-5 md:p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                        <div className="mb-3 md:mb-0">
                          <h3 className="text-xl font-bold text-gray-800 mb-1">
                            {service.machineRefNo}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">
                            {service.expectedVisitNo}
                          </p>
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                              service.visitStatus,
                            )}`}
                          >
                            {service.visitStatus}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center text-gray-700">
                          <svg
                            className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <div>
                            <p className="text-xs text-gray-500">Date</p>
                            <p className="font-medium">
                              {formatDate(service.expectedVisitDate)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center text-gray-700">
                          <svg
                            className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <div>
                            <p className="text-xs text-gray-500">Location</p>
                            <p className="font-medium truncate">
                              {getLocation(service)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center text-gray-700">
                          <svg
                            className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          <div>
                            <p className="text-xs text-gray-500">Technician</p>
                            <p className="font-medium truncate">
                              {service.techName}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200">
                        <div>
                          <p className="text-sm text-gray-600">
                            <span className="font-semibold">Machine Ref:</span>{" "}
                            {service.machineRefNo}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            <span className="font-semibold">Customer ID:</span>{" "}
                            {service.customerID}
                          </p>
                        </div>
                        {service.customerTelephone && (
                          <div>
                            <p className="text-sm text-gray-600">
                              <span className="font-semibold">Phone:</span>{" "}
                              {service.customerTelephone}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerReviewSystem;
