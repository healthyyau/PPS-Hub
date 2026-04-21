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

# 4. Start the dev server
npm run dev

# 5. Open Claude Code and tell it:
# "Build the [Account Onboarding / Payment Gateway] prototype
#  using the Pepperstone design tokens in AGENTS.md"
```

### For Returning Designers

```bash
git checkout stream/[your-stream-name]
npm run dev
```

---

## 📁 Project Structure

```
pps-hub/
├── AGENTS.md                              ← This file (design system reference)
├── CONTRIBUTING.md                        ← Designer onboarding guide
├── package.json
├── tsconfig.json
├── vite.config.ts
│
├── src/
│   ├── tokens/                            ← Source token files (READ-ONLY)
│   │   ├── Primitives.Mode 1.tokens.json          ← Base color + dimension primitives
│   │   ├── Sematic colors.Mode 1.tokens.json      ← Semantic colors (light mode)
│   │   ├── Mode.Mode 1.tokens.json                ← Dark mode overrides
│   │   ├── Semantic spacing.Default.tokens.json   ← Spacing scale
│   │   ├── Semantic effect.Mode 1.tokens.json     ← Shadows + blur
│   │   ├── Semantic typography.Desktop.tokens.json
│   │   ├── Semantic typography.Mobile.tokens.json
│   │   ├── Semantic typography.Desktop Arabic.tokens.json
│   │   ├── Semantic typography.Mobile Arabic.tokens.json
│   │   ├── Responsive .Desktop.tokens.json
│   │   ├── Responsive .Mobile.tokens.json
│   │   ├── Responsive .Tablet.tokens.json
│   │   ├── color.styles.tokens.json
│   │   ├── effect.styles.tokens.json
│   │   ├── grid.styles.tokens.json
│   │   ├── text.styles.tokens.json
│   │   └── manifest.json
│   │
│   └── styles/
│       └── tokens.css                     ← Generated CSS variables (READ-ONLY)
│
├── streams/                               ← Each designer works here
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
    └── component-template.tsx
```

---

## 🎨 Design Tokens

All tokens originate from `src/tokens/Primitives.Mode 1.tokens.json` and are resolved through the semantic layer files. The `src/styles/tokens.css` is the compiled output — **never hardcode values from it directly**.

### Color Primitives

Primitive tokens are the raw values. Use **semantic tokens** in components wherever possible.

#### Brand — Primary Blue
| Token | CSS Variable | Value |
|-------|-------------|-------|
| `color.brand.primary.blue.50` | `--color-brand-primary-blue-50` | `#e6f0ff` |
| `color.brand.primary.blue.100` | `--color-brand-primary-blue-100` | `#99c1fd` |
| `color.brand.primary.blue.200` | `--color-brand-primary-blue-200` | `#67a3fc` |
| `color.brand.primary.blue.300` | `--color-brand-primary-blue-300` | `#3484fb` |
| `color.brand.primary.blue.400` | `--color-brand-primary-blue-400` | `#0165fa` ← **Pepperstone Blue** |
| `color.brand.primary.blue.500` | `--color-brand-primary-blue-500` | `#0032c7` |
| `color.brand.primary.blue.600` | `--color-brand-primary-blue-600` | `#000094` |
| `color.brand.primary.blue.700` | `--color-brand-primary-blue-700` | `#000061` |

#### Brand — Secondary Cyan
| Token | CSS Variable | Value |
|-------|-------------|-------|
| `color.brand.secondary.cyan.400` | `--color-brand-secondary-cyan-400` | `#00d3f3` |
| `color.brand.secondary.cyan.500` | `--color-brand-secondary-cyan-500` | `#00b8db` |
| `color.brand.secondary.cyan.600` | `--color-brand-secondary-cyan-600` | `#0092b8` |
| `color.brand.secondary.cyan.700` | `--color-brand-secondary-cyan-700` | `#007595` |

#### Neutral
| Token | CSS Variable | Value |
|-------|-------------|-------|
| `color.neutral.50` | `--color-neutral-50` | `#fafafa` |
| `color.neutral.100` | `--color-neutral-100` | `#f5f5f5` |
| `color.neutral.200` | `--color-neutral-200` | `#e5e5e5` |
| `color.neutral.300` | `--color-neutral-300` | `#d4d4d4` |
| `color.neutral.400` | `--color-neutral-400` | `#a1a1a1` |
| `color.neutral.500` | `--color-neutral-500` | `#737373` |
| `color.neutral.600` | `--color-neutral-600` | `#525252` |
| `color.neutral.700` | `--color-neutral-700` | `#404040` |
| `color.neutral.800` | `--color-neutral-800` | `#262626` |
| `color.neutral.900` | `--color-neutral-900` | `#171717` |
| `color.neutral.950` | `--color-neutral-950` | `#0a0a0a` |
| `color.neutral.Black` | `--color-neutral-black` | `#000000` |
| `color.neutral.White` | `--color-neutral-white` | `#ffffff` |
| `color.neutral.White_20` | `--color-neutral-white-20` | `#ffffff33` |

#### System Colors
| Group | 500 value | Use |
|-------|-----------|-----|
| `color.system.green.*` | `#00c950` | Success states |
| `color.system.red.*` | `#fb2c36` | Error states |
| `color.system.orange.*` | `#ff6900` | Warning states |

Each system color has shades 50–950.

#### Crypto
| Group | Key value | Use |
|-------|-----------|-----|
| `color.crypto.orange.*` | `#ff6a0a` (500) | Crypto-specific UI |

---

### Semantic Colors (Use These in Components)

Semantic tokens abstract meaning from raw values and automatically respond to dark mode.

#### Text
| CSS Variable | Light Value | Dark Value |
|-------------|-------------|------------|
| `--color-text-default` | neutral.950 (`#0a0a0a`) | neutral.200 (`#e5e5e5`) |
| `--color-text-secondary` | neutral.600 (`#525252`) | neutral.400 (`#a1a1a1`) |
| `--color-text-disable` | neutral.400 (`#a1a1a1`) | neutral.600 (`#525252`) |
| `--color-text-inverse` | neutral.White (`#ffffff`) | neutral.950 (`#0a0a0a`) |
| `--color-text-brand` | brand.blue.400 (`#0165fa`) | brand.blue.400 (`#0165fa`) |
| `--color-text-brand-secondary` | brand.blue.700 (`#000061`) | brand.blue.300 |

#### Background
| CSS Variable | Light Value | Dark Value |
|-------------|-------------|------------|
| `--color-background-bg-surface` | neutral.100 (`#f5f5f5`) | neutral.700 (`#404040`) |
| `--color-background-bg-surface-hover` | neutral.200 | — |
| `--color-background-bg-on-surface` | neutral.300 | — |
| `--color-background-bg-inverse` | neutral.White | neutral.100 |
| `--color-background-bg-surface-dark` | neutral.950 | neutral.950 |
| `--color-background-bg-primary-default` | brand.blue.400 | brand.blue.400 |
| `--color-background-bg-primary-hover` | brand.blue.500 | brand.blue.500 |
| `--color-background-bg-secondary-default` | cyan.400 | cyan.400 |
| `--color-background-bg-success` | system.green.100 | system.green.100 |
| `--color-background-bg-error` | system.red.100 | system.red.100 |
| `--color-background-bg-warning` | system.orange.100 | system.orange.100 |

#### Foreground
| CSS Variable | Use |
|-------------|-----|
| `--color-foreground-fg-default` | Default icon color |
| `--color-foreground-fg-disable` | Disabled icon |
| `--color-foreground-fg-inverse` | Icon on dark backgrounds |
| `--color-foreground-fg-success` | Success icon (green.700) |
| `--color-foreground-fg-error` | Error icon (red.700) |
| `--color-foreground-fg-warning` | Warning icon (orange.400) |
| `--color-foreground-fg-brand` | Brand icon (blue.400) |
| `--color-foreground-fg-accent` | Accent icon (cyan.400) |

---

### Typography

**Font families:**
- `Manrope` — Primary (all UI text, headings, labels)
- `Noto Sans Arabic` — Arabic language support
- `Noto Sans TC` — Traditional Chinese support
- `Noto Sans JP` — Japanese support

**Font weights:**
| Name | Value |
|------|-------|
| regular | 400 |
| semi-bold | 600 |
| bold | 700 |

#### Desktop Type Scale

| Style | CSS Prefix | Size | Weight | Line Height |
|-------|-----------|------|--------|-------------|
| h1 | `--typography-h1-*` | 96px | 700 | 100px |
| h2 | `--typography-h2-*` | 72px | 700 | 88px |
| h3 | `--typography-h3-*` | 48px | 700 | 56px |
| h4 | `--typography-h4-*` | 30px | 700 | 36px |
| h5 | `--typography-h5-*` | 24px | 700 | 32px |
| h6 | `--typography-h6-*` | 20px | 700 | 28px |
| body-lg | `--typography-body-lg-*` | 18px | 400 | 24px |
| body-md | `--typography-body-md-*` | 16px | 400 | 24px |
| body-sm | `--typography-body-sm-*` | 14px | 400 | 20px |
| body-xs | `--typography-body-xs-*` | 12px | 400 | 16px |
| label-lg | `--typography-label-lg-*` | 18px | 600 | 24px |
| label-md | `--typography-label-md-*` | 16px | 600 | 24px |
| label-sm | `--typography-label-sm-*` | 14px | 600 | 20px |

Each style exposes four properties: `font-family`, `font-size`, `font-weight`, `line-height`.

Mobile equivalents available via `Semantic typography.Mobile.tokens.json` — automatically applied at `max-width: 768px` via the responsive CSS rule.

---

### Spacing

Uses a t-shirt scale that maps to a 4px base grid.

| Token | CSS Variable | Value |
|-------|-------------|-------|
| `scale.none` | `--spacing-none` | 0px |
| `scale.xxs` | `--spacing-xxs` | 2px |
| `scale.xs` | `--spacing-xs` | 4px |
| `scale.sm` | `--spacing-sm` | 8px |
| `scale.md` | `--spacing-md` | 12px |
| `scale.lg` | `--spacing-lg` | 16px |
| `scale.xl` | `--spacing-xl` | 20px |
| `scale.2xl` | `--spacing-2xl` | 24px |
| `scale.3xl` | `--spacing-3xl` | 28px |
| `scale.4xl` | `--spacing-4xl` | 32px |
| `scale.5xl` | `--spacing-5xl` | 36px |
| `scale.6xl` | `--spacing-6xl` | 40px |
| `scale.7xl` | `--spacing-7xl` | 48px |
| `scale.8xl` | `--spacing-8xl` | 64px |
| `scale.9xl` | `--spacing-9xl` | 80px |
| `scale.10xl` | `--spacing-10xl` | 96px |
| `scale.11xl` | `--spacing-11xl` | 120px |
| `scale.12xl` | `--spacing-12xl` | 160px |
| `scale.13xl` | `--spacing-13xl` | 200px |

**Layout maximums:**
- `--max-width-lg`: 960px
- `--max-width-md`: 720px

---

### Border Radius

| Token | CSS Variable | Value |
|-------|-------------|-------|
| `dimensions.radius.xs` | `--radius-xs` | 2px |
| `dimensions.radius.sm` | `--radius-sm` | 4px |
| `dimensions.radius.md` | `--radius-md` | 8px |
| `dimensions.radius.lg` | `--radius-lg` | 12px |
| `dimensions.radius.xl` | `--radius-xl` | 16px |
| `dimensions.radius.2xl` | `--radius-2xl` | 24px |
| `dimensions.radius.3xl` | `--radius-3xl` | 32px |
| `dimensions.radius.4xl` | `--radius-4xl` | 80px (pill/full) |

---

### Border Width

| Token | CSS Variable | Value |
|-------|-------------|-------|
| `dimensions.border-width.none` | `--border-width-none` | 0px |
| `dimensions.border-width.xxs` | `--border-width-xxs` | 1px |
| `dimensions.border-width.xs` | `--border-width-xs` | 1.5px |
| `dimensions.border-width.sm` | `--border-width-sm` | 2px |
| `dimensions.border-width.md` | `--border-width-md` | 3px |
| `dimensions.border-width.lg` | `--border-width-lg` | 4px |

---

### Effects — Shadows

Shadow tokens have resolved `box-shadow` shorthand values.

| Token | CSS Variable | Value |
|-------|-------------|-------|
| `shadow.2xs` | `--shadow-2xs` | `0px 1px 1px 0px #0000000d` |
| `shadow.xs` | `--shadow-xs` | `0px 1px 3px 0px #0000000d` |
| `shadow.sm` | `--shadow-sm` | `0px 2px 4px -1px #0000001a` |
| `shadow.md` | `--shadow-md` | `0px 4px 6px -1px #0000001a` |
| `shadow.lg` | `--shadow-lg` | `0px 10px 15px -3px #0000001a` |
| `shadow.xl` | `--shadow-xl` | `0px 20px 25px -5px #0000001a` |
| `shadow.2xl` | `--shadow-2xl` | `0px 25px 50px -12px #00000040` |

---

### Effects — Blur

| Token | CSS Variable | Value |
|-------|-------------|-------|
| `blur.xs` | `--blur-xs` | 4px |
| `blur.sm` | `--blur-sm` | 8px |
| `blur.md` | `--blur-md` | 12px |
| `blur.lg` | `--blur-lg` | 16px |
| `blur.xl` | `--blur-xl` | 24px |
| `blur.2xl` | `--blur-2xl` | 40px |
| `blur.3xl` | `--blur-3xl` | 64px |

---

### Breakpoints / Screens

| Token | CSS Variable | Value | Notes |
|-------|-------------|-------|-------|
| `dimensions.screens.2xs` | `--screen-2xs` | 320px | Small mobile |
| `dimensions.screens.xs` | `--screen-xs` | 375px | Standard mobile |
| `dimensions.screens.sm` | `--screen-sm` | 640px | Tablet start |
| `dimensions.screens.md` | `--screen-md` | 768px | Tablet |
| `dimensions.screens.lg` | `--screen-lg` | 1024px | Laptop |
| `dimensions.screens.xl` | `--screen-xl` | 1280px | Desktop |
| `dimensions.screens.2xl` | `--screen-2xl` | 1440px | Wide desktop |

---

### Opacity

Scale from 0–100 in 5-step increments: `--opacity-0`, `--opacity-5`, `--opacity-10` ... `--opacity-100`.

---

## 🔧 Using Tokens in Code

**Never hardcode values. Always use CSS variables.**

```tsx
// ❌ DON'T
<div style={{ color: '#0a0a0a', padding: '16px' }}>

// ✅ DO
<div style={{
  color: 'var(--color-text-default)',
  padding: 'var(--spacing-lg)'
}}>
```

**In CSS Modules:**

```css
/* Button.module.css */
.button {
  background: var(--color-background-bg-primary-default);
  color: var(--color-text-inverse);
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--radius-md);
  border: var(--border-width-none) solid transparent;
  font-family: var(--typography-label-md-font-family);
  font-size: var(--typography-label-md-font-size);
  font-weight: var(--typography-label-md-font-weight);
  line-height: var(--typography-label-md-line-height);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all 200ms ease;
}

.button:hover:not(:disabled) {
  background: var(--color-background-bg-primary-hover);
}

.button:disabled {
  background: var(--color-background-bg-disable);
  color: var(--color-text-disable);
  cursor: not-allowed;
}
```

### Token Naming Convention

All tokens follow this pattern:

```
--[category]-[subcategory]-[variant]

Examples:
--color-text-default
--color-background-bg-surface
--color-foreground-fg-success
--color-brand-primary-blue-400
--color-neutral-950
--spacing-lg
--spacing-2xl
--typography-h1-font-size
--typography-label-md-font-weight
--radius-md
--border-width-sm
--shadow-md
--blur-lg
--opacity-50
--screen-xl
```

---

## 🌓 Dark Mode

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
        Toggle Theme
      </button>
    </div>
  );
}
```

### How It Works

All semantic color tokens automatically respond to `data-theme="dark"` on the `<html>` element:

```css
:root {
  --color-text-default: #0a0a0a;         /* light mode */
  --color-background-bg-surface: #f5f5f5;
}

[data-theme="dark"] {
  --color-text-default: #e5e5e5;         /* dark mode */
  --color-background-bg-surface: #404040;
}
```

**You don't write conditional CSS.** Just use the semantic token and it adapts.

> ⚠️ Primitive tokens (e.g. `--color-neutral-950`) do **not** change between themes. Always prefer semantic tokens in components.

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

---

## 📋 Code Style & Conventions

### TypeScript Rules

- **Strict mode** — Always declare types
- **Component props** — Use interfaces
- **No `any`** — Explicitly type everything
- **JSDoc comments** — Document purpose and usage

### Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `AccountSetup`, `PaymentForm` |
| Hooks | camelCase + "use" | `useAccountContext`, `useFormState` |
| CSS classes | kebab-case | `.form-field`, `.button-primary` |
| CSS variables | kebab-case + double-dash | `--color-text-default` |
| Files | Match component name | `Button.tsx`, `Button.module.css` |

### CSS Modules

Always use CSS Modules. Never use inline styles for design decisions.

```tsx
// ✅ Good
import styles from './Button.module.css';
<button className={styles.primary}>Click</button>

// ❌ Avoid
<button style={{ background: '#0165fa', padding: '12px 20px' }}>Click</button>
```

### Token Consistency Checklist

Before committing, verify:

- [ ] All colors use `var(--color-*)` semantic tokens
- [ ] All typography uses `var(--typography-*)`
- [ ] All spacing uses `var(--spacing-*)`
- [ ] All shadows use `var(--shadow-*)`
- [ ] All radii use `var(--radius-*)`
- [ ] No hardcoded hex values, pixel sizes, or font sizes
- [ ] Dark mode works (test with `data-theme="dark"` on `<html>`)
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

# 3. Implement using tokens
npm run dev
```

### Update Design Tokens

If design tokens change in Figma:

1. Export new JSON files from the Figma Tokens plugin (resolve references before exporting)
2. Replace the relevant files in `src/tokens/`
3. Regenerate `src/styles/tokens.css`
4. All components automatically use new values ✅

> ⚠️ Ensure **"Resolve token references"** is enabled in the Figma Tokens plugin before exporting, otherwise semantic tokens will export as unresolved references like `{color.neutral.950}` instead of actual hex values.

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
1. Verify `tokens.css` is imported in main entry:
   ```tsx
   import './styles/tokens.css';
   ```
2. Verify variable name is correct — check this file for exact names
3. Check that `data-theme` is set on `<html>`, not `<body>`

### "Semantic color not changing in dark mode"

**Problem:** Colors don't change when `data-theme="dark"` is set.

**Solution:**
1. Ensure `data-theme` is on `<html>` element, not `<body>` or a child
2. Verify you are using **semantic** tokens (e.g. `--color-text-default`), not **primitive** tokens (e.g. `--color-neutral-950`) — primitives don't have dark mode variants
3. Test manually: `document.documentElement.setAttribute('data-theme', 'dark')`

### "Token reference not resolved (shows `{color.neutral.950}` in CSS)"

**Problem:** tokens.css contains unresolved Figma references.

**Solution:** Re-export tokens from Figma with the **"Resolve token references"** option enabled. The semantic token files reference primitives using `{color.neutral.950}` notation — this must be resolved before export, otherwise the CSS will be invalid.

### "TypeScript errors with token values"

```tsx
// ❌ Wrong
const bgColor: 'red' | 'blue' = 'var(--color-background-bg-surface)';

// ✅ Right — use in style attribute (accepts strings)
<div style={{ backgroundColor: 'var(--color-background-bg-surface)' }} />

// ✅ Best — use via className + CSS Module
<div className={styles.container} />  /* .container { background: var(--color-background-bg-surface) } */
```

### "Vite dev server not working"

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## 🌍 Internationalisation

The design system includes Arabic and CJK font support:

| Language | Font | Token |
|----------|------|-------|
| Arabic (RTL) | Noto Sans Arabic | `{font.font-family.Noto_Sans_Arabic}` |
| Traditional Chinese | Noto Sans TC | `{font.font-family.Noto_Sans_TC}` |
| Japanese | Noto Sans JP | `{font.font-family.Noto_Sans_JP}` |

Arabic typography tokens are in `Semantic typography.Desktop Arabic.tokens.json` and `Semantic typography.Mobile Arabic.tokens.json`. Apply these via a `[lang="ar"]` or `[dir="rtl"]` CSS selector override.

---

## 📚 References

- **Design System (Figma):** [Pepperstone DS SSOT](https://www.figma.com/design/0iR1o4UTpxXfbfviJD1HeI/Pepperstone-DS-SSOT)
- **Token source files:** `src/tokens/`
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
- How to document custom components in COMPONENTS.md
- How to push and create pull requests

---

## 📝 Version History

- **v1.1** (April 2026) — Token source files updated; full primitive resolution confirmed
  - All 17 source token files present in `src/tokens/`
  - Brand blue, cyan, neutral, system, crypto primitives all resolved
  - Full spacing scale (none → 13xl), radius, border-width, blur, shadow tokens added
  - Arabic + CJK font families documented
- **v1.0** (April 2026) — Initial design system release

---

**Maintained by:** Pepperstone Product Design Team  
**Last updated:** April 15, 2026
