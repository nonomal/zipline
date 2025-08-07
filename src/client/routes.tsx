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
import ViewUserFiles from '@/components/pages/users/ViewUserFiles';
import { Response as ApiResponse } from '@/lib/api/response';
import { createBrowserRouter, redirect } from 'react-router-dom';
import FourOhFour from './pages/404';
import Login from './pages/auth/login';
import Logout from './pages/auth/logout';
import Register from './pages/auth/register';
import Tos from './pages/auth/tos';
import ViewFolderId from './pages/folder/[id]';
import ViewFolderIdUpload from './pages/folder/[id]/upload';
import Root from './Root';
import DashboardErrorBoundary from './error/DashboardErrorBoundary';
import RootErrorBoundary from './error/RootErrorBoundary';
import Setup from './pages/auth/setup';

export async function dashboardLoader() {
  const res = await fetch('/api/server/settings/web');
  if (!res.ok) {
    return redirect('/auth/login');
  }

  const data = await res.json();
  console.log('Loaded settings:', data);

  return data as ApiResponse['/api/server/settings/web'];
}

export const router = createBrowserRouter([
  {
    Component: Root,

    path: '/',
    children: [
      {
        ErrorBoundary: RootErrorBoundary,
        children: [
          { path: '*', Component: FourOhFour },
          {
            path: '/auth',
            children: [
              { path: 'login', Component: Login },
              { path: 'logout', Component: Logout },
              { path: 'register', Component: Register },
              {
                path: 'setup',
                Component: Setup,
                loader: async () => {
                  const res = await fetch('/api/server/public');
                  if (!res.ok) {
                    throw new Response('Failed to fetch server settings', { status: res.status });
                  }

                  const data = await res.json();
                  if (!data.firstSetup) return redirect('/auth/login');

                  return {};
                },
              },
              { path: 'tos', Component: Tos },
            ],
          },
          {
            path: '/dashboard',
            Component: Layout,
            loader: dashboardLoader,
            children: [
              {
                ErrorBoundary: DashboardErrorBoundary,
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
                      { path: 'settings', Component: DashboardServerSettings },
                      {
                        path: 'users',
                        children: [
                          { index: true, Component: DashboardUsers },
                          {
                            path: ':id/files',
                            loader: async ({ params }) => {
                              const res = await fetch('/api/users/' + params.id);
                              if (!res.ok) {
                                console.log("can't get user", res.status);
                                return redirect('/dashboard/admin/users');
                              }

                              const user = await res.json();
                              return { user };
                            },
                            Component: ViewUserFiles,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            path: 'folder/:id',
            children: [
              {
                index: true,
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
                path: 'upload',
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
        ],
      },
    ],
  },
]);
