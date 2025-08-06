// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth"; // Pinia store

import Login from "../pages/login.vue";
import Register from "../pages/register.vue";
import Navigation from "../components/navigation.vue";
import UserDashboard from "../pages/dashboard/userDashboard.vue";
import AdminDashboard from "../pages/dashboard/adminDashboard.vue";
import PostPage from "../pages/post/index.vue";
import CreatePostPage from "../pages/post/create.vue";
import UpdatePostPage from "../pages/post/edit.vue";

const routes = [
    { path: "/", name: "Login", component: Login },
    { path: "/register", name: "Register", component: Register },
    {
        path: "/",
        component: Navigation,
        children: [
            {
                path: "/user-dashboard",
                name: "UserDashboard",
                component: UserDashboard,
                meta: { requiresUserAuth: true },
            },
            {
                path: "/admin-dashboard",
                name: "AdminDashboard",
                component: AdminDashboard,
                meta: { requiresAdminAuth: true },
            },
            { path: "/posts", name: "PostPage", component: PostPage },
            {
                path: "/create",
                name: "CreatePostPage",
                component: CreatePostPage,
            },
            {
                path: "/edit/:id",
                name: "UpdatePostPage",
                component: UpdatePostPage,
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Global route guard
router.beforeEach((to, from, next) => {
    const auth = useAuthStore();

    if (to.meta.requiresUserAuth && !auth.isUserAuthenticated) {
        next("/");
    } else if (to.meta.requiresAdminAuth && !auth.isAdminAuthenticated) {
        next("/");
    } else {
        next();
    }
});

export default router;
