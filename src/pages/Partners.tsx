import React, { useState } from 'react';
import styles from './Partners.module.css';
import AppShell from '../components/AppShell';
import Tabs, { type TabSpec } from '../components/Tabs';

const imgProgramIB       = 'https://www.figma.com/api/mcp/asset/11b74e43-0f78-40a2-bb55-8bba75c5f3f6';
const imgProgramAffiliate = 'https://www.figma.com/api/mcp/asset/d443f875-1d03-4959-98d9-909ad9f864b5';
const imgProgramMAM      = 'https://www.figma.com/api/mcp/asset/55c98bae-72b5-4ce9-87a0-8df8bc6831f1';
const imgIBHero          = 'https://www.figma.com/api/mcp/asset/064576c5-c17c-4ae7-a7e5-f47ba54faaf6';

type PartnersTab = 'individual' | 'introducing-broker';

const TABS: TabSpec<PartnersTab>[] = [
  { key: 'individual',         label: 'Individual trader'    },
  { key: 'introducing-broker', label: 'Introducing broker'   },
];

/* ─── Icons ─── */
function CheckIcon() {
  return (
    <svg className={styles.bulletCheck} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="m3 8.5 3 3 7-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HighlightIcon({ type }: { type: 'tiers' | 'reports' | 'shield' }) {
  if (type === 'tiers') return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="14" width="5" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="9.5" y="9" width="5" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="16" y="4" width="5" height="17" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
  if (type === 'reports') return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M4 4h13l3 3v13H4V4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 11h8M8 15h8M8 7h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 3 4 6v5c0 4.5 3.2 8.3 8 10 4.8-1.7 8-5.5 8-10V6l-8-3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Individual trader tab ─── */
interface Program {
  title: string;
  image: string;
  description: string;
  bullets: string[];
}

const PROGRAMS: Program[] = [
  {
    title: 'Introducing Broker',
    image: imgProgramIB,
    description:
      'Earn rebates from client trades with a multi-tiered structure and dedicated account manager support.',
    bullets: [
      'Multi-tiered rebate structure',
      'Detailed client performance analysis reports',
      'Dedicated account manager for ongoing support',
    ],
  },
  {
    title: 'Affiliate',
    image: imgProgramAffiliate,
    description:
      'Earn cost per acquisition (CPA) for every qualified client you refer and benefit from open-to-placement partnerships.',
    bullets: [
      'Multi-tiered payout structure',
      'Detailed performance reporting',
      'Dedicated affiliate account executive',
    ],
  },
  {
    title: 'Multi-Account Manager (MAM)',
    image: imgProgramMAM,
    description:
      "Introduce Pepperstone's referral program for Pro clients. Management fees with High Water Mark tracking built in.",
    bullets: [
      'Management and performance fees',
      'High Water Mark tracking built in',
      'Eligible to earn rebates',
    ],
  },
];

function IndividualTraderPanel() {
  return (
    <section className={styles.cardWrap}>
      <div className={styles.grid}>
        {PROGRAMS.map(program => (
          <article key={program.title} className={styles.programCard}>
            <img className={styles.programImage} src={program.image} alt="" />
            <div className={styles.programBody}>
              <h2 className={styles.programTitle}>{program.title}</h2>
              <p className={styles.programDesc}>{program.description}</p>
              <ul className={styles.bullets}>
                {program.bullets.map(b => (
                  <li key={b} className={styles.bullet}>
                    <CheckIcon />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button type="button" className={styles.outlineBtn}>Join now</button>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ─── Introducing broker tab ─── */
function IntroducingBrokerPanel() {
  return (
    <section className={styles.solo}>
      <div className={styles.soloLayout}>
        <div className={styles.soloContent}>
          <div className={styles.soloTitleWrap}>
            <h2 className={styles.soloTitle}>Become an Introducing Broker</h2>
            <p className={styles.soloSubtitle}>
              Refer clients and earn rebates through our Introducing Broker program.
            </p>
          </div>

          <div className={styles.highlights}>
            <div className={styles.highlight}>
              <div className={styles.highlightIcon}><HighlightIcon type="tiers" /></div>
              <p className={styles.highlightText}>Multi-tiered rebate structure</p>
            </div>
            <div className={styles.highlight}>
              <div className={styles.highlightIcon}><HighlightIcon type="reports" /></div>
              <p className={styles.highlightText}>Detailed client performance analysis reports</p>
            </div>
            <div className={styles.highlight}>
              <div className={styles.highlightIcon}><HighlightIcon type="shield" /></div>
              <p className={styles.highlightText}>Dedicated account manager for ongoing support</p>
            </div>
          </div>

          <button type="button" className={styles.primaryBtn}>
            <span>Complete application</span>
            <ArrowRight />
          </button>
        </div>

        <div className={styles.soloImage} aria-hidden="true">
          <img alt="" src={imgIBHero} />
        </div>
      </div>
    </section>
  );
}

export default function Partners(): React.ReactElement {
  const [tab, setTab] = useState<PartnersTab>('individual');

  return (
    <AppShell activeKey="partners" title="Become a partner with us">
      <div className={styles.stack}>
        <Tabs<PartnersTab> tabs={TABS} active={tab} onChange={setTab} />
        {tab === 'individual'         && <IndividualTraderPanel />}
        {tab === 'introducing-broker' && <IntroducingBrokerPanel />}
      </div>
    </AppShell>
  );
}
