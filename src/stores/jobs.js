import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { initialBays, services as serviceCatalogue } from "../data/oasData";

const USE_MOCK_API = true;
const JOBS_KEY = "oas-jobs";
const BAYS_KEY = "oas-bays";

function readSaved(key) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function persist(jobs, bays) {
  localStorage.setItem(JOBS_KEY, JSON.stringify(jobs));
  localStorage.setItem(BAYS_KEY, JSON.stringify(bays));
}

export const useJobsStore = defineStore("jobs", () => {
  const jobs = ref(readSaved(JOBS_KEY) || []);
  const bays = ref(
    readSaved(BAYS_KEY) || initialBays.map((bay) => ({ ...bay })),
  );
  const loading = ref(false);
  const error = ref(null);

  const revenue = computed(() =>
    jobs.value.reduce((sum, job) => sum + job.total, 0),
  );
  const labourCollected = computed(() =>
    jobs.value.reduce((sum, job) => sum + job.labour, 0),
  );
  const activeJobs = computed(() =>
    jobs.value.filter((job) => job.status === "Open"),
  );
  const carsServicedToday = computed(() => {
    const today = new Date().toISOString().slice(0, 10);
    return jobs.value.filter(
      (job) => job.status === "Closed" && job.closedAt?.slice(0, 10) === today,
    ).length;
  });

  function servicesTotal(job) {
    return job.services.reduce((sum, service) => {
      const selected =
        typeof service === "string"
          ? serviceCatalogue.find((item) => item.name === service)
          : service;
      return sum + (selected?.charge || 0);
    }, 0);
  }

  function partsTotal(job) {
    return job.parts.reduce(
      (sum, part) => sum + part.unitPrice * part.quantity,
      0,
    );
  }

  async function openJob(jobCard) {
    if (loading.value) throw new Error("A job is already being saved.");
    loading.value = true;
    error.value = null;

    try {
      const plateNumber = jobCard.plateNumber.trim().toUpperCase();
      const selectedBay = bays.value.find((item) => item.name === jobCard.bay);
      if (!/^[A-Z]{3}\s\d{3}[A-Z]$/.test(plateNumber))
        throw new Error("Enter a valid plate number (for example, UBK 123A).");
      if (!selectedBay || selectedBay.status !== "Free")
        throw new Error(
          "That bay is no longer free. Please select another bay.",
        );
      if (activeJobs.value.some((job) => job.plateNumber === plateNumber))
        throw new Error("This vehicle already has an open job card.");

      let savedJob;

      if (USE_MOCK_API) {
        await new Promise((resolve) => setTimeout(resolve, 600));
        savedJob = {
          ...jobCard,
          plateNumber,
          services: jobCard.services.map(
            (name) =>
              serviceCatalogue.find((item) => item.name === name) || name,
          ),
          id: Date.now(),
          labour: 20000,
          servicesTotal: servicesTotal(jobCard),
          partsTotal: partsTotal(jobCard),
          total: 20000 + servicesTotal(jobCard) + partsTotal(jobCard),
          status: "Open",
          createdAt: new Date().toISOString(),
          closedAt: "",
        };
      } else {
        const response = await fetch("/api/jobs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...jobCard, labour: 20000 }),
        });
        const data = await response.json();
        if (!response.ok)
          throw new Error(data.message || `Server said ${response.status}`);
        savedJob = data;
      }

      // Re-check shared state after the request and persist the next state
      // before changing the in-memory state, so a failed save cannot occupy a bay.
      const bay = bays.value.find((item) => item.name === savedJob.bay);
      if (!bay || bay.status !== "Free")
        throw new Error("That bay was assigned while this job was saving.");
      if (
        activeJobs.value.some((job) => job.plateNumber === savedJob.plateNumber)
      )
        throw new Error("This vehicle already has an open job card.");

      const nextJobs = [...jobs.value, savedJob];
      const nextBays = bays.value.map((item) =>
        item.name === savedJob.bay
          ? { ...item, status: "Busy", currentPlate: savedJob.plateNumber }
          : { ...item },
      );
      persist(nextJobs, nextBays);
      jobs.value = nextJobs;
      bays.value = nextBays;
      return savedJob;
    } catch (requestError) {
      error.value = requestError.message || "Could not save the job card.";
      throw requestError;
    } finally {
      loading.value = false;
    }
  }

  function closeJob(id) {
    const job = jobs.value.find((item) => item.id === id);
    if (!job || job.status === "Closed") return false;

    job.status = "Closed";
    job.closedAt = new Date().toISOString();
    const bay = bays.value.find((item) => item.name === job.bay);
    if (bay) {
      bay.status = "Free";
      bay.currentPlate = "";
    }
    persist(jobs.value, bays.value);
    return true;
  }

  return {
    jobs,
    bays,
    loading,
    error,
    revenue,
    labourCollected,
    activeJobs,
    carsServicedToday,
    openJob,
    closeJob,
  };
});
