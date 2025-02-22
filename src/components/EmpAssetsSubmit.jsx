import React, { useState, useEffect } from "react";
import EmpDashboard from "../pages/EmpDashboard";
import { Button } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmpAssetsSubmit = () => {
  const [user, setUser] = useState(null); // Holds user data
  const [assets, setAssets] = useState([]); // Holds assets data
  const [returning, setReturning] = useState(false);

  // Fetch user and assets from the backend API
  const fetchAssets = async () => {
    try {
      const storedUser = localStorage.getItem("employeeLogin");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser).data.userResponse;

        const response = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/api/v1/user/employeeWithAssets`
        );

        const fetchedUser = response.data.find(
          (employee) => employee._id === parsedUser._id
        );

        if (fetchedUser) {
          setUser(fetchedUser);
          setAssets(fetchedUser.assets || []);
        } else {
          toast.error("User not found in the response.", {
            position: "top-right",
            autoClose: 1000,
          });
        }
      }
    } catch (error) {
      console.error("Error fetching assets:", error);
      toast.error("Failed to fetch assets. Please try again later.", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchAssets();
  }, []);

  // Handle asset return
  const handleReturnAssets = async () => {
    setReturning(true);
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/clear/assets`,
        {
          employeeId: user._id,
        }
      );

      if (response.status === 200) {
        toast.success("Assets returned successfully!", {
          position: "top-right",
          autoClose: 1000,
        });

        // Refresh data after successful return
        fetchAssets();
      } else {
        toast.error("Failed to return assets. Please try again.", {
          position: "top-right",
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error("Error returning assets:", error);
      toast.error("Failed to process the return request.", {
        position: "top-right",
        autoClose: 1000,
      });
    } finally {
      setReturning(false);
    }
  };

  const isDataAvailable = user && assets.length > 0;

  // Format date helper function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Converts date to a readable string
  };

  return (
    <>
      <EmpDashboard />
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="bg-blue-600 text-white text-center py-4 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold">Employee Assets</h2>
          </div>

          {isDataAvailable ? (
            <div className="relative overflow-x-auto pt-10">
              <table className="w-full text-center text-sm text-gray-500 dark:text-gray-400">
                <thead className="text-xs uppercase bg-[#E5E7EB] text-black dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Email-id</th>
                    <th className="px-6 py-3">Assign Assets Date</th>
                    <th className="px-6 py-3">Assets</th>
                    <th className="px-6 py-3">Request Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {user.firstName}
                    </td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{formatDate(user.updatedAt)}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {assets.map((asset, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full"
                          >
                            {asset}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={handleReturnAssets}
                        disabled={returning || assets.length === 0}
                      >
                        {returning ? "Processing..." : "Return Assets"}
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-10">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                No assets assigned to you.
              </h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EmpAssetsSubmit;
