import React, { useState } from "react";
import axios from "axios";
import "./DeleteTask.css";

function DeleteTask() {
  const [taskId, setTaskId] = useState("");
  const [message, setMessage] = useState(""); // To display success or error messages
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!taskId) {
      setMessage("Please enter a Task ID to delete");
      return;
    }
    setLoading(true); // Indicate loading state
    try {
      const response = await axios.delete(
        `http://127.0.0.1:5000/delete-task/${taskId}`
      );
      // Handle response
      setMessage(response.data.message); // Display success or error message
      setLoading(false); // Reset loading state
    } catch (error) {
      setMessage("Failed to delete task. Please try again."); // Display error message
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="task-action-container">
      <h2>Delete a Task</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="taskId">Task ID</label>
        <input
          id="taskId"
          type="text"
          value={taskId}
          onChange={(e) => setTaskId(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          Delete Task
        </button>
      </form>
      {message && (
        <div
          className={
            message.includes("Failed") ? "error-message" : "success-message"
          }
        >
          {message}
        </div>
      )}
    </div>
  );
}

export default DeleteTask;
