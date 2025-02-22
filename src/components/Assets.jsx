import React, { useContext, useState } from "react";
import MainDashboard from "../pages/MainDashboard";
import { EmployeeContext } from "../context/EmployeeContext";
import { Button } from "@mui/material";
import CreatableSelect from "react-select/creatable"; // Use CreatableSelect for custom assets
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Assets = () => {
  const { employees, setRefresh } = useContext(EmployeeContext);
  const [selectedAssets, setSelectedAssets] = useState({});
  const [assetOptions, setAssetOptions] = useState([
    { value: "Laptop", label: "Laptop" },
    { value: "Bike", label: "Bike" },
    { value: "Mobile", label: "Mobile" },
    { value: "Headset", label: "Headset" },
  ]);
  const [assigning, setAssigning] = useState({});

  // Handle asset selection, including custom ones
  const handleAssetChange = (selected, employeeId) => {
    setSelectedAssets((prev) => ({
      ...prev,
      [employeeId]: selected,
    }));
  };

  // Add new custom assets to the global asset options
  const handleCreateAsset = (inputValue) => {
    const newAsset = { value: inputValue, label: inputValue };
    setAssetOptions((prevOptions) => [...prevOptions, newAsset]);
    toast.success(`Custom asset "${inputValue}" added!`, {
      position: "top-right",
      autoClose: 1000,
    });
  };

  // Assign selected assets to an employee
  const assignAssets = async (employeeId) => {
    const assets =
      selectedAssets[employeeId]?.map((asset) => asset.value) || [];

    if (assets.length === 0) {
      alert("Please select or add at least one asset to assign.");
      return;
    }

    setAssigning((prev) => ({ ...prev, [employeeId]: true }));

    try {
      await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/assign/assets`,
        {
          employeeId,
          assetIds: assets,
        }
      );
      setRefresh();
      toast.success("Assets added successfully!", {
        position: "top-right",
        autoClose: 1000,
      });

      setSelectedAssets((prev) => ({ ...prev, [employeeId]: [] }));
    } catch (error) {
      toast.error("Failed to add assets!", {
        position: "top-right",
        autoClose: 1000,
      });
    } finally {
      setAssigning((prev) => ({ ...prev, [employeeId]: false }));
    }
  };

  return (
    <>
      <MainDashboard />
      <div>
        <div className="relative overflow-x-auto pt-6 lg:ml-[15rem] xs:ml-[4rem] p-2 max-w-7xl min-h-screen bg-gray-100">
          <div className="bg-blue-600 text-white text-center py-4 mb-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Assign Assets</h2>
          </div>
          <div className="bg-white  shadow-md rounded-lg">
            <table className="w-full  text-sm text-left text-gray-500">
              <thead className="text-xs overflow-x-auto  text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Department</th>
                  <th className="px-6 py-3">Designation</th>
                  <th className="px-6 py-3">Added Assets</th>
                  <th className="px-6 py-3">Assets</th>
                  <th className="px-6 py-3">Add</th>
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
                      <td className="px-2 py-4">
                        {user.Empstatus === "terminated" ? (
                          ""
                        ) : (
                          <CreatableSelect
                            options={assetOptions}
                            isMulti
                            value={selectedAssets[user._id] || []}
                            onChange={(selected) =>
                              handleAssetChange(selected, user._id)
                            }
                            onCreateOption={handleCreateAsset}
                            placeholder="Assign or add assets"
                            className="w-60"
                          />
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {user.Empstatus === "terminated" ? (
                          ""
                        ) : (
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => assignAssets(user._id)}
                            disabled={assigning[user._id]}
                          >
                            {assigning[user._id] ? "Assigning..." : "Add"}
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
    </>
  );
};

export default Assets;
