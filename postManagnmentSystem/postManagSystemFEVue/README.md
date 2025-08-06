## Getting Started

### Frontend (Vue)

1-

cd frontend

2-

npm install

3-

npm run dev

/---------------------------------------------/

# Step 1: Create Vue project with Vite

npm create vite

# Enter name, select Vue, JavaScript

cd your-project-name

# Step 2: Install dependencies

npm install

# Step 3: Configure environment

cp .env.example .env

# Add VITE_API_URL=http://localhost:8000/api or your backend URL

# Step 4: Start the development server

npm run dev

## Frontend Implementation Overview

Project Setup

Created using Vite + vue + JavaScript

Axios for API requests

vue Router DOM for routing

store API for user state management

src/
│
├── component/
│ └── naviagtion.js  
│
├── stores/
│ └── Auth.js
│
├── services/
│ ├── api.js
│ ├── adminService.js
│ ├── postService.js
│ └── userService.js
│
├── pages/
│ ├── Dashboard
│ │ ├── AdminDashboard.js
│ │ └── UserDashboard.js
│ ├── post
│ │ ├── create.js
│ │ ├── edit.js
│ │ └── index.js
│ ├── login.js
│ └── register.js
│
└── App.js

# Authentication

AuthContext manages currentUser & token via localStorage for admin and user carry login and logout and register apis

# Posts & Platforms

Post.js: Create post using API,
admins can see , update and delete all posts &&
users can see , update and delete only their own posts.

# Navigation

Navigation.js header switches between Login/Logout based on token presence

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

Vue + Vite frontend manages UI and state with token-based auth.
