'use client';

import UsersTable from '@/components/containers/admin/UsersTable';
import Navbar from '@/components/layout/Navbar';
import CustomPagination from '@/components/shared/CustomPagination';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Container, Grid, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

const AdminDashboardPage = () => {
  const [query, setQuery] = useState({
    page: 1,
    limit: 5,
    search: '',
  });

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
          mt={1}
          height={{ xs: '100%', md: 'calc(100vh - 10rem)' }}
          borderRadius={4}
          boxShadow={24}
          border='1px solid #B6FFFA'
          padding={4}
        >
          <Grid container height='100%'>
            <Grid item xs={12} sm={8}>
              <Stack
                border='1px solid #B6FFFA'
                padding={4}
                borderRadius={2}
                height='100%'
                boxShadow={24}
              >
                <UsersTable />
                <CustomPagination totalPage={1} query={query} setQuery={setQuery} />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box ml={{ xs: 0, sm: 2 }} mt={{ xs: 2, sm: 0 }}>
                <input type='file' id='avatar' style={{ display: 'none' }} />
                <FileLabel htmlFor='avatar'>
                  <CloudUploadIcon />
                  Upload Avatar
                </FileLabel>
              </Box>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Stack>
  );
};

export default AdminDashboardPage;

const FileLabel = styled('label')({
  width: '100%',
  padding: '.4rem',
  textAlign: 'center',
  border: '1px solid #B6FFFA',
  color: '#B6FFFA',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: 'all 0.3s',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '.5rem',
  '&:hover': {
    backgroundColor: '#B6FFFA',
    color: '#000',
  },
});
