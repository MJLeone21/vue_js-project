<script setup>
import { computed, onMounted } from "vue";
import { useJobsStore } from "../stores/jobs";
import { usePartsStore } from "../stores/parts";

const jobsStore = useJobsStore();
const partsStore = usePartsStore();

onMounted(() => {
    if (!partsStore.parts.length) partsStore.fetchParts();
});
const cards = computed(() => [
    {
        label: "Total Revenue",
        value: `UGX ${jobsStore.revenue.toLocaleString()}`,
        note: "All saved job totals",
    },
    {
        label: "Labour Collected",
        value: `UGX ${jobsStore.labourCollected.toLocaleString()}`,
        note: "Fixed 20,000 charge per job",
    },
    {
        label: "Cars Serviced Today",
        value: jobsStore.carsServicedToday,
        note: "Completed jobs closed today",
    },
    {
        label: "Low Stock Items",
        value: partsStore.lowStock.length,
        note: "Items needing restock",
    },
]);
</script>

<template>
    <div class="page-title">
        <span class="eyebrow">OAS Bay / Management</span>
        <h1>Manager dashboard</h1>
        <p>Operational totals are derived from Pinia getters and shared state.</p>
    </div>
    <div class="grid grid-4">
        <section v-for="card in cards" :key="card.label" class="card stat">
            <span class="stat-label">{{ card.label }}</span>
            <div class="stat-value">{{ card.value }}</div>
            <small>{{ card.note }}</small>
        </section>
    </div>
    <div class="grid grid-2 report-grid">
        <section class="card">
            <h2>Active jobs</h2>
            <p v-if="!jobsStore.activeJobs.length" class="muted">
                No active jobs yet.
            </p>
            <div v-for="job in jobsStore.activeJobs" :key="job.id" class="report-row">
                <span><strong>{{ job.plateNumber }}</strong><small>{{ job.bay }} · {{ job.ownerName
                        }}</small></span><strong>UGX {{ job.total.toLocaleString() }}</strong>
            </div>
        </section>
        <section class="card">
            <h2>Low stock</h2>
            <p v-if="!partsStore.lowStock.length" class="muted">
                Stock levels are healthy.
            </p>
            <div v-for="part in partsStore.lowStock" :key="part.id" class="report-row">
                <span>{{ part.name }}</span><strong>{{ part.qtyInStock }}</strong>
            </div>
        </section>
    </div>
</template>

<style scoped>
.stat small {
    color: #81766e;
    font-size: 0.7rem;
}

.report-grid {
    margin-top: 18px;
}

h2 {
    font-size: 1rem;
    margin: 0 0 14px;
}

.report-row {
    align-items: center;
    border-top: 1px solid #edf1f3;
    display: flex;
    justify-content: space-between;
    padding: 11px 0;
}

.report-row span {
    display: grid;
    gap: 2px;
}

.report-row small {
    color: #81766e;
    font-size: 0.68rem;
}
</style>
