import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './TradingAccounts.module.css';

const imgUSFlag = 'https://www.figma.com/api/mcp/asset/50055e42-cf72-4cc4-9f7d-b53c267a21c7';
const imgHKFlag = 'https://www.figma.com/api/mcp/asset/a4a873c7-e756-4067-9c77-9f4bf5fe54f7';
const imgPepperstoneTagIcon = 'https://www.figma.com/api/mcp/asset/1e3b89c1-68c1-4cfe-8bd3-feff8945cc8e';
const imgMT5TagIcon = 'https://www.figma.com/api/mcp/asset/91f48d0c-d448-4b9c-829a-ac5d6fbc219c';
const imgTradingViewTagIcon = 'https://www.figma.com/api/mcp/asset/7ad1821d-762b-47d4-a987-f8afcb97f334';
const imgTradeArrow = 'https://www.figma.com/api/mcp/asset/6dcad085-de88-4804-b96d-a5c29ad17d8d';
const imgTradeUnion = 'https://www.figma.com/api/mcp/asset/63516999-7c88-47dc-8b7f-b2a51bb6fe8a';

interface Account {
  name: string;
  accountId: string;
  balance: string;
  currency: string;
  flagSrc: string;
  mode: 'Live' | 'Demo';
  accountType: string;
  leverage: string;
  platform: string;
  platformIcon: string;
}

const ACCOUNTS: Account[] = [
  { name: 'J.D.Acc 01', accountId: '55790001', balance: '12,450.00', currency: 'USD', flagSrc: imgUSFlag,  mode: 'Live', accountType: 'Standard', leverage: '1:500',  platform: 'Pepperstone', platformIcon: imgPepperstoneTagIcon },
  { name: 'J.D.Acc 02', accountId: '55790012', balance: '3,800.00',  currency: 'USD', flagSrc: imgUSFlag,  mode: 'Live', accountType: 'Razor',    leverage: '1:200',  platform: 'MT5',         platformIcon: imgMT5TagIcon },
  { name: 'J.D.Acc 03', accountId: '55791241', balance: '8,200.00',  currency: 'HKD', flagSrc: imgHKFlag,  mode: 'Live', accountType: 'Standard', leverage: '1:500',  platform: 'TradingView', platformIcon: imgTradingViewTagIcon },
  { name: 'J.D.Acc 04', accountId: '55792388', balance: '0.00',      currency: 'USD', flagSrc: imgUSFlag,  mode: 'Live', accountType: 'Razor',    leverage: '1:100',  platform: 'Pepperstone', platformIcon: imgPepperstoneTagIcon },
  { name: 'J.D.Acc 05', accountId: '55793512', balance: '50,000.00', currency: 'USD', flagSrc: imgUSFlag,  mode: 'Demo', accountType: 'Razor',    leverage: '1:1000', platform: 'MT5',         platformIcon: imgMT5TagIcon },
  { name: 'J.D.Acc 06', accountId: '55794677', balance: '100,000.00',currency: 'HKD', flagSrc: imgHKFlag,  mode: 'Demo', accountType: 'Standard', leverage: '1:500',  platform: 'TradingView', platformIcon: imgTradingViewTagIcon },
];

/* ─── More dropdown menu ─── */
const MORE_MENU_ITEMS = [
  {
    label: 'Withdraw',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 11V3M4 7l4-4 4 4M2 13h12" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Change leverage',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 8h12M2 4h6M8 12h6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        <circle cx="10" cy="8" r="1.5" fill="currentColor" />
        <circle cx="4" cy="4" r="1.5" fill="currentColor" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Change account type',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 5h10M2 8h7M2 11h4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        <path d="M12 9l2 2-2 2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Change nickname',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M11 2.5a1.5 1.5 0 0 1 2.121 2.121L5.5 12.243 2 13.5l1.257-3.5L11 2.5Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Update password',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
        <path d="M5 7V5a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        <circle cx="8" cy="10.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
];

function MoreMenu({ size, items = MORE_MENU_ITEMS }: { size?: 'sm'; items?: typeof MORE_MENU_ITEMS }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const isList = size === 'sm';

  useEffect(() => {
    if (!open) return;
    function handleOutside(e: MouseEvent) {
      const t = e.target as Node;
      if (!wrapRef.current?.contains(t) && !dropdownRef.current?.contains(t)) setOpen(false);
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [open]);

  useLayoutEffect(() => {
    if (!open || !isList) return;
    const update = () => {
      if (btnRef.current) setRect(btnRef.current.getBoundingClientRect());
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [open, isList]);

  const dropdown = (
    <div
      ref={dropdownRef}
      className={styles.moreDropdown}
      style={isList && rect ? {
        position: 'fixed',
        top: rect.bottom + 6,
        right: window.innerWidth - rect.right,
      } : undefined}
    >
      {items.map(item => (
        <button
          key={item.label}
          className={styles.moreMenuItem}
          onClick={() => setOpen(false)}
        >
          <span className={styles.moreMenuIcon}>{item.icon}</span>
          <span className={styles.moreMenuLabel}>{item.label}</span>
        </button>
      ))}
    </div>
  );

  return (
    <div className={styles.moreWrap} ref={wrapRef}>
      <button
        ref={btnRef}
        className={isList ? styles.moreBtnSm : styles.moreBtn}
        aria-label="More options"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="3" cy="8" r="1.5" fill="currentColor" />
          <circle cx="8" cy="8" r="1.5" fill="currentColor" />
          <circle cx="13" cy="8" r="1.5" fill="currentColor" />
        </svg>
      </button>

      {open && (isList
        ? (rect && createPortal(dropdown, document.body))
        : dropdown
      )}
    </div>
  );
}

function TradeBtn({ small }: { small?: boolean }) {
  return (
    <button className={small ? styles.tradeBtnSm : styles.tradeBtn}>
      <span>Trade</span>
      <div className={styles.tradeIconWrap}>
        <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgTradeArrow} />
        <div style={{ position: 'absolute', inset: '18.13% 11.88%' }}>
          <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgTradeUnion} />
        </div>
      </div>
    </button>
  );
}

/* ─── Grid card ─── */
function AccountCard({ account }: { account: Account }) {
  const { name, accountId, balance, currency, flagSrc, mode, accountType, leverage, platform, platformIcon } = account;
  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <div className={styles.cardLabel}>
          <div className={styles.accountName}>
            <div className={styles.flagBadge}>
              <div className={styles.flagWrap}>
                <img alt="" className={styles.flagImg} src={flagSrc} />
              </div>
            </div>
            <span className={styles.nameText}>{name}</span>
          </div>
          <span className={styles.accountId}>{accountId}</span>
        </div>

        <div className={styles.balanceCard}>
          <div className={styles.balanceRow}>
            <span className={styles.balanceAmount}>{balance}</span>
            <span className={styles.balanceCurrency}>{currency}</span>
          </div>
          <div className={styles.tagsRow}>
            <div className={mode === 'Live' ? styles.tagLive : styles.tagNeutral}>
              <span className={mode === 'Live' ? styles.tagTextLive : styles.tagTextNeutral}>{mode}</span>
            </div>
            <div className={styles.tagNeutral}>
              <span className={styles.tagTextNeutral}>{accountType}</span>
            </div>
            <div className={styles.tagNeutral}>
              <span className={styles.tagTextNeutral}>{leverage}</span>
            </div>
            <div className={styles.tagNeutral}>
              <span className={styles.tagTextNeutral}>{platform}</span>
              <div className={styles.tagIconWrap}>
                <img alt="" className={styles.tagIcon} src={platformIcon} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.cta}>
        <TradeBtn />
        <button className={styles.depositBtn}>Deposit</button>
        <MoreMenu />
      </div>
    </div>
  );
}

/* ─── List row ─── */
function AccountRow({ account }: { account: Account }) {
  const { name, accountId, balance, currency, flagSrc, mode, platform, platformIcon, leverage } = account;
  const [rowMoreOpen, setRowMoreOpen] = useState(false);
  const rowMoreRef = useRef<HTMLDivElement>(null);
  const rowMoreBtnRef = useRef<HTMLButtonElement>(null);
  const rowMoreDropdownRef = useRef<HTMLDivElement>(null);
  const [rowMoreRect, setRowMoreRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!rowMoreOpen) return;
    function handleOutside(e: MouseEvent) {
      const t = e.target as Node;
      if (!rowMoreRef.current?.contains(t) && !rowMoreDropdownRef.current?.contains(t)) setRowMoreOpen(false);
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [rowMoreOpen]);

  useLayoutEffect(() => {
    if (!rowMoreOpen) return;
    const update = () => {
      if (rowMoreBtnRef.current) setRowMoreRect(rowMoreBtnRef.current.getBoundingClientRect());
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [rowMoreOpen]);

  return (
    <div className={styles.listRow}>
      <div className={styles.listCellName}>
        <div className={styles.listFlag}>
          <img alt="" className={styles.flagImg} src={flagSrc} />
        </div>
        <div className={styles.listAccountInfo}>
          <span className={styles.listAccountId}>{accountId}</span>
          <span className={styles.listAccountName}>{name}</span>
        </div>
      </div>

      <div className={styles.listCell}>
        <span className={styles.listCellText}>{balance} {currency}</span>
      </div>

      <div className={styles.listCell}>
        <div className={mode === 'Live' ? styles.tagLive : styles.tagNeutral}>
          <span className={mode === 'Live' ? styles.tagTextLive : styles.tagTextNeutral}>{mode}</span>
        </div>
      </div>

      <div className={styles.listCellPlatform}>
        <div className={styles.listPlatformIcon}>
          <img alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} src={platformIcon} />
        </div>
        <span className={styles.listPlatformName}>{platform}</span>
      </div>

      <div className={styles.listCell}>
        <span className={styles.listCellText}>{leverage}</span>
      </div>

      <div className={styles.listCellActions}>
        <TradeBtn small />

        {/* Wide layout: Deposit + Withdraw inline + MoreMenu */}
        <div className={styles.listActionsFullGroup}>
          <button className={styles.listActionBtn}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v9M4 7l4 4 4-4M2 14h12" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Deposit</span>
          </button>
          <button className={styles.listActionBtn}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 14V5M4 9l4-4 4 4M2 2h12" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Withdraw</span>
          </button>
          <MoreMenu size="sm" items={MORE_MENU_ITEMS.filter(i => i.label !== 'Withdraw')} />
        </div>

        {/* Compact layout: single … button with all actions */}
        <div className={`${styles.moreWrap} ${styles.listActionsCompactMore}`} ref={rowMoreRef}>
          <button
            ref={rowMoreBtnRef}
            className={styles.moreBtnSm}
            aria-label="More options"
            aria-expanded={rowMoreOpen}
            onClick={() => setRowMoreOpen(o => !o)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="3" cy="8" r="1.5" fill="currentColor" />
              <circle cx="8" cy="8" r="1.5" fill="currentColor" />
              <circle cx="13" cy="8" r="1.5" fill="currentColor" />
            </svg>
          </button>
          {rowMoreOpen && rowMoreRect && createPortal(
            <div
              ref={rowMoreDropdownRef}
              className={styles.moreDropdown}
              style={{
                position: 'fixed',
                top: rowMoreRect.bottom + 6,
                right: window.innerWidth - rowMoreRect.right,
              }}
            >
              <button className={styles.moreMenuItem} onClick={() => setRowMoreOpen(false)}>
                <span className={styles.moreMenuIcon}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2v9M4 7l4 4 4-4M2 14h12" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className={styles.moreMenuLabel}>Deposit</span>
              </button>
              {MORE_MENU_ITEMS.map(item => (
                <button key={item.label} className={styles.moreMenuItem} onClick={() => setRowMoreOpen(false)}>
                  <span className={styles.moreMenuIcon}>{item.icon}</span>
                  <span className={styles.moreMenuLabel}>{item.label}</span>
                </button>
              ))}
            </div>,
            document.body
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Main component ─── */
interface TradingAccountsProps {
  onAddAccount?: () => void;
  isDrawerOpen?: boolean;
}

export default function TradingAccounts({ onAddAccount, isDrawerOpen }: TradingAccountsProps) {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [modeFilter, setModeFilter] = useState<'Live' | 'Demo'>('Live');
  const [controlsMenuOpen, setControlsMenuOpen] = useState(false);
  const controlsMenuRef = useRef<HTMLDivElement>(null);

  const visibleAccounts = ACCOUNTS.filter(a => a.mode === modeFilter);

  useEffect(() => {
    if (!controlsMenuOpen) return;
    function handleOutside(e: MouseEvent) {
      if (controlsMenuRef.current && !controlsMenuRef.current.contains(e.target as Node)) {
        setControlsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [controlsMenuOpen]);

  return (
    <section className={`${styles.section}${isDrawerOpen ? ` ${styles.sectionCompact}` : ''}`}>
      <div className={styles.titleRow}>
        <div className={styles.titleLeft}>
          <h2 className={styles.sectionTitle}>My trading accounts</h2>
        </div>
        <div className={styles.controls}>
          <div className={styles.viewToggle}>
            <button
              className={`${styles.viewBtnIcon}${view === 'list' ? ` ${styles.viewBtnActive}` : ''}`}
              aria-label="List view"
              onClick={() => setView('list')}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="3" width="12" height="2" rx="1" fill="currentColor" />
                <rect x="2" y="7" width="12" height="2" rx="1" fill="currentColor" />
                <rect x="2" y="11" width="12" height="2" rx="1" fill="currentColor" />
              </svg>
            </button>
            <button
              className={`${styles.viewBtnIcon}${view === 'grid' ? ` ${styles.viewBtnActive}` : ''}`}
              aria-label="Grid view"
              onClick={() => setView('grid')}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="2" width="5" height="5" rx="1" fill="currentColor" />
                <rect x="9" y="2" width="5" height="5" rx="1" fill="currentColor" />
                <rect x="2" y="9" width="5" height="5" rx="1" fill="currentColor" />
                <rect x="9" y="9" width="5" height="5" rx="1" fill="currentColor" />
              </svg>
            </button>
          </div>

          <div className={styles.liveToggle}>
            <button
              className={modeFilter === 'Live' ? styles.liveBtn : styles.demoBtn}
              onClick={() => setModeFilter('Live')}
            >Live</button>
            <button
              className={modeFilter === 'Demo' ? styles.liveBtn : styles.demoBtn}
              onClick={() => setModeFilter('Demo')}
            >Demo</button>
          </div>

          <div className={styles.controlDivider} />

          <button className={styles.addAccountBtn} onClick={() => onAddAccount?.()}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span>Add account</span>
          </button>
        </div>

        {/* Collapsed controls — shown when drawer is open or on narrow screens */}
        <div className={styles.controlsMoreWrap} ref={controlsMenuRef}>
          <button
            className={`${styles.controlsMoreBtn}${controlsMenuOpen ? ` ${styles.controlsMoreBtnActive}` : ''}`}
            aria-label="More options"
            aria-expanded={controlsMenuOpen}
            onClick={() => setControlsMenuOpen(o => !o)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="3" cy="8" r="1.5" fill="currentColor" />
              <circle cx="8" cy="8" r="1.5" fill="currentColor" />
              <circle cx="13" cy="8" r="1.5" fill="currentColor" />
            </svg>
          </button>

          {controlsMenuOpen && (
            <div className={styles.controlsDropdown}>
              {/* View toggle row */}
              <div className={styles.cdSection}>
                <span className={styles.cdLabel}>View</span>
                <div className={styles.viewToggle}>
                  <button
                    className={`${styles.viewBtnIcon}${view === 'list' ? ` ${styles.viewBtnActive}` : ''}`}
                    aria-label="List view"
                    onClick={() => { setView('list'); setControlsMenuOpen(false); }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <rect x="2" y="3" width="12" height="2" rx="1" fill="currentColor" />
                      <rect x="2" y="7" width="12" height="2" rx="1" fill="currentColor" />
                      <rect x="2" y="11" width="12" height="2" rx="1" fill="currentColor" />
                    </svg>
                  </button>
                  <button
                    className={`${styles.viewBtnIcon}${view === 'grid' ? ` ${styles.viewBtnActive}` : ''}`}
                    aria-label="Grid view"
                    onClick={() => { setView('grid'); setControlsMenuOpen(false); }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <rect x="2" y="2" width="5" height="5" rx="1" fill="currentColor" />
                      <rect x="9" y="2" width="5" height="5" rx="1" fill="currentColor" />
                      <rect x="2" y="9" width="5" height="5" rx="1" fill="currentColor" />
                      <rect x="9" y="9" width="5" height="5" rx="1" fill="currentColor" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className={styles.cdDivider} />

              {/* Live / Demo toggle row */}
              <div className={styles.cdSection}>
                <span className={styles.cdLabel}>Mode</span>
                <div className={styles.liveToggle}>
                  <button
                    className={modeFilter === 'Live' ? styles.liveBtn : styles.demoBtn}
                    onClick={() => { setModeFilter('Live'); setControlsMenuOpen(false); }}
                  >Live</button>
                  <button
                    className={modeFilter === 'Demo' ? styles.liveBtn : styles.demoBtn}
                    onClick={() => { setModeFilter('Demo'); setControlsMenuOpen(false); }}
                  >Demo</button>
                </div>
              </div>

              <div className={styles.cdDivider} />

              {/* Add account */}
              <button
                className={styles.cdAddBtn}
                onClick={() => { setControlsMenuOpen(false); onAddAccount?.(); }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span>Add account</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {view === 'grid' ? (
        <div className={styles.accountsRow}>
          {visibleAccounts.map(acc => <AccountCard key={acc.accountId} account={acc} />)}
        </div>
      ) : (
        <div className={styles.listScroll}>
        <div className={styles.listView}>
          <div className={styles.listHeader}>
            <div className={styles.listCellName}><span className={styles.listHeaderText}>Account name</span></div>
            <div className={styles.listCell}><span className={styles.listHeaderText}>Balance</span></div>
            <div className={styles.listCell}><span className={styles.listHeaderText}>Mode</span></div>
            <div className={styles.listCellPlatform}><span className={styles.listHeaderText}>Platform</span></div>
            <div className={styles.listCell}><span className={styles.listHeaderText}>Leverage</span></div>
            <div className={styles.listCellActions}><span className={styles.listHeaderText}>Actions</span></div>
          </div>
          {visibleAccounts.map(acc => <AccountRow key={acc.accountId} account={acc} />)}
        </div>
        </div>
      )}
    </section>
  );
}
