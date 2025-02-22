import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import MainDashboard from "../pages/MainDashboard.jsx";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const FrontPage = () => {
  const [getallUser, setAllUser] = useState([]);
  const [chartData, setChartData] = useState(null);

  // Fetch all user registration details
  const getAllUserRegisterDetails = async () => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/employee/all/registerDetails`
      );
      const users = response.data.data.user;

      // Set all users for the table
      setAllUser(users);

      // Filter out terminated employees for the graph
      const activeUsers = users.filter(
        (user) => user.Empstatus !== "terminated"
      );

      // Process data for the chart using only active users
      const departmentCounts = activeUsers.reduce((acc, user) => {
        acc[user.department] = (acc[user.department] || 0) + 1;
        return acc;
      }, {});

      setChartData({
        labels: Object.keys(departmentCounts),
        datasets: [
          {
            data: Object.values(departmentCounts),
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
            ],
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching registered users:", error);
    }
  };

  useEffect(() => {
    getAllUserRegisterDetails();
  }, []);

  return (
    <>
      <MainDashboard />
      <div className="relative overflow-x pt-6 lg:ml-[15.2rem] xs:ml-[4rem] p-2 max-w-7xl">
        <div className="bg-blue-600 text-white text-center py-4 mb-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold">Employee Dashboard</h2>
        </div>

        {/*---employee----table--------*/}
        <div>
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Full Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Department
                  </th>
                  <th scope="col" className="px-6 py-3">
                   Designation
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Emp-code
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Salary
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Joining Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {getallUser.length > 0 ? (
                  getallUser.map((user, index) => (
                    <tr
                      key={user._id}
                      className={`border-b transition-all ${
                        user.Empstatus === "terminated"
                          ? "bg-gray-100 text-gray-400"
                          : "bg-white"
                      }`}
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {user.firstName} {user.lastName}
                      </td>

                      <td className="px-6 py-4">{user.department}</td>
                      <td className="px-6 py-4">{user.role}</td>
                      <td className="px-6 py-4">{user.employeeCode}</td>
                      <td className="px-6 py-4">
                        {user.salary.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(user.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* Display Chart */}
        {chartData && (
          <div className="mb-6 max-w-md mx-auto">
            <h2 className="text-lg p-4 font-bold text-center">
              Employees by Department
            </h2>
            <Pie data={chartData} />
          </div>
        )}
      </div>
    </>
  );
};

export default FrontPage;
