import React, { useState } from "react";
import MainDashboard from "../pages/MainDashboard";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Behaviour = () => {
  const [rule, setRule] = useState("");
  const [condition, setCondition] = useState("");
  const [note, setNote] = useState("");
  // state to store response
  const [ruleData, setRuleData] = useState("");

  const ruleObj = {
    rule,
    condition,
    note,
  };

  //call the api
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/user/rule/details`,
        ruleObj,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setRuleData(response.data);
      // toast
      toast.success("New Rule Created Successfully", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("Rule does not created", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div>
      <ToastContainer />
      <MainDashboard />
      <div></div>
      <div className="max-w-xl ml-[28rem] mx-auto bg-white shadow-md p-10 rounded-lg">
        <h1 className="pb-8">Rule Trigger</h1>
        <form onSubmit={submitHandler}>
          <div className="rid gap-8 mb-6 lg:grid-cols-2">
            <label
              for="first_name"
              class=" block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Rule Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="first_name"
              class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Your Rule Name"
              required
              onChange={(e) => setRule(e.target.value)}
            />
          </div>
          <div class="grid gap-8 mb-6 lg:grid-cols-2">
            <div>
              <label
                for="company"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Condition <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="company"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Your Condition"
                required
                onChange={(e) => setCondition(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label
              for="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Any Note
            </label>
            <textarea
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500border rounded-lg"
              cols={53}
              rows={4}
              placeholder="Write Note Here..."
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
          </div>

          <button
            type="submit"
            class="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Rule
          </button>
        </form>
      </div>
    </div>
  );
};

export default Behaviour;
