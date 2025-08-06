import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

import '@mantine/charts/styles.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/notifications/styles.css';
import 'mantine-datatable/styles.css';

hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
