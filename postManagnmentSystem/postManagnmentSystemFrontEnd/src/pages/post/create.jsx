import React, { useState } from "react";
import { createNewPost } from "../../services/postService";
import { useNavigate } from "react-router-dom";

const CreatePostPage = () => {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        status: "draft",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createNewPost(formData);
            navigate(-1); // go back after creation
        } catch (error) {
            console.error(
                "Create failed:",
                error.response?.data || error.message
            );
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    className="w-full border p-2 rounded"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="content"
                    placeholder="Content"
                    className="w-full border p-2 rounded"
                    rows="5"
                    value={formData.content}
                    onChange={handleChange}
                    required
                />
                <select
                    name="status"
                    className="w-full border p-2 rounded"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                </select>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Create
                </button>
            </form>
        </div>
    );
};

export default CreatePostPage;
