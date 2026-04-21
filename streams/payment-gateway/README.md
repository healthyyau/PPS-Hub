# Payment Gateway Stream

**Stream branch:** `stream/payment-gateway`  
**Designer:** [Your name]  
**Status:** In progress

---

## Overview

This stream builds the payment gateway experience for Pepperstone — deposit, withdrawal, and payment method management flows.

---

## Getting Started

```bash
# From the repo root
npm install
npm run dev
```

Your stream components live in `streams/payment-gateway/src/`.

---

## Structure

```
streams/payment-gateway/
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
