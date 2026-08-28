<script setup>
import { computed } from "vue";
import { useRoute, RouterLink, useRouter } from "vue-router";
import { useJobsStore } from "../stores/jobs";

const route = useRoute();
const jobsStore = useJobsStore();
const router = useRouter();
const job = computed(() =>
    jobsStore.jobs.find((item) => item.plateNumber === route.params.plate),
);

function completeJob() {
    if (!job.value || job.value.status === "Closed") return;
    if (
        !window.confirm(
            `Close job ${job.value.plateNumber} and free ${job.value.bay}?`,
        )
    )
        return;
    jobsStore.closeJob(job.value.id);
    router.push({ name: "bays" });
}
</script>

<template>
    <div v-if="job">
        <div class="page-title job-title-row">
            <div>
                <span class="eyebrow">OAS Bay / Job Card</span>
                <h1>{{ job.plateNumber }}</h1>
                <p>{{ job.ownerName }} · {{ job.vehicleClass }} · {{ job.bay }}</p>
            </div>
            <button v-if="job.status === 'Open'" class="btn btn-primary" type="button" @click="completeJob">
                ✓ Complete Job & Free Bay
            </button>
        </div>
        <div class="grid grid-2">
            <section class="card detail-card">
                <h2>Vehicle & work</h2>
                <dl>
                    <div>
                        <dt>Owner contact</dt>
                        <dd>{{ job.ownerContact }}</dd>
                    </div>
                    <div>
                        <dt>Technicians</dt>
                        <dd>{{ job.technicians.join(", ") }}</dd>
                    </div>
                    <div>
                        <dt>Services</dt>
                        <dd>
                            {{
                                job.services
                                    .map((service) =>
                                        typeof service === "string" ? service : service.name,
                                    )
                                    .join(", ")
                            }}
                        </dd>
                    </div>
                    <div>
                        <dt>Status</dt>
                        <dd>
                            <span class="status">{{ job.status }}</span>
                        </dd>
                    </div>
                </dl>
            </section>
            <section class="card detail-card">
                <h2>Charges</h2>
                <div class="charge">
                    <span>Labour</span><strong>UGX {{ job.labour.toLocaleString() }}</strong>
                </div>
                <div class="charge">
                    <span>Services</span><strong>UGX {{ job.servicesTotal.toLocaleString() }}</strong>
                </div>
                <div class="charge">
                    <span>Parts</span><strong>UGX {{ job.partsTotal.toLocaleString() }}</strong>
                </div>
                <div class="grand">
                    <span>Total</span><strong>UGX {{ job.total.toLocaleString() }}</strong>
                </div>
            </section>
        </div>
        <section class="card parts-used">
            <h2>Issued parts</h2>
            <p v-if="!job.parts.length" class="muted">No parts have been issued.</p>
            <div v-for="part in job.parts" :key="part.id" class="used-row">
                <span>{{ part.name }} × {{ part.quantity }}</span><strong>UGX {{ (part.unitPrice *
                    part.quantity).toLocaleString() }}</strong>
            </div>
        </section>
    </div>
    <section v-else class="card missing">
        <span class="eyebrow">Job card</span>
        <h1>Job not found</h1>
        <p>No job card exists for plate {{ route.params.plate }}.</p>
        <RouterLink class="btn btn-primary" to="/bays">Back to Bay Board</RouterLink>
    </section>
</template>

<style scoped>
h2 {
    font-size: 1rem;
    margin: 0 0 15px;
}

dl {
    margin: 0;
}

dl div {
    border-top: 1px solid #edf1f3;
    display: grid;
    gap: 4px;
    padding: 11px 0;
}

dt {
    color: #81766e;
    font-size: 0.7rem;
    text-transform: uppercase;
}

dd {
    margin: 0;
    font-size: 0.85rem;
}

.status {
    background: #e9f8f0;
    border-radius: 20px;
    color: #198754;
    font-size: 0.7rem;
    font-weight: 800;
    padding: 4px 9px;
}

.charge,
.grand,
.used-row {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
}

.grand {
    border-top: 1px solid #d8d2cc;
    font-size: 1.1rem;
    margin-top: 6px;
    padding-top: 15px;
}

.grand strong {
    color: #b85612;
}

.parts-used {
    margin-top: 18px;
}

.used-row {
    border-top: 1px solid #edf1f3;
    font-size: 0.82rem;
}

.job-title-row {
    align-items: end;
    display: flex;
    justify-content: space-between;
    gap: 20px;
}

.job-title-row .btn {
    white-space: nowrap;
}

.missing {
    margin: 30px auto;
    max-width: 600px;
    text-align: center;
}

.missing h1 {
    margin: 6px 0;
}

.missing p {
    color: #788a9b;
    margin-bottom: 20px;
}
</style>
