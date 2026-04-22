import { useState, useEffect } from 'react';
import styles from './NavLeft.module.css';
import { useRoute, type NavKey } from '../router';
import {
  navHome, navFunds, navTools, navPartners, navRefer, navSettings,
  navHome24, navFunds24, navTools24, navPartners24, navRefer24, navSettings24,
  webTraderIcon, webTraderIcon24,
  navProSupport, navPepperstone,
} from './navIcons';

// ─── Expanded icon assets (20px) — inlined as data URIs in ./navIcons ───
const imgVector1         = navHome;
const imgVector2         = navFunds;
const imgIcon1           = navTools;
const imgIcon2           = navPartners;
const imgIcon3           = navRefer;
const imgVector3         = navSettings;
const imgVector4         = navProSupport;
const imgPepperstoneIcon = navPepperstone;
const imgUnion           = webTraderIcon;

// ─── Collapsed icon assets (24px) ───
const imgVector7  = navHome24;
const imgVector8  = navFunds24;
const imgIcon12   = navTools24;
const imgIcon13   = navPartners24;
const imgIcon14   = navRefer24;
const imgVector9  = navSettings24;
const imgUnion1   = webTraderIcon24;

function useCollapsed() {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 1440);
  useEffect(() => {
    const handler = () => setCollapsed(window.innerWidth < 1440);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return collapsed;
}

// Renders a square icon image — always 1:1, no squashing
function Ico({ src, size }: { src: string; size: number }) {
  return (
    <img
      alt=""
      style={{ width: size, height: size, objectFit: 'contain', display: 'block', maxWidth: 'none', flexShrink: 0 }}
      src={src}
    />
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  collapsedLabel?: string;
  active?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
}

function NavItem({ icon, label, collapsedLabel, active, collapsed, onClick }: NavItemProps) {
  const baseClass = active
    ? (collapsed ? styles.navItemActiveCollapsed : styles.navItemActive)
    : (collapsed ? styles.navItemCollapsed : styles.navItem);

  return (
    <button type="button" className={baseClass} onClick={onClick}>
      <div className={collapsed ? styles.navIconLg : styles.navIcon}>{icon}</div>
      <span className={collapsed ? styles.navLabelSm : styles.navLabel}>
        {collapsed ? (collapsedLabel ?? label) : label}
      </span>
    </button>
  );
}

function BottomItem({ icon, label, blue, collapsed }: {
  icon: React.ReactNode;
  label: string;
  blue?: boolean;
  collapsed?: boolean;
}) {
  return (
    <div className={collapsed ? styles.bottomItemCollapsed : styles.bottomItem}>
      <div className={styles.navIcon}>{icon}</div>
      <span className={blue ? styles.bottomLabelBlue : styles.bottomLabel}>{label}</span>
    </div>
  );
}

interface NavLeftProps {
  isOpen?: boolean;
  onClose?: () => void;
  /** Force icon-only collapsed state (e.g. when Add Account drawer is open) */
  forceCollapsed?: boolean;
  /** Which nav item is currently active */
  activeKey?: NavKey;
}

export default function NavLeft({ isOpen, onClose, forceCollapsed, activeKey }: NavLeftProps) {
  const autoCollapsed = useCollapsed();
  // On mobile nav open: always show expanded form
  // forceCollapsed overrides everything (e.g. add account drawer open)
  const collapsed = forceCollapsed ? true : (autoCollapsed && !isOpen);
  const size = collapsed ? 24 : 20;

  const [, navigate] = useRoute();
  function go(next: NavKey) {
    onClose?.();
    navigate(next);
  }

  const asideClass = [
    collapsed ? styles.sidebarCollapsed : styles.sidebar,
    isOpen ? styles.sidebarMobileOpen : '',
  ].filter(Boolean).join(' ');

  return (
    <aside className={asideClass}>
      <div className={styles.top}>
        <div className={styles.navList}>
          {/* WebTrader — active primary button (chart-bar icon) */}
          <div className={collapsed ? styles.webTraderBtnCollapsed : styles.webTraderBtn}>
            <div className={collapsed ? styles.navIconLg : styles.webTraderIconWrap}>
              <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none', objectFit: 'contain' }}
                src={collapsed ? imgUnion1 : imgUnion} />
            </div>
            <span className={collapsed ? styles.webTraderLabelCollapsed : styles.webTraderLabel}>
              {collapsed ? 'Trade' : 'WebTrader'}
            </span>
          </div>

          <NavItem collapsed={collapsed} active={activeKey === 'home'} label="Home"
            onClick={() => go('home')}
            icon={<Ico src={collapsed ? imgVector7 : imgVector1} size={size} />} />

          <NavItem collapsed={collapsed} active={activeKey === 'funds'} label="Funds"
            onClick={() => go('funds')}
            icon={<Ico src={collapsed ? imgVector8 : imgVector2} size={size} />} />

          <NavItem collapsed={collapsed} active={activeKey === 'trading-tools'} label="Trading tools" collapsedLabel="Tools"
            onClick={() => go('trading-tools')}
            icon={<Ico src={collapsed ? imgIcon12 : imgIcon1} size={size} />} />

          <NavItem collapsed={collapsed} active={activeKey === 'partners'} label="Partners"
            onClick={() => go('partners')}
            icon={<Ico src={collapsed ? imgIcon13 : imgIcon2} size={size} />} />

          <NavItem collapsed={collapsed} active={activeKey === 'refer-a-friend'} label="Refer a friend" collapsedLabel="Referrals"
            onClick={() => go('refer-a-friend')}
            icon={<Ico src={collapsed ? imgIcon14 : imgIcon3} size={size} />} />

          <NavItem collapsed={collapsed} active={activeKey === 'profile-settings'} label="Profile settings" collapsedLabel="Settings"
            onClick={() => go('profile-settings')}
            icon={<Ico src={collapsed ? imgVector9 : imgVector3} size={size} />} />
        </div>
      </div>

      <div className={styles.bottom}>
        <BottomItem collapsed={collapsed} blue
          label={collapsed ? 'Pro' : 'Pepperstone Pro'}
          icon={<Ico src={imgVector4} size={24} />}
        />
        <BottomItem collapsed={collapsed}
          label={collapsed ? 'Pepperstone' : 'Pepperstone Home'}
          icon={<Ico src={imgPepperstoneIcon} size={24} />}
        />
        <BottomItem collapsed={collapsed}
          label={collapsed ? 'Support' : 'Support & Help'}
          icon={<Ico src={imgVector4} size={24} />}
        />
      </div>
    </aside>
  );
}
