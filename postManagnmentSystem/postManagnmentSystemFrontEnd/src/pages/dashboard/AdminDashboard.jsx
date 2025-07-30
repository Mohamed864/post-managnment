import React from "react";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
    const { admin, logout } = useAuth();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
            <p>Welcome, {admin?.name}</p>
            <p>Email: {admin?.email}</p>

            <button
                onClick={() => logout("admin")}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
            >
                Logout
            </button>
        </div>
    );
};

export default AdminDashboard;
