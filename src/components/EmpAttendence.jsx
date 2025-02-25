import React, { useState, useEffect } from "react";
import EmpDashboard from "../pages/EmpDashboard";
import axios from "axios";
import moment from "moment"; // Import moment.js for date formatting

const EmpAttendence = () => {
  const [name, setName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [totalPresentDays, setTotalPresentDays] = useState(0);
  const [totalAbsentDays, setTotalAbsentDays] = useState(0);
  const [lastLoginTime, setLastLoginTime] = useState("N/A");
  const [lastLoginDate, setLastLoginDate] = useState("N/A");

  // Get employee ID from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("employeeLogin");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setLastLoginDate(parsedUser.data.userResponse.date);
        setLastLoginTime(parsedUser.data.userResponse.lastLoginTime);
        setEmployeeId(parsedUser.data.userResponse._id);
        setName(parsedUser.data.userResponse); // Assuming the parsed user contains name data

      } catch (error) {
        toast.error(`Error parsing user data from local storage: ${error}`);
      }
    }
  }, []);

  // Fetch attendance details
  const fetchAttendance = async () => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/${employeeId}/attendence/details`
      );

      const data = response.data;

      // Check if today's login time is available, else set "N/A"
      // const today = data.today || {};
      // setLastLoginTime(today.loginTime || "N/A");
      // setLastLoginDate(today.date || "N/A");

      // Set attendance history and calculate total present days
      setAttendanceHistory(data.attendanceHistory || []);
      const presentDays = data.attendanceHistory.filter(
        (att) => att.status === "Present"
      ).length;
      setTotalPresentDays(presentDays);

      // Calculate absent days: total days - present days
      const totalDays = data.attendanceHistory.length;
      const absentDays = totalDays - presentDays;
      setTotalAbsentDays(absentDays);
    } catch (error) {
      toast.error(`Error fetching attendance: ${error}`);
    }
  };


  useEffect(() => {
    if (employeeId) fetchAttendance();
  }, [employeeId]);

  return (
    <>
      <EmpDashboard />

      {/* Attendance Summary Cards */}
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="bg-blue-600 text-white text-center py-4 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold">Employee Attendence</h2>
          </div>
          <div className="min-h-screen bg-gray-100">
            <div className="max-w-4xl mx-auto px-6 py-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center text-center">
                  <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                    Total Present Days
                  </h2>
                  <p className="text-xl text-blue-600 font-bold">
                    {totalPresentDays}
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center text-center">
                  <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                    Last Login Date
                  </h2>
                  <p className="text-xl text-green-600">{lastLoginDate}</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center text-center">
                  <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                    Last Login Time
                  </h2>
                  <p className="text-xl text-yellow-600">{lastLoginTime}</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center text-center">
                  <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                    Total Absent Days
                  </h2>
                  <p className="text-xl text-red-600 font-bold">
                    {totalAbsentDays}
                  </p>
                </div>
              </div>
            </div>

            {/*Attendence table for the employee */}
            <div className="max-w-4xl mx-auto px-6 py-8">
              <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full table-auto">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="px-6 py-3 text-left">Name</th>
                      <th className="px-6 py-3 text-left">Email</th>
                      <th className="px-6 py-3 text-center">Present Days</th>
                      <th className="px-6 py-3 text-center">Absent Days</th>
                      <th className="px-6 py-3 text-center">Login Date</th>
                      <th className="px-6 py-3 text-center">Login Time</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {/* Table row with basic employee details */}
                    <tr className="hover:bg-gray-100">
                      <td className="px-6 py-4">{name.firstName || "N/A"}</td>
                      <td className="px-6 py-4">{name.email || "N/A"}</td>
                      <td className="px-6 py-4 text-center">
                        {totalPresentDays}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {totalAbsentDays}
                      </td>
                      <td className="px-6 py-4 text-center">{lastLoginDate}</td>
                      <td className="px-6 py-4 text-center">{lastLoginTime}</td>
                    </tr>

                    {/* Attendance History: Render each login date and time in a new row */}
                    {attendanceHistory.map((att, index) => (
                      <tr key={index} className="hover:bg-gray-100"></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmpAttendence;
