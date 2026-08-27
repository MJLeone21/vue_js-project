import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/user";

const routes = [
  { path: "/", redirect: { name: "dashboard" } },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
    meta: { public: true },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterView.vue"),
    meta: { public: true },
  },
  {
    path: "/intake",
    name: "intake",
    component: () => import("../views/IntakeView.vue"),
    meta: { roles: ["admin", "manager", "senior-technician"] },
  },
  {
    path: "/bays",
    name: "bays",
    component: () => import("../views/BaysView.vue"),
    meta: { roles: ["admin", "manager", "senior-technician", "technician"] },
  },
  {
    path: "/parts",
    name: "parts",
    component: () => import("../views/PartsView.vue"),
    meta: { roles: ["admin", "manager", "senior-technician"] },
  },
  {
    path: "/reports",
    name: "reports",
    component: () => import("../views/ReportsView.vue"),
    meta: { roles: ["admin", "manager"] },
  },
  {
    path: "/job/:plate",
    name: "job",
    component: () => import("../views/JobView.vue"),
    meta: { roles: ["admin", "manager", "senior-technician", "technician"] },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/DashboardView.vue"),
    meta: { roles: ["admin", "manager", "senior-technician", "technician"] },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("../views/NotFoundView.vue"),
  },
];

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach((to) => {
  const user = useUserStore();

  if (to.name === "not-found") return true;

  if (to.meta.public) {
    if (user.isAuthenticated) return { name: "dashboard" };
    return true;
  }

  if (!user.isAuthenticated)
    return { name: "login", query: { redirect: to.fullPath } };

  if (to.meta.roles && !to.meta.roles.includes(user.role))
    return { name: "bays" };

  return true;
});

export default router;
