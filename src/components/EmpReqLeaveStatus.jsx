import React, { useState, useEffect } from "react";
import EmpDashboard from "../pages/EmpDashboard";
import { FaCheckCircle } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa"; // For Rejected status
import { useContext } from "react";
import { EmployeeContext } from "../context/EmployeeContext";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const EmpReqLeaveStatus = () => {
  const [presentDates, setPresentDates] = useState([]);
  const [fullLeave, setFullLeave] = useState("");
  const [halfLeave, setHalfLeave] = useState("");
  const [reqLeave, setRequestLeave] = useState([]);
  const [reason, setReason] = useState("");
  const [assets, setAssets] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

  // Use EmployeeContext to get the employee data
  const { employees } = useContext(EmployeeContext);


  // Get employee data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("reqLeave");
    const presentUser = localStorage.getItem("employeeLogin");

    if (presentUser) {
      try {
        const userData = JSON.parse(presentUser);
        setPresentDates(userData.data.userResponse.attendance || []);
        setAssets(userData.data.userResponse.assets || []);

      } catch (error) {
        toast.error(`User data not found:  ${error}`);
      }
    }

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setFullLeave(parsedUser.data.fullDayLeavesThisMonth);
        setHalfLeave(parsedUser.data.halfDayLeavesThisMonth);
        setRequestLeave(parsedUser.data.requestLeave || []);
        setReason(parsedUser.data.requestLeave[0]?.fullLeave);
      } catch (error) {
        toast.error(`Error parsing user data from local storage: ${error}`);
      }
    }
  }, []);

  // Function to format dates
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Formats the date to a readable string
  };

  // Function to highlight tiles
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const formattedDate = date.toISOString().split("T")[0];

      // Highlight present dates in green
      if (presentDates.some((item) => item.date === formattedDate)) {
        return "present-date";
      }

      // Highlight today's date in blue
      const today = new Date().toISOString().split("T")[0];
      if (formattedDate === today) {
        return "today-date";
      }
    }
    return null;
  };

  return (
    <>
      <EmpDashboard />
      {showCalendar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Attendance Calendar</h2>
            <Calendar
              tileClassName={tileClassName}
              onClickDay={(value) =>
                alert(`Selected date: ${value.toLocaleDateString()}`)
              }
            />
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => setShowCalendar(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* Table Section */}
      <div>
        <div className=" p-6 bg-gray-100 min-h-screen">
          <div className="max-w-7xl mx-auto">
            <div className="bg-blue-600 text-white text-center py-4 rounded-lg shadow-md">
              <h2 className="text-3xl font-semibold">Request Leave Status</h2>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4 mt-4 overflow-x-auto">
              <div className="flex justify-end pb-4">
                <button
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow"
                  onClick={() => setShowCalendar(true)}
                >
                  View Attendance Calendar
                </button>
              </div>
              <table className="w-full text-center text-sm  text-gray-500 overflow-x-auto">
                <thead className="text-xs bg-[#E5E7EB] text-black uppercase  dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Present Dates
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Absent Dates
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Half Day <span className="text-red-500">{halfLeave}</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Full Day <span className="text-red-500">{fullLeave}</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Reason For Leave
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Leave Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {presentDates.length > 0 ? (
                    presentDates.map((item, index) => {
                      // Assuming the logged-in employee has an ID or email stored
                      const presentUser = JSON.parse(
                        localStorage.getItem("employeeLogin")
                      );
                      const employeeId = presentUser?.data?.userResponse?._id;
                      const employee = employees.find(
                        (emp) => emp._id === employeeId
                      );

                      // Find the leave request for the employee based on the present date
                      const leaveRequest = employee?.requestLeave?.find(
                        (leave) =>
                          new Date(leave.fromDate).toLocaleDateString() ===
                          new Date(item.date).toLocaleDateString()
                      );

                      return (
                        <tr
                          key={index}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 capitalize font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {employee
                              ? `${employee.firstName} ${employee.lastName}`
                              : "N/A"}
                          </th>
                          <td className="px-6 py-4">{item.date}</td>
                          <td className="px-6 py-4">
                            {item.status === "Absent" ? "Yes" : "No"}
                          </td>
                          {/* Display Half Day Leave */}
                          <td className="px-6 py-4">
                            {leaveRequest && leaveRequest.halfLeave
                              ? formatDate(leaveRequest.fromDate)
                              : "N/A"}
                          </td>
                          {/* 
                          {/* Display Full Day Leave */}
                          <td className="px-6 py-4">
                            {leaveRequest && leaveRequest.fullLeave
                              ? formatDate(leaveRequest.fromDate)
                              : "N/A"}
                          </td>
                          <td className="px-6 py-4">
                            {leaveRequest?.reason || "N/A"}
                          </td>
                          {/* Display Leave Approval Status from EmployeeContext */}
                          <td className="px-6 py-4 flex justify-center items-center gap-1">
                            {leaveRequest?.status === "Approved" && (
                              <>
                                <FaCheckCircle className="text-green-500" />{" "}
                                Approved
                              </>
                            )}
                            {leaveRequest?.status === "Rejected" && (
                              <>
                                <FaTimesCircle className="text-red-500" />{" "}
                                Rejected
                              </>
                            )}
                            {(!leaveRequest ||
                              leaveRequest.status === "Pending") && (
                              <span className="text-yellow-500">Pending</span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-4 text-center">
                        Data not found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmpReqLeaveStatus;
