## Getting Started

### Frontend (React)

1-

cd frontend

2-

npm install

3-

npm run dev

/---------------------------------------------/

# Step 1: Create React project with Vite

npm create vite

# Enter name, select React, JavaScript

cd your-project-name

# Step 2: Install dependencies

npm install
npm install axios react-router-dom sass

# Step 3: Configure environment

cp .env.example .env

# Add VITE_API_URL=http://localhost:8000/api or your backend URL

# Step 4: Start the development server

npm run dev

## Frontend Implementation Overview

Project Setup

Created using Vite + React + JavaScript

Axios for API requests

React Router DOM for routing

Context API for user state management

src/
│
├── context/
│ └── AuthContext.jsx
│
├── services/
│ ├── api.js
│ ├── adminService.js
│ ├── postService.js
│ └── userService.js
│
├── pages/
│ ├── Dashboard.jsx
│ │ ├── AdminDashboard.jsx
│ │ └── UserDashboard.jsx
│ ├── post.jsx
│ │ ├── create.jsx
│ │ ├── edit.jsx
│ │ └── index.jsx
│ ├── login.jsx
│ ├── navigation.jsx
│ └── register.jsx
│
└── App.jsx

# Authentication

AuthContext manages currentUser & token via localStorage for admin and user carry login and logout and register apis

# Posts & Platforms

Post.jsx: Create post using API,
admins can see , update and delete all posts &&
users can see , update and delete only their own posts.

# Navigation

Navigation.jsx header switches between Login/Logout based on token presence

Logout clears token/localStorage and calls backend logout API

# services Handling

axios.js sets headers and interceptors:

headers: {
'Content-Type': 'application/json',
Accept: 'application/json',
Authorization: `Bearer ${token}`
}

# Summary

Laravel Sanctum handles secure user authentication.

React + Vite frontend manages UI and state with token-based auth.
