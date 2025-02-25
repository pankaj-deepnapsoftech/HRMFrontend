import React, { useState, useEffect } from "react";
import axios from "axios";
import EmpDashboard from "../pages/EmpDashboard";
import { Button } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmpAdvanced = ({ employee }) => {
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [advanceRequests, setAdvanceRequests] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [user, setUser] = useState("");
  const [eligibilityDate, setEligibilityDate] = useState(""); // New state for eligibility date
  const [advanceEligibilityYears, setAdvanceEligibilityYears] = useState(""); // New state for

  useEffect(() => {
    const storedUser = localStorage.getItem("employeeLogin");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setEmployeeId(parsedUser.data.userResponse._id);
      setUser(parsedUser.data.userResponse);

      // Calculate the eligibility date (2 years from joining date)
      const joiningDate = new Date(parsedUser.data.userResponse.date); // Assuming `date` is the joining date field
      joiningDate.setFullYear(
        joiningDate.getFullYear() + advanceEligibilityYears
      ); // Add 2 years
      setEligibilityDate(joiningDate); // Set the eligibility date
    }
  }, []);

  const fetchAdvanceRequests = async () => {
    if (employeeId) {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/api/v1/user/requests/advance/${employeeId}`
        );
        setAdvanceRequests(response.data.advanceRequests);
      } catch (error) {
        toast.error(`Error fetching advance requests: ${error}`);
      }
    }
  };

  const handleRequestAdvance = async () => {
    if (!amount || !reason) {
      alert("Please provide both amount and reason.");
      return;
    }

    try {
      const response = await axios.post(
        ` ${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/request/advance/${employeeId}`,
        {
          amount,
          reason,
        }
      );

      setAdvanceRequests(response.data.advanceRequests);
      setAmount("");
      setReason("");

      toast.success("Advanced money request send for approval!", {
        position: "top-right",
        autoClose: 1000,
      });
    } catch (error) {
      toast.error(
        error.response.data.message || "Advanced request does not send.",
        {
          position: "top-right",
          autoClose: 1000,
        }
      );
    }
  };

  useEffect(() => {
    fetchAdvanceRequests();
  }, [employeeId]);

  return (
    <>
      <EmpDashboard />
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-blue-600 text-white text-center py-4 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-bold">Advance Money Request</h2>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Employee Details
            </h3>
            <p>
              <strong>Name:</strong> {user.firstName} {user.lastName}
            </p>
            <p>
              <strong>Salary:</strong> ₹ {user.salary}
            </p>
            <p>
              <strong>Joining Date:</strong>{" "}
              {new Date(user.date).toLocaleDateString()}
            </p>
            {/* <p>
              <strong>Eligible for Advance on:</strong>{" "}
              {eligibilityDate
                ? eligibilityDate.toLocaleDateString()
                : "Loading..."}
            </p> */}
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Request Advance
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-600">Amount</label>
                <input
                  type="number"
                  className="w-full border rounded-lg p-2 mt-1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-600">Reason</label>
                <textarea
                  className="w-full border rounded-lg p-2 mt-1"
                  rows="3"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                ></textarea>
              </div>
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md"
                onClick={handleRequestAdvance}
              >
                Submit Request
              </button>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-3xl font-semibold mb-6 text-gray-900">
              Previous Requests
            </h3>
            {advanceRequests.length > 0 ? (
              <div className="space-y-4 ">
                {advanceRequests.map((req, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out border-l-4 border-blue-500 hover:bg-gray-50"
                  >
                    <div>
                      <p className="text-gray-800 font-semibold">
                        <strong className="font-medium text-blue-600">
                          Amount:
                        </strong>{" "}
                        ₹ {req.amount}
                      </p>
                      <p className="text-gray-800 font-semibold">
                        <strong className="font-medium text-blue-600">
                          Reason:
                        </strong>{" "}
                        {req.reason}
                      </p>
                      <p className="text-gray-700 mt-2 ">
                        <span className="font-medium text-blue-600">
                          Status :
                        </span>{" "}
                        <span
                          className={`px-3 py-1 text-sm font-semibold text-white rounded-full ${
                            req.status === "approved"
                              ? "bg-green-500"
                              : req.status === "rejected"
                              ? "bg-red-500"
                              : "bg-yellow-500"
                          }`}
                        >
                          {req.status}
                        </span>{" "}
                      </p>
                    </div>
                    <p className="text-gray-700 mt-2">
                      <span className="font-medium text-blue-600">
                        Request Date:
                      </span>{" "}
                      {new Date(req.requestDate).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No advance requests found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmpAdvanced;
