import Markdown from '@/components/render/Markdown';
import { Response } from '@/lib/api/response';
import useSWR from 'swr';

export default function Tos() {
  const { data: config } = useSWR<Response['/api/server/public']>('/api/server/public', {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenHidden: false,
    revalidateIfStale: false,
  });

  return <Markdown md={config?.tos || ''} />;
}
