import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateExistingPost, showSinglePost } from "../../services/postService";

const UpdatePostPage = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        status: "draft",
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await showSinglePost(id);
                setFormData(res.data.data);
            } catch (error) {
                console.error(
                    "Failed to fetch post:",
                    error.response?.data || error.message
                );
            }
        };
        fetchPost();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateExistingPost(id, formData);
            navigate(-1); // go back after update
        } catch (error) {
            console.error(
                "Update failed:",
                error.response?.data || error.message
            );
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Update Post</h2>
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
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                    Update
                </button>
            </form>
        </div>
    );
};

export default UpdatePostPage;
