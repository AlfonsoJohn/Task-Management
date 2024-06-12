# Task Management App
.
The Task Management App is a web application built to manage tasks where users can create, view, and manage their tasks.

![Task Management Web App](/frontend/my-task-app/public/images/TaskMg.png)
![Task Management CRUD](/frontend/my-task-app/public/images/CRUD.png)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [Backend Implementation](#backend-implementation)
- [Frontend Implementation](#frontend-implementation)
- [AWS Services Used](#aws-services-used)
- [Authentication and Authorization](#authentication-and-authorization)
- [Task Retrieval](#task-retrieval)
- [Contributing](#contributing)
- [License](#license)

## Overview

The Task Management App provides users with a platform to create tasks and manage them efficiently. Users can sign in to access the task creation feature, view their tasks, and perform necessary actions like updating or deleting tasks.

## Features

- **User Authentication:** Users can sign up and log in securely using AWS Cognito.
- **Task Creation:** Authenticated users can create new tasks with a task ID, name, and description.
- **Task Viewing:** Users can view tasks they've created.
- **Task Deletion and Editing:** Authenticated users can delete or edit their tasks.

## Tech Stack

### Frontend

- React: Frontend framework for building the user interface.
- React Router: For managing navigation within the app.
- Axios: HTTP client for making API requests.
- Bootstrap: For styling and responsive design.
- React Bootstrap: Bootstrap components for React.
- AWS Amplify: For authentication and backend integration.
- FontAwesome: For icons.
- React Confetti: For confetti effects.
- React Datepicker: For date picking functionality.

### Backend

- Python: Backend language.
- Flask: Lightweight web framework for the backend.
- DynamoDB: NoSQL database for storing tasks.
- AWS Amplify: AWS services for authentication and hosting.
- Boto3: AWS SDK for Python.

### AWS Services

- Cognito: For user authentication.
- DynamoDB: Database for storing tasks.
- Amplify: Authentication and hosting services.

## Setup

1. Clone this repository.
2. Navigate to the project directory.
3. Install dependencies:
   ```bash
   npm install     # For the frontend
   pip install -r requirements.txt    # For the backend
   ```
4. Set up AWS Amplify for authentication.

## Backend Implementation

- **API Endpoints:** Implemented endpoints for user authentication, task creation, retrieval, updating, and deletion.
- **DynamoDB Schema:** Defined a table structure to store tasks associated with user IDs.

## Frontend Implementation

- **User Authentication:** Integrated AWS Amplify for user sign-in and sign-up functionalities.
- **Task Creation UI:** Created a form to input task details and submit them to the backend.
- **Task Display:** Fetched and displayed tasks associated with the authenticated user.

## AWS Services Used

- **Cognito:** For user authentication.
- **DynamoDB:** Database for storing tasks.
- **Amplify:** Authentication and hosting services.

## Authentication and Authorization

### Authentication

Users can sign up, log in, and log out securely using AWS Cognito.

### Authorization

Restrict access to the task creation page only for authenticated users.

## Task Retrieval

Implemented logic to retrieve tasks specific to the authenticated user from DynamoDB.

## Contributing

Contributions are welcome! Feel free to open issues or pull requests.

## License

This project is licensed under the MIT License.

This template provides an outline for documenting your project, ensuring that users and contributors have a clear understanding of its features, tech stack, setup instructions, and AWS services utilized. Feel free to customize it to suit your project's specifics!
