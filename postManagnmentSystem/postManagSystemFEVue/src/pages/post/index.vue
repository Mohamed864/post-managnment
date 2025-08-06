<template>
    <div class="p-4">
        <h1 class="text-2xl font-bold mb-4">Posts</h1>

        <!-- Filters -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
                <label class="block text-sm font-medium mb-1">Search</label>
                <input
                    v-model="searchTerm"
                    type="text"
                    placeholder="Search posts..."
                    class="w-full border p-2 rounded"
                />
            </div>

            <div>
                <label class="block text-sm font-medium mb-1">Status</label>
                <select
                    v-model="statusFilter"
                    class="w-full border p-2 rounded"
                >
                    <option value="">All Statuses</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                </select>
            </div>

            <div class="flex items-end">
                <button
                    @click="resetFilters"
                    class="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
                >
                    Reset Filters
                </button>
            </div>
        </div>

        <!-- Content -->
        <div v-if="loading" class="p-4">Loading posts...</div>
        <div v-else-if="error" class="p-4 text-red-500">{{ error }}</div>
        <div v-else>
            <div
                v-if="posts.length === 0"
                class="p-4 text-center text-gray-500"
            >
                No posts found matching your criteria.
            </div>
            <ul v-else class="space-y-4">
                <li
                    v-for="post in posts"
                    :key="post.id"
                    class="border p-4 rounded shadow flex justify-between items-center"
                >
                    <div>
                        <h2 class="text-lg font-semibold">{{ post.title }}</h2>
                        <p class="text-gray-600 mb-2 line-clamp-2">
                            {{ post.content }}
                        </p>
                        <div class="text-sm text-gray-500">
                            <span
                                :class="[
                                    'px-2 py-1 rounded',
                                    post.status === 'published'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-yellow-100 text-yellow-800',
                                ]"
                            >
                                {{ post.status }}
                            </span>
                            <span v-if="post.author" class="ml-2"
                                >By: {{ post.author.name }}</span
                            >
                            <span class="ml-2">
                                {{
                                    new Date(
                                        post.created_at
                                    ).toLocaleDateString()
                                }}
                            </span>
                        </div>
                    </div>
                    <div class="flex gap-4">
                        <button
                            @click="editPost(post.id)"
                            class="text-blue-600 hover:text-blue-800"
                        >
                            Edit
                        </button>
                        <button
                            @click="deletePost(post.id)"
                            class="text-red-600 hover:text-red-800"
                        >
                            Delete
                        </button>
                    </div>
                </li>
            </ul>

            <!-- Pagination -->
            <div class="flex justify-center items-center gap-2 mt-6">
                <button
                    @click="changePage(pagination.current_page - 1)"
                    :disabled="pagination.current_page === 1"
                    class="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                >
                    Previous
                </button>

                <button
                    v-for="page in pagination.last_page"
                    :key="page"
                    @click="changePage(page)"
                    :class="[
                        'px-3 py-1 border rounded',
                        pagination.current_page === page
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200',
                    ]"
                >
                    {{ page }}
                </button>

                <button
                    @click="changePage(pagination.current_page + 1)"
                    :disabled="pagination.current_page === pagination.last_page"
                    class="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { fetchPosts, deleteExistingPost } from "../../services/postService";

// Dummy auth status (replace with Pinia or actual logic)
const isAdminAuthenticated = true;
const isUserAuthenticated = false;

const router = useRouter();

const posts = ref([]);
const searchTerm = ref("");
const statusFilter = ref("");
const loading = ref(true);
const error = ref(null);

const pagination = ref({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 10,
});

const loadPosts = async (page = 1) => {
    try {
        loading.value = true;

        const res = await fetchPosts(
            isAdminAuthenticated || isUserAuthenticated,
            page,
            10,
            {
                ...(searchTerm.value && { search: searchTerm.value }),
                ...(statusFilter.value && { status: statusFilter.value }),
            }
        );

        const meta = res.meta;
        posts.value = res.data;
        pagination.value = {
            current_page: Array.isArray(meta.current_page)
                ? meta.current_page[0]
                : meta.current_page,
            last_page: Array.isArray(meta.last_page)
                ? meta.last_page[0]
                : meta.last_page,
            total: Array.isArray(meta.total) ? meta.total[0] : meta.total,
            per_page: Array.isArray(meta.per_page)
                ? meta.per_page[0]
                : meta.per_page,
        };
        error.value = null;
    } catch (err) {
        console.error("Failed to load posts:", err);
        error.value = "Failed to load posts. Please try again.";
        posts.value = [];
    } finally {
        loading.value = false;
    }
};

const deletePost = async (id) => {
    try {
        await deleteExistingPost(id, isAdminAuthenticated);
        posts.value = posts.value.filter((p) => p.id !== id);
        loadPosts(pagination.value.current_page);
    } catch (err) {
        console.error("Failed to delete post:", err);
        error.value = "Failed to delete post.";
    }
};

const editPost = (id) => {
    router.push(`/edit/${id}`);
};

const changePage = (page) => {
    loadPosts(page);
};

const resetFilters = () => {
    searchTerm.value = "";
    statusFilter.value = "";
};

watch([searchTerm, statusFilter], () => {
    const timer = setTimeout(() => {
        loadPosts(1);
    }, 500);
    return () => clearTimeout(timer);
});

onMounted(() => {
    loadPosts();
});
</script>
