<template>
    <div class="max-w-md mx-auto mt-10 p-4 border rounded shadow">
        <h2 class="text-xl font-bold mb-4">Register as {{ role }}</h2>

        <div
            v-if="error"
            class="mb-4 p-2 bg-red-100 text-red-700 border border-red-400 rounded"
        >
            {{ error }}
        </div>

        <select v-model="role" class="mb-4 border p-2 w-full">
            <option value="user">User</option>
            <option value="admin">Admin</option>
        </select>

        <form @submit.prevent="handleSubmit">
            <input
                type="text"
                name="name"
                placeholder="Name"
                class="mb-3 p-2 border w-full"
                v-model="formData.name"
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                class="mb-3 p-2 border w-full"
                v-model="formData.email"
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                class="mb-3 p-2 border w-full"
                v-model="formData.password"
                required
            />
            <input
                type="password"
                name="password_confirmation"
                placeholder="Confirm Password"
                class="mb-3 p-2 border w-full"
                v-model="formData.password_confirmation"
                required
            />
            <button
                type="submit"
                class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
                Register
            </button>
            <router-link to="/" class="mt-2 block text-center text-blue-600"
                >Already have an account? Login</router-link
            >
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const auth = useAuthStore();

const role = ref("user");
const error = ref("");
const formData = ref({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
});

const handleSubmit = async () => {
    error.value = "";

    if (formData.value.password !== formData.value.password_confirmation) {
        error.value = "Passwords do not match";
        return;
    }

    try {
        await auth.register(formData.value, role.value);
        router.push("/");
    } catch (err) {
        const msg =
            err.response?.data?.message ||
            err.response?.data?.errors?.email?.[0] ||
            "Registration failed. Please try again.";
        error.value = msg;
    }
};
</script>
