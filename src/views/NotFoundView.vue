<template>
    <section class="card not-found">
        <span class="eyebrow">OAS Bay</span>
        <h1>Page not found</h1>
        <p>The page you requested does not exist.</p>
        <RouterLink class="btn btn-primary" to="/dashboard">Back to Dashboard</RouterLink>
    </section>
</template>
<style scoped>
.not-found {
    margin: 70px auto;
    max-width: 560px;
    padding: 45px;
    text-align: center;
}

.not-found h1 {
    margin: 7px 0;
}

.not-found p {
    color: #7b8d9e;
    margin-bottom: 22px;
}
</style>
