import { Response } from '@/lib/api/response';
import { Alert, Anchor, Collapse, Group, SimpleGrid, Skeleton, Stack, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import useSWR from 'swr';
import Chunks from './parts/Chunks';
import Core from './parts/Core';
import Discord from './parts/Discord';
import Domains from './parts/Domains';
import Features from './parts/Features';
import Files from './parts/Files';
import HttpWebhook from './parts/HttpWebhook';
import Invites from './parts/Invites';
import Mfa from './parts/Mfa';
import Oauth from './parts/Oauth';
import PWA from './parts/PWA';
import Ratelimit from './parts/Ratelimit';
import Tasks from './parts/Tasks';
import Urls from './parts/Urls';
import Website from './parts/Website';

function SettingsSkeleton() {
  return <Skeleton height={280} animate />;
}

export default function DashboardServerSettings() {
  const { data, isLoading, error } = useSWR<Response['/api/server/settings']>('/api/server/settings');
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <>
      <Group gap='sm'>
        <Title order={1}>Server Settings</Title>
      </Group>

      {(data?.tampered?.length ?? 0) > 0 && (
        <Alert color='red' title='Environment Variable Settings' mt='md'>
          <strong>{data!.tampered.length}</strong> setting{data!.tampered.length > 1 ? 's' : ''} have been set
          via environment variables, therefore any changes made to them on this page will not take effect
          unless the environment variable corresponding to the setting is removed. If you prefer using
          environment variables, you can ignore this message. Click{' '}
          <Anchor onClick={toggle} size='sm'>
            here
          </Anchor>{' '}
          to {opened ? 'close' : 'view'} the list of overridden settings.
          <Collapse in={opened} transitionDuration={200}>
            <ul>
              {data!.tampered.map((setting) => (
                <li key={setting}>{setting}</li>
              ))}
            </ul>
          </Collapse>
        </Alert>
      )}

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

            <Domains swr={{ data, isLoading }} />
          </>
        )}
      </SimpleGrid>

      <Stack mt='md' gap='md'>
        {error ? null : <Discord swr={{ data, isLoading }} />}
      </Stack>
    </>
  );
}
