import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TaskCreation({ handleTaskCreation }) {
  const [successMessage, setSuccessMessage] = useState("");
  const [taskId, setTaskId] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const datePickerRef = useRef(null);
  const formRef = useRef(null);

  const handleDateChange = (date) => {
    setStartDate(date);
    setIsDatePickerOpen(true);
    setTimeout(() => setIsDatePickerOpen(false), 100); // Delay the closing action
    // Additional logic related to date change, if needed
  };

  const handleDatePickerClick = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target) &&
        formRef.current &&
        !formRef.current.contains(event.target)
      ) {
        setIsDatePickerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const taskData = {
        "task-id": taskId,
        task_name: taskName,
        task_description: taskDescription,
      };

      const response = await axios.post(
        "http://127.0.0.1:5000/create-task",
        taskData
      );

      console.log(response.data);
      setSuccessMessage("Task created successfully!");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || "An error occurred.");
      } else {
        setError("An error occurred.");
      }
    }
  };

  return (
    <div className="create-task-container" ref={formRef}>
      <h2>Create a Task</h2>
      <div onClick={handleDatePickerClick}>
        <DatePicker
          selected={startDate}
          onChange={handleDateChange}
          open={isDatePickerOpen}
          onClickOutside={() => setIsDatePickerOpen(false)}
          onCalendarClose={() => setIsDatePickerOpen(false)}
          ref={(r) => (datePickerRef.current = r?.input)}
        />
      </div>
      {error && <div className="error-message">{error}</div>}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="taskId">Task ID</label>
        <input
          id="taskId"
          type="text"
          value={taskId}
          onChange={(e) => setTaskId(e.target.value)}
        />
        <label htmlFor="taskName">Task Name</label>
        <input
          id="taskName"
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <label htmlFor="taskDescription">Task Description</label>
        <textarea
          id="taskDescription"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        ></textarea>
        {/* Include Date Picker */}
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
}

export default TaskCreation;
