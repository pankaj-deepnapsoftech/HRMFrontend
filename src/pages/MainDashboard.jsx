import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import { BsPersonCircle } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { RiListSettingsLine, RiMoneyRupeeCircleLine } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineStickyNote2, MdPerson } from "react-icons/md";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { EmployeeContext } from "../context/EmployeeContext";
import { useContext } from "react";
import { ProjectContext } from "../context/ProjectContext";
import { FcLeave } from "react-icons/fc";
import FrontPage from "../components/FrontPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlinePendingActions } from "react-icons/md";
import axios from "axios";
import { FcMoneyTransfer } from "react-icons/fc";
import { MdCoPresent } from "react-icons/md";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { TbReportMoney } from "react-icons/tb";
import { RiMenu5Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { FaFingerprint } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import { FaLocationDot } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { GiLaptop, GiMoneyStack, GiTakeMyMoney } from "react-icons/gi";
import { MdOutlineBlock } from "react-icons/md";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { RiSecurePaymentLine } from "react-icons/ri";
import { GiSecurityGate } from "react-icons/gi";
import { FiAlertTriangle } from "react-icons/fi";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function Dashboard() {
  const theme = useTheme();
  // const [open, setOpen] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [presentCount, setPresentCount] = useState(0); // State to store present count
  const [absentCount, setAbsentCount] = useState(0); // State to store the absent count

  const [open, setOpen] = useState(true);

  // Function to toggle the open state of the drawer
  const toggleDrawer = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  // function to get the total present employee count
  useEffect(() => {
    const getPresentEmployee = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/api/v1/user/employee/attendance/present/count`
        ); // Log the response here
        setPresentCount(response.data.presentCount);
      } catch (err) {
        toast.error(`An error occured: ${err}`)
      }
    };
    getPresentEmployee();
  }, []);

  // function to get the total absent employee count
  useEffect(() => {
    const getAbsentEmployee = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/api/v1/user/employee/attendance/absent/count`
        );

        setAbsentCount(response.data.absentCount);
      } catch (err) {
        toast.error(`Error fetching present employees: ${err}`);
      }
    };
    getAbsentEmployee();
  }, []);

  //toggle drop down
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // navigate on onclick
  const handleNavigation = (path) => {
    navigate(path);
  };

  // function to get the local storage data
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("userLogin");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser({
          name: parsedUser.data.userResponse.username || "Unknown User",
          email: parsedUser.data.userResponse.email || "unknown@example.com",
        });
      } catch (error) {
        toast.error(`Error parsing user data from local storage: ${error}`);
      }
    }
  }, []);

  //funciton to delete login data from localstorage
  const handleLogout = () => {
    const getUser = localStorage.getItem("userLogin");
    if (getUser) {
      try {
        localStorage.removeItem("userLogin");
        toast.success("Admin logout successfully!", {
          position: "top-right",
          autoClose: 1000,
          onClose: () => {
            navigate("/login"); // Navigate to login page
            setTimeout(() => {
              window.location.reload(); // Reload the page after navigation
            }, 100); // Add a slight delay to ensure navigation is complete
          },
        });
      } catch (error) {
        toast.error("Admin logout failed", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  // function to get total present employee number

  const [showSettingsOptions, setShowSettingsOptions] = useState(false);

  const toggleSettingsOptions = () => {
    setShowSettingsOptions((prev) => !prev);
  };
  // conext for total project
  const { totalProject } = useContext(ProjectContext);
  //context for total registered user
  const { totalEmployee } = useContext(EmployeeContext);

  // for the attendece dropdown menu item
  const [attendanceOpen, setAttendanceOpen] = useState(false);
  const [payrollOpen, setPayrollOpen] = useState(false);

  const handleAttendanceToggle = () => {
    setAttendanceOpen(!attendanceOpen);
  };
  const handlePayrollToggle = () => {
    setPayrollOpen(!payrollOpen);
  };

  const menuItems = [
    {
      text: <span className="text-[1rem]  font-semibold">Dashboard</span>,
      icon: <FaHome className="text-2xl " />,
      path: "/home",
    },
    {
      text: <span className="text-[1rem] font-semibold">Employees</span>,
      icon: <BsPersonCircle className="text-2xl " />,
      path: "/employee-details",
    },
    {
      text: <span className="text-[1rem] font-semibold">Timesheet</span>,
      icon: <SlCalender className="text-2xl " />,
      path: "/timesheet",
    },
    {
      text: <span className="text-[1rem] font-semibold">Projects</span>,
      icon: <HiOutlineDocumentReport className="text-1xl " />,
      path: "/projects",
    },
    {
      text: <span className="text-[1rem] font-semibold">Reports</span>,
      icon: <RiListSettingsLine className="text-2xl " />,
      path: "/reports",
    },
    {
      text: (
        <span className="text-[1rem] font-semibold">Update Leave Balance</span>
      ),
      icon: <MdPerson className="text-2xl " />,
      path: "/employee/leave/changes",
    },
    {
      text: (
        <span className="text-[1rem] font-semibold">Salary Management</span>
      ),
      icon: <RiMoneyRupeeCircleFill className="text-2xl " />,
      path: "/employee/salary/management",
    },
    {
      text: <span className="text-[1rem] font-semibold">Attendence</span>,
      icon: <MdCoPresent className="text-2xl" />,
      onClick: handleAttendanceToggle,
      subMenu: [
        {
          text: (
            <span className="text-[1rem] font-semibold">Daily Attendence</span>
          ),
          icon: <MdCoPresent className="text-xl mr-2" />,
          path: "/employee/daily/attendance",
        },
        {
          text: (
            <span className="text-[1rem] font-semibold">All Attendance</span>
          ),
          icon: <FaFingerprint className="text-2xl mr-2" />,
          path: "/employee/all/attendence",
        },
        {
          text: <span className="text-[1rem] font-semibold">All Leave</span>,
          icon: <TbListDetails className="text-2xl mr-2" />,
          path: "/employee/all/leave",
        },
      ],
    },

    {
      text: <span className="text-[1rem] font-semibold">Emp Location</span>,
      icon: <IoLocationOutline className="text-2xl " />,
      path: "/employee/location",
    },
    {
      text: <span className="text-[1rem] font-semibold">Assets</span>,
      icon: <GiLaptop className="text-2xl " />,
      path: "/company/assets",
    },
    {
      text: <span className="text-[1rem] font-semibold">Terminated Emp</span>,
      icon: <MdOutlineBlock className="text-2xl " />,
      path: "/employee/termination",
    },
    {
      text: (
        <span className="text-[1rem] font-semibold">Gatepass Approval</span>
      ),
      icon: <GiSecurityGate className="text-2xl " />,
      path: "/gatepass/approval",
    },
    {
      text: (
        <span className="text-[1rem] font-semibold">Show Cause Notice</span>
      ),
      icon: <FiAlertTriangle className="text-2xl " />,
      path: "/view/employee/show/cause/notice",
    },
    {
      text: <span className="text-[1rem] font-semibold">Payroll</span>,
      icon: <RiMoneyRupeeCircleLine className="text-2xl" />,
      onClick: handlePayrollToggle,
      subMenu: [
        {
          text: <span className="text-[1rem] font-semibold">Payroll Summary</span>,
          icon: <MdOutlineStickyNote2 className="text-2xl mr-2" />,
          path: "/employee/payrollSummary",
        },
        {
          text: <span className="text-[1rem] font-semibold">Advanced Money</span>,
          icon: <TbReportMoney className="text-2xl mr-2" />,
          path: "/employee/advance/money/request",
        },
        {
          text: (
            <span className="text-[1rem] font-semibold">Incentives</span>
          ),
          icon: <GiMoneyStack  className="text-2xl mr-2" />,
          path: "/employee/incentives",
        },
        {
          text: <span className="text-[1rem] font-semibold">Reimbursements</span>,
          icon: <GiTakeMyMoney  className="text-2xl mr-2" />,
          path: "/employee/reimbursements",
        },
        {
          text: <span className="text-[1rem] font-semibold">Emp Payslip</span>,
          icon: <RiSecurePaymentLine className="text-2xl mr-2" />,
          path: "/generate/employee/payslip",
        },
        
      ],
    },
  ];

  return (
    <>
      <ToastContainer />
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar className="bg-[#ffffff]">
            <IconButton
              color="primary"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={[
                {
                  marginRight: 5,
                },
                open && { display: "none" },
              ]}
            >
              <MenuIcon />
            </IconButton>

            <div className="flex w-full justify-end gap-4">
              <h3 className="flex justify-center items-center gap-2 text-indigo-500 font-semibold indigo-500/50 ">
                <Link
                  className="flex gap-2"
                  to="/employee/request/leave/approval"
                >
                  {" "}
                 
                  <MdOutlinePendingActions className="text-2xl " />
                </Link>
              </h3>

              <img
                id="avatarButton"
                onClick={toggleDropdown}
                type="button"
                data-dropdown-toggle="userDropdown"
                data-dropdown-placement="bottom-start"
                class="w-10 h-10 rounded-full border  border-indigo-500 cursor-pointer"
                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw4NDQ8NDRAQDg0ODQ0ODw0NDQ8PDw4NFREWFxgRFRUYHSggGBoxGxMVLTEhJSouOjouFyAzODM4NygvLysBCgoKDg0OGhAQGCslHiYrLS0tLS0tLS0tLS8uLS0tKystMC8rMy0tLS0tLy0tLS0rMC0tKystKy0tLS0tLS0tLf/AABEIAOEA4QMBEQACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAwQCBgcFAf/EAD8QAAICAAIFBwkGBAcAAAAAAAABAgMEEQUGITFREhNBYXGBkQciIzJCUnKhsRRDgqLB0VNikvAkhLLC0uHx/8QAGgEBAAIDAQAAAAAAAAAAAAAAAAECAwQFBv/EAC0RAQACAgEDAgUDBQEBAAAAAAABAgMRBBIhMVFhBRMyQZFC0fAiUnGhsYEU/9oADAMBAAIRAxEAPwDuIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFDS2l6cJHOx5yfq1x2zl+y62ZcOC+WdVY8mWuOO7TdI60Yq7NVtUQ4V7Z5dcn+mR1MfCx1+rvLQvyr28dnhYiyyzbZOc3xnOUvqbda1r4iGCbTPmUEZTrecJSg+MJSi/kWmtZ8wRaY8S9PAa2Y3DtZz5+C3wu85909/1NfJwcV/Ean2Zqcm9fdu+gNZcPjvNj6O9LN0zazy4xftL+8jlZ+LfD58erexZq5PHl7ZrMwAAAAAAAAAAAAAAAAAAAAAAAAedpzSkcJTy/WslnGuHvS4vqRmwYZy219vuxZssY67c+usndN2WNynJ5uT+nUuo7daxSOmvhybWm07k5onaqOdROxWtgWiUqlkS8JV1OUJKcG4zi1KMovJxa6UyZiLRqUxOu8OoanaxfbqnCzJYmpLlpbFZHosS+q49qODzON8m248T/NOngzdcd/LYjUZwAAAAAAAAAAAAAAAAAAAAAABzvWHHPEYqbT8ytuqC6Mk9r73n3ZHb4uLoxx6z3cnkZOu/+FemBmmWusqnYU2ILoFokUrol4So2oyQlTtReEpdDaSlg8VViI55QllNL2qnslHw+aRjz4oy45r/ADbJjv0WiXa4SUkmnmmk01uaZ5l130AAAAAAAAAAAAAAAAAAAAACDHXc3TbZ7lVk/CLf6FqV6rRCtp1WZctpZ6KXFX6ZGOVVxWbCmhWukWiBQuZkhKjczJCVK0vCVWwsl2LU7EO3RuFk9rVSrz+BuH+083y69Oa0e7q4Z3jh7JrsoAAAAAAAAAAAAAAAAAAAACnpiDlhcRFb3h7ku3kMyYp1krPvCmSN0mPZy2qZ6GXGW67CkwhNzxGhHZaTECpbMvCVO2ReBUtZaEq1jLJh1zUOtx0Xhk+lWy7pWza+TPPc6d57fz7Opx41jhsBqMwAAAAAAAAAAAAAAAAAAAAD41msnuex9gHI8fh3hr7aJfdzcV1x3xfg14no8V/mUizjZK9NphjC0tpRnzpGhjK0nQgssLRArWTLQlWnIsIoVysnGuCznOUYQjxnJ5JeLJmYrEzK0Rt3PRuEWHoqojuqqhWnx5MUszyuS/XabT93XrXpiIWSqwAAAAAAAAAAAAAAAAAAAAABp+vmhXZFYypZzrjlbFb5VLdPu259XYdHgcjpn5dvE+GnysW46oaHGw7Gmgz5wjSGLsJ0lHKwnQgnMnQgnIlLdfJxoB2Wfb7V6OvNUJ+3Zuc+xbV29hzPiPJiI+VXz9/2bnGxbnrl0g4zeAAAAAAAAAAAAAAAAAAAAAAAADRNZ9TJZyvwKTTzc8NsWT41/wDHw4HV43O1/Tk/P7tLNxvvT8NHs5UJOE04yi8pRknGUXwae46sTExuGlMa7SwdhOkMJTJSjcs9i2ttJJb2+A8Gm4asaj23yjdjU6qdjVL2W29T9xfPs3nN5PxCtY6cfefVt4uPM97eHSqq4wioQSjGKUYxislGK2JJcDizMzO5b0RrszCQAAAAAAAAAAAAAAAAAAAAAAAAAUtI6Jw2KWWIqhZlsUpR85Lqktq7mZMeW+P6Z0pbHW3mHgYjyf4GTzjK+vqhYmvzJs26/Ec0edSwzxaMavJ7govOU8RPqlZBL8sUyZ+JZp8aRHEp7vc0ZoHB4TbRTCEssucacrMvjlmzVycjJk+qzNXFWviHpGFkAAAAAAAAAAAAAAAAAAAAAAAAAAANgedidO4SrZO+Ga3qDdjXdHMzV4+W3issVs1K+ZUZ634Nbucl1qvL6tGaODl9mOeXjfI634R7+dj21r9GJ4OX2P8A68a5h9YcFZsjfBPhZnX/AKkjFbjZa+aslc+O3iXpxkms0009zTzTMDK+gAAAAAAAAAAAAAAAAAAAAAAAHyTSWb2JbW3uSA1jS+uFdbcMKldNbOcefNJ9WW2Xd4m/h4Nrd79o/wBtTLyor2r3apjdJYjEv01kpL3F5sF+FbDo48GPH9MNK+W9/MoI1GTbEz5sbHx1jYinAlLPCY+/DvOiyVfVF+a+2L2MpfFTJ9UL1yWr4ltGiNdk2oYyKj0c9WnyfxR3rtXgc/N8PmO+Od+zcx8vfa7b6rYzipwkpQks4yi04tcU0c6YmJ1LciYnvDMhIAAAAAAAAAAAAAAAAAAAEeIvhVCVlklCEFnKT3JE1rNp1HlEzERuXOtYNYrMZJ1wzrwyeyG6VnXP9jtcfiVxRu3e3/HMzcib9o8PKrgbUy11mFZWZQnjWV2MnWNoRzgSlBYi0CtYi0JVbC0JX9Baw3YCfm+fS3nOlvY/5o+7L+2YORxa5o9J9WbFmtjn2dR0ZpCrFVRuplyoS8Yy6YyXQzg5Mdsdum3l06Xi0bhaKLAAAAAAAAAAAAAAAAAAA5vrXp14u3mqn/h65bMt1s17fZw8Tt8PjfLr1W8z/pzORm651Hh49UTblrLdUCkyhbrgUmULMKyux8nDICtai8CpaWhKray8JVLGXhKtYy0D0dWdPz0ffytsqJtK6tdMffS95f8AXZr8rjRmp7x4/Zmw5ZpPs7BTbGyEZwalCcVKMk81KLWaaPOzExOpdSJ33hmQkAAAAAAAAAAAAAAAAa1rxpX7Ph1TB5W4jOOa3xqXrP5pd74G7wcPXfqnxDW5OTprqPMufVI7UuYt1IpIt1IrKFyopKFlSSRVCC2ZMQlTtkXgVLZF4SqWyLwlVskWhKtYywrzZaFodC8mOmuXGeAse2tOylv+Hn50O5tP8T4HH+JYNTGSPv5bvFyfplvpym4AAAAAAAAAAAAAAAAOU60Y/wC0462SecK3zMPhg2n+blPvPQcTH8vFHv3crPfqvKjWZ5YFqspKFqtlRYhMrMIZO0jQhssLRArWTLRCVWyZaEqlki8JVrJFoFeciyUE2WhKzobSDwmKpxK+6sUpJdNb2SX9LZjz4/mY5p6rUt02iXeISUkpJ5ppNNdKfSeVdd9AAAAAAAAAAAAAAAqaVxXMYa67prqsmuuSi8l45F8VOu8V9ZVvbprMuOVv/wBPTOMs1srKFiEionjMrpCRWEaB2DQinYW0K9lhbSVayZaISr2TLCtORYQTkTELImywAdo1HxfP6Mw0n60IOl8fRycF8orxPM8ynRmtH/v5dPBbeOHumszAAAAAAAAAAAAAANf17t5Gjbst85VQ8bI5/JM2+DXeerByZ1jly+DO+5aeEiomjMrpCVTI0PvODQ+OwaEUrC2hDOwnSVecy0QIJzJEE5FoWRSZYfAAHUPJVc5YK6D9jFSa+GVcP1TOF8UrrLE+sN/iT/TMe7dTmtoAAAAAAAAAAAAAB4mueDlfo+6MFnKCjakt75ElJpdeSZs8O8UzVmWHPXqxy5NCR6JyksZFRIpkDNTGkHODQxdg0lHKwnQilMnQhnMslDKROkopMsPgAAB1byY4KVWBlbJZfaLpTjn/AA4pRT8Yy8TgfEskWzaj7Q6HFrqm/Vt5z2yAAAAAAAAAAAAAAAc+1n1LnGcr8EuVBtylh160H08jiv5fDguvxefGunJ+f3aObjTvdPw0xtxbi04yTycWmmnwa6GdONTG4acw+qY0hlywPjmNDFzJ0I5TCUcpkiKUi2ksGyR8AAfANw1Y1GuxMo24tSow+x8h5xutXDL2F1vbw4nN5PxCtI6cfef9Q2cXHm3e3aHU6q4wjGEEowjFRjGKyUYpZJJHDmZmdy34jTMhIAAAAAAAAAAAAAAAA83S2gsLjF6etOeWStj5ti/Et/YzNi5GTF9Msd8Vb+YahpHye2LN4W+Ml0QvTi/64rb4I6OP4nH66/hq24k/plr2M1Y0hT62HnJe9Vlan3RzfyNynMw2/V+WC2DJH2eTfCdeyyE63wshKD+ZnratvE7Y5iY8wh5zrL6QxcydJYOROhg5AZ01yseVcZTfCEXJ+CIm0V8yR38PVwerGkLsuRhbUn02R5pdvn5GvfmYaebR/wBZIw3nxDYdHeTe+WTxN0Ko+5UnZNrhm8kn4mnk+KVj6K7/AMs9eLafqluWhdVsFgspVV8q1ffWvl2dq6I9yRzc3Ly5fqnt6NmmGlPEPbNdlAAAAAAAAAAAAAAAAAAAAAAPjQFezAUT9emqXxVQf1RaL2jxMq9MeiB6DwT34XDPtw1X7F/n5P7p/Mo+XT0h8WgsCt2Ewy/y1X7D5+X+6fzJ8unpCevRuHh6tFMfhqgvois5Lz5tKemvosqKWxLJcEUWfQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/2Q=="
                alt="User dropdown"
              />

              <div
                id="userDropdown"
                className={`absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 transition-opacity duration-200 ${
                  isDropdownOpen ? "block" : "hidden"
                }`}
              >
                <div className="px-4 py-3 font-semibold text-sm text-gray-900 dark:text-white">
                  <div className="font-semibold">
                    {user ? user.name : <Link to="/login">Login</Link>}
                  </div>
                  <div className="font-medium truncate">
                    {user ? user.email : ""}
                  </div>
                </div>
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="avatarButton"
                >
                  <li>
                    <Link
                      to="/home"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/employee-details"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Employee
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/employee/Login"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Login as employee
                    </Link>
                  </li>
                </ul>
                <div className="py-1">
                  {user ? (
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Logout
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </Toolbar>
        </AppBar>

        <Drawer
          open={open}
          variant="permanent"
          sx={{
            width: { xs: 60, sm: 100, md: 240 }, 
            flexShrink: 0,
            transition: "width 0.3s ease",
          }}
        >
          <DrawerHeader className="bg-[#FFFFFF] object-fit flex justify-center  items-center">
            <img
              className="lg:w-[5vw] xs:w-[15vw]"
              src="data:image/jpeg;base64,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"
            />
            <h5 className="pr-[2rem] font-semibold">
              <Link to="/home">Deepnap Softech</Link>
            </h5>

            <div className="lg:hidden flex flex-col items-center justify-center">
              <IconButton
                onClick={toggleDrawer}
                sx={{ position: "absolute", right: 8 }}
              >
                <MenuIcon className="text-black font-bold" />
              </IconButton>
            </div>
          </DrawerHeader>

          <List className="border-none text-3xl bg-[#F5F9FE] dark:bg-[#1F2937]">
            {menuItems.map(({ text, icon, path, subMenu, onClick }) => (
              <React.Fragment key={text}>
                <ListItem
                  className="p-1"
                  key={text}
                  disablePadding
                  sx={{ display: "block" }}
                >
                  <ListItemButton
                    sx={[
                      {
                        minHeight: 55,
                        px: 1.5,
                        transition: "all 0.3s ease-in-out",
                        color: "#333333", 
                        "&:hover": {
                          backgroundColor: "#0080FC",
                          cursor: "pointer",
                          color: "white", 
                          borderRadius: "8px",
                        },
                        "&:hover .MuiListItemIcon-root, &:hover .MuiListItemText-primary":
                          {
                            color: "white",
                          },
                      },
                      open
                        ? { justifyContent: "initial" }
                        : { justifyContent: "center" },
                    ]}
                    onClick={onClick || (() => handleNavigation(path))}
                  >
                    <ListItemIcon
                      className="MuiListItemIcon-root"
                      sx={[
                        {
                          minWidth: 0,
                          justifyContent: "center",
                          color: "#6B7280",
                        },
                        open ? { mr: 2 } : { mr: "auto" },
                      ]}
                    >
                      {icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={text}
                      className="MuiListItemText-primary text-[#333333]"
                      sx={[open ? { opacity: 1 } : { opacity: 0 }]}
                    />
                    {subMenu &&
                      (attendanceOpen || payrollOpen ? (
                        <MdOutlineKeyboardArrowUp className="text-2xl" />
                      ) : (
                        <MdOutlineKeyboardArrowDown className="text-2xl" />
                      ))}
                  </ListItemButton>
                </ListItem>
                {subMenu && (attendanceOpen || payrollOpen) && (
                  <List className="pl-6">
                    {subMenu.map(({ text, icon, path }) => (
                      <ListItem key={text} disablePadding>
                        <ListItemButton
                          sx={{
                            px: 3,
                            transition: "all 0.3s ease-in-out",
                            color: "#333333", // Default text and icon color
                            "&:hover": {
                              backgroundColor: "#0080FC",
                              cursor: "pointer",
                              color: "white", // Hover text and icon color
                              borderRadius: "8px", // Rounded corners
                            },
                            "&:hover .MuiListItemIcon-root, &:hover .MuiListItemText-primary":
                              {
                                color: "white",
                              },
                          }}
                          onClick={() => handleNavigation(path)}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              justifyContent: "center",
                              color: "#6B7280",
                            }}
                          >
                            {icon}
                          </ListItemIcon>
                          <ListItemText primary={text} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                )}
              </React.Fragment>
            ))}
          </List>
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Typography sx={{ marginBottom: 2 }}>
            {/* <!-- Statistics Cards --> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
              {/* Total Enrollments Card */}
              <div className="bg-[#525EF6] shadow-md rounded-lg flex flex-col items-center justify-center p-5 transition-transform transform hover:scale-105">
                <p className="text-4xl font-bold text-white">{totalEmployee}</p>
                <p className="text-lg text-white opacity-90">
                  Total Enrollments
                </p>
              </div>

              {/* Total Projects Card */}
              <div className="bg-[#E371B4] shadow-md rounded-lg flex flex-col items-center justify-center p-5 transition-transform transform hover:scale-105">
                <p className="text-4xl font-bold text-white">{totalProject}</p>
                <p className="text-lg text-white opacity-90">Total Projects</p>
              </div>

              {/* Present Count Card */}
              <div className="bg-[#2FA68E] shadow-md rounded-lg flex flex-col items-center justify-center p-5 transition-transform transform hover:scale-105">
                <p className="text-4xl font-bold text-white">{presentCount}</p>
                <p className="text-lg text-white opacity-90">Present</p>
              </div>

              {/* Absent Count Card */}
              <div className="bg-[#51BAD6] shadow-md rounded-lg flex flex-col items-center justify-center p-5 transition-transform transform hover:scale-105">
                <p className="text-4xl font-bold text-white">{absentCount}</p>
                <p className="text-lg text-white opacity-90">Absent</p>
              </div>
            </div>

            {/* Additional Content Placeholder */}
            {/* ---------table=============== */}
          </Typography>
        </Box>
      </Box>
    </>
  );
}
