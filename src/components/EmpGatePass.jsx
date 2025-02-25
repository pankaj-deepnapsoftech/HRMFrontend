import { useState, useEffect } from "react";
import axios from "axios";
import EmpDashboard from "../pages/EmpDashboard";
import { toast } from "react-toastify";

const EmpGatePass = () => {
  const [reason, setReason] = useState("");
  const [otherReason, setOtherReason] = useState(""); // Store other reason input
  const [totalKm, setTotalKm] = useState("");
  const [companyWorkReason, setCompanyWorkReason] = useState(""); // Reason for going for company work
  const [paymentPerKm] = useState(5); // Example: ₹5 per km
  const [loading, setLoading] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [previousRequests, setPreviousRequests] = useState([]); // Store previous requests

  // ✅ Use useEffect to set employeeId once
  useEffect(() => {
    const storedUser = localStorage.getItem("employeeLogin");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setEmployeeId(parsedUser.data.userResponse._id);
    }
  }, []); // Empty dependency array ensures this runs only once

  // Fetch Previous Requests
  useEffect(() => {
    const fetchPreviousRequests = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/api/v1/user/employee/gatepass/all/${employeeId}`
        );
        setPreviousRequests(response.data.gatePassRequests);
      } catch (error) {
        toast.error(`Error fetching previous gate pass requests:  ${error}`);
      }
    };

    if (employeeId) {
      fetchPreviousRequests();
    }
  }, [employeeId]);

  // Calculate Total Payment
  const totalPayment = totalKm ? totalKm * paymentPerKm : 0;

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newRequest = {
        employeeId,
        reason: reason === "Other" ? otherReason : reason, // If "Other", store the entered reason
        ...(reason === "Company Work" && {
          totalKm,
          companyWorkReason,
          totalPayment,
        }),
        status: "Pending", // Assuming new requests are always "Pending"
        requestedAt: new Date().toISOString(), // Use current timestamp
      };

      await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/employee/gatepass/request`,
        newRequest
      );

      // ✅ Update UI immediately
      setPreviousRequests((prevRequests) => [newRequest, ...prevRequests]);

      toast.success("Gate Pass Send For Approval!", {
        position: "top-right",
        autoClose: 1000,
      });

      // ✅ Reset the form fields
      setReason("");
      setOtherReason("");
      setTotalKm("");
      setCompanyWorkReason("");
    } catch (error) {

      toast.error(
        error.response.data.message || "Failed to submit gate pass request.",
        {
          position: "top-right",
          autoClose: 1000,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <EmpDashboard />
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="bg-blue-600 text-white text-center py-6 rounded-lg shadow-xl">
            <h2 className="text-3xl font-semibold">Request Gate Pass</h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 mt-8 rounded-lg shadow-md"
          >
            {/* Reason Selection */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Select Reason
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                required
              >
                <option value="">Select</option>
                <option value="Company Work">Company Work</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Show Additional Reason Input for "Other" */}
            {reason === "Other" && (
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Enter Reason
                </label>
                <input
                  type="text"
                  value={otherReason}
                  onChange={(e) => setOtherReason(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
              </div>
            )}

            {/* Show Total Kilometer and Reason Fields for "Company Work" */}
            {reason === "Company Work" && (
              <div className="mb-6">
                {/* Total Kilometers */}
                <label className="block text-gray-700 font-semibold mb-2">
                  Enter Total Kilometers
                </label>
                <input
                  type="number"
                  value={totalKm}
                  onChange={(e) => setTotalKm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                  required
                />

                {/* Reason for Company Work */}
                <label className="block text-gray-700 font-semibold mb-2 mt-6">
                  Reason for Company Work
                </label>
                <input
                  type="text"
                  value={companyWorkReason}
                  onChange={(e) => setCompanyWorkReason(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                  required
                />

                {/* Display Total Payment */}
                <p className="mt-4 text-gray-700">
                  <strong>Total Payment:</strong> ₹{totalPayment}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </form>

          {/* Display Previous Requests */}
          {previousRequests.length > 0 && (
            <div className="mt-8">
              <h3 className="text-3xl font-semibold mb-6 text-gray-900">
                Previous Requests
              </h3>
              <div className="space-y-6">
                {previousRequests.map((request) => (
                  <div
                    key={request._id}
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out border-l-4 border-blue-500 hover:bg-gray-50"
                  >
                    <p className="text-gray-800 font-semibold">
                      <span className="font-medium text-blue-600">Reason:</span>{" "}
                      {request.reason}
                    </p>
                    {request.status && (
                      <p className="text-gray-700 mt-2 ">
                        <span className="font-medium text-blue-600">
                          Status :
                        </span>{" "}
                        <span
                          className={`px-3 py-1 text-sm font-semibold text-white rounded-full ${
                            request.status === "Approved"
                              ? "bg-green-500"
                              : request.status === "Rejected"
                              ? "bg-red-500"
                              : "bg-yellow-500"
                          }`}
                        >
                          {request.status}
                        </span>{" "}
                      </p>
                    )}
                    {request.totalKm && (
                      <p className="text-gray-700 mt-2">
                        <span className="font-medium text-blue-600">
                          Total Kilometers:
                        </span>{" "}
                        {request.totalKm}
                      </p>
                    )}
                    {request.companyWorkReason && (
                      <p className="text-gray-700 mt-2">
                        <span className="font-medium text-blue-600">
                          Company Work Reason:
                        </span>{" "}
                        {request.companyWorkReason}
                      </p>
                    )}
                    <p className="text-gray-700 mt-2">
                      <span className="font-medium text-blue-600">
                        Request Date:
                      </span>{" "}
                      {new Date(request.requestedAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EmpGatePass;
