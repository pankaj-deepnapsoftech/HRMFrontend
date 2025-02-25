import React, { useState, useEffect, useContext } from "react";
import MainDashboard from "../pages/MainDashboard";
import axios from "axios";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EmployeeContext } from "../context/EmployeeContext";
import { capitalize } from "@mui/material";

const Payroll = () => {
  const { employees } = useContext(EmployeeContext);
  const [advanceRequests, setAdvanceRequests] = useState({});
  const [advanceEligibilityYears, setAdvanceEligibilityYears] = useState(0);
  const [editingRequest, setEditingRequest] = useState(null); // Track request being edited
  const [editedAmount, setEditedAmount] = useState(""); // Track the new amount

  // Fetch advance requests and eligibility settings
  useEffect(() => {
    const fetchAdvanceRequests = async () => {
      try {
        const requests = {};
        for (const employee of employees) {
          const response = await axios.get(
            `${
              import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
            }/api/v1/user/requests/advance/${employee._id}`
          );
          requests[employee._id] = response.data.advanceRequests;
        }
        setAdvanceRequests(requests);
      } catch (error) {
        toast.error("Failed to load advance requests.");
      }
    };

    const fetchEligibilityYears = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/api/v1/user/get/advanced/eligiblity`
        );
        setAdvanceEligibilityYears(response.data.advanceEligibilityYears || 0);
      
      } catch (error) {
     
        toast.error("Failed to load eligibility settings.");
      }
    };

    if (employees.length > 0) {
      fetchAdvanceRequests();
    }
    fetchEligibilityYears();
  }, [employees]);

  // Update advance eligibility years
  const handleUpdateEligibilityYears = async () => {
    try {
      await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/set/eligibility/policy`,
        { advanceEligibilityYears }
      );
      toast.success("Eligibility years updated successfully!", {
        position: "top-right",
        autoClose: 1000,
      });
    } catch (error) {

      toast.error("Failed to update eligibility settings.");
    }
  };

  // Approve an advance request
  const handleApproveRequest = async (employeeId, requestId) => {
    try {
      const baseUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
      await axios.put(
        `${baseUrl}/api/v1/user/request/advance/approve/${employeeId}/${requestId}`
      );
      toast.success("Advance request approved!", {
        position: "top-right",
        autoClose: 1000,
      });
      setAdvanceRequests((prevRequests) => ({
        ...prevRequests,
        [employeeId]: prevRequests[employeeId].map((req) =>
          req._id === requestId
            ? { ...req, status: "approved", responseDate: new Date() }
            : req
        ),
      }));
    } catch (error) {

      toast.error(
        error.response.data.message || "Failed to approve advance request.",
        {
          position: "top-right",
          autoClose: 1000,
        }
      );
    }
  };

  // Reject an advance request
  const handleRejectRequest = async (employeeId, requestId) => {
    try {
      const baseUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
      await axios.put(
        `${baseUrl}/api/v1/user/request/advance/rejected/${employeeId}/${requestId}`
      );
      toast.success("Advance request rejected!");
      setAdvanceRequests((prevRequests) => ({
        ...prevRequests,
        [employeeId]: prevRequests[employeeId].map((req) =>
          req._id === requestId
            ? { ...req, status: "rejected", responseDate: new Date() }
            : req
        ),
      }));
    } catch (error) {

      toast.error("Failed to reject advance request.");
    }
  };

  const handleEditRequest = (employeeId, requestId, currentAmount) => {
    setEditingRequest({ employeeId, requestId });
    setEditedAmount(currentAmount); // Set the initial value for editing
  };

  const handleUpdateRequest = async () => {
    if (!editingRequest) return;

    const { employeeId, requestId } = editingRequest;

    try {
      const response = await axios.put(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/edit/advanced/amount`,
        {
          employeeId,
          requestId,
          amount: editedAmount,
          status: "approved",
        }
      );


      toast.success("Advance request updated successfully!", {
        position: "top-right",
        autoClose: 1000,
      });
      setAdvanceRequests((prevRequests) => ({
        ...prevRequests,
        [employeeId]: prevRequests[employeeId].map((req) =>
          req._id === requestId
            ? {
                ...req,
                amount: editedAmount,
                status: "approved",
                responseDate: new Date(),
              }
            : req
        ),
      }));
      setEditingRequest(null);
      setEditedAmount("");
    } catch (error) {
      
      toast.error(
        error.response.data.message || "Failed to update advance request.",
        {
          position: true,
          autoClose: 2000,
        }
      );
    }
  };

  return (
    <>
      <MainDashboard />
      <div className="lg:ml-[15rem] sm:ml-[2rem] sm:p-[1rem] xs:ml-[5rem] p-6 bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="bg-blue-600 text-white text-center py-4 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold">
              Employee Advance Money Request
            </h2>
          </div>

          {/* Update Advance Eligibility Years */}
          <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700">
              Set Eligibility Criteria For Advance Money Request
            </h3>
            <div className="flex flex-col sm:flex-row items-center mt-4 space-y-4 sm:space-y-0 sm:space-x-4">
              <input
                type="number"
                value={advanceEligibilityYears}
                onChange={(e) => setAdvanceEligibilityYears(e.target.value)}
                className="border rounded-lg py-2 px-3 text-gray-700 w-full sm:w-20"
                min="0"
              />
              <button
                onClick={handleUpdateEligibilityYears}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all w-full sm:w-auto"
              >
                Update
              </button>
            </div>
          </div>

          {employees.length > 0 ? (
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full bg-white border-collapse border border-gray-200 rounded-lg shadow-md">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="py-3 px-4 border-b">Employee Name</th>
                    <th className="py-3 px-4 border-b">Designation</th>
                    <th className="py-3 px-4 border-b">Basic Salary</th>
                    <th className="py-3 px-4 border-b">Joining Date</th>
                    <th className="py-3 px-4 border-b">
                      Advance Money Requests
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => {
                    const requests = advanceRequests[employee._id] || [];
                    return (
                      <tr
                        key={employee._id}
                        className="hover:bg-gray-100 transition-colors"
                      >
                        {/* Employee Details */}
                        <td className="py-4 px-4 border-b text-gray-800 text-center">
                          {employee.firstName} {employee.lastName}
                        </td>
                        <td className="py-4 px-4 border-b text-gray-500 text-center">
                          {employee.role}
                        </td>
                        <td className="py-4 px-4 border-b text-gray-800 text-center">
                          ₹ {employee.salary}
                        </td>
                        <td className="py-4 px-4 border-b text-gray-500 text-center">
                          {dayjs(employee.date).format("DD MMM YYYY")}
                        </td>

                        {/* Advance Requests */}
                        <td className="py-4 px-4  border-b text-gray-800">
                          {requests.length > 0 ? (
                            <div className="space-y-4">
                              {requests.map((req) => (
                                <div
                                  key={req._id}
                                  className="lg:p-3 xs:p-8 xs:px-[2rem] border rounded-lg bg-gray-50 shadow-sm"
                                >
                                  <p>
                                    <strong>Amount:</strong> ₹ {req.amount}
                                  </p>
                                  <p>
                                    <strong className="capitalize">
                                      Reason:
                                    </strong>{" "}
                                    {req.reason}
                                  </p>
                                  <p className="capitalize">
                                    <strong>Status:</strong>{" "}
                                    <span
                                      className={
                                        req.status === "Approved"
                                          ? "text-green-600"
                                          : req.status === "Rejected"
                                          ? "text-red-600"
                                          : "text-yellow-600"
                                      }
                                    >
                                      {req.status}
                                    </span>
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    Requested on:{" "}
                                    {dayjs(req.requestDate).format(
                                      "DD MMM YYYY"
                                    )}
                                  </p>
                                  {req.status === "pending" && (
                                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-3">
                                      <button
                                        className="bg-green-600 text-white py-1 px-3 rounded-lg hover:bg-green-700 transition-all w-full sm:w-auto"
                                        onClick={() =>
                                          handleApproveRequest(
                                            employee._id,
                                            req._id
                                          )
                                        }
                                      >
                                        Approve
                                      </button>
                                      <button
                                        className="bg-yellow-600 text-white py-1 px-3 rounded-lg hover:bg-yellow-700 transition-all w-full sm:w-auto"
                                        onClick={() =>
                                          handleEditRequest(
                                            employee._id,
                                            req._id,
                                            req.amount
                                          )
                                        }
                                      >
                                        Edit
                                      </button>
                                    </div>
                                  )}
                                  {editingRequest?.requestId === req._id && (
                                    <div className="mt-4 space-y-2">
                                      <input
                                        type="number"
                                        value={editedAmount}
                                        onChange={(e) =>
                                          setEditedAmount(e.target.value)
                                        }
                                        className="border rounded-lg py-2 px-3 text-gray-700 w-full sm:w-32"
                                        min="0"
                                      />
                                      <button
                                        className="bg-blue-600 text-white py-1 px-3 rounded-lg hover:bg-blue-700 transition-all w-full sm:w-auto"
                                        onClick={handleUpdateRequest}
                                      >
                                        Save Changes
                                      </button>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-500 text-center">
                              No advance requests.
                            </p>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <h1 className="text-center text-gray-600 mt-6">
              No employees found.
            </h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Payroll;
