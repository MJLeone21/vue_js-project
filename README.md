# OAS Bay Job Card Intake

**Student name:** Add your name here

This Vue 3 and Vite project is a Job Card Intake page for Oyera Auto Service Bay Ltd.

## What it demonstrates

- Vite project scaffolded and running
- Three Single File Components: `JobCardForm`, `PartCard`, and `ConfirmationCard`
- `reactive()` and `ref()` state
- `v-model` on form inputs and checkboxes
- `v-for` with `:key` for services and parts
- `v-if` / `v-else` for parts stock
- Props from the parent to child components
- An emit from `PartCard` to the parent when a part is issued
- `onMounted` lifecycle hook for loading the parts catalogue
- Scoped CSS in every component
- Fixed read-only labour charge of UGX 20,000
- A live running total using interpolation

## Run the project

```bash
npm install
npm run dev
```

Open the local address shown in the terminal, usually `http://localhost:5173`.
