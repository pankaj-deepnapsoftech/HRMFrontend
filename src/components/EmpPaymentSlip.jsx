import React, { useEffect, useState } from "react";
import EmpDashboard from "../pages/EmpDashboard";
import { Button } from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";

const EmpPaymentSlip = () => {
  const [employee, setEmployee] = useState("");
  const [employeeDetails, setEmployeeDetails] = useState("");

  const companyDetails = {
    name: "Deepnap Softech",
    address: "5E 12/BP N.I.T Faridabad(121001)",
    logo: "data:image/png;base64,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", // Update this path to your logo
  };

  const FUND_PERCENTAGE = 12; // Percentage of salary allocated to the fund

  useEffect(() => {
    const storedUser = localStorage.getItem("employeeLogin");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const userData = parsedUser.data.userResponse;
      setEmployeeDetails(userData);

      // Calculate working days and fund
      const presentDays = userData.attendance
        ? userData.attendance.filter((att) => att.status === "Present").length
        : 0;

      const fund = (userData.salary * FUND_PERCENTAGE) / 100;

      const totalSalary = userData.salary - fund;

      setEmployee({ ...userData, workingDays: presentDays, fund, totalSalary });
    }
  }, []);

  const exportToPDF = (employeeDetails) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Add Company Logo (Optional)
    const companyLogo =
      "data:image/png;base64,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"; // Replace with your logo's base64 or URL
    if (companyLogo) {
      doc.addImage(companyLogo, "PNG", 14, 10, 30, 30);
    }

    // Add Company Name and Address
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(companyDetails.name, pageWidth / 2, 20, { align: "center" });
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(companyDetails.address, pageWidth / 2, 28, { align: "center" });

    // Add Payslip Title
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Employee Salary Slip", pageWidth / 2, 50, { align: "center" });

    // Add Divider Line
    doc.setDrawColor(200, 200, 200);
    doc.line(14, 54, pageWidth - 14, 54);

    // Employee Details Section
    const startY = 60;
    const details = [
      `Employee Name: ${employee.firstName} ${employee.lastName}`,
      `Employee Code: ${employee.employeeCode}`,
      `Email: ${employee.email}`,
      `Department: ${employee.department}`,
      `Role: ${employee.role}`,
      `Salary Month: ${new Date().toLocaleString("default", {
        month: "long",
        year: "numeric",
      })}`,
    ];

    doc.setFontSize(10);
    details.forEach((text, index) => {
      doc.text(text, 14, startY + index * 8);
    });

    // Add another Divider Line
    doc.line(
      14,
      startY + details.length * 8 + 4,
      pageWidth - 14,
      startY + details.length * 8 + 4
    );

    // Salary Breakdown Section with AutoTable
    const breakdownStartY = startY + details.length * 8 + 12;
    doc.setFont("helvetica", "bold");
    doc.text("Salary Breakdown", 14, breakdownStartY);

    const incentive = employee?.incentive?.reduce(
      (sum, inc) => sum + inc.amount,
      0
    );
    const reimbursement = employee?.reimbursement?.reduce(
      (sum, inc) => sum + inc.amount,
      0
    );
    const advanceTotal = employee?.advanceRequests?.reduce(
      (sum, rem) => sum + rem.amount,
      0
    );

    const totalWorkingDays = employee?.attendance?.filter(
      (entry) => entry.status === "Present"
    ).length;

    const fund = (employee?.salary * 12) / 100;

    const getDaysInMonth = () => {
      const date = new Date();
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); // Get the last date of the current month
    };

    const totalDaysInMonth = getDaysInMonth();

    const totalSalary =
      employee?.salary + incentive + reimbursement - (fund + advanceTotal);
    const actualSalary = (totalSalary / totalDaysInMonth) * totalWorkingDays;

    const salaryBreakdown = [
      ["Basic Salary", `${employee.salary.toFixed(2)}`],
      ["Fund (12%)", `${fund.toFixed(2)}`],
      ["Total Working Days", `${totalWorkingDays}`],
      ["Incentives", `${incentive.toFixed(2)}`],
      ["Reimbursements", `${reimbursement.toFixed(2)}`],
      ["Advance", `${advanceTotal.toFixed(2)}`],
      ["Deductions", "0.00"],
      ["Net Salary", `${actualSalary.toFixed(2)}`],
    ];
    // Using AutoTable for consistent formatting
    doc.autoTable({
      startY: breakdownStartY + 8,
      theme: "grid",
      head: [["Description", "Amount"]],
      body: salaryBreakdown.map((row) => row.map(String)),
      columnStyles: {
        0: { cellWidth: 100 }, // Description column
        1: { cellWidth: 100 }, // Amount column
      },
      styles: { fontSize: 10 },
    });

    // Footer with Terms and Disclaimer
    const footerStartY = doc.lastAutoTable.finalY + 10;
    doc.setDrawColor(200, 200, 200);
    doc.line(14, footerStartY, pageWidth - 14, footerStartY);
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(128, 128, 128);
    doc.text(
      "This salary slip is generated by the company and is intended for employee reference only.",
      14,
      footerStartY + 8
    );
    doc.text(
      "If you have any queries, please contact HR at hr@deepnapsoftech.com.",
      14,
      footerStartY + 16
    );
    doc.text(
      "This document was autogenerated, and the signature is not required.",
      14,
      footerStartY + 24
    );
    // Save the PDF
    doc.save(`${employee.firstName}_${employee.lastName}_Salary_Slip.pdf`);
  };

  return (
    <>
      <EmpDashboard />
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="bg-blue-600 text-white text-center py-4 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold">Payroll Summary</h2>
          </div>

          {employee ? (
            <div className="bg-white shadow-md rounded-lg p-4 mt-6 overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 overflow-x-auto">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 overflow-x-auto">
                  <tr>
                    <th className="px-6 py-3">Full Name</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Department</th>
                    <th className="px-6 py-3">Role</th>
                    <th className="px-6 py-3">Actual Salary</th>
                    <th className="px-6 py-3">Working Days</th>
                    <th className="px-6 py-3">Fund (12%)</th>
                    <th className="px-6 py-3">Total Salary</th>
                    <th className="px-6 py-3">Generate Payslip</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap capitalize">
                      {employee.firstName} {employee.lastName}
                    </td>
                    <td className="px-6 py-4">{employee.email}</td>
                    <td className="px-6 py-4">{employee.department}</td>
                    <td className="px-6 py-4">{employee.role}</td>
                    <td className="px-6 py-4">{employee.salary.toFixed(2)}</td>
                    <td className="px-6 py-4">{employee.workingDays}</td>
                    <td className="px-6 py-4">{employee.fund.toFixed(2)}</td>
                    <td className="px-6 py-4">{employee.totalSalary}</td>
                    <td className="px-6 py-4">
                      <Button
                        onClick={exportToPDF}
                        variant="contained"
                        color="success"
                        size="small"
                      >
                        Payslip
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-6">
              No employee data available.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EmpPaymentSlip;
