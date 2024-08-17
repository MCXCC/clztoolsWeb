import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: "/",
        redirect: "/login",
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/login/Index.vue"),
    },
    {
        path: "/app",
        name: "app",
        component: () => import("@/views/app/Index.vue"),
        children: [
            {
                path: "home",
                name: "home",
                component: () => import("@/views/app/home/Index.vue"),
            },
            {
                path: "sys",
                children: [
                    {
                        path: "material",
                        name: "material",
                        component: () => import("@/views/app/material/Index.vue"),
                        redirect: { name: "material-management" },
                        children: [
                            {
                                path: "management",
                                name: "material-management",
                                component: () => import("@/views/app/material/components/Management.vue"),
                            },
                            {
                                path: "sell",
                                name: "material-sell",
                                component: () => import("@/views/app/material/components/Sell.vue"),
                            },
                        ],
                    },
                    {
                        path: "user",
                        name: "user",
                        component: () => import("@/views/app/sys/user/Index.vue"),
                        redirect: { name: "user-management" },
                        children: [
                            {
                                path: "management",
                                name: "user-management",
                                component: () => import("@/views/app/sys/user/components/Management.vue"),
                            },
                        ],
                    },
                    {
                        path: "department",
                        name: "department",
                        component: () => import("@/views/app/sys/department/Index.vue"),
                        redirect: { name: "department-management" },
                        children: [
                            {
                                path: "management",
                                name: "department-management",
                                component: () => import("@/views/app/sys/department/components/Management.vue"),
                            }
                        ]
                    }
                ]
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
