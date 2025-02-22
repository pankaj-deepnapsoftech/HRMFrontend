import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import adminLogin from "../img/adminLogin.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userData = {
        email,
        password,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/user/Login`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);

      // Store user data in local storage
      localStorage.setItem("userLogin", JSON.stringify(response.data));

      toast.success("Admin Login successful!", {
        position: "top-right",
        autoClose: 1000,
      });

      // Navigate to the home page
      setTimeout(() => {
        navigate("/home");
        window.location.reload(); // Ensures the page reloads after login
      }, 3100);
    } catch (error) {
      console.log("Login failed", error);
      toast.error(
        error.response.data.message || "Login failed. Please try again.",
        {
          position: "top-right",
          autoClose: 1000,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f4ff] to-[#d9e8ff]">
        <div className="flex flex-col lg:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-5xl">
          {/* Left Section with Illustration */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-tr from-[#6c63ff] to-[#b993d6] justify-center items-center relative">
            <div className="absolute w-64 h-64 bg-white/20 rounded-full blur-2xl"></div>
            <div className="absolute w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
            <img
              src={adminLogin}
              alt="Login Illustration"
              className="w-3/4 object-contain"
            />
          </div>

          {/* Right Section with Form */}
          <div className="flex flex-col justify-center p-8 lg:w-1/2">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
              Welcome Back Admin!
            </h1>
            <p className="text-gray-500 text-center mb-6">
              Please login to access your account.
            </p>
            <form onSubmit={submitHandler} className="space-y-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="Enter your email"
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
              <h1>
                Don't have an account?{" "}
                <Link to="/register" className="text-[#586EF1]">
                  Register
                </Link>
              </h1>
              <Link
                to="/forgot/password"
                className="text-indigo-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
