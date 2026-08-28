<script setup>
defineProps({
  services: { type: Array, required: true },
  modelValue: { type: Array, required: true },
});
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <fieldset class="picker-card">
    <legend>Services <span>select at least one</span></legend>
    <label v-for="service in services" :key="service.id" class="choice-row">
      <input :checked="modelValue.includes(service.name)" type="checkbox" :value="service.name" @change="
        emit(
          'update:modelValue',
          $event.target.checked
            ? [...modelValue, service.name]
            : modelValue.filter((item) => item !== service.name),
        )
        " />
      <span>{{ service.name }}</span>
      <strong v-if="service.charge > 0">UGX {{ service.charge.toLocaleString() }}</strong>
    </label>
  </fieldset>
</template>

<style scoped>
.picker-card {
  border: 1px solid #d8d2cc;
  border-radius: 12px;
  padding: 14px;
}

legend {
  color: #3a3a3a;
  font-weight: 800;
  padding: 0 5px;
}

legend span {
  color: #81766e;
  font-size: 0.72rem;
  font-weight: 500;
  margin-left: 5px;
}

.choice-row {
  align-items: center;
  border-radius: 8px;
  display: flex;
  gap: 10px;
  padding: 9px 6px;
}

.choice-row:hover {
  background: #f4f8fa;
}

.choice-row input {
  accent-color: #d86f1f;
}

.choice-row strong {
  color: #b85612;
  font-size: 0.8rem;
  margin-left: auto;
}
</style>
