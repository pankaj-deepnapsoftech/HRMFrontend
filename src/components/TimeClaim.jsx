import React from "react";
import MainDashboard from "../pages/MainDashboard";

const TimeClaim = () => {
  return (
    <>
      <MainDashboard />
      <div className="mx-[10rem] px-6 flex justify-start items-center gap-4 text-center shadow-lg rounded-lg">
        <p className="font-semibold">Select date range</p>
        <input type="date" />

        <form class="text-center flex flex-col">
          <label
            for="small"
            class=" font-semibold text-sm  text-gray-900 dark:text-white"
          >
            Location
          </label>
          <select
            id="small"
            class="p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Choose a Location</option>
            <option value="US">Delhi</option>
            <option value="CA">Noida</option>
            <option value="FR">Gurugram</option>
            <option value="DE">Noida</option>
          </select>
        </form>

        {/*-------Checkbox-----------------*/}
        <div class="flex">
          <div class="flex items-center me-4">
            <input
              id="inline-2-checkbox"
              type="checkbox"
              value=""
              class="w-4 ms-2 h-4  text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="inline-2-checkbox"
              class="ms-2 text-sm font-semibold text-gray-900 dark:text-gray-300"
            >
              Idle
            </label>
          </div>
          <div class="flex items-center me-4">
            <input
              checked
              id="inline-checked-checkbox"
              type="checkbox"
              value=""
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="inline-checked-checkbox"
              class="ms-2 text-sm font-semibold text-gray-900 dark:text-gray-300"
            >
              Offline
            </label>
          </div>
          <div class="flex items-center">
            <input
              id="inline-checkbox"
              type="checkbox"
              value=""
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="inline-disabled-checkbox"
              class="ms-2 text-sm font-semibold text-gray-900 dark:text-gray-300"
            >
              Break
            </label>
          </div>
        </div>
      </div>
      {/*--------Table-------------*/}
      <div>
        <div class="relative overflow-x-auto ml-[5rem] pt-10">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Full Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Date
                </th>
                <th scope="col" class="px-6 py-3">
                  Start time
                </th>
                <th scope="col" class="px-6 py-3">
                  End time
                </th>
                <th scope="col" class="px-6 py-3">
                  Reason
                </th>
                <th scope="col" class="px-6 py-3">
                  Approve name
                </th>
                <th scope="col" class="px-6 py-3">
                  Status
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Abhay
                </th>
                <td class="px-6 py-4">05/05/2024</td>
                <td class="px-6 py-4">10:00 AM</td>
                <td class="px-6 py-4">6:00 PM</td>
                <td class="px-6 py-4">fight</td>
                <td class="px-6 py-4">nikhil</td>
                <td class="px-6 py-4">404</td>
                <td class="px-6 py-4">nothing</td>

                <td
                  class="px-6 py-4"
                  className="flex justify-center gap-1 items-center py-8"
                ></td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Ajay
                </th>
                <td class="px-6 py-4">10/09/2024</td>
                <td class="px-6 py-4">12:00 AM</td>
                <td class="px-6 py-4">6:00 PM</td>
                <td class="px-6 py-4">fight</td>
                <td class="px-6 py-4">ankit</td>
                <td class="px-6 py-4">406</td>
                <td class="px-6 py-4">nothing</td>

                <td
                  class="px-6 py-4"
                  className="flex justify-center gap-1 items-center py-8"
                ></td>
              </tr>
              <tr class="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Abhi
                </th>
                <td class="px-6 py-4">12/10/2024</td>
                <td class="px-6 py-4">9:00 AM</td>
                <td class="px-6 py-4">4:00 PM</td>
                <td class="px-6 py-4">fight</td>
                <td class="px-6 py-4">nikhil</td>
                <td class="px-6 py-4">404</td>
                <td class="px-6 py-4">approve</td>

                <td
                  class="px-6 py-4"
                  className="flex justify-center gap-1 items-center py-8"
                ></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TimeClaim;
