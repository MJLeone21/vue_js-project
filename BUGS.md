# Major bugs fixed

## 1. Missing runtime dependencies

**Problem:** The application imports Pinia and Vue Router, but neither package was listed in `package.json`. A fresh install therefore failed to start or build the project.

**Fix applied:** Added `pinia` and `vue-router` to the production dependencies. Run `npm install` after extracting the project to refresh the lockfile and install the required packages.

## 2. Stock could be lost or become negative

**Problem:** Rapidly pressing **Issue to Job** could start more than one request while only one part remained. Both requests passed the stock check, which could issue stock below zero. A browser-storage failure could also reduce the displayed quantity without saving it.

**Fix applied:** The stock availability check now runs immediately before the shared quantity is changed, after the simulated request completes. If persistence fails, the quantity is restored and an error is shown.

## 3. Job cards could leave bay and reporting data inconsistent

**Problem:** A job save could mark a bay busy even when the bay had already been selected by another job, and a failed storage write could leave the in-memory bay/job state changed. The report counted every job card instead of only cars completed today, while locale-dependent timestamps made date comparison unreliable.

**Fix applied:** Opening a job now validates the plate, open-job uniqueness and bay availability before and after saving; it persists a complete next-state snapshot before updating the UI. Job timestamps use ISO format, and the report counts only jobs closed on the current day.
