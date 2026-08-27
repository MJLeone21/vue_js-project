<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import PartCard from "../components/PartCard.vue";
import { usePartsStore } from "../stores/parts";

const store = usePartsStore();
const hasLowStock = computed(() => store.lowStock.length > 0);
const showStockForm = ref(false);
const message = ref("");
const messageType = ref("success");
const form = reactive({
    mode: "restock",
    partId: "",
    name: "",
    unitPrice: "",
    quantity: "",
});

onMounted(store.fetchParts);

async function issue(id) {
    try {
        await store.issuePart(id);
    } catch (error) {
        showMessage(error.message, "danger");
    }
}

function openAddStock() {
    form.mode = "restock";
    form.partId = store.parts[0]?.id || "";
    form.name = "";
    form.unitPrice = "";
    form.quantity = "";
    showStockForm.value = true;
}

function closeForm() {
    showStockForm.value = false;
}

function showMessage(text, type = "success") {
    message.value = text;
    messageType.value = type;
    setTimeout(() => {
        message.value = "";
    }, 3500);
}

function submitStock() {
    try {
        if (form.mode === "restock") {
            const updated = store.restockPart(Number(form.partId), form.quantity);
            showMessage(`${updated.name} stock increased to ${updated.qtyInStock}.`);
        } else {
            const added = store.addPart({
                name: form.name,
                unitPrice: form.unitPrice,
                quantity: form.quantity,
            });
            showMessage(
                added.created
                    ? `${added.name} was added to the catalogue.`
                    : `${added.name} already existed, so its stock was increased to ${added.qtyInStock}.`,
            );
        }
        closeForm();
    } catch (error) {
        showMessage(error.message, "danger");
    }
}
</script>

<template>
    <div class="page-title page-title-row">
        <div>
            <span class="eyebrow">OAS Bay / Inventory</span>
            <h1>Parts catalogue</h1>
            <p>
                Monitor stock, issue parts and update inventory directly from the
                browser.
            </p>
        </div>
        <button class="btn btn-primary" type="button" @click="openAddStock">
            + Add / Restock Stock
        </button>
    </div>

    <div v-if="message" :class="[
        'alert',
        messageType === 'danger' ? 'alert-danger' : 'alert-success',
        'notice',
    ]">
        {{ message }}
    </div>
    <div v-if="hasLowStock" class="alert alert-warning restock">
        Restock needed: {{store.lowStock.map((part) => part.name).join(", ")}}
    </div>

    <section v-if="showStockForm" class="card stock-form-card">
        <div class="stock-form-heading">
            <div>
                <span class="eyebrow">Inventory control</span>
                <h2>Add stock</h2>
                <p>Increase an existing part or add a new part to the catalogue.</p>
            </div>
            <button class="close-button" type="button" @click="closeForm">×</button>
        </div>
        <div class="mode-switch">
            <button :class="{ selected: form.mode === 'restock' }" type="button" @click="form.mode = 'restock'">
                Restock existing part</button><button :class="{ selected: form.mode === 'new' }" type="button"
                @click="form.mode = 'new'">
                Add new part
            </button>
        </div>
        <form class="stock-form" @submit.prevent="submitStock">
            <label v-if="form.mode === 'restock'">Part<select v-model="form.partId" required>
                    <option v-for="part in store.parts" :key="part.id" :value="part.id">
                        {{ part.name }} — {{ part.qtyInStock }} in stock
                    </option>
                </select></label>
            <label v-else>Part name<input v-model.trim="form.name" placeholder="Air Filter" required /></label>
            <label v-if="form.mode === 'new'">Unit price<input v-model.number="form.unitPrice" type="number" min="1"
                    placeholder="25000" required /></label>
            <label>Quantity to add<input v-model.number="form.quantity" type="number" min="1" step="1" placeholder="10"
                    required /></label>
            <div class="stock-actions">
                <button class="btn btn-secondary" type="button" @click="closeForm">
                    Cancel</button><button class="btn btn-primary" type="submit">
                    {{ form.mode === "restock" ? "Update Stock" : "Add Part" }}
                </button>
            </div>
        </form>
    </section>

    <div v-if="store.loading" class="card state">Loading parts catalogue…</div>
    <div v-else-if="store.error" class="alert alert-danger state">
        Could not reach the parts service. {{ store.error }}
        <button class="btn btn-secondary" @click="store.fetchParts">Retry</button>
    </div>
    <div v-else class="parts-grid">
        <PartCard v-for="part in store.parts" :key="part.id" :id="part.id" :name="part.name"
            :unit-price="part.unitPrice" :qty-in-stock="part.qtyInStock" @issue="issue" />
    </div>
</template>

<style scoped>
.page-title-row {
    align-items: end;
    display: flex;
    gap: 20px;
    justify-content: space-between;
}

.restock,
.notice {
    margin-bottom: 18px;
}

.state {
    text-align: center;
}

.state .btn {
    margin-left: 8px;
}

.parts-grid {
    display: grid;
    gap: 12px;
}

.stock-form-card {
    margin-bottom: 18px;
}

.stock-form-heading {
    align-items: flex-start;
    display: flex;
    justify-content: space-between;
}

.stock-form-heading h2 {
    margin: 4px 0;
}

.stock-form-heading p {
    color: #788a9b;
    font-size: 0.78rem;
    margin: 0;
}

.close-button {
    background: #ece8e4;
    border: 0;
    border-radius: 50%;
    color: #526779;
    font-size: 1.2rem;
    height: 32px;
    width: 32px;
}

.mode-switch {
    display: flex;
    gap: 8px;
    margin: 18px 0;
}

.mode-switch button {
    background: #f1f5f7;
    border: 1px solid #d8d2cc;
    border-radius: 8px;
    color: #536879;
    padding: 9px 12px;
}

.mode-switch button.selected {
    background: #fff1e6;
    border-color: #e4ad83;
    color: #b85612;
    font-weight: 800;
}

.stock-form {
    align-items: end;
    display: grid;
    gap: 14px;
    grid-template-columns: 1.4fr 1fr 1fr;
}

.stock-form label {
    color: #31465b;
    display: grid;
    font-size: 0.78rem;
    font-weight: 700;
    gap: 6px;
}

.stock-form input,
.stock-form select {
    border: 1px solid #cfc7c0;
    border-radius: 8px;
    padding: 10px;
}

.stock-actions {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
}

@media (max-width: 760px) {
    .page-title-row {
        align-items: flex-start;
        flex-direction: column;
    }

    .stock-form {
        grid-template-columns: 1fr;
    }

    .stock-actions {
        justify-content: stretch;
    }
}
</style>
