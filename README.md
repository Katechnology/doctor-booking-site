# Doctor Booking Site

A premium doctor booking website demo for health-check appointments.

## Important note

This project was **automatically created by an AI workflow** using **OpenClaw, Codex, and Stitch**.

As of the initial publish, **the project owner has not manually edited a single line of code**.

## What it includes

- Premium landing page with a clean white-and-blue medical design
- Doctor introduction and trust-focused sections
- Services overview
- Patient booking form
- Booking confirmation flow
- Backend booking API for demo use
- Simple JSON-backed persistence layer for local development/demo

## Tech stack

- Next.js
- React
- TypeScript
- Tailwind CSS

## Local development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Notes about data and privacy

This repository is configured **not to commit runtime booking data**.

The local file used for demo persistence is excluded from Git tracking:

- `src/data/bookings.json`

If the file does not exist, the app creates it automatically during local use.

## Project status

This is currently a **demo / workflow test project** used to validate a build flow where:

1. product direction is orchestrated in OpenClaw,
2. design direction is explored with Stitch,
3. implementation is completed by Codex workers.

It is not yet a production-ready medical system.
