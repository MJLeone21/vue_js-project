<script setup>
import { reactive } from 'vue'

const props = defineProps({
  jobCard: { type: Object, required: true },
  services: { type: Array, required: true },
})

const emit = defineEmits(['update-job-card'])

const form = reactive({
  plateNumber: props.jobCard.plateNumber,
  ownerName: props.jobCard.ownerName,
  vehicleClass: props.jobCard.vehicleClass,
  services: [...props.jobCard.services],
})

function updateParent() {
  emit('update-job-card', { ...form, services: [...form.services] })
}
</script>

<template>
  <section class="form-card">
    <h2>Vehicle Details</h2>
    <form @submit.prevent>
      <div class="form-grid">
        <label>Plate Number<input v-model.trim="form.plateNumber" type="text" placeholder="UBK 123A" @input="updateParent" /></label>
        <label>Owner Name<input v-model.trim="form.ownerName" type="text" placeholder="Owner's full name" @input="updateParent" /></label>
        <label>Vehicle Class
          <select v-model="form.vehicleClass" @change="updateParent"><option>Heavy</option><option>Small</option><option>Commercial</option></select>
        </label>
        <label>Labour Charge (UGX)<input :value="jobCard.labour.toLocaleString()" disabled /></label>
      </div>
      <fieldset>
        <legend>Services - select one or more</legend>
        <label v-for="service in services" :key="service.id" class="service-option">
          <input v-model="form.services" type="checkbox" :value="service.name" @change="updateParent" />
          <span>{{ service.name }}</span>
          <small v-if="service.charge > 0">UGX {{ service.charge.toLocaleString() }}</small>
        </label>
      </fieldset>
    </form>
  </section>
</template>

<style scoped>
.form-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 14px; padding: 1.25rem; }
.form-grid { display: grid; gap: 1rem; grid-template-columns: repeat(2, minmax(0, 1fr)); }
label { color: #374151; display: grid; font-weight: 700; gap: .4rem; }
input, select { background: #fff; border: 1px solid #cbd5e1; border-radius: 7px; padding: .65rem .7rem; width: 100%; }
input:disabled { background: #f3f4f6; color: #4b5563; }
fieldset { border: 1px solid #e5e7eb; border-radius: 8px; margin-top: 1.25rem; padding: 1rem; }
legend { color: #374151; font-weight: 700; padding: 0 .35rem; }
.service-option { align-items: center; display: flex; font-weight: 400; gap: .55rem; margin: .65rem 0; }
.service-option input { width: auto; }
.service-option small { color: #b45309; margin-left: auto; }
@media (max-width: 520px) { .form-grid { grid-template-columns: 1fr; } }
</style>
