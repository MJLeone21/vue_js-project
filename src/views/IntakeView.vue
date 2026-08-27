<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import JobCardForm from "../components/JobCardForm.vue";
import PartCard from "../components/PartCard.vue";
import { services, technicians } from "../data/oasData";
import { useJobsStore } from "../stores/jobs";
import { usePartsStore } from "../stores/parts";

const router = useRouter();
const jobsStore = useJobsStore();
const partsStore = usePartsStore();
const notice = ref("");

const jobCard = reactive({
    plateNumber: "",
    ownerName: "",
    ownerContact: "",
    vehicleClass: "Small",
    services: [],
    technicians: [],
    bay: "",
    engineOilPrice: 120000,
    brakeFluidPrice: 15000,
    oilFilterPrice: 18000,
    parts: [],
    labour: 20000,
});
const availableBays = computed(() =>
    jobsStore.bays.filter((bay) => bay.status === "Free"),
);
const servicesTotal = computed(() =>
    jobCard.services.reduce(
        (sum, name) =>
            sum + (services.find((service) => service.name === name)?.charge || 0),
        0,
    ),
);
const partsTotal = computed(() =>
    jobCard.parts.reduce((sum, part) => sum + part.unitPrice * part.quantity, 0),
);
const grandTotal = computed(
    () => 20000 + servicesTotal.value + partsTotal.value,
);

onMounted(() => {
    if (!partsStore.parts.length) partsStore.fetchParts();
});

function syncPartToJob(part) {
    const issued = jobCard.parts.find((item) => item.id === part.id);
    if (issued) issued.quantity += 1;
    else
        jobCard.parts.push({
            id: part.id,
            name: part.name,
            unitPrice: part.unitPrice,
            quantity: 1,
        });
}

async function issuePart(id) {
    try {
        const updatedPart = await partsStore.issuePart(id);
        syncPartToJob(updatedPart);
        notice.value = `${updatedPart.name} issued to ${jobCard.plateNumber || "current job"}.`;
        setTimeout(() => {
            notice.value = "";
        }, 2500);
    } catch (error) {
        notice.value = error.message;
    }
}

async function saveJob(form) {
    try {
        const saved = await jobsStore.openJob({
            ...form,
            parts: jobCard.parts.map((part) => ({ ...part })),
        });
        Object.assign(jobCard, {
            plateNumber: "",
            ownerName: "",
            ownerContact: "",
            vehicleClass: "Small",
            services: [],
            technicians: [],
            bay: "",
            engineOilPrice: 120000,
            brakeFluidPrice: 15000,
            oilFilterPrice: 18000,
            parts: [],
            labour: 20000,
        });
        notice.value = `Job ${saved.plateNumber} opened successfully.`;
        setTimeout(() => {
            notice.value = "";
        }, 3000);
        router.push({ name: "job", params: { plate: saved.plateNumber } });
    } catch (error) {
        notice.value = error.message || "Could not save job.";
    }
}
</script>

<template>
    <div class="page-title">
        <span class="eyebrow">OAS Bay / Intake</span>
        <h1>Open a new job card</h1>
        <p>Register a vehicle, assign a free bay and prepare the work order.</p>
    </div>
    <div v-if="notice" class="alert alert-success notice">{{ notice }}</div>
    <div v-if="jobsStore.error" class="alert alert-danger notice">
        {{ jobsStore.error }}
    </div>

    <div class="intake-layout">
        <JobCardForm :job-card="jobCard" :services="services" :technicians="technicians" :available-bays="availableBays"
            :saving="jobsStore.loading" @submit-job="saveJob" />

        <aside class="side-column">
            <section class="card total-card">
                <div class="total-top">
                    <span>Live job total</span><strong>UGX {{ grandTotal.toLocaleString() }}</strong>
                </div>
                <div class="total-line"><span>Labour</span><span>UGX 20,000</span></div>
                <div class="total-line">
                    <span>Services</span><span>UGX {{ servicesTotal.toLocaleString() }}</span>
                </div>
                <div class="total-line">
                    <span>Parts</span><span>UGX {{ partsTotal.toLocaleString() }}</span>
                </div>
            </section>

            <section class="card parts-panel">
                <div class="side-heading">
                    <div>
                        <h2>Parts catalogue</h2>
                        <p>Issue stock to this job.</p>
                    </div>
                    <RouterLink to="/parts">View all</RouterLink>
                </div>
                <div class="part-list">
                    <PartCard v-for="part in partsStore.parts.slice(0, 4)" :key="part.id" :id="part.id"
                        :name="part.name" :unit-price="part.unitPrice" :qty-in-stock="part.qtyInStock"
                        @issue="issuePart" />
                </div>
                <p v-if="!partsStore.parts.length" class="muted">
                    Parts load from the catalogue page.
                </p>
            </section>
        </aside>
    </div>
</template>

<style scoped>
.intake-layout {
    display: grid;
    gap: 18px;
    grid-template-columns: minmax(0, 1.6fr) minmax(320px, 0.8fr);
}

.side-column {
    display: grid;
    align-content: start;
    gap: 18px;
}

.notice {
    margin-bottom: 16px;
}

.total-card {
    background: linear-gradient(145deg, #2b2b2b, #4a3327);
    color: #fff;
}

.total-top {
    border-bottom: 1px solid rgba(255, 255, 255, 0.14);
    display: flex;
    justify-content: space-between;
    padding-bottom: 15px;
}

.total-top span {
    color: #bdb7b2;
    font-size: 0.78rem;
}

.total-top strong {
    color: #ffb36b;
    font-size: 1.35rem;
}

.total-line {
    color: #d2e0e8;
    display: flex;
    font-size: 0.78rem;
    justify-content: space-between;
    padding-top: 11px;
}

.side-heading {
    align-items: flex-start;
    display: flex;
    justify-content: space-between;
}

.side-heading h2 {
    font-size: 1rem;
    margin: 0;
}

.side-heading p {
    color: #8293a2;
    font-size: 0.72rem;
    margin: 3px 0 0;
}

.side-heading a {
    color: #b85612;
    font-size: 0.72rem;
    font-weight: 800;
}

.part-list {
    display: grid;
    gap: 9px;
    margin-top: 15px;
}

.part-list :deep(.part-card) {
    padding: 10px;
}

.part-list :deep(.part-icon) {
    display: none;
}

.part-list :deep(.stock) {
    display: none;
}

.part-list :deep(.btn) {
    font-size: 0.67rem;
}

@media (max-width: 900px) {
    .intake-layout {
        grid-template-columns: 1fr;
    }
}
</style>
