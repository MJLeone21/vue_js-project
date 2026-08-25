<script setup>
import { computed, reactive } from "vue";
import ServicePicker from "./ServicePicker.vue";
import TechnicianPicker from "./TechnicianPicker.vue";

const props = defineProps({
  jobCard: { type: Object, required: true },
  services: { type: Array, required: true },
  technicians: { type: Array, required: true },
  availableBays: { type: Array, required: true },
  saving: { type: Boolean, default: false },
});

const emit = defineEmits(["submit-job"]);
const touched = reactive({
  plateNumber: false,
  ownerName: false,
  ownerContact: false,
  engineOilPrice: false,
  brakeFluidPrice: false,
  oilFilterPrice: false,
  services: false,
  technicians: false,
  bay: false,
});

const form = reactive({
  plateNumber: props.jobCard.plateNumber,
  ownerName: props.jobCard.ownerName,
  ownerContact: props.jobCard.ownerContact,
  vehicleClass: props.jobCard.vehicleClass,
  services: [...props.jobCard.services],
  technicians: [...props.jobCard.technicians],
  bay: props.jobCard.bay,
  engineOilPrice: props.jobCard.engineOilPrice,
  brakeFluidPrice: props.jobCard.brakeFluidPrice,
  oilFilterPrice: props.jobCard.oilFilterPrice,
});

const rules = {
  plateNumber: (value) => /^[A-Z]{3}\s\d{3}[A-Z]$/.test(value),
  ownerName: (value) => /^[A-Za-z ]{2,}$/.test(value.trim()),
  ownerContact: (value) => /^\d{10}$/.test(value),
  engineOilPrice: (value) => Number(value) >= 79000 && Number(value) <= 200000,
  brakeFluidPrice: (value) => Number(value) >= 13000 && Number(value) <= 20000,
  oilFilterPrice: (value) => Number(value) >= 15000 && Number(value) <= 20000,
};

const errors = computed(() => ({
  plateNumber: !rules.plateNumber(form.plateNumber),
  ownerName: !rules.ownerName(form.ownerName),
  ownerContact: !rules.ownerContact(form.ownerContact),
  engineOilPrice: !rules.engineOilPrice(form.engineOilPrice),
  brakeFluidPrice: !rules.brakeFluidPrice(form.brakeFluidPrice),
  oilFilterPrice: !rules.oilFilterPrice(form.oilFilterPrice),
  services: form.services.length === 0,
  technicians: form.technicians.length === 0,
  bay: !form.bay,
}));

const errorCount = computed(
  () => Object.values(errors.value).filter(Boolean).length,
);
const isFormValid = computed(() => errorCount.value === 0);

function touch(field) {
  touched[field] = true;
}
function showError(field) {
  return touched[field] && errors.value[field];
}

function submitForm() {
  Object.keys(touched).forEach((field) => {
    touched[field] = true;
  });
  if (!isFormValid.value) return;
  emit("submit-job", {
    ...form,
    services: [...form.services],
    technicians: [...form.technicians],
  });
}
</script>

<template>
  <form class="form-card" @submit.prevent="submitForm">
    <div class="section-heading">
      <div>
        <span class="step">01</span>
        <div>
          <h2>Job Card Details</h2>
          <p>Capture the vehicle and customer information.</p>
        </div>
      </div>
      <span class="required-note">* Required</span>
    </div>

    <div class="form-grid">
      <label>Plate number *<input v-model.trim="form.plateNumber" placeholder="UBK 123A"
          @blur="touch('plateNumber')" /><small v-if="showError('plateNumber')">Use format ABC 123D.</small></label>
      <label>Owner name *<input v-model.trim="form.ownerName" placeholder="John Doe" @blur="touch('ownerName')" /><small
          v-if="showError('ownerName')">Letters and spaces only, at least 2 characters.</small></label>
      <label>Owner contact *<input v-model="form.ownerContact" inputmode="numeric" maxlength="10"
          placeholder="0712345678" @blur="touch('ownerContact')" /><small v-if="showError('ownerContact')">Enter exactly
          10 digits.</small></label>
      <label>Vehicle class *<select v-model="form.vehicleClass">
          <option>Small</option>
          <option>Heavy</option>
          <option>Commercial</option>
        </select></label>
      <label>Bay assignment *<select v-model="form.bay" @blur="touch('bay')">
          <option value="" disabled>Select a free bay</option>
          <option v-for="bay in availableBays" :key="bay.id" :value="bay.name">
            {{ bay.name }} — Free
          </option>
        </select><small v-if="showError('bay')">Choose a free bay.</small></label>
      <label>Labour charge<input value="UGX 20,000" readonly /></label>
    </div>

    <div class="subsection">
      <ServicePicker v-model="form.services" :services="services" @update:model-value="
        form.services = $event;
      touched.services = true;
      " /><small v-if="showError('services')" class="form-error">Select at least one service.</small>
    </div>
    <div class="subsection">
      <TechnicianPicker v-model="form.technicians" :technicians="technicians" @update:model-value="
        form.technicians = $event;
      touched.technicians = true;
      " /><small v-if="showError('technicians')" class="form-error">Select at least one technician.</small>
    </div>

    <div class="price-box">
      <div>
        <strong>Part price checks</strong><span>Values must remain within the assignment ranges.</span>
      </div>
      <label>Engine oil<input v-model.number="form.engineOilPrice" type="number" min="79000" max="200000"
          @blur="touch('engineOilPrice')" /><small v-if="showError('engineOilPrice')">79,000–200,000</small></label>
      <label>Brake fluid<input v-model.number="form.brakeFluidPrice" type="number" min="13000" max="20000"
          @blur="touch('brakeFluidPrice')" /><small v-if="showError('brakeFluidPrice')">13,000–20,000</small></label>
      <label>Oil filter<input v-model.number="form.oilFilterPrice" type="number" min="15000" max="20000"
          @blur="touch('oilFilterPrice')" /><small v-if="showError('oilFilterPrice')">15,000–20,000</small></label>
    </div>

    <div class="submit-row">
      <div>
        <strong>{{ errorCount }} errors remaining</strong><span>Complete every required field to open the job.</span>
      </div>
      <button class="btn btn-primary" :disabled="!isFormValid || saving" type="submit">
        {{ saving ? "Saving…" : "Open Job Card" }}
      </button>
    </div>
  </form>
</template>

<style scoped>
.form-card {
  background: #fff;
  border: 1px solid #d8d2cc;
  border-radius: 16px;
  box-shadow: 0 7px 24px rgba(16, 42, 67, 0.06);
  padding: 22px;
}

.section-heading {
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  margin-bottom: 22px;
}

.section-heading>div {
  align-items: center;
  display: flex;
  gap: 12px;
}

.step {
  align-items: center;
  background: #fff1e6;
  border-radius: 10px;
  color: #b85612;
  display: flex;
  font-size: 0.75rem;
  font-weight: 800;
  height: 36px;
  justify-content: center;
  width: 36px;
}

h2 {
  font-size: 1.2rem;
  margin: 0;
}

.section-heading p {
  color: #8191a0;
  font-size: 0.82rem;
  margin: 2px 0 0;
}

.required-note {
  color: #81766e;
  font-size: 0.75rem;
}

.form-grid {
  display: grid;
  gap: 15px;
  grid-template-columns: repeat(2, 1fr);
}

label {
  color: #31465b;
  display: grid;
  font-size: 0.82rem;
  font-weight: 700;
  gap: 6px;
}

input,
select {
  background: #fff;
  border: 1px solid #cfc7c0;
  border-radius: 8px;
  color: #172b4d;
  padding: 10px 11px;
  width: 100%;
}

input:focus,
select:focus {
  border-color: #d86f1f;
  box-shadow: 0 0 0 3px rgba(22, 179, 163, 0.1);
  outline: 0;
}

input[readonly] {
  background: #f2f6f8;
  color: #526779;
}

small {
  color: #c0392b;
  font-size: 0.7rem;
  font-weight: 500;
}

.subsection {
  margin-top: 18px;
}

.form-error {
  display: block;
  margin: 5px 2px 0;
}

.price-box {
  background: #f6fafb;
  border: 1px solid #e2eaee;
  border-radius: 12px;
  display: grid;
  gap: 12px;
  grid-template-columns: 1.3fr repeat(3, 1fr);
  margin-top: 18px;
  padding: 14px;
}

.price-box>div {
  display: grid;
  gap: 3px;
}

.price-box>div span {
  color: #8191a0;
  font-size: 0.7rem;
}

.submit-row {
  align-items: center;
  border-top: 1px solid #e7edf1;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding-top: 18px;
}

.submit-row div {
  display: grid;
  gap: 2px;
}

.submit-row span {
  color: #8191a0;
  font-size: 0.72rem;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

@media (max-width: 800px) {
  .price-box {
    grid-template-columns: 1fr 1fr;
  }

  .price-box>div {
    grid-column: 1 / -1;
  }
}

@media (max-width: 560px) {

  .form-grid,
  .price-box {
    grid-template-columns: 1fr;
  }

  .submit-row {
    align-items: stretch;
    flex-direction: column;
    gap: 12px;
  }
}
</style>
