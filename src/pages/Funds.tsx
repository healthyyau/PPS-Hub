import React, { useState } from 'react';
import styles from './Funds.module.css';
import AppShell from '../components/AppShell';
import Tabs, { type TabSpec } from '../components/Tabs';

const imgDepositScreen =
  'https://www.figma.com/api/mcp/asset/e07f983e-2c56-4427-b8d9-b72f4d916b5a';

type FundsTab = 'deposit' | 'withdraw' | 'transfer' | 'history';

const TABS: TabSpec<FundsTab>[] = [
  { key: 'deposit',  label: 'Deposit'  },
  { key: 'withdraw', label: 'Withdraw' },
  { key: 'transfer', label: 'Transfer' },
  { key: 'history',  label: 'History'  },
];

interface HistoryRow {
  description: string;
  account: string;
  amount: string;
  date: string;
  status: 'Completed' | 'Pending';
}

const HISTORY: HistoryRow[] = [
  { description: 'Deposit via Credit Card',    account: 'J.D.Acc 04',   amount: '+ $500.00',   date: 'Apr 20, 2026', status: 'Completed' },
  { description: 'Withdrawal to Bank Transfer', account: 'J.D.Acc 02',   amount: '− $1,200.00', date: 'Apr 18, 2026', status: 'Pending'   },
  { description: 'Internal Transfer',           account: 'J.D.Acc 04 → 02', amount: '− $250.00',   date: 'Apr 15, 2026', status: 'Completed' },
  { description: 'Deposit via Skrill',          account: 'J.D.Acc 01',   amount: '+ $3,000.00', date: 'Apr 10, 2026', status: 'Completed' },
];

function DepositPanel() {
  return (
    <div className={styles.depositFrame} aria-label="Deposit flow preview">
      <img alt="" src={imgDepositScreen} />
    </div>
  );
}

function SimplePanel({ title, desc }: { title: string; desc: string }) {
  return (
    <section className={styles.panel}>
      <h2 className={styles.panelTitle}>{title}</h2>
      <p className={styles.panelDesc}>{desc}</p>
    </section>
  );
}

function HistoryPanel() {
  return (
    <section className={styles.panel}>
      <h2 className={styles.panelTitle}>Transaction history</h2>
      <p className={styles.panelDesc}>A record of your deposits, withdrawals, and internal transfers.</p>
      <div className={styles.placeholderTable}>
        <div className={`${styles.placeholderRow} ${styles.placeholderHead}`}>
          <span>Description</span>
          <span>Account</span>
          <span>Amount</span>
          <span>Date</span>
          <span>Status</span>
        </div>
        {HISTORY.map((row, idx) => (
          <div className={styles.placeholderRow} key={idx}>
            <span>{row.description}</span>
            <span>{row.account}</span>
            <span>{row.amount}</span>
            <span>{row.date}</span>
            <span className={`${styles.statusPill}${row.status === 'Pending' ? ` ${styles.statusPillPending}` : ''}`}>
              {row.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Funds(): React.ReactElement {
  const [tab, setTab] = useState<FundsTab>('deposit');

  return (
    <AppShell activeKey="funds" title="Funds">
      <div className={styles.stack}>
        <Tabs<FundsTab> tabs={TABS} active={tab} onChange={setTab} />

        {tab === 'deposit'  && <DepositPanel />}
        {tab === 'withdraw' && (
          <SimplePanel
            title="Withdraw funds"
            desc="Choose an account and withdrawal method to move funds from your trading account back to your bank, card, or e-wallet."
          />
        )}
        {tab === 'transfer' && (
          <SimplePanel
            title="Transfer between accounts"
            desc="Move funds instantly between your Pepperstone trading accounts in the same base currency."
          />
        )}
        {tab === 'history'  && <HistoryPanel />}
      </div>
    </AppShell>
  );
}
