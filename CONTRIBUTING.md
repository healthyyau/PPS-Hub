# Contributing to PPS-Hub

Welcome to the Pepperstone design system repository. This guide helps you clone the repo, create your stream branch, and build prototypes using the shared design token system.

---

## Prerequisites

- Node.js 20 or later
- npm 10 or later
- Git

---

## 1. Clone and Install

```bash
git clone https://github.com/healthyyau/pps-hub.git
cd pps-hub
npm install
```

---

## 2. Create Your Stream Branch

Each designer works in their own stream branch. Never commit directly to `main`.

```bash
git checkout -b stream/[your-stream-name]
# Examples:
#   stream/account-onboarding
#   stream/payment-gateway
#   stream/kyc-verification
```

---

## 3. Start the Dev Server

```bash
npm run dev
```

Open `http://localhost:5173` in your browser. The app hot-reloads on save.

---

## 4. Work in Your Stream Folder

Your stream folder lives at `streams/[your-stream-name]/`. It has this structure:

```
streams/your-stream/
├── README.md          ← Stream overview and status
├── COMPONENTS.md      ← Component inventory table
└── src/
    ├── components/    ← Reusable UI components
    ├── pages/         ← Full-screen page compositions
    └── styles/        ← Stream-specific CSS (if needed)
```

**Rules:**
- Do not modify files outside your `streams/[your-stream]/` folder
- Do not edit `src/styles/tokens.css`, `src/tokens/`, or `AGENTS.md`
- All new components go inside your `src/components/` folder
- All CSS must use token variables — no hardcoded values (see below)

---

## 5. Using Design Tokens

Tokens are pre-imported via `src/main.tsx`. Every CSS variable from `src/styles/tokens.css` is available globally.

**Always use semantic tokens in components:**

```css
/* Button.module.css */
.button {
  background: var(--color-background-bg-primary-default);
  color: var(--color-text-inverse);
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--radius-md);
  font-family: var(--typography-label-md-font-family);
  font-size: var(--typography-label-md-font-size);
  font-weight: var(--typography-label-md-font-weight);
}
```

**Never hardcode values:**

```css
/* ❌ Don't do this */
.button {
  background: #0165fa;
  padding: 12px 20px;
  border-radius: 8px;
}
```

See `AGENTS.md` for the full token reference.

---

## 6. Copy the Component Template

Use the provided template as your starting point:

```bash
cp templates/component-template.tsx streams/[your-stream]/src/components/MyComponent.tsx
cp templates/component-template.module.css streams/[your-stream]/src/components/MyComponent.module.css
```

Rename and adapt it for your component.

---

## 7. Dark Mode

Dark mode works automatically — all semantic tokens switch when `data-theme="dark"` is on `<html>`. The toggle button in the demo app handles this.

In your components, just use semantic tokens and dark mode comes for free:

```css
.card {
  background: var(--color-background-bg-inverse); /* white in light, off-white in dark */
  color: var(--color-text-default);               /* dark in light, light in dark */
}
```

---

## 8. Document Your Components

Update `streams/[your-stream]/COMPONENTS.md` as you build:

```markdown
| Component | Status | Notes |
|-----------|--------|-------|
| Button    | Done   | Variants: primary, secondary, ghost |
| InputField| In progress | |
```

---

## 9. Pre-Commit Checklist

Before pushing, verify:

- [ ] All colors use `var(--color-*)` semantic tokens
- [ ] All typography uses `var(--typography-*)`
- [ ] All spacing uses `var(--spacing-*)`
- [ ] No hardcoded hex values, pixel sizes, or font sizes
- [ ] Dark mode tested (toggle in the app, or `document.documentElement.setAttribute('data-theme', 'dark')` in console)
- [ ] `npm run build` passes with zero TypeScript errors

---

## 10. Push and Create a Pull Request

```bash
git add streams/[your-stream]/
git commit -m "feat(stream): add [component or page name]"
git push origin stream/[your-stream-name]
```

Then open a pull request on GitHub targeting `main`. Include a screenshot of light and dark mode in the PR description.

---

## Questions?

See `AGENTS.md` for the full design system reference, token tables, and troubleshooting guide.
