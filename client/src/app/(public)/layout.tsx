import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { Stack } from '@mui/material';
import React from 'react';

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
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
        <Navbar />
        {children}
      </Stack>
      <Footer />
    </>
  );
};

export default HomeLayout;
