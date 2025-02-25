import React, { createContext, useState, useEffect } from "react";
import axios from "axios";


// Create the context
export const EmployeeContext = createContext();

// Create the provider component
export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [totalEmployee, setTotalEmployee] = useState("");
  const [refresh,setRefresh] = useState("");

  // Function to fetch employee data
  const fetchEmployees = async () => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/employee/all/registerDetails`
      );
      setEmployees(response.data.data.user || []);

      // state to get total numbers of employee
      setTotalEmployee(response.data.data.totalEmployees);
    } catch (error) {
      toast.error(`Error fetching employees: ${error}`);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [refresh]);

  return (
    <EmployeeContext.Provider
      value={{ employees, fetchEmployees, totalEmployee ,setEmployees ,setRefresh}}
    >
      {children}
    </EmployeeContext.Provider>
  );
};
