import { Routes, Route, Navigate } from "react-router-dom";
import UserDashboard from "./pages/dashboard/UserDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAuth } from "./context/AuthContext";
import Navigation from "./pages/naviagtion";
import PostPage from "./pages/post";
import CreatePostPage from "./pages/post/create";
import UpdatePostPage from "./pages/post/edit";

const App = () => {
    const { isUserAuthenticated, isAdminAuthenticated } = useAuth();

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Navigation />}>
                <Route
                    path="/user-dashboard"
                    element={
                        isUserAuthenticated ? (
                            <UserDashboard />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
                <Route
                    path="/admin-dashboard"
                    element={
                        isAdminAuthenticated ? (
                            <AdminDashboard />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
                <Route path="/posts" element={<PostPage />} />
                <Route path="/create" element={<CreatePostPage />} />
                <Route path="/edit/:id" element={<UpdatePostPage />} />
            </Route>
        </Routes>
    );
};

export default App;
