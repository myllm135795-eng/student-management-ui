# Student Management UI - React Application

A modern React-based user interface for managing students with create, read, update, and delete operations. This application connects to the Spring Boot Student Management API backend.

## Features

- ✅ Create Students
- ✅ Read Students
- ✅ Update Students
- ✅ Delete Students
- ✅ Real-time validation
- ✅ Toast notifications
- ✅ Responsive design

## Tech Stack

- React 18
- Bootstrap 5
- Axios
- React Toastify
- React Bootstrap

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Spring Boot Student Management API running on http://localhost:8080

## Installation

```bash
git clone https://github.com/myllm135795-eng/student-management-ui.git
cd student-management-ui
npm install
```

## Run the app

```bash
npm start
```

The application runs at http://localhost:3000

## Environment

Optional `.env`:

```bash
REACT_APP_API_URL=http://localhost:8080/api/students
```

## API endpoints used

- GET /api/students
- GET /api/students/{id}
- POST /api/students
- PUT /api/students/{id}
- DELETE /api/students/{id}
