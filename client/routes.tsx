import Layout from '@/components/Layout';
import DashboardHome from '@/components/pages/dashboard';
import DashboardFiles from '@/components/pages/files';
import DashboardFolders from '@/components/pages/folders';
import DashboardInvites from '@/components/pages/invites';
import DashboardMetrics from '@/components/pages/metrics';
import DashboardServerSettings from '@/components/pages/serverSettings';
import DashboardSettings from '@/components/pages/settings';
import UploadFile from '@/components/pages/upload/File';
import UploadText from '@/components/pages/upload/Text';
import DashboardURLs from '@/components/pages/urls';
import DashboardUsers from '@/components/pages/users';
import ThemeProvider from '@/components/ThemeProvider';
import { Response as ApiResponse } from '@/lib/api/response';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { NuqsAdapter } from 'nuqs/adapters/react-router';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { SWRConfig } from 'swr';
import Login from './pages/auth/login';
import Logout from './pages/auth/logout';
import Register from './pages/auth/register';
import Tos from './pages/auth/tos';
import ViewFolderId from './pages/folder/[id]';
import ViewFolderIdUpload from './pages/folder/[id]/upload';

export async function dashboardLoader(): Promise<ApiResponse['/api/server/settings/web']> {
  const res = await fetch('/api/server/settings/web');
  if (!res.ok) {
    throw new Response('Failed to load settings', { status: res.status });
  }

  const data = await res.json();

  console.log('Loaded settings:', data);

  return data;
}

export const router = createBrowserRouter([
  {
    Component: () => (
      <SWRConfig
        value={{
          fetcher: async (url: RequestInfo | URL) => {
            const res = await fetch(url);

            if (!res.ok) {
              const json = await res.json();

              throw new Error(json.message);
            }

            return res.json();
          },
        }}
      >
        <NuqsAdapter>
          <ThemeProvider>
            <ModalsProvider>
              <Notifications />
              <Outlet />
            </ModalsProvider>
          </ThemeProvider>
        </NuqsAdapter>
      </SWRConfig>
    ),
    path: '/',
    children: [
      {
        path: '/auth',
        children: [
          { path: 'login', Component: Login },
          { path: 'logout', Component: Logout },
          { path: 'register', Component: Register },
          { path: 'tos', Component: Tos },
        ],
      },
      {
        path: '/dashboard',
        Component: Layout,
        loader: dashboardLoader,
        children: [
          { index: true, Component: DashboardHome },
          { path: 'metrics', Component: DashboardMetrics },
          { path: 'settings', Component: DashboardSettings },
          { path: 'files', Component: DashboardFiles },
          { path: 'folders', Component: DashboardFolders },
          { path: 'urls', Component: DashboardURLs },
          {
            path: 'upload',
            children: [
              { path: 'file', Component: UploadFile },
              { path: 'text', Component: UploadText },
            ],
          },
          {
            path: 'admin',
            children: [
              { path: 'invites', Component: DashboardInvites },
              { path: 'users', Component: DashboardUsers },
              { path: 'settings', Component: DashboardServerSettings },
            ],
          },
        ],
      },
      {
        path: 'folder/:id',
        loader: async ({ params }) => {
          const res = await fetch(`/api/server/folder/${params.id}`);
          if (!res.ok) {
            throw new Response('Folder not found', { status: 404 });
          }
          return {
            folder: await res.json(),
          };
        },
        Component: ViewFolderId,
      },
      {
        path: 'folder/:id/upload',
        loader: async ({ params }) => {
          const res = await fetch(`/api/server/folder/${params.id}?upload=true`);
          if (!res.ok) {
            throw new Response('Folder not found', { status: 404 });
          }
          return {
            folder: await res.json(),
          };
        },
        Component: ViewFolderIdUpload,
      },
    ],
  },
]);
