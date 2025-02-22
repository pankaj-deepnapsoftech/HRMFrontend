import React, { useEffect, useState } from "react";
import axios from "axios";
import MainDashboard from "../pages/MainDashboard.jsx";

const EmpDailyAttendance = () => {
  const [dailyAttendance, setDailyAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDailyAttendance = async () => {
    try {
      const today = new Date().toISOString().split("T")[0]; // Get today's date
      const response = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/employee/daily/attendance?date=${today}`
      );
      setDailyAttendance(response.data.attendance); // Store attendance data
      console.log(response.data.attendance);
      setLoading(false);
    } catch (error) {
      setError("Error fetching daily attendance.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getDailyAttendance(); // Fetch the attendance data when component mounts
  }, []);

  if (loading)
    return <div className="text-center text-xl font-semibold">Loading...</div>;
  if (error)
    return <div className="text-center text-xl text-red-500">{error}</div>;

  return (
    <>
      <MainDashboard />
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto lg:ml-[15rem] xs:ml-[5rem] mt-8">
          <div className="bg-blue-600 text-white text-center py-4 mb-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Daily Attendence</h2>
          </div>

          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full table-auto text-sm text-left text-gray-700">
              <thead className="bg-gray-200 text-xs uppercase text-gray-600">
                <tr>
                  <th className="px-4 py-2 border-b">First Name</th>
                  <th className="px-4 py-2 border-b">Last Name</th>
                  <th className="px-4 py-2 border-b">Email</th>
                  <th className="px-4 py-2 border-b">Status</th>
                  <th className="px-4 py-2 border-b">Login Time</th>
                </tr>
              </thead>
              <tbody>
                {dailyAttendance.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-gray-500">
                      No attendance data available for today.
                    </td>
                  </tr>
                ) : (
                  dailyAttendance.map((attendance) => (
                    <tr
                      key={attendance.employeeId}
                      className={`border-b transition-all ${
                        attendance.Empstatus === "terminated"
                          ? "bg-gray-100 text-gray-400"
                          : "bg-white"
                      }`}
                    >
                      <td className="px-4 py-2 border-b">
                        {attendance.firstName}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {attendance.lastName}
                      </td>
                      <td className="px-4 py-2 border-b">{attendance.email}</td>
                      <td className="px-4 py-2 border-b">
                        <span
                          className={`px-2 py-1 rounded-full ${
                            attendance.status === "Present"
                              ? "bg-green-500 text-white"
                              : "bg-red-500 text-white"
                          }`}
                        >
                          {attendance.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 border-b">
                        {attendance.loginTime || "N/A"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmpDailyAttendance;
