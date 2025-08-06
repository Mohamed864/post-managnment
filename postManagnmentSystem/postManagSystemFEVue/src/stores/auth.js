import { defineStore } from "pinia";
import { ref } from "vue";
import { userLogin, userRegister, userLogout } from "../services/userService";
import {
    adminLogin,
    adminRegister,
    adminLogout,
} from "../services/adminService";

export const useAuthStore = defineStore("auth", () => {
    const user = ref(JSON.parse(localStorage.getItem("USER_DATA")) || null);
    const admin = ref(JSON.parse(localStorage.getItem("ADMIN_DATA")) || null);

    const isUserAuthenticated = () => !!user.value;
    const isAdminAuthenticated = () => !!admin.value;

    const login = async (credentials, role = "user") => {
        const response =
            role === "admin"
                ? await adminLogin(credentials)
                : await userLogin(credentials);

        const token = response.data.data.token;
        const userData = response.data.data[role];

        if (role === "admin") {
            localStorage.setItem("ADMIN_TOKEN", token);
            localStorage.setItem("ADMIN_DATA", JSON.stringify(userData));
            admin.value = userData;
        } else {
            localStorage.setItem("USER_TOKEN", token);
            localStorage.setItem("USER_DATA", JSON.stringify(userData));
            user.value = userData;
        }

        return userData;
    };

    const register = async (data, role = "user") => {
        const response =
            role === "admin"
                ? await adminRegister(data)
                : await userRegister(data);

        return response.data;
    };

    const logout = async (role) => {
        const logoutAdmin = role === "admin" || (!role && admin.value);
        const logoutUser = role === "user" || (!role && user.value);

        if (logoutAdmin) {
            await adminLogout();
            localStorage.removeItem("ADMIN_TOKEN");
            localStorage.removeItem("ADMIN_DATA");
            admin.value = null;
        }

        if (logoutUser) {
            await userLogout();
            localStorage.removeItem("USER_TOKEN");
            localStorage.removeItem("USER_DATA");
            user.value = null;
        }
    };

    return {
        user,
        admin,
        isUserAuthenticated,
        isAdminAuthenticated,
        login,
        register,
        logout,
    };
});
