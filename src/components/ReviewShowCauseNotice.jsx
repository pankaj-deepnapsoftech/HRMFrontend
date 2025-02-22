import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import MainDashboard from "../pages/MainDashboard";
import { EmployeeContext } from "../context/EmployeeContext";

const ReviewShowCauseNotice = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/get/showcause/notice`
      )
      .then((response) => {
        console.log("Fetched Notices:", response.data.showCauseNotices);
        console.log("Fetched Notices:", response.data.showCauseNotices);
        setNotices(
          Array.isArray(response.data.showCauseNotices)
            ? response.data.showCauseNotices
            : []
        );
      })
      .catch((error) =>
        console.error("Error fetching show cause notices:", error)
      );
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const requestBody = {
        status,
        noticeId: id,
      };

      console.log("Sending data:", requestBody);

      const response = await axios.put(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/update/showcause/notice/${id}`,
        requestBody
      );

      if (response.status === 200) {
        setNotices((prevNotices) =>
          prevNotices.map((notice) =>
            notice._id === id ? { ...notice, status } : notice
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <>
      <MainDashboard />
      <div className="relative min-h-screen overflow-x-auto pt-6 lg:ml-[15rem] xs:ml-[4rem] p-4 max-w-7xl bg-gray-100">
        <div className="bg-blue-600 text-white text-center py-4 mb-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold">Employee Show Cause Notices</h2>
        </div>
        <table className="w-full text-center border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Complaint By</th>
              <th className="border border-gray-300 px-4 py-2">Department</th>
              <th className="border border-gray-300 px-4 py-2">Reason</th>
              <th className="border border-gray-300 px-4 py-2">Issued At</th>
              <th className="border border-gray-300 px-4 py-2">Complaint To</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(notices) ? (
              notices.map((notice, index) => (
                <tr key={notice._id || index}>
                  {" "}
                  {/* Make sure _id is always unique */}
                  <td className="border border-gray-300 px-4 py-2">
                    {notice.employeeName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {notice.department}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {notice.reason}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(notice.issuedAt).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {notice.selectedEmployee?.name} (
                    {notice.selectedEmployee?.employeeCode})
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {notice.status}
                  </td>
                  <td className="border border-gray-300 px-2 py-3">
                    <button
                      onClick={() =>
                        handleStatusChange(
                          notice._id,
                          "Reviewed",
                          notice.employeeId
                        )
                      }
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Mark as Reviewed
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No notices available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ReviewShowCauseNotice;
