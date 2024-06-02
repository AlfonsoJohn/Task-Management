import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TaskCreation from "../TaskCreation/taskcreation";
import GetTask from "../GetTask/GetTask";
import UpdateTask from "../UpdateTask/UpdateTask";
import DeleteTask from "../DeleteTask/DeleteTask";

const UserContext = React.createContext();

function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const userContext = useContext(UserContext);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [isGetTaskOpen, setIsGetTaskOpen] = useState(false);
  const [isUpdateTaskOpen, setIsUpdateTaskOpen] = useState(false);
  const [isDeleteTaskOpen, setIsDeleteTaskOpen] = useState(false);
  const userName = userContext && userContext.user && userContext.user.username;
  const currentDate = new Date().toDateString();

  const toggleCreateTask = (e) => {
    e.preventDefault();
    setIsCreateTaskOpen(!isCreateTaskOpen);
  };

  const toggleGetTask = (e) => {
    e.preventDefault();
    setIsGetTaskOpen(!isGetTaskOpen);
  };

  const toggleUpdateTask = () => {
    setIsUpdateTaskOpen(!isUpdateTaskOpen);
    setIsCreateTaskOpen(false);
    setIsGetTaskOpen(false);
  };

  const toggleDeleteTask = () => {
    setIsDeleteTaskOpen(!isDeleteTaskOpen);
    setIsCreateTaskOpen(false);
    setIsGetTaskOpen(false);
    setIsUpdateTaskOpen(false);
  };

  const handleTaskCreation = async (taskData) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/create-task",
        taskData
      );

      console.log(response.data);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleTaskSelection = (taskId) => {
    const isSelected = selectedTasks.includes(taskId);
    if (isSelected) {
      setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
    } else {
      setSelectedTasks([...selectedTasks, taskId]);
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/images/city2.jpg')",
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <div className="container home-page">
        <header className="main-header">
          <div>
            <h2>{`Welcome, ${userName || "Guest"}!`}</h2>
            <p>{`Today is ${currentDate}`}</p>
          </div>
        </header>
        <nav className="menu-bar">
          <ul className="menu">
            <li>
              <Link to="#" onClick={toggleCreateTask}>
                Create Task
              </Link>
              {isCreateTaskOpen && (
                <div className="dropdown-content">
                  <TaskCreation handleTaskCreation={handleTaskCreation} />
                </div>
              )}
            </li>
            <li>
              <Link to="#" onClick={toggleGetTask}>
                Get Task
              </Link>
              {isGetTaskOpen && (
                <div className="dropdown-content">
                  <GetTask handleGetTask={handleTaskSelection} />
                </div>
              )}
            </li>
            <li>
              <Link to="#" onClick={toggleUpdateTask}>
                Update Tasks
              </Link>
              {isUpdateTaskOpen && (
                <div className="dropdown-content">
                  <UpdateTask />
                </div>
              )}
            </li>
            <li>
              <Link to="#" onClick={toggleDeleteTask}>
                Delete Tasks
              </Link>
              {isDeleteTaskOpen && (
                <div className="dropdown-content">
                  <DeleteTask />
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default HomePage;