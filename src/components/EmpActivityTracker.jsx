import React, { useEffect, useState } from "react";
import axios from "axios";

const EmpActivityTracker = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [activeTime, setActiveTime] = useState(0); // Time in seconds
  const [inactiveTime, setInactiveTime] = useState(0); // Inactive time in seconds
  const [isInactive, setIsInactive] = useState(false); // Tracks inactivity status
  const [formattedActiveTime, setFormattedActiveTime] = useState("0h 0m");
  const [formattedInactiveTime, setFormattedInactiveTime] = useState("0h 0m");

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  // Retrieve employeeId from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("employeeLogin");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setEmployeeId(parsedUser.data.userResponse._id);
      console.log(
        "Employee ID from localStorage:",
        parsedUser.data.userResponse._id
      );
    }
  }, []);

  useEffect(() => {
    if (!employeeId) return;

    let lastSentTime = 0; // Last sent active time in minutes
    let inactivityTimer = null; // Timer to track inactivity

    const sendActivityData = async (timeInMinutes, inactiveTimeInMinutes) => {
      console.log(
        "Sending activity data:",
        timeInMinutes,
        inactiveTimeInMinutes
      ); // Debugging log
      try {
        const response = await axios.post(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/api/v1/user/employee/${employeeId}/updateActiveTime`,
          { activeTime: timeInMinutes, inactiveTime: inactiveTimeInMinutes }
        );
        console.log("Activity data sent successfully", response); // Debugging log
        // Update state with the formatted active and inactive time
        setFormattedActiveTime(response.data.formattedActiveTime);
        setFormattedInactiveTime(response.data.formattedInactiveTime);
      } catch (error) {
        console.error("Error sending activity data:", error);
      }
    };

    const handleUserActivity = () => {
      if (isInactive) {
        console.log("Activity resumed: Active time tracking restarted.");
        setIsInactive(false); // Reset inactivity status
      }
      clearTimeout(inactivityTimer); // Clear the previous timer

      // Restart the inactivity timer (1 minute)
      inactivityTimer = setTimeout(() => {
        console.log("User inactive: Active time tracking stopped.");
        setIsInactive(true); // Set the user as inactive after 1 minute
      }, 1 * 60 * 1000); // 1 minute (60,000 ms)
    };

    // Event listeners for user activity
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);
    window.addEventListener("mousedown", handleUserActivity);

    const activityInterval = setInterval(() => {
      if (!isInactive) {
        setActiveTime((prevTime) => {
          const newTime = prevTime + 10; // Add 10 seconds to active time
          const timeInMinutes = Math.floor(newTime / 60);

          console.log("Updated active time:", newTime); // Debugging log
          if (timeInMinutes !== lastSentTime) {
            lastSentTime = timeInMinutes;
            sendActivityData(timeInMinutes, Math.floor(inactiveTime / 60)); // Send both active and inactive time to backend
          }

          return newTime;
        });
      } else {
        setInactiveTime((prevTime) => {
          const newTime = prevTime + 10; // Increase inactive time
          console.log("Inactive time updated:", newTime); // Debugging log
          return newTime;
        });
      }
    }, 10000); // Run every 10 seconds

    return () => {
      // Cleanup on unmount
      clearInterval(activityInterval);
      clearTimeout(inactivityTimer);
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      window.removeEventListener("mousedown", handleUserActivity);
    };
  }, [employeeId, isInactive, inactiveTime]);

  return (
    <div>
      {/* <h2>Employee Activity Tracker</h2>
      <p>Active Time: {formatTime(activeTime)}</p> */}
      {/* <p>Status: {isInactive ? "Inactive" : "Active"}</p> */}
      {/* <p>Inactive Time: {formatTime(inactiveTime)}</p> */}
      {/* <p>Formatted Active Time: {formattedActiveTime}</p>
      <p>Formatted Inactive Time: {formattedInactiveTime}</p> */}
    </div>
  );
};

export default EmpActivityTracker;
