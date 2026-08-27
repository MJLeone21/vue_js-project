<script setup>
import { useJobsStore } from "../stores/jobs";
import BayCard from "../components/BayCard.vue";

const jobsStore = useJobsStore();
</script>

<template>
    <div class="page-title">
        <span class="eyebrow">OAS Bay / Operations</span>
        <h1>Bay board</h1>
        <p>See which vehicles are free, busy and ready for technicians.</p>
    </div>
    <div class="bay-grid">
        <div v-for="bay in jobsStore.bays" :key="bay.id">
            <RouterLink v-if="bay.status === 'Busy'" :to="{ name: 'job', params: { plate: bay.currentPlate } }">
                <BayCard :bay="bay" />
            </RouterLink>
            <BayCard v-else :bay="bay" />
        </div>
    </div>
    <section class="card board-note">
        <strong>How it works</strong><span>Occupied bays link directly to their job card. Free bays become available
            for the next intake.</span>
    </section>
</template>

<style scoped>
.bay-grid {
    display: grid;
    gap: 18px;
    grid-template-columns: repeat(3, 1fr);
}

.board-note {
    align-items: center;
    display: flex;
    gap: 10px;
    margin-top: 18px;
}

.board-note span {
    color: #746c66;
    font-size: 0.8rem;
}

@media (max-width: 760px) {
    .bay-grid {
        grid-template-columns: 1fr;
    }
}
</style>
