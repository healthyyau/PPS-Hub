import { useState } from 'react';
import styles from './AddAccountDrawer.module.css';

/* ─── Figma asset URLs ─── */
const imgMT5Icon     = 'https://www.figma.com/api/mcp/asset/3394d238-926a-4bef-8293-c0b12aa06789';
const imgMT4Icon     = 'https://www.figma.com/api/mcp/asset/679c0d5c-a8a3-481b-92e7-dbc307f744f5';
const imgPepperIcon  = 'https://www.figma.com/api/mcp/asset/811de055-a4ac-4e62-8dae-d79b1f5ffbba';
const imgCTraderIcon = 'https://www.figma.com/api/mcp/asset/53c786cc-89fb-445e-a0d7-1b6020287843';
const imgTVIcon      = 'https://www.figma.com/api/mcp/asset/ab6f63b0-5f1f-4563-9fa8-5784802ea67b';
const imgRazorIcon   = 'https://www.figma.com/api/mcp/asset/367d7ea3-cd66-4e68-9fcb-809fb6a1c035';
const imgCaretDown   = 'https://www.figma.com/api/mcp/asset/620d5571-b142-47f5-aa94-d0752d70218f';
const imgCaretLeft   = 'https://www.figma.com/api/mcp/asset/25221c4f-855a-4513-accd-cf88a26d428c';

type Platform = 'MT5' | 'MT4' | 'Pepperstone' | 'cTrader' | 'TradingView';
type AccountType = 'Standard' | 'Razor';

interface PlatformItem {
  id: Platform;
  name: string;
  desc: string;
  iconSrc: string;
  iconInset?: string;
}

const PLATFORMS: PlatformItem[] = [
  {
    id: 'MT5',
    name: 'MetaTrader5',
    desc: 'Multiple asset types, enhanced charting tools, integrated economic calendar, and algorithmic trading capabilities',
    iconSrc: imgMT5Icon,
  },
  {
    id: 'MT4',
    name: 'MetaTrader4',
    desc: 'Robust charting tools, automated trading systems, and customisable interface',
    iconSrc: imgMT4Icon,
  },
  {
    id: 'Pepperstone',
    name: 'Pepperstone',
    desc: 'Multiple charting options, demo accounts, and robust risk management features',
    iconSrc: imgPepperIcon,
    iconInset: '6.25% 0 3.86% 0',
  },
  {
    id: 'cTrader',
    name: 'cTrader',
    desc: 'Advanced charting tools, Level II pricing, and automation capabilities',
    iconSrc: imgCTraderIcon,
  },
  {
    id: 'TradingView',
    name: 'TradingView',
    desc: 'Advanced charting tools, vast social network, customizable indicators via Pine Script, and mobile trading capabilities',
    iconSrc: imgTVIcon,
    iconInset: '25% 0 25% 0',
  },
];

/* ─── Info icon ─── */
function InfoIcon() {
  return (
    <span className={styles.infoIcon}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M7 6.5v4M7 4.5v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </span>
  );
}

/* ─── Standard account icon (bar chart) ─── */
function StandardIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="14" width="4" height="7" rx="1" fill="var(--color-text-secondary)" />
      <rect x="10" y="10" width="4" height="11" rx="1" fill="var(--color-text-secondary)" />
      <rect x="17" y="5" width="4" height="16" rx="1" fill="var(--color-background-bg-primary-default)" />
    </svg>
  );
}

interface AddAccountDrawerProps {
  onClose: () => void;
}

export default function AddAccountDrawer({ onClose }: AddAccountDrawerProps) {
  const [platform, setPlatform] = useState<Platform>('MT5');
  const [accountType, setAccountType] = useState<AccountType>('Razor');

  const passwordLabel =
    platform === 'MT5' ? 'MetaTrader 5 Password'
    : platform === 'MT4' ? 'MetaTrader 4 Password'
    : `${platform} Password`;

  return (
    <div className={styles.drawer}>
      <div className={styles.drawerScroll}>
      <div className={styles.drawerInner}>

        {/* ─── Header ─── */}
        <div className={styles.header}>
          <button className={styles.backBtn} aria-label="Close drawer" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h2 className={styles.drawerTitle}>Create account</h2>
        </div>

        {/* ─── Body ─── */}
        <div className={styles.body}>

          {/* Subtitle */}
          <p className={styles.subtitle}>
            Not ready to trade with your own funds? Try trading with a{' '}
            <span className={styles.subtitleLink}>demo account</span>
            {' '}to practice first
          </p>

          {/* ─── Trading platform ─── */}
          <div className={styles.sectionBlock}>
            <div className={styles.sectionLabel}>
              <span className={styles.sectionLabelText}>Trading platform</span>
              <InfoIcon />
            </div>

            <div className={styles.platformOptions}>
              {PLATFORMS.map(p => (
                <button
                  key={p.id}
                  className={`${styles.platformOption}${platform === p.id ? ` ${styles.platformOptionSelected}` : ''}`}
                  onClick={() => setPlatform(p.id)}
                >
                  <div className={styles.platformIconWrap}>
                    {p.iconInset ? (
                      <div style={{ position: 'absolute', inset: p.iconInset }}>
                        <img
                          alt=""
                          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }}
                          src={p.iconSrc}
                        />
                      </div>
                    ) : (
                      <img
                        alt=""
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }}
                        src={p.iconSrc}
                      />
                    )}
                  </div>

                  <div className={styles.platformInfo}>
                    <span className={styles.platformName}>{p.name}</span>
                    <span className={styles.platformDesc}>{p.desc}</span>
                  </div>

                  <div className={`${styles.radioBtn}${platform === p.id ? ` ${styles.radioBtnSelected}` : ''}`}>
                    {platform === p.id && <div className={styles.radioInner} />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* ─── Account type ─── */}
          <div className={styles.sectionBlock}>
            <div>
              <div className={styles.sectionLabel}>
                <span className={styles.sectionLabelText}>Account type</span>
                <InfoIcon />
              </div>
              <p className={styles.sectionHint}>Change this anytime in your settings</p>
            </div>

            <div className={styles.accountTypeRow}>
              {/* Standard */}
              <button
                className={`${styles.accountTypeCard}${accountType === 'Standard' ? ` ${styles.accountTypeCardSelected}` : ''}`}
                onClick={() => setAccountType('Standard')}
              >
                <span className={`${styles.accountTypeBadge} ${styles.accountTypeBadgeStandard}`}>
                  Low-volume traders
                </span>
                <div className={styles.accountTypeCardInner}>
                  <div style={{ flexShrink: 0 }}>
                    <StandardIcon />
                  </div>
                  <div className={styles.accountTypeInfo}>
                    <p className={styles.accountTypeName}>Standard</p>
                    <p className={styles.accountTypeDesc}>
                      Zero commission fees. Spreads from 1 pip cover all your trading costs.
                    </p>
                  </div>
                </div>
              </button>

              {/* Razor */}
              <button
                className={`${styles.accountTypeCard}${accountType === 'Razor' ? ` ${styles.accountTypeCardSelected}` : ''}`}
                onClick={() => setAccountType('Razor')}
              >
                <span className={`${styles.accountTypeBadge} ${styles.accountTypeBadgeRazor}`}>
                  High-volume traders
                </span>
                <div className={styles.accountTypeCardInner}>
                  <div style={{ position: 'relative', width: 24, height: 24, flexShrink: 0, overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', inset: '2.5% 2.5% 5.63% 5.63%' }}>
                      <img
                        alt=""
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }}
                        src={imgRazorIcon}
                      />
                    </div>
                  </div>
                  <div className={styles.accountTypeInfo}>
                    <p className={styles.accountTypeName}>Razor *</p>
                    <p className={styles.accountTypeDesc}>
                      Flat-rate commissions per lot. Raw spreads from 0.0 pips.
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* ─── Form fields ─── */}
          <div className={styles.formBlock}>
            {/* Trading currency */}
            <div className={styles.fieldInput}>
              <div className={styles.fieldContent}>
                <span className={styles.fieldLabel}>Trading currency</span>
                <span className={styles.fieldValue}>USD</span>
              </div>
              <div className={styles.chevronWrap}>
                <img
                  alt=""
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }}
                  src={imgCaretDown}
                />
              </div>
            </div>

            {/* Leverage */}
            <div className={styles.fieldInput}>
              <div className={styles.fieldContent}>
                <span className={styles.fieldLabel}>Leverage</span>
                <span className={styles.fieldValue}>1:500</span>
              </div>
              <div className={styles.chevronWrap}>
                <img
                  alt=""
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }}
                  src={imgCaretDown}
                />
              </div>
            </div>

            {/* Platform password */}
            <div className={styles.fieldInput}>
              <div className={styles.fieldContent}>
                <span className={styles.fieldPlaceholder}>{passwordLabel}</span>
              </div>
            </div>

            {/* Nickname */}
            <div className={styles.fieldInput}>
              <div className={styles.fieldContent}>
                <span className={styles.fieldPlaceholder}>Nickname (optional)</span>
              </div>
            </div>
          </div>

          {/* ─── Create button ─── */}
          <button className={styles.createBtn} onClick={onClose}>
            Create
          </button>

        </div>
      </div>
      </div>
    </div>
  );
}
