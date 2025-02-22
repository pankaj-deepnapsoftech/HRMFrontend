// import axios from "axios";
// import { createContext } from "react";
// import { useEffect, useState } from "react";

// // create the login context
// export const EmployeeLoginContext = createContext();

// // create the provider component
// export const EmployeeLoginProvider = ({ children }) => {
//   const [loginDate, setLoginDate] = useState("");
//   const [loginTime, setLoginTime] = useState("");

//   // function to fetch the login details
//   const fetchLoginDetails = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:8000/api/v1/user/employee/login"
//       );

//       // time data method to store the login time of register employee
//       const date = new Date(response.data.data.createdAt);
//       setLoginDate(
//         `Date: ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
//       );
//       console.log( `Date: ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`)

//       setLoginTime(
//         `Time: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
//       );
//     } catch (error) {
//       console.log("employee Login data does not get");
//     }
//   };

//   useEffect(() => {
//     fetchLoginDetails();
//   }, []);

//   return (
//     <EmployeeLoginContext.Provider value={{ loginDate, loginTime }}>
//       {children}
//     </EmployeeLoginContext.Provider>
//   );
// };
