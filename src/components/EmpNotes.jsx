import React, { useState, useEffect } from "react";
import axios from "axios";
import EmpDashboard from "../pages/EmpDashboard";

const EmpNotes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("employeeLogin");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setEmployeeId(parsedUser.data.userResponse._id);
    }
  }, []);

  useEffect(() => {
    if (employeeId) {
      const fetchNotes = async () => {
        try {
          const response = await axios.get(
            `${
              import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
            }/api/v1/user/get/${employeeId}/notes`
          );
          setNotes(response.data);
        } catch (err) {
          toast.error(`Error fetching notes: ${err}`);
        }
      };

      fetchNotes();
    }
  }, [employeeId]);

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/employee/${employeeId}/notes`,
        { text: newNote }
      );
      setNotes(response.data);
      setNewNote("");
    } catch (err) {
      toast.error(`Error adding note: ${err}`);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      const response = await axios.delete(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/api/v1/user/delete/${employeeId}/${noteId}`
      );
      setNotes(response.data);
    } catch (err) {
      toast.error(`Error deleting note: ${err}`);
    }
  };

  return (
    <>
      <EmpDashboard />
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Your Notes</h2>
          <div className="flex items-center gap-4 mb-6">
            <input
              type="text"
              placeholder="Type your note here..."
              className="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
            <button
              className="px-2 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
              onClick={handleAddNote}
            >
              Add Note
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.length > 0 ? (
              notes.map((note) => (
                <div
                  key={note._id}
                  className="p-4 bg-gray-50 border rounded-lg shadow-lg hover:shadow-xl transition"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Note Details
                  </h3>
                  <p className="text-gray-700 mb-4">{note.text}</p>
                  <p className="text-sm text-gray-500">
                    Created On: {new Date(note.timestamp).toLocaleString()}
                  </p>
                  <button
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    onClick={() => handleDeleteNote(note._id)}
                  >
                    Delete Note
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-full">
                No notes added yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmpNotes;
