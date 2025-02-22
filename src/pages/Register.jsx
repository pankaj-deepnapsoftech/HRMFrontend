import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import adminLogin from "../img/adminLogin.png";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phnNumber, setPhnNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactId, setContactId] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Make sure passwords match
    if (password !== confirmPassword) {
      toast.error("confirm password do not match!");
      return;
    }

    // Prepare the data to send to the backend
    const userData = {
      username,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phnNumber,
      contactId,
    };

    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/register`, // Correct the endpoint if needed
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);

      // Store user data in local storage
      localStorage.setItem("registerUser", JSON.stringify(response.data));

      toast.success("User registered successfully!", {
        position: "top-right",
        autoClose: 1000,
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error("User registration failed", {
        position: "top-right",
        autoClose: 1000,
      });
      setLoading(false);
    }
  };

  return (
    <>
       <ToastContainer />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f4ff] to-[#d9e8ff] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-5xl">
          {/* Left Section with Illustration */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-tr from-[#6c63ff] to-[#b993d6] justify-center items-center relative">
            {/* Decorative Circles */}
            <div className="absolute w-48 h-48 bg-white/20 rounded-full blur-2xl"></div>
            <div className="absolute w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <img
              src={adminLogin}
              alt="Login Illustration"
              className="relative z-10 w-3/4 object-contain"
            />
          </div>

          {/* Right Section with Form */}
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:w-1/2">
            <form onSubmit={submitHandler} className="space-y-6">
              {/* Header Section */}
              <div className="mb-6 ">
                <h5 className="text-sm sm:text-2xl font-semibold text-gray-700">
                  <Link>Register</Link>
                </h5>
                <p className="text-sm text-gray-500 mt-2">
                  Already have an account as Admin?{" "}
                  <span className="text-blue-600">
                    <Link to="/Login">Log in</Link>
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  If you're an employee,{" "}
                  <span className="text-blue-600">
                    <Link to="/employee/Login">Log in</Link>
                  </span>
                </p>
              </div>

              {/* Form Fields */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="First name"
                    name="firstName"
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Last name"
                    name="lastName"
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Choose a Username"
                  name="username"
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Your Email Address"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Choose a Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm Your Password"
                    name="confirmPassword"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Phone Number"
                    name="phnNumber"
                    onChange={(e) => setPhnNumber(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Preferred Contact ID
                </label>
                <input
                  type="text"
                  placeholder="Enter your preferred ID"
                  name="contactId"
                  onChange={(e) => setContactId(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
