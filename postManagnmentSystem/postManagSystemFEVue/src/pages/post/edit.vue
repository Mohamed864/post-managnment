<template>
    <div class="max-w-lg mx-auto p-4">
        <h2 class="text-2xl font-bold mb-4">Update Post</h2>
        <form @submit.prevent="handleSubmit" class="space-y-4">
            <input
                v-model="formData.title"
                type="text"
                name="title"
                placeholder="Title"
                class="w-full border p-2 rounded"
                required
            />

            <textarea
                v-model="formData.content"
                name="content"
                placeholder="Content"
                class="w-full border p-2 rounded"
                rows="5"
                required
            ></textarea>

            <select
                v-model="formData.status"
                name="status"
                class="w-full border p-2 rounded"
                :disabled="formData.status === 'published'"
                :title="
                    formData.status === 'published'
                        ? 'Published posts cannot change status'
                        : ''
                "
            >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
            </select>

            <button
                class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
                Update
            </button>
        </form>
    </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { showSinglePost, updateExistingPost } from "../../services/postService"; // adjust path if needed

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const formData = reactive({
    title: "",
    content: "",
    status: "draft",
});

onMounted(async () => {
    try {
        const res = await showSinglePost(id);
        Object.assign(formData, res.data.data);
    } catch (error) {
        console.error(
            "Failed to fetch post:",
            error.response?.data || error.message
        );
    }
});

const handleSubmit = async () => {
    try {
        await updateExistingPost(id, formData);
        router.back(); // go back after update
    } catch (error) {
        console.error("Update failed:", error.response?.data || error.message);
    }
};
</script>
