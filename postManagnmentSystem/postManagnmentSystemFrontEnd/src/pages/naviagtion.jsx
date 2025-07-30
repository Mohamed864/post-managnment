import { Fragment, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X } from "lucide-react"; // icons

const Navigation = () => {
    const { user, admin, isUserAuthenticated, isAdminAuthenticated, logout } =
        useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            if (isAdminAuthenticated) await logout("admin");
            else if (isUserAuthenticated) await logout("user");
            navigate("/auth");
        } catch (error) {
            console.error(
                "Logout failed:",
                error.response?.data || error.message
            );
        }
    };

    const roleName = isAdminAuthenticated ? admin?.name : user?.name;

    const links = isAdminAuthenticated ? (
        <>
            <Link to="/posts" className="hover:underline">
                Posts
            </Link>
            <Link to="/create" className="hover:underline">
                Create Post
            </Link>
            <Link to="/settings" className="hover:underline">
                Settings
            </Link>
        </>
    ) : (
        <>
            <Link to="/posts" className="hover:underline">
                My Posts
            </Link>
            <Link to="/create" className="hover:underline">
                Create Post
            </Link>
        </>
    );

    return (
        <Fragment>
            <nav className="bg-blue-600 text-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0 text-2xl font-bold tracking-wide">
                            <Link
                                to={
                                    isAdminAuthenticated
                                        ? "/admin-dashboard"
                                        : "/user-dashboard"
                                }
                            >
                                {isAdminAuthenticated
                                    ? "Admin Panel"
                                    : "User Dashboard"}
                            </Link>
                        </div>

                        {/* Desktop links */}
                        <div className="hidden md:flex items-center gap-6">
                            {isAdminAuthenticated || isUserAuthenticated ? (
                                <>
                                    {links}

                                    <button
                                        onClick={handleLogout}
                                        className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-200 transition"
                                    >
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-200 transition"
                                >
                                    Sign In
                                </Link>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="text-white focus:outline-none"
                            >
                                {menuOpen ? (
                                    <X size={28} />
                                ) : (
                                    <Menu size={28} />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="md:hidden px-4 py-4 space-y-2 bg-blue-500">
                        {isAdminAuthenticated || isUserAuthenticated ? (
                            <>
                                <div className="flex flex-col space-y-2">
                                    {links}
                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="bg-white text-blue-600 w-full py-2 rounded hover:bg-gray-200 transition mt-2"
                                >
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="block bg-white text-blue-600 py-2 px-4 rounded hover:bg-gray-200 transition"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>
                )}
            </nav>

            <main className="p-4">
                <Outlet />
            </main>
        </Fragment>
    );
};

export default Navigation;
