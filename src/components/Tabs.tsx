import React from 'react';
import styles from './Tabs.module.css';

export interface TabSpec<T extends string> {
  key: T;
  label: string;
}

interface TabsProps<T extends string> {
  tabs: TabSpec<T>[];
  active: T;
  onChange: (key: T) => void;
}

export default function Tabs<T extends string>({ tabs, active, onChange }: TabsProps<T>): React.ReactElement {
  return (
    <div className={styles.tabs} role="tablist">
      {tabs.map(tab => {
        const isActive = tab.key === active;
        return (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`${styles.tab}${isActive ? ` ${styles.tabActive}` : ''}`}
            onClick={() => onChange(tab.key)}
          >
            <span className={styles.tabLabel}>{tab.label}</span>
            <span className={styles.tabUnderline} />
          </button>
        );
      })}
    </div>
  );
}
