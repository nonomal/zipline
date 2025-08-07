'use client';

import DashboardFile from '@/components/file/DashboardFile';
import { ActionIcon, Container, Group, SimpleGrid, Title } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
import { Link, useLoaderData } from 'react-router-dom'; // If using React Router

export default function ViewFolderId() {
  const { folder } = useLoaderData();

  return (
    <>
      <Container my='lg'>
        <Group>
          <Title order={1}>{folder.name}</Title>

          {folder.allowUploads && (
            <Link to={`/folder/${folder.id}/upload`}>
              <ActionIcon variant='outline'>
                <IconUpload size='1rem' />
              </ActionIcon>
            </Link>
          )}
        </Group>

        <SimpleGrid
          my='sm'
          cols={{
            base: 1,
            lg: 3,
            md: 2,
          }}
          spacing='md'
        >
          {folder.files?.map((file: any) => (
            <DashboardFile key={file.id} file={file} reduce />
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
}
