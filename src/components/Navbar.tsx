import { useEffect, useState, useRef } from 'react';
import styles from './Navbar.module.css';
import { navbarLogoV1, navbarLogoSubtract, navbarLogoV2, navbarDeposit, navbarBell } from './navIcons';

const imgVector      = navbarLogoV1;
const imgSubtract    = navbarLogoSubtract;
const imgVector1     = navbarLogoV2;
const imgDepositIcon = navbarDeposit;
const imgBellIcon    = navbarBell;

/* ─── Notifications ─── */
interface Notification {
  id: string;
  type: 'alert' | 'info' | 'success' | 'warning';
  title: string;
  body: string;
  time: string;
  read: boolean;
}

const NOTIFICATIONS: Notification[] = [
  { id: '1', type: 'alert',   title: 'Price Alert — XAU/USD',       body: 'Gold crossed your target of $2,350. Current price: $2,352.40.',           time: '2 min ago',   read: false },
  { id: '2', type: 'warning', title: 'Margin Warning — J.D.Acc 04', body: 'Account margin level at 85%. Consider depositing funds or reducing positions.', time: '1 hr ago',    read: false },
  { id: '3', type: 'alert',   title: 'Price Alert — EUR/USD',       body: 'EUR/USD dropped below 1.0800. Current price: 1.0794.',                     time: '3 hrs ago',   read: false },
  { id: '4', type: 'success', title: 'Deposit Confirmed',           body: '$500.00 has been credited to J.D.Acc 04 (USD, Razor).',                    time: 'Yesterday',   read: true  },
  { id: '5', type: 'info',    title: 'Market Opens in 5 Minutes',   body: 'New York session starts at 13:30 UTC. Oil and equity markets will resume.',  time: 'Yesterday',   read: true  },
  { id: '6', type: 'success', title: 'Order Filled — BTC/USD',      body: 'Buy order for 0.1 BTC filled at $64,210. Slippage: 0.02%.',                 time: '2 days ago',  read: true  },
  { id: '7', type: 'info',    title: 'Platform Maintenance',        body: 'Scheduled maintenance on Apr 20 02:00–04:00 UTC. Trading may be limited.',  time: '3 days ago',  read: true  },
];

function NotifIcon({ type }: { type: Notification['type'] }) {
  if (type === 'alert') return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2.5C5 2.5 3 5 3 7.5v3l-1 1.5h12l-1-1.5v-3C13 5 11 2.5 8 2.5Z" stroke="currentColor" strokeWidth="1.25" />
      <path d="M6.5 13a1.5 1.5 0 0 0 3 0" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
  if (type === 'warning') return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2l6.5 11H1.5L8 2Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
      <path d="M8 7v3M8 11.5v.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
  if (type === 'success') return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M5.5 8l2 2 3-3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M8 7v4M8 5.5v.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function NotifDropdown({ onClose }: { onClose: () => void }) {
  const [items, setItems] = useState(NOTIFICATIONS);
  const unread = items.filter(n => !n.read).length;

  function markAllRead() {
    setItems(prev => prev.map(n => ({ ...n, read: true })));
  }

  return (
    <div className={styles.notifDropdown}>
      <div className={styles.notifHeader}>
        <span className={styles.notifTitle}>Notifications</span>
        {unread > 0 && (
          <span className={styles.notifBadge}>{unread}</span>
        )}
        <button className={styles.notifMarkAll} onClick={markAllRead}>Mark all read</button>
      </div>

      <div className={styles.notifList}>
        {items.map(notif => (
          <button
            key={notif.id}
            className={`${styles.notifItem}${!notif.read ? ` ${styles.notifItemUnread}` : ''}`}
            onClick={() => {
              setItems(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n));
            }}
          >
            <span className={`${styles.notifItemIcon} ${styles[`notifIcon_${notif.type}`]}`}>
              <NotifIcon type={notif.type} />
            </span>
            <span className={styles.notifItemBody}>
              <span className={styles.notifItemTitle}>{notif.title}</span>
              <span className={styles.notifItemText}>{notif.body}</span>
              <span className={styles.notifItemTime}>{notif.time}</span>
            </span>
            {!notif.read && <span className={styles.notifUnreadDot} />}
          </button>
        ))}
      </div>

      <div className={styles.notifFooter}>
        <button className={styles.notifSeeAll} onClick={onClose}>See all notifications</button>
      </div>
    </div>
  );
}

/* ─── Language selector ─── */
interface Language {
  code: string;
  label: string;
  flagSrc: string;
}

const LANGUAGES: Language[] = [
  { code: 'EN', label: 'English',   flagSrc: 'https://flagcdn.com/w40/us.png' },
  { code: 'ZH', label: '中文',       flagSrc: 'https://flagcdn.com/w40/cn.png' },
  { code: 'JA', label: '日本語',     flagSrc: 'https://flagcdn.com/w40/jp.png' },
  { code: 'KO', label: '한국어',     flagSrc: 'https://flagcdn.com/w40/kr.png' },
  { code: 'DE', label: 'Deutsch',   flagSrc: 'https://flagcdn.com/w40/de.png' },
  { code: 'FR', label: 'Français',  flagSrc: 'https://flagcdn.com/w40/fr.png' },
  { code: 'ES', label: 'Español',   flagSrc: 'https://flagcdn.com/w40/es.png' },
  { code: 'TH', label: 'ภาษาไทย',  flagSrc: 'https://flagcdn.com/w40/th.png' },
];

interface NavbarProps {
  onMenuOpen?: () => void;
}

export default function Navbar({ onMenuOpen }: NavbarProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<Language>(LANGUAGES[0]);
  const notifRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.removeAttribute('data-theme');
    localStorage.removeItem('theme');
  }, []);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  function selectLanguage(lang: Language) {
    setSelectedLang(lang);
    setLangOpen(false);
  }

  const unreadCount = NOTIFICATIONS.filter(n => !n.read).length;

  return (
    <nav className={styles.nav}>
      {/* ─── Desktop / tablet bar ─── */}
      <div className={styles.inner}>
        <div className={styles.logo}>
          <div className={styles.logoVector}>
            <img alt="" className={styles.fill} src={imgVector} />
          </div>
          <div className={styles.logoSubtract}>
            <img alt="" className={styles.fill} src={imgSubtract} />
          </div>
          <div className={styles.logoVector1}>
            <img alt="" className={styles.fill} src={imgVector1} />
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.depositBtn}>
            <div className={styles.depositIconWrap}>
              <img alt="" className={styles.fill} src={imgDepositIcon} />
            </div>
            <span>Deposit</span>
          </button>

          <div className={styles.divider} />

          <div className={styles.userSection}>
            <div className={styles.avatar} aria-hidden="true">JD</div>
            <span className={styles.userName}>Hi, John</span>

            {/* Notification bell */}
            <div className={styles.bellWrap} ref={notifRef}>
              <button
                className={styles.bellBtn}
                aria-label="Notifications"
                aria-expanded={notifOpen}
                onClick={() => setNotifOpen(o => !o)}
              >
                <div className={styles.bellIconWrap}>
                  <img alt="" className={styles.fill} src={imgBellIcon} />
                </div>
                {unreadCount > 0 && <span className={styles.notifDot} />}
              </button>

              {notifOpen && <NotifDropdown onClose={() => setNotifOpen(false)} />}
            </div>

            {/* Language selector */}
            <div className={styles.langWrap} ref={langRef}>
              <button
                className={`${styles.langBtn}${langOpen ? ` ${styles.langBtnActive}` : ''}`}
                onClick={() => setLangOpen(o => !o)}
                aria-expanded={langOpen}
                aria-haspopup="listbox"
              >
                <img alt={selectedLang.code} className={styles.flagIcon} src={selectedLang.flagSrc} />
                <span>{selectedLang.code}</span>
                <svg
                  className={`${styles.langChevron}${langOpen ? ` ${styles.langChevronOpen}` : ''}`}
                  width="12" height="12" viewBox="0 0 12 12" fill="none"
                >
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {langOpen && (
                <div className={styles.langDropdown} role="listbox">
                  {LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      className={`${styles.langOption}${lang.code === selectedLang.code ? ` ${styles.langOptionActive}` : ''}`}
                      role="option"
                      aria-selected={lang.code === selectedLang.code}
                      onClick={() => selectLanguage(lang)}
                    >
                      <img alt={lang.code} className={styles.langOptionFlagImg} src={lang.flagSrc} />
                      <span className={styles.langOptionLabel}>{lang.label}</span>
                      <span className={styles.langOptionCode}>{lang.code}</span>
                      {lang.code === selectedLang.code && (
                        <svg className={styles.langOptionCheck} width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            className={styles.menuBtn}
            aria-label="Open navigation"
            onClick={() => onMenuOpen?.()}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
