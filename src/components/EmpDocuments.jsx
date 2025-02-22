import React, { useState, useEffect } from "react";
import EmpDashboard from "../pages/EmpDashboard";

const EmpDocuments = () => {
  // state for the login user
  const [user, setUser] = useState("");
  const [bankDetails, setBankDetails] = useState("");
  const [backgroundDetails, setBackgroundDetails] = useState("");

  // local storage
  useEffect(() => {
    const storedUser = localStorage.getItem("employeeLogin");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser.data.userResponse);
        setBankDetails(parsedUser.data.userResponse.bankVerification);
        setBackgroundDetails(
          parsedUser.data.userResponse.backgroundVerification
        );
      } catch (error) {
        console.error("Error parsing user data from local storage:", error);
      }
    }
  }, []);

  const isDataAvailable = user && bankDetails && backgroundDetails;

  return (
    <>
      <EmpDashboard />

      {/* Conditional Rendering */}
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="bg-blue-600 text-white text-center py-4 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold">Employee Documents</h2>
          </div>

          {isDataAvailable ? (
            <div className="relative overflow-x-auto pt-10">
              <table className="w-full text-sm text-gray-500 dark:text-gray-400">
                <thead className="text-xs uppercase bg-[#E5E7EB] text-black dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Email-id</th>
                    <th className="px-6 py-3">Salary</th>
                    <th className="px-6 py-3">Aadhar No.</th>
                    <th className="px-6 py-3">PAN Number</th>
                    <th className="px-6 py-3">Driving License</th>
                    <th className="px-6 py-3">Voter Card</th>
                    <th className="px-6 py-3">Account Name</th>
                    <th className="px-6 py-3">Account Number</th>
                    <th className="px-6 py-3">Holder Name</th>
                    <th className="px-6 py-3">IFSC Code</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {user.firstName}
                    </td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.salary}</td>
                    <td className="px-6 py-4">{backgroundDetails.addhar}</td>
                    <td className="px-6 py-4">{backgroundDetails.pan}</td>
                    <td className="px-6 py-4">{backgroundDetails.driving}</td>
                    <td className="px-6 py-4">{backgroundDetails.voterCard}</td>
                    <td className="px-6 py-4">{bankDetails.accountName}</td>
                    <td className="px-6 py-4">{bankDetails.accountNumber}</td>
                    <td className="px-6 py-4">{bankDetails.holderName}</td>
                    <td className="px-6 py-4">{bankDetails.ifscCode}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-10">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Document not added
              </h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EmpDocuments;
