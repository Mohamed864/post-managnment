<template>
    <div class="max-w-lg mx-auto p-4">
        <h2 class="text-2xl font-bold mb-4">Create New Post</h2>
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
            />
            <select v-model="formData.status" class="w-full border p-2 rounded">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
            </select>
            <button
                class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Create
            </button>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { createNewPost } from "../../services/postService";

const router = useRouter();
const formData = ref({
    title: "",
    content: "",
    status: "draft",
});

const handleSubmit = async () => {
    try {
        await createNewPost(formData.value);
        router.back();
    } catch (error) {
        console.error("Create failed:", error.response?.data || error.message);
    }
};
</script>
