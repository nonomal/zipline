import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

import '@mantine/charts/styles.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/notifications/styles.css';
import 'mantine-datatable/styles.css';

export const fetcher = async (url: RequestInfo | URL) => {
  const res = await fetch(url);

  if (!res.ok) {
    const json = await res.json();

    throw new Error(json.message);
  }

  return res.json();
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
