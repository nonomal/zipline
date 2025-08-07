'use client';

import ConfigProvider from '@/components/ConfigProvider';
import UploadFile from '@/components/pages/upload/File';
import { Response } from '@/lib/api/response';
import { SafeConfig } from '@/lib/config/safe';
import { Anchor, Center, Container, Text } from '@mantine/core';
import { Link, useLoaderData } from 'react-router-dom'; // If using React Router
import useSWR from 'swr';

export default function ViewFolderIdUpload() {
  const { folder } = useLoaderData();

  const { data: config } = useSWR<Response['/api/server/public']>('/api/server/public', {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenHidden: false,
    revalidateIfStale: false,
  });

  return (
    <>
      <Container my='lg'>
        <ConfigProvider data={{ config: config as unknown as SafeConfig, codeMap: [] }}>
          <UploadFile title={`Upload files to ${folder.name}`} folder={folder.id} />
          <Center>
            <Text c='dimmed' ta='center'>
              {folder.public ? (
                <>
                  This folder is{' '}
                  <Anchor component={Link} to={`/folder/${folder.id}`}>
                    public
                  </Anchor>
                  . Anyone with the link can view its contents and upload files.
                </>
              ) : (
                "Only the owner can view this folder's contents. However, anyone can upload files, and they can still access their uploaded files if they have the link to the specific file."
              )}
            </Text>
          </Center>
        </ConfigProvider>
      </Container>
    </>
  );
}
