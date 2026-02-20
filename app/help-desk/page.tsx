// components/HelpDesk.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useApiConfig } from "@/hooks/apiconfig";

export default function HelpDesk() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    jobId: "",
    problem: "",
    mobileNumber: "",
    priority: "normal",
  });
  const { addHelpDeskMessage } = useApiConfig();

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleComplete = async () => {
    // Validate form
    if (!formData.jobId || !formData.problem || !formData.mobileNumber) {
      Swal.fire({
        title: "Missing Information",
        text: "Please fill in all required fields",
        icon: "warning",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    // Validate mobile number (basic validation)
    if (!/^\d{10,}$/.test(formData.mobileNumber.replace(/[^0-9]/g, ""))) {
      Swal.fire({
        title: "Invalid Mobile Number",
        text: "Please enter a valid mobile number",
        icon: "error",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    try {
      const data = await addHelpDeskMessage(formData);
      console.log("Help desk request submitted:", data);

      // Show success alert
      Swal.fire({
        title: "Request Submitted!",
        text: "We will respond quickly to your help desk request",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#2563eb",
        timer: 3000,
        timerProgressBar: true,
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      }).then(() => {
        // Go back to previous page
        router.back();
      });
    } catch (error) {
      console.error("Error submitting help desk request:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to submit request. Please try again.",
        icon: "error",
        confirmButtonColor: "#2563eb",
      });
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="min-h-[calc(100vh-140px)] bg-gray-50 dark:bg-gray-900 px-4 py-8 md:py-12">
      <div className="mx-auto max-w-md md:max-w-2xl">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="mb-4 flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg
              className="h-5 w-5 mr-2"
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
            Back
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Help Desk
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Submit your support request and we'll respond quickly
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-800 md:p-8 md:shadow">
          <form className="space-y-6">
            {/* Job ID */}
            <div>
              <label
                htmlFor="jobId"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Job ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="jobId"
                name="jobId"
                value={formData.jobId}
                onChange={handleInputChange}
                placeholder="Enter job ID"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
                required
              />
            </div>

            {/* Problem Description */}
            <div>
              <label
                htmlFor="problem"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                What is the problem? <span className="text-red-500">*</span>
              </label>
              <textarea
                id="problem"
                name="problem"
                value={formData.problem}
                onChange={handleInputChange}
                placeholder="Describe the issue you're facing..."
                rows={5}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 resize-none"
                required
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label
                htmlFor="mobileNumber"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Working Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                placeholder="Enter your mobile number"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
                required
              />
            </div>

            {/* Priority Dropdown */}
            <div>
              <label
                htmlFor="priority"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Priority <span className="text-red-500">*</span>
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                required
              >
                <option value="urgent">Urgent</option>
                <option value="not-urgent">Not Urgent</option>
                <option value="normal">Normal</option>
                <option value="low">Low</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 rounded-lg border border-gray-300 py-3 px-6 font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleComplete}
                className="flex-1 rounded-lg bg-blue-600 py-3 px-6 font-medium text-white hover:bg-blue-700 active:bg-blue-800"
              >
                Complete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
