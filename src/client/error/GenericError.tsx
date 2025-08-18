import { Container, Paper, Stack, Text, Title } from '@mantine/core';
import { useRouteError } from 'react-router-dom';
import FourOhFour from '../pages/404';

export default function GenericError({
  title,
  message,
  details,
}: {
  title?: string;
  message?: string;
  details?: Record<string, any>;
}) {
  const routeError: any = useRouteError();

  if (routeError?.status === 404) return <FourOhFour />;

  return (
    <Container my='lg'>
      <Stack gap='xs'>
        <Title order={5}>{title || 'An error occurred'}</Title>
        <Text c='dimmed'>
          {message || 'Something went wrong. Please try again later, or report this issue if it persists.'}
        </Text>
        {details && (
          <Paper withBorder px={3} py={3}>
            <pre style={{ margin: 0 }}>{JSON.stringify({ routeError, details }, null, 2)}</pre>
          </Paper>
        )}
      </Stack>
    </Container>
  );
}
