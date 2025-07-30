// src/services/adminService.js
import api from "./api";

export const adminLogin = (data) => api.post("/admins/login", data);
export const adminRegister = (data) => api.post("/admins/register", data);
export const adminLogout = () => api.post("/admins/logout");
export const getAdmin = () => api.get("/admins");

// Post management (admin has full access)
export const getAllPosts = () => api.get("/posts");
export const adminCreatePost = (data) => api.post("/posts", data);
export const adminUpdatePost = (id, data) => api.put(`/posts/${id}`, data);
export const adminDeletePost = (id) => api.delete(`/posts/${id}`);
export const adminShowPost = (id) => api.get(`/posts/${id}`);
