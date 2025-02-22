import React, { useState, useEffect } from "react";
import EmpDashboard from "../pages/EmpDashboard";
import { FaCheckCircle } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa"; // For Rejected status
import { useContext } from "react";
import { EmployeeContext } from "../context/EmployeeContext";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { SlCalender } from "react-icons/sl";
import { IoDocuments } from "react-icons/io5";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { MdPayment } from "react-icons/md";
import { FaLaptopHouse } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { LuNotebookPen } from "react-icons/lu";
import { GiSecurityGate } from "react-icons/gi";
import { FiAlertTriangle } from "react-icons/fi";

const EmpHome = () => {
  const [presentDates, setPresentDates] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [employeeId, setEmployeeId] = useState("");

  const navigate = useNavigate(); // to navigate after logout

  // // Use EmployeeContext to get the employee data
  const { employees } = useContext(EmployeeContext);
  console.log(employees || []);

  // // Get employee data from localStorage

  // Set user data from local storage or other source
  useEffect(() => {
    const storedUser = localStorage.getItem("employeeLogin");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setEmployeeId(parsedUser.data.userResponse._id);
        console.log(parsedUser);
      } catch (error) {
        console.error("Error parsing user data from local storage:", error);
      }
    }
  }, []);

  // In your frontend code (e.g., EmpDashboard.jsx)
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/${employeeId}/logout`
      );
      console.log(response.data);
      localStorage.removeItem("employeeLogin");
      localStorage.removeItem("reqLeave");
      toast.success("Employee logout successfully!", {
        position: "top-right",
        autoClose: 1000,
        onClose: () => {
          navigate("/employee/login"); // Navigate to login page
          setTimeout(() => {
            window.location.reload(); // Reload the page after navigation
          }, 100); // Add a slight delay to ensure navigation is complete
        },
      });
      // Perform any additional actions like redirecting or removing from localStorage
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Function to highlight tiles
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const formattedDate = date.toISOString().split("T")[0];

      // Highlight present dates in green
      if (presentDates.some((item) => item.date === formattedDate)) {
        return "present-date";
      }

      // Highlight today's date in blue
      const today = new Date().toISOString().split("T")[0];
      if (formattedDate === today) {
        return "today-date";
      }
    }
    return null;
  };

  return (
    <>
      <EmpDashboard />
      {showCalendar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Attendance Calendar</h2>
            <Calendar
              tileClassName={tileClassName}
              onClickDay={(value) =>
                alert(`Selected date: ${value.toLocaleDateString()}`)
              }
            />
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => setShowCalendar(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* Table Section */}
      <div>
        <div className=" p-6 bg-gray-100 min-h-screen">
          <div className="max-w-7xl mx-auto">
            <div className="bg-blue-600 text-white text-center py-4 rounded-lg shadow-md">
              <h2 className="text-3xl font-semibold">Employee Dashboard</h2>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4 mt-4 overflow-x-auto">
              <div className="flex justify-end pb-4">
                <button
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow"
                  onClick={() => setShowCalendar(true)}
                >
                  View Attendance Calendar
                </button>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
                {/* <!-- Card 1 --> */}
                <div class="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
                  <div class="text-blue-500 bg-blue-100 p-4 rounded-full">
                    <Link to="/employee/attendence">
                      <SlCalender className="font-extrabold text-2xl" />
                    </Link>
                  </div>
                  <Link to="/employee/attendence">
                    {" "}
                    <h3 class="text-lg font-semibold mt-4 text-gray-800">
                      Daily Attendence
                    </h3>
                  </Link>
                </div>

                {/* <!-- Card 1 --> */}
                <div class="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
                  <div class="text-blue-500 bg-blue-100 p-4 rounded-full">
                    <Link to="/employee/request/leave">
                      {" "}
                      <img
                        className="lg:w-[3vw] xs:w-[8vw]"
                        src="https://cdn-icons-png.flaticon.com/128/3387/3387188.png"
                      />
                    </Link>
                  </div>
                  <Link to="/employee/request/leave">
                    {" "}
                    <h3 class="text-lg font-semibold mt-4 text-gray-800">
                      Request Leaves
                    </h3>
                  </Link>
                </div>
                {/* <!-- Card 1 --> */}
                <div class="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
                  <div class="text-blue-500 bg-blue-100 p-4 rounded-full">
                    <Link to="/employee/Leave/status">
                      <SlCalender className="font-extrabold text-2xl" />
                    </Link>
                  </div>

                  <Link to="/employee/Leave/status">
                    {" "}
                    <h3 class="text-lg font-semibold mt-4 text-gray-800">
                      Request Leaves Status
                    </h3>
                  </Link>
                </div>
                {/* <!-- Card 1 --> */}
                <div class="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
                  <div class="text-blue-500 bg-blue-100 p-4 rounded-full">
                    <Link to="/employee/documents">
                      <IoDocuments className="font-extrabold text-2xl" />
                    </Link>
                  </div>
                  <Link to="/employee/documents">
                    <h3 class="text-lg font-semibold mt-4 text-gray-800">
                      Documents
                    </h3>
                  </Link>
                </div>

                {/* <!-- Card 2 --> */}
                <div class="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
                  <div class="text-green-500 bg-green-100 p-4 rounded-full">
                    <Link to="/employee/advanced">
                      <RiMoneyRupeeCircleLine className="font-extrabold text-2xl" />
                    </Link>
                  </div>
                  <Link to="/employee/advanced">
                    <h3 class="text-lg font-semibold mt-4 text-gray-800">
                      Advance Money Request
                    </h3>
                  </Link>
                </div>

                {/* <!-- Card 3 --> */}
                <div class="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
                  <div class="text-yellow-500 bg-yellow-100 p-4 rounded-full">
                    <Link to="/employee/payslip">
                      {" "}
                      <MdPayment className="font-extrabold text-2xl" />
                    </Link>
                  </div>
                  <Link to="/employee/payslip">
                    <h3 class="text-lg font-semibold mt-4 text-gray-800">
                      Download Payment Slip
                    </h3>
                  </Link>
                </div>

                {/* <!-- Card 4 --> */}
                <div class="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
                  <div class="text-red-500 bg-[#E1EFFE] p-4 rounded-full">
                    <Link to="/employee/assets">
                      <FaLaptopHouse className="font-extrabold text-2xl" />
                    </Link>
                  </div>
                  <Link to="/employee/assets">
                    <h3 class="text-lg font-semibold mt-4 text-gray-800">
                      View Assets
                    </h3>
                  </Link>
                </div>
                <div class="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
                  <div class="text-red-500 bg-[#E1EFFE] p-4 rounded-full">
                    <Link to="/employee/notes">
                      <LuNotebookPen className="font-extrabold text-2xl" />
                    </Link>
                  </div>
                  <Link to="/employee/notes">
                    <h3 class="text-lg font-semibold mt-4 text-gray-800">
                      Notes
                    </h3>
                  </Link>
                </div>
                <div class="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
                  <div class="text-red-500 bg-[#E1EFFE] p-4 rounded-full">
                    <Link to="/employee/gatepass/request">
                      <GiSecurityGate className="font-extrabold text-2xl" />
                    </Link>
                  </div>
                  <Link to="/employee/gatepass/request">
                    <h3 class="text-lg font-semibold mt-4 text-gray-800">
                      Request Gate Pass
                    </h3>
                  </Link>
                </div>
                <div class="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
                  <div class="text-red-500 bg-[#E1EFFE] p-4 rounded-full">
                    <Link to="/employee/cause/notice">
                      <FiAlertTriangle className="font-extrabold text-2xl" />
                    </Link>
                  </div>
                  <Link to="/employee/gatepass/request">
                    <h3 class="text-lg font-semibold mt-4 text-gray-800">
                      Show Cause Notice
                    </h3>
                  </Link>
                </div>
                <div class="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
                  <button onClick={handleLogout}>
                    <div class="text-red-500 bg-red-100 p-4 rounded-full">
                      <BiLogOut className="font-extrabold text-2xl" />
                    </div>{" "}
                    <h3 class="text-lg font-semibold mt-4 text-gray-800">
                      Logout
                    </h3>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmpHome;
