"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, use } from "react";
import { useApiConfig } from "@/hooks/apiconfig";
import UnauthorizedDialog from "@/components/technician/UnauthorizedDialog";
import { Loading } from "@/components/technician/Loading";
import { se } from "date-fns/locale";
import { useSearchParams } from "next/navigation";

export default function JobReviewPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const serialNo = params.serialNo as string;
  const jobId = params.jobId as string;
  const companyID = searchParams.get("CompanyID");

  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  console.log("Company ID from params: ", companyID);
  const {
    getJobBySerialNoAndMachineNo,
    addFeedback,
    showUnauthorizedDialog,
    setShowUnauthorizedDialog,
  } = useApiConfig();
  const [jobsData, setJobsData] = useState<any>(null);

  console.log("serialNo: ", serialNo);
  console.log("jobId: ", jobId);

  useEffect(() => {
    fetchJobDetails();
  }, []);

  const fetchJobDetails = async () => {
    try {
      setIsLoading(true);
      const jobDetails = await getJobBySerialNoAndMachineNo(
        serialNo,
        jobId,
        companyID || "",
      );

      setJobsData(jobDetails);
      setIsLoading(false);
      console.log("Fetched Job Details:", jobDetails);
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  };

  const handleSubmit = async () => {
    if (rating === 0) return;

    if (!customerName.trim() || !mobileNumber.trim()) {
      alert("Please enter customer name and mobile number");
      return;
    }

    setIsSubmitting(true);

    const reviewData = {
      review: review,
      rating: rating,
      mobileNo: mobileNumber,
      customerName: customerName,
      jobId: jobId,
      type: "job" as const,
      companyId: companyID || "",
    };

    try {
      console.log("Submitting review:", reviewData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const result = await addFeedbackDb(reviewData);
      alert("Review submitted successfully!");
      router.back();
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addFeedbackDb = async (data: any) => {
    try {
      const response = await addFeedback(data);
      console.log("Feedback added successfully:", response);
      return { success: true };
    } catch (error) {
      console.error("Error adding feedback:", error);
      return { success: false };
    }
  };
  if (isLoading) {
    return <Loading fullScreen message="Fetching job details..." size="md" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-6">
      <UnauthorizedDialog
        isOpen={showUnauthorizedDialog}
        onClose={() => setShowUnauthorizedDialog(false)}
      />
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <button
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
            Back
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Leave a Review
          </h1>
          <p className="text-gray-600 mt-2">
            Share your experience with this service
          </p>
        </div>

        {/* Job Info Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">{jobId}</h2>
              <span className="inline-block px-3 py-1 mt-2 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                {jobsData?.status || "N/A"}
              </span>
            </div>
          </div>

          <p className="text-gray-600 mb-4">Spindle bearing replacement</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            <div className="flex items-center text-gray-700">
              <svg
                className="w-5 h-5 mr-2 text-blue-500"
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
                <p className="font-medium">{jobsData?.date || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-center text-gray-700">
              <svg
                className="w-5 h-5 mr-2 text-blue-500"
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
                <p className="font-medium">{jobsData?.location || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-center text-gray-700">
              <svg
                className="w-5 h-5 mr-2 text-blue-500"
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
                <p className="font-medium">
                  {jobsData?.technicianName || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Review Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            How would you rate this service?
          </h3>

          {/* Customer Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Enter Your Name
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter customer name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="07XXXXXXXX"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Star Rating */}
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110"
                disabled={isSubmitting}
              >
                <svg
                  className={`w-12 h-12 md:w-14 md:h-14 ${
                    star <= (hoveredRating || rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </button>
            ))}
          </div>

          {/* Review Text */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Share your experience
            </label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Tell us about your experience with this service. What went well? Any suggestions for improvement?"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={5}
              disabled={isSubmitting}
            />
            <p className="text-sm text-gray-500 mt-2">
              {review.length} characters
            </p>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={rating === 0 || isSubmitting}
            className={`w-full py-4 rounded-lg font-semibold text-white transition-all ${
              rating === 0 || isSubmitting
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 active:scale-95"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </div>
    </div>
  );
}
