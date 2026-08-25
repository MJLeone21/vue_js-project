<script setup>
defineProps({
  technicians: { type: Array, required: true },
  modelValue: { type: Array, required: true },
});
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <fieldset class="picker-card">
    <legend>Technicians <span>one or more</span></legend>
    <label v-for="technician in technicians" :key="technician.id" class="choice-row">
      <input :checked="modelValue.includes(technician.name)" type="checkbox" @change="
        emit(
          'update:modelValue',
          $event.target.checked
            ? [...modelValue, technician.name]
            : modelValue.filter((item) => item !== technician.name),
        )
        " />
      <span>{{ technician.name }}</span>
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
  padding: 8px 6px;
}

.choice-row:hover {
  background: #f4f8fa;
}

.choice-row input {
  accent-color: #d86f1f;
}
</style>
