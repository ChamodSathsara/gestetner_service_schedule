import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Phone,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useApiConfig } from "@/hooks/apiconfig";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import QRCode from "react-qr-code";
import { Copy, Share2 } from "lucide-react";
import UnauthorizedDialog from "./UnauthorizedDialog";
import Swal from "sweetalert2";

interface Job {
  visitNo: any;
  rowId: any;
  id: string;
  jobId: string;
  date: string;
  location: string;
  description?: string;
  customerName?: string;
  daysLeft?: number;
  status: string;
  note?: string;
  customer_agreement?: string;
  machineRefNo?: string;
  serialNo?: string;
  expected_visit_no: number;
  phone_number?: string;
  type?: string; // Added type field
}

interface JobDetailsDialogProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  onInProgress: () => void;
  varient: "service" | "breakdown";
}

interface PreviousServiceData {
  exptsv1: string | null;
  exptsv2: string | null;
  exptsv3: string | null;
  exptsv4: string | null;
  exptsv5: string | null;
  exptsv6: string | null;
  sv1: string | null;
  sv2: string | null;
  sv3: string | null;
  sv4: string | null;
  sv5: string | null;
  sv6: string | null;
}

interface SolutionCategory {
  id: number;
  solutioN_CATEGORY: string;
  solutioN_SHORT_CATEGORY: string;
}

export function JobDetailsDialog({
  job,
  isOpen,
  onClose,
  onComplete,
  onInProgress,
  varient,
}: JobDetailsDialogProps) {
  const [jobNote, setJobNote] = useState("");
  const [solution, setSolution] = useState("");
  const [meterReadingValue, setMeterReadingValue] = useState("");
  const [recallReason, setRecallReason] = useState(""); // New state for recall reason
  const [isLoading, setIsLoading] = useState(false);
  const [showPreviousVisits, setShowPreviousVisits] = useState(false);
  const [previousServices, setPreviousServices] =
    useState<PreviousServiceData | null>();

  const [loadingPrevious, setLoadingPrevious] = useState(false);
  const [solutionCategories, setSolutionCategories] = useState<
    SolutionCategory[]
  >([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  const {
    updateBreakdownStatus,
    updateServiceVisitStatus,
    getPreviousServiceLists,
    showUnauthorizedDialog,
    setShowUnauthorizedDialog,
    getSolutionCategories,
    addRecallJob,
  } = useApiConfig();
  const { user } = useAuth();

  useEffect(() => {
    fetchSolutionCategories();
  }, []);

  const fetchSolutionCategories = async () => {
    try {
      const data = await getSolutionCategories();
      console.log("Solution Categories:", data);
      setSolutionCategories(data || []);
    } catch (error) {
      console.error("Error fetching solution categories:", error);
      // Fallback to hardcoded categories if API fails
    }
  };

  // Reset states when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setShowPreviousVisits(false);
      setPreviousServices(null);
      setJobNote("");
      setSolution("");
      setMeterReadingValue("");
      setSelectedCategoryId("");
      setRecallReason(""); // Reset recall reason
    }
  }, [isOpen]);

  if (!job) return null;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  const handleCall = () => {
    if (job.phone_number) {
      window.location.href = `tel:${job.phone_number}`;
    } else {
      toast.error("Phone number not available");
    }
  };

  const handleNavigate = () => {
    if (job.location && job.location !== "Something") {
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(job.location)}`;
      window.open(mapsUrl, "_blank");
    } else {
      toast.error("Location not available");
    }
  };

  const fetchPreviousServices = async () => {
    if (loadingPrevious || previousServices) return;

    setLoadingPrevious(true);
    try {
      const data: any = await getPreviousServiceLists(job.machineRefNo || "");
      setPreviousServices(data);
      console.log("Previous Services for job", job.jobId, ":", data);
    } catch (error) {
      console.error("Error fetching previous services:", error);
      toast.error("Failed to load previous visits");
    } finally {
      setLoadingPrevious(false);
    }
  };

  const handleViewPreviousVisits = () => {
    if (!showPreviousVisits && !previousServices) {
      fetchPreviousServices();
    }
    setShowPreviousVisits(!showPreviousVisits);
  };

  const renderPreviousVisitsTable = () => {
    if (!previousServices) return null;

    const rows = [];
    for (let i = 1; i <= 6; i++) {
      const expected =
        previousServices[`exptsv${i}` as keyof PreviousServiceData];
      const actual = previousServices[`sv${i}` as keyof PreviousServiceData];

      rows.push({
        index: i,
        expected: expected,
        actual: actual,
      });
    }

    return (
      <div className="mt-3 border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">
                  #
                </th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">
                  Expected
                </th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">
                  Actual
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.index}
                  className={`border-b border-gray-100 ${row.actual ? "bg-green-50" : "bg-blue-50"}`}
                >
                  <td className="px-3 py-2 font-medium text-gray-900">
                    {row.index}
                  </td>
                  <td className="px-3 py-2 text-gray-700">
                    {row.expected ? formatDate(row.expected) : "N/A"}
                  </td>
                  <td
                    className={`px-3 py-2 font-medium ${row.actual ? "text-green-700" : "text-blue-600"}`}
                  >
                    {row.actual ? formatDate(row.actual) : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const handleStarted = async () => {
    console.log("Starting job with meter reading:", meterReadingValue);

    if (!user?.tecH_CODE) {
      toast.error("User information not available");
      return;
    }

    // Check if recall reason is required and provided
    const isDueAndPending = job.type === "Due" && job.status === "pending";
    if (isDueAndPending && !recallReason.trim()) {
      toast.error("Please enter a recall reason");
      return;
    }

    setIsLoading(true);
    try {
      if (varient === "breakdown") {
        if (isDueAndPending) {
          const breackdownUpdate = await addRecallJob({
            techCode: user.tecH_CODE,
            jobId: parseInt(job.jobId),
            note: jobNote || "",
            reason: recallReason, // Include recall reason if applicable
          });
          console.log("Breakdown update response:", breackdownUpdate);
        } else {
          const breackdownUpdate = await updateBreakdownStatus({
            techCode: user.tecH_CODE,
            jobId: parseInt(job.jobId),
            machineRefNo: job.machineRefNo || "",
            serialNo: job.serialNo || "",
            jobStatus: "started",
            note: jobNote || "",
            // recallReason: isDueAndPending ? recallReason : undefined, // Include recall reason if applicable
          });
          console.log("Breakdown update response:", breackdownUpdate);
        }
      } else {
        // Service API call with meter reading
        const updateServiceresponse = await updateServiceVisitStatus({
          techCode: user.tecH_CODE,
          visitNo: job.expected_visit_no || 1,
          jobId: parseInt(job.jobId),
          machineRefNo: job.machineRefNo || "",
          jobStatus: "started",
          meterReadingValue: meterReadingValue
            ? parseInt(meterReadingValue)
            : 10,
          // recallReason: isDueAndPending ? recallReason : undefined, // Include recall reason if applicable
        });
        console.log("Service visit update response:", updateServiceresponse);
      }

      toast.success("Job started successfully");
      onInProgress();
      setJobNote("");
      setMeterReadingValue("");
      setRecallReason("");
    } catch (error) {
      console.error("Error starting job:", error);
      toast.error("Failed to start job. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleted = async () => {
    if (!user?.tecH_CODE) {
      toast.error("User information not available");
      return;
    }

    // Validate solution category is selected
    if (!selectedCategoryId) {
      toast.error("Please select a solution category");
      return;
    }

    // Validate solution text is entered
    if (!solution.trim()) {
      toast.error("Please enter a solution description");
      return;
    }

    // Get the selected category's solutionCategory value
    const selectedCategory = solutionCategories.find(
      (cat) => cat.id === parseInt(selectedCategoryId),
    );

    if (!selectedCategory) {
      toast.error("Invalid solution category selected");
      return;
    }

    setIsLoading(true);
    try {
      if (varient === "breakdown") {
        await updateBreakdownStatus({
          techCode: user.tecH_CODE,
          jobId: parseInt(job.jobId),
          machineRefNo: job.machineRefNo || "",
          serialNo: job.serialNo || "",
          jobStatus: "COMPLETED",
          note: solution || "",
          solutionCategory: selectedCategory.solutioN_SHORT_CATEGORY, // Pass only the category name
        });
      } else {
        // Service API call with meter reading
        await updateServiceVisitStatus({
          techCode: user.tecH_CODE,
          jobId: parseInt(job.jobId),
          visitNo: job.expected_visit_no || 1,
          machineRefNo: job.machineRefNo || "",
          jobStatus: "COMPLETED",
          solution: solution || "",
          solutionCategory: selectedCategory.solutioN_SHORT_CATEGORY, // Pass only the category name
          meterReadingValue: meterReadingValue
            ? parseInt(meterReadingValue)
            : 3,
        });
      }

      toast.success("Job completed successfully");
      onComplete();
      setSolution("");
      setJobNote("");
      setMeterReadingValue("");
      setSelectedCategoryId("");
      onClose();
    } catch (error) {
      console.error("Error completing job:", error);
      toast.error("Failed to complete job. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setJobNote("");
    setSolution("");
    setMeterReadingValue("");
    setSelectedCategoryId("");
    setRecallReason(""); // Reset recall reason
    setShowPreviousVisits(false);
    setPreviousServices(null);
    onClose();
  };

  const isPending = job.status === "pending";
  const isStarted = job.status === "started";
  const isDueAndPending = job.type === "Due" && isPending; // Check if type is "Due" and status is "pending"
  console.log("Job_Type ", job.type);
  console.log(job);
  console.log("job.status ", job.status);

  // Beautiful alert function using SweetAlert2
  const showLinkCopiedAlert = () => {
    Swal.fire({
      title: "Link Copied!",
      text: "Review link copied to clipboard. Share it with your customer.",
      icon: "success",
      confirmButtonText: "Great!",
      confirmButtonColor: "#2563eb",
      timer: 3000,
      timerProgressBar: true,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <UnauthorizedDialog
          isOpen={showUnauthorizedDialog}
          onClose={() => setShowUnauthorizedDialog(false)}
        />
        <DialogContent
          className="bg-white border-gray-200 max-h-[90vh] overflow-y-auto sm:max-w-[425px]"
          data-mobile-bottom="true"
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              Job Details
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              Review and update job information
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Job Info */}
            <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg space-y-3 border border-gray-200">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Job ID
                </p>
                <p className="font-bold text-lg text-gray-900 mt-1">
                  {job.jobId}
                </p>
              </div>
              {job.description && (
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Description
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    {job.description}
                  </p>
                </div>
              )}
              {job.customerName && (
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Customer
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    {job.customerName}
                  </p>
                </div>
              )}
              <div>
                <p className="font-medium flex items-center gap-2 text-gray-900 mt-1">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  {job.location}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Status
                  </p>
                  <p className="font-bold capitalize text-gray-900 mt-1">
                    {job.status}
                  </p>
                </div>
                {varient === "service" && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Time Left
                    </p>
                    <p className="font-bold text-red-600 mt-1">
                      {job.daysLeft}
                    </p>
                  </div>
                )}
                {varient === "breakdown" && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Agreement
                    </p>
                    <p className="font-bold text-red-600 mt-1">
                      {job.customer_agreement}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleCall}
                variant="outline"
                className="border-blue-200 text-blue-700 hover:bg-blue-50 h-11"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call
              </Button>
              <Button
                onClick={handleNavigate}
                variant="outline"
                className="border-green-200 text-green-700 hover:bg-green-50 h-11"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Navigate
              </Button>
            </div>

            {/* Previous Visits - Only for service variant */}
            {varient === "service" && (
              <div>
                <Button
                  onClick={handleViewPreviousVisits}
                  variant="outline"
                  className="w-full border-purple-200 text-purple-700 hover:bg-purple-50 h-11 font-semibold"
                  disabled={loadingPrevious}
                >
                  {loadingPrevious ? "Loading..." : "View Previous Visits"}
                  {showPreviousVisits ? (
                    <ChevronUp className="w-4 h-4 ml-2" />
                  ) : (
                    <ChevronDown className="w-4 h-4 ml-2" />
                  )}
                </Button>

                {showPreviousVisits && renderPreviousVisitsTable()}
              </div>
            )}

            {/* Start Job Section - Only show when pending */}
            {isPending && (
              <div className="space-y-4">
                {varient === "breakdown" ? (
                  <div>
                    <label className="text-sm font-semibold text-gray-900 block mb-2">
                      Add Work Note
                    </label>
                    <textarea
                      value={jobNote}
                      onChange={(e) => setJobNote(e.target.value)}
                      placeholder="Enter work notes, observations, or updates..."
                      className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={4}
                      disabled={isLoading}
                    />
                  </div>
                ) : (
                  <div>
                    <label className="text-sm font-semibold text-gray-900 block mb-2">
                      Meter Reading Value
                    </label>
                    <input
                      type="number"
                      value={meterReadingValue}
                      onChange={(e) => setMeterReadingValue(e.target.value)}
                      placeholder="Enter meter reading value..."
                      className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={isLoading}
                    />
                  </div>
                )}

                {/* Recall Reason - Only show for Due type and pending status */}
                {isDueAndPending && (
                  <div>
                    <label className="text-sm font-semibold text-gray-900 block mb-2">
                      Recall Reason <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={recallReason}
                      onChange={(e) => setRecallReason(e.target.value)}
                      placeholder="Enter the reason for this recall visit..."
                      className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      rows={3}
                      disabled={isLoading}
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 h-11 font-semibold"
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleStarted}
                    className="bg-blue-600 hover:bg-blue-700 text-white h-11 font-semibold disabled:bg-gray-400"
                    disabled={
                      isLoading || (isDueAndPending && !recallReason.trim())
                    }
                  >
                    {isLoading ? "Starting..." : "Start Job"}
                  </Button>
                </div>
              </div>
            )}

            {/* Complete Job Section - Only show when started */}
            {isStarted && (
              <div className="space-y-4">
                {/* Solution Category Dropdown */}
                <div>
                  <label className="text-sm font-semibold text-gray-900 block mb-2">
                    Solution Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedCategoryId}
                    onChange={(e) => setSelectedCategoryId(e.target.value)}
                    className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    disabled={isLoading}
                  >
                    <option value="">Select a category...</option>
                    {solutionCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.solutioN_CATEGORY} (
                        {category.solutioN_SHORT_CATEGORY})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Solution Textarea */}
                <div>
                  <label className="text-sm font-semibold text-gray-900 block mb-2">
                    Solution <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    placeholder="Enter the solution or work completed..."
                    className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows={4}
                    disabled={isLoading}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Button
                    onClick={onClose}
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 h-11 font-semibold"
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCompleted}
                    className="bg-green-600 hover:bg-green-700 text-white h-11 font-semibold disabled:bg-gray-400"
                    disabled={
                      isLoading || !selectedCategoryId || !solution.trim()
                    }
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    {isLoading ? "Completing..." : "Complete Job"}
                  </Button>
                </div>
              </div>
            )}

            {/* Completed Status - Show info only */}
            {(job.status === "completed" || job.status === "complete") && (
              <div className="p-6 bg-green-50 border border-green-200 rounded-lg text-center space-y-6">
                <div>
                  <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-3" />
                  <p className="font-semibold text-xl text-green-800">
                    This job has been completed!
                  </p>
                  <p className="text-green-700 mt-1">
                    Thank you! Please ask the customer to leave a quick review.
                  </p>
                </div>

                {/* QR Code & Sharing Section */}
                <div className="flex flex-col items-center gap-5 bg-white p-6 rounded-xl shadow-sm border">
                  <p className="font-medium text-gray-800">
                    Customer Review Link
                  </p>

                  {/* QR Code */}
                  <div className="p-4 bg-white rounded-lg border">
                    <QRCode
                      value={
                        varient === "service"
                          ? `${process.env.NEXT_PUBLIC_FRONTEND_URL}customer-feedback-machines/${job.serialNo}/service/${job.jobId}?visitNo=${job.expected_visit_no - 1}`
                          : `${process.env.NEXT_PUBLIC_FRONTEND_URL}customer-feedback-machines/${job.serialNo}/job/${job.jobId}`
                      }
                      size={180}
                      level="Q"
                      fgColor="#111827"
                      bgColor="#ffffff"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
                    {/* Copy Link Button */}
                    <Button
                      onClick={() => {
                        const link =
                          varient === "service"
                            ? `${process.env.NEXT_PUBLIC_FRONTEND_URL}customer-feedback-machines/${job.serialNo}/service/${job.jobId}?visitNo=${job.expected_visit_no - 1}`
                            : `${process.env.NEXT_PUBLIC_FRONTEND_URL}customer-feedback-machines/${job.serialNo}/job/${job.jobId}`;

                        navigator.clipboard.writeText(link);
                        showLinkCopiedAlert();
                      }}
                      variant="outline"
                      className="flex-1 flex items-center justify-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Copy Link
                    </Button>

                    {/* Native Share Button (works great on mobile) */}
                    <Button
                      onClick={() => {
                        const link =
                          varient === "service"
                            ? `${process.env.NEXT_PUBLIC_FRONTEND_URL}customer-feedback-machines/${job.serialNo}/service/${job.jobId}?visitNo=${job.expected_visit_no - 1}`
                            : `${process.env.NEXT_PUBLIC_FRONTEND_URL}customer-feedback-machines/${job.serialNo}/job/${job.jobId}`;

                        if (navigator.share) {
                          navigator
                            .share({
                              title: "Review Your Service",
                              text: "We'd love your feedback!",
                              url: link,
                            })
                            .catch(() => {
                              navigator.clipboard.writeText(link);
                              showLinkCopiedAlert();
                            });
                        } else {
                          navigator.clipboard.writeText(link);
                          showLinkCopiedAlert();
                        }
                      }}
                      variant="default"
                      className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Share2 className="w-4 h-4" />
                      Share with Customer
                    </Button>
                  </div>

                  {/* Optional: Display the link for reference */}
                  <p className="text-xs text-gray-500 break-all">
                    {varient === "service"
                      ? `${process.env.NEXT_PUBLIC_FRONTEND_URL}customer-feedback-machines/${job.serialNo}/service/${job.jobId}?visitNo=${job.expected_visit_no - 1}`
                      : `${process.env.NEXT_PUBLIC_FRONTEND_URL}customer-feedback-machines/${job.serialNo}/job/${job.jobId}`}
                  </p>
                </div>

                <Button
                  onClick={onClose}
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Close
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
