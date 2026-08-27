<script setup>
import { reactive, ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { useUserStore } from "../stores/user";

const router = useRouter();
const route = useRoute();
const user = useUserStore();
const form = reactive({ email: "", password: "" });
const message = ref("");

function submit() {
    message.value = "";
    if (!user.login(form.email, form.password)) {
        message.value = user.error;
        return;
    }

    const destination =
        typeof route.query.redirect === "string"
            ? route.query.redirect
            : "/dashboard";
    router.push(destination);
}
</script>

<template>
    <div class="auth-page">
        <section class="auth-brand">
            <div class="auth-mark">OA</div>
            <span class="eyebrow">Oyera Auto Service Bay</span>
            <h1>Run every bay from one workspace.</h1>
            <p>
                Manage job cards, technicians, parts stock and service bays without
                leaving the browser.
            </p>
            <div class="auth-points">
                <span>✓ Role-based access</span>
                <span>✓ Live bay status</span>
                <span>✓ Browser-based stock control</span>
            </div>
        </section>

        <section class="auth-card">
            <div class="auth-heading">
                <span class="eyebrow">Welcome back</span>
                <h2>Sign in</h2>
                <p>Use your OAS technician account to continue.</p>
            </div>
            <div v-if="message" class="alert alert-danger">{{ message }}</div>
            <form @submit.prevent="submit">
                <label>Email address<input v-model.trim="form.email" type="email" autocomplete="username"
                        placeholder="you@example.com" required /></label>
                <label>Password<input v-model="form.password" type="password" autocomplete="current-password"
                        placeholder="Enter password" required /></label>
                <button class="btn btn-primary auth-submit" type="submit">
                    Log in
                </button>
            </form>
            <p class="auth-foot">
                New technician?
                <RouterLink to="/register">Create an account</RouterLink>
            </p>
            <div class="demo-login">
                <strong>Demo manager</strong><span>manager@oas.local</span><span>manager123</span>
            </div>
        </section>
    </div>
</template>

<style scoped>
.auth-page {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    min-height: 100vh;
    background: #f4f1ed;
}

.auth-brand {
    background: linear-gradient(145deg, #2b2b2b 0%, #3a3a3a 70%, #8f4d1e 100%);
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 8%;
}

.auth-mark {
    align-items: center;
    background: #d86f1f;
    border-radius: 15px;
    display: flex;
    font-weight: 900;
    height: 58px;
    justify-content: center;
    margin-bottom: 30px;
    width: 58px;
}

.auth-brand .eyebrow {
    color: #ffb36b;
}

.auth-brand h1 {
    font-size: clamp(2.1rem, 5vw, 4rem);
    line-height: 1.02;
    margin: 8px 0 15px;
    max-width: 620px;
}

.auth-brand p {
    color: #d9d9d9;
    line-height: 1.7;
    max-width: 560px;
}

.auth-points {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 28px;
}

.auth-points span {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 30px;
    color: #dce9ef;
    font-size: 0.75rem;
    padding: 8px 12px;
}

.auth-card {
    align-self: center;
    background: #fff;
    border: 1px solid #d8d2cc;
    border-radius: 18px;
    box-shadow: 0 15px 45px rgba(16, 42, 67, 0.1);
    margin: 30px auto;
    max-width: 460px;
    padding: 30px;
    width: calc(100% - 40px);
}

.auth-heading {
    margin-bottom: 20px;
}

.auth-heading h2 {
    font-size: 2rem;
    margin: 5px 0;
}

.auth-heading p,
.auth-foot {
    color: #746c66;
    font-size: 0.8rem;
}

.auth-card form {
    display: grid;
    gap: 15px;
}

.auth-card label {
    color: #31465b;
    display: grid;
    font-size: 0.8rem;
    font-weight: 700;
    gap: 6px;
}

.auth-card input {
    background: #fff;
    border: 1px solid #cfc7c0;
    border-radius: 9px;
    padding: 11px;
    width: 100%;
}

.auth-submit {
    margin-top: 5px;
    width: 100%;
}

.auth-foot {
    margin: 18px 0 0;
    text-align: center;
}

.auth-foot a {
    color: #b85612;
    font-weight: 800;
}

.demo-login {
    background: #f4f8fa;
    border-radius: 10px;
    display: grid;
    gap: 3px;
    margin-top: 18px;
    padding: 12px;
}

.demo-login span {
    color: #6e655f;
    font-family: monospace;
    font-size: 0.75rem;
}

@media (max-width: 800px) {
    .auth-page {
        grid-template-columns: 1fr;
    }

    .auth-brand {
        min-height: 340px;
        padding: 45px 8%;
    }

    .auth-brand h1 {
        font-size: 2.5rem;
    }
}
</style>
