// src/services/userService.js
import api from "./api";

export const userLogin = (data) => api.post("/users/login", data);
export const userRegister = (data) => api.post("/users/register", data);
export const userLogout = () => api.post("/users/logout");
export const getUser = () => api.get("/users");

// Post management (user)
export const getUserPosts = () => api.get("/posts");
export const createPost = (data) => api.post("/posts", data);
export const updatePost = (id, data) => api.put(`/posts/${id}`, data);
export const deletePost = (id) => api.delete(`/posts/${id}`);
export const showPost = (id) => api.get(`/posts/${id}`);
