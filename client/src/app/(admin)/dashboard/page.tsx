'use client';

import BookmarkSide from '@/components/containers/dashboard/BookmarkSide';
import FolderSide from '@/components/containers/dashboard/FolderSide';
import Navbar from '@/components/layout/Navbar';
import { useGetAllBookmarkQuery } from '@/store/api/bookmark.api';
import { useGetAllFolderQuery } from '@/store/api/folder.api';
import { Container, Grid, Stack } from '@mui/material';
import { useState } from 'react';

const DashboardPage = () => {
  const [query, setQuery] = useState({
    folderId: '',
    search: '',
    page: 1,
    limit: 20,
  });
  const { data } = useGetAllBookmarkQuery(query);
  const { data: foldersData } = useGetAllFolderQuery(undefined);

  return (
    <Stack
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(/assets/bg-2.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <Container>
        <Navbar />
        <Stack
          mt={2}
          height={{ xs: '100%', md: 'calc(100vh - 10rem)' }}
          borderRadius={4}
          boxShadow={24}
          border='1px solid #B6FFFA'
        >
          <Grid container height='100%'>
            <FolderSide setQuery={setQuery} folders={foldersData?.data} />
            <BookmarkSide
              bookmarks={data?.data}
              totalPage={data?.meta.totalPage}
              setQuery={setQuery}
              query={query}
              folders={foldersData?.data}
            />
          </Grid>
        </Stack>
      </Container>
    </Stack>
  );
};

export default DashboardPage;
