import React, { useEffect, useState } from "react";
import EmpDashboard from "../pages/EmpDashboard";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmpRequest = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [halfLeave, setHalfLeave] = useState(false);
  const [fullLeave, setFullLeave] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [reason, setReason] = useState("");
  const [username, setUserName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [leaveLimits, setLeaveLimits] = useState({
    halfDayLeaves: 0,
    fullDayLeaves: 0,
  });

  // Load user information from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("employeeLogin");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserName(parsedUser.data.firstName);
      setEmployeeId(parsedUser.data.userResponse._id);
    }
  }, []);

  // Fetch the leave limits whenever the employee ID is available
  const fetchLeaveLimits = async () => {
    if (!employeeId) {
      return;
    }

    const url = `${
      import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
    }/api/v1/user/${employeeId}/leave/limits`;
  

    try {
      const response = await axios.get(url);

      setLeaveLimits(response.data?.leaveLimits);
    } catch (error) {

      toast.error("Failed to fetch leave limits", { autoClose: 3000 });
    }
  };

  useEffect(() => {
    fetchLeaveLimits();
  }, [employeeId]);


  const submitHandler = async (e) => {
    e.preventDefault();


    await fetchLeaveLimits();




    if (halfLeave && leaveLimits.halfDayLeaves <= 0) {
      toast.error(
        `You have exhausted your ${leaveLimits.halfDayLeaves} half-day leaves for this month.`,
        { autoClose: 1000 }
      );
      return;
    }

    if (fullLeave && leaveLimits.fullDayLeaves <= 0) {
      toast.error(
        `You have exhausted your ${leaveLimits.fullDayLeaves} full-day leaves for this month.`,
        { autoClose: 1000 }
      );
      return;
    }

    const leaveObj = {
      fromDate,
      toDate,
      halfLeave: halfLeave ? "halfday" : undefined,
      fullLeave: fullLeave ? "fullday" : undefined,
      reason,
      leaveType,
    };

    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/${employeeId}/request/leave`,
        leaveObj,
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success("Leave request submitted successfully", {
        autoClose: 1000,
      });

      setFromDate("");
      setToDate("");
      setFullLeave("");
      setHalfLeave("");
      setLeaveType("");
      setReason("");

   
      await fetchLeaveLimits();
    } catch (error) {

      toast.error(
        error.response?.data?.message || "Request submission failed",
        { autoClose: 1000 }
      );
    }
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
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    From Date<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="fromDate"
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
                    required
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="toDate"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    To Date<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="toDate"
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="halfLeave"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Request  Leave <br />
                    <span className="text-gray-400">
                      Available: {leaveLimits?.halfDayLeaves} half-day leaves
                    </span>
                    <br />
                    <span className="text-gray-400">
                      Available: {leaveLimits?.fullDayLeaves} full-day leaves
                    </span>
                  </label>
                 

                  <input
                    type="checkbox"
                    id="halfLeave"
                    className="mr-2"
                    checked={halfLeave}
                    onChange={(e) => {
                      setHalfLeave(e.target.checked);
                      if (e.target.checked) setFullLeave(false);
                    }}
                  />
                  <span className="text-gray-900 dark:text-gray-300">
                    Half Day
                  </span>

                  <input
                    type="checkbox"
                    id="fullLeave"
                    className="mr-2 ml-4"
                    checked={fullLeave}
                    onChange={(e) => {
                      setFullLeave(e.target.checked);
                      if (e.target.checked) setHalfLeave(false);
                    }}
                  />
                  <span className="text-gray-900 dark:text-gray-300">
                    Full Day
                  </span>
                </div>

                <div>
                  <label
                    htmlFor="leaveType"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Leave Type<span className="text-red-500">*</span>
                  </label>
                  <select
                    id="leaveType"
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
                    required
                    onChange={(e) => setLeaveType(e.target.value)}
                  >
                    <option value="">Select Leave Type</option>
                    <option value="sick">Sick Leave</option>
                    <option value="casual">Casual Leave</option>
                    <option value="emergency">Emergency Leave</option>
                    <option value="vacation">Vacation</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="fullLeave"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Reason for Leave
                </label>
                <textarea
                  id="fullLeave"
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
                  cols={53}
                  rows={4}
                  placeholder="Write Reason Here..."
                  onChange={(e) => setReason(e.target.value)}
                ></textarea>
              </div>

              <button
                type="submit"
                className="text-white bg-blue-700 mt-4 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5"
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
