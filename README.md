# CampusCore

**A full-stack College Management System for centralized academic and administrative management.**

CampusCore brings core college operations into a single platform with role-based access for administrators, faculty, and students.

---

## 🎯 Problem Statement

College information is often distributed across different systems and manual processes. Student records, faculty information, attendance, examinations, results, fees, assignments, and timetables can become difficult to manage consistently.

CampusCore provides a centralized web-based platform where these operations can be managed through a single system with role-based access.

---

## 💡 Project Overview

CampusCore is a full-stack college management system that provides modules for:

- User authentication and authorization
- Student management
- Faculty management
- Department management
- Course management
- Attendance tracking
- Examination management
- Result management
- Fee management
- Timetable management
- Assignment management
- Role-specific dashboards

The system is designed around a modular backend and a structured relational database.

---

## ⭐ Key Features

### 🔐 Authentication & Authorization

- JWT-based authentication
- Password hashing
- Role-based access control
- Protected API endpoints
- Separate workflows for Admin, Faculty, and Student roles

### 👨‍🎓 Student Management

- Student records
- Academic information
- Attendance
- Results
- Fees
- Assignments

### 👨‍🏫 Faculty Management

- Faculty records
- Course-related information
- Attendance management
- Examination and result workflows

### 🏫 Academic Management

- Departments
- Courses
- Timetables
- Examinations
- Results
- Assignments

### 📊 Role-Based Dashboards

Different users receive different views and functionality according to their responsibilities.

---

## 🏗️ System Architecture

```text
React Frontend
TypeScript + Vite
        |
        v
    REST APIs
        |
        v
FastAPI Backend
        |
        +-------------------------------+
        |               |               |
        v               v               v
     Routers         Schemas          Auth
        \               |              /
         \              |             /
          +-------------+------------+
                        |
                        v
                 SQLAlchemy ORM
                        |
                        v
                   PostgreSQL
```

The application follows a layered approach where the frontend communicates with the FastAPI backend through REST APIs, while SQLAlchemy provides the database abstraction layer over PostgreSQL.

---

## 🧩 Backend Architecture

The backend follows a modular structure:

```text
backend/
└── app/
    ├── auth/
    ├── models/
    ├── routers/
    ├── schemas/
    ├── services/
    ├── utils/
    ├── config.py
    ├── database.py
    ├── exceptions.py
    └── main.py
```

### Responsibilities

| Component | Responsibility |
|---|---|
| `routers/` | API endpoints and request handling |
| `schemas/` | Request and response validation |
| `models/` | Database models |
| `auth/` | Authentication and security |
| `services/` | Application and business logic |
| `database.py` | Database connection and sessions |
| `exceptions.py` | Exception handling |

This separation keeps the application organized and makes individual modules easier to maintain and extend.

---

## 🔐 Authentication Flow

```text
User
  |
  | Email + Password
  v
React Frontend
  |
  | POST /users/login
  v
FastAPI Backend
  |
  | Verify credentials
  v
PostgreSQL
  |
  | Valid User
  v
JWT Access Token
  |
  v
Frontend
  |
  | Authorization: Bearer <Token>
  v
Protected API Endpoints
```

The login endpoint validates the user's email and password. After successful authentication, the backend generates a JWT access token containing the authenticated user's identity and role.

The frontend attaches the token to subsequent authenticated API requests.

---

## 🗄️ Database Design

CampusCore uses PostgreSQL with SQLAlchemy ORM.

### Major Entities

- User
- Student
- Faculty
- Department
- Course
- Attendance
- Exam
- Result
- Fee
- Timetable
- Assignment

These entities represent relationships involved in real college workflows.

### Example Relationships

```text
Department
    |
    +---- Courses
    |
    +---- Faculty
    |
    +---- Students

Student
    |
    +---- Attendance
    +---- Results
    +---- Fees
    +---- Assignments
```

---

## 🛠️ Technology Stack

| Category | Technologies |
|---|---|
| Frontend | React, TypeScript, Vite, Tailwind CSS, Axios, Framer Motion |
| Backend | Python, FastAPI, SQLAlchemy, Pydantic, JWT, Password Hashing, REST APIs |
| Database | PostgreSQL, Neon |
| Deployment & Development | Vercel, Render, Docker, Git, GitHub, VS Code |

---

## 🧠 Engineering Decisions

### Why FastAPI?

FastAPI provides a clean structure for REST API development along with automatic API documentation, request validation, type hints, and strong integration with Python-based backend development.

### Why PostgreSQL?

A relational database is appropriate for a college management system because entities such as students, departments, courses, attendance, examinations, results, and fees have structured relationships.

### Why SQLAlchemy?

SQLAlchemy provides an ORM layer between the Python application and PostgreSQL, allowing database operations to be represented through Python models.

### Why JWT?

JWT provides token-based authentication for protected API requests and allows the backend to associate requests with authenticated users and their roles.

### Why a Modular Backend?

Separating routers, schemas, models, authentication, services, and database logic makes the application easier to understand, debug, maintain, and extend.

---

## 🔌 REST API

The backend exposes RESTful APIs for the major system modules.

Example endpoints:

```text
/users
/students
/faculty
/departments
/courses
/attendance
/exams
/results
/fees
/timetables
/assignments
```

FastAPI automatically provides interactive API documentation through Swagger UI.

---

## 🔄 Frontend–Backend Communication

The frontend communicates with the backend through Axios-based REST requests.

The API client:

- Uses a configurable backend URL
- Sends JSON requests where appropriate
- Sends authentication credentials using Bearer tokens
- Handles authentication failures
- Redirects unauthenticated users to the login page

This keeps frontend presentation and backend business logic separated.

---

## 🚀 Deployment Architecture

CampusCore is deployed as separate frontend, backend, and database services:

```text
Frontend
   |
   | React Application
   v
Vercel
   |
   | HTTPS REST Requests
   v
Render
   |
   | FastAPI Application
   v
Neon PostgreSQL
```

This separation allows each layer to be deployed and maintained independently.

---

## 🧪 Testing & Validation

The deployed application has been tested through:

- Admin authentication
- Faculty authentication
- Student authentication
- Protected API requests
- FastAPI Swagger documentation
- Frontend-to-backend communication
- PostgreSQL integration
- Production deployment

The Admin, Faculty, and Student demo accounts have been tested on the deployed application.

---

## ⚙️ Local Development

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend and backend communicate through the configured API base URL.

---

## 📈 Future Improvements

Potential extensions include:

- Email notifications
- File and document management
- Advanced academic analytics
- Attendance alerts
- Online fee payment
- Cloud object storage
- Automated testing and CI/CD
- More granular permissions
- Audit logging
- Redis caching
- Monitoring and observability

---

## 🎓 Project Objective

CampusCore was built to demonstrate the complete lifecycle of a modern full-stack application:

```text
Frontend
  ↓
REST API
  ↓
Authentication
  ↓
Application Logic
  ↓
ORM
  ↓
PostgreSQL
  ↓
Cloud Deployment
```

The project demonstrates practical experience with:

- Full-stack development
- REST API design
- Backend architecture
- Authentication and authorization
- Relational database design
- ORM-based database integration
- Role-based application workflows
- Cloud deployment