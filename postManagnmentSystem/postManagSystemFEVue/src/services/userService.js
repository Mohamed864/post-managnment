import api from "./api";

export const userLogin = (data) => api.post("/users/login", data);
export const userRegister = (data) => api.post("/users/register", data);
export const userLogout = () => api.post("/users/logout");
export const getUser = () => api.get("/users");

export const getUserPosts = async (page = 1, perPage = 10, filters = {}) => {
    const token = localStorage.getItem("userToken");
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

export const showPost = (id, include = []) => {
    const params = new URLSearchParams();
    if (include.length > 0) {
        params.append("include", include.join(","));
    }
    return api.get(`/posts/${id}?${params.toString()}`);
};

export const createPost = (data) =>
    api.post("/posts", data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
export const updatePost = (id, data) =>
    api.post(`/posts/${id}?_method=PUT`, data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
export const deletePost = (id) => api.delete(`/posts/${id}`);
