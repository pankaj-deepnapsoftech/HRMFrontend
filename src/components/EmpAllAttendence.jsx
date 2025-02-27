import React, { useContext, useState } from "react";
import MainDashboard from "../pages/MainDashboard.jsx";
import { EmployeeContext } from "../context/EmployeeContext.jsx";
import { Button } from "flowbite-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, isSameMonth } from "date-fns";
import * as XLSX from "xlsx";

const EmpAllAttendence = () => {
  const { employees } = useContext(EmployeeContext);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Default to current date
  const [selectedDepartment, setSelectedDepartment] = useState("All"); // Default department filter

  // Get unique departments for filtering
  const uniqueDepartments = [
    "All",
    ...new Set(employees.map((emp) => emp.department)),
  ];

  // Filter employees by selected month and department
  const filteredEmployees = employees.filter((employee) => {
    const isInMonth = employee.attendance?.some((att) =>
      isSameMonth(new Date(att.date), selectedDate)
    );
    const isInDepartment =
      selectedDepartment === "All" ||
      employee.department === selectedDepartment;

    return isInMonth && isInDepartment;
  });

  // Export to Excel
  const handleExport = () => {
    const exportData = filteredEmployees.map((item) => {
      const presentDays =
        item.attendance?.filter(
          (att) =>
            att.status === "Present" &&
            isSameMonth(new Date(att.date), selectedDate)
        ).length || 0;

      const absentDays =
        item.attendance?.filter(
          (att) =>
            att.status === "Absent" &&
            isSameMonth(new Date(att.date), selectedDate)
        ).length || 0;

      return {
        Name: `${item.firstName} ${item.lastName}`,
        Location: item.location,
        Department: item.department,
        Role: item.role,
        Salary: item.salary,
        "Present Days": presentDays,
        "Absent Days": absentDays,
        "Total Active Time": item.formattedTotalActiveTime,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");
    XLSX.writeFile(
      workbook,
      `Attendance_${format(
        selectedDate,
        "MMMM_yyyy"
      )}_${selectedDepartment}.xlsx`
    );
  };

  return (
    <div>
      <MainDashboard />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center px-4 pt-6 lg:ml-[14rem] xs:ml-[5rem] gap-4">
        <div className="flex flex-col items-center px-3 gap-4 w-full">
        <h1 className="text-2xl font-bold  w-full ">All Employee Attendance</h1>
        <div className=" flex items-center justify-between  gap-2 w-full ">
          <div className="flex items-center gap-4">
            <label htmlFor="month-picker" className="text-gray-700">
              Filter by Month:
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="MMMM yyyy"
              showMonthYearPicker
              className="border rounded-lg px-2 py-1"
            />
          </div>
          <div className="flex items-center gap-4">
            <label htmlFor="department-picker" className="text-gray-700">
              Filter by Department:
            </label>
            <select
              id="department-picker"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="border rounded-lg px-2 py-1"
            >
              {uniqueDepartments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          <Button
          onClick={handleExport}
          className="bg-blue-500 text-white hover:bg-blue-600  "
        >
          Export
        </Button>
        </div>
        </div>
      
      </div>

      {/* Attendance Table */}
      <div className="relative lg:ml-[14rem] xs:ml-[5rem] overflow-x-auto pt-10 px-4 sm:px-6 lg:px-8 p-4">
       
        <table className="w-full bg-white text-sm text-left text-gray-600 rounded-lg shadow-lg">
          <thead className="text-xs uppercase bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Salary</th>
              <th className="px-6 py-3">Present Days</th>
              <th className="px-6 py-3">Absent Days</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((item, index) => {
                const presentDays =
                  item.attendance?.filter(
                    (att) =>
                      att.status === "Present" &&
                      isSameMonth(new Date(att.date), selectedDate)
                  ).length || 0;

                const absentDays =
                  item.attendance?.filter(
                    (att) =>
                      att.status === "Absent" &&
                      isSameMonth(new Date(att.date), selectedDate)
                  ).length || 0;

                return (
                  <tr
                    key={item.employeeId}
                    className={`border-b transition-all ${
                      item.Empstatus === "terminated"
                        ? "bg-gray-100 text-gray-400"
                        : "bg-white"
                    }`}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {item.firstName} {item.lastName}
                    </td>
                    <td className="px-6 py-4">{item.department}</td>
                    <td className="px-6 py-4">{item.role}</td>
                    <td className="px-6 py-4">{item.salary}</td>
                    <td className="px-6 py-4">{presentDays}</td>
                    <td className="px-6 py-4">{absentDays}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-6 text-gray-500">
                  No attendance data found for the selected filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmpAllAttendence;
