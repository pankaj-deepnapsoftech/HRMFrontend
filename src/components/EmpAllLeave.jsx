import React, { useEffect, useState } from "react";
import MainDashboard from "../pages/MainDashboard";
import axios from "axios";

const EmpAllLeave = () => {
  const [allUsers, setAllUsers] = useState([]);

  // Fetch all registered employees with leave requests
  const fetchAllUsers = async () => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/employee/all/registerDetails`
      );
      setAllUsers(response.data.data.user);
    } catch (error) {
      toast.error("Failed to fetch user data.");
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  // Calculate the number of half leaves for a user
  const calculateHalfLeaves = (requestLeave) => {
    if (!requestLeave) return 0;
    return requestLeave.filter((leave) => !leave.fullLeave).length;
  };

  // Calculate the number of full leaves for a user
  const calculateFullLeaves = (requestLeave) => {
    if (!requestLeave) return 0;
    return requestLeave.filter((leave) => leave.fullLeave).length;
  };

  // Get the details of the current leave
  const getPresentLeave = (requestLeave) => {
    if (!requestLeave || requestLeave.length === 0) return "N/A";
    const today = new Date();
    const presentLeave = requestLeave.find(
      (leave) =>
        new Date(leave.fromDate) <= today && new Date(leave.toDate) >= today
    );
    return presentLeave
      ? `${presentLeave.fullLeave ? "Full Day" : "Half Day"} (${new Date(
          presentLeave.fromDate
        ).toLocaleDateString()} - ${new Date(
          presentLeave.toDate
        ).toLocaleDateString()})`
      : "N/A";
  };

  return (
    <div>
      <MainDashboard />
      <div className="relative overflow-x-auto lg:ml-[15rem] xs:ml-[5rem] bg-gray-100 min-h-screen">
        <div className="bg-blue-600 text-white text-center py-4 mb-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold">Employee All Leave</h2>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Full Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Emp-code</th>
              <th className="px-6 py-3">No. of Half Leaves</th>
              <th className="px-6 py-3">No. of Full Leaves</th>
              <th className="px-6 py-3">Present Leave</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.length > 0 ? (
              allUsers.map((user) => (
                <tr
                  key={user._id}
                  className={`border-b transition-all ${
                    user.Empstatus === "terminated"
                      ? "bg-gray-100 text-gray-400"
                      : "bg-white"
                  }`}
                >
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.department}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4">{user.employeeCode}</td>
                  <td className="px-6 py-4">
                    {calculateHalfLeaves(user.requestLeave)}
                  </td>
                  <td className="px-6 py-4">
                    {calculateFullLeaves(user.requestLeave)}
                  </td>
                  <td className="px-6 py-4">
                    {getPresentLeave(user.requestLeave)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmpAllLeave;
