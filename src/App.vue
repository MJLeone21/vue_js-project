<script setup>
import { computed } from "vue";
import { RouterLink, RouterView, useRoute, useRouter } from "vue-router";
import { useUserStore } from "./stores/user";

const user = useUserStore();
const route = useRoute();
const router = useRouter();

const links = [
  { name: "dashboard", label: "Dashboard" },
  { name: "intake", label: "Job Intake" },
  { name: "bays", label: "Bay Board" },
  { name: "parts", label: "Parts" },
  { name: "reports", label: "Reports" },
];

const visibleLinks = computed(() =>
  links.filter((link) => user.canAccess(link.name)),
);
const isAuthPage = computed(
  () => route.name === "login" || route.name === "register",
);

function logout() {
  user.logout();
  router.push({ name: "login" });
}
</script>

<template>
  <RouterView v-if="isAuthPage || !user.isAuthenticated" />

  <div v-else class="app-shell">
    <header class="topbar">
      <RouterLink class="brand" to="/dashboard">
        <span class="brand-mark">OA</span>
        <span><strong>Oyera Auto</strong><small>Service Bay</small></span>
      </RouterLink>

      <nav class="main-nav">
        <RouterLink v-for="link in visibleLinks" :key="link.name" :to="{ name: link.name }">{{ link.label }}
        </RouterLink>
      </nav>

      <div class="account-menu">
        <div class="account-copy">
          <strong>{{ user.currentUser?.name }}</strong>
          <span>{{ user.roleLabel }}</span>
        </div>
        <button class="logout-btn" type="button" @click="logout">
          Log out
        </button>
      </div>
    </header>

    <main class="page-wrap">
      <RouterView />
    </main>
  </div>
</template>
