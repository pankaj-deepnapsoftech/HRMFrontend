import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projectDetails, setProjectDetails] = useState([]);
  const [totalProject, setTotalProject] = useState("");

  const fetchProject = async () => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/all/projectDetails`
      );
      setProjectDetails(response.data.data.projectDetails);
      setTotalProject(response.data.data.totalProjects);
    } catch (error) {
      console.log("Project does not created", error);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  return (
    <ProjectContext.Provider
      value={{ projectDetails, totalProject, fetchProject }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
