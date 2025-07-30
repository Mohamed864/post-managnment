import React from "react";
import { useAuth } from "../../context/AuthContext";

const UserDashboard = () => {
    const { user, logout } = useAuth();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name}</h1>
            <p>Email: {user?.email}</p>

            <button
                onClick={() => logout("user")}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
                Logout
            </button>
        </div>
    );
};

export default UserDashboard;
