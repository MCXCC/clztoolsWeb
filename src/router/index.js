import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/app/home/Index.vue";
import Material from "@/views/app/material/Index.vue";
import MaterialManagement from "@/views/app/material/components/Management.vue";
import MaterialSell from "@/views/app/material/components/Sell.vue";
import Login from "@/views/login/Index.vue";
import App from "@/views/app/Index.vue";
import User from "@/views/app/user/Index.vue";
import UserManagement from "@/views/app/user/components/Management.vue";

const routes = [
    {
        path: "/",
        redirect: "/login",
    },
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/app",
        name: "app",
        component: App,
        children: [
            {
                path: "/app/home",
                name: "home",
                component: Home,
            },
            {
                path: "/app/material",
                name: "material",
                component: Material,
                children: [
                    {
                        path: "",
                        redirect: "/app/material/management",
                    },
                    {
                        path: "/app/material/management",
                        name: "material-management",
                        component: MaterialManagement,
                    },
                    {
                        path: "/app/material/sell",
                        name: "material-sell",
                        component: MaterialSell,
                    },
                ],
            },
            {
                path: "/app/user",
                name: "user",
                component: User,
                children: [
                    {
                        path: "/app/user/management",
                        name: "user-management",
                        component: UserManagement,
                    },
                ],
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
