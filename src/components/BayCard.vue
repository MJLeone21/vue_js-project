<script setup>
defineProps({ bay: { type: Object, required: true } });
</script>

<template>
  <article class="bay-card" :class="bay.status.toLowerCase()">
    <div class="bay-top">
      <span class="bay-number">{{ bay.name }}</span><span class="status">{{ bay.status }}</span>
    </div>
    <div class="bay-body">
      <span class="car-icon">▰</span>
      <div>
        <small>Current vehicle</small><strong v-if="bay.status === 'Busy'">{{ bay.currentPlate }}</strong><strong
          v-else>Available</strong>
      </div>
    </div>
  </article>
</template>

<style scoped>
.bay-card {
  border: 1px solid #d8d2cc;
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
}

.bay-card.free {
  border-top: 4px solid #20a36a;
}

.bay-card.busy {
  border-top: 4px solid #c0392b;
}

.bay-top {
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 16px 17px 10px;
}

.bay-number {
  font-size: 1.05rem;
  font-weight: 800;
}

.status {
  border-radius: 20px;
  font-size: 0.67rem;
  font-weight: 800;
  padding: 5px 9px;
  text-transform: uppercase;
}

.free .status {
  background: #e9f8f0;
  color: #198754;
}

.busy .status {
  background: #fff0ef;
  color: #c0392b;
}

.bay-body {
  align-items: center;
  border-top: 1px solid #edf1f3;
  display: flex;
  gap: 13px;
  padding: 18px;
}

.car-icon {
  align-items: center;
  background: #f2f6f8;
  border-radius: 10px;
  color: #587083;
  display: flex;
  height: 42px;
  justify-content: center;
  width: 42px;
}

.bay-body div {
  display: grid;
  gap: 2px;
}

small {
  color: #8a9aaa;
  font-size: 0.68rem;
}

strong {
  font-size: 0.9rem;
}
</style>
