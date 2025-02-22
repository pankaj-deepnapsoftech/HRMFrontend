import React, { useEffect, useState } from "react";
import EmpDashboard from "../pages/EmpDashboard";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmpRequest = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [halfLeave, setHalfLeave] = useState(false); // Store as boolean (checkbox)
  const [fullLeave, setFullLeave] = useState(""); // Full leave reason (optional text)
  const [leaveType, setLeaveType] = useState("");
  const [username, setUserName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [leaveLimits, setLeaveLimits] = useState({
    halfDayLeaves: 0,
    fullDayLeaves: 0,
  });
  const [presentDates, setPresentDates] = useState("");
  const [employees, setEmployee] = useState("");
  // Load user information from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("employeeLogin");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserName(parsedUser.data.firstName);
      setEmployeeId(parsedUser.data.userResponse._id);
      console.log(parsedUser.data);
    }
  }, []);

  // Fetch the leave limits when employeeId is available
  useEffect(() => {
    console.log(employeeId);
    const fetchLeaveLimits = async () => {
      if (!employeeId) {
        console.warn("Employee ID is not set yet.");
        return;
      }
      const url = `${
        import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
      }/api/v1/user/${employeeId}/leave/limits`;
      console.log("Fetching leave limits from URL:", url);
      try {
        const response = await axios.get(url);
        setLeaveLimits(response.data.leaveLimits);
        console.log(response.data.leaveLimits);
      } catch (error) {
        console.error(
          "Error fetching leave limits:",
          error.response?.data || error.message
        );
        toast.error("Failed to fetch leave limits", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    };

    fetchLeaveLimits();
  }, [employeeId]);

  const submitHandler = async (e) => {
    e.preventDefault();

    // Check if half or full-day leaves exceed the limit
    if (halfLeave && leaveLimits.halfDayLeaves <= 0) {
      toast.error(
        `You have exhausted your ${leaveLimits.halfDayLeaves} half-day leaves for this month.`,
        {
          position: "top-right",
          autoClose: 1000,
        }
      );
      return;
    }

    if (fullLeave && leaveLimits.fullDayLeaves <= 0) {
      toast.error(
        `You have exhausted your ${leaveLimits.fullDayLeaves} full-day leaves for this month.`,
        {
          position: "top-right",
          autoClose: 1000,
        }
      );
      return;
    }

    // Construct the leave request payload
    const leaveObj = {
      fromDate,
      toDate,
      halfLeave: halfLeave ? "halfday" : undefined, // Only send 'halfday' if checkbox is checked
      fullLeave, // Send reason if provided
      leaveType,
    };

    console.log("Submitting leave request with payload:", leaveObj);

    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/${employeeId}/request/leave`,
        leaveObj,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Leave request submitted successfully:", response.data);
      localStorage.setItem("reqLeave", JSON.stringify(response.data));
      toast.success("Leave request submitted successfully", {
        position: "top-right",
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Error response:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "Request leave submission failed",
        { position: "top-right", autoClose: 1000 }
      );
    }
  };

  // Function to format dates
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Formats the date to a readable string
  };

  return (
    <>
      <EmpDashboard />
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <div className="bg-blue-600 text-white text-center py-4 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold">Employee Leave Request</h2>
          </div>

          <div className="max-w-2xl mx-auto shadow-lg p-12 mt-[2rem]">
            <h1 className="pb-10 flex justify-center items-center gap-2 font-bold">
              Request Leave <span className="text-gray-400">{username}</span>
            </h1>
            <form onSubmit={submitHandler}>
              <div className="grid gap-6 mb-6 lg:grid-cols-2">
                <div>
                  <label
                    htmlFor="fromDate"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    From Date<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="fromDate"
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    required
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="toDate"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    To Date<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="toDate"
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="halfLeave"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Request leave for half day <br />
                    <span className="text-gray-400">
                      You can get only {leaveLimits.halfDayLeaves} half-day
                      leaves
                    </span>
                  </label>
                  <input
                    type="checkbox"
                    id="halfLeave"
                    className="mr-2"
                    onChange={(e) => setHalfLeave(e.target.checked)}
                  />
                  <span className="text-gray-900 dark:text-gray-300">
                    Half Day
                  </span>
                </div>

                <div>
                  <label
                    htmlFor="leaveType"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Leave Type<span className="text-red-500">*</span>
                  </label>
                  <select
                    id="leaveType"
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    required
                    onChange={(e) => setLeaveType(e.target.value)}
                  >
                    <option value="">Select Leave Type</option>
                    <option value="sick">Sick Leave</option>
                    <option value="casual">Casual Leave</option>
                    <option value="emergency">Emergency Leave</option>
                    <option value="vacation">Vacation</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="fullLeave"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Reason for leave
                </label>
                <textarea
                  id="fullLeave"
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                  cols={53}
                  rows={4}
                  placeholder="Write Reason Here..."
                  onChange={(e) => setFullLeave(e.target.value)}
                ></textarea>
              </div>

              <button
                type="submit"
                className="text-white bg-blue-700 mt-4 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmpRequest;
