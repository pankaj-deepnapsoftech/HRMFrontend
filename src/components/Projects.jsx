import React, { useEffect, useState } from "react";
import MainDashboard from "../pages/MainDashboard";
import Button from "@mui/material/Button";
import { Modal } from "flowbite-react";
import axios from "axios";
import { useContext } from "react";
import { ProjectContext } from "../context/ProjectContext";
import { IoEyeSharp } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { FaRegEdit } from "react-icons/fa";

const Projects = () => {
  // Project modal for opening modals
  const [projectModal, setProjectModal] = useState(false);

  // State for handling form fields
  const [projectName, setProjectName] = useState("");
  const [managerName, setManagerName] = useState("");
  const [selectMember, setSelectMember] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [managers, setManagers] = useState([]);
  const [members, setMembers] = useState([]);
  const [projectId, setProjectId] = useState(undefined);
  const [deleteProject, setDeleteProject] = useState("");
  // State for storing the response
  const [project, setProject] = useState("");
  const [filterStartDate, setFilterStartDate] = useState(""); // For filtering
  const [filterEndDate, setFilterEndDate] = useState(""); // For filtering

  // Function to handle the change in member selection
  const handleMemberChange = (selectedOptions) => {
    // Update state with selected member IDs
    setSelectMember(selectedOptions.map((option) => option.value));
  };

  // useContext
  const { projectDetails, setRefresh } = useContext(ProjectContext);

  const projectObj = {
    projectName,
    managerName,
    selectMember,
    startDate,
    endDate,
    description,
  };

  const getAllUserRegisterDetails = async () => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/employee/all/registerDetails`
      );
      const allUsers = response.data.data.user;

      // Filter out terminated users
      const activeUsers = allUsers.filter(
        (user) => user.Empstatus !== "terminated"
      );

      const filteredManagers = activeUsers.filter(
        (user) => user.role === "Manager"
      );
      setManagers(filteredManagers); // Set filtered managers
      setMembers(activeUsers);
    } catch (error) {
      toast.error(`Error fetching registered users: ${error}`);
    }
  };

  useEffect(() => {
    getAllUserRegisterDetails();
  }, []);

  // Function for handling the form submission
  const submitHandler = async (e, projectId) => {
    e.preventDefault();
    console.log(projectId);

    if(projectId === undefined){
      try {
        const response = await axios.post(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/api/v1/user/projectDetails`,
          projectObj,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setProject(response.data.data.project);
  
        // Store user data in local storage
        localStorage.setItem("projectDetails", JSON.stringify(response.data));
  
        // handle the response
        toast.success("Project Added Successfully!", {
          position: "top-right",
          autoClose: 1000,
        });
        setProjectModal(false);
        setRefresh();
      } catch (error) {
        toast.error("Project does not created", {
          position: "top-right",
          autoClose: 1000,
        });
      }
    }else{
      try {
        await axios.put(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/api/v1/user/projectDetails/update/${projectId}`,
          projectObj,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // handle the response
        toast.success("Project updated Successfully!", {
          position: "top-right",
          autoClose: 1000,
        });
        setProjectModal(false);
        setProjectId(undefined);
        setRefresh();
      } catch (error) {
        toast.error("Project does not updated", {
          position: "top-right",
          autoClose: 1000,
        });
      }
    }
  
  };

  // Filter projects based on selected dates
  const filteredProjects = projectDetails.filter((item) => {
    const projectStartDate = new Date(item.startDate);
    const projectEndDate = new Date(item.endDate);
    const filterStart = filterStartDate ? new Date(filterStartDate) : null;
    const filterEnd = filterEndDate ? new Date(filterEndDate) : null;

    return (
      (!filterStart || projectStartDate >= filterStart) &&
      (!filterEnd || projectEndDate <= filterEnd)
    );
  });

  const handleEdit = (item) => {
    setProjectName(item.projectName);
    setEndDate(item.endDate);
    setStartDate(item.startDate);
    setDescription(item.description);
    setManagerName(item.managerName);
    setSelectMember(item.selectMember);
    setProjectId(item._id)
    setProjectModal(!projectModal);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/projectDetails/${id}`
      );

     
      toast.success("Project removed successfully.");
      setRefresh();
    } catch (error) {
      toast.error("Failed to remove the project!");
      console.log(error);
    }
  };

  return (
    <>
      {/* <ToastContainer /> */}
      <MainDashboard />
      {/*------select----options-----------*/}
      <div className="lg:px-[8rem] xs:ml-[5rem] pb-6 xs:flex-wrap lg:flex lg:flex-row justify-end items-center gap-4 text-center shadow-lg rounded-lg">
        <p className="font-semibold">Select date range</p>
        <input
          type="date"
          value={filterStartDate}
          onChange={(e) => setFilterStartDate(e.target.value)}
        />
        <input
          type="date"
          value={filterEndDate}
          onChange={(e) => setFilterEndDate(e.target.value)}
        />

        <form className="text-center flex flex-col"></form>
        <Button variant="contained" onClick={() => setProjectModal(true)}>
          Add Project Details
        </Button>

        {/*----Add Project--Modal-------*/}
        <Modal
          className="pt-14"
          show={projectModal}
          onClose={() => setProjectModal(false)}
        >
          <Modal.Body>
            <div className="max-w-4xl mx-auto bg-white p-16">
              <form onSubmit={(e)=>submitHandler(e,projectId)}>
                <div className="pb-5">
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Project Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Project Name"
                    required
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>
                <div className="grid gap-8 mb-6 lg:grid-cols-2">
                  <div>
                    <label
                      htmlFor="company"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Manager's name <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={managerName}
                      onChange={(e) => setManagerName(e.target.value)}
                      className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900"
                      required
                    >
                      <option value="">Select Manager</option>
                      {managers.map((manager) => (
                        <option key={manager._id} value={manager.firstName}>
                          {manager.firstName} {manager.lastName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Select Member <span className="text-red-500">*</span>
                    </label>
                    <Select
                      isMulti
                      name="members"
                      options={members.map((member) => ({
                        value: member._id,
                        label: `${member.firstName} ${member.lastName}`,
                      }))}
                      onChange={handleMemberChange}
                      value={members
                        .filter((member) => selectMember.includes(member._id))
                        .map((member) => ({
                          value: member._id,
                          label: `${member.firstName} ${member.lastName}`,
                        }))}
                      className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900"
                      required
                    />
                     <p className="mt-2 text-sm text-gray-500">
                      Selected Members: {selectMember.length}{" "}
                      {selectMember.length === 1 ? "member" : "members"}
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="visitors"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="visitors"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="visitors"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      End Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="visitors"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Project Description
                  </label>
                  <textarea
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Project Description"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="pt-6 text-center">
                  <button
                    type="submit"
                    className="px-8 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </Modal.Body>
          <Modal.Footer className="xs:pl-[4rem]">
            <Button onClick={() => setProjectModal(false)}>Closed</Button>
          </Modal.Footer>
        </Modal>
      </div>
      {/*--------Table-------------*/}
      <div className="">
        <div class="relative overflow-x-auto lg:ml-[15rem] xs:ml-[5rem] xs:mt-5  p-4 bg-gray-100 min-h-screen shadow-md rounded-lg ">
          <div className="bg-blue-600 text-white text-center py-4 mb-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Add Projects</h2>
          </div>
          <table class="w-full text-sm text-center text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-center text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Project Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Member
                </th>
                <th scope="col" class="px-6 py-3">
                  Manager
                </th>

                <th scope="col" class="px-6 py-3">
                  Start Date
                </th>
                <th scope="col" class="px-6 py-3">
                  End Date
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((item, index) => (
                <tbody key={index}>
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.projectName}
                    </th>
                    <td class="px-6 py-4">
                      {item.selectMember && item.selectMember.length > 0
                        ? item.selectMember
                            .map((memberId) => {
                              const member = members.find(
                                (m) => m._id === memberId
                              );
                              return member
                                ? `${member.firstName} ${member.lastName}`
                                : "Unknown";
                            })
                            .join(", ")
                        : "No members assigned"}
                    </td>
                    <td class="px-6 py-4">{item.managerName}</td>
                    <td class="px-6 py-4">{item.startDate || "Not Found"}</td>
                    <td class="px-6 py-4">{item.endDate || "Not Found"}</td>
                    <td class="px-6 py-4 flex justify-center gap-3 items-center">
                      <FaRegEdit
                        className="text-blue-500 cursor-pointer"
                        onClick={() => handleEdit(item)}
                      />
                      <RiDeleteBin6Line
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleDelete(item._id)}
                      />
                    </td>
                  </tr>
                </tbody>
              ))
            ) : (
              <p className="text-center">Data not found</p>
            )}
          </table>
        </div>
      </div>
    </>
  );
};

export default Projects;
