import { computed, ref } from "vue";
import { defineStore } from "pinia";

const USERS_KEY = "oas-users";
const SESSION_KEY = "oas-session";

const defaultUsers = [
  {
    id: 1,
    name: "System Manager",
    email: "manager@oas.local",
    password: "manager123",
    role: "manager",
  },
];

function readUsers() {
  try {
    const saved = localStorage.getItem(USERS_KEY);
    return saved
      ? JSON.parse(saved)
      : defaultUsers.map((user) => ({ ...user }));
  } catch {
    return defaultUsers.map((user) => ({ ...user }));
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function readSession() {
  try {
    const saved = localStorage.getItem(SESSION_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export const useUserStore = defineStore("user", () => {
  const users = ref(readUsers());
  const currentUser = ref(readSession());
  const error = ref("");

  const isAuthenticated = computed(() => Boolean(currentUser.value));
  const role = computed(() => currentUser.value?.role || "");
  const roleLabel = computed(
    () =>
      ({
        admin: "Admin",
        manager: "Manager",
        "senior-technician": "Senior Technician",
        technician: "Technician",
      })[role.value] || "Guest",
  );

  const allowedRoutes = computed(() => {
    if (role.value === "admin")
      return ["dashboard", "intake", "bays", "parts", "reports", "job"];
    if (role.value === "manager")
      return ["dashboard", "intake", "bays", "parts", "reports", "job"];
    if (role.value === "senior-technician")
      return ["dashboard", "intake", "bays", "parts", "job"];
    if (role.value === "technician") return ["dashboard", "bays", "job"];
    return [];
  });

  function canAccess(routeName) {
    return allowedRoutes.value.includes(routeName);
  }

  function persistSession() {
    if (currentUser.value)
      localStorage.setItem(SESSION_KEY, JSON.stringify(currentUser.value));
    else localStorage.removeItem(SESSION_KEY);
  }

  function login(email, password) {
    error.value = "";
    const normalizedEmail = email.trim().toLowerCase();
    const found = users.value.find(
      (user) => user.email === normalizedEmail && user.password === password,
    );
    if (!found) {
      error.value = "Invalid email or password.";
      return false;
    }

    currentUser.value = {
      id: found.id,
      name: found.name,
      email: found.email,
      role: found.role,
    };
    persistSession();
    return true;
  }

  function register({ name, email, password, role: newRole }) {
    error.value = "";
    const normalizedEmail = email.trim().toLowerCase();

    if (!name.trim() || !/^[A-Za-z ]{2,}$/.test(name.trim())) {
      error.value = "Enter a valid name using letters and spaces only.";
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      error.value = "Enter a valid email address.";
      return false;
    }
    if (password.length < 6) {
      error.value = "Password must be at least 6 characters.";
      return false;
    }
    if (!["technician", "senior-technician", "admin"].includes(newRole)) {
      error.value = "Choose a valid account type.";
      return false;
    }
    if (users.value.some((user) => user.email === normalizedEmail)) {
      error.value = "An account with that email already exists.";
      return false;
    }

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: normalizedEmail,
      password,
      role: newRole,
    };

    users.value.push(newUser);
    saveUsers(users.value);
    currentUser.value = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };
    persistSession();
    return true;
  }

  function logout() {
    currentUser.value = null;
    error.value = "";
    persistSession();
  }

  return {
    users,
    currentUser,
    isAuthenticated,
    role,
    roleLabel,
    allowedRoutes,
    error,
    canAccess,
    login,
    register,
    logout,
  };
});
