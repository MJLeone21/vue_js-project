<script setup>
const props = defineProps({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  unitPrice: { type: Number, required: true },
  qtyInStock: { type: Number, required: true },
})
const emit = defineEmits(['issue-part'])
function issue() { emit('issue-part', props.id) }
</script>

<template>
  <article class="part-card">
    <div>
      <h3>{{ name }}</h3>
      <p>UGX {{ unitPrice.toLocaleString() }}</p>
      <p>In stock: <strong>{{ qtyInStock }}</strong></p>
    </div>
    <button v-if="qtyInStock > 0" type="button" @click="issue">Issue to Job</button>
    <p v-else class="out-of-stock">Out of Stock</p>
  </article>
</template>

<style scoped>
.part-card {
  align-items: center;
  background: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: .85rem;
}

h3,
p {
  margin: 0;
}

h3 {
  color: #78350f;
  font-size: 1rem;
}

p {
  color: #57534e;
  font-size: .9rem;
  margin-top: .25rem;
}

button {
  background: #b45309;
  border: 0;
  border-radius: 6px;
  color: #fff;
  cursor: pointer;
  padding: .55rem .75rem;
  white-space: nowrap;
}

button:hover {
  background: #92400e;
}

.out-of-stock {
  color: #b91c1c;
  font-weight: 700;
  white-space: nowrap;
}
</style>
