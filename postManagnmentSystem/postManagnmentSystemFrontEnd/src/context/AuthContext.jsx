import React, { createContext, useContext, useState, useEffect } from "react";

import { userLogin } from "../services/userService";
import { adminLogin } from "../services/adminService";
import { userRegister } from "../services/userService";
import { adminRegister } from "../services/adminService";
import { userLogout } from "../services/userService";
import { adminLogout } from "../services/adminService";
const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("USER_DATA");
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [admin, setAdmin] = useState(() => {
        const savedUser = localStorage.getItem("ADMIN_DATA");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        const userToken = localStorage.getItem("USER_TOKEN");
        const adminToken = localStorage.getItem("ADMIN_TOKEN");
        const storedUser = localStorage.getItem("USER_DATA");
        const storedAdmin = localStorage.getItem("ADMIN_DATA");

        if (userToken && storedUser) setUser(JSON.parse(storedUser));
        if (adminToken && storedAdmin) setAdmin(JSON.parse(storedAdmin));
    }, []);

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
            setAdmin(userData);
        } else {
            localStorage.setItem("USER_TOKEN", token);
            localStorage.setItem("USER_DATA", JSON.stringify(userData));
            setUser(userData);
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
        const logoutAdmin = role === "admin" || (!role && admin);
        const logoutUser = role === "user" || (!role && user);

        if (logoutAdmin) {
            console.log("Logging out admin");
            await adminLogout();
            localStorage.removeItem("ADMIN_TOKEN");
            localStorage.removeItem("ADMIN_DATA");
            setAdmin(null);
        }

        if (logoutUser) {
            await userLogout();
            localStorage.removeItem("USER_TOKEN");
            localStorage.removeItem("USER_DATA");
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                admin,
                isUserAuthenticated: !!user,
                isAdminAuthenticated: !!admin,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
