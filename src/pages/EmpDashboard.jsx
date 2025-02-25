import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 

function EmpDashboard() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [activeTime, setActiveTime] = useState(0); // State to store active time

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [empId, setEmpId] = useState("");

  const navigate = useNavigate(); // to navigate after logout

  // Menu open and close handlers
  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  // Set user data from local storage or other source
  useEffect(() => {
    const storedUser = localStorage.getItem("employeeLogin");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log(parsedUser.data.userResponse.firstName);
        setUsername(parsedUser.data.userResponse.firstName);
        setEmail(parsedUser.data.userResponse.email);
        setEmployeeId(parsedUser.data.userResponse._id);
        console.log(parsedUser);
      } catch (error) {
        console.error("Error parsing user data from local storage:", error);
      }
    }
  }, []);

  // In your frontend code (e.g., EmpDashboard.jsx)
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/${employeeId}/logout`
      );
      console.log(response.data);
      localStorage.removeItem("employeeLogin");
      localStorage.removeItem("reqLeave");
      localStorage.removeItem("employeeNotes");

      toast.success("Employee logout successfully!", {
        position: "top-right",
        autoClose: 1000,
        onClose: () => {
          navigate("/employee/login"); // Navigate to login page
          setTimeout(() => {
            window.location.reload(); // Reload the page after navigation
          }, 100); // Add a slight delay to ensure navigation is complete
        },
      });
      // Perform any additional actions like redirecting or removing from localStorage
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // First useEffect to get employeeId from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("employeeLogin");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setEmpId(parsedUser.data.userResponse._id); // Set empId from parsed data
        console.log(parsedUser);
      } catch (error) {
        console.error("Error parsing user data from local storage:", error);
      }
    }
  }, []);

  // Second useEffect to fetch active time once empId is available
  useEffect(() => {
    if (empId) {
      // Only run if empId is available
      const fetchActiveTime = async () => {
        try {
          const response = await axios.get(
            `${
              import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
            }/api/v1/user/employee/${empId}/active/time`
          );
          setActiveTime(response.data.activeTime); // Set active time to state
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching active time:", error);
        }
      };

      fetchActiveTime(); // Fetch active time on component mount
    }
  }, [empId]); // Dependency array includes empId to run only when empId changes

  return (
    <div>
      <ToastContainer />
      <Box>
        <AppBar position="static" className="bg-[#ffffff]">
          <Container maxWidth="xl" className="bg-[#ffffff]">
            <Toolbar disableGutters className="bg-[#ffffff]">
              <AdbIcon
                className="text-[#6875F5]"
                sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
              />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/employee/home"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 800,
                  color: "inherit",
                  textDecoration: "none",
                }}
                className="text-[#6875F5]"
              >
                <h4 className="text-[#6875F5] font-bold text-2xl">
                  Deepnap Softech
                </h4>
              </Typography>

              {/* Mobile Menu Button */}
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon className="text-[#6875F5] font-extrabold" />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{ display: { xs: "block", md: "none" } }}
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link to="/employee/home" className="block px-4 py-2">
                      Home
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link to="/employee/attendence" className="block px-4 py-2">
                      View Attendance
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link
                      to="/employee/request/leave"
                      className="block px-4 py-2"
                    >
                      Request Leave
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link to="/employee/documents" className="block px-4 py-2">
                      Documents
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link to="/employee/advanced" className="block px-4 py-2">
                      Advanced
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link to="/employee/payslip" className="block px-4 py-2">
                      Payslip
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link to="/employee/assets" className="block px-4 py-2">
                      Assets
                    </Link>
                  </MenuItem>
                </Menu>
              </Box>

              {/* Desktop Menu */}
              <Box
                sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
                className="text-[#6875F5] font-semibold"
              >
                <Link to="/employee/home" className="block px-4 py-2">
                  Home
                </Link>
                <Link to="/employee/attendence" className="block px-4 py-2">
                  View Attendance
                </Link>
                <Link to="/employee/request/leave" className="block px-4 py-2">
                  Request Leave
                </Link>
                <Link to="/employee/documents" className="block px-4 py-2">
                  Documents
                </Link>
                <Link to="/employee/advanced" className="block px-4 py-2">
                  Advanced Money
                </Link>
                <Link to="/employee/payslip" className="block px-4 py-2">
                  Payslip
                </Link>
                <Link to="/employee/assets" className="block px-4 py-2">
                  Assets
                </Link>
              </Box>

              {/* User Menu */}
              <Box
                sx={{
                  flexGrow: 0,
                  display: "flex",
                  gap: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h1 className="capitalize text-black font-bold">
                  {username ? username : ""}{" "}
                </h1>
                <Tooltip title="Open settings">
                  <IconButton
                    className="w-10 h-10 rounded-full border  border-indigo-500 cursor-pointer"
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0 }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src="data:image/jpeg;base64,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"
                      className="w-10 h-10 rounded-full border  border-indigo-500 cursor-pointer"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <div className="border-b-2">
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography sx={{ textAlign: "center" }}>
                        {username ? username : ""}
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography sx={{ textAlign: "center" }}>
                        {email ? email : ""}
                      </Typography>
                    </MenuItem>
                  </div>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: "center" }}>
                      <Link to="/employee/home">Dashboard</Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <button onClick={handleLogout}>
                      <Typography sx={{ textAlign: "center" }}>
                        Logout
                      </Typography>
                    </button>
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      
    </div>
  );
}

export default EmpDashboard;
