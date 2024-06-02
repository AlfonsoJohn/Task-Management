import React, { useState } from "react";
import axios from "axios";
import "./UpdateTask.css";

function UpdateTask() {
  const [taskId, setTaskId] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [message, setMessage] = useState(""); // To display success or error messages
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!taskId) {
      setMessage("Please enter a Task ID");
      return;
    }
    if (!updatedName || !updatedDescription) {
      setMessage("Please fill in all fields");
      return;
    }
    setLoading(true); // Indicate loading state
    try {
      const response = await axios.put(
        `http://127.0.0.1:5000/update-task/${taskId}`,
        {
          updated_name: updatedName,
          updated_description: updatedDescription,
        }
      );
      // Handle response
      if (response.data.message) {
        setMessage(response.data.message); // Display success message
      }
      setLoading(false); // Reset loading state
    } catch (error) {
      setMessage("Failed to update task. Please try again."); // Display error message
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="update-task-container">
      <h2>Update a Task</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="taskId">Task ID</label>
        <input
          id="taskId"
          type="text"
          value={taskId}
          onChange={(e) => setTaskId(e.target.value)}
        />
        <label htmlFor="updatedName">Updated Name</label>
        <input
          id="updatedName"
          type="text"
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
        />
        <label htmlFor="updatedDescription">Updated Description</label>
        <input
          id="updatedDescription"
          type="text"
          value={updatedDescription}
          onChange={(e) => setUpdatedDescription(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          Update Task
        </button>
      </form>
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default UpdateTask;
