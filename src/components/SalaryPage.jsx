import React from "react";
import MainDashboard from "../pages/MainDashboard";

const SalaryPage = () => {
  return (
    <div>
      <MainDashboard />



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
                  Role
                </th>
                <th scope="col" class="px-6 py-3">
                  CTC
                </th>
                <th scope="col" class="px-6 py-3">
                  Basic
                </th>
                <th scope="col" class="px-6 py-3">
                  Employer PF Contribution
                </th>
                <th scope="col" class="px-6 py-3">
                  Employer ESI Contribution
                </th>
                <th scope="col" class="px-6 py-3">
                  Employee PF
                </th>
                <th scope="col" class="px-6 py-3">
                  Professional Tax
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
    </div>
  );
};

export default SalaryPage;
