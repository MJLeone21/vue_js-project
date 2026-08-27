import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { mockParts } from "../data/oasData";

const USE_MOCK_API = true;
const PARTS_KEY = "oas-parts";

function readSavedParts() {
  try {
    const saved = localStorage.getItem(PARTS_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function persist(parts) {
  localStorage.setItem(PARTS_KEY, JSON.stringify(parts));
}

export const usePartsStore = defineStore("parts", () => {
  const parts = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const lowStock = computed(() =>
    parts.value.filter((part) => part.qtyInStock <= 2),
  );

  async function fetchParts() {
    loading.value = true;
    error.value = null;

    try {
      if (USE_MOCK_API) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const saved = readSavedParts();
        parts.value = saved || mockParts.map((part) => ({ ...part }));
        if (!saved) persist(parts.value);
        return;
      }

      const response = await fetch("/api/parts");
      if (!response.ok) throw new Error(`Server said ${response.status}`);
      parts.value = await response.json();
      persist(parts.value);
    } catch (requestError) {
      error.value = requestError.message || "Could not load parts.";
    } finally {
      loading.value = false;
    }
  }

  async function issuePart(id) {
    const part = parts.value.find((item) => item.id === id);
    if (!part) throw new Error("Part not found.");
    if (part.qtyInStock <= 0) throw new Error("Out of stock");

    await new Promise((resolve) => setTimeout(resolve, 250));
    part.qtyInStock -= 1;
    persist(parts.value);
    return { ...part };
  }

  function restockPart(id, quantity) {
    const amount = Number(quantity);
    const part = parts.value.find((item) => item.id === id);
    if (!part) throw new Error("Part not found.");
    if (!Number.isInteger(amount) || amount <= 0)
      throw new Error("Enter a whole number greater than zero.");

    part.qtyInStock += amount;
    persist(parts.value);
    return { ...part };
  }

  function addPart({ name, unitPrice, quantity }) {
    const cleanName = name.trim();
    const price = Number(unitPrice);
    const amount = Number(quantity);

    if (!cleanName) throw new Error("Enter a part name.");
    if (!Number.isFinite(price) || price <= 0)
      throw new Error("Enter a valid unit price.");
    if (!Number.isInteger(amount) || amount <= 0)
      throw new Error("Enter a whole number greater than zero.");

    const existing = parts.value.find(
      (part) => part.name.toLowerCase() === cleanName.toLowerCase(),
    );
    if (existing) {
      existing.qtyInStock += amount;
      if (price !== existing.unitPrice) existing.unitPrice = price;
      persist(parts.value);
      return { ...existing, created: false };
    }

    const newPart = {
      id: Date.now(),
      name: cleanName,
      unitPrice: price,
      qtyInStock: amount,
    };
    parts.value.push(newPart);
    persist(parts.value);
    return { ...newPart, created: true };
  }

  return {
    parts,
    loading,
    error,
    lowStock,
    fetchParts,
    issuePart,
    restockPart,
    addPart,
  };
});
