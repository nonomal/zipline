import { createContext, useContext } from 'react';
import { dashboardLoader } from '../client/routes';

type ConfigContextType = Awaited<ReturnType<typeof dashboardLoader>>;

const ConfigContext = createContext<ConfigContextType | null>(null);

export function useConfig() {
  const ctx = useContext(ConfigContext);
  if (!ctx) throw new Error('useConfig must be used within a ConfigProvider');

  return ctx.config;
}

export function useCodeMap() {
  const ctx = useContext(ConfigContext);
  if (!ctx) throw new Error('useCodeMap must be used within a ConfigProvider');

  return ctx.codeMap;
}

export default function ConfigProvider({
  data,
  children,
}: {
  data: ConfigContextType;
  children: React.ReactNode;
}) {
  return <ConfigContext.Provider value={data}>{children}</ConfigContext.Provider>;
}
