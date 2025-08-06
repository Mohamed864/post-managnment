<!-- src/views/UserDashboard.vue -->
<template>
    <div class="min-h-screen flex flex-col md:flex-row bg-gray-100">
        <!-- Sidebar -->
        <aside class="w-full md:w-64 bg-white shadow-md p-6">
            <h2 class="text-xl font-semibold mb-6">Dashboard</h2>
            <nav class="space-y-4">
                <RouterLink
                    to="/create"
                    class="block text-gray-700 hover:text-blue-600"
                >
                    ➕ Create New Post
                </RouterLink>
                <RouterLink
                    to="/posts"
                    class="block text-gray-700 hover:text-blue-600"
                >
                    📝 My Posts
                </RouterLink>
            </nav>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 p-6">
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h1 class="text-2xl font-bold">
                        Welcome, {{ user?.name }}
                    </h1>
                    <p class="text-gray-600">Email: {{ user?.email }}</p>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { useAuthStore } from "../../stores/auth"; // Pinia auth store
import { RouterLink } from "vue-router";

const { user } = useAuthStore();
</script>
