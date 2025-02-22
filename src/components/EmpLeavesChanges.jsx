import React, { useState, useEffect, useContext } from "react";
import { EmployeeContext } from "../context/EmployeeContext";
import MainDashBoard from "../pages/MainDashboard";
import axios from "axios"; // Import axios
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmpLeavesChanges = () => {
  const { employees } = useContext(EmployeeContext); // Consume employee data from context
  const [employeeId, setEmployeeId] = useState("");
  const [leaveType, setLeaveType] = useState("fullDay");
  const [amount, setAmount] = useState("");
  const [action, setAction] = useState("increase"); // New state to handle increase/decrease
  const [message, setMessage] = useState("");

  useEffect(() => {
    // This useEffect ensures employees state is set once when component mounts
  }, [employees]); // Empty dependency array ensures this runs only once after the component mounts

  // Handle form submission using axios
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/update-employee-leave`,
        {
          employeeId,
          leaveType,
          amount,
          action,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Set the success message from the response
      setMessage(response.data.message);
      toast.success("Employee leave balance is updated", {
        position: "top-right",
        autoClose: 1000,
      });
    } catch (error) {
      // Handle error and set an error message if any
      console.error(error);
      toast.error("Employee leaves balance does not updated", {
        position: "top-right",
        autoClose: 1000,
      });
      setMessage("Error updating leave balance. Please try again.");
    }
  };

  return (
    <>
      <MainDashBoard />
      <div className="lg:ml-[15rem] xs:ml-[5rem] p-10 bg-gray-100 min-h-screen">
        <div className="bg-blue-600 text-white text-center py-4 mb-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold">Update Employee Leave Balance</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Employee
            </label>
            <select
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
            >
              <option value="">Select an Employee</option>
              {employees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.firstName} {employee.lastName} (
                  {employee.employeeCode})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Leave Type
            </label>
            <select
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            >
              <option value="fullDay">Full-Day</option>
              <option value="halfDay">Half-Day</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Action
            </label>
            <select
              value={action}
              onChange={(e) => setAction(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            >
              <option value="increase">Increase</option>
              <option value="decrease">Decrease</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Days
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
              min="1"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Update Leave Balance
          </button>
        </form>

        {message && (
          <div className="mt-4 text-sm text-green-600">{message}</div>
        )}
      </div>
    </>
  );
};

export default EmpLeavesChanges;
