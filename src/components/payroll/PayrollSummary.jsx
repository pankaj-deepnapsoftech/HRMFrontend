import { useContext, useState } from "react";
import { EmployeeContext } from "../../context/EmployeeContext.jsx";
import MainDashboard from "../../pages/MainDashboard.jsx";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import { IoEyeSharp } from "react-icons/io5";

const PayrollSummary = () => {
  const { employees } = useContext(EmployeeContext);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);

  const handleViewOpen = (employee) => {
    setSelectedEmployee(employee);
    setViewOpen(true);
  };

  const handleViewClose = () => {
    setViewOpen(false);
    setSelectedEmployee(null);
  };

  const earningTitle = [
    "Basic Salary",
    "Incentives",
    "Reimbursement",
    "Advance",
    "Total Earning",
  ];

  return (
    <div>
      <MainDashboard />

      <div className="relative overflow-x-auto pt-6 lg:ml-[15rem] xs:ml-[4rem] p-2 max-w-7xl min-h-screen bg-gray-100">
        <div className="bg-blue-600 text-white text-center py-4 mb-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold">Payroll Summary</h2>
        </div>
        <div className="bg-white shadow-md rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs overflow-x-auto text-gray-700 uppercase bg-gray-200">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Department</th>
                <th className="px-6 py-3">Designation</th>
                <th className="px-6 py-3">Summary</th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((user) => (
                  <tr
                    key={user._id}
                    className={`border-b transition-all ${
                      user.Empstatus === "terminated"
                        ? "bg-gray-100 text-gray-400"
                        : "bg-white"
                    }`}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {user.firstName}
                    </td>
                    <td className="px-6 py-4">{user.department}</td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4">
                      {user.Empstatus === "terminated" ? (
                        ""
                      ) : (
                        <p
                          className="text-blue-500 flex items-center cursor-pointer"
                          onClick={() => handleViewOpen(user)}
                        >
                          <IoEyeSharp className="mr-2" /> View
                        </p>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Earning Details Dialog */}
      <Dialog open={viewOpen} onClose={handleViewClose} fullWidth maxWidth="sm">
        <DialogTitle className="text-center text-xl font-semibold">
          Earning Details
        </DialogTitle>
        <DialogContent>
          {selectedEmployee && (
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  {earningTitle.map((title, index) => {
                    let amount = 0;

                    const basicSalary = selectedEmployee?.salary
                      ? Number(selectedEmployee.salary)
                      : 0;

                    const incentivesTotal = Array.isArray(
                      selectedEmployee?.incentive
                    )
                      ? selectedEmployee.incentive.reduce(
                          (sum, inc) => sum + inc.amount,
                          0
                        )
                      : 0;

                    const reimbursementTotal = Array.isArray(
                      selectedEmployee?.reimbursement
                    )
                      ? selectedEmployee.reimbursement.reduce(
                          (sum, rem) => sum + rem.amount,
                          0
                        )
                      : 0;

                    const advanceTotal = Array.isArray(
                      selectedEmployee?.advanceRequests
                    )
                      ? selectedEmployee.advanceRequests.reduce(
                          (sum, rem) => sum + rem.amount,
                          0
                        )
                      : 0;

                    if (title === "Basic Salary") {
                      amount = `₹ ${basicSalary.toFixed(2)}`;
                    }

                    if (title === "Incentives") {
                      amount = `₹ ${incentivesTotal.toFixed(2)}`;
                    }

                    if (title === "Reimbursement") {
                      amount = `₹ ${reimbursementTotal.toFixed(2)}`;
                    }

                    if (title === "Advance") {
                      amount = `₹ ${advanceTotal.toFixed(2)}`;
                    }

                    if (title === "Total Earning") {
                      const totalEarnings =
                        basicSalary +
                        incentivesTotal +
                        reimbursementTotal +
                        advanceTotal;
                      amount = `₹ ${totalEarnings.toFixed(2)}`;
                    }

                    return (
                      <TableRow key={index}>
                        <TableCell>{title}</TableCell>
                        <TableCell align="right">{amount}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleViewClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PayrollSummary;
