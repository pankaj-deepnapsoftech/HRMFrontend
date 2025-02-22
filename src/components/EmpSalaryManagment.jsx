import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { saveAs } from "file-saver";
import MainDashboard from "../pages/MainDashboard.jsx";

// Function to calculate the number of days in the current month
const getDaysInMonth = () => {
  const date = new Date();
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); // Get the last date of the current month
};

const EmpSalaryManagement = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [employeeData, setEmployeeData] = useState({});
  const [updatedSalaries, setUpdatedSalaries] = useState([]);

  // Calculate salary using daily salary minus 12% fund and considering leaves
  // Updated function to calculate salary deducting fund from the total monthly salary
  const calculateSalary = (monthlySalary, presentDays, totalLeaves) => {
    if (
      !monthlySalary ||
      presentDays === undefined ||
      totalLeaves === undefined
    )
      return 0;

    // Deduct 12% fund from the monthly salary
    const salaryAfterFund = monthlySalary * 0.88;

    // Get the actual number of days in the current month
    const totalDaysInMonth = getDaysInMonth();

    // Calculate daily salary based on the reduced monthly salary
    const dailySalary = salaryAfterFund / totalDaysInMonth;

    // Calculate final salary based on present days minus leaves
    const finalSalary = dailySalary * (presentDays - totalLeaves);

    // Ensure salary is non-negative
    return Math.max(0, parseFloat(finalSalary.toFixed(2)));
  };

  // Fetch all employees and initialize data
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.post(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/api/v1/user/employee/all/registerDetails`
        );
        const users = response.data.data.user || [];
        setAllUsers(users);

        const initialEmployeeData = {};
        users.forEach((user) => {
          initialEmployeeData[user._id] = {
            monthlySalary: user.salary || 10000, // Default to 10,000 if no salary
            presentDays:
              user.attendance?.filter((att) => att.status === "Present")
                .length || 0,
            totalLeaves: 0, // Default to 0 leaves
          };
        });
        setEmployeeData(initialEmployeeData);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  // Handle input changes for employees
  const handleChange = (e, userId, field) => {
    const { value } = e.target;
    setEmployeeData((prevData) => {
      const newData = {
        ...prevData,
        [userId]: {
          ...prevData[userId],
          [field]: parseInt(value, 10),
        },
      };

      // Recalculate salary after any relevant field change
      const updatedSalary = calculateSalary(
        newData[userId].monthlySalary,
        newData[userId].presentDays,
        newData[userId].totalLeaves || 0
      );

      setUpdatedSalaries((prevSalaries) => [
        ...prevSalaries.filter(
          (entry) =>
            entry.employeeCode !==
            allUsers.find((user) => user._id === userId)?.employeeCode
        ),
        {
          name: allUsers.find((user) => user._id === userId).firstName,
          employeeCode: allUsers.find((user) => user._id === userId)
            .employeeCode,
          salary: updatedSalary,
          presentDays: newData[userId].presentDays,
          totalLeaves: newData[userId].totalLeaves || 0,
        },
      ]);

      return newData;
    });
  };

  // Export updated salaries to CSV
  const exportToCSV = () => {
    const data = updatedSalaries.map((entry) => ({
      Name: entry.name,
      Emp_Code: entry.employeeCode,
      Salary: entry.salary,
      Present_Days: entry.presentDays,
      Leaves: entry.totalLeaves,
    }));

    const csvContent = [
      ["Name", "Emp_Code", "Salary", "Present_Days", "Leaves"].join(","),
      ...data.map((item) => Object.values(item).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "salary_report.csv");
  };

  return (
    <div>
      <MainDashboard />
      <div className="overflow-x-auto lg:ml-[15rem] xs:ml-[5rem] min-h-screen bg-gray-100">
        <div className="bg-blue-600 text-white text-center py-4 mb-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold">Salary Management</h2>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Full Name</th>
              <th className="px-6 py-3">Emp-code</th>
              <th className="px-6 py-3">New Monthly Salary</th>
              <th className="px-6 py-3">Present Days</th>
              <th className="px-6 py-3">Leaves</th>
              <th className="px-6 py-3">Calculated Salary</th>
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
                    {user.firstName}
                  </td>
                  <td className="px-6 py-4">{user.employeeCode}</td>
                  <td className="px-6 py-4">
                    <TextField
                      variant="outlined"
                      size="small"
                      name="monthlySalary"
                      value={employeeData[user._id]?.monthlySalary || ""}
                      onChange={(e) =>
                        handleChange(e, user._id, "monthlySalary")
                      }
                    />
                  </td>
                  <td className="px-6 py-4">
                    <TextField
                      variant="outlined"
                      size="small"
                      name="presentDays"
                      value={employeeData[user._id]?.presentDays || ""}
                      onChange={(e) => handleChange(e, user._id, "presentDays")}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <TextField
                      variant="outlined"
                      size="small"
                      name="totalLeaves"
                      value={employeeData[user._id]?.totalLeaves || ""}
                      onChange={(e) => handleChange(e, user._id, "totalLeaves")}
                    />
                  </td>
                  <td className="px-6 py-4">
                    {calculateSalary(
                      employeeData[user._id]?.monthlySalary,
                      employeeData[user._id]?.presentDays,
                      employeeData[user._id]?.totalLeaves
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="mt-4 text-center">
          <Button
            variant="contained"
            color="success"
            onClick={exportToCSV}
            disabled={updatedSalaries.length === 0}
          >
            Download Salary Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmpSalaryManagement;
