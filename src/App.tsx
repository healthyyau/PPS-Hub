/**
 * @component App
 * @description Root application component — design system demo with dark mode toggle.
 * Demonstrates the Pepperstone design token system: colors, typography, spacing, and shadows.
 */
import React, { useState, useEffect } from 'react';
import styles from './App.module.css';

const colorSwatches = [
  { label: 'bg-primary-default', cls: styles.swatchPrimary },
  { label: 'bg-secondary-default', cls: styles.swatchSecondary },
  { label: 'bg-surface', cls: styles.swatchSurface },
  { label: 'bg-success', cls: styles.swatchSuccess },
  { label: 'bg-error', cls: styles.swatchError },
  { label: 'bg-warning', cls: styles.swatchWarning },
];

export default function App(): React.ReactElement {
  const [isDark, setIsDark] = useState<boolean>(
    window.matchMedia('(prefers-color-scheme: dark)').matches,
  );

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      isDark ? 'dark' : 'light',
    );
  }, [isDark]);

  return (
    <div className={styles.app}>
      {/* Header */}
      <header className={styles.header}>
        <span className={styles.logo}>PPS-Hub — Pepperstone Design System</span>
        <button
          className={styles.toggleBtn}
          onClick={() => setIsDark((d) => !d)}
          aria-label="Toggle dark mode"
        >
          {isDark ? 'Light mode' : 'Dark mode'}
        </button>
      </header>

      {/* Color tokens */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Semantic Colors</h2>
        <div className={styles.swatchGrid}>
          {colorSwatches.map(({ label, cls }) => (
            <div key={label} className={styles.swatchItem}>
              <div className={`${styles.swatch} ${cls}`} />
              <span className={styles.swatchLabel}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Typography scale */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Typography Scale</h2>
        <div className={styles.card}>
          <p className={styles.typeH4}>Heading 4 — label-lg semi-bold</p>
          <p className={styles.typeBodyLg}>Body large — 18px regular, line-height 24px</p>
          <p className={styles.typeBodyMd}>Body medium — 16px regular, line-height 24px</p>
          <p className={styles.typeBodySm}>Body small — 14px regular, line-height 20px</p>
          <p className={styles.typeBodyXs}>Body XS — 12px regular, line-height 16px</p>
          <p className={styles.typeLabelMd}>Label medium — 16px semi-bold</p>
        </div>
      </section>

      {/* Spacing scale */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Spacing Scale</h2>
        <div className={styles.spacingGrid}>
          {(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '4xl', '7xl'] as const).map((size) => (
            <div key={size} className={styles.spacingItem}>
              <div
                className={styles.spacingBar}
                style={{ width: `var(--spacing-${size})`, height: `var(--spacing-${size})` }}
              />
              <span className={styles.swatchLabel}>--spacing-{size}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Button states */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Button States</h2>
        <div className={styles.card}>
          <div className={styles.buttonRow}>
            <button className={styles.btnPrimary}>Primary</button>
            <button className={styles.btnSecondary}>Secondary</button>
            <button className={styles.btnGhost}>Ghost</button>
            <button className={styles.btnPrimary} disabled>Disabled</button>
          </div>
        </div>
      </section>

      {/* Shadow scale */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Shadow Scale</h2>
        <div className={styles.shadowGrid}>
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
            <div
              key={size}
              className={styles.shadowCard}
              style={{ boxShadow: `var(--shadow-${size})` }}
            >
              --shadow-{size}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
