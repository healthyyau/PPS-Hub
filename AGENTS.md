# The Hub — Pepperstone Design System

**Project:** Pepperstone Account & Onboarding Experience  
**Tech Stack:** React 18 + TypeScript  
**Build Tool:** Vite  
**Design System:** [Pepperstone DS SSOT](https://www.figma.com/design/0iR1o4UTpxXfbfviJD1HeI/Pepperstone-DS-SSOT)  
**Token Source:** Pepperstone DS Core MASTER (April 2026)

---

## 🎯 Overview

The Hub is the **base design system repository** for Pepperstone's Account & Onboarding streams. Multiple designers clone this repo and create feature branches to build stream-specific prototypes (e.g., account onboarding flows, payment gateway experiences).

**Key principle:** All designers inherit the same design tokens, typography, spacing, and colors. Each works in their own stream folder without modifying the base system.

---

## ⚡ Quick Start

### For New Designers

```bash
# 1. Clone the repository
git clone https://github.com/healthyyau/pps-hub.git
cd pps-hub

# 2. Install dependencies
npm install

# 3. Create your stream branch
git checkout -b stream/[your-stream-name]
# Examples: stream/account-onboarding, stream/payment-gateway

# 4. Start Claude Code
npx @anthropic-ai/claude-code .

# 5. Tell Claude Code:
# "Build the [Account Onboarding / Payment Gateway] prototype 
#  using the Pepperstone design tokens in AGENTS.md"
```

### For Returning Designers

```bash
git checkout stream/[your-stream-name]
npx @anthropic-ai/claude-code .
```

---

## 📁 Project Structure

```
pps-hub/
├── AGENTS.md                    ← This file (design system reference)
├── CONTRIBUTING.md              ← Designer onboarding guide
├── package.json                 ← Dependencies & build scripts
├── tsconfig.json                ← TypeScript configuration
├── vite.config.ts               ← Vite build configuration
│
├── src/
│   ├── tokens/
│   │   └── design-tokens.json   ← Consolidated design tokens (read-only)
│   └── styles/
│       └── tokens.css           ← CSS custom properties (read-only)
│
├── streams/                      ← Each designer works here
│   ├── account-onboarding/
│   │   ├── README.md
│   │   ├── COMPONENTS.md
│   │   └── src/
│   │       ├── components/
│   │       ├── pages/
│   │       └── styles/
│   └── payment-gateway/
│       ├── README.md
│       ├── COMPONENTS.md
│       └── src/
│
└── templates/
    └── component-template.tsx   ← Copy this for new components
```

---

## 🎨 Design Tokens

### Token Categories

**Colors:**
- **Primitives** — Brand colors, system colors, neutral palette
- **Semantic (Light)** — Intent-based colors for light mode
- **Semantic (Dark)** — Intent-based colors for dark mode

**Typography:**
- **Desktop styles** — h1–h6, body, labels (desktop sizes)
- **Mobile styles** — h1–h6, body, labels (mobile-optimized sizes)
- **Font family** — Manrope (primary)

**Spacing:**
- **Scale** — 0, 2, 4, 8, 16, 20, 24, 56, 64 (pixel values)

**Effects:**
- **Shadows** — Elevation and depth tokens

### Using Tokens in Code

**Never hardcode values. Always use CSS variables.**

```tsx
// ❌ DON'T
<div style={{ color: '#0032c7', padding: '16px' }}>

// ✅ DO
<div style={{
  color: 'var(--color-text-primary)',
  padding: 'var(--spacing-16)'
}}>
```

**In CSS Modules:**

```css
.button {
  background: var(--color-surface-brand-bold);
  color: var(--color-text-primary);
  padding: var(--spacing-16);
  border-radius: 4px;
  font-size: var(--typography-label-md-font_size);
  font-weight: var(--typography-label-md-font_weight);
}

.button:hover {
  background: var(--color-surface-brand-boldest);
}
```

### Token Naming Convention

All tokens follow this pattern:

```
--[category]-[subcategory]-[variant]

Examples:
--color-text-primary
--color-surface-brand-bold
--spacing-16
--typography-h1-font_size
--effect-shadow-lg
```

---

## 🌓 Dark Mode

The design system includes full light/dark mode support.

### Enable Dark Mode in Your App

```tsx
import './styles/tokens.css';
import { useState, useEffect } from 'react';

export default function App() {
  const [isDark, setIsDark] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      isDark ? 'dark' : 'light'
    );
  }, [isDark]);

  return (
    <div>
      <button onClick={() => setIsDark(!isDark)}>
        {isDark ? '☀️' : '🌙'} Toggle Theme
      </button>
      {/* Your app content */}
    </div>
  );
}
```

### How It Works

All semantic color tokens automatically respond to `data-theme="dark"`:

```css
/* tokens.css handles this automatically */
:root {
  --color-text-primary: #000000;  /* light mode */
}

[data-theme="dark"] {
  --color-text-primary: #ffffff;  /* dark mode */
}
```

**You don't need to write any conditional CSS.** Just use the token and it adapts.

---

## 🏗️ Creating Components

### Component Structure

```
components/
├── Button.tsx
├── Button.module.css
└── index.ts
```

### Component Template

Copy `templates/component-template.tsx` for new components:

```tsx
/**
 * @component Button
 * @description Primary action button with support for variants and states
 * @example
 * <Button variant="primary" size="md" disabled={false}>
 *   Click me
 * </Button>
 */
import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  onClick,
}) => {
  return (
    <button
      className={`${styles.root} ${styles[variant]} ${styles[size]}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

### Component Styles

```css
/* Button.module.css */
.root {
  border: none;
  border-radius: 4px;
  font-family: var(--typography-label-md-font_family);
  font-size: var(--typography-label-md-font_size);
  font-weight: var(--typography-label-md-font_weight);
  cursor: pointer;
  transition: all 200ms ease;
}

/* Variants */
.primary {
  background: var(--color-surface-brand-bold);
  color: var(--color-text-primary);
}

.primary:hover:not(:disabled) {
  background: var(--color-surface-brand-boldest);
}

.primary:disabled {
  background: var(--color-surface-disabled);
  color: var(--color-text-secondary);
  cursor: not-allowed;
}

.secondary {
  background: var(--color-surface-secondary);
  color: var(--color-text-primary);
}

.ghost {
  background: transparent;
  color: var(--color-text-brand);
  border: 1px solid var(--color-stroke-brand-default);
}

/* Sizes */
.sm {
  padding: var(--spacing-8) var(--spacing-12);
  font-size: var(--typography-label-sm-font_size);
}

.md {
  padding: var(--spacing-12) var(--spacing-16);
}

.lg {
  padding: var(--spacing-16) var(--spacing-24);
  font-size: var(--typography-label-lg-font_size);
}
```

---

## 📋 Code Style & Conventions

### TypeScript Rules

- **Strict mode** — Always declare types
- **Component props** — Use interfaces for clarity
- **No `any`** — Explicitly type everything
- **JSDoc comments** — Document component purpose and usage

```tsx
// ✅ Good
interface CardProps {
  title: string;
  description: string;
  onClick: () => void;
}

export const Card: React.FC<CardProps> = ({ title, description, onClick }) => {
  return <div onClick={onClick}>{title}</div>;
};

// ❌ Avoid
export const Card = (props: any) => {
  return <div onClick={props.onClick}>{props.title}</div>;
};
```

### Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `AccountSetup`, `PaymentForm` |
| Hooks | camelCase + "use" prefix | `useAccountContext`, `useFormState` |
| CSS classes | kebab-case | `.form-field`, `.button-primary` |
| CSS variables | kebab-case + double-dash | `--color-text-primary` |
| Files | Match component name | `Button.tsx`, `Button.module.css` |

### CSS Modules Best Practice

**Always use CSS Modules,** not inline styles:

```tsx
// ✅ Good
import styles from './Button.module.css';

<button className={styles.primary}>Click</button>

// ❌ Avoid
<button style={{ background: 'blue', padding: '16px' }}>Click</button>
```

### Token Consistency Checklist

Before committing, verify:

- [ ] All colors use `var(--color-*)`
- [ ] All typography uses `var(--typography-*)`
- [ ] All spacing uses `var(--spacing-*)`
- [ ] All shadows use `var(--effect-*)`
- [ ] No hardcoded hex values, pixel sizes, or font sizes
- [ ] Dark mode works (test with `data-theme="dark"`)
- [ ] TypeScript compiles without errors
- [ ] Component documented with JSDoc

---

## 🔧 Common Tasks

### Add a New Component

```bash
# 1. Create folder structure
mkdir -p streams/[your-stream]/src/components/MyComponent

# 2. Create files
touch streams/[your-stream]/src/components/MyComponent/{MyComponent.tsx,MyComponent.module.css,index.ts}

# 3. Copy template
cp templates/component-template.tsx streams/[your-stream]/src/components/MyComponent/MyComponent.tsx

# 4. Implement and test
npm run dev
```

### Update Design Tokens

If design tokens change in Figma:

1. Export new tokens from Figma
2. Replace `src/tokens/design-tokens.json`
3. Regenerate `src/tokens/tokens.css`
4. All components automatically use new values ✅

### Build for Production

```bash
npm run build
npm run preview  # Test production build locally
```

---

## 🚨 Troubleshooting

### "Tokens not applying / undefined variables"

**Problem:** CSS variables showing as transparent or not applying.

**Solution:**
1. Verify `tokens.css` is imported in main layout:
   ```tsx
   import './styles/tokens.css';
   ```
2. Check TypeScript/build doesn't strip CSS
3. Verify variable name matches exactly (e.g., `--color-text-primary`)

### "Dark mode not working"

**Problem:** Colors don't change when `data-theme="dark"` is set.

**Solution:**
1. Ensure `data-theme` is on `<html>` element, not `<body>`
2. Verify attribute value is exactly `'dark'` or `'light'`
3. Use semantic color tokens, not hardcoded values
4. Test in browser DevTools: `document.documentElement.setAttribute('data-theme', 'dark')`

### "TypeScript errors with token values"

**Problem:** Can't assign CSS variable to typed property.

**Solution:**
```tsx
// ❌ Wrong — CSS vars are strings
const bgColor: 'red' | 'blue' = 'var(--color-text-primary)';

// ✅ Right — Use in style attribute (string)
<div style={{ backgroundColor: 'var(--color-text-primary)' }} />

// ✅ Right — Use in className
<div className={styles.container} />  /* .container { background: var(...) } */
```

### "Build fails with 'token not found'"

**Problem:** CSS variable referenced but not defined.

**Solution:**
1. Check `tokens.css` exists in `src/styles/`
2. Verify variable name matches `tokens.css` exactly
3. Check for typos in variable name

### "Vite dev server not working"

**Problem:** `npm run dev` fails or doesn't hot-reload.

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## 📚 References

- **Design System:** [Pepperstone DS SSOT](https://www.figma.com/design/0iR1o4UTpxXfbfviJD1HeI/Pepperstone-DS-SSOT)
- **Tokens:** `src/tokens/design-tokens.json`
- **CSS Variables:** `src/styles/tokens.css`
- **React Docs:** https://react.dev
- **TypeScript Docs:** https://www.typescriptlang.org
- **Vite Docs:** https://vitejs.dev
- **CSS Modules:** https://github.com/css-modules/css-modules

---

## 🤝 Contributing

See `CONTRIBUTING.md` for:
- How to clone and branch
- Workflow for your stream
- How to document custom components
- How to push and create pull requests

---

## 📝 Version History

- **v1.0** (April 2026) — Initial design system release
  - Color primitives & semantics (light/dark)
  - Typography (desktop/mobile)
  - Spacing scale & effects
  - React + TypeScript + Vite setup

---

**Maintained by:** Pepperstone Product Design Team  
**Last updated:** April 14, 2026
