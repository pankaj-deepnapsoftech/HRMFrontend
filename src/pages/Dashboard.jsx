// import * as React from "react";
// import { styled, useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import MuiDrawer from "@mui/material/Drawer";
// import MuiAppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import CssBaseline from "@mui/material/CssBaseline";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import DashTable from "../components/Table";
// import { Link, useNavigate } from "react-router-dom";
// import { SlCalender } from "react-icons/sl";
// import { IoMdTimer } from "react-icons/io";
// import { GoProject } from "react-icons/go";
// import { BsPersonCircle } from "react-icons/bs";
// import { FaHome } from "react-icons/fa";
// import { HiOutlineDocumentReport } from "react-icons/hi";
// import { RiListSettingsLine } from "react-icons/ri";
// import { IoMdSettings } from "react-icons/io";
// import { MdPerson } from "react-icons/md";
// import { useState, useEffect } from "react";
// import { useContext } from "react";
// import { EmployeeContext } from "../context/EmployeeContext";

// const drawerWidth = 240;

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: "hidden",
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: "hidden",
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up("sm")]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   variants: [
//     {
//       props: ({ open }) => open,
//       style: {
//         marginLeft: drawerWidth,
//         width: `calc(100% - ${drawerWidth}px)`,
//         transition: theme.transitions.create(["width", "margin"], {
//           easing: theme.transitions.easing.sharp,
//           duration: theme.transitions.duration.enteringScreen,
//         }),
//       },
//     },
//   ],
// }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   variants: [
//     {
//       props: ({ open }) => open,
//       style: {
//         ...openedMixin(theme),
//         "& .MuiDrawer-paper": openedMixin(theme),
//       },
//     },
//     {
//       props: ({ open }) => !open,
//       style: {
//         ...closedMixin(theme),
//         "& .MuiDrawer-paper": closedMixin(theme),
//       },
//     },
//   ],
// }));

// export default function Dashboard() {
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   // state for context
//   const { totalEmployee } = useContext(EmployeeContext);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//     console.log("user clicked on profile");
//   };

//   // function to get the local storage data
//   const [user, setUser] = useState({ name: "", email: "" });

//   useEffect(() => {
//     const storedUser = localStorage.getItem("userLogin");
//     if (storedUser) {
//       try {
//         const parsedUser = JSON.parse(storedUser);
//         setUser({
//           name: parsedUser.data.username || "Unknown User",
//           email: parsedUser.data.email || "unknown@example.com",
//         });
//         console.log(parsedUser.data.username);
//       } catch (error) {
//         console.error("Error parsing user data from local storage:", error);
//       }
//     }
//   }, []);

//   //funciton to delete login data from localstorage

//   const deleteItem = () => {
//     localStorage.removeItem("userLogin");
//     setUser(null);
//   };

//   const navigate = useNavigate();

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   // navigate on onclick
//   const handleNavigation = (path) => {
//     navigate(path);
//   };

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <AppBar className="bg-[#66A2FF]" position="fixed" open={open}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             sx={[
//               {
//                 marginRight: 5,
//               },
//               open && { display: "none" },
//             ]}
//           >
//             <MenuIcon />
//           </IconButton>

//           <div className="flex justify-between w-full items-center">
//             <h1 className="text-xl font-semibold">
//               <Link to="/dashboard">Deepnap Softech</Link>
//             </h1>

//             {/* <!-- Dropdown menu --> */}

//             <div className="relative">
//               {/* Avatar Button */}
//               <img
//                 id="avatarButton"
//                 onClick={toggleDropdown}
//                 type="button"
//                 data-dropdown-toggle="userDropdown"
//                 data-dropdown-placement="bottom-start"
//                 class="w-10 h-10 rounded-full cursor-pointer"
//                 src="data:image/png;base64,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"
//                 alt="User dropdown"
//               />

//               {/* Dropdown */}
//               <div
//                 id="userDropdown"
//                 className={`absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 transition-opacity duration-200 ${
//                   isDropdownOpen ? "block" : "hidden"
//                 }`}
//               >
//                 <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
//                   <div>{user ? user.name : <Link to="/login">Login</Link>}</div>
//                   <div className="font-medium truncate">
//                     {user ? user.email : ""}
//                   </div>
//                 </div>
//                 <ul
//                   className="py-2 text-sm text-gray-700 dark:text-gray-200"
//                   aria-labelledby="avatarButton"
//                 >
//                   <li>
//                     <Link
//                       to="/dashboard"
//                       className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                     >
//                       Dashboard
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/employee-details"
//                       className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                     >
//                       Employee
//                     </Link>
//                   </li>
//                   <li>
//                     <a
//                       href="#"
//                       className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                     >
//                       Setting
//                     </a>
//                   </li>
//                 </ul>
//                 <div className="py-1">
//                   {user ? (
//                     <button
//                       onClick={deleteItem}
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
//                     >
//                       LogOut
//                     </button>
//                   ) : (
//                     ""
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Toolbar>
//       </AppBar>
//       <Drawer variant="permanent" open={open}>
//         <DrawerHeader>
//           <IconButton onClick={handleDrawerClose}>
//             {theme.direction === "rtl" ? (
//               <ChevronRightIcon />
//             ) : (
//               <ChevronLeftIcon />
//             )}
//           </IconButton>
//         </DrawerHeader>
//         <Divider />

//         <List>
//           {[
//             {
//               text: "Dashboard",
//               icon: <FaHome className="text-3xl text-[#233D7A]" />,
//               path: "/dashboard",
//             },
//             {
//               text: "Employee",
//               icon: <BsPersonCircle className="text-3xl text-[#233D7A]" />,
//               path: "/employee-details",
//             },
//             {
//               text: "Timesheet",
//               icon: <SlCalender className="text-2xl text-[#233D7A]" />,
//               path: "/timesheet",
//             },
//             {
//               text: "Projects",
//               icon: <IoMdTimer className="text-3xl text-[#233D7A]" />,
//               path: "/time-claim",
//             },
//             {
//               text: "Settings",
//               icon: <GoProject className="text-3xl text-[#233D7A]" />,
//               path: "/projects",
//             },
//             {
//               text: "Reports",
//               icon: (
//                 <HiOutlineDocumentReport className="text-3xl text-[#233D7A]" />
//               ),
//               path: "/reports",
//             },
//             {
//               text: "DLP",
//               icon: <RiListSettingsLine className="text-3xl text-[#233D7A]" />,
//               path: "/dlp",
//             },
//             {
//               text: "Setting",
//               icon: <IoMdSettings className="text-3xl text-[#233D7A]" />,
//               path: "/setting",
//             },
//             {
//               text: "Behaviour",
//               icon: <MdPerson className="text-3xl text-[#233D7A]" />,
//               path: "/behavior",
//             },
//           ].map(({ text, icon, path }) => (
//             <ListItem key={text} disablePadding sx={{ display: "block" }}>
//               <ListItemButton
//                 sx={[
//                   { minHeight: 48, px: 2.5 },
//                   open
//                     ? { justifyContent: "initial" }
//                     : { justifyContent: "center" },
//                 ]}
//                 onClick={() => handleNavigation(path)}
//               >
//                 <ListItemIcon
//                   sx={[
//                     { minWidth: 0, justifyContent: "center" },
//                     open ? { mr: 3 } : { mr: "auto" },
//                   ]}
//                 >
//                   {icon}
//                 </ListItemIcon>
//                 <ListItemText
//                   primary={text}
//                   sx={[open ? { opacity: 1 } : { opacity: 0 }]}
//                 />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>

//         <Divider />
//       </Drawer>
//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <DrawerHeader />
//         <Typography sx={{ marginBottom: 2 }}>
//           {/* <!-- Statistics Cards --> */}
//           <div class="grid  grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 p-4 gap-4">
//             <div class="bg-[#848DFF] dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
//               <div class="text-right">
//                 <p class="text-xl">{totalEmployee}</p>
//                 <p>Total Enrollments</p>
//               </div>
//             </div>
//             <div class="bg-[#E371B4] dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
//               <div class="text-right">
//                 <p class="text-xl">55</p>
//                 <p>Currently active</p>
//               </div>
//             </div>
//             <div class="bg-[#00DCCE] dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
//               <div class="text-right">
//                 <p class="text-xl">45</p>
//                 <p>Currently idle</p>
//               </div>
//             </div>
//             <div class="bg-[#FF9A19] dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
//               <div class="text-right">
//                 <p class="text-xl">10</p>
//                 <p>Currently offline</p>
//               </div>
//             </div>
//             <div class="bg-[#FC8188] dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
//               <div class="text-right">
//                 <p class="text-2xl">4</p>
//                 <p>Absent</p>
//               </div>
//             </div>
//             <div class="bg-[#51BAD6] dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
//               <div class="text-right">
//                 <p class="text-2xl">1</p>
//                 <p>Suspended</p>
//               </div>
//             </div>
//           </div>
//           {/* ---------table=============== */}
//           <div>
//             <DashTable />
//           </div>

//           {/* ------Productive---employeee---table=============== */}

//           <div className="grid lg:grid-cols-2 md:grid-cols-1">
//             <div className=" px-6 mt-8 pt-4 w-[35rem]  gap-4 text-center shadow-lg rounded-lg">
//               <h1 className="flex justify-start items-center p-2 font-extrabold text-[#3368A9]">
//                 Top 10 Productive Employees
//               </h1>
//               <form class="text-center flex flex-row">
//                 <label
//                   for="small"
//                   class=" font-semibold text-sm  text-gray-900 dark:text-white"
//                 >
//                   Select Status
//                 </label>
//                 <select
//                   id="small"
//                   class="p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 >
//                   <option selected>Choose a Location</option>
//                   <option value="US">See all</option>
//                   <option value="CA">Not started</option>
//                   <option value="FR">In progress</option>
//                   <option value="DE">Hold</option>
//                   <option value="DE">Completed</option>
//                 </select>
//                 <label
//                   for="small"
//                   class=" font-semibold text-sm  text-gray-900 dark:text-white"
//                 >
//                   Select Status
//                 </label>
//                 <select
//                   id="small"
//                   class="p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 >
//                   <option selected>Choose a Location</option>
//                   <option value="US">See all</option>
//                   <option value="CA">Not started</option>
//                   <option value="FR">In progress</option>
//                   <option value="DE">Hold</option>
//                   <option value="DE">Completed</option>
//                 </select>
//               </form>

//               {/*----------table-------------*/}
//               <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//                 <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//                   <tr>
//                     <th scope="col" class="px-6 py-3">
//                       Employee Name
//                     </th>
//                     <th scope="col" class="px-6 py-3">
//                       Time(hours)
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
//                     <th
//                       scope="row"
//                       class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//                     >
//                       Abhi
//                     </th>
//                     <td class="px-6 py-4">10hr</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//             <div className=" px-6 mt-8 pt-4 w-[35rem]  gap-4 text-center shadow-lg rounded-lg">
//               <h1 className="flex justify-start items-center p-2 font-extrabold text-[#3368A9]">
//                 Top 10 Non Productive Employees
//               </h1>
//               <form class="text-center flex flex-row">
//                 <label
//                   for="small"
//                   class=" font-semibold text-sm  text-gray-900 dark:text-white"
//                 >
//                   Select Status
//                 </label>
//                 <select
//                   id="small"
//                   class="p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 >
//                   <option selected>Choose a Location</option>
//                   <option value="US">See all</option>
//                   <option value="CA">Not started</option>
//                   <option value="FR">In progress</option>
//                   <option value="DE">Hold</option>
//                   <option value="DE">Completed</option>
//                 </select>
//                 <label
//                   for="small"
//                   class=" font-semibold text-sm  text-gray-900 dark:text-white"
//                 >
//                   Select Status
//                 </label>
//                 <select
//                   id="small"
//                   class="p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 >
//                   <option selected>Choose a Location</option>
//                   <option value="US">See all</option>
//                   <option value="CA">Not started</option>
//                   <option value="FR">In progress</option>
//                   <option value="DE">Hold</option>
//                   <option value="DE">Completed</option>
//                 </select>
//               </form>

//               {/*----------table-------------*/}
//               <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//                 <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//                   <tr>
//                     <th scope="col" class="px-6 py-3">
//                       Employee Name
//                     </th>
//                     <th scope="col" class="px-6 py-3">
//                       Time(hours)
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
//                     <th
//                       scope="row"
//                       class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//                     >
//                       Ajay
//                     </th>
//                     <td class="px-6 py-4">7hr</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </Typography>
//       </Box>
//     </Box>
//   );
// }
