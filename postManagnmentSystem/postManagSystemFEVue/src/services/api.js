import axios from "axios";

const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
    withCredentials: false, // Set to false if you're using Bearer tokens
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
        config.headers.Authorization = `Bearer ${token}`;
        config.headers["Content-Type"] = "application/json";
        config.headers.Accept = "application/json";
    }

    return config;
});

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Optional: Clear token + redirect
            localStorage.removeItem("ADMIN_TOKEN");
            localStorage.removeItem("USER_TOKEN");
            window.location.href = "/"; // or use navigate() in React
        }
        return Promise.reject(error);
    }
);

export default instance;
