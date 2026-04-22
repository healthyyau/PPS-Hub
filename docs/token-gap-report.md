# Token Gap Report — Hub vs AKQA Storybook

**Source:** AKQA Storybook export from @Gegerly (`storybook-static.zip` → PS Design System stories)
**Compared to:** `src/styles/tokens.css` (current Hub tokens, compiled from `src/tokens/*.json`)

---

## TL;DR

| Area | Values | Naming |
|---|---|---|
| **Radius** | ✅ 100% match | ✅ Match (drop the `--radius-` → `radius-` dash-prefix discussion only) |
| **Opacity** | ✅ 100% match | ✅ Match |
| **Blur** | ✅ 100% match | ✅ Match |
| **Shadow** | ⚠ Values probably OK (not exported) | ✅ Match (`shadow-{2xs…2xl}`) |
| **Spacing scale** | ✅ 100% match | ❌ Hub calls it `--spacing-*`, AKQA calls it `scale-*` |
| **Border width** | ⚠ Hub has an extra step | ❌ Off-by-one (`xxs→xs` shift) |
| **Typography** | ⚠ Values mostly match; 1 mobile line-height drift | ❌ Hub splits into 4 atomic tokens per style; AKQA ships one class per style |
| **Colours — primitives** | ✅ Hex values match | ❌ Hub prepends `--color-brand-` namespace; AKQA keeps `color-*` flat |
| **Colours — semantic** | ✅ Hex values match | ❌ Hub uses `--color-{category}-{prefix}-{role}` (long, redundant); AKQA uses flat `{prefix}-{role}` |
| **Focus rings** | ❌ Missing | AKQA has `focus-ring-{default\|subtle\|inverse\|error}`; Hub has nothing |
| **Section gaps** | ❌ Missing | AKQA has `section-gap-{sm\|md\|lg\|xl}` (40/64/80/160 px); Hub has nothing named |
| **Input sub-tokens** | ❌ Missing | AKQA has `input-surface`, `input-placeholder-default`, `input-border-default`; Hub inlines these via generic tokens |

---

## 1. Naming-convention gaps (the important bit to share with engineers)

### 1a. Flat vs nested prefixes

**AKQA:**
```
bg-primary-default
text-secondary
border-subtle
fg-inverse
```

**Hub (today):**
```
--color-background-bg-primary-default
--color-text-secondary
--color-border-subtle
--color-foreground-fg-inverse
```

Hub redundantly prefixes every colour with `--color-{category}-{category-prefix}-`. AKQA flattens to `{prefix}-{role}`. The `bg-`/`fg-`/`text-`/`border-` prefix already tells you the category, so `--color-background-bg-` is saying "colour" twice.

**Recommendation:** adopt AKQA's flat shape (`--bg-primary-default`, `--text-secondary`, `--border-subtle`, `--fg-inverse`). It matches the Figma tokens, is ~18 chars shorter per usage, and removes the chance of picking the wrong prefix (e.g. `--color-foreground-fg-*` vs `--color-text-*`, which both exist today and overlap semantically).

### 1b. `spacing` vs `scale`

Every value is identical but the prefix differs:

| Pixel | AKQA | Hub |
|---|---|---|
| 0 | `scale-none` | `--spacing-none` |
| 2 | `scale-xxs` | `--spacing-xxs` |
| 4 | `scale-xs` | `--spacing-xs` |
| … | … | … |
| 200 | `scale-13xl` | `--spacing-13xl` |

AKQA reserves `scale-*` for the primitive step and layers `section-gap-*` on top. Hub collapses both into `--spacing-*` and has no `section-gap` tokens at all.

**Recommendation:** rename `--spacing-*` → `--scale-*` and add the 4 `--section-gap-*` semantic tokens (40/64/80/160 px).

### 1c. Typography: atomic vs composite

**AKQA** ships one class-backed token per style — `typography-h1`, `typography-body-md`, etc. — the class sets font-size, line-height, font-weight, and family together.

**Hub** explodes each style into 4 separate CSS variables:
```css
--typography-body-md-font-family
--typography-body-md-font-size
--typography-body-md-font-weight
--typography-body-md-line-height
```

Pros of Hub's approach: you can compose (e.g. apply just the size without the family).
Cons: 4× the variable noise, 4 lookups per usage, and easy to forget one of the four lines.

**Recommendation:** either (a) keep the atomic variables and **also** emit a shorthand utility class (`.typography-h1 { font: … }`) that engineers can reach for, or (b) migrate fully to the AKQA class-based approach. Don't ship both patterns forever.

### 1d. Border-width off-by-one

| Pixel | AKQA | Hub |
|---|---|---|
| 0 | `border-width-none` | `--border-width-none` |
| 1 | `border-width-xs` | `--border-width-xxs` ⚠ |
| 1.5 | `border-width-sm` | `--border-width-xs` ⚠ |
| 2 | `border-width-md` | `--border-width-sm` ⚠ |
| 3 | `border-width-lg` | `--border-width-md` ⚠ |
| 4 | `border-width-xl` | `--border-width-lg` ⚠ |

Hub has an extra `xxs` step at 1 px which shifts every label one size smaller than AKQA. So a Hub engineer reaching for `--border-width-sm` (2 px) would be reaching for `border-width-md` in AKQA. This is a footgun when cross-referencing Figma specs.

**Recommendation:** drop `xxs`, rename Hub's border-width scale to match AKQA (`xs`=1, `sm`=1.5, `md`=2, `lg`=3, `xl`=4).

### 1e. `disable` vs `disabled`

Hub uses `--color-background-bg-disable`, `--color-foreground-fg-disable`, `--color-text-disable`.
AKQA uses `bg-disabled`, `text-disabled`.

Small thing, but it's a past-tense verb — `disabled` reads correctly. Hub should standardise on `disabled`.

### 1f. `hover` double-word

Hub has `--color-background-bg-primary-default-hover` (6 tokens deep!), AKQA has `bg-primary-hover`. The `-default` in the middle is meaningless when a hover variant exists — if there's no explicit state suffix, it's already the default.

**Recommendation:** drop `-default` from the state-variant tokens:
- `--bg-primary-default-hover` → `--bg-primary-hover`
- `--bg-primary-subtle-hover` stays as-is (modifier + state is fine)

---

## 2. Values: matches and drifts

### 2a. Radius — perfect ✅

| Pixel | Token (both) |
|---|---|
| 2 | `radius-xs` |
| 4 | `radius-sm` |
| 8 | `radius-md` |
| 12 | `radius-lg` |
| 16 | `radius-xl` |
| 24 | `radius-2xl` |
| 32 | `radius-3xl` |
| 80 | `radius-4xl` |

### 2b. Blur — perfect ✅

4/8/12/16/24/40/64 px mapped to `xs/sm/md/lg/xl/2xl/3xl` on both sides.

### 2c. Opacity — perfect ✅

0/5/10/…/100 (step 5) on both sides.

### 2d. Spacing — perfect ✅ (values) / naming mismatch ❌

All 19 steps (0, 2, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 48, 64, 80, 96, 120, 160, 200) match 1:1. Only prefix differs (see 1b).

### 2e. Typography — mostly ✅, 1 mobile drift ⚠

Desktop rows aren't exported as static values in the AKQA Storybook (they're read from computed CSS at runtime), so we can't diff desktop numerically. But the **mobile** rows are hard-coded and comparable:

| Token | AKQA mobile | Hub mobile | Status |
|---|---|---|---|
| h1 | 48 / 52 | 48 / 52 | ✅ |
| h2 | 36 / 40 | 36 / 40 | ✅ |
| h3 | 30 / 36 | 30 / 36 | ✅ |
| h4 | 24 / 28 | 24 / 28 | ✅ |
| h5 | 20 / **24** | 20 / **28** | ⚠ line-height drift |
| h6 | 18 / 24 | 18 / 24 | ✅ |
| body-lg | 18 / 24 | 18 / 24 | ✅ |
| body-md | 16 / 24 | 16 / 24 | ✅ |
| body-sm | 14 / 20 | 14 / 20 | ✅ |
| body-xs | 12 / 16 | 12 / 16 | ✅ |
| label-lg | 18 / 24 / 600 | 18 / 24 / 600 | ✅ |
| label-md | 16 / 24 / 600 | 16 / 24 / 600 | ✅ |
| label-sm | 14 / 20 / 600 | 14 / 20 / 600 | ✅ |

**Fix:** Hub's `--typography-h5-line-height` at mobile should be `24px` (matching AKQA), currently `28px`.

### 2f. Colours — all hex values match; naming is the gap

Every primitive hex used by AKQA's semantic layer is present in Hub's primitive palette. The comparison is easiest as a mapping table:

| AKQA role | Hub role (current) | Hex |
|---|---|---|
| `bg-dim` | `bg-surface` | #f5f5f5 |
| `bg-disabled` | `bg-disable` | #e5e5e5 |
| `bg-inverse` | `bg-inverse` | #ffffff |
| `bg-surface-dark` | `bg-surface-dark` | #0a0a0a |
| `bg-primary-subtle` | `bg-primary-subtle` | #E6F0FF |
| `bg-primary-default` | `bg-primary-default` | #0165FA |
| `bg-primary-hover` | `bg-primary-default-hover` | #0032C7 |
| `bg-secondary-default` | `bg-secondary-default` | #00D3F3 |
| `bg-secondary-hover` | `bg-secondary-hover` | #00B8DB |
| `bg-error` | `bg-error` | #FFE2E2 |
| `bg-warning` | `bg-warning` | #FFEDD4 |
| `bg-success` | `bg-success` | #DCFCE7 |
| `fg-inverse` | `fg-inverse` | #ffffff |
| `fg-inverse-subtle` | `fg-inverse-subtle` | #737373 ⚠ Hub has #a1a1a1 |
| `fg-default` | `fg-default` | #0a0a0a |
| `fg-error` | `fg-error` | #C10007 |
| `fg-warning` | `fg-warning` | #ff8904 |
| `fg-success` | `fg-success` | #00a63e ⚠ Hub has #008236 |
| `fg-brand-secondary` | `fg-brand-secondary` | #000061 |
| `border-subtle` | `border-subtle` | #d4d4d4 |
| `border-strong` | `border-strong` | #0a0a0a |
| `border-inverse-strong` | `border-inverse-strong` | #ffffff |
| `border-inverse-subtle` | `border-inverse-subtle` | #FFFFFF20 (20%) / #FFFFFF33 (Hub) ⚠ |
| `text-inverse` | `text-inverse` | #ffffff |
| `text-inverse-subtle` | `text-inverse-subtle` | #a1a1a1 |
| `text-disabled` | `text-disable` | #737373 ⚠ Hub has #a1a1a1 + name typo |
| `text-secondary` | `text-secondary` | #525252 |
| `text-default` | `text-default` | #0a0a0a |
| `text-error` | (none) | #C10007 — **missing in Hub** |
| `text-brand` | `text-brand` | #0165FA |
| `text-brand-secondary` | `text-brand-secondary` | #000061 |
| `input-surface` | (none) | #ffffff — **missing in Hub** |
| `input-placeholder-default` | (none) | #d4d4d4 — **missing in Hub** |
| `input-border-default` | (none) | #0A0A0A — **missing in Hub** |

**Colour drift summary:**
- `fg-inverse-subtle`: AKQA #737373, Hub #a1a1a1 → Hub is 2 steps lighter
- `fg-success`: AKQA #00a63e (green-600), Hub #008236 (green-700) → Hub is 1 step darker
- `border-inverse-subtle`: AKQA 20% white (`#FFFFFF20`), Hub 33% white (`#FFFFFF33`)
- `text-disable` (sic): AKQA #737373 (neutral-500), Hub #a1a1a1 (neutral-400)
- `text-error`, `input-*`: not defined in Hub

### 2g. Effects — focus rings missing

AKQA defines four semantic focus-ring tokens:
- `focus-ring-default` (brand + inverse-strong)
- `focus-ring-subtle` (strong + inverse-strong)
- `focus-ring-inverse` (inverse-strong + strong)
- `focus-ring-error` (error + inverse-strong)

Each is a 2-layer box-shadow (4 px outer + 2 px inner ring).

Hub has no focus-ring tokens; every component either omits focus styles or re-invents them. **Recommendation:** add the four tokens so a11y focus states are consistent across the product.

---

## 3. Concrete changes I'd recommend

Group the changes by blast radius so engineers can decide what's worth the migration cost:

### Low-cost / high-value
1. Fix `disable` → `disabled` (CSS token rename + search/replace).
2. Drop `-default` from state-variant tokens (`bg-primary-default-hover` → `bg-primary-hover`).
3. Add `section-gap-{sm|md|lg|xl}` (40/64/80/160 px).
4. Add `focus-ring-{default|subtle|inverse|error}` tokens.
5. Fix `--typography-h5-line-height` mobile value (28 → 24 px).
6. Add missing colour tokens: `text-error`, `input-surface`, `input-placeholder-default`, `input-border-default`.
7. Fix colour-value drifts: `fg-inverse-subtle`, `fg-success`, `border-inverse-subtle`, `text-disabled`.

### Medium-cost
8. Collapse `--color-background-bg-*`, `--color-foreground-fg-*`, `--color-text-*`, `--color-border-*` down to `--bg-*`, `--fg-*`, `--text-*`, `--border-*` to match AKQA's flat shape.
9. Drop `--border-width-xxs` and shift the scale one step up (`xxs`→`xs`, etc.).

### Higher-cost / needs alignment
10. Rename `--spacing-*` → `--scale-*` to match AKQA's naming (every CSS file in the codebase references `var(--spacing-*)`).
11. Decide typography model: keep 4-atomic-tokens-per-style, or ship `typography-h1` etc. as classes like AKQA does, or both. Don't leave engineers guessing.

---

## 4. Quick reference — full AKQA token list (copy-paste-friendly)

### Colours — semantic
```
Background: bg-dim, bg-disabled, bg-inverse, bg-surface-dark,
            bg-primary-subtle, bg-primary-default, bg-primary-hover,
            bg-secondary-default, bg-secondary-hover,
            bg-error, bg-warning, bg-success
Foreground: fg-inverse, fg-inverse-subtle, fg-default,
            fg-error, fg-warning, fg-success,
            fg-brand-secondary
Border:     border-subtle, border-strong,
            border-inverse-strong, border-inverse-subtle
Text:       text-inverse, text-inverse-subtle, text-disabled,
            text-secondary, text-default,
            text-error, text-brand, text-brand-secondary
Input:      input-surface, input-placeholder-default, input-border-default
```

### Radius
```
radius-xs (2),  radius-sm (4),  radius-md (8),  radius-lg (12),
radius-xl (16), radius-2xl (24), radius-3xl (32), radius-4xl (80)
```

### Border width
```
border-width-none (0), border-width-xs (1), border-width-sm (1.5),
border-width-md (2), border-width-lg (3), border-width-xl (4)
```

### Opacity
```
opacity-0, opacity-5, opacity-10, … opacity-100  (step 5)
```

### Spacing
```
Scale:       scale-none (0), scale-xxs (2), scale-xs (4), scale-sm (8),
             scale-md (12), scale-lg (16), scale-xl (20), scale-2xl (24),
             scale-3xl (28), scale-4xl (32), scale-5xl (36), scale-6xl (40),
             scale-7xl (48), scale-8xl (64), scale-9xl (80), scale-10xl (96),
             scale-11xl (120), scale-12xl (160), scale-13xl (200)
Section gap: section-gap-sm (40), section-gap-md (64),
             section-gap-lg (80), section-gap-xl (160)
```

### Effects
```
Blur:         blur-xs (4), blur-sm (8), blur-md (12), blur-lg (16),
              blur-xl (24), blur-2xl (40), blur-3xl (64)
Shadow:       shadow-2xs, shadow-xs, shadow-sm, shadow-md,
              shadow-lg, shadow-xl, shadow-2xl
Focus rings:  focus-ring-default, focus-ring-subtle,
              focus-ring-inverse, focus-ring-error
```

### Typography (class-based in AKQA; atomic-tokens today in Hub)
```
typography-h1, typography-h2, typography-h3, typography-h4,
typography-h5, typography-h6,
typography-body-lg, typography-body-md, typography-body-sm, typography-body-xs,
typography-label-lg, typography-label-md, typography-label-sm
```

Font weights: `font-normal` (400), `font-semibold` (600), `font-bold` (700). Family: Manrope.
