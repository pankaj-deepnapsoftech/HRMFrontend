import { useContext, useState } from "react";
import MainDashboard from "../../pages/MainDashboard.jsx";
import { EmployeeContext } from "../../context/EmployeeContext.jsx";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { IoEyeSharp } from "react-icons/io5";
import AddIncentives from "./AddIncentives.jsx";
import ViewIncentives from "./ViewIncentives.jsx";

const Reimbursements = () => {
  const { employees } = useContext(EmployeeContext);
  const [viewOpen, setViewOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const handleViewOpen = (employee) => {
    setSelectedEmployee(employee);
    setViewOpen(true);
  };

  const handleViewClose = () => {
    setViewOpen(false);
    setSelectedEmployee(null);
  };

  const handleAddOpen = (employee) => {
    setSelectedEmployeeId(employee);
    setAddOpen(true);
  };

  const handleAddClose = () => {
    setAddOpen(false);
    setSelectedEmployeeId(null);
  };

  return (
    <>
      <div>
        <MainDashboard />
        <div className="relative overflow-x-auto pt-6 lg:ml-[15rem] xs:ml-[4rem] p-2 max-w-7xl min-h-screen bg-gray-100">
          <div className="bg-blue-600 text-white text-center py-4 mb-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Reimbursements</h2>
          </div>
          <div className="bg-white shadow-md rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs overflow-x-auto text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Department</th>
                  <th className="px-6 py-3">Designation</th>
                  <th className="px-6 py-3">Reimbursements</th>
                  <th className="px-6 py-3">Add Reimbursements</th>
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
                      <td className="px-6 py-4">
                        {user.Empstatus === "terminated" ? (
                          ""
                        ) : (
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => handleAddOpen(user?._id)}
                          >
                            Add
                          </Button>
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
      </div>

      {/* Modal to View Employee Details */}
      <Dialog open={viewOpen} onClose={handleAddClose}>
        <DialogTitle className="text-center text-xl font-semibold">
          View Employee Reimbursements
        </DialogTitle>
        <DialogContent>
          <ViewIncentives empData={selectedEmployee}  type="Reimbursements"/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleViewClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal to Add Employee Incentive */}
      <Dialog open={addOpen} onClose={handleAddClose}>
        <DialogTitle className="text-center text-xl font-semibold">
          Add Employee Reimbursements
        </DialogTitle>
        <DialogContent>
          <AddIncentives empId={selectedEmployeeId} onClose={handleAddClose} type="Reimbursements"/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Reimbursements;
