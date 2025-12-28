# Task Management Application 📝

A full-stack task management application built for the Junior Software Engineer technical assessment.

The application follows a professional **N-Layer Architecture** to ensure scalability, maintainability, and separation of concerns.

## 🚀 Live Demo
**[PASTE YOUR RENDER LINK HERE]**

> **⚠️ Note on Deployment:**
> The live demo is hosted on Render's free tier using SQLite. Please note that data may reset when the instance restarts due to the ephemeral file system. In a real production environment, I would connect this to a managed PostgreSQL database.

*(Note: The backend is hosted on a free instance. Please allow up to 50 seconds for the initial request to wake up the server.)*

---

## ✨ Features
### Core Functionality
- **User Authentication:** Secure JWT-based registration and login with bcrypt password hashing.
- **Task Management:** Create, Read, Update (Status), and Delete tasks.
- **Protected Routes:** Middleware ensures users can only access and manage their own tasks.
- **Responsive UI:** A clean, mobile-friendly interface built with React and Vite.

### 🌟 Bonus Features Implemented
- **🐳 Docker Support:** Fully containerized with `Dockerfile` and `docker-compose`.
- **📄 Pagination:** Backend supports `limit`/`offset` and frontend includes pagination controls.
- **🔒 Protected Frontend Routes:** React Router guards to redirect unauthenticated users.
- **🚀 Deployment:** Live deployment on Render.

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** SQLite (Zero-configuration file-based DB).
- **Frontend:** React, Vite, Axios.
- **Architecture:** N-Layer (MVC Pattern).
- **DevOps:** Docker, Docker Compose.

---

## 🏗️ Architecture Design
I implemented a modular **N-Layer Architecture** on the backend to separate business logic from routing and data access:

1.  **Routes Layer (`/routes`):** Defines API endpoints and assigns middleware.
2.  **Controller Layer (`/controllers`):** Handles incoming HTTP requests and responses.
3.  **Service/Model Layer (`/models`):** Interacting with the database and executing SQL queries.
4.  **Config Layer (`/config`):** Database connection management.

---

## 📸 Screenshots

### Login & Registration
![Login Screen](./screenshots/login.png)

### Task Dashboard
![Dashboard Screen](./screenshots/dashboard.png)

---

## 🔧 Setup & Installation

### Option 1: Quick Start (Docker) 🐳
If you have Docker installed, you can run the entire stack with one command:
```bash
docker-compose up --build