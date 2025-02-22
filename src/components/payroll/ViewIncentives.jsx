import React, { useState, useEffect } from "react";

const ViewIncentives = ({ empData, type }) => {
  const [incentives, setIncentives] = useState([]);
  const [reimbursements, setReimbursements] = useState([]);

  console.log(empData);

  useEffect(() => {
    if (type === "Incentives" && empData?.incentive) {
      setIncentives(empData?.incentive);
    } else if (type === "Reimbursements" && empData?.reimbursement) {
      setReimbursements(empData?.reimbursement);
    }
  }, [empData, type]);

  const renderTable = () => {
    const data = type === "Incentives" ? incentives : reimbursements;
    const isIncentive = type === "Incentives";

    if (data.length === 0) {
      return <p className="text-center text-gray-500 mt-4">No {type.toLowerCase()} found for this employee.</p>;
    }

    return (
      <table className="min-w-full table-auto text-left text-sm text-gray-700">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-6 py-3 font-semibold">{isIncentive ? "Amount" : "Reimbursement Amount"}</th>
            <th className="px-6 py-3 font-semibold">Date</th>
            <th className="px-6 py-3 font-semibold">Notes</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item?._id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 text-green-500">
                ₹{item?.amount}
              </td>
              <td className="px-6 py-4">
                {new Date(item?.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4">{item?.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg max-w-4xl mx-auto mt-6">
      <h1 className="text-2xl font-bold text-center text-gray-800">
        {empData?.firstName}'s {type}
      </h1>

      {/* Render the appropriate table based on the type */}
      <div className="mt-6">
        {renderTable()}
      </div>
    </div>
  );
};

export default ViewIncentives;
