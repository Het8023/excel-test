import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            redirect: "/home",
        },
        {
            path: "/home",
            name: "home",
            component: HomeView,
        },
        {
            path: "/about",
            name: "about",
            component: () => import("../views/AboutView.vue"),
        },
        {
            path: "/one",
            name: "one",
            component: () => import("../views/one.vue"),
        },
        {
            path: "/two",
            name: "two",
            component: () => import("../views/two.vue"),
        },
        {
            path: "/three",
            name: "three",
            component: () => import("../views/three.vue"),
        },
    ],
});

export default router;
