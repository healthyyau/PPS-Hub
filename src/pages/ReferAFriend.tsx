import React, { useState } from 'react';
import styles from './ReferAFriend.module.css';
import AppShell from '../components/AppShell';
import Tabs, { type TabSpec } from '../components/Tabs';

/* ─── Figma asset URLs (refreshed) ─── */
// Hero image — same handshake asset used by the existing ReferFriend component
// on the Overview page (the node's "mainPhoto" asset returns a placeholder;
// the "overlay" asset is the real 4096×2233 photo).
const imgHero = 'https://www.figma.com/api/mcp/asset/13052614-7a1e-4edc-a298-8928baa578a8';

// Decorative feature icons (composite multi-image icons from Figma)
// "partner" icon — two people silhouette
const imgPartnerMain = 'https://www.figma.com/api/mcp/asset/c22079d7-ff5d-4974-9615-3964c349e561';
const imgPartnerHead = 'https://www.figma.com/api/mcp/asset/258cb284-23b0-4126-8fc0-5ffd1ef91a30';

// "24hr" icon — clock / speed
const img24hrMain = 'https://www.figma.com/api/mcp/asset/1b89e004-33b2-471b-9595-da2256368855';
const img24hrExtra = 'https://www.figma.com/api/mcp/asset/ad4d631c-7671-48e3-9ff4-0d0d6067c8a7';
const img24hrDetail = 'https://www.figma.com/api/mcp/asset/d4c98432-3380-4004-8c14-d0d8475f40ee';

// "value" icon — dollar sign with arrow
const imgValueMain  = 'https://www.figma.com/api/mcp/asset/e4788270-7866-4aa0-b45c-3c9b8641272a';
const imgValueLine  = 'https://www.figma.com/api/mcp/asset/e23cc532-6c7a-4696-b117-606af7a6faae';

const REFERRAL_LINK = 'https://trk.pepperstonepartners.com/aff_c?offer_id=367&aff_id=33155';

type ReferTab = 'link' | 'how-it-works';

const TABS: TabSpec<ReferTab>[] = [
  { key: 'link',         label: 'Referral link' },
  { key: 'how-it-works', label: 'How it works'  },
];

/* ─── Brand decorative icons (40×40 composite from Figma) ───
 * Uses absolute-positioned image layers to reproduce the Figma
 * `BrandDecorative40Px` component (icons = partner | 24hr | value).
 */
function BrandDecorative40({ icon }: { icon: 'partner' | 'share' | 'value' }) {
  const wrapStyle: React.CSSProperties = {
    position: 'relative',
    width: 40,
    height: 40,
    flexShrink: 0,
  };

  if (icon === 'partner') {
    return (
      <div style={wrapStyle} aria-hidden="true">
        <div style={{ position: 'absolute', inset: '20.13% -0.33% 4.06% 21.29%' }}>
          <div style={{ position: 'absolute', inset: '-3.3% -15.82% -29.68% -15.82%' }}>
            <img alt="" src={imgPartnerMain} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
          </div>
        </div>
        <div style={{
          position: 'absolute',
          top: 0,
          bottom: '32.14%',
          left: 'calc(50% - 6.68px)',
          transform: 'translateX(-50%)',
          aspectRatio: '49 / 47',
        }}>
          <img alt="" src={imgPartnerHead} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} />
        </div>
      </div>
    );
  }

  if (icon === 'share') {
    return (
      <div style={wrapStyle} aria-hidden="true">
        <img alt="" src={img24hrMain} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} />
        <div style={{ position: 'absolute', top: '22.5%', bottom: '7.5%', left: 10, width: 28 }}>
          <div style={{ position: 'absolute', inset: '-3.57% -17.86% -32.14% -17.86%' }}>
            <img alt="" src={img24hrExtra} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
          </div>
        </div>
        <div style={{ position: 'absolute', inset: '6.88% 51.25% 30.63% 3.75%' }}>
          <img alt="" src={img24hrDetail} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} />
        </div>
      </div>
    );
  }

  // value
  return (
    <div style={wrapStyle} aria-hidden="true">
      <div style={{ position: 'absolute', inset: '14.2% 4.8% 5.8% 15.2%' }}>
        <div style={{ position: 'absolute', inset: '-3.13% -15.63% -28.13% -15.63%' }}>
          <img alt="" src={imgValueMain} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
        </div>
      </div>
      <div style={{
        position: 'absolute',
        top: '-7.5%',
        bottom: '49.89%',
        left: 0,
        right: '37.45%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ width: '77%', height: '123%', transform: 'rotate(42.65deg) skewX(-4.71deg)' }}>
          <img alt="" src={imgValueLine} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} />
        </div>
      </div>
    </div>
  );
}

function CopyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="5" y="5" width="9" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 13V4a2 2 0 0 1 2-2h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ─── Referral link tab content ─── */
function ReferralLinkPanel() {
  const [copied, setCopied] = useState(false);

  function copyLink() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(REFERRAL_LINK).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }

  return (
    <section className={styles.card}>
      <div className={styles.layout}>
        <div className={styles.content}>
          <div className={styles.titleBlock}>
            <h2 className={styles.title}>
              Earn rewards up to <span className={styles.titleAccent}>5,000 AUD</span>
            </h2>
            <p className={styles.subtitle}>
              Share your unique referral link and earn a volume based cash reward when your friends join
              and begin trading.
            </p>
          </div>

          <div className={styles.features}>
            <div className={styles.featureRow}>
              <BrandDecorative40 icon="partner" />
              <div className={styles.featureCopy}>
                <p className={styles.featureTitle}>Get rewarded for each qualified referral</p>
                <p className={styles.featureDesc}>
                  Earn cash rewards for up to 5 friends who sign up, meet eligibility criteria,
                  and start trading.
                </p>
              </div>
            </div>

            <div className={styles.featureRow}>
              <BrandDecorative40 icon="share" />
              <div className={styles.featureCopy}>
                <p className={styles.featureTitle}>Share in seconds</p>
                <p className={styles.featureDesc}>
                  Share one unique link. When your friend signs up through it, they&rsquo;re automatically
                  linked to your referral.
                </p>
              </div>
            </div>

            <div className={styles.featureRow}>
              <BrandDecorative40 icon="value" />
              <div className={styles.featureCopy}>
                <p className={styles.featureTitle}>Built-in eligibility checks</p>
                <p className={styles.featureDesc}>
                  Referrals are reviewed against programme criteria before rewards are paid,
                  helping ensure fair and accurate payouts.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.linkSection}>
            <div className={styles.linkInput}>{REFERRAL_LINK}</div>
            <button type="button" className={styles.copyBtn} onClick={copyLink}>
              <span>{copied ? 'Copied!' : 'Copy'}</span>
              <CopyIcon />
            </button>
          </div>

          <div className={styles.legal}>
            <p className={styles.legalTitle}>Terms and conditions</p>
            <p className={styles.legalBody}>
              You will only receive rewards when the person you&rsquo;ve referred has successfully signed up
              as Pepperstone Pro. Read our detailed{' '}
              <a href="#" className={styles.legalLink}>terms and conditions</a> for more information.
            </p>
          </div>
        </div>

        <div className={styles.image} aria-hidden="true">
          <img alt="" src={imgHero} />
        </div>
      </div>
    </section>
  );
}

/* ─── How-it-works tab content ─── */
interface TierMarket {
  market: string;
  lots: string;
  converted: string;
}

const TIER_1_MARKETS: TierMarket[] = [
  { market: 'Forex',       lots: '200 lots',  converted: '≈25M AUD'   },
  { market: 'Commodities', lots: '200 lots',  converted: '≈95M AUD'   },
  { market: 'Indices',     lots: '400 lots',  converted: '≈17.3M AUD' },
];

const TIER_2_MARKETS: TierMarket[] = [
  { market: 'Forex',       lots: '400 lots',   converted: '≈76M AUD'   },
  { market: 'Commodities', lots: '4,000 lots', converted: '≈190M AUD'  },
  { market: 'Indices',     lots: '850 lots',   converted: '≈34.7M AUD' },
];

function TierCard({
  tier,
  amount,
  markets,
}: {
  tier: 1 | 2;
  amount: string;
  markets: TierMarket[];
}) {
  const isTier2 = tier === 2;
  return (
    <div className={styles.tierCard}>
      <div className={`${styles.tierHead}${isTier2 ? ` ${styles.tierHeadTier2}` : ''}`}>
        <span className={styles.tierLabel}>Reward</span>
        <span className={styles.tierSub}>You and your friend will get</span>
        <span className={`${styles.tierAmount}${isTier2 ? ` ${styles.tierAmountTier2}` : ''}`}>
          {amount}
        </span>
        <span className={`${styles.tierBadge}${isTier2 ? ` ${styles.tierBadgeTier2}` : ''}`}>
          Tier {tier}
        </span>
      </div>
      <div className={styles.tierBody}>
        <div className={styles.tierBodyHead}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" />
            <path d="M4 6l1.5 1.5L8 4.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Trade any market below</span>
        </div>
        {markets.map(m => (
          <div key={m.market} className={styles.tierMarketRow}>
            <span className={styles.tierChip}>{m.market}</span>
            <div className={styles.tierNumbers}>
              <span className={styles.tierLots}>{m.lots} /</span>
              <span className={styles.tierConverted}>{m.converted}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HowItWorksPanel() {
  return (
    <section className={styles.card}>
      <div className={styles.layout}>
        <div className={styles.content}>
          <div className={styles.titleBlock}>
            <h2 className={styles.title}>How it works</h2>
            <p className={styles.subtitle}>
              You&rsquo;ll receive the following reward when your friend trades on a newly opened Pro
              account with us.
            </p>
          </div>

          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepBullet}>1</div>
              <div className={styles.stepBody}>
                <p className={styles.stepTitle}>Sign up</p>
                <p className={styles.stepDesc}>
                  Register using the referral link and create a Pepperstone Pro account.
                </p>
              </div>
            </div>

            <div className={styles.stepSpacer} />

            <div className={styles.step}>
              <div className={styles.stepBullet}>2</div>
              <div className={styles.stepBody}>
                <p className={styles.stepTitle}>Make a deposit</p>
                <p className={styles.stepDesc}>
                  Once approved, deposit AUD 10,000 within 90 days.
                </p>
              </div>
            </div>

            <div className={styles.stepSpacer} />

            <div className={styles.step}>
              <div className={styles.stepBullet}>3</div>
              <div className={styles.stepBody}>
                <p className={styles.stepTitle}>Fulfil the requirements</p>
                <p className={styles.stepDesc}>
                  Choose from any of the eligible markets (Forex, Commodities or Indices) and trade up
                  to the volume required within 90 days.
                </p>
                <div className={styles.tierTable}>
                  <TierCard tier={1} amount="2,500 AUD" markets={TIER_1_MARKETS} />
                  <TierCard tier={2} amount="5,000 AUD" markets={TIER_2_MARKETS} />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.legal}>
            <p className={styles.legalTitle}>Questions?</p>
            <p className={styles.legalBody}>
              We have answers — <a href="#" className={styles.legalLink}>learn more about our referral rewards</a>.
            </p>
          </div>
        </div>

        <div className={styles.image} aria-hidden="true">
          <img alt="" src={imgHero} />
        </div>
      </div>
    </section>
  );
}

export default function ReferAFriendPage(): React.ReactElement {
  const [tab, setTab] = useState<ReferTab>('link');

  return (
    <AppShell activeKey="refer-a-friend" title="Refer a friend">
      <div className={styles.stack}>
        <Tabs<ReferTab> tabs={TABS} active={tab} onChange={setTab} />
        {tab === 'link'         && <ReferralLinkPanel />}
        {tab === 'how-it-works' && <HowItWorksPanel />}
      </div>
    </AppShell>
  );
}
