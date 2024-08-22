'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

// MUI
import { Box, Button, CircularProgress, Container, Grid, Stack, Typography } from '@mui/material';

// project imports
import CustomForm from '@/components/shared/form/CustomForm';
import CustomInput from '@/components/shared/form/CustomInput';
import { register } from '@/services/actions/register';
import { setLoggedInUser } from '@/store/authSlice';
import { useAppDispatch } from '@/store/hooks';
import storage from '@/utils/storage';
import Link from 'next/link';

const validationSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  username: z.string({ required_error: 'Username is required' }),
  email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, { message: 'Password must contain at least 6 characters' }),
  confirmPassword: z
    .string({ required_error: 'Confirm password is required' })
    .min(6, { message: 'Password must contain at least 6 characters' }),
});

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogin = async (data: any) => {
    try {
      setIsLoading(true);
      const res = await register(data);

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
    <Container maxWidth='md'>
      <Stack
        py={4}
        px={{ xs: 3, sm: 6 }}
        boxShadow={24}
        my={5}
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
          Register new account
        </Typography>
        <CustomForm
          onSubmit={handleLogin}
          defaultValues={{ name: '', username: '', email: '', password: '', confirmPassword: '' }}
          resolver={zodResolver(validationSchema)}
        >
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <CustomInput name='name' label='Full Name' />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomInput name='username' label='Username' />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomInput name='email' label='Email' />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomInput name='password' label='Password' type='password' />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomInput name='confirmPassword' label='Confirm Password' type='password' />
            </Grid>
          </Grid>
          <Box mt={1} display='flex' justifyContent='center'>
            <Button type='submit' color='primary' sx={{ px: 10 }}>
              {isLoading ? (
                <CircularProgress
                  color='warning'
                  sx={{
                    width: '25px !important',
                    height: '25px !important',
                  }}
                />
              ) : (
                'Register Now'
              )}
            </Button>
          </Box>
        </CustomForm>
        <Stack>
          <Typography variant='h6' align='center' color='text.primary'>
            Already have an account?{' '}
            <Link href='/login' style={{ textDecoration: 'none' }}>
              Login Here!
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
