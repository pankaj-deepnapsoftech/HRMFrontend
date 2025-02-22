import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoPersonCircleSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import LoginImg from "../img/loginImg.png"

const EmployeeLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState(null); // State for user's location
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to get user's location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching location:", error);
          toast.warn(
            "Unable to fetch location. Please enable location services.",
            {
              position: "top-right",
              autoClose: 3000,
            }
          );
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      email,
      password,
      location, // Ensure location is being set correctly before using
    };

    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/employee/login`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Log response for debugging
      console.log("Login response:", response);
         
      // Handle time data
      const date = new Date(response.data.data.createdAt);
      console.log(
        `Date: ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
      );
      console.log(
        `Time: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      );

      // Store user data in local storage
      localStorage.setItem("employeeLogin", JSON.stringify(response.data));
      console.log("Employee data stored in localStorage:", response.data);

    
      // Show success toast and navigate to home page after it completes
      toast.success("Employee Login successfully!", {
        position: "top-right",
        autoClose: 1000,
        onClose: () => {
          navigate("/employee/home");
          window.location.reload(); // Ensure the page reloads after navigation
        },
      });

      // Fallback navigation in case the toast onClose fails
      setTimeout(() => {
        navigate("/employee/home");
        window.location.reload(); // Ensure page state is fresh
      }, 3100); // Slight delay beyond toast autoClose
    } catch (error) {
      setLoading(false);
      // Show error toast
      
      toast.error(error.response.data.message || "Access denied. Your account has been terminated.", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="h-screen  flex items-center justify-center bg-gradient-to-br from-[#f0f4ff] to-[#d9e8ff]">
        <div className="flex flex-col lg:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-5xl">
          {/* Left Section with Illustration */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-tr from-[#6c63ff] to-[#b993d6] justify-center items-center relative">
            {/* Decorative Circle */}
            <div className="absolute w-64 h-64 bg-white/20 rounded-full blur-2xl"></div>
            <div className="absolute w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
            <img
              src={LoginImg}
              alt="Login Illustration"
              className="w-4/4 pr-[4rem] object-contain"
            />
          </div>

          {/* Right Section with Form */}
          <div className="flex flex-col justify-center p-8 lg:w-1/2">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
              Welcome Back !
            </h1>
            <p className="text-gray-500 text-center mb-6">
              Please login to access your employee account.
            </p>
            <form onSubmit={submitHandler} className="space-y-6">
              {/* Username Field */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-600"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  placeholder="Enter your email/username"
                  className="mt-2 block w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-600"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  placeholder="Enter your password"
                  className="mt-2 block w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-4 py-3 text-white font-bold bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg shadow-lg hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-indigo-300"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
            <div className="text-center text-sm text-gray-500 mt-6">
              <button>
                <Link to="/employee/forgot/password">Forgot Password?</Link>
              </button>
              <p className="text-center pt-1">
                Admin login here{" "}
                <Link to="/login" className="text-[#2C5FF0]">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeLogin;
