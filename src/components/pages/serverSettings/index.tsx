import { Response } from '@/lib/api/response';
import { Group, SimpleGrid, Skeleton, Stack, Title } from '@mantine/core';
import useSWR from 'swr';
import dynamic from 'next/dynamic';

function SettingsSkeleton() {
  return <Skeleton height={280} animate />;
}

const Core = dynamic(() => import('./parts/Core'), {
  loading: () => <SettingsSkeleton />,
});
const Chunks = dynamic(() => import('./parts/Chunks'), {
  loading: () => <SettingsSkeleton />,
});
const Discord = dynamic(() => import('./parts/Discord'), {
  loading: () => <SettingsSkeleton />,
});
const Features = dynamic(() => import('./parts/Features'), {
  loading: () => <SettingsSkeleton />,
});
const Files = dynamic(() => import('./parts/Files'), {
  loading: () => <SettingsSkeleton />,
});
const HttpWebhook = dynamic(() => import('./parts/HttpWebhook'), {
  loading: () => <SettingsSkeleton />,
});
const Invites = dynamic(() => import('./parts/Invites'), {
  loading: () => <SettingsSkeleton />,
});
const Mfa = dynamic(() => import('./parts/Mfa'), {
  loading: () => <SettingsSkeleton />,
});
const Oauth = dynamic(() => import('./parts/Oauth'), {
  loading: () => <SettingsSkeleton />,
});
const Ratelimit = dynamic(() => import('./parts/Ratelimit'), {
  loading: () => <SettingsSkeleton />,
});
const Tasks = dynamic(() => import('./parts/Tasks'), {
  loading: () => <SettingsSkeleton />,
});
const Urls = dynamic(() => import('./parts/Urls'), {
  loading: () => <SettingsSkeleton />,
});
const Website = dynamic(() => import('./parts/Website'), {
  loading: () => <SettingsSkeleton />,
});
const PWA = dynamic(() => import('./parts/PWA'), {
  loading: () => <SettingsSkeleton />,
});

export default function DashboardSettings() {
  const { data, isLoading, error } = useSWR<Response['/api/server/settings']>('/api/server/settings');

  return (
    <>
      <Group gap='sm'>
        <Title order={1}>Server Settings</Title>
      </Group>

      <SimpleGrid mt='md' cols={{ base: 1, md: 2 }} spacing='lg'>
        {error ? (
          <div>Error loading server settings</div>
        ) : (
          <>
            <Core swr={{ data, isLoading }} />
            <Chunks swr={{ data, isLoading }} />
            <Tasks swr={{ data, isLoading }} />
            <Mfa swr={{ data, isLoading }} />

            <Features swr={{ data, isLoading }} />
            <Files swr={{ data, isLoading }} />
            <Stack>
              <Urls swr={{ data, isLoading }} />
              <Invites swr={{ data, isLoading }} />
            </Stack>

            <Ratelimit swr={{ data, isLoading }} />
            <Website swr={{ data, isLoading }} />
            <Oauth swr={{ data, isLoading }} />

            <PWA swr={{ data, isLoading }} />

            <HttpWebhook swr={{ data, isLoading }} />
          </>
        )}
      </SimpleGrid>

      <Stack mt='md' gap='md'>
        {error ? null : <Discord swr={{ data, isLoading }} />}
      </Stack>
    </>
  );
}
