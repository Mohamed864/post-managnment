// src/services/api.js
import axios from "axios";

const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
    withCredentials: false, // ❌ Disable cookies
});

instance.interceptors.request.use((config) => {
    const adminToken = localStorage.getItem("ADMIN_TOKEN");
    const userToken = localStorage.getItem("USER_TOKEN");

    let token = null;

    if (config.url.startsWith("/admins")) {
        token = adminToken;
    } else if (config.url.startsWith("/users")) {
        token = userToken;
    } else if (config.url.startsWith("/posts")) {
        token = adminToken || userToken;
    }

    const isPublic = ["/login", "/register"].some((url) =>
        config.url.includes(url)
    );

    if (!isPublic && token) {
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
        };
    }

    return config;
});

export default instance;
