import { Box, Typography } from '@mui/material';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href='/' style={{ textDecoration: 'none' }}>
      <Box
        sx={{
          display: { xs: 'none', sm: 'block' },
        }}
      >
        <Typography sx={{ fontSize: '2rem', fontWeight: '700', color: 'info.light' }}>
          Quick
          <Typography
            component='span'
            sx={{ fontSize: '2rem', fontWeight: '700', color: 'primary.light' }}
          >
            Bookmark
          </Typography>
        </Typography>
      </Box>
      <Box
        sx={{
          display: { xs: 'block', sm: 'none' },
        }}
      >
        <Typography sx={{ fontSize: '2rem', fontWeight: '700', color: 'info.light' }}>
          Q
          <Typography
            component='span'
            sx={{ fontSize: '2rem', fontWeight: '700', color: 'primary.light' }}
          >
            B
          </Typography>
        </Typography>
      </Box>
    </Link>
  );
};

export default Logo;
