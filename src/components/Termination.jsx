import React, { useContext, useEffect } from "react";
import MainDashboard from "../pages/MainDashboard";
import { EmployeeContext } from "../context/EmployeeContext";
import { Button } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const Termination = () => {
  const { employees, setEmployees, setRefresh } = useContext(EmployeeContext);

  const terminateEmployee = async (employeeId) => {
    console.log(employeeId);
    try {
      const response = await axios.patch(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/terminate/${employeeId}`
      );

      // Update the employees state to reflect the change
      setEmployees((prev) =>
        prev.map((employee) =>
          employee._id === employeeId
            ? { ...employee, status: "terminated" }
            : employee
        )
      );
      setRefresh();
      toast.success("Employee terminated successfully!", {
        position: "top-right",
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Error terminating employee:", error);
      toast.error("Failed to terminate the employee.", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  return (
    <>
      <MainDashboard />
      <div>
        <div className="relative overflow-x-auto pt-6 lg:ml-[15rem] xs:ml-[4rem] p-2 max-w-7xl bg-gray-100 min-h-screen">
          <div className="bg-blue-600 text-white text-center py-4 mb-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Terminated Employee</h2>
          </div>
          <div className=" bg-white shadow-md rounded-lg">
            <table className="w-full overflow-x-auto  text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th className="px-6 py-3">Full Name</th>
                  <th className="px-6 py-3">Department</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">Emp-code</th>
                  <th className="px-6 py-3">Salary</th>
                  <th className="px-6 py-3">Assets</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Terminate</th>
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
                      <td className="px-6 py-4 font-medium whitespace-nowrap">
                        {user.firstName} {user.lastName}
                      </td>
                      <td className="px-6 py-4">{user.department}</td>
                      <td className="px-6 py-4">{user.role}</td>
                      <td className="px-6 py-4">{user.employeeCode}</td>
                      <td className="px-6 py-4">{user.salary}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {(user.assets || []).map((asset, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full"
                            >
                              {asset}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`${
                            user.Empstatus === "terminated"
                              ? "text-red-500 font-semibold"
                              : ""
                          }`}
                        >
                          {user.Empstatus === "terminated"
                            ? "Terminated"
                            : "Active"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {user.Empstatus !== "terminated" && (
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => terminateEmployee(user._id)}
                          >
                            Terminate
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
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Termination;
