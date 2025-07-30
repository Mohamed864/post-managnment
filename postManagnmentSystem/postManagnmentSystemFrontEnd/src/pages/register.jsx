import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; // adjust path if needed
import { useNavigate } from "react-router-dom";

const Register = () => {
    const { register } = useAuth();
    const [role, setRole] = useState("user");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous error
        if (formData.password !== formData.password_confirmation) {
            setError("Passwords do not match");
            return;
        }

        console.log(formData);

        try {
            await register(formData, role);
            navigate("/login");
        } catch (err) {
            const message =
                err.response?.data?.message ||
                err.response?.data?.errors?.email?.[0] ||
                "Registration failed. Please try again.";
            setError(message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
            <h2 className="text-xl font-bold mb-4">Register as {role}</h2>

            {error && (
                <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-400 rounded">
                    {error}
                </div>
            )}

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
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="mb-3 p-2 border w-full"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
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
                <input
                    type="password"
                    name="password_confirmation"
                    placeholder="Confirm Password"
                    className="mb-3 p-2 border w-full"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
