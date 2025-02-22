import React, { useState, useContext, useEffect } from "react";
import EmpDashboard from "../pages/EmpDashboard";
import { EmployeeContext } from "../context/EmployeeContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmpShowCauseNotice = () => {
  const { employees } = useContext(EmployeeContext);
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedEmp, setSelectedEmp] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCauseNotices, setShowCauseNotices] = useState([]);

  // Extract unique departments
  const departments = [...new Set(employees.map((emp) => emp.department))];

  // Get logged-in employee ID
  const storedUser = localStorage.getItem("employeeLogin");
  const loggedInEmployeeId = storedUser
    ? JSON.parse(storedUser).data.userResponse._id
    : null;

  // Filter employees based on selected department (excluding logged-in user)
  const filteredEmployees = employees.filter(
    (emp) => emp.department === selectedDept && emp._id !== loggedInEmployeeId
  );

  // Fetch previous show cause notices
  useEffect(() => {
    const getShowCauseNotice = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/api/v1/user/get/showcause/notice`
        );
        setShowCauseNotices(response.data.showCauseNotices);
      } catch (error) {
        console.error("Error fetching show cause notices:", error);
      }
    };
    getShowCauseNotice();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Find selected employee details
    const selectedEmployee = employees.find((emp) => emp._id === selectedEmp);
    setLoading(true);

    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/showcause/notice`,
        {
          employeeId: loggedInEmployeeId,
          department: selectedDept,
          reason,
          selectedEmployee: {
            id: selectedEmp,
            name: selectedEmployee?.firstName || "Unknown",
            employeeCode: selectedEmployee?.employeeCode || "N/A",
          },
        }
      );

      if (response.status === 201) {
        setSelectedDept("");
        setReason("");
        setSelectedEmp(""); // Reset form
        toast.success("Show Cause Notice Submitted.", {
          position: "top-right",
          autoClose: 1000,
        });

        // Refresh notices after submission
        setShowCauseNotices((prev) => [response.data.newNotice, ...prev]);
      }
    } catch (error) {
      console.error("Error submitting Show Cause Notice:", error);
      toast.error(
        error.response?.data?.message || "Failed to submit Show Cause Notice",
        {
          position: "top-right",
          autoClose: 1000,
        }
      );
    }

    setLoading(false);
  };

  return (
    <>
      <EmpDashboard />
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          {/* Header */}
          <div className="bg-blue-600 text-white text-center py-5 rounded-lg mb-5">
            <h2 className="text-2xl font-semibold">Show Cause Notice</h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Department */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Select Department
              </label>
              <select
                required
                className="w-full border px-3 py-2 rounded-md"
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
              >
                <option value="">-- Select Department --</option>
                {departments.map((dept, index) => (
                  <option key={index} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Employee */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Select Employee
              </label>
              <select
                className="w-full border px-3 py-2 rounded-md"
                value={selectedEmp}
                onChange={(e) => setSelectedEmp(e.target.value)}
                disabled={!selectedDept}
                required
              >
                <option value="">-- Select Employee --</option>
                {filteredEmployees.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.firstName} ({emp.employeeCode})
                  </option>
                ))}
              </select>
            </div>

            {/* Reason */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Reason</label>
              <textarea
                className="w-full border px-3 py-2 rounded-md"
                rows="4"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              ></textarea>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md w-full flex justify-center items-center"
              disabled={!selectedDept || !selectedEmp || !reason || loading}
            >
              {loading ? "Submitting..." : "Submit Show Cause Notice"}
            </button>
          </form>
        </div>

        {/* Show Cause Notices Card List */}
        <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            Previous Show Cause Notices
          </h2>
          {Array.isArray(showCauseNotices) && showCauseNotices.length > 0 ? (
            <div className="space-y-6">
              {showCauseNotices.map((notice, index) => {
                if (!notice || !notice.selectedEmployee) return null; // Avoid undefined errors

                return (
                  <div
                    key={notice._id || index} // Ensure unique keys
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out border-l-4 border-blue-500 hover:bg-gray-50"
                  >
                    <p className="text-gray-800 font-semibold">
                      <span className="font-medium text-blue-600">
                        Complaint to :
                      </span>{" "}
                      {notice.selectedEmployee?.name ?? "Unknown"}
                    </p>
                    <p className="text-gray-800 font-semibold">
                      <span className="font-medium text-blue-600">
                        Department:
                      </span>{" "}
                      {notice.department ?? "N/A"}
                    </p>
                    <p className="text-gray-800 font-semibold">
                      <span className="font-medium text-blue-600">Status:</span>{" "}
                      <span
                        className={`px-3 py-1 text-sm font-semibold text-white rounded-full ${
                          notice.status === "pending"
                            ? "bg-yellow-500"
                            : notice.status === "Reviewed"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }`}
                      >
                        {notice.status}
                      </span>
                    </p>
                    <p className="text-gray-800 font-semibold">
                      <span className="font-medium text-blue-600">Reason:</span>{" "}
                      {notice.reason ?? "No reason provided"}
                    </p>
                    <p className="text-gray-700 mt-2">
                      <span className="font-medium text-blue-600">
                        Issued Date:
                      </span>{" "}
                      {notice.issuedAt
                        ? new Date(notice.issuedAt).toLocaleDateString()
                        : "Unknown"}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-600">No previous notices found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default EmpShowCauseNotice;
