<script setup>
import { computed, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { useJobsStore } from "../stores/jobs";
import { usePartsStore } from "../stores/parts";
import { useUserStore } from "../stores/user";

const jobsStore = useJobsStore();
const partsStore = usePartsStore();
const user = useUserStore();
const lowStock = computed(() => partsStore.lowStock);
onMounted(() => {
    if (!partsStore.parts.length) partsStore.fetchParts();
});
</script>

<template>
    <div class="hero">
        <div>
            <span class="eyebrow">Oyera Auto Service Bay</span>
            <h1>Good afternoon, {{ user.roleLabel }}</h1>
            <p>Keep every bay, job card and part moving from one clear workspace.</p>
        </div>
        <RouterLink v-if="user.canAccess('intake')" class="btn btn-primary" to="/intake">+ Open Job Card</RouterLink>
    </div>
    <div class="grid grid-4 stats">
        <section class="card stat">
            <span class="stat-label">Open Jobs</span>
            <div class="stat-value">{{ jobsStore.activeJobs.length }}</div>
        </section>
        <section class="card stat">
            <span class="stat-label">Free Bays</span>
            <div class="stat-value">
                {{jobsStore.bays.filter((bay) => bay.status === "Free").length}}
            </div>
        </section>
        <section class="card stat">
            <span class="stat-label">Parts Catalogue</span>
            <div class="stat-value">{{ partsStore.parts.length }}</div>
        </section>
        <section class="card stat">
            <span class="stat-label">Session Revenue</span>
            <div class="stat-value">{{ jobsStore.revenue.toLocaleString() }}</div>
            <small>UGX</small>
        </section>
    </div>
    <div class="grid grid-2 lower">
        <section class="card">
            <div class="card-head">
                <h2>Bay status</h2>
                <RouterLink to="/bays">Open board →</RouterLink>
            </div>
            <div v-for="bay in jobsStore.bays" :key="bay.id" class="dash-row">
                <span><i :class="bay.status.toLowerCase()"></i>{{ bay.name }}</span><strong>{{
                    bay.status === "Busy" ? bay.currentPlate : "Free"
                    }}</strong>
            </div>
        </section>
        <section class="card">
            <div class="card-head">
                <h2>Stock watch</h2>
                <RouterLink to="/parts">Open catalogue →</RouterLink>
            </div>
            <p v-if="!lowStock.length" class="muted">No immediate restock alerts.</p>
            <div v-for="part in lowStock" :key="part.id" class="dash-row">
                <span>{{ part.name }}</span><strong class="warning">{{ part.qtyInStock }} left</strong>
            </div>
        </section>
    </div>
</template>

<style scoped>
.hero {
    align-items: center;
    background: linear-gradient(135deg, #2b2b2b, #4a3327);
    border-radius: 18px;
    color: #fff;
    display: flex;
    justify-content: space-between;
    margin-bottom: 18px;
    overflow: hidden;
    padding: 30px;
    position: relative;
}

.hero::after {
    border: 1px solid rgba(93, 225, 210, 0.15);
    border-radius: 50%;
    content: "";
    height: 220px;
    position: absolute;
    right: -60px;
    top: -90px;
    width: 220px;
}

.hero h1 {
    font-size: clamp(1.7rem, 4vw, 2.45rem);
    margin: 5px 0;
}

.hero p {
    color: #d8d0ca;
    margin: 0;
}

.hero .eyebrow {
    color: #ffb36b;
}

.stats {
    margin-bottom: 18px;
}

.card-head {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
}

h2 {
    font-size: 1rem;
    margin: 0;
}

.card-head a {
    color: #b85612;
    font-size: 0.72rem;
    font-weight: 800;
}

.dash-row {
    align-items: center;
    border-top: 1px solid #edf1f3;
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    font-size: 0.8rem;
}

.dash-row span {
    align-items: center;
    display: flex;
    gap: 8px;
}

i {
    border-radius: 50%;
    height: 8px;
    width: 8px;
}

i.free {
    background: #20a36a;
}

i.busy {
    background: #c0392b;
}

.warning {
    color: #b85612;
}

@media (max-width: 650px) {
    .hero {
        align-items: flex-start;
        flex-direction: column;
        gap: 18px;
    }
}
</style>
