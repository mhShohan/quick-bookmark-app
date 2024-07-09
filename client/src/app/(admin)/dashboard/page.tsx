'use client';

import BookmarkSide from '@/components/containers/dashboard/BookmarkSide';
import FolderSide from '@/components/containers/dashboard/FolderSide';
import Navbar from '@/components/layout/Navbar';
import { Container, Grid, Stack } from '@mui/material';
import { useState } from 'react';

const DashboardPage = () => {
  const [query, setQuery] = useState({
    folderId: '',
    search: '',
    page: 1,
    limit: 20,
  });

  console.log(query);

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
            <FolderSide setQuery={setQuery} />
            <BookmarkSide />
          </Grid>
        </Stack>
      </Container>
    </Stack>
  );
};

export default DashboardPage;
