import { Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { EmployeeContext } from "../../context/EmployeeContext";

const AddIncentives = ({ empId, onClose, type }) => {
  console.log(type)
  const [amount, setAmount] = useState();
  const { setRefresh } = useContext(EmployeeContext);
  const [date, setDate] = useState();
  const [notes, setNotes] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = type === "Incentives" 
      ? `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/user/incentive`
      : `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/user/addReimbursement`;

    try {
      await axios.post(apiUrl, {
        employeeId: empId,
        amount,
        [type === "incentive" ? "date" : "paymentDate"]:  date, 
        notes,
      });
      
      setRefresh();
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} added.`, {
        position: "top-right",
        autoClose: 1000,
      });
    } catch (error) {
      toast.error(`Failed to add ${type}.`, {
        position: "top-right",
        autoClose: 1000,
      });
    }

    setAmount(0);
    setDate("");
    setNotes("");
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-3">
      <TextField
        label="Amount"
        type="number"
        variant="outlined"
        fullWidth
        required
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="text-gray-700"
      />
      <TextField
        label="Date"
        type="date"
        variant="outlined"
        fullWidth
        required
        value={date}
        onChange={(e) => setDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        className="text-gray-700"
      />
      <TextField
        label="Notes"
        variant="outlined"
        fullWidth
        rows={4}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        required
        className="text-gray-700"
      />
      <div className="flex justify-end mt-4">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="bg-green-600 text-white"
        >
          Add {type.charAt(0).toUpperCase() + type.slice(1)}
        </Button>
      </div>
    </form>
  );
};

export default AddIncentives;
