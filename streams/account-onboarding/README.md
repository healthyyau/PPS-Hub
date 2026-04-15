# Account Onboarding Stream

**Stream branch:** `stream/account-onboarding`  
**Designer:** [Your name]  
**Status:** In progress

---

## Overview

This stream builds the account onboarding experience for Pepperstone — the end-to-end flow a new user goes through to create and fund their trading account.

---

## Getting Started

```bash
# From the repo root
npm install
npm run dev
```

Your stream components live in `streams/account-onboarding/src/`.

---

## Structure

```
streams/account-onboarding/
├── README.md          ← This file
├── COMPONENTS.md      ← Component inventory
└── src/
    ├── components/    ← Reusable UI components
    ├── pages/         ← Full-page compositions
    └── styles/        ← Stream-specific CSS overrides
```

---

## Token Reference

All design tokens are documented in [AGENTS.md](../../AGENTS.md).  
All CSS variables are compiled in [src/styles/tokens.css](../../src/styles/tokens.css).

---

## Guidelines

- All CSS must use `var(--token-name)` — no hardcoded values
- Test dark mode before every commit
- Document new components in `COMPONENTS.md`
- Run `npm run build` to verify zero TypeScript errors before pushing
