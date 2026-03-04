import { createContext, useMemo, useState } from 'react';
import { THEME_IDS, THEME_OPTIONS } from './theme';

const STORAGE_KEY = 'colorMode';
const validIds = new Set(THEME_OPTIONS.map((o) => o.id));

export const ColorModeContext = createContext({ setTheme: () => {}, mode: 'dark' });

export function ColorModeProvider({ children }) {
  const [mode, setModeState] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return validIds.has(stored) ? stored : THEME_IDS.DARK;
    } catch {
      return THEME_IDS.DARK;
    }
  });

  const setTheme = (themeId) => {
    if (!validIds.has(themeId)) return;
    setModeState(themeId);
    try {
      localStorage.setItem(STORAGE_KEY, themeId);
    } catch (_) {}
  };

  const colorMode = useMemo(
    () => ({
      mode,
      setTheme,
      toggleColorMode: () => {
        setModeState((prev) => {
          const next = prev === THEME_IDS.DARK ? THEME_IDS.PASTEL_LAVENDER : THEME_IDS.DARK;
          try {
            localStorage.setItem(STORAGE_KEY, next);
          } catch (_) {}
          return next;
        });
      },
    }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      {children}
    </ColorModeContext.Provider>
  );
}
