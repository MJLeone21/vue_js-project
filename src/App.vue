<script setup>
import { onMounted, reactive, ref } from 'vue'
import JobCardForm from './components/JobCardForm.vue'
import PartCard from './components/PartCard.vue'
import ConfirmationCard from './components/BayCard.vue/index.js'

const jobCard = reactive({ plateNumber: '', ownerName: '', vehicleClass: 'Small', services: [], parts: [], labour: 20000 })
const services = [
  { id: 1, name: 'Oil Change', charge: 0 },
  { id: 2, name: 'Gearbox Oil Change', charge: 0 },
  { id: 3, name: 'Brake Fluid Change', charge: 0 },
  { id: 4, name: 'Brake Pads Replacement', charge: 0 },
  { id: 5, name: 'Greasing', charge: 0 },
  { id: 6, name: 'Wheel Alignment', charge: 30000 },
  { id: 7, name: 'Wheel Balancing', charge: 20000 },
]
const parts = ref([])

onMounted(() => {
  console.log('OAS Bay Intake loaded')
  parts.value = [
    { id: 1, name: 'Engine Oil (20W-50)', unitPrice: 120000, qtyInStock: 10 },
    { id: 2, name: 'Oil Filter', unitPrice: 18000, qtyInStock: 8 },
    { id: 3, name: 'Brake Fluid', unitPrice: 15000, qtyInStock: 5 },
    { id: 4, name: 'Brake Pads (Front)', unitPrice: 45000, qtyInStock: 4 },
  ]
})

function issuePart(id) {
  const part = parts.value.find((item) => item.id === id)
  if (!part || part.qtyInStock <= 0) return
  part.qtyInStock -= 1
  const issued = jobCard.parts.find((item) => item.id === id)
  if (issued) issued.quantity += 1
  else jobCard.parts.push({ id: part.id, name: part.name, unitPrice: part.unitPrice, quantity: 1 })
}

function updateJobCard(updatedJobCard) {
  Object.assign(jobCard, updatedJobCard)
}

function servicesTotal() {
  return jobCard.services.reduce((total, name) => total + (services.find((item) => item.name === name)?.charge || 0), 0)
}
function partsTotal() {
  return jobCard.parts.reduce((total, part) => total + part.unitPrice * part.quantity, 0)
}
function grandTotal() { return jobCard.labour + servicesTotal() + partsTotal() }
</script>

<template>
  <main class="intake-page">
    <header class="page-header">
      <p class="eyebrow">Oyera Auto Service Bay Ltd</p>
      <h1>Job Card Intake</h1>
      <p>Register a vehicle, choose its services, and issue available parts.</p>
    </header>
    <section class="content-grid">
      <JobCardForm :job-card="jobCard" :services="services" @update-job-card="updateJobCard" />
      <aside class="parts-section">
        <h2>Parts Catalogue</h2>
        <p class="section-intro">Issue parts to the current job card.</p>
        <div class="parts-grid">
          <PartCard v-for="part in parts" :key="part.id" :id="part.id" :name="part.name" :unit-price="part.unitPrice" :qty-in-stock="part.qtyInStock" @issue-part="issuePart" />
        </div>
      </aside>
    </section>
    <ConfirmationCard :job-card="jobCard" :services-total="servicesTotal()" :parts-total="partsTotal()" :grand-total="grandTotal()" />
  </main>
</template>

<style scoped>
.intake-page { max-width: 1120px; margin: 0 auto; padding: 2rem 1rem 3rem; }
.page-header { margin-bottom: 2rem; }
.eyebrow { color: #b45309; font-weight: 700; letter-spacing: .08em; margin: 0; text-transform: uppercase; }
h1 { color: #1f2937; font-size: clamp(2rem, 5vw, 3rem); margin: .35rem 0; }
h2 { color: #1f2937; margin-top: 0; }
.page-header > p:last-child, .section-intro { color: #4b5563; }
.content-grid { display: grid; gap: 1.5rem; grid-template-columns: minmax(0, 1.4fr) minmax(280px, .9fr); }
.parts-section { background: #fff; border: 1px solid #e5e7eb; border-radius: 14px; padding: 1.25rem; }
.parts-grid { display: grid; gap: .8rem; }
@media (max-width: 760px) { .content-grid { grid-template-columns: 1fr; } }
</style>
