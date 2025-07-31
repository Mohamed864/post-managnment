import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
    const { admin } = useAuth();

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6"> Dashboard</h2>
                <nav className="space-y-4">
                    <Link
                        to="/create"
                        className="block text-gray-700 hover:text-blue-600"
                    >
                        ➕ Add New Post
                    </Link>
                    <Link
                        to="/posts"
                        className="block text-gray-700 hover:text-blue-600"
                    >
                        📝 Manage Posts
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">
                            Welcome, {admin?.name}
                        </h1>
                        <p className="text-gray-600">Email: {admin?.email}</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
