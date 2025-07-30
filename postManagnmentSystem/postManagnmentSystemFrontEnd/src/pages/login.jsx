import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; // adjust path if needed
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { login } = useAuth();
    const [role, setRole] = useState("user");
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData, role);
            navigate(role === "admin" ? "/admin-dashboard" : "/user-dashboard");
        } catch (err) {
            console.error("Login failed", err.response?.data?.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
            <h2 className="text-xl font-bold mb-4">Login as {role}</h2>
            <select
                className="mb-4 border p-2 w-full"
                value={role}
                onChange={(e) => setRole(e.target.value)}
            >
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="mb-3 p-2 border w-full"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="mb-3 p-2 border w-full"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
