import api from "./api";

export const adminLogin = (data) => api.post("/admins/login", data);
export const adminRegister = (data) => api.post("/admins/register", data);
export const adminLogout = () => api.post("/admins/logout");
export const getAdmin = () => api.get("/admins");

// Post management (admin has full access)

export const getAllPosts = async (page = 1, perPage = 10, filters = {}) => {
    const token = localStorage.getItem("adminToken");
    const params = new URLSearchParams({
        page,
        per_page: perPage,
        ...filters,
    });

    const response = await api.get(`/posts?${params.toString()}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const adminShowPost = (id, include = [], withTrashed = false) => {
    const params = new URLSearchParams();
    if (include.length > 0) {
        params.append("include", include.join(","));
    }
    if (withTrashed) {
        params.append("with_trashed", "1");
    }
    return api.get(`/posts/${id}?${params.toString()}`);
};

export const adminCreatePost = (data) =>
    api.post("/posts", data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
export const adminUpdatePost = (id, data) =>
    api.post(`/posts/${id}?_method=PUT`, data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
export const adminDeletePost = (id) => api.delete(`/posts/${id}`);
