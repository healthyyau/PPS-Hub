import React, { useState } from 'react';
import styles from './ProfileSettings.module.css';
import AppShell from '../components/AppShell';
import Tabs, { type TabSpec } from '../components/Tabs';

type SettingsTab =
  | 'personal'
  | 'inbox'
  | 'bank-accounts'
  | 'payment-methods'
  | 'two-factor';

const TABS: TabSpec<SettingsTab>[] = [
  { key: 'personal',        label: 'Personal information'     },
  { key: 'inbox',           label: 'Inbox'                    },
  { key: 'bank-accounts',   label: 'Bank accounts'            },
  { key: 'payment-methods', label: 'Saved payment methods'    },
  { key: 'two-factor',      label: 'Two-step verification'    },
];

/* ─── Field (label + input) ─── */
function Field({
  label,
  value,
  onChange,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  type?: string;
}) {
  return (
    <label className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      <input
        className={styles.fieldInput}
        type={type}
        value={value}
        onChange={e => onChange?.(e.target.value)}
      />
    </label>
  );
}

/* ─── Toggle ─── */
function Toggle({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <div className={styles.toggleRow}>
      <p className={styles.toggleLabel}>{label}</p>
      <button
        type="button"
        role="switch"
        aria-checked={value}
        className={`${styles.toggle}${value ? ` ${styles.toggleOn}` : ''}`}
        onClick={() => onChange(!value)}
      >
        <span className={`${styles.toggleHandle}${value ? ` ${styles.toggleHandleOn}` : ''}`} />
      </button>
    </div>
  );
}

/* ─── Personal information tab ─── */
function PersonalInformationPanel() {
  const [firstName, setFirstName]   = useState('Healthy');
  const [lastName,  setLastName]    = useState('Yau');
  const [mobile,    setMobile]      = useState('********0010');
  const [email,     setEmail]       = useState('healthyyau@pepperstone.com');
  const [password,  setPassword]    = useState('********');
  const [address,   setAddress]     = useState("Blg 21, Beale St., B.B. King's Blues Club, TN, Memphis");
  const [postcode,  setPostcode]    = useState('38103');
  const [state,     setState]       = useState('United States');
  const [country,   setCountry]     = useState('United States');
  const [pro,       setPro]         = useState(false);

  return (
    <>
      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Basic information</h2>
          <p className={styles.cardSubtitle}>
            Keep your personal details up to date so we can contact you and process requests without
            delay.{' '}
            <a href="#" className={styles.cardLink}>Learn more</a>
          </p>
        </div>

        <div className={styles.form}>
          <div className={styles.row}>
            <Field label="First name" value={firstName} onChange={setFirstName} />
            <Field label="Last name"  value={lastName}  onChange={setLastName} />
          </div>
          <div className={styles.row}>
            <Field label="Mobile number" value={mobile} onChange={setMobile} />
            <Field label="Email"         value={email}  onChange={setEmail} type="email" />
          </div>
          <div className={styles.row}>
            <Field label="Password" value={password} onChange={setPassword} type="password" />
            <Field label="Address"  value={address}  onChange={setAddress} />
          </div>
          <div className={styles.row}>
            <Field label="Postcode"      value={postcode} onChange={setPostcode} />
            <Field label="State/Region"  value={state}    onChange={setState} />
          </div>
          <div className={styles.row}>
            <Field label="Country"       value={country}  onChange={setCountry} />
            <div />
          </div>
        </div>

        <button type="button" className={styles.primaryBtn}>Save changes</button>
      </section>

      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Pepperstone Pro</h2>
        </div>

        <div className={styles.form}>
          <Toggle
            value={pro}
            onChange={setPro}
            label="Professional Client Funds Usage"
          />
        </div>

        <button type="button" className={styles.primaryBtn}>Save changes</button>
      </section>
    </>
  );
}

/* ─── Other tabs: placeholder panels ─── */
function PlaceholderPanel({ title, desc }: { title: string; desc: string }) {
  return (
    <section className={styles.placeholder}>
      <h2 className={styles.placeholderTitle}>{title}</h2>
      <p className={styles.placeholderDesc}>{desc}</p>
    </section>
  );
}

export default function ProfileSettings(): React.ReactElement {
  const [tab, setTab] = useState<SettingsTab>('personal');

  return (
    <AppShell activeKey="profile-settings" title="Settings">
      <div className={styles.stack}>
        <Tabs<SettingsTab> tabs={TABS} active={tab} onChange={setTab} />

        {tab === 'personal'        && <PersonalInformationPanel />}
        {tab === 'inbox'           && (
          <PlaceholderPanel
            title="Inbox"
            desc="Messages from our team, platform updates, and important notifications about your account."
          />
        )}
        {tab === 'bank-accounts'   && (
          <PlaceholderPanel
            title="Bank accounts"
            desc="Manage linked bank accounts used for deposits and withdrawals."
          />
        )}
        {tab === 'payment-methods' && (
          <PlaceholderPanel
            title="Saved payment methods"
            desc="Cards and e-wallets saved for faster deposits."
          />
        )}
        {tab === 'two-factor'      && (
          <PlaceholderPanel
            title="Two-step verification"
            desc="Add an extra layer of security to your account by requiring a verification code at sign-in."
          />
        )}
      </div>
    </AppShell>
  );
}
