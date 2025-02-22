import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { EmployeeProvider } from "./context/EmployeeContext.jsx";
import { ProjectProvider } from "./context/ProjectContext.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <EmployeeProvider>
      <ProjectProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProjectProvider>
    </EmployeeProvider>
  </StrictMode>
);
