import React, { useEffect, useState } from "react";
import MainDashboard from "../pages/MainDashboard";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const EmpLocation = () => {
  const [getallUser, setAllUser] = useState([]);
  const [selectedUserLocation, setSelectedUserLocation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getAllUserRegisterDetails = async () => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/employee/all/registerDetails`
      );
      setAllUser(response.data.data.user);
    } catch (error) {
      toast.error(`Error fetching registered users: ${error}`);
    }
  };

  useEffect(() => {
    getAllUserRegisterDetails();
  }, []);

  const openMapPopup = async (location) => {
    try {
      const response = await axios(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          location
        )}.json?access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}`
      );


      const data = await response.data;
      const place = data.features[0];
      if (place) {
        const coordinates = place.center;
        setSelectedUserLocation(coordinates);
        setIsModalOpen(true);
      } else {
        toast.error("Location not found.");
        setSelectedUserLocation(null);
      }

    } catch (error) {
      toast.error(`Error fetching location: ${error}`);
    }
  };

  useEffect(() => {
    if (selectedUserLocation) {
      mapboxgl.accessToken = `${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}`;
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [selectedUserLocation[0], selectedUserLocation[1]],
        zoom: 13,
      });


      new mapboxgl.Marker()
        .setLngLat([selectedUserLocation[0], selectedUserLocation[1]])
        .addTo(map);

      return () => map.remove(); // Cleanup map on unmount
    }
  }, [selectedUserLocation]);

  return (
    <>
      <MainDashboard />
      <div>
        <div className="relative overflow-x-auto pt-6 lg:ml-[15rem] xs:ml-[4rem] p-2 max-w-7xl bg-gray-100 min-h-screen">
          <div className="bg-blue-600 text-white text-center py-4 mb-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">All Employee Locations</h2>
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-x-auto">
            <table className="w-full overflow-x-auto text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th className="px-6 py-3">Full Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Location</th>
                  <th className="px-6 py-3">Department</th>
                  <th className="px-6 py-3">Designation</th>
                  <th className="px-6 py-3">Emp-code</th>
                </tr>
              </thead>
              <tbody>
                {getallUser.length > 0 ? (
                  getallUser.map((user) => (
                    <tr
                      key={user._id}
                      className={`border-b transition-all ${
                        user.Empstatus === "terminated"
                          ? "bg-gray-100 text-gray-400"
                          : "bg-white"
                      }`}
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {user.firstName} {user.lastName}
                      </td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => openMapPopup(user.location)}
                          className="text-blue-500 cursor-pointer"
                        >
                          View Location
                        </button>
                      </td>
                      <td className="px-6 py-4">{user.department}</td>
                      <td className="px-6 py-4">{user.role}</td>
                      <td className="px-6 py-4">{user.employeeCode}</td>
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

        {isModalOpen && (
          <>
            <div
              className="fixed overflow-x-auto inset-0 bg-black bg-opacity-50 z-50"
              onClick={() => setIsModalOpen(false)}
            ></div>
            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "80%",
                height: "70%",
                zIndex: 1000,
                backgroundColor: "white",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
                overflow: "hidden",
                marginLeft: "8rem",
              }}
            >
              <button
                className="absolute top-3 right-3 text-gray-700"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
              <div id="map" style={{ width: "100%", height: "100%" }} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default EmpLocation;
