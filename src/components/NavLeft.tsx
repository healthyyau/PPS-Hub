import { useState, useEffect } from 'react';
import styles from './NavLeft.module.css';

// ─── Expanded icon assets (20px) ───
const imgUtility20Px    = 'https://www.figma.com/api/mcp/asset/bf71eecd-0d29-421f-9574-fc76dd37e836';
const imgUnion          = 'https://www.figma.com/api/mcp/asset/09ef5b04-f551-45ae-9af0-b11dd49f6acb';
const imgVector1        = 'https://www.figma.com/api/mcp/asset/f8d9aa2f-5782-4387-8784-11a7233a7adb'; // Home
const imgVector2        = 'https://www.figma.com/api/mcp/asset/71145e97-5fb2-4c89-bc40-7d7db1670097'; // Funds
const imgIcon1          = 'https://www.figma.com/api/mcp/asset/e8817b27-d225-47d4-8783-1cebe9f23019'; // Tools
const imgIcon2          = 'https://www.figma.com/api/mcp/asset/3bd06b13-9f0c-4379-8517-61543a7cc2b0'; // Partners
const imgIcon3          = 'https://www.figma.com/api/mcp/asset/536450a3-9fe4-4b3a-a29f-fbc792a02cb6'; // Refer
const imgVector3        = 'https://www.figma.com/api/mcp/asset/694937b0-75cd-49b1-910b-db8b5b72d9e5'; // Settings
const imgVector4        = 'https://www.figma.com/api/mcp/asset/6a859d76-b40d-4d1b-9c93-e18f20366d75'; // Pro / Support
const imgPepperstoneIcon= 'https://www.figma.com/api/mcp/asset/6a8623be-dedb-4d83-b4ff-5a621ce789d6'; // Pepperstone

// ─── Collapsed icon assets (24px) ───
const imgUtility20Px1  = 'https://www.figma.com/api/mcp/asset/376ebe04-71c6-4beb-98bc-bc1a1d8f5cac'; // WebTrader
const imgUnion1        = 'https://www.figma.com/api/mcp/asset/3d638ce0-2b98-40d0-a4ff-aea055fc86c7';
const imgVector7       = 'https://www.figma.com/api/mcp/asset/5d79c7d0-5cbe-47e2-9255-e6d9a1695d84'; // Home
const imgVector8       = 'https://www.figma.com/api/mcp/asset/c94d8da7-4299-4d0a-abbc-1a5fc2c1776b'; // Funds
const imgIcon12        = 'https://www.figma.com/api/mcp/asset/02000194-a3aa-4ba8-a435-f4a7cdc54939'; // Tools
const imgIcon13        = 'https://www.figma.com/api/mcp/asset/7ab32d6a-75af-4a2a-9b1d-9303c3050acb'; // Partners
const imgIcon14        = 'https://www.figma.com/api/mcp/asset/3b881055-79d2-40e5-a15c-4be57ecd32aa'; // Referrals
const imgVector9       = 'https://www.figma.com/api/mcp/asset/dad550e5-c76e-41c3-b68d-9a1935f81e9f'; // Settings

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
