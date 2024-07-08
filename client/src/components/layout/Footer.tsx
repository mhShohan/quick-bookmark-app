import { Stack, Typography } from '@mui/material';
import Link from 'next/link';

const Footer = () => {
  return (
    <Stack component='footer' py={2} bgcolor='Background'>
      <Typography variant='h6' fontWeight={500} align='center' color='primary'>
        ©All rights reserved by{' '}
        <Link
          href='https://www.linkedin.com/in/mehdi-hasan-shohan'
          target='_blank'
          style={{ fontWeight: '700', textDecoration: 'none' }}
        >
          Mehdi Hasan Shohan
        </Link>
        , {new Date().getFullYear()}
      </Typography>
    </Stack>
  );
};

export default Footer;
