import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const RequestOTP = ({ onRequestSuccess }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook to navigate to another route

  const handleRequestOTP = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/reset-password/request`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      setMessage(data.message);

      if (data.success) {
        // Store email and navigate to OTP verification page
        onRequestSuccess(email); // Pass email to the parent component
        navigate("/employee/reset/password", { state: { email } }); // Pass email to next page
      }
      setLoading(false);
    } catch (error) {
      console.log("Error in handleRequestOTP:", error);
      setMessage("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
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
            Please enter the email for reset the password.
          </p>

          {/* Username Field */}

          <label
            htmlFor="username"
            className="block text-sm font-medium  text-gray-600"
          >
            Email
          </label>
          <input
            type="text"
            id="username"
            name="username"
            required
            placeholder="Enter your email/username"
            className="mt-2 block w-full px-4 mb-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleRequestOTP}
            className="w-full px-3 py-3 text-white font-bold bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg shadow-lg hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-indigo-300"
          >
            {loading ? "Loading..." : "Request OTP"}
          </button>
          <p className="text-center pt-4">
            Employee login here ?{" "}
            <Link to="/employee/login" className="text-[#2C5FF0]">
              Login
            </Link>
          </p>
          {message && <p className="text-center text-sm mt-4">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default RequestOTP;
