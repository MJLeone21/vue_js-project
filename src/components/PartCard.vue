<script setup>
const props = defineProps({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  unitPrice: { type: Number, required: true },
  qtyInStock: { type: Number, required: true },
});
const emit = defineEmits(["issue"]);
</script>

<template>
  <article class="part-card">
    <div class="part-icon">◈</div>
    <div class="part-info">
      <h3>{{ name }}</h3>
      <p>UGX {{ unitPrice.toLocaleString() }}</p>
    </div>
    <div class="stock">
      <span>Stock</span><strong>{{ qtyInStock }}</strong>
    </div>
    <button v-if="qtyInStock > 0" class="btn btn-primary" type="button" @click="emit('issue', props.id)">
      Issue to Job
    </button>
    <span v-else class="out-badge">Out of Stock</span>
  </article>
</template>

<style scoped>
.part-card {
  align-items: center;
  background: #fff;
  border: 1px solid #d8d2cc;
  border-radius: 13px;
  display: flex;
  gap: 12px;
  padding: 13px;
}

.part-icon {
  align-items: center;
  background: #fff1e6;
  border-radius: 9px;
  color: #b85612;
  display: flex;
  font-size: 1.1rem;
  height: 38px;
  justify-content: center;
  width: 38px;
}

.part-info {
  flex: 1;
}

h3 {
  font-size: 0.9rem;
  margin: 0;
}

p {
  color: #738596;
  font-size: 0.75rem;
  margin: 2px 0 0;
}

.stock {
  display: grid;
  min-width: 45px;
  text-align: center;
}

.stock span {
  color: #8a9aaa;
  font-size: 0.62rem;
  text-transform: uppercase;
}

.stock strong {
  font-size: 0.95rem;
}

.out-badge {
  background: #fff0ef;
  border-radius: 7px;
  color: #c0392b;
  font-size: 0.72rem;
  font-weight: 800;
  padding: 8px;
}

.btn {
  font-size: 0.75rem;
  padding: 8px 10px;
}
</style>
