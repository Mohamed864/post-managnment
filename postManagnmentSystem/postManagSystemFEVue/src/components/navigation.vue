<template>
    <nav class="bg-blue-600 text-white shadow-md">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex-shrink-0 text-2xl font-bold tracking-wide">
                    <RouterLink :to="dashboardLink">
                        {{ isAdminAuthenticated ? "Admin Panel" : "Dashboard" }}
                    </RouterLink>
                </div>

                <!-- Desktop Links -->
                <div class="hidden md:flex items-center gap-6">
                    <template v-if="isAuthenticated">
                        <RouterLink to="/posts" class="hover:underline">
                            {{ isAdminAuthenticated ? "Posts" : "My Posts" }}
                        </RouterLink>
                        <RouterLink to="/create" class="hover:underline">
                            Create Post
                        </RouterLink>
                        <button
                            @click="handleLogout"
                            class="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-200 transition"
                        >
                            Logout
                        </button>
                    </template>
                    <template v-else>
                        <RouterLink
                            to="/"
                            class="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-200 transition"
                        >
                            Sign In
                        </RouterLink>
                    </template>
                </div>

                <!-- Mobile Menu Toggle -->
                <div class="md:hidden">
                    <button
                        @click="menuOpen = !menuOpen"
                        class="text-white focus:outline-none"
                    >
                        <component
                            :is="menuOpen ? XIcon : MenuIcon"
                            class="w-7 h-7"
                        />
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile Menu -->
        <div v-if="menuOpen" class="md:hidden px-4 py-4 space-y-2 bg-blue-500">
            <template v-if="isAuthenticated">
                <RouterLink to="/posts" class="block hover:underline">
                    {{ isAdminAuthenticated ? "Posts" : "My Posts" }}
                </RouterLink>
                <RouterLink to="/create" class="block hover:underline">
                    Create Post
                </RouterLink>
                <button
                    @click="handleLogout"
                    class="bg-white text-blue-600 w-full py-2 rounded hover:bg-gray-200 transition mt-2"
                >
                    Logout
                </button>
            </template>
            <template v-else>
                <RouterLink
                    to="/"
                    class="block bg-white text-blue-600 py-2 px-4 rounded hover:bg-gray-200 transition"
                >
                    Sign In
                </RouterLink>
            </template>
        </div>
    </nav>

    <main class="p-4">
        <RouterView />
    </main>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter, RouterLink, RouterView } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { Menu as MenuIcon, X as XIcon } from "lucide-vue-next";

const auth = useAuthStore();
const router = useRouter();

const menuOpen = ref(false);

const isUserAuthenticated = computed(() => auth.isUserAuthenticated);
const isAdminAuthenticated = computed(() => auth.isAdminAuthenticated);
const isAuthenticated = computed(
    () => isUserAuthenticated.value || isAdminAuthenticated.value
);

const dashboardLink = computed(() =>
    isAdminAuthenticated.value ? "/admin-dashboard" : "/user-dashboard"
);

const handleLogout = async () => {
    const type = isAdminAuthenticated.value ? "admin" : "user";
    await auth.logout(type);
    router.push("/");
};
</script>
