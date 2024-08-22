'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

// MUI
import { Button, CircularProgress, Container, Stack, Typography } from '@mui/material';

// project imports
import CustomForm from '@/components/shared/form/CustomForm';
import CustomInput from '@/components/shared/form/CustomInput';
import { login } from '@/services/actions/login';
import { setLoggedInUser } from '@/store/authSlice';
import { useAppDispatch } from '@/store/hooks';
import storage from '@/utils/storage';
import Link from 'next/link';

const loginSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email' }),
  password: z.string().min(6, { message: 'Password must contain at least 6 characters' }),
});

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogin = async (data: any) => {
    try {
      setIsLoading(true);
      const res = await login(data);

      if (res?.success) {
        toast.success('Login Successful');
        storage.setToken(res.data.token);
        dispatch(setLoggedInUser(res.data.token));
        router.push('/dashboard');
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error('Failed to login!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth='xs'>
      <Stack
        py={4}
        px={6}
        boxShadow={24}
        mt={10}
        sx={{ borderRadius: '.6rem', bgcolor: 'rgba(255,255,255,.7)' }}
      >
        <Typography
          variant='h4'
          align='center'
          fontWeight='700'
          color='#000'
          textTransform='uppercase'
          pb={2}
        >
          Login
        </Typography>
        <CustomForm
          onSubmit={handleLogin}
          defaultValues={{ email: 'visitor@gmail.com', password: 'pass123' }}
          resolver={zodResolver(loginSchema)}
        >
          <Stack direction='column' gap={1}>
            <CustomInput name='email' label='Email' />
            <CustomInput name='password' label='Password' type='password' />
            <Button type='submit' color='primary'>
              {isLoading ? (
                <CircularProgress
                  color='warning'
                  sx={{
                    width: '25px !important',
                    height: '25px !important',
                  }}
                />
              ) : (
                'Login'
              )}
            </Button>
          </Stack>
        </CustomForm>
        <Stack>
          <Typography variant='h6' align='center' color='text.primary'>
            Are you new here?{' '}
            <Link href='/register' style={{ textDecoration: 'none' }}>
              Register now.
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
};

export default LoginPage;
