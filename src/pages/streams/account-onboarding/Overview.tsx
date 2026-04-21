import React, { useState } from 'react';
import styles from './Overview.module.css';
import Navbar from '../../../components/Navbar';
import NavLeft from '../../../components/NavLeft';
import StepContainer from '../../../components/StepContainer';
import TradingAccounts from '../../../components/TradingAccounts';
import TradingPlatforms from '../../../components/TradingPlatforms';
import ReferFriend from '../../../components/ReferFriend';
import AddAccountDrawer from '../../../components/AddAccountDrawer';

export default function Overview(): React.ReactElement {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [addAccountOpen, setAddAccountOpen] = useState(false);

  function openAddAccount() {
    setMobileNavOpen(false); // close mobile nav if open
    setAddAccountOpen(true);
  }

  return (
    <div className={styles.page}>
      <Navbar onMenuOpen={() => setMobileNavOpen(true)} />

      {/* Mobile nav overlay */}
      {mobileNavOpen && (
        <div className={styles.mobileOverlay} onClick={() => setMobileNavOpen(false)} />
      )}

      {/* Add account drawer overlay (mobile only — desktop uses push layout) */}
      {addAccountOpen && (
        <div className={styles.drawerOverlay} onClick={() => setAddAccountOpen(false)} />
      )}

      <div className={styles.body}>
        <div className={styles.container}>
          {/* Side nav — forceCollapsed when add-account drawer is open */}
          <NavLeft
            isOpen={mobileNavOpen}
            onClose={() => setMobileNavOpen(false)}
            forceCollapsed={addAccountOpen}
          />

          {/* Content + push drawer */}
          <div className={styles.contentRow}>
            <main className={styles.mainCanvas}>
              <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>Overview</h1>
              </div>

              <StepContainer />
              <TradingAccounts onAddAccount={openAddAccount} isDrawerOpen={addAccountOpen} />
              <TradingPlatforms />
              <ReferFriend />
            </main>

            {/* Drawer slot — grows from 0 → 460px on desktop, fixed overlay on mobile */}
            <div className={`${styles.drawerSlot}${addAccountOpen ? ` ${styles.drawerSlotOpen}` : ''}`}>
              <AddAccountDrawer onClose={() => setAddAccountOpen(false)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
