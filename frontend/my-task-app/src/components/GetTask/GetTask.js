import React, { useState } from "react";
import axios from "axios";
import "./GetTask.css";

function GetTask() {
  const [taskId, setTaskId] = useState("");
  const [task, setTask] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!taskId) {
      setError("Please enter a Task ID");
      return;
    }
    setError(""); // Reset error state
    setLoading(true); // Indicate loading state
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/get-task/${taskId}`
      );
      // Make sure you're accessing the response data correctly
      setTask(response.data.task); // Assuming the backend wraps the task in a 'task' object
      // Reset loading and error states as necessary
    } catch (error) {
      // Error handling
    }
  };

  return (
    <div className="get-task-container">
      <h2>Get a Task</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="taskId">Task ID</label>
        <input
          id="taskId"
          type="text"
          value={taskId}
          onChange={(e) => setTaskId(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          Get Task
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {task && (
        <div className="task-details">
          <h3>Task Details</h3>
          <p>
            <b>ID:</b> {task["task-id"] || "N/A"}
          </p>
          <p>
            <b>Name:</b> {task.task_name || "N/A"}
          </p>
          <p>
            <b>Description:</b> {task.task_description || "N/A"}
          </p>
        </div>
      )}
    </div>
  );
}

export default GetTask;
