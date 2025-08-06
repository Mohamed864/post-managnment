<!-- src/pages/LoginPage.vue -->
<template>
    <div class="max-w-md mx-auto mt-10 p-4 border rounded shadow">
        <h2 class="text-xl font-bold mb-4">Login as {{ role }}</h2>
        <select class="mb-4 border p-2 w-full" v-model="role">
            <option value="user">User</option>
            <option value="admin">Admin</option>
        </select>

        <form @submit.prevent="handleSubmit">
            <input
                v-model="formData.email"
                type="email"
                name="email"
                placeholder="Email"
                class="mb-3 p-2 border w-full"
                required
            />
            <input
                v-model="formData.password"
                type="password"
                name="password"
                placeholder="Password"
                class="mb-3 p-2 border w-full"
                required
            />
            <button
                type="submit"
                class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
                Login
            </button>
            <router-link
                to="/register"
                class="mt-2 block text-center text-blue-500 hover:underline"
            >
                Don't have an account? Register
            </router-link>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth.js";

const router = useRouter();
const authStore = useAuthStore();

const role = ref("user");
const formData = ref({
    email: "",
    password: "",
});

const handleSubmit = async () => {
    try {
        await authStore.login(formData.value, role.value);
        router.push(
            role.value === "admin" ? "/admin-dashboard" : "/user-dashboard"
        );
    } catch (err) {
        console.error(
            "Login failed",
            err.response?.data?.message || err.message
        );
    }
};
</script>
