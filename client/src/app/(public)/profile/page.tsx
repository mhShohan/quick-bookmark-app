'use client';

import { useGetProfileQuery } from '@/store/api/profile.api';
import { Box, Button, CircularProgress, Container, Stack, Typography } from '@mui/material';
import profileImage from '@/assets/profile.png';
import Image from 'next/image';
import Link from 'next/link';

const ProfilePage = () => {
  const { data, isLoading } = useGetProfileQuery(undefined);

  return (
    <Container maxWidth='xs'>
      <Stack
        minHeight='300px'
        borderRadius={4}
        boxShadow={24}
        mt={5}
        sx={{
          border: '1px solid #B6FFFA',
        }}
      >
        {isLoading ? (
          <Stack justifyContent='center' alignItems='center' height='100%'>
            <CircularProgress
              color='info'
              sx={{
                width: '100px !important',
                height: '100px !important',
              }}
            />
          </Stack>
        ) : (
          <Stack alignItems='center' px={2} py={6}>
            <Box>
              <Image
                src={profileImage}
                alt='profile'
                width={100}
                height={100}
                style={{
                  borderRadius: '50%',
                }}
              />
            </Box>
            <Typography variant='h5'>Name: {data?.data?.name}</Typography>
            <Typography variant='h5'>Email: {data?.data?.email}</Typography>
            <Box mt={2} display='flex' gap={1}>
              <Link href='edit-profile'>
                <Button color='info'>Edit Profile</Button>
              </Link>
              {/* <Link href='change-password'>
                <Button color='info'>Change Password</Button>
              </Link> */}
            </Box>
          </Stack>
        )}
      </Stack>
    </Container>
  );
};

export default ProfilePage;
