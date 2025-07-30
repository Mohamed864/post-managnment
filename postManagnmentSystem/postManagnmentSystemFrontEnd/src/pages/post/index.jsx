import React, { useEffect, useState } from "react";
import { fetchPosts, deleteExistingPost } from "../../services/postService";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const PostPage = () => {
    const { isAdminAuthenticated, isUserAuthenticated } = useAuth();
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadPosts = async () => {
            const res = await fetchPosts(
                isAdminAuthenticated || isUserAuthenticated
            );
            setPosts(res.data.data);
        };
        loadPosts();
    }, [isAdminAuthenticated, isUserAuthenticated]);

    const handleDelete = async (id) => {
        await deleteExistingPost(id, isAdminAuthenticated);
        setPosts(posts.filter((post) => post.id !== id));
    };

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Posts</h1>
            <ul className="space-y-4">
                {posts.map((post) => (
                    <li
                        key={post.id}
                        className="border p-4 rounded shadow flex justify-between items-center"
                    >
                        <div>
                            <h2 className="text-lg font-semibold">
                                {post.title}
                            </h2>
                            <p>{post.content}</p>
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={() => handleEdit(post.id)}
                                className="text-blue-600 hover:underline"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(post.id)}
                                className="text-red-600 hover:underline"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostPage;
