<script setup>
import { reactive, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useUserStore } from "../stores/user";

const router = useRouter();
const user = useUserStore();
const form = reactive({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "technician",
});
const message = ref("");

function submit() {
    message.value = "";
    if (form.password !== form.confirmPassword) {
        message.value = "Passwords do not match.";
        return;
    }

    const registered = user.register({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
    });
    if (!registered) {
        message.value = user.error;
        return;
    }

    router.push({ name: "dashboard" });
}
</script>

<template>
    <div class="auth-page register-page">
        <section class="auth-brand">
            <div class="auth-mark">OA</div>
            <span class="eyebrow">Staff registration</span>
            <h1>Create a staff account.</h1>
            <p>
                Choose the account type you need. Admin accounts have access to all
                parts of the system.
            </p>
            <RouterLink class="back-link" to="/login">← Back to sign in</RouterLink>
        </section>

        <section class="auth-card">
            <div class="auth-heading">
                <span class="eyebrow">New staff</span>
                <h2>Register</h2>
                <p>Complete the details below to create your account.</p>
            </div>
            <div v-if="message" class="alert alert-danger">{{ message }}</div>
            <form @submit.prevent="submit">
                <label>Full name<input v-model.trim="form.name" placeholder="John Doe" required /></label>
                <label>Email address<input v-model.trim="form.email" type="email" placeholder="john@example.com"
                        required /></label>
                <label>Account type<select v-model="form.role">
                        <option value="technician">Technician</option>
                        <option value="senior-technician">Senior Technician</option>
                        <option value="admin">Admin</option>
                    </select></label>
                <label>Password<input v-model="form.password" type="password" minlength="6"
                        placeholder="At least 6 characters" required /></label>
                <label>Confirm password<input v-model="form.confirmPassword" type="password" minlength="6"
                        placeholder="Repeat password" required /></label>
                <button class="btn btn-primary auth-submit" type="submit">
                    Create account
                </button>
            </form>
            <p class="auth-foot">
                Already registered? <RouterLink to="/login">Log in</RouterLink>
            </p>
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

.back-link {
    color: #ffb36b;
    font-size: 0.8rem;
    font-weight: 800;
    margin-top: 25px;
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
    gap: 13px;
}

.auth-card label {
    color: #31465b;
    display: grid;
    font-size: 0.8rem;
    font-weight: 700;
    gap: 6px;
}

.auth-card input,
.auth-card select {
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

@media (max-width: 800px) {
    .auth-page {
        grid-template-columns: 1fr;
    }

    .auth-brand {
        min-height: 300px;
        padding: 45px 8%;
    }

    .auth-brand h1 {
        font-size: 2.5rem;
    }
}
</style>
