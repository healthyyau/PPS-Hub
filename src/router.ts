import { useEffect, useState } from 'react';

/** Top-level nav keys — used by NavLeft to highlight the active item. */
export type NavKey =
  | 'home'
  | 'funds'
  | 'trading-tools'
  | 'partners'
  | 'refer-a-friend'
  | 'profile-settings';

const VALID_KEYS: NavKey[] = [
  'home',
  'funds',
  'trading-tools',
  'partners',
  'refer-a-friend',
  'profile-settings',
];

function keyFromHash(): NavKey {
  const raw = window.location.hash.replace(/^#\/?/, '') as NavKey;
  return (VALID_KEYS as string[]).includes(raw) ? raw : 'home';
}

/**
 * Tiny hash-based router. Returns the current nav key and a setter that
 * updates the URL hash (which triggers re-renders via the hashchange event).
 */
export function useRoute(): [NavKey, (key: NavKey) => void] {
  const [key, setKey] = useState<NavKey>(() => keyFromHash());

  useEffect(() => {
    function onHashChange() {
      setKey(keyFromHash());
    }
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  function navigate(next: NavKey) {
    window.location.hash = `/${next}`;
  }

  return [key, navigate];
}
