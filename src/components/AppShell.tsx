import React, { useState } from 'react';
import styles from './AppShell.module.css';
import Navbar from './Navbar';
import NavLeft from './NavLeft';
import type { NavKey } from '../router';

interface AppShellProps {
  /** Which top-level nav item is active */
  activeKey: NavKey;
  /** Page title shown in the page header */
  title: string;
  /** Optional subtitle below the title */
  subtitle?: string;
  /** Optional right-aligned header actions (buttons, tabs, etc.) */
  headerActions?: React.ReactNode;
  /** Page content */
  children: React.ReactNode;
}

/**
 * Shared layout used by every top-level page.
 * Renders Navbar + NavLeft + a main canvas with a standard page header.
 */
export default function AppShell({
  activeKey,
  title,
  subtitle,
  headerActions,
  children,
}: AppShellProps): React.ReactElement {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className={styles.page}>
      <Navbar onMenuOpen={() => setMobileNavOpen(true)} />

      {mobileNavOpen && (
        <div className={styles.mobileOverlay} onClick={() => setMobileNavOpen(false)} />
      )}

      <div className={styles.body}>
        <div className={styles.container}>
          <NavLeft
            activeKey={activeKey}
            isOpen={mobileNavOpen}
            onClose={() => setMobileNavOpen(false)}
          />

          <div className={styles.contentRow}>
            <main className={styles.mainCanvas}>
              <div className={styles.pageHeader}>
                <div className={styles.pageTitleWrap}>
                  <h1 className={styles.pageTitle}>{title}</h1>
                  {subtitle && <p className={styles.pageSubtitle}>{subtitle}</p>}
                </div>
                {headerActions && <div className={styles.pageActions}>{headerActions}</div>}
              </div>

              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
