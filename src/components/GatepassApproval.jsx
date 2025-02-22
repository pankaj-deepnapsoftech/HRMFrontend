import { useContext, useEffect, useState } from "react";
import axios from "axios";
import MainDashboard from "../pages/MainDashboard";
import { EmployeeContext } from "../context/EmployeeContext";
import { toast } from "react-toastify";

const GatepassApproval = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { employees, setRefresh } = useContext(EmployeeContext);
  const [filter, setFilter] = useState("all"); // "all", "week", "month"

  // Fetch all gate pass requests
  useEffect(() => {
    if (employees.length === 0) return;

    const fetchGatePassRequests = async () => {
      try {
        setLoading(true);
        const allRequests = [];

        const responses = await Promise.all(
          employees.map(async (employee) => {
            const res = await axios.get(
              `${
                import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
              }/api/v1/user/employee/gatepass/all/${employee._id}`
            );
            return res.data.gatePassRequests.map((req) => ({
              ...req,
              employeeId: employee._id,
              employeeName: employee.firstName,
              employeeCode: employee.employeeCode,
              employeeLogout: employee.logoutTime,
              employeeLogin: employee.lastLoginTime,
            }));
          })
        );

        responses.forEach((reqList) => {
          allRequests.push(...reqList);
        });
        setRefresh();
        setRequests(allRequests);
      } catch (error) {
        console.error("Error fetching gate pass requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGatePassRequests();
  }, [employees]);

  // Handle Approve/Reject Request
  const handleApproval = async (employeeId, gatePassId, status) => {
    try {
      const response = await axios.put(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/employee/gatepass/${employeeId}/approve`,
        { gatePassId, status }
      );

      // Update UI instantly
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req._id === gatePassId ? { ...req, status } : req
        )
      );
      toast.success(response.data.message, "Gate Pass Approve successfully", {
        position: "top-right",
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Error approving/rejecting gate pass:", error);
      toast.error("Failed to approve/reject gate pass", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  // Function to filter requests by week or month
  const getFilteredRequests = () => {
    const now = new Date();
    const oneWeekAgo = new Date(now);
    oneWeekAgo.setDate(now.getDate() - 7);
    const oneMonthAgo = new Date(now);
    oneMonthAgo.setMonth(now.getMonth() - 1);

    return requests.filter((req) => {
      const requestDate = new Date(req.requestedAt);
      if (filter === "week") return requestDate >= oneWeekAgo;
      if (filter === "month") return requestDate >= oneMonthAgo;
      return true; // "all" case
    });
  };

  const filteredRequests = getFilteredRequests();




  return (
    <>
      <MainDashboard />
      <div className="relative min-h-screen overflow-x-auto pt-6 lg:ml-[15rem] xs:ml-[4rem] p-4 max-w-7xl bg-gray-100">
        <div className="bg-blue-600 text-white text-center py-4 mb-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold">Employee Gate Pass Request</h2>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg shadow-md ${
              filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("week")}
            className={`px-4 py-2 rounded-lg shadow-md ${
              filter === "week" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setFilter("month")}
            className={`px-4 py-2 rounded-lg shadow-md ${
              filter === "month" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            This Month
          </button>
        </div>

        {loading ? (
          <div className="text-center py-6 text-lg font-semibold text-gray-600">
            Loading...
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="text-center py-6 text-lg font-semibold text-gray-600">
            No requests found.
          </div>
        ) : (
          <div className="space-y-6">
            {filteredRequests
              .reduce((acc, request) => {
                const existingEmployee = acc.find(
                  (employee) => employee.employeeId === request.employeeId
                );
                if (existingEmployee) {
                  existingEmployee.requests.push(request);
                } else {
                  acc.push({
                    employeeId: request.employeeId,
                    employeeName: request.employeeName,
                    employeeCode: request.employeeCode,
                    requests: [request],
                  });
                }
                return acc;
              }, [])
              .map((employee) => (
                <div
                  key={employee.employeeId}
                  className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
                >
                  <h3 className="text-xl font-bold text-blue-700 flex gap-2 items-center">
                    <span className="text-black">Employee Name:</span>{" "}
                    {employee.employeeName} ({employee.employeeCode})
                  </h3>

                  <div className="mt-4 space-y-4">
                    {employee.requests.map((request) => (
                      <div
                        key={request._id}
                        className="border rounded-lg p-4 bg-gray-50 hover:shadow-md transition"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-gray-800 font-medium">
                            📝 <span className="font-semibold">Reason:</span>{" "}
                            {request.reason}
                          </p>
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
                          </span>
                        </div>

                        {/* Request Date Display */}
                        <p className="text-gray-600">
                          📅{" "}
                          <span className="font-semibold">Request Date:</span>{" "}
                          {new Date(request.requestedAt).toLocaleDateString()}
                        </p>

                        <p className="text-gray-600">
                          ⏳ <span className="font-semibold">Logout Time:</span>{" "}
                          {request.employeeLogout}
                        </p>

                        {request.reason === "Company Work" && (
                          <div>
                            <p className="text-gray-600">
                              🚗{" "}
                              <span className="font-semibold">Total KM:</span>{" "}
                              {request.totalKm}
                            </p>

                            <p className="text-gray-600">
                              🏢{" "}
                              <span className="font-semibold">
                                Company Work Reason:
                              </span>{" "}
                              {request.companyWorkReason}
                            </p>
                            <p className="text-gray-600">
                              💸{" "}
                              <span className="font-semibold">
                                Total Payment:
                              </span>{" "}
                              ₹{request.totalPayment}
                            </p>
                          </div>
                        )}

                        {request.status === "Pending" && (
                          <div className="mt-4 flex gap-3">
                            <button
                              onClick={() =>
                                handleApproval(
                                  request.employeeId,
                                  request._id,
                                  "Approved"
                                )
                              }
                              className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
                            >
                              ✅ Approve
                            </button>
                            <button
                              onClick={() =>
                                handleApproval(
                                  request.employeeId,
                                  request._id,
                                  "Rejected"
                                )
                              }
                              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
                            >
                              ❌ Reject
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default GatepassApproval;
