import React, { useState, useContext } from "react";
import MainDashboard from "../pages/MainDashboard";
import { EmployeeContext } from "../context/EmployeeContext";
import * as XLSX from "xlsx";
import { Button } from "@mui/material";

const Reports = () => {
  const { employees } = useContext(EmployeeContext);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");

  const exportToExcel = () => {
    if (employees.length === 0) {
      alert("No data to export");
      return;
    }

    const formattedData = employees.map((employee) => ({
      Name: employee.firstName || "",
      Email: employee.email || "",
      Location: employee.location || "",
      Department: employee.department || "",
      Designation: employee.role || "",
      JoiningDate: employee.date || "",
      BasicSlary: employee.salary || "",
      Incentives: employee.incentive.reduce(
        (sum, inc) => sum + inc.amount,
        0
      ) || "",
      Reimbursement: employee.reimbursement.reduce(
        (sum, rem) => sum + rem.amount,
        0
      ) || "",
      Advance : employee.advanceRequests.reduce(
        (sum, rem) => sum + rem.amount,
        0
      ) || "",
      EmpStatus: employee.Empstatus || "",
      Assets: (employee.assets || []).join(", "),
      Attendance: employee.attendance
        ? employee.attendance
            .map((att) => `${att.date} - ${att.status} - ${att.loginTime}`)
            .join(" | ")
        : "",
      GatePass: employee.gatePassRequests
        ? employee.gatePassRequests
            .map(
              (gp) =>
                `Reason: ${gp.reason}, Status: ${gp.status}, Date: ${gp.requestedAt}`
            )
            .join(" | ")
        : "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "TimeSheet Data");

    XLSX.writeFile(workbook, "TimeSheetData.xlsx");
  };

  const handleViewLocation = (location) => {
    setSelectedLocation(location);
    setLocationModalVisible(true);
  };

  return (
    <>
      <MainDashboard />
      <div className="lg:ml-[14rem] xs:ml-[5rem] min-h-screen bg-gray-100 p-6">
        <div className="bg-blue-600 text-white text-center py-4 mb-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold">Employees Report</h2>
        </div>

        {/* Export Button */}
        <div className="text-right mb-4">
          <Button
            onClick={exportToExcel}
            variant="contained"
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            Export
          </Button>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="w-full border-collapse bg-white text-sm text-left text-gray-600 rounded-lg shadow-lg">
            {/* Table Head */}
            <thead className="text-xs uppercase bg-gray-200 text-gray-700 sticky top-0">
              <tr>
                {[
                  "Name",
                  "Location",
                  "Department",
                  "Designation",
                  "Salary",
                  "Assets",
                  "Present Days",
                  "Gate Pass",
                  "Status",
                ].map((header, index) => (
                  <th key={index} className="px-4 py-3 border-b text-center">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {employees.length > 0 ? (
                employees.map((item, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100 transition`}
                  >
                    <td className="px-4 py-3 font-medium text-gray-900 text-center">
                      {item.firstName}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        className="text-blue-500 underline"
                        onClick={() => handleViewLocation(item.location)}
                      >
                        View Location
                      </button>
                    </td>
                    <td className="px-4 py-3 text-center">{item.department}</td>
                    <td className="px-4 py-3 text-center">{item.role}</td>
                    <td className="px-4 py-3 text-center">{item.salary}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex flex-wrap gap-2 justify-center">
                        {(item.assets || []).map((asset, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full"
                          >
                            {asset}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {item.attendance?.filter(
                        (att) => att.status === "Present"
                      ).length || 0}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {item.gatePassRequests?.length || 0}
                    </td>
                    <td className="px-4 py-3 text-center">{item.Empstatus}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-6 text-gray-500">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Location Modal */}
      {locationModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Employee Location
            </h3>
            <p className="text-gray-600">{selectedLocation}</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => setLocationModalVisible(false)}
                className="bg-gray-500 text-white rounded px-4 py-2 hover:bg-gray-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Reports;
