import React from "react";
import MainDashboard from "../pages/MainDashboard";
import { EmployeeContext } from "../context/EmployeeContext";
import { useContext } from "react";
import * as XLSX from "xlsx";
import Button from "@mui/material/Button";

const TimeSheet = () => {
  const { employees } = useContext(EmployeeContext);
  console.log(employees);

  // Function to export table data to Excel
  const exportToExcel = () => {
    if (employees.length === 0) {
      alert("No data to export");
      return;
    }

    // Map employee data for Excel
    const formattedData = employees.map((employee) => {
      // Get the latest dailyActivity entry
      const latestActivity =
        employee.dailyActivity?.[employee.dailyActivity.length - 1] || {};
      const date = latestActivity.date ? new Date(latestActivity.date) : null;

      return {
        Name: employee.firstName || "",
        Email: employee.email || "",
        "Employee Code": employee.employeeCode || "",
        Location: employee.location || "",
        Department: employee.department || "",
        "Clock-In": employee.clockIn || "",
        "Clock-Out": employee.clockOut || "",
        "Total Hour": employee.totalHour || "",
        "Office Hour": employee.officeHour || "",
        "Active Hour": employee.activeHour || "",
        Productive: latestActivity.formattedActiveTime || "", // Use formatted active time for productive
        Unproductive: latestActivity.formattedInactiveTime || "", // Use formatted inactive time for unproductive
        Neutral: employee.neutral || "",
        Idle: employee.idle || "",
        "Offline Hours": employee.offlineHours || "",
        Break: employee.break || "",
        Productivity: employee.productivity || "",
        Date:
          date instanceof Date && !isNaN(date)
            ? date.toLocaleDateString()
            : "Invalid Date", // Ensure valid date format
      };
    });

    // Create a worksheet and a workbook
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "TimeSheet Data");

    // Download the Excel file
    XLSX.writeFile(workbook, "TimeSheetData.xlsx");
  };

  return (
    <>
      <MainDashboard />

      {/* Select Options */}
      <div className="shadow-lg ml-[10rem]">
        <form className="max-w-sm lg:mx-[15rem] xs:hidden md:mx-auto flex lg:flex-row md:flex-col sm:flex-col lg:gap-10">
          <label
            htmlFor="small"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Location
          </label>
          <select
            id="small"
            className="p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Choose a Location</option>
            <option value="US">Delhi</option>
            <option value="CA">Noida</option>
            <option value="FR">Gurugram</option>
            <option value="DE">Noida</option>
          </select>

          <label
            htmlFor="default"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Department
          </label>
          <select
            id="default"
            className="p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Choose a department</option>
            <option value="US">IT Manager</option>
            <option value="CA">IT Director</option>
            <option value="FR">CTO</option>
            <option value="DE">CIO</option>
          </select>
          {/* Export Button */}
          <Button onClick={exportToExcel} variant="contained">
            Export
          </Button>
        </form>
        {/* Export Button */}
      </div>

      {/* Table */}
      <div className="relative min-h-screen overflow-x-auto lg:ml-[15rem] xs:ml-[5rem] pt-10 p-2 bg-gray-100  shadow-md rounded-lg">
        <div className="bg-blue-600 text-white text-center py-4 mb-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold">Timesheet</h2>
        </div>
        <table className="w-full text-sm text-left rtl:text-right  text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-800 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Employee Code</th>
              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Clock-in</th>
              <th className="px-6 py-3">Clock-out</th>
              <th className="px-6 py-3">Total Hour</th>

              <th className="px-6 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((employee, index) => {
                // Get the latest dailyActivity entry for each employee
                const latestActivity =
                  employee.dailyActivity?.[employee.dailyActivity.length - 1] ||
                  {};
                const date = latestActivity.date
                  ? new Date(latestActivity.date)
                  : null;

                return (
                  <tr
                    key={employee._id}
                    className={`border-b transition-all ${
                      employee.Empstatus === "terminated"
                        ? "bg-gray-100 text-gray-400"
                        : "bg-white"
                    }`}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {employee.firstName ?? ""}
                    </td>

                    <td className="px-6 py-4">{employee.employeeCode ?? ""}</td>

                    <td className="px-6 py-4">{employee.department ?? ""}</td>
                    <td className="px-6 py-4">
                      {employee.lastLoginTime ?? ""}
                    </td>
                    <td className="px-6 py-4">{employee.logoutTime ?? ""}</td>
                    <td className="px-6 py-4">
                      {employee.totalHour ?? "10Hr"}
                    </td>

                    <td className="px-6 py-4">
                      {employee.date ?? "Invalid Date"}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="9" className="px-6 py-4 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TimeSheet;
