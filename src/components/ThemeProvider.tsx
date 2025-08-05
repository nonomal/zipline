import { Response } from '@/lib/api/response';
import { useSettingsStore } from '@/lib/store/settings';
import { useUserStore } from '@/lib/store/user';
import { ZiplineTheme, findTheme, themeComponents } from '@/lib/theme';
import dark_blue from '@/lib/theme/builtins/dark_blue';
import { MantineProvider, createTheme } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import { createContext, useContext } from 'react';
import useSWR from 'swr';
import { useShallow } from 'zustand/shallow';

const ThemeContext = createContext<{
  themes: ZiplineTheme[];
}>({
  themes: [],
});

export function useThemes() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemes must be used within a ThemeProvider');

  return ctx.themes;
}

export default function Theming({ children }: { children: React.ReactNode }) {
  const {
    data: themes,
    error,
    isLoading,
  } = useSWR<Response['/api/server/themes']>('/api/server/themes', {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenHidden: false,
    revalidateIfStale: false,
  });

  const user = useUserStore((state) => state.user);
  const [userTheme, preferredDark, preferredLight] = useSettingsStore(
    useShallow((state) => [state.settings.theme, state.settings.themeDark, state.settings.themeLight]),
  );
  const systemTheme = useColorScheme();
  const currentTheme = user ? userTheme : (themes?.defaultTheme?.default ?? 'system');

  let theme = findTheme(currentTheme, themes?.themes);

  if (currentTheme === 'system') {
    theme =
      systemTheme === 'dark'
        ? (findTheme(user ? preferredDark : (themes?.defaultTheme?.dark ?? ''), themes?.themes) ??
          findTheme('builtin:dark_blue', themes?.themes))
        : (findTheme(user ? preferredLight : (themes?.defaultTheme?.light ?? ''), themes?.themes) ??
          findTheme('builtin:light_blue', themes?.themes));
  }

  if (!theme) {
    theme = findTheme('builtin:dark_blue') ?? (dark_blue as unknown as ZiplineTheme); // back up theme if all else fails lol
  }

  return (
    <ThemeContext.Provider value={{ themes: themes?.themes ?? [] }}>
      <MantineProvider
        defaultColorScheme={theme.colorScheme as unknown as any}
        forceColorScheme={theme.colorScheme as unknown as any}
        theme={createTheme({
          ...themeComponents(theme),
          defaultRadius: 'md',
        })}
      >
        {children}
      </MantineProvider>
    </ThemeContext.Provider>
  );
}
