import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminResetPassword = () => {
  const location = useLocation();
  const { email } = location.state || {}; // Get the email passed from the previous page
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/admin/reset-password/verify`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp, newPassword }),
        }
      );

      const data = await response.json();
      setMessage(data.message);
      //handle the response
      toast.success("Employee password reset successfully!", {
        position: "top-right",
        autoClose: 1000,
        onClose: () => {
          navigate("/login");
        },
      });

      setLoading(false);
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="h-screen  flex items-center justify-center bg-gradient-to-br from-[#f0f4ff] to-[#d9e8ff]">
        <div className="flex flex-col  bg-white rounded-2xl shadow-2xl overflow-hidden  max-w-2xl">
          {/* Left Section with Illustration */}
          <div className="hidden lg:flex  bg-gradient-to-tr from-[#6c63ff] to-[#b993d6] justify-center items-center relative">
            {/* Decorative Circle */}
            <div className="absolute w-64 h-64 bg-white/20 rounded-full blur-2xl"></div>
            <div className="absolute w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
            <img
              src="https://cdn.prod.website-files.com/63c50a0cab4c86831ccbeef6/63e5dfffa9332278d24932fc_21404-removebg-preview.png"
              alt="Login Illustration"
              className="w-2/4 object-contain"
            />
          </div>

          {/* Right Section with Form */}
          <div className="flex flex-col justify-center p-8 ">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
              Welcome Back !
            </h1>
            <p className="text-gray-500 text-center mb-6">
              Please enter Verify OTP and Reset Password
            </p>

            {/* Username Field */}

            <label
              htmlFor="username"
              className="block text-sm font-medium  text-gray-600"
            >
              Enter OTP
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mt-2 block w-full px-4 mb-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
            />
            <label
              htmlFor="username"
              className="block text-sm font-medium  text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-2 block w-full px-4 mb-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
            />

            {/* Submit Button */}
            <button
              onClick={handleResetPassword}
              type="submit"
              className="w-full px-3 py-3 text-white font-bold bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg shadow-lg hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-indigo-300"
            >
              {loading ? "Loading..." : "Reset Password"}
            </button>
            <p className="text-center pt-4">
              Admin login here?{" "}
              <Link to="/login" className="text-[#2C5FF0]">
                Login
              </Link>
            </p>
            {message && <p className="text-center text-sm mt-4">{message}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminResetPassword;
