<script setup>
defineProps({
  jobCard: { type: Object, required: true },
  servicesTotal: { type: Number, required: true },
  partsTotal: { type: Number, required: true },
  grandTotal: { type: Number, required: true },
})
</script>

<template>
  <section class="confirmation-card">
    <h2>Job Card Summary</h2>
    <div class="summary-grid">
      <p><strong>Plate:</strong> {{ jobCard.plateNumber || 'Not entered' }}</p>
      <p><strong>Owner:</strong> {{ jobCard.ownerName || 'Not entered' }}</p>
      <p><strong>Class:</strong> {{ jobCard.vehicleClass }}</p>
      <p><strong>Services:</strong> {{ jobCard.services.length ? jobCard.services.join(', ') : 'None selected' }}</p>
      <p><strong>Parts:</strong> <span v-if="jobCard.parts.length">{{ jobCard.parts.map((part) => `${part.name} (${part.quantity})`).join(', ') }}</span><span v-else>None selected</span></p>
    </div>
    <div class="totals">
      <p><span>Labour</span><span>UGX {{ jobCard.labour.toLocaleString() }}</span></p>
      <p><span>Services</span><span>UGX {{ servicesTotal.toLocaleString() }}</span></p>
      <p><span>Parts</span><span>UGX {{ partsTotal.toLocaleString() }}</span></p>
      <p class="grand-total"><span>TOTAL</span><span>UGX {{ grandTotal.toLocaleString() }}</span></p>
    </div>
  </section>
</template>

<style scoped>
.confirmation-card { background: #1f2937; border-radius: 14px; color: #fff; margin-top: 1.5rem; padding: 1.5rem; }
h2 { margin-top: 0; }
.summary-grid { display: grid; gap: .35rem 1.5rem; grid-template-columns: repeat(2, minmax(0, 1fr)); }
.summary-grid p { margin: 0; overflow-wrap: anywhere; }
.totals { border-top: 1px solid #4b5563; margin-top: 1rem; max-width: 420px; padding-top: .6rem; }
.totals p { display: flex; justify-content: space-between; margin: .45rem 0; }
.grand-total { border-top: 1px solid #6b7280; font-size: 1.15rem; font-weight: 700; padding-top: .7rem; }
@media (max-width: 600px) { .summary-grid { grid-template-columns: 1fr; } }
</style>
