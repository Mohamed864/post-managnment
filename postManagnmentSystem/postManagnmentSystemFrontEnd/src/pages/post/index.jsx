import { useEffect, useState } from "react";
import { fetchPosts, deleteExistingPost } from "../../services/postService";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const PostPage = () => {
    const { isAdminAuthenticated, isUserAuthenticated } = useAuth();
    const [posts, setPosts] = useState([]);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        total: 0,
        per_page: 10,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const loadPosts = async (page = 1) => {
        try {
            setLoading(true);
            const res = await fetchPosts(
                isAdminAuthenticated || isUserAuthenticated,
                page,
                10,
                {
                    ...(searchTerm && { search: searchTerm }),
                    ...(statusFilter && { status: statusFilter }),
                }
            );

            // Make sure we're getting single values, not arrays
            const currentPage = Array.isArray(res.meta.current_page)
                ? res.meta.current_page[0]
                : res.meta.current_page;
            const lastPage = Array.isArray(res.meta.last_page)
                ? res.meta.last_page[0]
                : res.meta.last_page;
            const perPage = Array.isArray(res.meta.per_page)
                ? res.meta.per_page[0]
                : res.meta.per_page;
            const total = Array.isArray(res.meta.total)
                ? res.meta.total[0]
                : res.meta.total;

            setPosts(res.data);
            setPagination({
                current_page: currentPage,
                last_page: lastPage,
                total: total,
                per_page: perPage,
            });
            console.log(res);
            setError(null);
        } catch (err) {
            console.error("Failed to load posts:", err);
            setError("Failed to load posts. Please try again.");
            setPosts([]);
        } finally {
            setLoading(false);
        }
    };

    // Load posts when filters change or auth status changes
    useEffect(() => {
        const timerId = setTimeout(() => {
            loadPosts(1); // Always reset to page 1 when filters change
        }, 500);

        return () => clearTimeout(timerId);
    }, [searchTerm, statusFilter, isAdminAuthenticated, isUserAuthenticated]);

    const handleDelete = async (id) => {
        try {
            await deleteExistingPost(id, isAdminAuthenticated);
            setPosts(posts.filter((post) => post.id !== id));
            loadPosts(pagination.current_page);
        } catch (error) {
            console.error("Failed to delete post:", error);
            setError("Failed to delete post.");
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    const handlePageChange = (page) => {
        loadPosts(page);
    };

    const handleResetFilters = () => {
        setSearchTerm("");
        setStatusFilter("");
    };

    if (loading) {
        return <div className="p-4">Loading posts...</div>;
    }

    if (error) {
        return <div className="p-4 text-red-500">{error}</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Posts</h1>

            {/* Filter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Search by title/content */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Search
                    </label>
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                </div>

                {/* Filter by status */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Status
                    </label>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full border p-2 rounded"
                    >
                        <option value="">All Statuses</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                    </select>
                </div>

                {/* Reset filters */}
                <div className="flex items-end">
                    <button
                        onClick={handleResetFilters}
                        className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
                    >
                        Reset Filters
                    </button>
                </div>
            </div>

            {/* Posts List */}
            {posts.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                    No posts found matching your criteria.
                </div>
            ) : (
                <>
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
                                    <p className="text-gray-600 mb-2 line-clamp-2">
                                        {post.content}
                                    </p>
                                    <div className="text-sm text-gray-500">
                                        <span
                                            className={`px-2 py-1 rounded ${
                                                post.status === "published"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-yellow-100 text-yellow-800"
                                            }`}
                                        >
                                            {post.status}
                                        </span>
                                        {post.author && (
                                            <span className="ml-2">
                                                By: {post.author.name}
                                            </span>
                                        )}
                                        <span className="ml-2">
                                            {new Date(
                                                post.created_at
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => handleEdit(post.id)}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Pagination */}
                    <div className="flex justify-center items-center gap-2 mt-6">
                        <button
                            onClick={() =>
                                handlePageChange(pagination.current_page - 1)
                            }
                            disabled={pagination.current_page === 1}
                            className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                        >
                            Previous
                        </button>

                        {Array.from(
                            { length: pagination.last_page },
                            (_, i) => i + 1
                        ).map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`px-3 py-1 border rounded ${
                                    pagination.current_page === page
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-100 hover:bg-gray-200"
                                }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() =>
                                handlePageChange(pagination.current_page + 1)
                            }
                            disabled={
                                pagination.current_page === pagination.last_page
                            }
                            className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default PostPage;
