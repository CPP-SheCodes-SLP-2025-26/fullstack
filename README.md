# SLP 2025 — Full Stack Team

Welcome to the **sheCodes Student Led Project (SLP) 2025 — Full Stack** track. This repo is our single source of truth for planning, code, docs, and CI as we build a demo‑ready web app for **Demo Day (Nov 16, 2025)**.

> **Lead:** Areesha Imtiaz
> **Org/Repo (suggested):** `cpp-shecodes-slp-2025/slp-2025-fullstack`
> **Timezone:** America/Los\_Angeles (PST/PDT)

---

## Table of Contents

* [Key Dates](#key-dates)
* [Project Vision](#project-vision)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)
* [Project Structure](#project-structure)
* [Environments & Secrets](#environments--secrets)
* [How We Work](#how-we-work)
* [Milestones](#milestones)
* [Weekly Check‑Ins](#weekly-check-ins)
* [Issue Labels](#issue-labels)
* [Code of Conduct](#code-of-conduct)
* [Contributing](#contributing)
* [Security](#security)
* [Demo Day Deliverables](#demo-day-deliverables)
* [Acknowledgements](#acknowledgements)
* [License](#license)

---

## Key Dates

* **Sept 1, 2025** — Grace period ends & **Lead Confirmation form due**
* **Sept 19, 2025** — Teams announced (Kick‑off social)
* **Sept 20, 2025** — Formal email to start SLP
* **Nov 16, 2025 (Sun)** — **Demo Day** (target 10:00–3:00 @ BSC Ursa Minor, TBA)

> See `/docs/schedule.md` for a suggested week‑by‑week rhythm.

---

## Project Vision

Build a modern full‑stack web application that solves a real problem for students or the community, showcasing solid engineering practices (issues‑first workflow, code review, CI, docs). We’ll scope for a clear MVP and iterate toward Demo Day polish.

### Objectives

* MVP shipped by mid‑October
* Accessible, responsive UI
* Clear README + one‑click setup where possible
* Reliable CI and basic tests

---

## Tech Stack

> We’ll finalize in Week 1. Suggested defaults below; adjust as needed.

**Frontend**: React + Vite *(or Next.js)*
**Backend**: Node.js + Express *(or Fastify)*
**Database**: SQLite for local dev → PostgreSQL for prod (Railway/Supabase)
**CI**: GitHub Actions (lint, build, test)
**Package Manager**: npm (or pnpm/yarn)

---

## Getting Started

### Prerequisites

* Node.js 20+ (LTS recommended)
* Git, GitHub account

### Setup

```bash
# 1) Clone the repo
git clone https://github.com/CPP-SheCodes-SLP-2025-26/fullstack.git
cd fullstack

# 2) Environment variables
cp .env.example .env
# then edit .env with local values

# 3) Install deps (update once framework is chosen)
npm install

# 4) Run locally
npm run dev

# 5) Tests & lint (wire these after scaffold)
npm test
npm run lint
```

---

## Project Structure

```
/.github
  ├─ ISSUE_TEMPLATE/
  │   └─ check-in.md
  ├─ pull_request_template.md
  └─ workflows/
      └─ ci.yml
/docs
  ├─ schedule.md
  ├─ team-roster.md
  ├─ discord-setup.md
  └─ demo-day.md
/src
  └─ ... (your app code)
.env.example
CODE_OF_CONDUCT.md
CONTRIBUTING.md
SECURITY.md
LICENSE
README.md
```

---

## Environments & Secrets

* Copy `.env.example` → `.env` for local development (do **not** commit `.env`).
* For production, use platform secrets (e.g., Railway/Supabase/Render dashboards) and GitHub **Actions secrets** for CI.

**Common keys** (adjust to your stack):

```
PORT=3000
DATABASE_URL=postgres://user:pass@host:5432/db
JWT_SECRET=changeme
```

---

## How We Work

* **Issues‑first**: every task has an Issue with acceptance criteria.
* **Small PRs**: focused scope, clear titles, link the Issue.
* **Reviews**: at least one approval; squash & merge when green.
* **CI required**: builds, tests, and linters must pass.
* **Docs**: update README and `/docs` as things change.

> See `CONTRIBUTING.md` for details.

---

## Milestones

* **M1 — Scope & Skeleton (Sep 28)**: choose stack, create scaffolds, CI green
* **M2 — Core Features (Oct 19)**: MVP usable end‑to‑end
* **M3 — Freeze & Bug Bash (Nov 3)**: feature freeze, testing, fixes
* **M4 — Demo Polish (Nov 10)**: UX polish, content, demo script

Track progress in Issues & Milestones. Optional: GitHub Projects board.

---

## Weekly Check‑Ins

* Open a weekly **Check‑In** Issue using `.github/ISSUE_TEMPLATE/check-in.md`.
* Everyone comments async on accomplishments, next steps, blockers.
* Leads summarize action items and assign tasks.

---

## Issue Labels

`feat`, `bug`, `design`, `docs`, `check-in`, `good first issue`, `help wanted`, `blocked`

> Add more as needed for your workflow.

---

## Code of Conduct

We uphold an inclusive, respectful environment. See **`CODE_OF_CONDUCT.md`** and Discord server rules. Report issues to the Lead privately; escalate to the sheCodes Executive Board when appropriate.

---

## Contributing

Please read **`CONTRIBUTING.md`** for workflow, coding standards, and commit message style. In brief: create an Issue → branch → PR → review → squash & merge.

---

## Security

Do **not** open public Issues for vulnerabilities. Report privately as described in **`SECURITY.md`**.

---

## Demo Day Deliverables

* Working demo/prototype
* 5–7 minute presentation (video backup recommended)
* README with setup instructions
* Screenshots and/or short demo video
* One‑pager: problem, solution, tech, impact (see `/docs/demo-day.md`)

> Rehearse timing and roles; prefer a stable live demo or a reliable recorded fallback.

---

## Acknowledgements

Thanks to **sheCodes (ACM‑W at Cal Poly Pomona)**, mentors, and contributors supporting an inclusive learning community.

---

## License

**MIT** — see `LICENSE`.
