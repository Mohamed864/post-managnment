# to run the project in backend

git clone link-of-project

cd project-name

composer install

edit .env file

php artisan migrate

php artisan serve

# to run project in frontend

npm install

npm run dev

# Scheduler - Full Stack Project

This is a full-stack project built with Laravel (backend) and React (frontend). It allows admins to register, login, create, update, and delete all posts , it allows users to register, login, create, update, and delete only their own posts The backend is powered by Laravel Sanctum for authentication The frontend is implemented using React, React Router, Context API, Axios, and bootstrap(Tailwind).

# How to Run the Project

# Backend (Laravel)

# Step 1: Install Laravel and setup the project

composer create-project laravel/laravel scheduler
cd scheduler

# Step 2: Set your .env and configure PostgreSQL database

# Step 3: Install Laravel Sanctum

composer require laravel/sanctum

php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"

php artisan migrate

php artisan install:api

# Step 4: Additional Configurations

-   Add `HasApiTokens` to `User.php`
-   Setup CORS and CSRF exemptions for `api/*`

# Step 5: Start the server

php artisan serve

# Backend Implementation Overview

# Part 1: Authentication (Register/Login/Logout)

Sanctum for API token authentication.

CORS setup and CSRF exemption.

AuthController with register, login, logout logic.
AdminAuthController with register, login, logout logic.

API routes in routes/api.php.

# Part 2: Posts Management

Post model, controller, migration, resource created.

CRUD with authentication middleware.

powered by Eloquent ORM and migrations.

/api/posts: get all posts

/api/posts/{id}: get single post

/api/posts: store post

/api/posts/{id}: update post

/api/posts/{id}: destroy post

using PostRequest, PostResouces, PostPolicy

search and filter by status is done
